<script setup lang="ts">
import type { PumpData } from '../pages/control.vue';

defineProps<{
  state: boolean
}>()
</script>

<template>
  <VBtn
    density="compact"
    :color="state ? 'green' : 'warning'"
    :class="`text-${state ? 'green' : 'warning'}`"
    disabled
    icon="mdi-circle-small"
  />
</template>
