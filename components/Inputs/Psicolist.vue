<template>
<div class="container">
    <div class="table-responsive-sm">
        <table class="table table-hover table-fixed">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(usuario) in pageOfItems" :key="usuario.index">
                    <td>{{usuario.nombre_usuario}}</td>
                    <td>{{usuario.nombre}}</td>
                    <td>{{usuario.apellidos}}</td>
                    <td>{{usuario.correo_psi}}</td>
                    <td>
                        <!-- <b-button style="border-radius:50%;">
                    <b-icon icon="exclamation-circle-fill" variant="success"></b-icon>
                </b-button> -->
                        <b-button @click.prevent="editUser(usuario)" v-b-modal.modal-prevent-closing variant="info" class="rounded-circle px-3 mr-2" v-b-tooltip.hover title="Editar">
                            <b-icon icon="pencil-square" scale="2" animation="fade"></b-icon>
                        </b-button>
                        <b-button @click.prevent="deleteUser(usuario.nombre_usuario)" v-b-modal.modal-prevent-delete variant="danger" class="rounded-circle px-3" v-b-tooltip.hover title="Eliminar">
                            <b-icon icon="x-circle" scale="2" animation="fade"></b-icon>
                        </b-button>
                    </td>
                </tr>
            </tbody>
        </table>

        <footer class="mt-30">
                    <jw-pagination :items="lista" :pageSize="3" @changePage="onChangePage"></jw-pagination>
                </footer>

        <b-modal id="modal-prevent-closing" ref="modal" title="Datos psicologo" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOk">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group label="Nombre" label-for="name-input-1" invalid-feedback="El nombre es requerido" :state="nameState">
                    <b-form-input id="name-input-1" type="text" v-model="psicoreg.name" :state="nameState" required></b-form-input>
                </b-form-group>
                <b-form-group label="Apellidos" label-for="name-input-2" invalid-feedback="El nombre es requerido" :state="nameState">
                    <b-form-input id="name-input-2" type="text" v-model="psicoreg.lastname" :state="nameState" required></b-form-input>
                </b-form-group>
                <b-form-group label="Edad" label-for="name-input-3" invalid-feedback="El nombre es requerido" :state="nameState">
                    <b-form-input id="name-input-3" v-model="psicoreg.age" :state="nameState" required></b-form-input>
                </b-form-group>
                <b-form-group label="Sexo" label-for="name-input-4" invalid-feedback="El nombre es requerido" :state="nameState">
                    <b-form-select v-model="psicoreg.gender" class="form-control" id="register-4" required>
                        <template #first>
                            <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                            <b-form-select-option v-for="(genero, index) in sex" :value="genero.gender" v-bind:key="index" style="background: #344675">{{ genero.gender }}</b-form-select-option>
                        </template>
                    </b-form-select>
                </b-form-group>
                <b-form-group label="Correo" label-for="name-input-5" invalid-feedback="El nombre es requerido" :state="nameState">
                    <b-form-input id="name-input-5" type="email" v-model="psicoreg.email" :state="nameState" required></b-form-input>
                </b-form-group>
                <b-form-group label="Curriculum" label-for="name-input-6" invalid-feedback="El nombre es requerido" :state="nameState">
                    <b-form-file @change="onChange" accept=".pdf" id="register-7" placeholder="Selecciona o arrastra      " drop-placeholder="Arrastra o selecciona"></b-form-file>
                </b-form-group>
                <div align="center">
                    <b-button :href="link" target="_blank">Ver CV</b-button>
                </div>

            </form>
        </b-modal>

        <b-modal id="modal-prevent-delete" ref="modal2" title="Borrar psicologo" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOkd">
            ¿Deseas borrar este usuario?
        </b-modal>
    </div>
</div>
</template>

<script>
export default {
    name: 'Psicolist',
    props: {
        lista: {
            type: Array,
            required: true,
            default: () => {}
        },
        length: {
            type: Number,
            required: true,
            default: 1,
        }
    },
    computed: {
        
        // rows() {
        //     return this.lista.length
        // },
    },
    data() {
        return {
            type: ["", "info", "success", "warning", "danger"],
            nameState: null,
            perPage: 3,
            currentPage: 1,
            pageSize: 12,
            pageOfItems: [],
            psicoreg: {
                user: '',
                name: '',
                lastname: '',
                age: '',
                gender: '',
                email: '',
                pdf: '',
            },
            sex: [{
                    gender: "hombre",
                },
                {
                    gender: "mujer",
                },
            ],
            link: '',
            todelete: ''
        }
    },
    methods: {
        editUser(username) {
            console.log("Parseo de datos")
            this.psicoreg.user = username.nombre_usuario
            this.psicoreg.name = username.nombre
            this.psicoreg.lastname = username.apellidos
            this.psicoreg.age = username.edad
            this.psicoreg.gender = username.sexo
            this.psicoreg.email = username.correo_psi
            this.link = username.img_us_rut + username.curriculum
            console.log(this.psicoreg)
        },
        async deleteUser(username) {
            console.log("Vas a eliminar  " + username)
            this.todelete = username
        },
        onChange(event) {
            this.psicoreg.pdf = event.target.files[0]
        },
         onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
            console.log(this.pageOfItems)
        },
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nameState = valid
            return valid
        },
        resetModal() {
            this.name = ''
            this.nameState = null
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleOkd(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            console.log("Borraste a  " + this.todelete)
            // this.handleSubmit()
            this.deletepsico()
        },
        async handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            // Push the name to submitted names
            console.log("Me envias estos datos")
            console.log(this.psicoreg)
            if (this.psicoreg.pdf == '') {
                console.log("No se cargo archivo")
                let msg = await this.$store.dispatch("admin/updatepsico", this.psicoreg);
                if (msg == 'Datos actualizados') {
                    this.notifyVue("top", "right", msg, 2, 'icon-satisfied');
                } else {
                    this.notifyVue("top", "right", "Error, intente de nuevo", 4, 'icon-simple-remove');
                }
            } else {
                console.log("Se cargo archivo")
                let msg = await this.$store.dispatch("admin/updatepsicof", this.psicoreg);
                if (msg == 'Datos actualizados') {
                    this.notifyVue("top", "right", msg, 2, 'icon-satisfied');
                } else {
                    this.notifyVue("top", "right", "Error, intente de nuevo", 4, 'icon-simple-remove');
                }
            }
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
                location.reload();
            })
        },

        async deletepsico() {
            let msg = await this.$store.dispatch("admin/delete", this.todelete);
            if (msg == 'Psicologo borrado') {
                this.notifyVue("top", "right", msg, 2, 'icon-satisfied');
            } else {
                this.notifyVue("top", "right", "Error, intente de nuevo", 4, 'icon-simple-remove');
            }
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-delete')
                location.reload();
            })
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

<style>

</style>
