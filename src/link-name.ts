/**
 * Contains the names of all links within this package. 
 * 
 * @example
```ts
const networkTypeLinkId = await deep.id(
   PACKAGE_NAME,
   LinkName[LinkName.Network]
)
```
 */
export enum LinkName {
   NetworkStatus,
   Network,
   Wifi,
   Cellular,
   Unknown,
   None,
   True,
   False
}