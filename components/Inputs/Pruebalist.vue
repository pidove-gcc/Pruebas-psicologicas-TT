<template>
    <div class="container">
        <div class="table-responsive-sm">
            <table class="table table-hover table-fixed">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Clasificacion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(prueba) in pageOfItems" :key="prueba.index">
                        <td>{{ prueba.nombre_prueba }}</td>
                        <td>{{ prueba.tipo }}</td>
                        <td>{{ prueba.clasif }}</td>
                        <td>
                            <b-button @click.prevent="showpaci(prueba)" v-b-modal.modal-prevent-closing
                                variant="secondary" class="rounded-circle px-3 mr-2" v-b-tooltip.hover
                                title="Asignar prueba">
                                <b-icon icon="calendar-date" scale="2"></b-icon>
                            </b-button>
                            <b-button @click.prevent="selecttrial(prueba.nombre_prueba)" v-b-modal.modal-prevent-delete
                                variant="danger" class="rounded-circle px-3" v-b-tooltip.hover title="Eliminar">
                                <b-icon icon="x-circle" scale="2"></b-icon>
                            </b-button>
                            <!-- animation="fade"   agregar animacion-->
                        </td>
                    </tr>
                </tbody>
            </table>
            <footer class="mt-30">
                <jw-pagination :items="pruebas" :pageSize="5" @changePage="onChangePage"></jw-pagination>
            </footer>
            <b-modal id="modal-prevent-closing" ref="modal" title="Asignar prueba" header-bg-variant="default"
                footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal"
                @hidden="resetModal" @ok="handleOk">
                <b-form-group label="Pacientes registrados">
                    <b-form-checkbox-group id="checkbox-group-1" v-model="asigntrial" v-for="paciente in listpaci"
                        :key="paciente.index">
                        <b-form-checkbox :value="paciente.nombre_usuario">{{ paciente.nombre }} {{ paciente.apellidos }}
                        </b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>
                <div align="center">
                    <b-form-datepicker dark="true" v-model="deadline" :min="min" size="sm" style="background: gray"
                        locale="es"></b-form-datepicker>
                </div>
                {{ asigntrial }} - {{ deadline }}
            </b-modal>

            <b-modal id="modal-prevent-delete" ref="modal2" title="Borrar psicologo" header-bg-variant="default"
                footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal"
                @hidden="resetModal" @ok="handleOkd">¿Deseas borrar la prueba {{ todelete }}?</b-modal>
        </div>
    </div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    name: 'Pruebalist',
    data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const minDate = new Date(today)
        return {
            type: ["", "info", "success", "warning", "danger"],
            pageOfItems: [],
            listpaci: '',
            asigntrial: [],
            deadline: '',
            min: minDate,
            trial: '',
            todelete: '',
            trialdata: {
                paci: '',
                trialname: '',
                deadline: '',
                status: 'Pendiente',
                creador: ''
            }
        }
    },
    computed: {
        ...mapState({
            pruebas: (state) => state.psico.pruebas,
            list: (state) => state.paci.listpaci,
        })
    },
    methods: {
        resetModal() {
            this.name = ''
            this.nameState = null,
                this.asigntrial = [],
                this.deadline = '',
                this.trial = ''
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
            console.log("Le mandare: " + this.todelete)
            this.deletetrial(this.todelete)
        },
        onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
            console.log(this.pageOfItems)
        },

        selecttrial(trial) {
            this.todelete = trial
            console.log(this.todelete)
        },

        async handleSubmit() {
            this.trialdata.trialname = this.trial
            this.trialdata.deadline = this.deadline
            this.trialdata.creador = localStorage.getItem('nick')
            for (let index = 0; index < this.asigntrial.length; index++) {
                // console.log("El usuario es: " + this.asigntrial[index] + " se le asignara: " + this.trial + " para " + this.deadline)
                this.trialdata.paci = this.asigntrial[index]
                let msg = await this.$store.dispatch("psico/createasign", this.trialdata);
            }
            this.notifyVue("top", "right", "Se asignaron " + this.asigntrial.length + " pruebas", 2, 'icon-satisfied');
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
        },
        async showpaci(prueba) {
            let a = await this.$store.dispatch("paci/getpaci");
            this.listpaci = this.list.filter(x => x.psicologo_asignado === localStorage.getItem('nick'))
            console.log("La prueba es ")
            console.log(prueba.nombre_prueba)
            this.trial = prueba.nombre_prueba
            console.log(this.trial)
        },

        async deletetrial(trialname) {
            console.log("Borrare: " + trialname)
            let msg = await this.$store.dispatch("psico/deletetrial", trialname);
            this.notifyVue("top", "right", "Prueba " + trialname + " eliminada", 2, 'icon-check-2');
            let user = localStorage.getItem('nick')
            let msg2 = await this.$store.dispatch("psico/getprueba", user);
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-delete')
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
    async beforeMount() {
        let user = localStorage.getItem('nick')
        let msg = await this.$store.dispatch("psico/getprueba", user);
        console.log(msg);
    }
}
</script>

<style>
</style>
