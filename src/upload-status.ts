import { ConnectionStatus, Network } from "@capacitor/network"
import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { PACKAGE_NAME } from "./package-name";
import { LinkName } from "./link-name";

export interface IUploadStatusOptions { // Options passed to the uploadStatus function.
  deep: DeepClient, // The deep client instance.
  containerLinkId: number, // ID of the container link.
  connectionStatuses: ConnectionStatus[] // Array of connection status objects.
}

// uploadStatus function uploads all connectionStatuses as links structure inside your deep instance.

export const uploadStatus = async ({ deep, containerLinkId, connectionStatuses }: IUploadStatusOptions) => {
   // Get all the nessesary link IDs.
  const containTypeLinkId = await deep.id("@deep-foundation/core", "Contain");
  const networkTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Network]);
  const wifiTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Wifi]);
  const cellularTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Cellular]);
  const unknownTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Unknown]);
  const noneTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.None]);
  const trueLinkId = await deep.id("@freephoenix888/boolean", LinkName[LinkName.True]);
  const falseLinkId = await deep.id("@freephoenix888/boolean", LinkName[LinkName.False]);

  // Select Network type link id.
  const { data: [{ id: networkLinkId }] } = await deep.select({
    type_id: networkTypeLinkId,
    in: {
      type_id: containTypeLinkId,
      from_id: containerLinkId,
    }
  });
  
 // Update all connectionStatuses inside deep database with single deep.serial operation.
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