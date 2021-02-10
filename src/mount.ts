import { execAsync, VOLUME_REGEX, generateCommand } from './utils'

export const mount = async (
  dmgPath: string,
  callback?: (volumePath: string) => void
): Promise<string> => {
  const { stdout, stderr } = await execAsync(
    generateCommand({ mount: true })(dmgPath)
  )

  if (stderr !== undefined) {
    throw new Error(stderr)
  }

  const match = stdout.match(VOLUME_REGEX)
  if (match === null) {
    throw new Error(`Could not extract path out of mount result: ${stdout}`)
  }

  if (callback !== undefined) {
    callback(match[0])
  }

  return match[0]
}
