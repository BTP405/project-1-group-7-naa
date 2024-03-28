<script setup>

const colorMode = useColorMode();

colorMode.preference = 'garden'

</script>

<template>
  <div class="flex flex-col h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
