import { URL_API } from "../constants"

function state() {
    return {
        dataLog: []
    }
}

const mutations = {
    setDataLog(state, { name, log }) {
        state.dataLog.push({
            name,
            log
        })
    },
    resetUserData(state) {
        state.dataLog = []
    }
}

const actions = {
    async getData({ commit, dispatch }, { roomId }) {
        try {
            const url = `${URL_API}/sensor/?room=${roomId}`

            const respon = await fetch(url)
            const data = await respon.json();
            if (respon.ok) {
                commit('setDataLog', {
                    name: `room-${data.room}`,
                    log: data.log
                })
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}