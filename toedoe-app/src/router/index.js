import { createRouter,createWebHistory } from "vue-router";
import routes from "./routes"
import { userAuthStore } from "../stores/auth"

const router=createRouter({
    routes,
    history:createWebHistory(),
    // linkActiveClass:'active',
});

router.beforeEach(async (to,from)=>{
    console.log('m1')
    const store=userAuthStore()
    console.log('m2')
    await store.fetchUser()
    console.log('m3')
    if(to.meta.auth && !store.isLoggedIn){
        return {
            name:"login",
            query:{
                redirect:to.fullPath
            }
        };
    } else if(to.meta.guest && store.isLoggedIn){
        console.log(store.isLoggedIn)
        return {name:"tasks"};
    }
    console.log('not return')
})

export default router