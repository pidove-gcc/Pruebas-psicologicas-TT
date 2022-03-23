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
        localStorage.setItem('auth', payload);
    }
}

export const actions = {
setAuth({commit,state},payload) {
    commit('setvalid', payload);
    const cookieParams = {
        valid: state.valid
    };
    this.$cookies.set('auth', cookieParams, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
    });
}
}