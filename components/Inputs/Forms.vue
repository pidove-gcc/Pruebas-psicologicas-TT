<template>
    <div class="container">
        <div v-if="option" align="center" class="mt-5 border border-primary">
            <b-card title="Iniciar sesion">
                <b-form @submit.stop.prevent="starsession">
                    <b-form-group
                        id="input-group-1"
                        label="Correo electronico:"
                        label-for="input-1"
                    >
                        <b-form-input
                            v-model="usuario.email"
                            id="input-1"
                            type="email"
                            placeholder="correo"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
                        <b-form-input
                            v-model="usuario.pass"
                            id="input-2"
                            type="password"
                            placeholder="contraseña"
                            required
                        ></b-form-input>
                        <div>
                            <NuxtLink to="/">Olvide mi contraseña</NuxtLink>
                        </div>
                    </b-form-group>
                    <b-button type="submit">Iniciar sesion</b-button>
                </b-form>
                <div>
                    <label class="button text-primary" @click="setform">{{ text }}</label>
                </div>
                <b-button @click="starsession('invitado')">Ingresar como invitado</b-button>
                <b-form-file
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    @change="onChange"
                ></b-form-file>
                <b-button @click="uploadimage">Enviar imagen</b-button>
            </b-card>
        </div>
        <div v-else align="center" class="mt-5 col-md-5 border border-primary">
            <b-card title="Registro de nuevo paciente">
                <b-form @submit.stop.prevent="onSubmit">
                    <b-form-group id="register-group-1" label="Nombre:" label-for="register-1">
                        <b-form-input
                            v-model="pacin"
                            id="register-1"
                            type="text"
                            placeholder="Ingresa tu nombre(s)"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="register-group-2" label="Apellidos:" label-for="register-2">
                        <b-form-input
                            v-model="paciln"
                            id="register-2"
                            type="text"
                            placeholder="Ingresa tus apellidos"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="register-group-12" label="Correo:" label-for="register-12">
                        <b-form-input
                            v-model="paciem"
                            id="register-12"
                            type="email"
                            placeholder="Ingresa un correo"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="register-group-3" label="Edad:" label-for="register-3">
                        <b-form-input
                            v-model="paciag"
                            id="register-3"
                            type="number"
                            placeholder
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="register-group-4" label="Sexo:" label-for="register-4">
                        <!-- style="background: light-black" -->
                        <b-form-select
                            v-model="pacigen"
                            class="form-control"
                            id="register-4"
                            required
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                                <b-form-select-option
                                    v-for="(genero, index) in sex"
                                    :value="genero.gender"
                                    v-bind:key="index"
                                >{{ genero.gender }}</b-form-select-option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group id="register-group-5" label="Domicilio:" label-for="register-5">
                        <b-form-textarea
                            v-model="pacih"
                            id="register-5"
                            placeholder="Ingresa una direccion"
                            rows="8"
                            required
                        ></b-form-textarea>
                    </b-form-group>
                    <b-form-group id="register-group-6" label="Proposito:" label-for="register-6">
                        <b-form-input
                            v-model="pacip"
                            id="register-6"
                            type="text"
                            placeholder="¿Cual es tu proposito?"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="register-group-7"
                        label="Imagen de perfil:"
                        label-for="register-7"
                    >
                        <b-form-file
                            @change="onChange"
                            accept="image/*"
                            id="register-7"
                            placeholder="Selecciona o arrastra      "
                            drop-placeholder="Arrastra o selecciona"
                        ></b-form-file>
                    </b-form-group>
                    <b-form-group id="register-group-8" label="Responsable:" label-for="register-8">
                        <b-form-select
                            v-model="pacips"
                            class="form-control"
                            id="register-8"
                            required
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                                <b-form-select-option
                                    v-for="(psicologo, index) in list"
                                    :value="psicologo.nombre_usuario"
                                    v-bind:key="index"
                                >{{ psicologo.nombre }} {{ psicologo.apellidos }}</b-form-select-option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group
                        id="register-group-9"
                        label="Nombre de usuario:"
                        label-for="register-9"
                    >
                        <b-form-input
                            v-model="paciun"
                            id="register-9"
                            type="text"
                            placeholder="Ingrese su nombre de usuario"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="register-group-10"
                        label="Contraseña:"
                        label-for="register-10"
                    >
                        <b-form-input
                            v-model="pacipass"
                            id="register-10"
                            type="password"
                            placeholder="Ingrese una contraseña"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="register-group-11"
                        label="Repita contraseña"
                        label-for="register-11"
                    >
                        <b-form-input
                            v-model="pacipassv"
                            id="register-11"
                            type="password"
                            placeholder
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-button type="submit">Crear cuenta</b-button>
                </b-form>
            </b-card>
            <label class="button text-primary" @click="setform">{{ text }}</label>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import {
    mapState
} from "vuex";
export default {
    name: "Forms",
    layout: "empty",
    data() {
        return {
            type: ["", "info", "success", "warning", "danger"],
            option: true,
            keywords: "admin",
            userName: "",
            level: "",
            text: "Registrarse",
            usuario: {
                email: '',
                pass: '',
            },
            sex: [{
                gender: "hombre",
            },
            {
                gender: "mujer",
            },
            ],
            psicologos: [{
                name: "Luis",
            },
            {
                name: "Omar",
            },
            {
                name: "Brian",
            },
            ],
            pacin: null,
            paciln: null,
            paciem: null,
            paciag: null,
            pacigen: null,
            pacih: null,
            pacip: null,
            pacif: null,
            pacips: null,
            paciun: null,
            pacipass: null,
            pacipassv: null,
            pacireg: {
                user: '',
                pass: '',
                name: '',
                lastname: '',
                age: '',
                gender: '',
                email: '',
                home: '',
                prod: '',
                psico: '',
                foto: '',
            },
            img: '',
        };
    },
    // fetch({
    //     store
    // }) {
    //     console.log("Inicio aqui");
    //     const usuarios = [];
    //     usuarios.push(this.usuario);
    //     console.log("enviado al store");
    //     return store.commit("user/setUsuarios", usuarios);
    // },
    computed: {
        ...mapState({
            userps: (state) => state.psico.username,
            userp: (state) => state.paci.username,
            list: (state) => state.psico.listpsico,
        })
    },
    methods: {
        setform() {
            if (this.option) {
                this.option = false;
                this.text = "Iniciar sesion";
            } else {
                this.option = true;
                this.text = "Registrarse";
            }
        },
        async starsession() {
            let msg = await this.$store.dispatch("psico/setinfo", this.usuario);
            if (msg == 'Bienvenido') {
                msg = msg + ": " + this.userps
                this.$store.dispatch("user/setAuth", true);
                this.$router.push("/");
                this.notifyVue("top", "right", msg, 2, 'icon-satisfied');
            } else if (msg == 'Credenciales invalidas') {
                this.notifyVue("top", "right", msg, 4, 'icon-simple-remove');
            } else if (msg == 'Psicologo no registrado') {
                let msg2 = await this.$store.dispatch("paci/setinfo", this.usuario);
                if (msg2 == 'Bienvenido') {
                    msg2 = msg2 + ": " + this.userp
                    this.$store.dispatch("user/setAuth", true);
                    this.$router.push("/");
                    this.notifyVue("top", "right", msg2, 2, 'icon-satisfied');
                } else if (msg2 == 'Credenciales invalidas') {
                    this.notifyVue("top", "right", msg2, 4, 'icon-simple-remove');
                } else {
                    this.notifyVue("top", "right", "Usuario no registrado", 4, 'icon-simple-remove');
                }
            }

        },
        async selectUser() {
            console.log("Inicio consulta");
            await this.$store.dispatch("admin/setinfo");
        },
        onChange(event) {
            this.img = event.target.files[0]
        },
        async uploadimage() {
            console.log("Envio imagen");
            console.log(this.img)
            //     const formData = new FormData()
            //       const blob = this.img
            //   formData.append('image', this.img, this.img.name)
            const formData = new FormData();
            formData.append('image', this.img);
            // await this.$store.dispatch("admin/upload",formData);

            axios.post(
                "http://127.0.0.1:8000/api/picture", { params: { images: this.img } }
                , { headers: { "Content-Type": "multipart/form-data" } }
            )
                .then(response => {
                    console.log(response)
                })
                .catch(e => {
                    //...
                })


            //      axios.post('http://127.0.0.1:8000/api/picture',{params:{
            //         images: blob
            //      }}, {
            //   }).then((response) => {
            //     console.log(response)
            //   })
        },

        async onSubmit() {
            if (this.pacipass == this.pacipassv) {
                console.log("Tengo")
                console.log(this.img)
                this.pacireg.user = this.paciun;
                this.pacireg.pass = this.pacipass
                this.pacireg.name = this.pacin;
                this.pacireg.lastname = this.paciln;
                this.pacireg.age = parseInt(this.paciag);
                this.pacireg.gender = this.pacigen;
                this.pacireg.email = this.paciem;
                this.pacireg.home = this.pacih;
                this.pacireg.prod = this.pacip;
                this.pacireg.psico = this.pacips;
                this.pacireg.foto = this.img;
                console.log("Ingresaste los datos")
                console.log(this.pacireg);
                const resp = await this.$store.dispatch("paci/createpaci", this.pacireg);
                console.log(resp)
                if (resp == 'Nombre de usuario registrado, ingrese otro' || resp == 'Este correo ya esta registrado en otra cuenta') {
                    this.notifyVue("top", "right", resp, 4, 'icon-simple-remove');
                } else {
                    this.notifyVue("top", "right", resp, 1, 'icon-check-2');
                    this.$router.push("/");
                }
            }
            else {
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
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}
</style>
