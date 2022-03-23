import { apiTT } from "~/repositories/Repository";
import Repository, { serializeQuery } from "~/repositories/Repository.js";

export const state = () => ({
  psico: [],
  listpsico: [],
  username: null,
  email: null,
  foto: null,
  nivel: null,
});

export const mutations = {
  setPsico(state, payload) {
    state.psico = payload;
    console.log("Tengo en el store")
    console.log(state.psico)
  },
  setUser(state, payload) {
      state.username = payload;
      console.log("Tengo de usuario: " + state.username )
  },
  setEmail(state, payload) {
      state.email = payload;
      console.log("Tengo el correo: " + state.email)
  },
  setFoto(state, payload){
      state.foto = payload;
      console.log("Tengo la foto")
  },
  setNivel(state, payload){
      state.nivel = payload;
      console.log("Tengo el nivel: " + state.nivel )
      localStorage.setItem('level', payload);
  },
  setList(state,payload){
      state.listpsico = payload;
      console.log("El store tiene")
      console.log(state.listpsico)
  }
};

export const actions = {
  async setinfo({ commit, state },payload) {
    try {
      const response = await Repository.get(`${apiTT}/loginps?email=${payload.email}&pass=${payload.pass}`);
      const result = JSON.parse(JSON.stringify(response.data));
      const msg = result.message;
      console.log(msg);
      if (msg == 'Credenciales invalidas' || msg == 'Psicologo no registrado') {
        return msg;
      }
      else {
      const data = JSON.parse(JSON.stringify(result.data));
      commit("setPsico",data);
      commit("setUser",data.nombre_usuario);
      commit("setEmail",data.correo_psi);
      commit("setFoto",data.foto);
      commit("setNivel",data.nivel_usuario)
      console.log("Datos del psicologo:")
      console.log(data)
      console.log("Mensaje: " +msg)
      return msg;
      }
   
    } catch (error) {
      console.log(error);
    }
  },
  async getpsico({commit, state}){
      try {
        const response = await Repository.get(`${apiTT}/psico`);
        const result = JSON.parse(JSON.stringify(response.data.data));
        commit("setList",result);
        // console.log("Tengo registrados ");
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
  }
};
