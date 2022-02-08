<template>
<div class="container">
    <div v-if="option" align="center" class="mt-5 border border-primary">
        <b-card title="Iniciar sesion">
            <b-form @submit.stop.prevent="onSubmit">
                <b-form-group id="input-group-1" label="Correo electronico:" label-for="input-1">
                    <b-form-input id="input-1" type="email" placeholder="Enter email" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
                    <b-form-input id="input-2" type="password" placeholder="contraseña" required>
                    </b-form-input>
                    <div>
                        <NuxtLink to="/">Olvide mi contraseña</NuxtLink>
                    </div>
                </b-form-group>
                <b-button type="submit">Iniciar sesion</b-button>
            </b-form>
            <div>
                <label class="button text-primary" @click="setform">{{text}}</label>
            </div>
            <b-button>Ingresar como invitado</b-button>
        </b-card>
    </div>
    <div v-else align="center" class="mt-5 col-md-5 border border-primary">
        <b-card title="Registro de nuevo paciente">
            <b-form @submit.stop.prevent="onSubmit">
                <b-form-group id="register-group-1" label="Nombre:" label-for="register-1">
                    <b-form-input id="register-1" type="text" placeholder="Ingresa tu nombre(s)" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group id="register-group-2" label="Apellidos:" label-for="register-2">
                    <b-form-input id="register-2" type="text" placeholder="Ingresa tus apellidos" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group id="register-group-3" label="Edad:" label-for="register-3">
                    <b-form-input id="register-3" type="number" placeholder="" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group id="register-group-4" label="Sexo:" label-for="register-4">
                    <b-form-select class="form-control" id="register-4" required>
                        <template #first>
                            <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                            <b-form-select-option v-for="(genero,index) in sex" :value="genero.gender" v-bind:key="index">{{genero.gender}}</b-form-select-option>
                        </template>
                    </b-form-select>
                </b-form-group>
                <b-form-group id="register-group-5" label="Domicilio:" label-for="register-5">
                    <b-form-textarea id="register-5" placeholder="Ingresa una direccion" rows="8" required></b-form-textarea>
                </b-form-group>
                <b-form-group id="register-group-6" label="Proposito:" label-for="register-6">
                    <b-form-input id="register-6" type="text" placeholder="¿Cual es tu proposito?" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group id="register-group-7" label="Imagen de perfil:" label-for="register-7">
                    <b-form-file id="register-7" placeholder="Selecciona o arrastra      " drop-placeholder="Arrastra o selecciona">

                    </b-form-file>
                </b-form-group>
                <b-form-group id="register-group-8" label="Responsable:" label-for="register-8">
                    <b-form-select class="form-control" id="register-8" required>
                        <template #first>
                            <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                            <b-form-select-option v-for="(psicologo,index) in psicologos" :value="psicologo.name" v-bind:key="index">{{psicologo.name}}</b-form-select-option>
                        </template>
                    </b-form-select>
                </b-form-group>
                <b-form-group id="register-group-9" label="Nombre de usuario:" label-for="register-9">
                    <b-form-input id="register-9" type="text" placeholder="Ingrese su nombre de usuario" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group id="register-group-10" label="Contraseña:" label-for="register-10">
                    <b-form-input id="register-10" type="password" placeholder="Ingrese una contraseña" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group id="register-group-11" label="Repita contraseña" label-for="register-11">
                    <b-form-input id="register-11" type="password" placeholder="" required>
                    </b-form-input>
                </b-form-group>
                <b-button type="submit">Crear cuenta</b-button>
            </b-form>
        </b-card>
        <label class="button text-primary" @click="setform">{{text}}</label>
    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex"
export default {
    name: 'Forms',
    layout: "empty",
    data() {
        return {
            option: true,
            text: 'Registrarse',
            usuario: {
                correo: 'prueba@gmail.com',
                pass: '123456'
            },
            sex: [{
                    gender: 'hombre'
                },
                {
                    gender: 'mujer'
                },
            ],
            psicologos: [{
                    name: 'Luis'
                },
                {
                    name: 'Omar'
                },
                {
                    name: 'Brian'
                }
            ]
        }
    },
    fetch({
        store
    }) {
        const usuarios = []
        usuarios.push(this.usuario)
        console.log("enviado al store")
        return store.commit('user/setUsuarios', usuarios)
    },
    computed: {
        ...mapState(['usuarios'])
    },
    methods: {
        setform() {
            if (this.option) {
                this.option = false
                this.text = 'Iniciar sesion'
            } else {
                this.option = true
                this.text = 'Registrarse'
            }
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}
</style>
