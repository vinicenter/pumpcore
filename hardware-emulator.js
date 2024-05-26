import http from 'http'

const API_URL = 'http://localhost:3000/api/control/state'
const UPDATE_MINUTES = 1

let actualState = "0;0;0;0;0;100;120;0;0;0;0;0;0;0;0"

function getState() {
  const stateArray = actualState.split(';')

  return {
    autoManual: stateArray[0] === '1',
    pump1: stateArray[1] === '1',
    pump2: stateArray[2] === '1',
    pump3: stateArray[3] === '1',
    alarm: stateArray[4] === '1',
    cisternLevel: parseInt(stateArray[5]),
    superiorTankLevel: parseInt(stateArray[6]),
    ib1: stateArray[7] === '1',
    ib2: stateArray[8] === '1',
    ib3: stateArray[9] === '1',
    lad: stateArray[10] === '1',
    pump1State: stateArray[11],
    pump2State: stateArray[12],
    pump3State: stateArray[13],
    al: stateArray[14],
  }
}

function updateState(position, value) {
  const stateArray = actualState.split(';')
  stateArray[position] = value
  actualState = stateArray.join(';')

  sendState()
}

function onDataInput(data) {
  const state = getState()

  const dataInputs = {
    A: () => updateState(1, state.pump1 ? '0' : '1'),
  }

  try {
    dataInputs[data.trim()]()
  } catch (e) {
    console.log(e)

    console.log('Invalid input')
  }
}


http.createServer((req, res) => {
  const [ _domain, data ] = req.url.split('/?')

  onDataInput(data)

  res.end()
}).listen(3001)

process.stdin.on("data", data => {
  data = data.toString().toUpperCase()

  onDataInput(data)
})

async function sendState() {
  console.log('state sent: ', actualState)

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state: actualState }),
    });
  } catch(e) {
    console.log('Error sending state to API: ', e)
  }
}

async function main() {
  setInterval(() => sendState(), UPDATE_MINUTES * 60 * 1000)

  console.log('Pumpcore hardware emulator started.')
}

main()
