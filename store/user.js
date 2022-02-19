export const state = () => ({
    usuarios: [],
    valid: false
})

export const mutations = {
    setUsuarios(state, payload) {
        state.usuarios = payload
        console.log("Tengo registrado: " + state.usuarios.length)
        console.log(state.usuarios)
    },
    setvalid(state,payload) {
        state.valid = payload
        console.log("Sesion iniciada")
    }
}

export const actions = {

}