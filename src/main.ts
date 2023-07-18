export { PACKAGE_NAME } from './package-name';
export { createContainer } from './create-container';
export { saveNetworkStatus, type ISaveNetworkStatusOptions } from './save-network-status';
export { uploadStatus, type IUploadStatusOptions } from './upload-status';
export { getCurrentStatus, type NetworkStatusType } from './get-current-status';
export { LinkName } from './link-name';
export { NetworkStatus } from './components/network';
export { useContainer } from './hooks/use-container';
export { useNetworkStatus, type IUseNetworkStatusProps } from './hooks/use-network-status';

import { createContainer } from './create-container';
import { getCurrentStatus } from './get-current-status';
import { saveNetworkStatus } from './save-network-status';

export const Network = {
    createContainer,
    getCurrentStatus,
    saveNetworkStatus
}