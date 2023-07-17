[![npm](https://img.shields.io/npm/v/@deep-foundation/capacitor-network.svg)](https://www.npmjs.com/package/@deep-foundation/capacitor-network) 
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/deep-foundation/capacitor-network) 
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label&color=purple)](https://discord.gg/deep-foundation)

Provides links&functions based on [`capacitor-network`](https://www.npmjs.com/package/capacitor-network). 

[**Documentation**](https://deep-foundation.github.io/capacitor-network/) 

[**List of links**](https://deep-foundation.github.io/capacitor-network/enums/LinkName.html)

## Camera

The [`Camera`] link serves as a container for link structures representing records inside deep.  
You need only one container link per deep instance.

## Prerequisitions
- Install this package in your deep by using npm-packager
- Provide permissions to this package

## Usage
1. Import the library into your TypeScript project:

```js
import Camera, { createContainer } from "@deep-foundation/capacitor-network";
```

2. For mobile apps use getCameraPermissions function to request user action for setting app's camera and gallery permissions.
```js
const CameraPermissions = await getCameraPermissions();
```

3. Create container link of type [`Camera`] to store Camera data:

```js
const containerLinkId = await createContainer(deep:DeepClient)
```

You can also create it manually inside your deepcase client. Open Insert menu, search for and then insert "AudioRecords" type link.

4. Take photos:

Capture a new photo.
```js
const photo = await Camera.takePhoto(options?);
```
Upload the array of captured photos to deep database.
```js 
await Camera.uploadPhotos({ deep, containerLinkId, photos });
// To upload one photo pass it inside an array. [photo]
```

5. Pick photos from gallery:

Pick a new photo.
```js
const galleryPhotos = await Camera.pickGalleryPhotos(options?);
```
Upload the array of picked photos to deep database.
```js 
await Camera.uploadGallery({ deep, containerLinkId, galleryPhotos });
```

5. Download images from deep database:

Download all existing images made by this camera package as an array.
```js
const images = await downloadImages(deep);
```

## React Usage
1. Import CapacitorCamera react component or hooks:

```js
import { CapacitorCamera, useCamera, useGallery, usePermissions, useContainer } from "@deep-foundation/capacitor-network";
```

2. Create CapacitorCamera component instance inside your deep app and pass a DeepClient instance.

```jsx
function Page() {
  return <CapacitorCamera deep={useDeep()} />
}
```

You will see basic ui with all package functionality.

3. Custom hooks can be used anywhere in your deep app:

useCamera() hook for taking a new photo with the camera.
```js
const { photos, newPhoto } = useCamera({ deep, containerLinkId });
```

useGallery() hook for picking photos from gallery.
```js
const { galleryPhotos, pickPhotosFromGallery } = useGallery({ deep, containerLinkId });
```

useContainer() hook to get existing or create a new container link ID.
```js
const containerLinkId = useContainer(deep);
```

usePermissions() hook to manage camera and gallery permissions.
```js
const { cameraPermissions, getPermissions } = usePermissions();
```

## Contribution

Feel free to contribute. Please fork the repository and submit a pull request for any bugs, improvements, or features.

[`Camera`]: https://deep-foundation.github.io/capacitor-device/enums/LinkName.html#Camera