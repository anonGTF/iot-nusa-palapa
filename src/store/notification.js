function state() {
    return {
        apakahTampil: false,
        pesan: null
    }
}

const mutations = {
    setNotification(state, { apakahTampil, pesan }) {
        state.apakahTampil = apakahTampil
        state.pesan = pesan
    },
    removeNotification(state) {
        state.apakahTampil = false
        state.pesan = null
    }
}

const actions = {
    showNotification({ commit }, { apakahTampil, pesan }) {
        commit('setNotifikation', {
            apakahTampil,
            pesan
        })
        setTimeout(() => {
            commit('removeNotification')
        }, 3000)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}