<script setup lang="ts">
const props = defineProps<{
  command: string
}>()

const loading = ref(false)

const sendCommand = async () => {
  try {
    loading.value = true

    await $fetch('/api/control/command', {
      method: 'POST',
      body: {
        command: props.command
      }
    })
  } catch {
    alert('Erro ao enviar comando')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <VBtn @click="sendCommand()" />
</template>
