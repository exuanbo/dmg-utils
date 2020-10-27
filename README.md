# dmg-utils

## Install

```sh
npm install dmg-utils
```

## API

```ts
export declare const mount: <T = string>(
  dmgPath: string,
  callback?: ((volumePath: string) => T) | undefined
) => Promise<string | T>
//=> return mounted volume path if no callback function provided

export declare const unmount: (
  volumePath: string,
  callback?: Function | undefined
) => Promise<void>

export declare const extract: (
  dmgPath: string,
  destPath: string
) => Promise<void>
```

## License

[MIT License](https://github.com/exuanbo/dmg-utils/blob/main/LICENSE) © 2020 [Exuanbo](https://github.com/exuanbo)
