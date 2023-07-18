import React, { useEffect, useState } from 'react';
import { getCurrentStatus } from '../get-current-status';
import { IUseNetworkStatusProps } from './use-network-status';

export const useCurrentStatus = ({ deep, containerLinkId }: IUseNetworkStatusProps) => {
  // Define state variable to store currentStatus.
  const [currentStatus, setCurrentStatus] = useState<string | undefined>(undefined);

  // Load current network status if it does not exist when deep client instance updates.
  useEffect(() => {
    if (!currentStatus) {
      loadCurrentStatus();
    }
  }, [deep]);

  // Async function to load current network status and store it inside currentStatus state variable.
  const loadCurrentStatus = async () => {
    // Set currentStatus to latest status downloaded from deep instance with getCurrentStatus function.
    setCurrentStatus(await getCurrentStatus({ deep, containerLinkId }));
  };


  // Return current network status as currentStatus and loadCurrentStatus handler.
  return { currentStatus, loadCurrentStatus };
};