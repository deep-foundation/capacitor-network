export { PACKAGE_NAME } from './package-name.js';
export { createContainer } from './create-container.js';
export { saveNetworkStatus, type ISaveNetworkStatusOptions } from './save-network-status.js';
export { uploadStatus, type IUploadStatusOptions } from './upload-status.js';
export { getCurrentStatus, type NetworkStatusType } from './get-current-status.js';
export { LinkName } from './link-name.js';
export { WithNetworkStatus } from './components/with-network-status.js'
export { NetworkStatus } from './components/network.js';
export { useContainer } from './hooks/use-container.js';
export { useNetworkStatus, type IUseNetworkStatusProps } from './hooks/use-network-status.js';
export {useCurrentStatus} from './hooks/use-current-status.js'

import { createContainer } from './create-container.js';
import { getCurrentStatus } from './get-current-status.js';
import { saveNetworkStatus } from './save-network-status.js';

export {Package,PackageOptions} from './package.js'

export const Network = {
    createContainer,
    getCurrentStatus,
    saveNetworkStatus
}