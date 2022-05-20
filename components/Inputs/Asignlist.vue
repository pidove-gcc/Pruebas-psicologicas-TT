<template>
    <div class="container">
        <div class="table-responsive-sm">
            <table class="table table-hover table-fixed">
                <thead>
                    <tr>
                        <th>Prueba</th>
                        <th>Asignado a</th>
                        <th>Fecha limite</th>
                        <th>Status</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="asignation in pageOfItems" :key="asignation.index">
                        <td>{{ asignation.prueba }}</td>
                        <td>{{ asignation.paciente }}</td>
                        <!-- <td v-if="day > asignation.fecha_limite" bgcolor="red">{{ asignation.fecha_limite }} - caducada </td> -->
                        <td v-if="day > asignation.fecha_limite && asignation.status == 'Pendiente'" ><p class="line"> {{ asignation.fecha_limite }} - caducada </p></td>
                        <td v-else>{{ asignation.fecha_limite }}</td>
                        <td>{{ asignation.status }}</td>
                        <td>
                            <b-button
                                @click.prevent="showchat(asignation.coment, asignation.prueba, asignation.paciente)"
                                v-b-modal.modal-prevent-closing  class="button rounded-circle px-3 mr-2"
                                v-b-tooltip.hover title="Comentarios">
                                <b-icon icon="chat" scale="2"></b-icon>
                            </b-button>
                            <b-button @click.prevent="getdate(asignation.prueba, asignation.paciente)"
                                v-b-modal.modal-prevent-update variant="info" class="rounded-circle px-3"
                                v-b-tooltip.hover title="Cambiar fecha">
                                <b-icon icon="calendar2-date" scale="2"></b-icon>
                            </b-button>

                            <b-button @click.prevent="getdate(asignation.prueba, asignation.paciente)"
                                v-b-modal.modal-prevent-delete variant="danger" class="rounded-circle px-3"
                                v-b-tooltip.hover title="Eliminar asignacion">
                                <b-icon icon="x-circle" scale="2"></b-icon>
                            </b-button>
                            <b-button v-if="asignation.status == 'Contestada' " @click.prevent="editresult(asignation.prueba, asignation.paciente)"
                                v-b-modal.modal-prevent-answer variant="success" class="rounded-circle px-3"
                                v-b-tooltip.hover title="Ver resultado">
                                <b-icon icon="clipboard-check" scale="2"></b-icon>
                            </b-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <footer class="mt-30">
                <jw-pagination :items="asign" :pageSize="5" :labels="customLabels"  @changePage="onChangePage"></jw-pagination>
            </footer>

            <b-modal id="modal-prevent-closing" ref="modal" hide-footer :title="titulo" header-bg-variant="default"
                footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal"
                @hidden="resetModal">
                <div v-if="chat == null">
                    <p>Aun no hay mensajes, envie uno</p>
                </div>
                <b-form @submit.stop.prevent="sendmsg">
                    <div v-for="msg in chat" :key="msg.index">
                        <b-form-group :label="msg.user">
                            <b-form-input :placeholder="msg.msg" disabled>
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
            <b-modal id="modal-prevent-update" ref="modal2" title="Actualizar fecha" header-bg-variant="default"
                footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal"
                @hidden="resetModal" @ok="handleOk">
                <p align="center">Selecciona una nueva fecha</p>
                <div align="center">
                    <b-form-datepicker dark="true" v-model="asign2.date" :min="min" size="sm" style="background: gray"
                        locale="es"></b-form-datepicker>
                </div>
            </b-modal>

            <b-modal id="modal-prevent-delete" ref="modal3" title="Borrar asignacion" header-bg-variant="default"
                footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal"
                @hidden="resetModal" @ok="handleOkd">¿Deseas borrar esta asignacion?</b-modal>
            <!-- <p>{{ day }}</p> -->

            <b-modal id="modal-prevent-answer" hide-footer ref="modalpdf" title="Respuestas" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOk">
            <div align="center" ref="document">
                <div v-if="answertype == 'Likert'">
                    <b-form >
                        <b>{{titulo2}}</b>
            <div v-for="(question, index) in pageOfItems2" :key="index">
                <b-form-group :label="question.pregunta" label-class="black">
                    <b-form-radio-group v-model="question.respuesta" :options="question.opciones" disabled>
                    </b-form-radio-group>
                </b-form-group>
            </div>
             <b>Resultado</b>
            <b-form-textarea v-model="treatment" rows="3" >

            </b-form-textarea>
        </b-form>
        <footer class="mt-30">
                <jw-pagination :items="result" :pageSize="3" :labels="customLabels"  @changePage="onChangePage2"></jw-pagination>
            </footer>
                </div>

                <div v-if="answertype == 'Abierta'">
                    <b-form>
                         <b>{{titulo2}}</b>
            <div v-for="(question, index) in pageOfItems2" :key="index">
                <p>{{ question.tipo }}</p>
                <b-form-group :label="question.pregunta" label-class="black">
                    <b-form-input v-model="question.respuesta" readonly>
                    </b-form-input>
                </b-form-group>
            </div>
             <b>Resultado</b>
                <b-form-textarea v-model="treatment" rows="3" >
            </b-form-textarea>
            
        </b-form>
        <footer class="mt-30">
                <jw-pagination :items="result" :pageSize="3" @changePage="onChangePage2"></jw-pagination>
            </footer>
                </div>
            </div>
            <div align="right">
                <b-button @click="sendresult">Actualizar resultado</b-button>
            </div>
        </b-modal>
        </div>
    </div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    name: 'Asignlist',
    data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const minDate = new Date(today)
        return {
            pageOfItems: [],
            pageOfItems2: [],
            min: minDate,
            type: ["", "info", "success", "warning", "danger"],
            day: '',
            day2: '2022-04-29',
            chat: null,
            message: '',
            deadline: '',
            titulo: '',
            titulo2: '',
            asign2: {
                paci: '',
                trial: '',
                chat: '',
                date: '',
            },
            pacianswer:{
                trial: '',
                paci: '',
                treat: ''
            },
            result: null,
            treatment: '',
            answertype: '',
            customLabels: {
    first: 'Primero',
    last: 'Ultimo',
    previous: 'Anterior',
    next: 'Siguiente'
},
        }
    },
    computed: {
        ...mapState({
            asign: (state) => state.psico.asignaciones,
            answer: (state) => state.paci.answ,
        }),
    },
    methods: {
        resetModal() {
            this.name = ''
            this.nameState = null,
                this.message = '',
                this.asign2.date = '',
                // this.result = null,
                this.treatment = '',
                this.pageOfItems2 = []
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
            let msg2 = await this.$store.dispatch("psico/getasign", user);
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
                user: localStorage.getItem('nick'),
                msg: this.message
            })
            this.message = ''
            this.asign2.chat = JSON.stringify(this.chat)
            let msg = await this.$store.dispatch("psico/updatecomment", this.asign2);
            console.log(msg)
            this.notifyVue("top", "right", msg, 2, 'icon-chat-33');
            let user = localStorage.getItem('nick')
            let msg2 = await this.$store.dispatch("psico/getasign", user);
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

     async   editresult(prue, paciente){
            this.pacianswer.trial = prue
            this.pacianswer.paci = paciente
            let a = await this.$store.dispatch("paci/getansw", this.pacianswer);
            let prueba = this.answer[0]
            this.result = JSON.parse(prueba.reactivos_respuestas)
            this.titulo2 = "Respuestas de " + prueba.quien_respondio + " para " + prueba.nombre_prueba
            this.treatment = prueba.analisis_tratamiento
            this.answertype = prueba.tipo
        },

        async sendresult(){
            this.pacianswer.treat = this.treatment
             let msg = await this.$store.dispatch("psico/updatetreat", this.pacianswer);
              this.notifyVue("top", "right", msg, 2, 'icon-alert-circle-exc');
              this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-answer')
            })
        },

        onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
            console.log(this.pageOfItems)
        },
        onChangePage2(pageOfItems) {
            // update page of items
            this.pageOfItems2 = pageOfItems;
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
        let msg = await this.$store.dispatch("psico/getasign", user);
        console.log(msg);
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        this.day = this.formatDate(today)
        console.log(this.day)
    }
}
</script>

<style scoped>
.line{
    text-decoration: line-through;
    text-decoration-color: red;
    font-weight: bold;
}
.button, .button:hover{
    background:orange !important;
    transition-duration: 0.4s;
}
</style>
