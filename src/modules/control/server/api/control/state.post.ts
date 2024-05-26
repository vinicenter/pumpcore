import WebSocket from 'ws';

import { PumpStates } from "~/server/database/schema"

export default defineEventHandler(async (event) => {
  const drizzle = event.context.drizzle
  const { state } = await readBody(event)
  const requestUrl = getRequestURL(event)

  const states = state.split(';')

  const pumpState = {
    autoManual: states[0],
    pump1: states[1],
    pump2: states[2],
    pump3: states[3],
    alarm: states[4],
    cisternLevel: states[5],
    superiorTankLevel: states[6],
    ib1: states[7],
    ib2: states[8],
    ib3: states[9],
    lad: states[10],
    pump1State: states[11],
    pump2State: states[12],
    pump3State: states[13],
    al: states[14],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  // only for testing porpuses
  const pumps = await drizzle.select().from(PumpStates)
  if (pumps.length === 0) {
    await drizzle.insert(PumpStates).values(pumpState)
  } else {
    await drizzle.update(PumpStates).set(pumpState)
  }

  const updatePumpSocket = () => {
    const socket = new WebSocket(`ws://${requestUrl.host}/api/control/websocket`)
  
    socket.on('open', () => {
      const data = {
        type: 'new/state',
        payload: pumpState,
      }
  
      socket.send(JSON.stringify(data))
      socket.close()
    })
  }

  updatePumpSocket()
})
