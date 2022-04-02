import { apiTT } from "~/repositories/Repository";
import Repository, { serializeQuery } from "~/repositories/Repository.js";

export const state = () => ({
  paci: [],
  username: null,
  email: null,
  foto: null,
  nivel: null,
});

export const mutations = {
  setPaci(state, payload) {
    state.paci = payload;
    console.log("Tengo en el store")
    console.log(state.paci)
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
  }
};

export const actions = {
  async setinfo({ commit, state },payload) {
    try {
      const response = await Repository.get(`${apiTT}/loginp?email=${payload.email}&pass=${payload.pass}`);
      const result = JSON.parse(JSON.stringify(response.data));
      const msg = result.message;
      console.log(msg);
      if (msg == 'Credenciales invalidas' || msg == 'Paciente no registrado') {
        return msg;
      }
      else {
      const data = JSON.parse(JSON.stringify(result.data));
      commit("setPaci",data);
      commit("setUser",data.nombre_usuario);
      commit("setEmail",data.correo_pac);
      commit("setFoto",data.foto);
      commit("setNivel",data.nivel_usuario)
      console.log("Datos del paciente:")
      console.log(data)
      console.log("Mensaje: " +msg)
      return msg;
      }
   
    } catch (error) {
      console.log(error);
    }
  },
  async createpaci({commit, state},payload){
      try {
        const response = await Repository.post(`${apiTT}/createpac?user=${payload.user}&pass=${payload.pass}&name=${payload.name}&lastname=${payload.lastname}&age=${payload.age}&gender=${payload.gender}&email=${payload.email}&home=${payload.home}&prod=${payload.prod}&psico=${payload.psico}&foto=${payload.foto}`);
        const result = JSON.parse(JSON.stringify(response.data));
      const msg = result.message;
        return msg;
      } catch (error) {
        console.log(error);
      }
  }
};
