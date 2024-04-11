<script setup>
const colorMode = useColorMode()

colorMode.preference = 'retro'

</script>

<template>
  <div class="flex flex-col h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
