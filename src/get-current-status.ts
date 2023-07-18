import { ConnectionStatus, Network } from "@capacitor/network"
import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { PACKAGE_NAME } from "./package-name";
import { LinkName } from "./link-name";

// Define the type for NetworkStatusType which can have specific values.
export type NetworkStatusType = 'wifi' | 'cellular' | 'none' | 'unknown' | string;

// Function to get the current network status.
// Takes an object with properties 'deep' (of type DeepClient) and 'containerLinkId' (of type number).
// Returns a Promise that resolves to the NetworkStatusType.
export const getCurrentStatus = async ({ deep, containerLinkId }: { deep: DeepClient, containerLinkId: number }): Promise<NetworkStatusType> => {

  // Get the IDs for the required link types from the deep client.
  const containTypeLinkId = await deep.id("@deep-foundation/core", "Contain");
  const networkStatusTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.NetworkStatus]);
  const networkTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Network]);
  const wifiTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Wifi]);
  const cellularTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Cellular]);
  const unknownTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Unknown]);
  const noneTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.None]);
  const trueLinkId = await deep.id("@freephoenix888/boolean", LinkName[LinkName.True]);

  // Select the network link based on the containerLinkId.
  const { data: [{ id: networkLinkId }] } = await deep.select({
    type_id: networkTypeLinkId,
    in: {
      type_id: containTypeLinkId,
      from_id: containerLinkId,
    }
  });

  // Select the current network status type for the network link.
  const { data: [{ type_id: currentNetworkStatusTypeId }] } = await deep.select({
    in: {
      type_id: containTypeLinkId,
      from_id: networkStatusTypeLinkId,
    },
    from_id: networkLinkId,
    to_id: trueLinkId
  });

  // Determine the network status type based on the currentNetworkStatusTypeId.
  let networkStatusType = "";
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
  
  // Return the determined network status type.
  return networkStatusType;
}