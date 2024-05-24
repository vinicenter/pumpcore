<script setup lang="ts">
interface Item {
  title: string
  childrens?: Item[]
  onClick?: Function
  divider?: boolean
  icon?: string
}

const router = useRouter()

const drawer = ref(true)

const items: Item[][] = [
  [
    {
      title: 'Início',
      onClick: () => router.push({ name: 'home' }),
      icon: 'mdi-home',
    },
    {
      title: 'Controle Remoto',
      onClick: () => router.push({ name: 'control' }),
      divider: true,
      icon: 'mdi-remote',
    },
  ],
]
</script>

<template>
  <VLayout class="rounded rounded-md">
    <VAppBar color="primary">
      <VAppBarNavIcon @click="drawer = !drawer" />
      <VAppBarTitle>Pumpcore</VAppBarTitle>
    </VAppBar>

    <VNavigationDrawer v-model="drawer" location="left" width="250">
      <div class="h-100px flex items-center">
        <VListItem
          title="Usuário"
        >
          <template #prepend>
            <VAvatar
              color="brown"
              size="large"
            >
              <span class="text-h6">U</span>
            </VAvatar>
          </template>
  
          <VListItemSubtitle>
            <div>
              <VIcon>mdi-account</VIcon>
              Usuário
            </div>
          </VListItemSubtitle>
        </VListItem>
      </div>

      <VDivider />

      <VList density="compact" nav>
        <template v-for="(buttons) in items">
          <template v-for="button in buttons">
            <VListItem
              :title="button.title"
              @click="button.onClick"
              :prepend-icon="button.icon"
            />
          </template>

          <VDivider />
        </template>
      </VList>
    </VNavigationDrawer>


    <VMain>
      <VContainer class="h-100vh">
        <slot />
      </VContainer>
    </VMain>
  </VLayout>
</template>
