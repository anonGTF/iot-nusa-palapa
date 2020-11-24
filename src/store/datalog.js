import { URL_API } from "../constants"

function state() {
    return {
        dataLog: []
    }
}

const mutations = {
    setDataLog(state, { name, log, cost, total }) {
        state.dataLog.push({
            name,
            log,
            cost,
            total
        })
    },
    resetUserData(state) {
        state.dataLog = []
    }
}

const getters = {
    getDataLog(state) {
        return state.dataLog
    }
}

const actions = {
    async getData({ commit, dispatch, getters }, { roomId }) {
        const dataLog = getters.getDataLog;
        if (dataLog.some(data => data.name == `room-${roomId}`)) {
            return;
        }
        try {
            const url = `${URL_API}/sensor/?room=${roomId}`
            const urlCost = `${URL_API}/estimate/cost?room=${roomId}`
            const urlTotal = `${URL_API}/sensor/value?room=${roomId}`

            const respon = await fetch(url)
            const data = await respon.json();
            const cost = await fetch(urlCost).then(res => res.json())
            const total = await fetch(urlTotal).then(res => res.json())

            if (respon.ok) {
                commit('setDataLog', {
                    name: `room-${data.room}`,
                    log: data.log,
                    cost: cost.cost,
                    total: total.value
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
    },
    async getSumData({ commit, getters }) {
        const urlCost = `${URL_API}/estimate/cost`
        const urlTotal = `${URL_API}/sensor/value`

        const costRes = await fetch(urlCost).then(res => res.json())
        const totalRes = await fetch(urlTotal).then(res => res.json())

        const dataLog = getters.getDataLog;
        //check if datalog 1 2 3 exist
        if (dataLog.length != 3) {
            return
        }

        const name = 'total'
        const log = []
        const cost = costRes.cost
        const total = totalRes.value
        for (let i = 0; i < dataLog[0].log.length; i++) {
            log.push({
                time: dataLog[0].log[i].time,
                value: dataLog[0].log[i].value + dataLog[1].log[i].value + dataLog[2].log[i].value
            })
        }

        commit('setDataLog', {
            name,
            log,
            cost,
            total
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}