<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'

definePageMeta({
  name: 'control',
})

const { data: dataFetch } = useFetch('/api/control/state')
const { data: dataSocket } = useWebSocket('/api/control/websocket')

const data = computed<typeof dataFetch['value']>(() => {
  if(dataSocket.value) {
    return JSON.parse(dataSocket.value)
  }

  return dataFetch.value
})
</script>

<template>
  <div>
    <h1>Controle Remoto</h1>

    <div class="flex justify-center items-center h-300px">
      <div class="flex gap-xs m-x-8" v-if="data">
        <CommandButton
          command="A"
          density="compact"
          icon="mdi-circle-small"
          :color="Number(data.pump1) ? 'green' : 'warning'"
        />
        <CommandButton
          command="B"
          density="compact"
          icon="mdi-circle-small"
          :color="Number(data.pump2) ? 'green' : 'warning'"
        />
        <CommandButton
          command="C"
          density="compact"
          icon="mdi-circle-small"
          :color="Number(data.pump3) ? 'green' : 'warning'"
        />
        <CommandButton
          command="D"
          density="compact"
          icon="mdi-circle-small"
          color="warning"
        />
      </div>

      <div class="flex gap-xs">
        <VBtn
          density="compact"
          icon="mdi-circle-small"
          color="orange-darken-4"
        />
        <VBtn
          density="compact"
          icon="mdi-circle-small"
          color="red-accent-4"
        />
      </div>
    </div>
  </div>
</template>
