export const useAuthStore = defineStore('auth', {

    state: () => ({
        authenticated: useLocalStorage('authenticated', false),
        loading: false,
        userData: useLocalStorage('userData', {}),
    }),

    actions: {
        async authenticateUser(username, password) {

            const { data, pending } = await useFetch(loginRoute, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: {username, password},
            })

            this.loading = pending;

            if (data.value) {
                const token = useCookie('token');
                token.value = data?.value?.token;
                this.authenticated = true;
                this.userData = jwtDecode(token.value);
                localStorage.setItem('userData', JSON.stringify(this.userData));
            }
        },

        logoutUser() {
            const token = useCookie('token');
            this.authenticated = false;
            localStorage.removeItem('userData');
            token.value = null;
            useAudioStore().stopAudio();
            useAudioStore().$reset();
        },
    },
});