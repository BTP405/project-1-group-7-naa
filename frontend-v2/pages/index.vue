<script setup>

import { useAuthStore } from '~/stores/auth'
import { storeToRefs } from 'pinia';

const authenticateUser = useAuthStore();
const authenticated = storeToRefs(useAuthStore());

const login = async () => {
    await authenticateUser()
}


</script>

<template>
    <div class="">
        <Hero />
    </div>
</template>