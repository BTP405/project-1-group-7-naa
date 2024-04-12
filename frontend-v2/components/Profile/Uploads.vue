<script setup>

const optionsClicked = useState('options', () => false);


const props = defineProps({
    userRiffs: Array,
})

const getBase64Image = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
};

const handleRightClick = () => {
    console.log('Hello');
}


</script>

<template>
    <div>
        <div  class="m-12 py-4">
            <div class="flex flex-center">
                <div class="flex-1">
                    <h2 class="font-bold text-2xl">Uploaded Riffs</h2>
                </div>
                <!-- <div class="flex-none"><button class="btn btn-neutral">Upload a Riff</button></div> -->
                <RiffsModal />
            </div>

            <div class="flex ">
                <UIRiffCard @contextmenu.prevent="handleRightClick" tabindex="0" class="mr-3" v-if="userRiffs" v-for="(riff, index) in userRiffs" :key="index" :title="riff.title" :description="riff.artist"
                    :image-src="getBase64Image(riff.image)" :audioString="riff.mp3_file" :audioId="riff.id" />
            </div>

        </div>

    </div>
</template>