import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import pkg from './package.json'

export default [
  {
    external: ['util', 'child_process', ...Object.keys(pkg.dependencies)],
    input: 'src/index.ts',
    plugins: [typescript()],
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ]
  },
  {
    external: ['child_process'],
    input: '.cache/index.d.ts',
    plugins: [dts()],
    output: {
      file: pkg.types,
      format: 'es'
    }
  }
]
