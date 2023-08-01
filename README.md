[![npm](https://img.shields.io/npm/v/@deep-foundation/capacitor-network.svg)](https://www.npmjs.com/package/@deep-foundation/capacitor-network) 
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/deep-foundation/capacitor-network) 
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label&color=purple)](https://discord.gg/deep-foundation)

Provides links&functions based on [`@capacitor/network`](https://www.npmjs.com/package/@capacitor/network). 

[**Documentation**](https://deep-foundation.github.io/capacitor-network/) 

[**List of links**](https://deep-foundation.github.io/capacitor-network/enums/LinkName.html)

## NetworkStatus

The [`NetworkStatus`] link serves as a container for link structure representing network status inside deep.
You need only one container link per deep instance.

## Prerequisitions
- Install this package in your deep by using npm-packager
- Provide permissions to this package

## Library Usage
1. Import the library into your TypeScript project:

```js
import Network from "@deep-foundation/capacitor-network";
```

2. Create container link of type [`NetworkStatus`] to store Network state:

```js
const containerLinkId = await Network.createContainer(deep:DeepClient)
```

You can also create it manually inside your deepcase client. Open Insert menu, search for and then insert "NetworkStatus" type link.

3. Save&Upload network status:

Call saveNetworkStatus function and pass an empty array as connectionStatuses to automatically get current network state and upload data as links to your deep instance.
```js
await Network.saveNetworkStatus({ deep, containerLinkId, connectionStatuses: [] })
```

4. Get current status of the network as [`NetworkStatusType`] from your deep instance:

Call getCurrentStatus function and pass your deep instance with container link ID.
```js
await Network.getCurrentStatus({ deep, containerLinkId })
```

## React Usage
1. Import NetworkStatus react component or hooks:

```js
import { NetworkStatus, useNetworkStatus, useCurrentStatus, useContainer } from "@deep-foundation/capacitor-network";
```

2. Create NetworkStatus component instance inside your deep app and pass a DeepClient instance.

```jsx
function Page() {
  return <NetworkStatus deep={useDeep()} />
}
```

You will see basic ui with all package functionality.

3. Custom hooks can be used anywhere in your deep app:

useNetworkStatus() hook for managing network event listeners from [`@capacitor/network`] and store event data when device is offline.
```js
const { connectionStatuses, subscribeToNetworkStatusChanges } = useNetworkStatus({ deep, containerLinkId });
```

useCurrentStatus() hook to get current status of the network from your deep instance and handler function to refetch current state when needed.
```js
const { currentStatus, loadCurrentStatus } = useCurrentStatus({ deep, containerLinkId });
```

useContainer() hook to get existing or create a new container link ID.
```js
const containerLinkId = useContainer(deep);
```

## Contribution

Feel free to contribute. Please fork the repository and submit a pull request for any bugs, improvements, or features.

[`NetworkStatus`]: https://deep-foundation.github.io/capacitor-network/enums/LinkName.html#NetworkStatus
[`NetworkStatusType`]: https://deep-foundation.github.io/capacitor-network/interfaces/NetworkStatusType.html
[`@capacitor/network`]: https://www.npmjs.com/package/@capacitor/network
