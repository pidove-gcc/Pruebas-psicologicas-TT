<template>
<card>
    <h5 slot="header" class="title">Datos del usuario</h5>
    <form  @submit.stop.prevent="updateProfile">
        <div class="row">
            <!-- <div class="col-md-5">
          <base-input
            type="text"
            label="Company"
            :disabled="true"
            placeholder="Company"
            v-model="user.company"
          >
          </base-input>
        </div>-->
            <div class="col-md-3">
                <b-form-group label="Nombre de usuario" label-for="name-input-1" invalid-feedback="El nombre es requerido" :state="nameState">
                    <b-form-input id="name-input-1" type="text" v-model="user.nombre_usuario" :state="nameState" required disabled></b-form-input>
                </b-form-group>
            </div>
            <div class="col-md-5">
                <b-form-group label="Email" label-for="name-input-2" invalid-feedback="El correo es requerido" :state="nameState">
                    <b-form-input id="name-input-2" type="email" v-model="user. email" :state="nameState" required disabled></b-form-input>
                </b-form-group>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <b-form-group label="Nombre(s)" label-for="name-input-3" invalid-feedback="El nombre es requerido" :state="nameState">
                    <b-form-input id="name-input-3" type="text" v-model="user.nombre" :state="nameState" required></b-form-input>
                </b-form-group>
            </div>
            <div class="col-md-6">
                <b-form-group label="Apellidos" label-for="name-input-4" invalid-feedback="Los apellidos son requerido" :state="nameState">
                    <b-form-input id="name-input-4" type="text" v-model="user.apellidos" :state="nameState" required></b-form-input>
                </b-form-group>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <b-form-group label="Edad" label-for="name-input-5" invalid-feedback="El nombre es requerido" :state="nameState">
                    <b-form-input id="name-input-5" v-model="user.edad" :state="nameState" required></b-form-input>
                </b-form-group>
            </div>
            <div class="col-md-4">
                <b-form-group label="Sexo" label-for="name-input-6" invalid-feedback="El nombre es requerido" :state="nameState">
                    <b-form-select v-model="user.sexo" class="form-control" id="name-input-6" required>
                        <template #first>
                            <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                            <b-form-select-option v-for="(genero, index) in sex" :value="genero.gender" v-bind:key="index" style="background: #344675">{{ genero.gender }}</b-form-select-option>
                        </template>
                    </b-form-select>
                </b-form-group>
            </div>
            <div v-if="level == 1" class="col-md-4">
              <b-form-group label="Registrador" label-for="name-input-7" invalid-feedback="El nombre es requerido" :state="nameState">
                    <b-form-input id="name-input-7" v-model="user.encargado" :state="nameState" required disabled></b-form-input>
                </b-form-group>
            </div>
            <div v-if="level == 2" class="col-md-4">
              <b-form-group label="Asignado a" label-for="name-input-8" invalid-feedback="El nombre es requerido" :state="nameState">
                    <b-form-input id="name-input-8" v-model="user.encargado" :state="nameState" required disabled></b-form-input>
                </b-form-group>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
              <b-form-group label="Domicilio" label-for="name-input-9" invalid-feedback="El domicilio es requerido" :state="nameState">
                    <b-form-textarea id="name-input-9" v-model="user.domicilio" :state="nameState" required></b-form-textarea>
                </b-form-group>
            </div>
        </div>

        <div class="row">
            <div v-if="level == 2" class="col-md-12">
              <b-form-group label="Proposito" label-for="name-input-10" invalid-feedback="Tu proposito es requerido" :state="nameState">
                    <b-form-textarea id="name-input-10" v-model="user.proposito" :state="nameState" required></b-form-textarea>
                </b-form-group>
            </div>
        </div>

        <base-button native-type="submit" type="primary" class="btn-fill">Actualizar</base-button>
    </form>
</card>
</template>

<script>
export default {
    data() {
        return {
          type: ["", "info", "success", "warning", "danger"],
            user: {
                nombre_usuario: '',
                email: '',
                nombre: '',
                apellidos: '',
                edad: '',
                sexo: '',
                domicilio: '',
                encargado: '',
                proposito: '',
            },
            nameState: null,
            level: '',
            sex: [{
                    gender: "hombre",
                },
                {
                    gender: "mujer",
                },
            ],
        };
    },
    methods: {
    async    updateProfile() {
            // alert('Your data: ' + JSON.stringify(this.user));
            if (this.level == 1) {
               let msg = await this.$store.dispatch("psico/update", this.user);
            if (msg == 'Datos actualizados') {
               this.notifyVue("top", "right", msg + ", recarge la pagina para ver los cambios", 2, 'icon-satisfied');
               location.reload();
            }
            else{
              this.notifyVue("top", "right", "Error, intente de nuevo mas tarde", 4, 'icon-simple-remove');
            }
            }
            else if (this.level == 2) {
              let msg = await this.$store.dispatch("paci/update", this.user);
            if (msg == 'Datos actualizados') {
               this.notifyVue("top", "right", msg + ", recarge la pagina para ver los cambios", 2, 'icon-satisfied');
               location.reload();
            }
            else{
              this.notifyVue("top", "right", "Error, intente de nuevo mas tarde", 4, 'icon-simple-remove');
            }
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
    },
    async beforeMount() {
        const user = localStorage.getItem('email')
        this.level =localStorage.getItem('level')
        if ( this.level == 1) {
            let infou = await this.$store.dispatch("psico/getinfo", user);
            console.log(infou)
            this.user.nombre_usuario = infou.nombre_usuario
            this.user.nombre = infou.nombre
            this.user.apellidos = infou.apellidos
            this.user.email = infou.correo_psi
            this.user.edad = infou.edad
            this.user.sexo = infou.sexo
            this.user.domicilio = infou.domicilio
            this.user.encargado = infou.registrador
        } else if (this.level == 2) {
          let infou = await this.$store.dispatch("paci/getinfo", user);
            console.log(infou)
            this.user.nombre_usuario = infou.nombre_usuario
            this.user.nombre = infou.nombre
            this.user.apellidos = infou.apellidos
            this.user.email = infou.correo_pac
            this.user.edad = infou.edad
            this.user.sexo = infou.sexo
            this.user.domicilio = infou.domicilio
            this.user.encargado = infou.psicologo_asignado
            this.user.proposito = infou.proposito
        }
    }
};
</script>

<style></style>
