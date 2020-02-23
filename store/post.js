export const state = () => {
    return {
        a: 123,
        mydrafthistory: []
    }
}

export const mutations = {
    setmydraf(state, data) {
        state.mydrafthistory.unshift(data)
        if (state.mydrafthistory.length > 8) {
            state.mydrafthistory.length = 8;
        }
    }
}