import React, { useEffect, useState } from 'react';
import { ConnectionStatus, Network } from '@capacitor/network';
import { useLocalStore } from '@deep-foundation/store/local';
import { DeepClient } from '@deep-foundation/deeplinks/imports/client';
import { Button, Stack, Text } from '@chakra-ui/react';
import { saveNetworkStatuses } from '../save-network-status';
import { PluginListenerHandle } from '@capacitor/core';

export function NetworkStatus({ deep }: { deep: DeepClient; }) {

  const [connectionStatuses, setConnectionStatuses] =
    useLocalStore<Array<ConnectionStatus>>("Network connections", []);
    
  const [connectionStatusChangeHandler, setConnectionStatusChangeHandler] =
    useState<PluginListenerHandle | undefined>();

  useEffect(() => {
    new Promise(async () => {
      const currentNetworkStatus = await Network.getStatus();
      if (currentNetworkStatus.connectionType === 'none') {
        return;
      }
      if (connectionStatuses.length > 0) {
        saveNetworkStatuses({ deep, containerLinkId, connectionStatuses });
        setConnectionStatuses([]);
      }
    });
  }, [connectionStatuses]);

  async function subscribeToNetworkStatusChanges() {
    if (connectionStatusChangeHandler) {
      connectionStatusChangeHandler.remove();
    }
    const newConnectionStatusesChangesHandler = await Network.addListener(
      'networkStatusChange',
      async (connectionStatus) => {
        setConnectionStatuses([
          ...connectionStatuses,
          connectionStatus,
        ]);
      }
    );
    setConnectionStatusChangeHandler(newConnectionStatusesChangesHandler);
  }

  return (
    <Stack>
      <Button
        onClick={async () => {
          await subscribeToNetworkStatusChanges();
        }}
      >
        <Text>Subscribe to network changes</Text>
      </Button>
      <Button
        onClick={async () => await saveNetworkStatuses({ deep, containerLinkId })}
      >
        <Text>Save current network state</Text>
      </Button>
    </Stack>
  );
}
