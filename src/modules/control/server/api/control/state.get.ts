import { PumpStates } from "~/server/database/schema"

export default defineEventHandler(async (event) => {
  const drizzle = event.context.drizzle

  const pumps = await drizzle.select().from(PumpStates)

  return pumps.at(0)
})
