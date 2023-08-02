import { defineStore } from "pinia";
import { computed,ref } from "vue";
import { csrfCookie,login,register,logout,getUser } from "../http/auth-api";

export const userAuthStore=defineStore("authStore",()=>{
    const user=ref(null)
    const errors=ref({}) 

    const isLoggedIn=computed(()=>!!user.value)

    const fetchUser=async()=>{
        try{
            const {data}=await getUser()
            user.value=data
            console.log('user.value='+user.value)
        }
        catch(error){
            user.value=null
            console.log('error')
        }
    }

    const handleLogin=async(credentials)=>{
        console.log('h1')
        await csrfCookie()
        try{
            console.log('h2')
            await login(credentials)
            console.log('h3')
            await fetchUser()
            console.log('h4')

            errors.value={}
        }
        catch(error){
            if(error.response && error.response.status===422){
                errors.value=error.response.data.errors
            }
        }
    }

    const handleRegister=async(newUser)=>{
        await csrfCookie()
        try{
            await register(newUser)
            await handleLogin({
                email:newUser.email,
                password:newUser.password
            })
        }
        catch(error){
            if(error.response && error.response.status===422){
                errors.value=error.response.data.errors
            }
        }
    }

    const handleLogout=async()=>{
        await logout()
        user.value=null
    }

    return {
        user,
        errors,
        isLoggedIn,
        fetchUser,
        handleLogin,
        handleRegister,
        handleLogout
    }
})


