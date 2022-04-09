import { apiTT } from "~/repositories/Repository";
import Repository, { serializeQuery } from "~/repositories/Repository.js";

export const state = () => ({
  admin: [],
  username: null,
  nivel: null,
});

export const mutations = {
  setAdmin(state, payload) {
    state.admin = payload;
    console.log("Tengo en el store");
    console.log(state.admin);
  },
  setUser(state, payload) {
    state.username = payload;
    console.log("Tengo de usuario: " + state.username);
    localStorage.setItem("usuario", payload);
  },
  setNivel(state, payload) {
    state.nivel = payload;
    console.log("Tengo el nivel: " + state.nivel);
    localStorage.setItem("level", payload);
  },
};

export const actions = {
  async setinfo({ commit, state }, payload) {
    try {
      const response = await Repository.get(
        `${apiTT}/logina?user=${payload.user}&pass=${payload.pass}`
      );
      const result = JSON.parse(JSON.stringify(response.data));
      const msg = result.message;
      console.log(msg);
      if (
        msg == "Credenciales invalidas" ||
        msg == "Administrador no registrado"
      ) {
        return msg;
      } else {
        const data = JSON.parse(JSON.stringify(result.data));
        commit("setAdmin", data);
        commit("setUser", data.nombre_usuario);
        commit("setNivel", data.nivel_usuario);
        console.log("Datos del admin:");
        console.log(data);
        console.log("Mensaje: " + msg);
        return msg;
      }
    } catch (error) {
      console.log(error);
    }
  },

  async createpsico({ commit, state }, payload) {
    try {
      var formData = new FormData();
      formData.append("img", payload.foto);
      formData.append("pdf", payload.pdf);
      const response = await Repository.post(
        `${apiTT}/createpsico?user=${payload.user}&pass=${payload.pass}&name=${payload.name}&lastname=${payload.lastname}&age=${payload.age}&gender=${payload.gender}&email=${payload.email}&home=${payload.home}&admin=${payload.admin}`,
        formData
      );
      const result = JSON.parse(JSON.stringify(response.data));
      const msg = result.message;
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async updatepsico({ commit, state }, payload) {
    try {
      // var formData = new FormData();
      // formData.append("img", payload.foto);
      // formData.append("pdf", payload.pdf);
      const response = await Repository.post(
        `${apiTT}/updatepsico?user=${payload.user}&name=${payload.name}&lastname=${payload.lastname}&age=${payload.age}&gender=${payload.gender}&email=${payload.email}`
      );
      const result = JSON.parse(JSON.stringify(response.data));
      const msg = result.message;
      return msg;
    } catch (error) {
      console.log(error);
    }
  },
  async updatepsicof({ commit, state }, payload) {
    try {
      var formData = new FormData();
      formData.append("pdf", payload.pdf);
      const response = await Repository.post(
        `${apiTT}/updatepsicof?user=${payload.user}&name=${payload.name}&lastname=${payload.lastname}&age=${payload.age}&gender=${payload.gender}&email=${payload.email}`,
        formData
      );
      const result = JSON.parse(JSON.stringify(response.data));
      const msg = result.message;
      return msg;
    } catch (error) {
      console.log(error);
    }
  },
  async upload({ commit, state }, payload) {
    try {
      const response = await Repository.post(
        `${apiTT}/picture?image=${payload}`
      );
      const result = JSON.parse(JSON.stringify(response.data));
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  async updatepsicouser({ commit, state }, payload) {
    try {
      console.log("Voy a actualizar " + payload);
      const response = await Repository.post(
        `${apiTT}/uppsico?user=${payload.user}&psico=${payload.psico}`
      );
      const result = await JSON.parse(JSON.stringify(response.data));
      console.log(result);
      const msg = result.message;
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async delete({ commit, state }, payload) {
    try {
      const response = await Repository.post(
        `${apiTT}/deletepsico?user=${payload}`
      );
      const result = JSON.parse(JSON.stringify(response.data));
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  async deletepaci({ commit, state }, payload) {
    try {
      const response = await Repository.post(
        `${apiTT}/deletep?user=${payload}`
      );
      const result = JSON.parse(JSON.stringify(response.data));
      console.log(result);
      const msg = result.message;
      return msg;
    } catch (error) {
      console.log(error);
    }
  },
};
