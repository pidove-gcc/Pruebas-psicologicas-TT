import { apiTT } from "~/repositories/Repository";
import Repository, { serializeQuery } from "~/repositories/Repository.js";

export const state = () => ({
  psico: [],
  listpsico: [],
  username: null,
  email: null,
  foto: null,
  nivel: null,
  pruebas: [],
  asignaciones: [],
  infoasignaciones: [],
  pacilist: [],
  quest: [],
  trialanws: [],
});

export const mutations = {
  setPsico(state, payload) {
    state.psico = payload;
    console.log("Tengo en el store");
    console.log(state.psico);
    localStorage.setItem("nick", payload.nombre_usuario);
    const name = payload.nombre + " " + payload.apellidos;
    const pdf = payload.img_us_rut + payload.curriculum;
    console.log("Guarde en el localStorage");
    localStorage.setItem("usern", name);
    localStorage.setItem("cv", pdf);
    // console.log(name)
    // console.log(pdf)
  },
  setquest(state, payload) {
    state.quest = payload;
  },
  setAsign(state, payload) {
    state.asignaciones = payload;
  },
  setPacilist(state, payload) {
    state.pacilist = payload;
  },
  settrialansw(state, payload) {
    console.log(payload)
    state.trialanws = payload;
  },
  setInfo(state, payload) {
    state.infoasignaciones = payload;
  },
  setPruebas(state, payload) {
    state.pruebas = payload;
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
    console.log(state.foto);
    localStorage.setItem("photo", payload);
  },
  setNivel(state, payload) {
    state.nivel = payload;
    console.log("Tengo el nivel: " + state.nivel);
    localStorage.setItem("level", payload);
  },
  setList(state, payload) {
    state.listpsico = payload;
    console.log("El store tiene");
    console.log(state.listpsico);
  },
};

