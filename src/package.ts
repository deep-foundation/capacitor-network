
import {
  Package as BasePackage,
  PackageOptions as BasePackageOptions,
} from '@deep-foundation/deeplinks/imports/package.js';

/**
Represents a deep package

@remarks
Contains name of the package and all the links as the objects with id method which returns the id of the link.

@example
#### Use name field to get the name of the package
```ts
const package = new Package({deep});
const {name: packageName} = package;
```
#### Use id method to get the id of the link
```ts
const package = new Package({deep});
const networkTypeLinkId = await package["Network"].id();
const deviceDependencyTypeLinkId = await package["DeviceDependency"].id();
const networkStatusTypeLinkId = await package["NetworkStatus"].id();
const booleanDependencyTypeLinkId = await package["BooleanDependency"].id();
const noneTypeLinkId = await package["None"].id();
const unknownTypeLinkId = await package["Unknown"].id();
const cellularTypeLinkId = await package["Cellular"].id();
const wifiTypeLinkId = await package["Wifi"].id();
```

#### Use idLocal method to get the local id of the link
```ts
const package = new Package({deep});
await package.applyMinilinks();
const networkTypeLinkId = package["Network"].idLocal();
const deviceDependencyTypeLinkId = package["DeviceDependency"].idLocal();
const networkStatusTypeLinkId = package["NetworkStatus"].idLocal();
const booleanDependencyTypeLinkId = package["BooleanDependency"].idLocal();
const noneTypeLinkId = package["None"].idLocal();
const unknownTypeLinkId = package["Unknown"].idLocal();
const cellularTypeLinkId = package["Cellular"].idLocal();
const wifiTypeLinkId = package["Wifi"].idLocal();
```
#### Use name field to get the name of the link
```ts
const package = new Package({deep});
const network = package["Network"].name;
const deviceDependency = package["DeviceDependency"].name;
const networkStatus = package["NetworkStatus"].name;
const booleanDependency = package["BooleanDependency"].name;
const none = package["None"].name;
const unknown = package["Unknown"].name;
const cellular = package["Cellular"].name;
const wifi = package["Wifi"].name;
```
*/
export class Package extends BasePackage {

  constructor(param: PackageOptions) {
    super({
      ...param,
      name: '@deep-foundation/capacitor-network',
    });
  }


      /**
      @example
      #### Use id method to get the id of the Network link
      ```ts
      const package = new Package({deep});
      const networkTypeLinkId = await package["Network"].id();
      ```
      #### Use localId method to get the local id of the Network link
      ```ts
      const package = new Package({deep});
      const networkTypeLinkId = await package["Network"].localId();
      ```
      #### Use name field to get the name of the Network link
      ```ts
      const package = new Package({deep});
      const network = await package["Network"].name;
      ```
      */
      public "Network" = this.createEntity("Network");
      /**
      @example
      #### Use id method to get the id of the DeviceDependency link
      ```ts
      const package = new Package({deep});
      const deviceDependencyTypeLinkId = await package["DeviceDependency"].id();
      ```
      #### Use localId method to get the local id of the DeviceDependency link
      ```ts
      const package = new Package({deep});
      const deviceDependencyTypeLinkId = await package["DeviceDependency"].localId();
      ```
      #### Use name field to get the name of the DeviceDependency link
      ```ts
      const package = new Package({deep});
      const deviceDependency = await package["DeviceDependency"].name;
      ```
      */
      public "DeviceDependency" = this.createEntity("DeviceDependency");
      /**
      @example
      #### Use id method to get the id of the NetworkStatus link
      ```ts
      const package = new Package({deep});
      const networkStatusTypeLinkId = await package["NetworkStatus"].id();
      ```
      #### Use localId method to get the local id of the NetworkStatus link
      ```ts
      const package = new Package({deep});
      const networkStatusTypeLinkId = await package["NetworkStatus"].localId();
      ```
      #### Use name field to get the name of the NetworkStatus link
      ```ts
      const package = new Package({deep});
      const networkStatus = await package["NetworkStatus"].name;
      ```
      */
      public "NetworkStatus" = this.createEntity("NetworkStatus");
      /**
      @example
      #### Use id method to get the id of the BooleanDependency link
      ```ts
      const package = new Package({deep});
      const booleanDependencyTypeLinkId = await package["BooleanDependency"].id();
      ```
      #### Use localId method to get the local id of the BooleanDependency link
      ```ts
      const package = new Package({deep});
      const booleanDependencyTypeLinkId = await package["BooleanDependency"].localId();
      ```
      #### Use name field to get the name of the BooleanDependency link
      ```ts
      const package = new Package({deep});
      const booleanDependency = await package["BooleanDependency"].name;
      ```
      */
      public "BooleanDependency" = this.createEntity("BooleanDependency");
      /**
      @example
      #### Use id method to get the id of the None link
      ```ts
      const package = new Package({deep});
      const noneTypeLinkId = await package["None"].id();
      ```
      #### Use localId method to get the local id of the None link
      ```ts
      const package = new Package({deep});
      const noneTypeLinkId = await package["None"].localId();
      ```
      #### Use name field to get the name of the None link
      ```ts
      const package = new Package({deep});
      const none = await package["None"].name;
      ```
      */
      public "None" = this.createEntity("None");
      /**
      @example
      #### Use id method to get the id of the Unknown link
      ```ts
      const package = new Package({deep});
      const unknownTypeLinkId = await package["Unknown"].id();
      ```
      #### Use localId method to get the local id of the Unknown link
      ```ts
      const package = new Package({deep});
      const unknownTypeLinkId = await package["Unknown"].localId();
      ```
      #### Use name field to get the name of the Unknown link
      ```ts
      const package = new Package({deep});
      const unknown = await package["Unknown"].name;
      ```
      */
      public "Unknown" = this.createEntity("Unknown");
      /**
      @example
      #### Use id method to get the id of the Cellular link
      ```ts
      const package = new Package({deep});
      const cellularTypeLinkId = await package["Cellular"].id();
      ```
      #### Use localId method to get the local id of the Cellular link
      ```ts
      const package = new Package({deep});
      const cellularTypeLinkId = await package["Cellular"].localId();
      ```
      #### Use name field to get the name of the Cellular link
      ```ts
      const package = new Package({deep});
      const cellular = await package["Cellular"].name;
      ```
      */
      public "Cellular" = this.createEntity("Cellular");
      /**
      @example
      #### Use id method to get the id of the Wifi link
      ```ts
      const package = new Package({deep});
      const wifiTypeLinkId = await package["Wifi"].id();
      ```
      #### Use localId method to get the local id of the Wifi link
      ```ts
      const package = new Package({deep});
      const wifiTypeLinkId = await package["Wifi"].localId();
      ```
      #### Use name field to get the name of the Wifi link
      ```ts
      const package = new Package({deep});
      const wifi = await package["Wifi"].name;
      ```
      */
      public "Wifi" = this.createEntity("Wifi");

}

export type PackageOptions = Omit<BasePackageOptions, 'name'>;
