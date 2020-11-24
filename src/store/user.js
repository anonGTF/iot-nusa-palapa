import router from '../router'
import { URL_API } from "../constants"
import { kirimData } from '../utils'

function state() {
    return {
        userID: null,
        userName: null,
        userEmail: null,
        userAva: null,
        loggedIn: false
    }
}

const mutations = {
    setUserData(state) {
        state.userID = 2110191043
        state.userName = 'Galih Tegar T'
        state.userEmail = 'guess@mail.com'
        state.userAva = 'https://randomuser.me/api/portraits/men/32.jpg'
        state.loggedIn = true
    },
    resetUserData(state) {
        state.userID = null
        state.userName = null
        state.userEmail = null
        state.userAva = null
        state.loggedIn = false
    }
}

const getters = {
    getUserData(state) {
        return {
            userID: state.userID,
            userName: state.userName,
            userEmail: state.userEmail,
            userAva: state.userAva
        }
    },
    isLoggedIn(state) {
        return state.loggedIn
    }
}

const actions = {
    async masuk({ commit, dispatch }, { userEmail, password }) {
        try {
            const url = `${URL_API}/user/auth`

            const respon = await kirimData(url, `email=${userEmail}&password=${password}`)

            if (respon) {
                commit('setUserData',
                    // {
                    //     userID: respon.data.id,
                    //     userName: respon.data.name,
                    //     userEmail: respon.data.email,
                    //     userAva: respon.data.ava
                    // }
                )
                const dataNotification = {
                    apakahTampil: true,
                    pesan: 'Berhasil masuk'
                }
                await dispatch('notification/showNotification', dataNotification, { root: true })
            } else {
                throw new Error(respon.message)
            }
        } catch (error) {
            const dataNotifikasiGalat = {
                apakahTampil: true,
                pesan: error.message
            }
            dispatch('notification/showNotification', dataNotifikasiGalat, { root: true })
            console.log(error)
        }
    },
    async daftar({ commit, dispatch }, { userID, userName, password }) {
        try {
            const url = `${URL_API}/user/register`

            const respon = await kirimData(url, {
                id: userID,
                name: userName,
                password
            })

            if (respon.success && !respon.error) {
                commit('setUserData', {
                    userID: respon.data.id,
                    userName: respon.data.name,
                    userEmail: respon.data.email,
                    userAva: respon.data.ava
                })
                const dataNotifikasi = {
                    apakahTampil: true,
                    pesan: 'Berhasil daftar'
                }
                await dispatch('notification/showNotification', dataNotifikasi, { root: true })
            } else {
                throw new Error(respon.message)
            }
        } catch (error) {
            const dataNotifikasiGalat = {
                apakahTampil: true,
                pesan: error.message
            }
            dispatch('notification/showNotification', dataNotifikasiGalat, { root: true })
            console.log(error)
        }
    },
    keluar({ commit, dispatch }) {
        commit('resetUserData')
        sessionStorage.clear();
        router.push('/login')
        const dataNotifikasi = {
            apakahTampil: true,
            pesan: 'Berhasil keluar'
        }
        dispatch('notification/showNotification', dataNotifikasi, { root: true })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}