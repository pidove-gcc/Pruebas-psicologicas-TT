import { apiTT } from "~/repositories/Repository";
import Repository, { serializeQuery } from "~/repositories/Repository.js";

export const state = () => ({
  admin: [],
});

export const mutations = {
  setAdmin(state, payload) {
    state.admin = payload;
    console.log("Tengo en el store")
    console.log(state.admin)
  },
};

export const actions = {
  async setinfo({ commit, state }) {
    try {
      const response = await Repository.get(`${apiTT}/admin`);
      const result = JSON.parse(JSON.stringify(response.data));
      const result2 = JSON.parse(JSON.stringify(result.data))
      console.log("Obtuve");
      console.log(result2[0]);
      commit("setAdmin", result2[0]);
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
