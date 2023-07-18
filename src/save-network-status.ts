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

/**
 * Saves network status to a custom deep database.
 * @param options - An object containing the necessary parameters.
 * @param options.deep - The deep client instance.
 * @param options.containerLinkId - The ID of the container link.
 * @param options.connectionStatuses - An array of connection statuses.
 */
export async function saveNetworkStatus(options: ISaveNetworkStatusOptions) {
  const { deep, containerLinkId, connectionStatuses } = options;

  // Retrieve the link type ID for the "Contain" type.
  const containTypeLinkId = await deep.id("@deep-foundation/core", "Contain");
  
  // Retrieve the link type ID for the "Network" type.
  const networkTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Network]);

  // If the connectionStatuses array is empty, get the current network status and add it to the array.
  if (connectionStatuses.length === 0) {
    const connectionStatus = await Network.getStatus();
    connectionStatuses.push(connectionStatus);
  }

  // Check if a container link already exists for the "Network" type and retrieve its ID.
  const { data: [{ id: networkLinkId = undefined } = {}] = [] } = await deep.select({ type_id: networkTypeLinkId });

  // If no network link ID exists, create a new container link for the "Network" type.
  if (!networkLinkId) {
    const { data: [{ id: networkLinkId }] } = await deep.insert({
      type_id: networkTypeLinkId,
      in: {
        type_id: containTypeLinkId,
        from_id: containerLinkId,
      }
    });
  }

  // Upload the network status to the database.
  await uploadStatus({ deep, containerLinkId, connectionStatuses });
}




