import React, { useEffect, useState } from 'react';
import { getCurrentStatus } from '../get-current-status';
import { IUseNetworkStatusProps } from './use-network-status';

export const useCurrentStatus = ({ deep, containerLinkId }: IUseNetworkStatusProps) => {
  const [currentStatus, setCurrentStatus] = useState<string | undefined>(undefined);

  useEffect(() => {
    loadCurrentStatus();
  }, [deep]);

  const loadCurrentStatus = async () => {
    setCurrentStatus(await getCurrentStatus({ deep, containerLinkId }));
  };


  return { currentStatus, loadCurrentStatus };
};