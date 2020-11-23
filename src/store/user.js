import { URL_API } from "../constants"
import { kirimData } from '../utils'

function state() {
    return {
        userID: null,
        userName: null,
        userEmail: null,
        userAva: null
    }
}

const mutations = {
    setUserData(state, { userID, userName, userEmail, userAva }) {
        state.userID = userID
        state.userName = userName
        state.userEmail = userEmail
        state.userAva = userAva
    },
    resetUserData(state) {
        state.userID = null
        state.userName = null
        state.userEmail = null
        state.userAva = null
    }
}

const actions = {
    async masuk({ commit, dispatch }, { userEmail, password }) {
        try {
            const url = `${URL_API}/user/login`

            const respon = await kirimData(url, {
                email: userEmail,
                password
            })

            if (respon.success && !respon.error) {
                commit('setUserData', {
                    userID: respon.data.id,
                    userName: respon.data.name,
                    userEmail: respon.data.email,
                    userAva: respon.data.ava
                })
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
    mutations,
    actions
}