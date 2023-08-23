import { ConnectionStatus, Network } from "@capacitor/network"
import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { PACKAGE_NAME } from "./package-name";
import { LinkName } from "./link-name";
import { Link } from "@deep-foundation/deeplinks/imports/minilinks";

// Define NetworkStatusType as a union type of network status strings.
export type NetworkStatusType = 'wifi' | 'cellular' | 'none' | 'unknown' | string;

/**
 * Asynchronously get the current status of network connectivity.
 *
 * @param {object} {deep: DeepClient, containerLinkId: number}
 * @returns {Promise<NetworkStatusType>}
 */

export const getCurrentStatus = async ({
  deep,
  containerLinkId,
}: {
  deep: DeepClient;
  containerLinkId: number;
}): Promise<NetworkStatusType> => {
  // Get link IDs for specific link types from deep space.
  const containTypeLinkId = await deep.id('@deep-foundation/core', 'Contain');
  const networkStatusTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.NetworkStatus]);
  
  // Ids corresponding to different types of network status.
  const networkTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Network]);
  const wifiTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Wifi]);
  const cellularTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Cellular]);
  const unknownTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Unknown]);
  const noneTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.None]);

  let networkStatusType = '';

  // Check if container link ID exists.
  if (containerLinkId) {
    console.log('containerLinkId: ', containerLinkId);

    // Fetch link related to the Network type.
    const { data: networkTypeSelectResponse } = await deep.select({
      type_id: networkTypeLinkId,
      in: {
        type_id: containTypeLinkId,
        from_id: containerLinkId,
      },
    });

    // Extract the link ID for the type Network from the response.
    const networkLinkId =
      networkTypeSelectResponse.filter((link: Link<number>) => link.type_id === networkTypeLinkId)[0]?.id;

    // Check if the network link ID exists.
    if (networkLinkId) {
       // Fetch all links under the object that network is linked to.
       const { data: currentNetworkStatusSelectResponse } = await deep.select({
        in: {
          type_id: containTypeLinkId,
          from_id: containerLinkId,
        },
        from_id: networkLinkId,
      });

      // Extract the type ID for the current network status from the response.
      const currentNetworkStatusTypeId = currentNetworkStatusSelectResponse[0]?.type_id;

      // Map the current network status type ID to an equivalent network status string.
      switch (currentNetworkStatusTypeId) {
        case wifiTypeLinkId:
          networkStatusType = 'wifi';
          break;
        case cellularTypeLinkId:
          networkStatusType = 'cellular';
          break;
        case unknownTypeLinkId:
          networkStatusType = 'unknown';
          break;
        case noneTypeLinkId:
          networkStatusType = 'none';
          break;
      }
    }
  }
  
  // Log the determined network status type.
  console.log('networkStatusType: ', networkStatusType);
  
  // Return the identified network status.
  return networkStatusType;
};