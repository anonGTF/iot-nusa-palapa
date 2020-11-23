import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Electricity from '../views/Electricity.vue'
import Login from '../views/Login.vue'
import Coba from '../views/Coba.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/account',
        name: 'Account',
        component: Account
    },
    {
        path: '/electricity',
        name: 'Electricity',
        component: Electricity
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/coba',
        name: 'Coba',
        component: Coba
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router