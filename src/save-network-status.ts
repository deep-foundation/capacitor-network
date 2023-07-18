import { ConnectionStatus, Network } from "@capacitor/network"
import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { PACKAGE_NAME } from "./package-name";
import { LinkName } from "./link-name";
import { uploadStatus } from "./upload-status";


export interface ISaveNetworkStatusOptions {
  deep: DeepClient,
  containerLinkId: number,
  connectionStatuses: ConnectionStatus[]
}

export async function saveNetworkStatus(options: ISaveNetworkStatusOptions) {
  const { deep, containerLinkId, connectionStatuses } = options;
  const containTypeLinkId = await deep.id("@deep-foundation/core", "Contain");
  const networkTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Network]);

  if (connectionStatuses.length === 0) {
    const connectionStatus = await Network.getStatus();
    connectionStatuses.push(connectionStatus);
  }

  const { data: [{ id: networkLinkId = undefined } = {}] = [] } = await deep.select({ type_id: networkTypeLinkId }); // Check if a container link already exists for the "Network" type.

  if (!networkLinkId) {
    const { data: [{ id: networkLinkId }] } = await deep.insert({
      type_id: networkTypeLinkId,
      in: {
        type_id: containTypeLinkId,
        from_id: containerLinkId,
      }
    });
  }
  await uploadStatus({deep, containerLinkId, connectionStatuses});
}



