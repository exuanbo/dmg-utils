import { copy } from 'fs-extra'
import { promisify } from 'util'
import { exec } from 'child_process'

const execAsync = promisify(exec)

const VOLUME_REGEX = /\/Volumes\/(.*)/m

const command = (isMount: boolean) => (path: string) =>
  `hdiutil ${isMount ? 'mount -nobrowse' : 'unmount'} "${path}"`

export const mount = async <T = string>(
  dmgPath: string,
  callback?: (volumePath: string) => T
): Promise<string | T> => {
  const { stdout, stderr } = await execAsync(command(true)(dmgPath))

  if (stderr) {
    throw new Error(stderr)
  }

  const match = stdout.match(VOLUME_REGEX)
  if (!match) {
    throw new Error(`Could not extract path out of mount result: ${stdout}`)
  }

  if (callback) {
    return callback(match[0])
  }

  return match[0]
}

export const unmount = async (
  volumePath: string,
  callback?: Function
): Promise<void> => {
  if (!VOLUME_REGEX.test(volumePath)) {
    throw new Error('Path must contain /Volumes/')
  }

  const { stderr } = await execAsync(command(false)(volumePath))

  if (stderr) {
    throw new Error(stderr)
  }

  if (callback) {
    callback()
  }
}

export const extract = async (dmgPath: string, destPath: string) => {
  const volumePath = await mount(dmgPath)

  await copy(volumePath, destPath, { recursive: true })

  await unmount(volumePath)
}
