<script setup lang="ts">
import type { PumpData } from '../pages/control.vue';

defineProps<{
  data: PumpData
}>()
</script>

<template>
  <div class="bg-black w-300px h-65px text-2xl">
    <div class="grid grid-cols-3">
      <div class="flex flex-col">
        <div>B1> {{ Number(data?.pump1) === 1 ? 'L' : 'D' }}</div>
        <div>I > {{ data?.cisternLevel }}</div>
      </div>
      <div class="flex flex-col">
        <div>B2> {{ Number(data?.pump2) === 1 ? 'L' : 'D' }}</div>
        <div>S > {{ data?.superiorTankLevel }}</div>
      </div>
      <div class="flex flex-col">
        <div>B3> {{ Number(data?.pump3) === 1 ? 'L' : 'D' }}</div>
        <div>A > {{ Number(data?.alarm) === 1 ? 'L' : 'D' }} {{ Number(data?.autoManual) === 1 ? 'A' : 'M' }}</div>
      </div>
    </div>
  </div>
</template>
