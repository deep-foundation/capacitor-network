import React, { useEffect } from 'react';
import { useLocalStore } from '@deep-foundation/store/local.js';
import { DeepClient } from '@deep-foundation/deeplinks/imports/client.js';
import { createContainer } from '../create-container.js';

// Hook to manage the container link for network status.
// Parameters:
// - deep: The DeepClient instance.
// Returns: The container link ID.

export const useContainer = (deep: DeepClient) => {
    const [containerLinkId, setContainerLinkId] = useLocalStore<number | undefined>(
        'containerLinkId',
        undefined
    );

    useEffect(() => {
        if (!containerLinkId) {
            const initializeContainerLink = async () => {
                setContainerLinkId(await createContainer(deep)); // Create a new container for network status and set the container link ID.
            };
            initializeContainerLink(); // Initialize the container link.
        }
    }, [deep]);

    return containerLinkId as number; // Return the container link ID.
};