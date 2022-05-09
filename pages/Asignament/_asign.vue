<template>
  <div class="container">
      <h3>{{value}}</h3>
      <div>
          <b-form-group label="Descripcion" align="center">
              <b-form-textarea v-model="descrip" plaintext>

              </b-form-textarea>
          </b-form-group>
          <b-form-group label="Nota del psicologo" align="center">
              <b-form-textarea v-model="note" plaintext>

              </b-form-textarea>
          </b-form-group>
      </div>
      <OpenA :trial = "asign"/>
      <h2>{{type}}</h2>
      <p>{{asign}}</p>
  </div>
</template>

<script>
import {
    mapState
} from "vuex";
import OpenA from "~/components/Inputs/OpenA";
export default {
    components: {
        OpenA,
    },
    data() {
        return {
            value: "",
            asign: "",
            type: "",
            descrip: "",
            note: "",
        };
    },
    computed: {
        ...mapState({
            trial: (state) => state.paci.asignacion,
        })
    },
    methods: {
        async getasign() {
            let a = await this.$store.dispatch("paci/gethw", this.$route.params.asign);
            this.asign = JSON.parse(this.trial[0].reactivos);
            this.type = this.trial[0].tipo;
            this.descrip = this.trial[0].descripcion;
            this.note = this.trial[0].nota;
        },
    },
    beforeMount() {
        this.value = this.$route.params.asign;
        this.getasign();
    },
}
</script>

<style>

</style>