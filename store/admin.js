import { apiTT } from "~/repositories/Repository";
import Repository, { serializeQuery } from "~/repositories/Repository.js";

export const state = () => ({
  admin: null,
});

export const mutations = {
  setAdmin(state, payload) {
    state.admin = payload;
  },
};

export const actions = {
  async setinfo({ commit, state }) {
    try {
      const response = await Repository.get(`${apiTT}/admin`);
      const result = JSON.parse(JSON.stringify(response.data));
      console.log("Obtve");
      console.log(result[0]);
      commit("setAdmin", result[0]);
      //   commit("setProducts", resultado);
      //   commit("setCatalogo", resultado);
      //   commit("setTotal", resultado.length);
      //   console.log(state.arcones);
      //   console.log(state.arcones.length);

      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
