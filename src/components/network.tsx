import React, { useEffect, useState } from 'react';
import { DeepClient } from '@deep-foundation/deeplinks/imports/client.js';
import { Button, Stack, Text } from '@chakra-ui/react';
import { saveNetworkStatus } from '../save-network-status.js';
import { useContainer } from '../hooks/use-container.js';
import { useNetworkStatus } from '../hooks/use-network-status.js';
import { useCurrentStatus } from '../hooks/use-current-status.js';

/**
 * React component that manages network state. 
 * @param {DeepClient} deep - The DeepClient object instance.
 */
export function NetworkStatus({ deep }: { deep: DeepClient; }) {

  const containerLinkId = useContainer(deep); // Get the container's link ID using deep client instance.
  const { connectionStatuses, subscribeToNetworkStatusChanges } = useNetworkStatus({ deep, containerLinkId });
  // Get the current network status and a function to subscribe to network status changes.

  const { currentStatus, loadCurrentStatus } = useCurrentStatus({ deep, containerLinkId });
  // Get the current network status and a function to load it.

  /**
   * Render function that returns a stack layout UI with two buttons: one for subscribing to network changes and another one for saving the current network state.
   * It also displays all connection statuses existing in the local store variable connectionStatuses.
   */
  return (
    <Stack>
      <Text size="lg">NETWORK STATE</Text>
      <Button
        onClick={async () => {
          await subscribeToNetworkStatusChanges();
        }}
      >
        <Text>SUBSCRIBE</Text>
      </Button>
      <Button
        onClick={async () => await saveNetworkStatus({ deep, containerLinkId, connectionStatuses: [] })}
      >
        <Text>SAVE CURRENT</Text>
      </Button>
      <Button
        onClick={async () => loadCurrentStatus()}
      >
        <Text>GET CURRENT</Text>
      </Button>
      {currentStatus ?
        (<Stack direction="row">
          <Text>CURRENT:</Text>
          <Text>{currentStatus}</Text>
        </Stack>)
        : null
      }
    </Stack>
  );
}