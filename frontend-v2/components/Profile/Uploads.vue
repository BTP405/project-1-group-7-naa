<script setup>

const musicStore = useAudioStore();

const riffClicked = useState(() => false)

const props = defineProps({
    userRiffs: Array,
})

const getBase64Image = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
};

const handleRightClick = () => {
    console.log('Hello');
    riffClicked.value = true;
}


</script>

<template>
    <div>
        <div class="m-12 py-4">

            <div class="flex flex-center mb-10">
                <div class="flex-1">
                    <h2 class="font-bold text-2xl">Uploaded Riffs</h2>
                </div>
                <RiffsModal />
            </div>

            <div class="flex">

                <div class="mr-20 flex items-center justify-center" v-if="musicStore.loading" v-for="skeleton in 6"
                    :key="skeleton">
                    <UISkeletonCard />
                </div>

                    <UIRiffCard v-else class="mr-16" v-if="userRiffs"
                        v-for="(riff, index) in userRiffs" :key="index" :title="riff.title" :description="riff.artist"
                        :image-src="getBase64Image(riff.image)" :audioString="riff.mp3_file" :audioId="riff.id" />
            </div>

        </div>

    </div>
</template>