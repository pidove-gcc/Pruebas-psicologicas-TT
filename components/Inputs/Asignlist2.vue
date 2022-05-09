<template>
<div class="container">
    <div class="table-responsive-sm">
        <table class="table table-hover table-fixed">
            <thead>
                <tr>
                    <th>Prueba</th>
                    <th>Asignada por</th>
                    <th>Fecha limite</th>
                    <th>Asignada</th>
                    <th>Status</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="asignation in pageOfItems" :key="asignation.index">
                    <td>{{ asignation.prueba }}</td>
                    <td>{{ asignation.creador }}</td>
                    <td v-if="day > asignation.fecha_limite" bgcolor="red">{{ asignation.fecha_limite }} - caducada
                    </td>
                    <td v-else>{{ asignation.fecha_limite }}</td>
                    <td>{{ asignation.updated_at.split('T')[0] }}</td>
                    <td>{{ asignation.status }}</td>
                    <td>
                        <b-button @click.prevent="showchat(asignation.coment, asignation.prueba, asignation.paciente)" v-b-modal.modal-prevent-closing variant="warning" class="rounded-circle px-3 mr-2" v-b-tooltip.hover title="Comentarios">
                            <b-icon icon="chat" scale="2"></b-icon>
                        </b-button>
                        <b-button v-if="day < asignation.fecha_limite" :to="`/Asignament/${asignation.prueba}`"  variant="success" class="rounded-circle px-3" v-b-tooltip.hover title="Contestar asignacion">
                            <b-icon icon="pencil-square" scale="2">
                            </b-icon>
                        </b-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <footer class="mt-30">
            <jw-pagination :items="asign" :pageSize="5" @changePage="onChangePage"></jw-pagination>
        </footer>

        <b-modal id="modal-prevent-closing" ref="modal" hide-footer :title="titulo" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal">
            <div v-if="chat == null">
                <p>Aun no hay mensajes, envie uno</p>
            </div>
            <b-form @submit.stop.prevent="sendmsg">
                <div v-for="msg in chat" :key="msg.index">
                    <b-form-group :label="msg.user">
                        <b-form-input :placeholder="msg.msg" readonly>
                        </b-form-input>
                    </b-form-group>
                </div>
                <b-form-group>
                    <b-form-group align="right" label="Enviar nuevo mensaje">
                        <b-form-input placeholder="Nuevo mensaje" v-model="message" required>
                        </b-form-input>
                    </b-form-group>
                </b-form-group>
                <b-button type="submit">Enviar mensaje</b-button>
            </b-form>

        </b-modal>
        <b-modal id="modal-prevent-update" ref="modal2" title="Actualizar fecha" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOk">
            <p align="center">Selecciona una nueva fecha</p>
            <div align="center">
                <b-form-datepicker dark="true" v-model="asign2.date" :min="min" size="sm" style="background: gray" locale="es"></b-form-datepicker>
            </div>
        </b-modal>

        <b-modal id="modal-prevent-delete" ref="modal3" title="Borrar asignacion" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOkd">¿Deseas borrar esta asignacion?</b-modal>
        <!-- <p>{{ day }}</p> -->
    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    name: 'Asignlist2',
    data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const minDate = new Date(today)
        return {
            pageOfItems: [],
            min: minDate,
            type: ["", "info", "success", "warning", "danger"],
            day: '',
            day2: '2022-04-29',
            chat: null,
            message: '',
            deadline: '',
            titulo: '',
            asign2: {
                paci: '',
                trial: '',
                chat: '',
                date: '',
            }
        }
    },
    computed: {
        ...mapState({
            asign: (state) => state.paci.asignaciones,
        }),
    },
    methods: {
        resetModal() {
            this.name = ''
            this.nameState = null,
                this.message = '',
                this.asign2.date = ''
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            // this.handleSubmit()
            console.log(this.asign2)
            this.updatefecha()
        },

        handleOkd(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            // this.handleSubmit()
            console.log(this.asign2)
            this.deleteasign()
        },

        async updatefecha() {
            let msg = await this.$store.dispatch("psico/updatefecha", this.asign2);
            this.notifyVue("top", "right", msg, 2, 'icon-calendar-60');
            let user = localStorage.getItem('nick')
            let msg2 = await this.$store.dispatch("paci/getasign", user);
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-update')
            })
        },

        async deleteasign() {
            let msg = await this.$store.dispatch("psico/deleteasign", this.asign2);
            this.notifyVue("top", "right", msg, 2, 'icon-simple-remove');
            let user = localStorage.getItem('nick')
            let msg2 = await this.$store.dispatch("psico/getasign", user);
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-delete')
            })
        },
        async sendmsg() {
            if (this.chat == null) {
                this.chat = []
            }
            this.chat.push({
                user: this.asign2.paci,
                msg: this.message
            })
            this.message = ''
            this.asign2.chat = JSON.stringify(this.chat)
            let msg = await this.$store.dispatch("psico/updatecomment", this.asign2);
            console.log(msg)
            this.notifyVue("top", "right", msg, 2, 'icon-chat-33');
            let user = localStorage.getItem('nick')
            let msg2 = await this.$store.dispatch("paci/getasign", user);
        },
        getdate(titulo, paciente) {
            this.asign2.paci = paciente
            this.asign2.trial = titulo
        },
        async showchat(chat, titulo, paciente) {
            this.chat = JSON.parse(chat)
            this.titulo = "Chat de " + titulo + " con " + paciente
            this.asign2.paci = paciente
            this.asign2.trial = titulo
            if (this.chat == null) {
                console.log(this.titulo)
                console.log("Esta vacio")
            } else {
                console.log("El usuario")
                console.log(this.titulo)
                console.log("Escribio")
                let gson = this.chat
                console.log(gson)
                console.log(gson.length)
            }
        },
        onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
            console.log(this.pageOfItems)
        },
        padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        },
        formatDate(date) {
            return [
                date.getFullYear(),
                this.padTo2Digits(date.getMonth() + 1),
                this.padTo2Digits(date.getDate()),
            ].join('-');
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
        let msg = await this.$store.dispatch("paci/getasign", user);
        console.log(msg);
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        this.day = this.formatDate(today)
        console.log(this.day)
        if (this.asign.length < 1) {
            this.notifyVue("top", "right", "No tienes asignaciones", 2, 'icon-alert-circle-exc');
        }
    }
}
</script>

<style>
</style>
