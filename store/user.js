export const state = () => ({
  usuarios: [],
  valid: false,
  level: "",
});

export const mutations = {
  setUsuarios(state, payload) {
    state.usuarios = payload;
    console.log("Tengo registrado: " + state.usuarios.length);
    console.log(state.usuarios);
  },
  setvalid(state, payload) {
    state.valid = payload;
    console.log("Sesion iniciada");
    localStorage.setItem("auth", payload);
  },
  setlevel(state, payload) {
    state.level = payload;
    console.log("Privilegios asignados");
    console.log(state.level);
  },
};

export const actions = {
  setAuth({ commit, state }, payload) {
    commit("setvalid", payload);
    const cookieParams = {
      valid: state.valid,
    };
    this.$cookies.set("auth", cookieParams, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  },
  setprivi({ commit, state }, payload) {
    commit("setlevel", payload);
    const cookieParams = state.level;

    this.$cookies.set("level", cookieParams, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  },
};
