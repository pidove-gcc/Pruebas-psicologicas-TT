<template>
<div class="container" align="center">
    <div align="center" class="mt-5  border border-primary" style="width: 75%">
         <b-card title="Registro de nuevo psicologo">
        <b-form @submit.stop.prevent="onSubmit">
            <b-form-group id="register-group-1" label="Nombre:" label-for="register-1">
                <b-form-input v-model="psin" id="register-1" type="text" placeholder="Ingresa tu nombre(s)" required>
                </b-form-input>
            </b-form-group>
            <b-form-group id="register-group-2" label="Apellidos:" label-for="register-2">
                <b-form-input v-model="psiln" id="register-2" type="text" placeholder="Ingresa tus apellidos" required>
                </b-form-input>
            </b-form-group>
            <b-form-group id="register-group-12" label="Correo:" label-for="register-12">
                <b-form-input v-model="psiem" id="register-12" type="email" placeholder="Ingresa un correo" required>
                </b-form-input>
            </b-form-group>
            <b-form-group id="register-group-3" label="Edad:" label-for="register-3">
                <b-form-input v-model="psiag" id="register-3" type="number" placeholder="" required>
                </b-form-input>
            </b-form-group>
            <b-form-group id="register-group-4" label="Sexo:" label-for="register-4">
                <!-- style="background: light-black" -->
                <b-form-select v-model="psigen" class="form-control" id="register-4" required>
                    <template #first>
                        <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                        <b-form-select-option v-for="(genero, index) in sex" :value="genero.gender" v-bind:key="index" style="background: #344675">{{ genero.gender }}</b-form-select-option>
                    </template>
                </b-form-select>
            </b-form-group>
            <b-form-group id="register-group-5" label="Domicilio:" label-for="register-5">
                <b-form-textarea v-model="psih" id="register-5" placeholder="Ingresa una direccion" rows="8" required></b-form-textarea>
            </b-form-group>
            <b-form-group id="register-group-6" label="Curriculum:" label-for="register-6">
                <b-form-file  @change="onChange1" accept=".pdf" id="register-6" placeholder="Selecciona o arrastra      " drop-placeholder="Arrastra o selecciona">
                </b-form-file>
            </b-form-group>
            <b-form-group id="register-group-7" label="Imagen de perfil:" label-for="register-7">
                <b-form-file  @change="onChange2"  accept="image/*" id="register-7" placeholder="Selecciona o arrastra      " drop-placeholder="Arrastra o selecciona">
                </b-form-file>
            </b-form-group>
            <b-form-group id="register-group-9" label="Nombre de usuario:" label-for="register-9">
                <b-form-input v-model="psiun" id="register-9" type="text" placeholder="Ingrese su nombre de usuario" required>
                </b-form-input>
            </b-form-group>
            <b-form-group id="register-group-10" label="Contraseña:" label-for="register-10">
                <b-form-input v-model="psipass" id="register-10" type="password" placeholder="Ingrese una contraseña" required>
                </b-form-input>
            </b-form-group>
            <b-form-group id="register-group-11" label="Repita contraseña" label-for="register-11">
                <b-form-input v-model="psipassv" id="register-11" type="password" placeholder="" required>
                </b-form-input>
            </b-form-group>
            <b-button type="submit">Crear cuenta</b-button>
        </b-form>
    </b-card>
    </div>
</div>
</template>

<script>
import {mapState} from "vuex";
export default {
    name: 'registerpsico',
    data() {
        return {
            type: ["", "info", "success", "warning", "danger"],
            sex: [{
                    gender: "hombre",
                },
                {
                    gender: "mujer",
                },
            ],
            psin: null,
            psiln: null,
            psiem: null,
            psigen: null,
            psiag: null,
            psih: null,
            psipdf: null,
            psif: null,
            psiun: null,
            psipass: null,
            psipassv: null,
            psireg: {
                user: '',
                pass: '',
                name: '',
                lastname: '',
                age: '',
                gender: '',
                email: '',
                home: '',
                pdf: '',
                admin: '',
                foto: '',
            },
            usuario: null,
        }
    },
    computed: {
        ...mapState({
            usera: (state) => state.admin.username,
        })
    },
    methods: {
        onChange1(event) {
            this.psipdf = event.target.files[0]
            console.log(this.psipdf)
        },
        onChange2(event) {
            this.psif = event.target.files[0]
            console.log(this.psif)
        },
        async onSubmit() {
            if (this.psipass == this.psipassv) {
                this.psireg.user = this.psiun;
                this.psireg.pass = this.psipass
                this.psireg.name = this.psin;
                this.psireg.lastname = this.psiln;
                this.psireg.age = parseInt(this.psiag);
                this.psireg.gender = this.psigen;
                this.psireg.email = this.psiem;
                this.psireg.home = this.psih;
                this.psireg.pdf = this.psipdf;
                console.log("El CV tiene")
                console.log(this.psireg.pdf)
                console.log("La foto tiene")
                console.log(this.psireg.foto)
                this.psireg.admin = this.usuario;
                this.psireg.foto =  this.psif
                console.log("Ingresaste los datos")
                console.log(this.psireg);
                const resp = await this.$store.dispatch("admin/createpsico", this.psireg);
                console.log(resp)
                if (resp == 'Nombre de usuario registrado, ingrese otro' || resp == 'Este correo ya esta registrado en otra cuenta') {
                    this.notifyVue("top", "right", resp, 4, 'icon-simple-remove');   
                } else {
                    this.notifyVue("top", "right", resp, 1, 'icon-check-2');
                    this.$router.push("/");   
                }
            } else {
                this.notifyVue("top", "right", "Ingrese la misma contraseña", 4, 'icon-simple-remove');
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
    mounted() {
        console.log("Tengo el usuario: " +localStorage.getItem('usuario'))
        this.usuario = localStorage.getItem('usuario');
    }
}
</script>
