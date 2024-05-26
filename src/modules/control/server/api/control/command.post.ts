import axios from 'axios'

const DEVICE_API = 'http://localhost:3001'

export default defineEventHandler(async (event) => {
  const payload = await readBody(event)

  const { command } = payload

  try {
    await axios.post(`${DEVICE_API}/${command}`)

    return {
      status: 200,
      message: 'Command sent successfully',
    }
  } catch {
    return createError({
      status: 500,
      message: 'Failed to send command to device',
    })
  }
})
