<script setup lang="ts">
const drawer = ref(false)
</script>

<template>
  <VLayout class="rounded rounded-md">
    <VAppBar>
      <VAppBarNavIcon @click="drawer = !drawer" />
      <VAppBarTitle>Pumpcore</VAppBarTitle>
    </VAppBar>

    <VNavigationDrawer v-model="drawer">
      <VList>
        <VListItem title="Navigation drawer"></VListItem>
      </VList>
    </VNavigationDrawer>

    <VMain class="h-100vh">
      <slot />
    </VMain>
  </VLayout>
</template>
