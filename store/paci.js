import { apiTT } from "~/repositories/Repository";
import Repository, { serializeQuery } from "~/repositories/Repository.js";

export const state = () => ({
  paci: [],
  username: null,
  email: null,
  foto: null,
  nivel: null,
  listpaci: [],
});

export const mutations = {
  setPaci(state, payload) {
    state.paci = payload;
    console.log("Tengo en el store");
    console.log(state.paci);
  },
  setUser(state, payload) {
    state.username = payload;
    console.log("Tengo de usuario: " + state.username);
  },
  setEmail(state, payload) {
    state.email = payload;
    console.log("Tengo el correo: " + state.email);
  },
  setFoto(state, payload) {
    state.foto = payload;
    console.log("Tengo la foto");
    localStorage.setItem('photo', payload);
  },
  setNivel(state, payload) {
    state.nivel = payload;
    console.log("Tengo el nivel: " + state.nivel);
    localStorage.setItem("level", payload);
  },
  setList(state,payload){
    state.listpaci = payload;
    console.log("El store tiene")
    console.log(state.listpaci)
}
};

export const actions = {
  async setinfo({ commit, state }, payload) {
    try {
      const response = await Repository.get(
        `${apiTT}/loginp?email=${payload.email}&pass=${payload.pass}`
      );
      const result = JSON.parse(JSON.stringify(response.data));
      const msg = result.message;
      console.log(msg);
      if (msg == "Credenciales invalidas" || msg == "Paciente no registrado") {
        return msg;
      } else {
        const data = JSON.parse(JSON.stringify(result.data));
        const pic = data.img_us_rut + data.img_us
        commit("setPaci", data);
        commit("setUser", data.nombre_usuario);
        commit("setEmail", data.correo_pac);
        commit("setFoto", pic);
        commit("setNivel", data.nivel_usuario);
        console.log("Datos del paciente:");
        console.log(data);
        console.log("Mensaje: " + msg);
        return msg;
      }
    } catch (error) {
      console.log(error);
    }
  },
  async createpaci({ commit, state }, payload) {
    try {
      var formData = new FormData();
      formData.append("img", payload.foto);
      const response = await Repository.post(
        `${apiTT}/createpac?user=${payload.user}&pass=${payload.pass}&name=${payload.name}&lastname=${payload.lastname}&age=${payload.age}&gender=${payload.gender}&email=${payload.email}&home=${payload.home}&prod=${payload.prod}&psico=${payload.psico}`,
        formData
      );
      const result = JSON.parse(JSON.stringify(response.data));
      const msg = result.message;
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async getpaci({commit, state}){
    try {
      const response = await Repository.get(`${apiTT}/paci`);
      const result = JSON.parse(JSON.stringify(response.data.data));
      commit("setList",result);
    } catch (error) {
      console.log(error);
    }
},
async getpaci2({commit, state}){
  try {
    const response = await Repository.get(`${apiTT}/paci`);
    const result = JSON.parse(JSON.stringify(response.data.data));
    commit("setList",result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
};
