import { DeepClient } from "@deep-foundation/deeplinks/imports/client.js";
import { PACKAGE_NAME } from './package-name.js';
import { LinkName } from "./link-name.js";

/**
 * Creates a new container link for the network status.
 * @param {DeepClient} deep - The DeepClient object instance.
 * @returns {Promise<number>} A Promise that resolves with the ID of the new container.
 */

export async function createContainer(deep: DeepClient): Promise<number> {
  const containTypeLinkId = await deep.id("@deep-foundation/core", "Contain"); // Retrieve the link ID for the "Contain" type.
  const networkStatusTypeLinkId = await deep.id(PACKAGE_NAME, "NetworkStatus"); // Retrieve the link ID for the "NetworkStatus" type.

  const { data: [{ id: containerLinkId = undefined } = {}] = [] } = await deep.select({ type_id: networkStatusTypeLinkId }); // Check if a container link already exists for the "NetworkStatus" type.

  if (!containerLinkId) {
    const { data: [{ id: newContainerLinkId }] } = await deep.insert({
      type_id: networkStatusTypeLinkId,
      in: {
        data: {
          type_id: containTypeLinkId,
          from_id: deep.linkId,
          string: { data: { value: LinkName[LinkName.NetworkStatus] } },
        }
      }
    }); // Create a new container link for the "NetworkStatus" type.

    return newContainerLinkId; // Return the ID of the new container.
  } else {
    alert("Container link already exists!"); // If a container link already exists, show an alert.
    return containerLinkId; // Return the existing container link ID.
  }
}