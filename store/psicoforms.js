export const state = () => ({
    trials: [],
})

export const mutations = {
    setAddform(state, payload) {
        state.trials = payload
        //console.log("Tengo registrado: " + state.trials.length)
        console.log(state.trials)
    },
}

export const actions = {

}