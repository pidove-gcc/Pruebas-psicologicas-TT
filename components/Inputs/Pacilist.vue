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
                    <th>Psico asignado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(usuario) in pageOfItems" :key="usuario.index">
                    <td>{{ usuario.nombre_usuario }}</td>
                    <td>{{ usuario.nombre }}</td>
                    <td>{{ usuario.apellidos }}</td>
                    <td>{{ usuario.correo_pac }}</td>
                    <td>
                        <b-form-select class="form-control" v-model="usuario.psicologo_asignado" align="center" id="questype" style="width: 100%" required>
                            <template #first>
                                <b-form-select-option :value="null" style="background: gray" disabled>Seleccione</b-form-select-option>
                                <b-form-select-option v-for="(ps, index) in psicologos" :value="ps.nombre_usuario" v-bind:key="index" style="background: #344675">{{ ps.nombre }} {{ ps.apellidos }}</b-form-select-option>
                            </template>
                        </b-form-select>
                    </td>
                    <td>
                        <!-- <b-button style="border-radius:50%;">
                    <b-icon icon="exclamation-circle-fill" variant="success"></b-icon>
                            </b-button>-->
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
            <jw-pagination :items="pacientes" :pageSize="5" @changePage="onChangePage"></jw-pagination>
        </footer>

        <b-modal id="modal-prevent-closing" ref="modal" title="Cambiar psicologo" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOk">¿Deseas cambiar el psicologo a cargo de este usuario?</b-modal>

        <b-modal id="modal-prevent-delete" ref="modal2" title="Borrar psicologo" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOkd">¿Deseas borrar este usuario?</b-modal>
    </div>
</div>
</template>

<script>
export default {
    name: 'Pacilist',
    props: {
        lista: {
            type: Array,
            default: () => {}
        },
        psico: {
            type: Array,
            default: () => {}
        },
    },
    data() {
        return {
            type: ["", "info", "success", "warning", "danger"],
            nameState: null,
            pageSize: 12,
            pageOfItems: [],
            pacientes: [],
            psicologos: [],
            pacireg: {
                user: '',
                psico: '',
            },
            todelete: '',
            show: ''
        }
    },
    methods: {
        editUser(username) {
            console.log("Asi quedo")
            this.pacireg.user = username.nombre_usuario
            this.pacireg.psico = username.psicologo_asignado
            console.log(username)
        },
        async deleteUser(username) {
            console.log("Vas a eliminar  " + username)
            this.todelete = username
        },
        resetModal() {
            this.name = ''
            this.nameState = null
        },
         onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
            console.log(this.pageOfItems)
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
            this.deletepaci()
        },
        async handleSubmit() {

            // Push the name to submitted names
            console.log("Me envias estos datos")
            console.log(this.pacireg)
            let msg = await this.$store.dispatch("admin/updatepsicouser", this.pacireg);
            if (msg == 'Psicologo encargado actualizado') {
                this.notifyVue("top", "right", msg, 2, 'icon-satisfied');
            } else {
                this.notifyVue("top", "right", "Error al actualizar", 4, 'icon-simple-remove');
            }
            // if (this.psicoreg.pdf == '') {
            //     console.log("No se cargo archivo")
            //     let msg = await this.$store.dispatch("admin/updatepsico", this.psicoreg);
            //     if (msg == 'Datos actualizados') {
            //         this.notifyVue("top", "right", msg, 2, 'icon-satisfied');
            //     } else {
            //         this.notifyVue("top", "right", "Error, intente de nuevo", 4, 'icon-simple-remove');
            //     }
            // } else {
            //     console.log("Se cargo archivo")
            //     let msg = await this.$store.dispatch("admin/updatepsicof", this.psicoreg);
            //     if (msg == 'Datos actualizados') {
            //         this.notifyVue("top", "right", msg, 2, 'icon-satisfied');
            //     } else {
            //         this.notifyVue("top", "right", "Error, intente de nuevo", 4, 'icon-simple-remove');
            //     }
            // }
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
        },

        async deletepaci() {
            let msg = await this.$store.dispatch("admin/deletepaci", this.todelete);
            if (msg == 'Usuario borrado') {
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
    },
    created() {
        this.pacientes = this.lista
        this.psicologos = this.psico
    }
}
</script>

<style>
</style>
