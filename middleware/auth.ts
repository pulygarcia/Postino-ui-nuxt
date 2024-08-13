export default defineNuxtRouteMiddleware(async (to, from) => {

    const user = ref(null);
    const token = localStorage.getItem('auth_jwt');

    if(!token){
        return navigateTo('/login')
    }

    try {
        const response = await fetch('http://localhost:4000/api/auth/user', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        user.value = data.userName;

        if(user.value){
            //console.log(user.value);
            navigateTo(to.fullPath)
        }

    } catch (error) {
        return navigateTo('/login')
    }
    
})