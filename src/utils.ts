import { promisify } from 'util'
import { exec } from 'child_process'

export const VOLUME_REGEX = /\/Volumes\/(.*)/m

export const execAsync = promisify(exec)

type Action = 'mount -nobrowse' | 'unmount'
type Command = `hdiutil ${Action} "${string}"`

export const generateCommand = ({ mount }: { mount: boolean }) => (
  path: string
): Command => `hdiutil ${mount ? 'mount -nobrowse' : 'unmount'} "${path}"`
