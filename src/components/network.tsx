import React, { useEffect, useState } from 'react';
import { DeepClient } from '@deep-foundation/deeplinks/imports/client';
import { Button, Stack, Text } from '@chakra-ui/react';
import { saveNetworkStatus } from '../save-network-status';
import { useContainer } from '../hooks/use-container';
import { useNetworkStatus } from '../hooks/use-network-status';
import { useCurrentStatus } from '../hooks/use-current-status';

/**
 * React component that manages network state. 
 * @param {DeepClient} deep - The DeepClient object instance.
 * @param {number} containerLinkId - The container link id to store network status.
 */
export function NetworkStatus({ deep, containerLinkId: passedContainerLinkId }: { deep: DeepClient; containerLinkId?: number }) {

  const containerLinkIdFromHook = useContainer(deep);

  const [containerLinkId, setContainerLinkId] = useState(passedContainerLinkId || containerLinkIdFromHook);

  useEffect(() => {
    setContainerLinkId(passedContainerLinkId || containerLinkIdFromHook);
  }, [deep, passedContainerLinkId, containerLinkIdFromHook]);

  const { connectionStatuses, subscribeToNetworkStatusChanges } = useNetworkStatus({ deep, containerLinkId });

  const { currentStatus, loadCurrentStatus } = useCurrentStatus({ deep, containerLinkId });

  return (
    <Stack alignItems="center">
      <Text size="lg">NETWORK STATE</Text>
      <Button onClick={async () => { await subscribeToNetworkStatusChanges(); }}><Text>SUBSCRIBE</Text></Button>
      <Button onClick={async () => await saveNetworkStatus({ deep, containerLinkId, connectionStatuses: [] })}><Text>SAVE CURRENT</Text></Button>
      <Button onClick={async () => loadCurrentStatus()}><Text>GET CURRENT</Text></Button>
      {currentStatus ? (
        <Stack direction="row">
          <Text>CURRENT:</Text>
          <Text>{currentStatus}</Text>
        </Stack>)
        : null
      }
    </Stack>
  );
}