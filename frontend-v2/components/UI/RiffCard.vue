<script setup>

const musicStore = useAudioStore();

const props = defineProps({
    title: String,
    description: String,
    imageSrc: String,
    audioString: String,
    audioId: Number,
})

const playRiff = () => {
    if (musicStore.selectedAudio.id == Number) {
        musicStore.isPlaying = true;
        musicStore.searchForSelectedAudio(props.audioId);
        musicStore.selectedAudio.audioFile.play();
    }  
    
    if (musicStore.selectedAudio.id != Number) {
        musicStore.stopAudio();
        musicStore.isPlaying = true;
        musicStore.searchForSelectedAudio(props.audioId);
        musicStore.selectedAudio.audioFile.play();
    }
}


</script>

<template>
    <div class="relative mr-5 group">
        <img class="h-56 w-56 object-cover rounded-md" :src="imageSrc" alt="Random image">
        <div
            class="absolute inset-0 bg-gray-700 opacity-0 rounded-md transition-opacity duration-300 group-hover:opacity-60">
        </div>
        <div class="absolute inset-0 flex flex-col opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div class="flex flex-col p-4">
                <h3 class="text-2xl font-bold text-white">{{ title }}</h3>
                <div class="gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{{ description }}</div>
            </div>
            <div class="p-3">
                <button @click="playRiff()" class="text-secondary">
                    <Icon size="3rem" name="ic:outline-play-circle-filled" color="bg-primary" />
                </button>
            </div>
        </div>
    </div>

</template>