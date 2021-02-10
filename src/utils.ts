import { promisify } from 'util'
import { exec } from 'child_process'

export const VOLUME_REGEX = /\/Volumes\/(.*)/m

export const execAsync = promisify(exec)

type Action = 'mount -nobrowse' | 'unmount'
type Command<T extends string> = `hdiutil ${Action} "${T}"`

export const command = <T extends string, K extends Command<T>>(
  mount: boolean
) => (path: T): K =>
  `hdiutil ${mount ? 'mount -nobrowse' : 'unmount'} "${path}"` as K