export const actions = {
  async setinfo({ commit, state }, payload) {
    try {
      const response = await Repository.get(
        `${apiTT}/loginps?email=${payload.email}&pass=${payload.pass}`
      );
      const result = JSON.parse(JSON.stringify(response.data));
      const msg = result.message;
      console.log(msg);
      if (msg == "Credenciales invalidas" || msg == "Psicologo no registrado") {
        return msg;
      } else {
        const data = JSON.parse(JSON.stringify(result.data));
        const pic = data.img_us_rut + data.img_us;
        commit("setPsico", data);
        commit("setUser", data.nombre_usuario);
        commit("setEmail", data.correo_psi);
        commit("setFoto", pic);
        commit("setNivel", data.nivel_usuario);
        console.log("Datos del psicologo:");
        console.log(data);
        console.log("Mensaje: " + msg);
        return msg;
      }
    } catch (error) {
      console.log(error);
    }
  },

  setinfoinv({ commit, state }, payload) {
    try {
      const data = "invitado";
      commit("setPsico", "Invitado");
      commit("setUser", "Invitado");
      commit("setEmail", "invitado");
      commit("setNivel", 3);
      console.log("Datos del psicologo:");
      return "Sesion de invitado iniciada";
    } catch (error) {
      console.log(error);
    }
  },

  async getpsico({ commit, state }) {
    try {
      const response = await Repository.get(`${apiTT}/psico`);
      const result = JSON.parse(JSON.stringify(response.data.data));
      commit("setList", result);
      // console.log("Tengo registrados ");
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getinfo({ commit, state }, payload) {
    try {
      const response = await Repository.post(
        `${apiTT}/infops?email=${payload}`
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
        `${apiTT}/infops?email=${payload}`
      );
      const result = JSON.parse(JSON.stringify(response.data.data));
      const pic = result.img_us_rut + result.img_us;
      commit("setFoto", pic);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  async getprueba({ commit, state }, payload) {
    try {
      const response = await Repository.get(`${apiTT}/search?name=${payload}`);
      const result = JSON.parse(JSON.stringify(response.data.data));
      const msg = JSON.parse(JSON.stringify(response.data.message));
      commit("setPruebas", result);
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async update({ commit, state }, payload) {
    try {
      const response = await Repository.post(
        `${apiTT}/updatepsicou?user=${payload.nombre_usuario}&name=${payload.nombre}&lastname=${payload.apellidos}&age=${payload.edad}&gender=${payload.sexo}&home=${payload.domicilio}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async updateimg({ commit, state }, payload) {
    try {
      var formData = new FormData();
      formData.append("img", payload.img);
      const response = await Repository.post(
        `${apiTT}/setpsicoimg?user=${payload.user}`,
        formData
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },
  async updatepass({ commit, state }, payload) {
    try {
      console.log("La contraseña sera: " + payload.new);
      const response = await Repository.post(
        `${apiTT}/updatepass?email=${payload.email}&pass=${payload.old}&newpass=${payload.new}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },
  async createcode({ commit, state }, payload) {
    try {
      console.log("El correo es: " + payload);
      const response = await Repository.post(
        `${apiTT}/resetps?email=${payload}`
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
        `${apiTT}/setpasspsico?email=${payload.email}&pass_token=${payload.token}&password=${payload.pass}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },
  async createtrial({ commit, state }, payload) {
    try {
      console.log("El contenido  es: " + payload);
      const response = await Repository.post(
        `${apiTT}/creatrial?name=${payload.nombre}&trial=${payload.reactivos}&desc=${payload.descrip}&type=${payload.tipo}&clasif=${payload.clasifi}&note=${payload.note}&psico=${payload.create}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async createasign({ commit, state }, payload) {
    try {
      console.log("El contenido  es: " + payload);
      const response = await Repository.post(
        `${apiTT}/createasign?paci=${payload.paci}&trial=${payload.trialname}&deadline=${payload.deadline}&status=${payload.status}&creador=${payload.creador}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async getasign({ commit, state }, payload) {
    try {
      console.log("El contenido  es: " + payload);
      const response = await Repository.get(
        `${apiTT}/asignpsico?psico=${payload}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      const result = JSON.parse(JSON.stringify(response.data.data));
      commit("setAsign", result);
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async infoasign({ commit, state }, payload) {
    try {
      console.log("El contenido  es: " + payload);
      const response = await Repository.get(
        `${apiTT}/asignpsico?psico=${payload}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      const result = JSON.parse(JSON.stringify(response.data.data));
      commit("setInfo", result);
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async listpaci({ commit, state }, payload) {
    try {
      console.log("El contenido  es: " + payload);
      const response = await Repository.get(
        `${apiTT}/pacipsicolist?psico=${payload}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      const result = JSON.parse(JSON.stringify(response.data.data));
      commit("setPacilist", result);
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async updatecomment({ commit, state }, payload) {
    try {
      console.log("El contenido  es: ");
      console.log(payload);
      const response = await Repository.post(
        `${apiTT}/upcomment?paci=${payload.paci}&trial=${payload.trial}&chat=${payload.chat}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async updatetreat({ commit, state }, payload) {
    try {
      console.log("El contenido  es: ");
      console.log(payload);
      const response = await Repository.post(
        `${apiTT}/edittreat?paci=${payload.paci}&trial=${payload.trial}&result=${payload.treat}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async updatefecha({ commit, state }, payload) {
    try {
      console.log("El contenido  es: ");
      console.log(payload);
      const response = await Repository.post(
        `${apiTT}/upfecha?paci=${payload.paci}&trial=${payload.trial}&date=${payload.date}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async deleteasign({ commit, state }, payload) {
    try {
      console.log("El contenido  es: ");
      console.log(payload);
      const response = await Repository.post(
        `${apiTT}/deleteasign?paci=${payload.paci}&trial=${payload.trial}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async deletetrial({ commit, state }, payload) {
    try {
      console.log("El contenido  es: ");
      console.log(payload);
      const response = await Repository.post(
        `${apiTT}/deletetrial?trial=${payload}`
      );
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async getpsico2({ commit, state }) {
    try {
      const response = await Repository.get(`${apiTT}/psico`);
      const result = JSON.parse(JSON.stringify(response.data.data));
      commit("setList", result);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  async getansw({ commit, state },payload) {
    try {
      const response = await Repository.get(`${apiTT}/findanwers?trial=${payload}`);
      console.log(response);
      const msg = JSON.parse(JSON.stringify(response.data.message));
      if (msg == 'Respuestas encontradas') {
        const result = JSON.parse(JSON.stringify(response.data.data));
        console.log(result);
        commit("settrialansw", result);  
      }
      console.log(msg)
      return msg;
    } catch (error) {
      console.log(error);
    }
  },

  async getquest({ commit, state }, payload) {
    try {
      const response = await Repository.get(`${apiTT}/editquest?trial=${payload.trial}&name=${payload.name}`);
      const result = JSON.parse(JSON.stringify(response.data.data));
      commit("setquest", result);
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },
  async updatequest({ commit, state }, payload) {
    try {
      const response = await Repository.post(`${apiTT}/upquest?trial=${payload.trial}&name=${payload.name}&quest=${payload.quest}&descrip=${payload.descrip}&note=${payload.nota}`);
      const msg = JSON.parse(JSON.stringify(response.data.message));
      return msg;
    } catch (error) {
      console.log(error);
    }
  },
};
