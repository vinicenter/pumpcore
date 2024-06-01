<script setup lang="ts">
const props = defineProps<{
  command: string
  label?: string
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

const attrs = useAttrs()
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="text-black flex flex-col items-center">
      <slot name="label">
        {{ label }}
      </slot>
    </div>

    <VBtn
      v-bind="attrs"
      @click="sendCommand()"
    />
  </div>
</template>
