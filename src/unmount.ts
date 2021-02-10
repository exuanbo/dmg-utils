import { execAsync, VOLUME_REGEX, command } from './utils'

export const unmount = async (
  volumePath: string,
  callback?: () => void
): Promise<void> => {
  if (!VOLUME_REGEX.test(volumePath)) {
    throw new Error('Path must contain /Volumes/')
  }

  const { stderr } = await execAsync(command(false)(volumePath))

  if (stderr !== undefined) {
    throw new Error(stderr)
  }

  if (callback !== undefined) {
    callback()
  }
}
