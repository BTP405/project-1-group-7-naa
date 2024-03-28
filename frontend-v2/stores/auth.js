export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
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
            }
        },

        logoutUser() {
            const token = useCookie('token');
            this.authenticated = false;
            token.value = null;
        },
    },
});