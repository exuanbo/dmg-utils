import { copy } from 'fs-extra'
import { mount } from './mount'
import { unmount } from './unmount'

export const extract = async (dmgPath: string, destPath: string) => {
  const volumePath = await mount(dmgPath)

  await copy(volumePath, destPath, { recursive: true })

  await unmount(volumePath)
}
