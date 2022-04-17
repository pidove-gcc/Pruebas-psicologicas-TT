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
    localStorage.setItem('nick',payload.nombre_usuario)
    const name = payload.nombre + " " + payload.apellidos
    const pdf = payload.img_us_rut + payload.curriculum
    console.log("Guarde en el localStorage")
    localStorage.setItem('usern', name);
    localStorage.setItem('cv', pdf);
    // console.log(name)
    // console.log(pdf)
  },
  setUser(state, payload) {
      state.username = payload;
      console.log("Tengo de usuario: " + state.username )
  },
  setEmail(state, payload) {
      state.email = payload;
      console.log("Tengo el correo: " + state.email)
      localStorage.setItem('email', payload);
  },
  setFoto(state, payload){
      state.foto = payload;
      console.log("Tengo la foto")
      console.log(state.foto);
      localStorage.setItem('photo', payload);
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
      const pic = data.img_us_rut + data.img_us
      commit("setPsico",data);
      commit("setUser",data.nombre_usuario);
      commit("setEmail",data.correo_psi);
      commit("setFoto",pic);
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
  },

  async getinfo({commit, state},payload){
    try {
      const response = await Repository.post(`${apiTT}/infops?email=${payload}`);
      const result = JSON.parse(JSON.stringify(response.data.data));
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  async loadimg({commit, state},payload){
    try {
      const response = await Repository.post(`${apiTT}/infops?email=${payload}`);
      const result = JSON.parse(JSON.stringify(response.data.data));
      const pic = result.img_us_rut + result.img_us
      commit("setFoto", pic);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  async update({commit, state},payload){
    try {
      const response = await Repository.post(`${apiTT}/updatepsicou?user=${payload.nombre_usuario}&name=${payload.nombre}&lastname=${payload.apellidos}&age=${payload.edad}&gender=${payload.sexo}&home=${payload.domicilio}`);
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg
    } catch (error) {
      console.log(error);
    }
  },

  async updateimg({commit, state},payload){
    try {
      var formData = new FormData();
      formData.append("img", payload.img);
      const response = await Repository.post(`${apiTT}/setpsicoimg?user=${payload.user}`,formData);
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg
    } catch (error) {
      console.log(error);
    }
  },
  async updatepass({commit, state},payload){
    try {
      console.log("La contraseña sera: " + payload.new)
      const response = await Repository.post(`${apiTT}/updatepass?email=${payload.email}&pass=${payload.old}&newpass=${payload.new}`);
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg
    } catch (error) {
      console.log(error);
    }
  },
  async createcode({commit, state},payload){
    try {
      console.log("El correo es: " + payload)
      const response = await Repository.post(`${apiTT}/resetps?email=${payload}`);
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg
    } catch (error) {
      console.log(error);
    }
  },
  async changepass({commit, state},payload){
    try {
      console.log("El contenido  es: " + payload)
      const response = await Repository.post(`${apiTT}/setpasspsico?email=${payload.email}&pass_token=${payload.token}&password=${payload.pass}`);
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg
    } catch (error) {
      console.log(error);
    }
  },

  async getpsico2({commit, state}){
    try {
      const response = await Repository.get(`${apiTT}/psico`);
      const result = JSON.parse(JSON.stringify(response.data.data));
      commit("setList",result);
      return result;
    } catch (error) {
      console.log(error);
    }
}
};
