import { execAsync, VOLUME_REGEX, command } from './utils'

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
