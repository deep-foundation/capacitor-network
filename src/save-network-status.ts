import { ConnectionStatus, Network } from "@capacitor/network"
import { DeepClient, SerialOperation } from "@deep-foundation/deeplinks/imports/client";
import { PACKAGE_NAME } from "./package-name";
import { LinkName } from "./link-name";


interface ISaveNetworkStatusOptions {
  deep: DeepClient,
  containerLinkId: number,
  connectionStatuses?: ConnectionStatus[]
}

export async function saveNetworkStatuses({ deep, containerLinkId, connectionStatuses }: ISaveNetworkStatusOptions) {
  const containTypeLinkId = await deep.id("@deep-foundation/core", "Contain");
  const networkTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Network]);
  const wifiTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Wifi]);
  const cellularTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Cellular]);
  const unknownTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Unknown]);
  const noneTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.None]);
  const trueLinkId = await deep.id("@freephoenix888/boolean", LinkName[LinkName.True]);
  const falseLinkId = await deep.id("@freephoenix888/boolean", LinkName[LinkName.False]);

  if (!connectionStatuses) {
    const connectionStatus = await Network.getStatus()
    return connectionStatuses = [connectionStatus];
  }

  const { data: [{ id: networkLinkId }] } = await deep.select({
    type_id: networkTypeLinkId,
    in: {
      type_id: containTypeLinkId,
      from_id: containerLinkId,
    }
  });

  await deep.serial({
    operations: [
      {
        table: 'links',
        type: 'delete',
        exp: {
          up: {
            tree_id: {
              _id: ['@deep-foundation/core', 'containTree'],
            },
            parent: {
              type_id: {
                _id: ['@deep-foundation/core', 'Contain'],
              },
              from_id: containerLinkId,
              to: {
                type_id: {
                  _in: [
                    connectionStatuses.find(connectionStatus => connectionStatus.connectionType === 'wifi') ? wifiTypeLinkId :
                      connectionStatuses.find(connectionStatus => connectionStatus.connectionType === 'cellular') ? cellularTypeLinkId :
                        connectionStatuses.find(connectionStatus => connectionStatus.connectionType === 'none') ? noneTypeLinkId :
                          unknownTypeLinkId,
                  ]
                },
              },
            },
          },
        }
      },
      {
        table: 'links',
        type: 'insert',
        objects: connectionStatuses.map(connectionStatus => ({
          type_id: wifiTypeLinkId,
          from_id: networkLinkId,
          to_id: connectionStatus.connected ? trueLinkId : falseLinkId,
          in: {
            data: [{
              type_id: containTypeLinkId,
              from_id: containerLinkId
            }]
          }
        }))
      }
    ]
  })
}
