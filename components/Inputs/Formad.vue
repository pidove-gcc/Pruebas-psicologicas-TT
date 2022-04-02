<template>
<div class="container">
    <div align="center" class="mt-5 col-md-5 border border-primary">
        <b-card title="Bienvenido">
            <b-form @submit.stop.prevent="onsubmit">
                <b-form-group id="input-group-1" label="Usuario:" label-for="input-1">
                    <b-form-input v-model="admin.user" id="input-1" type="text" placeholder="nombre usuario" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
                    <b-form-input v-model="admin.pass" id="input-2" type="password" placeholder="contraseña" required>
                    </b-form-input>
                </b-form-group>
                <b-button type="submit">Ingresar</b-button>
            </b-form>
        </b-card>
    </div>
</div>
</template>

<script>
import {mapState} from "vuex";
export default {
    name: "Formad",
    layout: "empty",
    data() {
        return {
            type: ["", "info", "success", "warning", "danger"],
            admin: {
                user: '',
                pass: '',
            }
        }
    },
      computed: {
        ...mapState({
            usera: (state) => state.admin.username,
        })
    },
    methods: {
      async  onsubmit() {
          console.log('Mando')
          console.log(this.admin)
          let msg = await this.$store.dispatch("admin/setinfo", this.admin);
          if (msg == 'Bienvenido') {
                msg = msg + ": " + this.usera
                this.$store.dispatch("user/setAuth", true);
                this.$router.push("/");
                this.notifyVue("top", "right", msg, 2, 'icon-satisfied');
            }
            else if (msg == 'Credenciales invalidas' || msg == 'Administrador no registrado') {
                this.notifyVue("top", "right", msg, 4, 'icon-simple-remove');
            }
        },
        notifyVue(verticalAlign, horizontalAlign, msm, color, pic) {
            // let color = Math.floor(Math.random() * 4 + 1);
            this.$notify({
                message: msm,
                timeout: 3000,
                icon: "tim-icons " + pic,
                horizontalAlign: horizontalAlign,
                verticalAlign: verticalAlign,
                type: this.type[color],
            });
        },
    }
}
</script>
<style scoped>
.container {
    display: flex;
    justify-content: center;
}
</style>