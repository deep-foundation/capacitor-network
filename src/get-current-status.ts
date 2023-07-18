import { ConnectionStatus, Network } from "@capacitor/network"
import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { PACKAGE_NAME } from "./package-name";
import { LinkName } from "./link-name";

export type NetworkStatusType = 'wifi' | 'cellular' | 'none' | 'unknown' | string;

export const getCurrentStatus = async ({ deep, containerLinkId }: { deep: DeepClient, containerLinkId: number }): Promise<NetworkStatusType> => {
  const containTypeLinkId = await deep.id("@deep-foundation/core", "Contain");
  const networkStatusTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.NetworkStatus]);
  const networkTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Network]);
  const wifiTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Wifi]);
  const cellularTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Cellular]);
  const unknownTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.Unknown]);
  const noneTypeLinkId = await deep.id(PACKAGE_NAME, LinkName[LinkName.None]);
  const trueLinkId = await deep.id("@freephoenix888/boolean", LinkName[LinkName.True]);

  const { data: [{ id: networkLinkId }] } = await deep.select({
    type_id: networkTypeLinkId,
    in: {
      type_id: containTypeLinkId,
      from_id: containerLinkId,
    }
  });

  const { data: [{ type_id: currentNetworkStatusTypeId }] } = await deep.select({
    in: {
      type_id: containTypeLinkId,
      from_id: networkStatusTypeLinkId,
    },
    from_id: networkLinkId,
    to_id: trueLinkId
  });

  let networkStatusType = "";

  switch (currentNetworkStatusTypeId) {
    case wifiTypeLinkId: networkStatusType = 'wifi';
    case cellularTypeLinkId: networkStatusType = 'cellular';
    case unknownTypeLinkId: networkStatusType = 'unknown';
    case noneTypeLinkId: networkStatusType = 'none';
  }
  return networkStatusType;
}