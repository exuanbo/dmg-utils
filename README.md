# dmg-utils [WIP]

> Util lib for DMG files.

[![npm](https://img.shields.io/npm/v/dmg-utils.svg?style=flat-square)](https://www.npmjs.com/package/dmg-utils)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

By now it only works on macOS.

## Install

```sh
npm install dmg-utils
```

## API

### command

```ts
declare const generateCommand: <T extends string>({
  mount
}: {
  mount: boolean
}) => (path: T) => `hdiutil mount -nobrowse "${T}"` | `hdiutil unmount "${T}"`
```

```js
import { generateCommand } from 'dmg-utils'

generateCommand({ mount: true })('./App.dmg')
// => 'hdiutil mount -nobrowse "./App.dmg"'

generateCommand({ mount: false })('/Volumes/App')
// => 'hdiutil unmount "/Volumes/App"'
```

### mount

```ts
declare const mount: (
  dmgPath: string,
  callback?: ((volumePath: string) => void) | undefined
) => Promise<string>
```

Returns mounted volume path.

### unmount

```ts
declare const unmount: (
  volumePath: string,
  callback?: (() => void) | undefined
) => Promise<void>
```

### extract

```ts
declare const extract: (dmgPath: string, destPath: string) => Promise<void>
```

Uses `copy` from `fs-extra`.

## License

[MIT License](https://github.com/exuanbo/dmg-utils/blob/main/LICENSE) © 2020 [Exuanbo](https://github.com/exuanbo)
