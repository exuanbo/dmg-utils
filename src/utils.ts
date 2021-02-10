import { promisify } from 'util'
import { exec } from 'child_process'

export const VOLUME_REGEX = /\/Volumes\/(.*)/m

export const execAsync = promisify(exec)

type Action = 'mount -nobrowse' | 'unmount'
type Command<T extends string> = `hdiutil ${Action} "${T}"`

export const generateCommand = <T extends string>({
  mount
}: {
  mount: boolean
}) => (path: T): Command<T> =>
  `hdiutil ${mount ? 'mount -nobrowse' : 'unmount'} "${path}"`
