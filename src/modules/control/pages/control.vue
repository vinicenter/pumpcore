<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'

definePageMeta({
  name: 'control',
})

const { data: dataFetch } = useFetch('/api/control/state')
const { data: dataSocket } = useWebSocket('/api/control/websocket')

export type PumpData = typeof dataFetch['value']

const data = computed<PumpData>(() => {
  if(dataSocket.value) {
    return JSON.parse(dataSocket.value)
  }

  return dataFetch.value
})
</script>

<template>
  <VContainer class="bg-#00FEFE h-100vh">
    <div class="flex flex-col justify-center items-center gap-y-sm">
      <h1>CONTROLE DE BOMBAS</h1>

      <div class="flex">
        <div class="flex flex-col gap-y-sm">
          <div class="flex flex-col gap-y-sm">
            <div class="flex gap-2 items-center">
              <CommandLight :state="Number(data?.ib1) === 1" />
              IB1
            </div>
            <div class="flex gap-2 items-center">
              <CommandLight :state="Number(data?.ib2) === 1" />
              IB2
            </div>
            <div class="flex gap-2 items-center">
              <CommandLight :state="Number(data?.ib3) === 1" />
              IB3
            </div>
            <div class="flex gap-2 items-center">
              <CommandLight :state="Number(data?.lad) === 1" />
              Lad
            </div>
            <div class="flex gap-2 items-center">
              <CommandLight :state="false" />
            </div>
          </div>

          <div class="flex flex-col gap-y-2">
            <div class="flex gap-x-2">
              <div class="flex flex-col gap-1 items-center">
                B1
                <CommandLight :state="Number(data?.pump1State) === 1" />
              </div>

              <div class="flex flex-col gap-1 items-center">
                B2
                <CommandLight :state="Number(data?.pump2State) === 1" />
              </div>
            </div>

            <div class="flex gap-x-2">
              <div class="flex flex-col gap-1 items-center">
                <CommandLight :state="Number(data?.pump3State) === 1" />
                B3
              </div>

              <div class="flex flex-col gap-1 items-center">
                <CommandLight :state="Number(data?.al) === 1" />
                AL
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-center items-center gap-y-sm">
          <div class="flex w-300px justify-end">
            <div class="flex gap-2 items-center">
              <CommandLight :state="true" />
              LIGADO
            </div>
          </div>

          <CommandDisplay :data="data" />

          <div class="flex justify-center items-center h-100px">
            <div class="flex gap-xs m-x-8" v-if="data">
              <CommandButton
                command="A"
                density="compact"
                icon="mdi-circle-small"
                color="yellow"
                class="text-yellow"
              >
                <template #label>
                  <div>B1</div>
                  <div>ON-OFF</div>
                </template>
              </CommandButton>

              <CommandButton
                command="B"
                density="compact"
                icon="mdi-circle-small"
                color="yellow"
                class="text-yellow"
              >
                <template #label>
                  <div>B2</div>
                  <div>ON-OFF</div>
                </template>
              </CommandButton>

              <CommandButton
                command="C"
                density="compact"
                icon="mdi-circle-small"
                color="yellow"
                class="text-yellow"
              >
                <template #label>
                  <div>B3</div>
                  <div>ON-OFF</div>
                </template>
              </CommandButton>

              <CommandButton
                command="E"
                density="compact"
                icon="mdi-circle-small"
                color="yellow"
                class="text-yellow"
              >
                <template #label>
                  <div>AL</div>
                  <div>ON-OFF</div>
                </template>
              </CommandButton>
            </div>

            <div class="flex gap-xs">
              <CommandButton
                command="D"
                density="compact"
                icon="mdi-circle-small"
                color="red"
                class="text-red"
              >
                <template #label>
                  <div>AUTO</div>
                  <div>MANUAL</div>
                </template>
              </CommandButton>

              <CommandButton
                command="F"
                density="compact"
                icon="mdi-circle-small"
                color="red"
                class="text-red"
              >
                <template #label>
                  <div>PROG</div>
                  <div>PUSH</div>
                </template>
              </CommandButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </VContainer>
</template>
