<script setup>

const { authenticated } = storeToRefs(useAuthStore());
const { logoutUser } = useAuthStore();

const { $locally } = useNuxtApp();


const logout = () => {
    logoutUser();
    navigateTo('/')
}

const loggedInUserInfo = JSON.parse($locally.getItem('userData'));


console.log('Data ', loggedInUserInfo);

</script>

<template>
    <div class="navbar bg-base-100">

        <div class="flex-1 px-2">
            <div class="flex justify-between items-center px-2">
                <!-- Added items-center to vertically center the elements -->
                <div class="text-lg font-bold mr-2">Riffroom</div> <!-- Added mr-4 to add right margin -->
                <Icon name="fa6-solid:music" />
            </div>
        </div>

        <div v-if="authenticated" class="flex-none gap-2">
            <div class="form-control">
                <input type="text" placeholder="Search" class="input input-sm input-bordered w-24 md:w-auto" />
            </div>
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component"
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <ul tabindex="0"
                    class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <span class="p-2 m-2 text-center">Hello, {{ loggedInUserInfo.user_name }}!</span>
                    <li><button @click="logout">Logout</button></li>
                </ul>
            </div>
        </div>
    </div>
</template>