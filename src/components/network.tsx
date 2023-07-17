import React, { useEffect, useState } from 'react';
import { DeepClient } from '@deep-foundation/deeplinks/imports/client';
import { Button, Stack, Text } from '@chakra-ui/react';
import { saveNetworkStatuses } from '../save-network-status';
import { useContainer } from '../hooks/use-container';
import { useNetworkStatus } from '../hooks/use-network-status';

/**
 * React component that manages network state.
 * @param {DeepClient} deep - The DeepClient object instance.
 */

export function NetworkStatus({ deep }: { deep: DeepClient; }) {

  const containerLinkId = useContainer(deep); // Get the container's link ID  using deep client instance.
  const { connectionStatuses, subscribeToNetworkStatusChanges } = useNetworkStatus({ deep, containerLinkId }); // Get the current network status and a function to subscribe to network status changes.

  // A render function that returns a stack layout UI, with two buttons 
  // one for subscribing to network changes, and another one for saving the current network state.
  // map function to display all connnection statuses existing in local store variable connectionStatuses.
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
        onClick={async () => await saveNetworkStatuses({ deep, containerLinkId })}
      >
        <Text>SAVE CURRENT</Text>
      </Button>
      <Text>CURRENT:</Text>
      {connectionStatuses.map((status) => (
        <Stack>
          <Text>{status.connectionType}</Text>
          <Text>{status.connected ? "connected" : "disconnected"}</Text>
        </Stack>
      ))}
    </Stack>
  );
}