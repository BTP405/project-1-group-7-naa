<script setup>

const musicStore = useAudioStore();

musicStore.fetchUploads()

</script>

<template>
    <div class="flex flex-col h-screen">

        <div v-motion-fade-visible-once><ProfileUploads :userRiffs="musicStore.usersUploads" /></div>
        <ProfilePlaylists />

        <UIMusicPlayer />
    </div>
</template>