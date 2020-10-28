# dmg-utils [WIP]

> Util lib for DMG files.

[![npm](https://img.shields.io/npm/v/dmg-utils.svg?style=flat-square)](https://www.npmjs.com/package/dmg-utils)
[![David](https://img.shields.io/david/exuanbo/dmg-utils.svg?style=flat-square)](https://david-dm.org/exuanbo/dmg-utils)

By now it only works on macOS.

## Install

```sh
npm install dmg-utils
```

## API

### command

```ts
export declare const command: <
  T extends string,
  K extends `hdiutil mount -nobrowse "${T}"` | `hdiutil unmount "${T}"`
>(mount: boolean) => (path: T) => K
```

```js
import { command } from 'dmg-utils'

command(true)('./App.dmg')
//=> 'hdiutil mount -nobrowse "./App.dmg"'

command(false)('/Volumes/App')
//=> 'hdiutil unmount "/Volumes/App"'
```

### mount

```ts
export declare const mount: <T = string>(
  dmgPath: string,
  callback?: ((volumePath: string) => T) | undefined
) => Promise<string | T>
```

Returns mounted volume path if no callback function provided.

### unmount

```ts
export declare const unmount: (
  volumePath: string,
  callback?: Function | undefined
) => Promise<void>
```

### extract

```ts
export declare const extract: (
  dmgPath: string,
  destPath: string
) => Promise<void>
```

Uses `copy` from `fs-extra`.

## License

[MIT License](https://github.com/exuanbo/dmg-utils/blob/main/LICENSE) © 2020 [Exuanbo](https://github.com/exuanbo)
