import { apiTT } from "~/repositories/Repository";
import Repository, { serializeQuery } from "~/repositories/Repository.js";

export const state = () => ({
  paci: [],
  username: null,
  email: null,
  foto: null,
  nivel: null,
  listpaci: [],
  asignaciones: [],
  asignacion: [],
  answ:[],
});

export const mutations = {
  setPaci(state, payload) {
    state.paci = payload;
    console.log("Tengo en el store");
    localStorage.setItem("nick", payload.nombre_usuario);
    console.log(state.paci);
    const name = payload.nombre + " " + payload.apellidos;
    const prop = payload.proposito;
    localStorage.setItem("usern", name);
    localStorage.setItem("prop", prop);
  },
  setAsign(state, payload) {
    state.asignaciones = payload;
  },
  sethw(state, payload) {
    state.asignacion = payload;
  },
  setansw(state, payload) {
    state.answ = payload;
  },
  setUser(state, payload) {
    state.username = payload;
    console.log("Tengo de usuario: " + state.username);
  },
  setEmail(state, payload) {
    state.email = payload;
    console.log("Tengo el correo: " + state.email);
    localStorage.setItem("email", payload);
  },
  setFoto(state, payload) {
    state.foto = payload;
    console.log("Tengo la foto");
    localStorage.setItem("photo", payload);
  },
  setNivel(state, payload) {
    state.nivel = payload;
    console.log("Tengo el nivel: " + state.nivel);
    localStorage.setItem("level", payload);
  },
  setList(state, payload) {
    state.listpaci = payload;
    console.log("El store tiene");
    console.log(state.listpaci);
  },
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
        const pic = data.img_us_rut + data.img_us;
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

  async getinfo({ commit, state }, payload) {
    try {
      const response = await Repository.post(
        `${apiTT}/infopaci?email=${payload}`
      );
      const result = JSON.parse(JSON.stringify(response.data.data));
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  async loadimg({ commit, state }, payload) {
    try {
      const response = await Repository.post(
        `${apiTT}/infopaci?email=${payload}`
      );
      const result = JSON.parse(JSON.stringify(response.data.data));
      const pic = result.img_us_rut + result.img_us;
      commit("setFoto", pic);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  async update({ commit, state }, payload) {
    try {
      const response = await Repository.post(
        `${apiTT}/updatepaci?user=${payload.nombre_usuario}&name=${payload.nombre}&lastname=${payload.apellidos}&age=${payload.edad}&gender=${payload.sexo}&home=${payload.domicilio}&prop=${payload.proposito}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {}
  },

  async updateimg({ commit, state }, payload) {
    try {
      var formData = new FormData();
      formData.append("img", payload.img);
      const response = await Repository.post(
        `${apiTT}/setpaciimg?user=${payload.user}`,
        formData
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {}
  },

  async updatepass({ commit, state }, payload) {
    try {
      console.log("La contraseña sera: " + payload.new);
      const response = await Repository.post(
        `${apiTT}/updatepas?email=${payload.email}&pass=${payload.old}&newpass=${payload.new}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {}
  },

  async createcode({ commit, state }, payload) {
    try {
      console.log("El correo es: " + payload);
      const response = await Repository.post(
        `${apiTT}/resetp?email=${payload}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async changepass({ commit, state }, payload) {
    try {
      console.log("El contenido  es: " + payload);
      const response = await Repository.post(
        `${apiTT}/setpasspaci?email=${payload.email}&pass_token=${payload.token}&password=${payload.pass}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async getpaci({ commit, state }) {
    try {
      const response = await Repository.get(`${apiTT}/paci`);
      const result = JSON.parse(JSON.stringify(response.data.data));
      commit("setList", result);
    } catch (error) {
      console.log(error);
    }
  },

  async getasign({ commit, state }, payload) {
    try {
      console.log("El contenido  es: " + payload);
      const response = await Repository.get(`${apiTT}/hw?paci=${payload}`);
      const msg = JSON.parse(JSON.stringify(response.data.message));
      const result = JSON.parse(JSON.stringify(response.data.data));
      commit("setAsign", result);
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async gethw({ commit, state }, payload) {
    try {
      console.log("El contenido  es: " + payload);
      const response = await Repository.get(
        `${apiTT}/findtrial?name=${payload}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      const result = JSON.parse(JSON.stringify(response.data.data));
      commit("sethw", result);
      return msg;
    } catch (error) {
      console.log(error);
    }
  },
  async getansw({ commit, state }, payload) {
    try {
      console.log("El contenido  es: " + payload);
      const response = await Repository.get(
        `${apiTT}/findansw?trial=${payload.trial}&&paci=${payload.paci}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      const result = JSON.parse(JSON.stringify(response.data.data));
      commit("setansw", result);
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async saveanwers({ commit, state }, payload) {
    try {
      console.log("El contenido  es: " + payload);
      const response = await Repository.post(
        `${apiTT}/saveanwers?name=${payload.name}&&paci=${payload.paci}&&type=${payload.type}&&clasif=${payload.clasif}&&trial=${payload.trial}`
      );
      const response2 = await Repository.post(
        `${apiTT}/upstatus?trial=${payload.name}&&paci=${payload.paci}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      const result = JSON.parse(JSON.stringify(response.data.data));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async getpaci2({ commit, state }) {
    try {
      const response = await Repository.get(`${apiTT}/paci`);
      const result = JSON.parse(JSON.stringify(response.data.data));
      commit("setList", result);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
