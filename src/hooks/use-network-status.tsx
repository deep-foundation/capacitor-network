import React, { useEffect, useState } from 'react';
import { ConnectionStatus, Network } from '@capacitor/network';
import { useLocalStore } from '@deep-foundation/store/local';
import { saveNetworkStatus } from '../save-network-status';
import { PluginListenerHandle } from '@capacitor/core';
import { DeepClient } from '@deep-foundation/deeplinks/imports/client';

export interface IUseNetworkStatusProps {
  deep: DeepClient,
  containerLinkId: number,
}

// This custom hook function accepts deep and containerLinkId as parameters.
// connectionStatusChangeHandler state to manage network event listeners.
// connectionStatuses state to store event data when device is offline.
export const useNetworkStatus = ({ deep, containerLinkId }: IUseNetworkStatusProps) => {

  // Initialize connectionStatuses state with an empty array using the useState hook.
  const [connectionStatuses, setConnectionStatuses] =
    useLocalStore<ConnectionStatus[]>("Network connections", []);

  // Initialize connectionStatusChangeHandler with undefined using the useState hook.
  const [connectionStatusChangeHandler, setConnectionStatusChangeHandler] =
    useState<PluginListenerHandle | undefined>();

  // This function subscribes to network status changes. When the status changes it adds it to the connectionStatuses state.
  const subscribeToNetworkStatusChanges = async () => {
    // If there is already a listener, remove it.
    if (connectionStatusChangeHandler) {
      connectionStatusChangeHandler.remove();
    }

    // Add a network status change listener.
    const newConnectionStatusesChangesHandler = await Network.addListener(
      'networkStatusChange',
      async (connectionStatus) => {
        // When the network status changes, add the new status to the connectionStatuses state.
        setConnectionStatuses([
          ...connectionStatuses,
          connectionStatus,
        ]);
      }
    );

    // Update the connectionStatusChangeHandler state with the new handler.
    setConnectionStatusChangeHandler(newConnectionStatusesChangesHandler);
  }

  // useEffect hook that updates whenever connectionStatuses state changes.
  useEffect(() => {
    new Promise(async () => {
      // Get the current network status.
      const currentNetworkStatus = await Network.getStatus();

      // If there is no connection, do nothing.
      if (currentNetworkStatus.connectionType === 'none') {
        return;
      }
      // If there are connection statuses in the state, save them and empty the state.
      if (connectionStatuses.length > 0) {
        saveNetworkStatus({ deep, containerLinkId, connectionStatuses });
        setConnectionStatuses([]);
      }
    });
  }, [connectionStatuses]);

  // useEffect hook that triggers when the component mounts or containerLinkId changes.
  useEffect(() => {
    // Subscribe to network status changes.
    subscribeToNetworkStatusChanges();
  }, [containerLinkId]);

  // Return connectionStatuses state and subscribeToNetworkStatusChanges function.
  return { connectionStatuses, subscribeToNetworkStatusChanges };
}