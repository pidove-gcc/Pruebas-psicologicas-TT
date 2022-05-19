<template>
<div class="container">
    <div class="table-responsive-sm">
        <table class="table table-hover table-fixed">
            <thead>
                <tr>
                    <th>Prueba</th>
                    <th>Descripcion</th>
                    <th>Clasificacion</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="asignation in pageOfItems" :key="asignation.index">
                    <td>{{ asignation.nombre_prueba }}</td>
                    <td>{{ asignation.descripcion }}</td>
                    <td>{{ asignation.clasif }}</td>
                    <td>
                        <b-button @click.prevent="create(asignation)" v-b-modal.modal-prevent-answer variant="success" class="rounded-circle px-3 mr-2" v-b-tooltip.hover title="Contestar">
                            <b-icon icon="check-square" scale="2"></b-icon>
                        </b-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <footer class="mt-30">
            <jw-pagination :items="trial" :pageSize="5" @changePage="onChangePage"></jw-pagination>
        </footer>

        <b-modal id="modal-prevent-closing" ref="modal" hide-footer :title="titulo" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal">

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

        <b-modal id="modal-prevent-answer" hide-footer ref="modalpdf" title="Respuestas" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOk">
            <div align="center" ref="document">
                <div v-if="answertype == 'Likert'">
                    <b-form @submit.stop.prevent="submit(topdf)">
                        <p style="color: white;" align="center">{{titulo2}}</p>
                        <div v-for="(question, index) in pageOfItems2" :key="index">
                            <b-form-group :label="question.pregunta" label-class="black">
                                <b-form-radio-group v-model="question.respuesta" :options="question.opciones" required>
                                </b-form-radio-group>
                            </b-form-group>
                        </div>
                        <p style="color: whitesmoke;">{{resp}}</p>
                        <b-button type="submit">Enviar respuestas</b-button>
                    </b-form>
                    <footer class="mt-30">
                        <jw-pagination :items="topdf" :pageSize="3" @changePage="onChangePage2"></jw-pagination>
                    </footer>
                </div>
            </div>
            <div align="right">
            </div>
        </b-modal>

        <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true" :paginate-elements-by-height="1400" filename="Reportepsico" :pdf-quality="2" :manual-pagination="true" pdf-format="a4" pdf-orientation="landscape" pdf-content-width="800px" ref="html2Pdf">
            <section slot="pdf-content">
                <!-- PDF Content Here -->
                <div align="center" ref="document">
                    <div v-if="answertype == 'Likert'">
                        <h3 style="color: black" align="center">{{titulo2}}</h3>
                        <b-form>
                            <div v-for="(question, index) in topdf" :key="index">
                                <b-form-group :label="question.pregunta" label-class="black">
                                    <b-form-radio-group v-model="question.respuesta" :options="question.opciones" disabled>
                                    </b-form-radio-group>
                                </b-form-group>
                            </div>
                            <b-form-group label="Resultado" align-items="center">
                                <!-- <b-form-textarea v-model="psicoresult" rows="3" plaintext>
            </b-form-textarea> -->
                                <h2 style="color: black" align="center">{{resp}}</h2>
                            </b-form-group>

                        </b-form>
                    </div>

                    <div v-if="answertype == 'Abierta'">
                        <h3 style="color: black" align="center">{{titulo2}}</h3>
                        <b-form>
                            <div v-for="(question, index) in topdf" :key="index">
                                <p>{{ question.tipo }}</p>
                                <b-form-group :label="question.pregunta" label-class="black">
                                    <p style="color: black" align="center">R: {{question.respuesta}}</p>
                                </b-form-group>
                            </div>
                            <b-form-group label="Resultado" align-items="center">
                                <h2 style="color: black" align="center">{{psicoresult}}</h2>
                            </b-form-group>

                        </b-form>
                    </div>
                </div>

            </section>
        </vue-html2pdf>
        <!-- <p>{{ day }}</p> -->
    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
// import html2pdf from 'html2pdf.js'
export default {
    name: 'Asignlistvisit',
    components: {},
    data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const minDate = new Date(today)
        return {
            pageOfItems: [],
            pageOfItems2: [],
            contentpdf: false,
            min: minDate,
            type: ["", "info", "success", "warning", "danger"],
            day: '',
            day2: '2022-04-29',
            chat: null,
            message: '',
            deadline: '',
            titulo: '',
            titulo2: '',
            answertype: '',
            psicoresult: '',
            topdf: '',
            resp: '',
            asign2: {
                paci: '',
                trial: '',
                chat: '',
                date: '',
            },
            sansw: {
                trial: '',
                paci: '',
                type: '',
                clasif: '',
            },
            anwers: {
                paci: '',
                name: '',
                type: '',
                clasif: '',
                trial: ''
            }
        }
    },
    computed: {
        ...mapState({
            trial: (state) => state.paci.listpruebas,
        }),
    },
    methods: {

        exportToPDF() {
            // html2pdf(this.$refs.document, {
            // 	margin: 1,
            // 	filename: 'Reportepsico.pdf',
            //     	image: { type: 'jpeg', quality: 0.98 },
            // 	html2canvas: { dpi: 192, letterRendering: true },
            // 	jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
            // })

            this.$refs.html2Pdf.generatePdf()
        },
        resetModal() {
            this.name = ''
            this.nameState = null,
                this.message = '',
                this.asign2.date = '',
                this.resp = ''
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

        getdate(titulo, paciente) {
            this.asign2.paci = paciente
            this.asign2.trial = titulo
        },

        async create(prueba) {
            this.sansw.trial = prueba.nombre_prueba
            this.sansw.paci = 'invitado'
            this.sansw.clasif = prueba.clasif
            // let a = await this.$store.dispatch("paci/getansw", this.sansw);
            // let result = this.answer[0]
            this.titulo2 = "Usted esta respondiendo " + prueba.nombre_prueba
            this.answertype = prueba.tipo
            this.topdf = JSON.parse(prueba.reactivos)
            // this.exportToPDF()
            // alert(JSON.stringify(result))
        },

        async submit(trial) {
            // alert(JSON.stringify(this.trial))
            this.anwers.paci = this.sansw.paci
            this.anwers.name = this.sansw.trial
            this.anwers.type = this.answertype
            this.anwers.clasif = this.sansw.clasif
            this.anwers.trial = JSON.stringify(trial)
            const msg = await this.$store.dispatch("paci/saveanwersinv", this.anwers);
            console.log(msg)
            this.notifyVue("top", "right", msg, 2, 'icon-alert-circle-exc');
            this.resp = msg[0]
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
        let msg = await this.$store.dispatch("paci/getlisttrial");
        console.log(msg);
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        this.day = this.formatDate(today)
        console.log(this.day)
        // if (this.asign.length < 1) {
        //     this.notifyVue("top", "right", "No tienes asignaciones", 2, 'icon-alert-circle-exc');
        // }
    }
}
</script>

<style scoped>
.black {
    font-weight: bold;
}
</style>
