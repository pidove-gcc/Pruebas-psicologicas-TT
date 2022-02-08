export const state = () => ({
    usuarios: ''
})

export const mutations = {
    setUsuarios(state, payload) {
        state.usuarios = payload
        console.log("Tengo registrado: " + state.usuarios.length)
    }
}

export const actions = {

}