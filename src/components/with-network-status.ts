import React, { useEffect, useState, ReactElement, cloneElement } from 'react';
import { 
    useContainer, 
    useNetworkStatus, 
    useCurrentStatus,
    saveNetworkStatus,
    uploadStatus,
    IUploadStatusOptions, 
    IUseNetworkStatusProps 
} from '../main'; 

type WithNetworkStatusProps = IUseNetworkStatusProps & {
    children: ReactElement;
};

const WithNetworkStatus: React.FC<WithNetworkStatusProps> = ({ deep, containerLinkId: passedContainerLinkId, children }) => {
    const containerLinkIdFromHook = useContainer(deep);
    const [containerLinkId, setContainerLinkId] = useState<number>(passedContainerLinkId || containerLinkIdFromHook);

    useEffect(() => {
        setContainerLinkId(passedContainerLinkId || containerLinkIdFromHook);
    }, [deep, passedContainerLinkId, containerLinkIdFromHook]);

    const { 
        connectionStatuses, 
        subscribeToNetworkStatusChanges 
    } = useNetworkStatus({ deep, containerLinkId });

    const { currentStatus } = useCurrentStatus({ deep, containerLinkId });

    const saveCurrentStatus = async () => {
        await saveNetworkStatus({ deep, containerLinkId, connectionStatuses: [] });
    };

    const uploadCurrentStatus = async (options: IUploadStatusOptions) => {
        await uploadStatus(options);
    };

    const childWithProps = React.cloneElement(children, {
        currentStatus,
        subscribeToNetworkStatusChanges,
        saveNetworkStatus: saveCurrentStatus,
        uploadStatus: uploadCurrentStatus,
        containerLinkId
    });

    return childWithProps;
};

export default WithNetworkStatus;