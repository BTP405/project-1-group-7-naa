<script setup>


</script>

<template>
    <div class="hero min-h-screen">
        <div class="hero-content text-center">
            <div class="max-w-screen-lg flex flex-col items-center justify-center">

                <h1 class="text-6xl font-bold">Welcome to RiffRoom</h1> 
                <p class="py-6 text-base">RiffRoom is a music library platform where users can upload songs, like their
                    favorite
                    songs, and create playlists for enjoyment.
                </p>
                <div class="flex">
                    <RegisterModal />
                    <LoginModal />
                </div>
            </div>
        </div>
    </div>
</template>