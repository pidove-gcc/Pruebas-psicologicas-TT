<template>
<div class="container">
    <div align="center">
        <b-button align="left" @click="createlistpaci">Lista de pacientes</b-button>
        <b-button align="center" @click="createtriallist">Lista de pruebas Creadas</b-button>
        <b-button align="right" v-b-modal.modal-prevent-trial>Pruebas creadas</b-button>
    </div>
    <div align="center">
        <b-button align="left" v-b-modal.modal-prevent-resp>Respuestas recibidas</b-button>
        <b-button align="center" v-b-modal.modal-prevent-resp2>Promedio de respuestas</b-button>
        <b-button align="right" v-b-modal.modal-prevent-data>Estadisticas de prueba</b-button>
    </div>
    <div v-if="chartva" style="width:60%; height:60%;">
        <Pie :datos="typegen" :numbers="countgen" />
    </div>

    <b-modal id="modal-prevent-trial" ref="modal" hide-footer title="Seleccion de prueba" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal">
        <form ref="form" @submit.stop.prevent="gettrials" align="center">
            <b-form-select class="form-control" v-model="trialselect" align="center" id="questype" style="width: 70%" required>
                <template #first>
                    <b-form-select-option :value="null" style="background: gray" disabled>Seleccione
                    </b-form-select-option>
                    <b-form-select-option v-for="(trial, index) in pruebas" :value="trial.nombre_prueba" v-bind:key="index" style="background: gray">{{ trial.nombre_prueba }}</b-form-select-option>
                </template>
            </b-form-select>
            <b-button type="submit">Generar reporte</b-button>
        </form>
    </b-modal>

    <b-modal id="modal-prevent-resp" ref="modal2" hide-footer title="Seleccion de prueba" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal">
        <form ref="form" @submit.stop.prevent="getanwslist" align="center">
            <b-form-select class="form-control" @change="createresplist" v-model="trialselect" align="center" id="questype" style="width: 70%" required>
                <template #first>
                    <b-form-select-option :value="null" style="background: gray" disabled>Seleccione
                    </b-form-select-option>
                    <b-form-select-option v-for="(trial, index) in pruebas" :value="trial.nombre_prueba" v-bind:key="index" style="background: gray">{{ trial.nombre_prueba }}</b-form-select-option>
                </template>
            </b-form-select>
            <b-button :disabled="validanwsflag" type="submit">Generar reporte</b-button>
        </form>
    </b-modal>

    <b-modal id="modal-prevent-resp2" ref="modal2" hide-footer title="Seleccion de prueba" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal">
        <form ref="form" @submit.stop.prevent="getanswprom" align="center">
            <b-form-select class="form-control" @change="createresplist" v-model="trialselect" align="center" id="questype" style="width: 70%" required>
                <template #first>
                    <b-form-select-option :value="null" style="background: gray" disabled>Seleccione
                    </b-form-select-option>
                    <b-form-select-option v-for="(trial, index) in pruebas" :value="trial.nombre_prueba" v-bind:key="index" style="background: gray">{{ trial.nombre_prueba }}</b-form-select-option>
                </template>
            </b-form-select>
            <b-button :disabled="validanwsflag" type="submit">Generar reporte</b-button>
        </form>
    </b-modal>

    <b-modal id="modal-prevent-data" ref="modal2" hide-footer title="Seleccion de prueba" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal">
        <form ref="form" @submit.stop.prevent="createchart" align="center">
            <b-form-select class="form-control" @change="createdatalist" v-model="trialselect" align="center" id="questype" style="width: 70%" required>
                <template #first>
                    <b-form-select-option :value="null" style="background: gray" disabled>Seleccione
                    </b-form-select-option>
                    <b-form-select-option v-for="(trial, index) in pruebas" :value="trial.nombre_prueba" v-bind:key="index" style="background: gray">{{ trial.nombre_prueba }}</b-form-select-option>
                </template>
            </b-form-select>
            <b-button :disabled="validanwsflag" type="submit">Generar reporte</b-button>
        </form>
    </b-modal>

    <vue-html2pdf v-if="topdf" :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true" :paginate-elements-by-height="1400" filename="Lista_pacientes" :pdf-quality="2" :manual-pagination="true" margin:4 pdf-format="a4" pdf-orientation="Portrait" pdf-content-width="800px" ref="html2Pdf">
        <section slot="pdf-content">
            <!-- PDF Content Here -->
            <div align="center">
                <p>
                    <img position="top-right" src="~/static/Logo.jpeg" alt="Logo" width="100" height="100">
                </p>
                <br>
                <hr>
                <h2 style="color:black">Lista de pacientes</h2>
                <div class="table-responsive-sm">
                    <table class="table table-hover table-fixed myTable" style="color:black; width: 80%;">
                        <thead>
                            <tr>
                                <th style="width:30%">Nombre(s)</th>
                                <th style="width:30%">Apellidos</th>
                                <th style="width:10%">Edad</th>
                                <th>Sexo</th>
                                <th>Correo</th>
                                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(paciente) in listapaci" :key="paciente.index">
                                <td>{{paciente.nombre}}</td>
                                <td>{{paciente.apellidos}}</td>
                                <td>{{paciente.edad}}</td>
                                <td>{{paciente.sexo}}</td>
                                <td>{{paciente.correo_pac}}</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- <footer align="right">Este es un reporte generado por el sistema, carece de validez oficial</footer> -->
        </section>
    </vue-html2pdf>

    <vue-html2pdf v-if="topdf" :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true" :paginate-elements-by-height="1400" filename="Lista_pruebas" :pdf-quality="2" :manual-pagination="true" margin:4 pdf-format="a4" pdf-orientation="Portrait" pdf-content-width="800px" ref="html2Pdf2">
        <section slot="pdf-content">
            <!-- PDF Content Here -->
            <div align="center">
                <p>
                    <img position="top-right" src="~/static/Logo.jpeg" alt="Logo" width="100" height="100">
                </p>
                <br>
                <hr>
                <h2 style="color:black">Lista de pruebas creadas</h2>
                <div class="table-responsive-sm">
                    <table class="table table-hover table-fixed myTable" style="color:black; width: 80%;">
                        <thead>
                            <tr>
                                <th style="width:30%">Nombre</th>
                                <th style="width:5%">N° de preguntas</th>
                                <th style="width:10%">Descripcion</th>
                                <th style="width:10%">Clasificacion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(prueba) in pruebas" :key="prueba.index">
                                <td>{{prueba.nombre_prueba}}</td>
                                <td>{{ JSON.parse(prueba.reactivos).length}}</td>
                                <td>{{prueba.descripcion}}</td>
                                <td>{{prueba.clasif}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- <footer align="right">Este es un reporte generado por el sistema, carece de validez oficial</footer> -->
        </section>
    </vue-html2pdf>

    <vue-html2pdf v-if="topdf" :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true" :paginate-elements-by-height="1400" :filename="namereport" :pdf-quality="2" :manual-pagination="true" margin:4 pdf-format="a4" pdf-orientation="Portrait" pdf-content-width="800px" ref="html2Pdf3">
        <section slot="pdf-content">
            <!-- PDF Content Here -->
            <div align="center" ref="document">
                <p>
                    <img position="top-right" src="~/static/Logo.jpeg" alt="Logo" width="100" height="100">
                </p>
                <br>
                <hr>
                <div v-if="trialshow.answertype == 'Likert'">
                    <h3 style="color: black" align="center">{{trialshow.trial}}</h3>
                    <hr>
                    <b-form>
                        <div v-for="(question, index) in trialshow.quest" :key="index">
                            <b-form-group :label="'Pregunta ' + (index +1) + '.- ' + question.pregunta" label-class="black">
                                <b-form-radio-group v-model="question.respuesta" :options="question.opciones" disabled>
                                </b-form-radio-group>
                            </b-form-group>
                            <hr>
                        </div>

                    </b-form>
                </div>

                <div v-if="trialshow.answertype == 'Abierta'">
                    <h3 style="color: black" align="center">{{trialshow.trial}}</h3>
                    <b-form>
                        <div v-for="(question, index) in trialshow.quest" :key="index">
                            <p>{{ question.tipo }}</p>
                            <b-form-group :label="'Pregunta ' + (index +1) + '.- ' + question.pregunta" label-class="black">
                                <p style="color: black" align="center">R: {{question.respuesta}}</p>
                            </b-form-group>
                            <hr>
                        </div>
                    </b-form>
                </div>
            </div>
            <!-- <footer align="right">Este es un reporte generado por el sistema, carece de validez oficial</footer> -->
        </section>
    </vue-html2pdf>

    <vue-html2pdf v-if="topdf" :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true" :paginate-elements-by-height="1400" :filename="namereport" :pdf-quality="2" :manual-pagination="true" margin:4 pdf-format="a4" pdf-orientation="Portrait" pdf-content-width="800px" ref="html2Pdf4">
        <section slot="pdf-content">
            <!-- PDF Content Here -->
            <div align="center" ref="document">
                <p>
                    <img position="top-right" src="~/static/Logo.jpeg" alt="Logo" width="100" height="100">
                </p>
                <br>
                <hr>
                <div v-if="trialanwstype == 'Likert'">
                    <hr>
                    <b-form>
                        <div v-for="(answer, index) in trialanws" :key="index">
                            <h3 style="color: black" align="center">Respuesta de: {{answer.nombre}}</h3>
                            <div v-for="(trial,index2) in answer.trial" :key="index2">
                                <b-form-group :label="'Pregunta ' + (index2 +1) + '.- ' + trial.pregunta" label-class="black">
                                    <b-form-radio-group v-model="trial.respuesta" :options="trial.opciones" disabled>
                                    </b-form-radio-group>
                                </b-form-group>

                                <hr>
                            </div>
                            <p style="color: black">Resultado:</p>
                            <p style="color: black">{{answer.result}}</p>
                        </div>
                    </b-form>
                </div>

                <div v-if="trialanwstype == 'Abierta'">
                    <h3 style="color: black" align="center">{{trialshow.trial}}</h3>
                    <b-form>
                        <div v-for="(answer, index) in trialanws" :key="index">
                            <h3 style="color: black" align="center">Respuesta de: {{answer.nombre}}</h3>
                            <div v-for="trial in answer.trial" :key="trial.index">
                                <b-form-group :label="'Pregunta ' + (trial.index +1) + '.- ' + trial.pregunta" label-class="black">
                                    <p style="color: black" align="center">R: {{trial.respuesta}}</p>
                                </b-form-group>
                                <p style="color: black">Resultado:</p>
                                <p style="color: black">{{answer.result}}</p>
                                <hr>
                            </div>
                        </div>
                    </b-form>
                </div>
            </div>
            <!-- <footer align="right">Este es un reporte generado por el sistema, carece de validez oficial</footer> -->
        </section>
    </vue-html2pdf>

    <vue-html2pdf v-if="topdf" :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true" :paginate-elements-by-height="1400" :filename="namereport" :pdf-quality="2" :manual-pagination="true" margin:4 pdf-format="a4" pdf-orientation="Portrait" pdf-content-width="800px" ref="html2Pdf5">
        <section slot="pdf-content">
            <!-- PDF Content Here -->
            <div align="center">
                <p>
                    <img position="top-right" src="~/static/Logo.jpeg" alt="Logo" width="100" height="100">
                </p>
                <br>
                <hr>
                <h2 style="color:black">Resultados de la prueba: {{titulo}} </h2>
                <div class="table-responsive-sm">
                    <table class="table table-hover table-fixed myTable" style="color:black; width: 80%;">
                        <thead>
                            <tr>
                                <th style="width:30%">Paciente</th>
                                <th style="width:5%">Resultado</th>
                                <th style="width:10%">Analisis</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(result) in answers" :key="result.index">
                                <td>{{result.quien_respondio}}</td>
                                <td>{{result.result}}</td>
                                <td>{{result.analisis_tratamiento}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style="color:black">El promedio es: {{prom}}</p>
            </div>
            <!-- <footer align="right">Este es un reporte generado por el sistema, carece de validez oficial</footer> -->
        </section>
    </vue-html2pdf>

    <vue-html2pdf v-if="topdf" :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true" :paginate-elements-by-height="1400" :filename="namereport" :pdf-quality="2" :manual-pagination="true" margin:4 pdf-format="a4" pdf-orientation="Portrait" pdf-content-width="800px" ref="html2Pdf6">
        <section slot="pdf-content">
            <!-- PDF Content Here -->
            <div v-if="chartva" align="center">
                <p>
                    <img position="top-right" src="~/static/Logo.jpeg" alt="Logo" width="100" height="100">
                </p>
                <br>
                <hr>
                <div style="width:90%; height:90%;">
                    <p style="color: black">Pacientes que han contestado esta prueba</p>
                    <div v-for="(data,index) in typegen" :key="index">
                        <p style="color: black">{{data}} : {{countgen[index]}}</p>
                    </div>
                    <!-- <p>{}</p>
                <p style="color: black">{{typegen}}</p>
                <p style="color: black">{{countgen}}</p>
                <p style="color: black">{{labels}}</p>
                <p style="color: black">{{data}}</p> -->

                    <Pie :datos="typegen" :numbers="countgen" />
                </div>
                <div style="width:90%; height:90%;">
                    <p style="color: black">Resultados obtenidos</p>
                    <!-- <p>{}</p>
                <p style="color: black">{{typegen}}</p>
                <p style="color: black">{{countgen}}</p>
                <p style="color: black">{{labels}}</p>
                <p style="color: black">{{data}}</p> -->

                    <Bar :datos="typeresult" :numbers="countresult" />
                </div>
            </div>
            <!-- <footer align="right">Este es un reporte generado por el sistema, carece de validez oficial</footer> -->
        </section>
    </vue-html2pdf>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import Pie from '~/components/Charts/Pie.vue';
import Bar from "~/components/Charts/Bar.vue";
export default {
    name: "Reportes",
    data() {
        return {
            type: ["", "info", "success", "warning", "danger"],
            trialselect: null,
            validanwsflag: true,
            topdf: false,
            chartva: false,
            trialshow: {
                trial: "",
                answertype: "",
                quest: "",
            },
            trialanws: [],
            trialanwstype: "",
            namereport: "",
            titulo: "",
            prom: 0,
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
            typegen: ["mujer"],
            countgen: [6],
            typeresult: [],
            countresult: [],
            tableselect: '',
            // Idea, poner en un modal, un select para seleccionar la prueba a buscar la respuesta, indicar quien respondio, que respondio y cuando respondio
        };
    },
    computed: {
        ...mapState({
            pruebas: (state) => state.psico.pruebas,
            listapaci: (state) => state.psico.pacilist,
            answers: (state) => state.psico.trialanws,
            dataanswers: (state) => state.psico.dataansw,
        }),
    },
    methods: {
        resetModal() {
            this.name = "";
            this.nameState = null,
                this.message = "",
                this.trialselect = null;
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            // Trigger submit handler
            // this.handleSubmit()
        },
        exportToPDF() {
            // html2pdf(this.$refs.document, {
            // 	margin: 1,
            // 	filename: 'Reportepsico.pdf',
            //     	image: { type: 'jpeg', quality: 0.98 },
            // 	html2canvas: { dpi: 192, letterRendering: true },
            // 	jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
            // })
            this.$refs.html2Pdf.generatePdf();
        },
        createlistpaci() {
            this.exportToPDF();
        },
        createtriallist() {
            this.$refs.html2Pdf2.generatePdf();
        },
        createchart() {
            this.$nextTick(() => {
                this.$bvModal.hide("modal-prevent-data");
            });
            this.$refs.html2Pdf6.generatePdf();
        },
        getanwslist() {
            this.trialanwstype = this.answers[0].tipo;
            for (let index = 0; index < this.answers.length; index++) {
                let data = {
                    nombre: this.answers[index].quien_respondio,
                    trial: JSON.parse(this.answers[index].reactivos_respuestas),
                    result: this.answers[index].analisis_tratamiento
                };
                this.trialanws.push(data);
            }
            this.$nextTick(() => {
                this.$bvModal.hide("modal-prevent-resp");
            });
            this.$refs.html2Pdf4.generatePdf();
        },
        getanswprom() {
            let suma = 0;
            for (let index = 0; index < this.answers.length; index++) {
                suma = suma + this.answers[index].result;
            }
            this.prom = (suma / this.answers.length);
            this.$nextTick(() => {
                this.$bvModal.hide("modal-prevent-resp2");
            });
            this.$refs.html2Pdf5.generatePdf();
        },
        async gettrials() {
            let prueba = this.pruebas.filter(x => x.nombre_prueba == this.trialselect);
            this.trialshow.trial = prueba[0].nombre_prueba;
            // let a = await this.$store.dispatch("paci/getansw", this.sansw);
            // let result = this.answer[0]
            this.trialshow.answertype = prueba[0].tipo;
            this.trialshow.quest = JSON.parse(prueba[0].reactivos);
            console.log(this.trialshow);
            this.namereport = "Reporte_" + prueba[0].nombre_prueba;
            this.$nextTick(() => {
                this.$bvModal.hide("modal-prevent-trial");
            });
            this.$refs.html2Pdf3.generatePdf();
        },
        async createresplist() {
            this.titulo = this.trialselect;
            this.namereport = "Reporte_respuesta_de_" + this.trialselect;
            let user = localStorage.getItem("nick");
            let msg = await this.$store.dispatch("psico/getansw", this.trialselect);
            if (msg == "Prueba contestada  no encontrado") {
                this.notifyVue("top", "right", "Esta prueba no tiene ninguna respuesta", 4, "icon-simple-remove");
                this.validanwsflag = true;
            } else if (msg == "Respuestas encontradas") {
                this.validanwsflag = false;
                this.trialanws = [];
                console.log(this.answers);
            }
        },

        async createdatalist() {
            this.chartva = false
            this.titulo = this.trialselect;
            this.namereport = "Graficas_de_respuestas_de_" + this.trialselect;
            let user = localStorage.getItem("nick");
            let msg = await this.$store.dispatch("psico/getdataansw", this.trialselect);
            if (msg == "Esta prueba no tiene respuestas") {
                this.notifyVue("top", "right", "Esta prueba no tiene ninguna respuesta", 4, "icon-simple-remove");
                this.validanwsflag = true;
            } else if (msg == "Respuestas encontradas") {
                // this.validanwsflag = false;
                // this.labels = [],
                //     this.data = [],
                // this.typegen = [],
                // this.countgen = []
                console.log("Esto recibo del store de data")
                console.log(this.dataanswers);
                // this.cantpaci = this.dataanswers.length
                for (let index = 0; index < this.dataanswers.length; index++) {
                    if (this.typegen.indexOf(this.dataanswers[index].sexo) === -1) {
                        this.typegen.push(this.dataanswers[index].sexo);
                        this.countgen.push(1)
                        console.log('El array es: ' + this.typegen);
                    } else if (this.typegen.indexOf(this.dataanswers[index].sexo) > -1) {
                        console.log(this.dataanswers[index].sexo + ' ya existe en la colección.');
                        this.countgen[this.typegen.indexOf(this.dataanswers[index].sexo)]++
                    }
                }
                console.log("Asi esta labels")
                console.log(this.labels)
                console.log("Asi esta data")
                console.log(this.data)
                console.log("Asi esta typegen")
                console.log(this.typegen)
                console.log("Asi esta countgen")
                console.log(this.countgen)
                this.labels = this.typegen
                this.data = this.countgen

                if (this.dataanswers[0].clasif == 'Inventario de Ansiedad Estado de Ch. Spielberger') {
                    let titulos = ['Bajo grado de ansiedad', 'Medio grado de ansiedad', 'Alto grado de ansiedad']
                    let conta = [0, 0, 0]
                    this.typeresult = titulos
                    this.countresult = conta
                     for (let index = 0; index < this.dataanswers.length; index++) {
                         if (this.dataanswers[index].result <= 30) {
                             this.countresult[0]++
                         }
                         else if(this.dataanswers[index].result > 30 && this.dataanswers[index].result <= 44){
                             this.countresult[1]++
                         }
                         else if(this.dataanswers[index].result >= 45){
                             this.countresult[2]++
                         }
                        
                    
                }
                } else if (this.dataanswers[0].clasif == 'Inventario de Ansiedad Rasgo de Ch. Spielberger') {
                    let titulos = ['Bajo grado de ansiedad', 'Medio grado de ansiedad', 'Alto grado de ansiedad']
                    let conta = [0, 0, 0]
                    this.typeresult = titulos
                    this.countresult = conta
                     for (let index = 0; index < this.dataanswers.length; index++) {
                         if (this.dataanswers[index].result <= 30) {
                             this.countresult[0]++
                         }
                         else if(this.dataanswers[index].result > 30 && this.dataanswers[index].result <= 44){
                             this.countresult[1]++
                         }
                         else if(this.dataanswers[index].result >= 45){
                             this.countresult[2]++
                         }
                        
                    
                }
                } else if (this.dataanswers[0].clasif == 'Escala de Ansiedad patológica de J. Grau y cols') {
                    let titulos = ['Baja ansiedad', 'Ansiedad moderada', 'Ansiedad alta']
                    let conta = [0, 0, 0]
                    this.typeresult = titulos
                    this.countresult = conta
                     for (let index = 0; index < this.dataanswers.length; index++) {
                         if (this.dataanswers[index].result <= 18) {
                             this.countresult[0]++
                         }
                         else if(this.dataanswers[index].result > 19 && this.dataanswers[index].result <= 24){
                             this.countresult[1]++
                         }
                         else if(this.dataanswers[index].result >= 25){
                             this.countresult[2]++
                         }
                        
                    
                }
                } else if (this.dataanswers[0].clasif == 'Inventario Ansiedad Beck') {
                    let titulos = ['Estado de ánimo bajo a moderado', 'Depresión ausente o mínima', 'Depresión leve', 'Depresión moderada', 'Depresión de forma severa']
                    let conta = [0, 0, 0, 0, 0]
                    this.typeresult = titulos
                    this.countresult = conta
                     for (let index = 0; index < this.dataanswers.length; index++) {
                         if (this.dataanswers[index].result <= 4) {
                             this.countresult[0]++
                         }
                         else if(this.dataanswers[index].result > 5 && this.dataanswers[index].result <= 12){
                             this.countresult[1]++
                         }
                         else if(this.dataanswers[index].result > 13 && this.dataanswers[index].result <= 20){
                             this.countresult[2]++
                         }
                         else if(this.dataanswers[index].result > 21 && this.dataanswers[index].result <= 25){
                             this.countresult[3]++
                         }
                         else if(this.dataanswers[index].result >= 26){
                             this.countresult[4]++
                         }
                       
                }
                } else if (this.dataanswers[0].clasif == 'Inventario de Depresión Estado') {
                    let titulos = ['Bajo grado de depresión', 'Medio grado de depresión', 'Alto grado de depresión']
                    let conta = [0, 0, 0]
                    this.typeresult = titulos
                    this.countresult = conta
                     for (let index = 0; index < this.dataanswers.length; index++) {
                         if (this.dataanswers[index].result <= 34) {
                             this.countresult[0]++
                         }
                         else if(this.dataanswers[index].result > 35 && this.dataanswers[index].result <= 42){
                             this.countresult[1]++
                         }
                         else if(this.dataanswers[index].result >= 43){
                             this.countresult[2]++
                         }
                        
                    
                }
                } else if (this.dataanswers[0].clasif == 'Inventario de Depresión Rasgo') {
                    let titulos = ['Bajo grado de depresión', 'Medio grado de depresión', 'Alto grado de depresión']
                    let conta = [0, 0, 0]
                    this.typeresult = titulos
                    this.countresult = conta
                     for (let index = 0; index < this.dataanswers.length; index++) {
                         if (this.dataanswers[index].result <= 35) {
                             this.countresult[0]++
                         }
                         else if(this.dataanswers[index].result > 36 && this.dataanswers[index].result <= 46){
                             this.countresult[1]++
                         }
                         else if(this.dataanswers[index].result >= 47){
                             this.countresult[2]++
                         }
                        
                    
                }
                } else if (this.dataanswers[0].clasif == 'Escala del Centro de Estudios Epidemiológicos de la depresión') {
                    let titulos = ['<=25%', '<=50', '<=100>']
                    let conta = [0, 0, 0]
                    this.typeresult = titulos
                    this.countresult = conta
                     for (let index = 0; index < this.dataanswers.length; index++) {
                         if (this.dataanswers[index].result <= 25) {
                             this.countresult[0]++
                         }
                         else if(this.dataanswers[index].result > 25 && this.dataanswers[index].result <= 50){
                             this.countresult[1]++
                         }
                         else if(this.dataanswers[index].result > 50){
                             this.countresult[2]++
                         }
                        
                    
                }
                } else if (this.dataanswers[0].clasif == 'Auto escala de depresión de Zung y Conde') {
                    let titulos = ['No es depresión', 'Depresión leve', 'Depresión moderada o depresión neurótica media', 'Depresión neurótica muy alta', 'Depresión severa']
                    let conta = [0, 0, 0, 0, 0]
                    this.typeresult = titulos
                    this.countresult = conta
                     for (let index = 0; index < this.dataanswers.length; index++) {
                         if (this.dataanswers[index].result <= 33) {
                             this.countresult[0]++
                         }
                         else if(this.dataanswers[index].result > 34 && this.dataanswers[index].result <= 40){
                             this.countresult[1]++
                         }
                         else if(this.dataanswers[index].result > 41 && this.dataanswers[index].result <= 47){
                             this.countresult[2]++
                         }
                         else if(this.dataanswers[index].result > 48 && this.dataanswers[index].result <= 54){
                             this.countresult[3]++
                         }
                         else if(this.dataanswers[index].result >= 55){
                             this.countresult[4]++
                         }
                }
                }
                this.validanwsflag = false;
                this.chartva = true
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
        let user = localStorage.getItem("nick");
        let msg3 = await this.$store.dispatch("psico/listpaci", user);
        let msg = await this.$store.dispatch("psico/getprueba", user);
        console.log(this.listapaci);
        console.log(this.pruebas);
        this.topdf = true;
    },
    components: {
    Pie,
    Bar
}
}
</script>

<style scoped>
.myTable {
    background-color: rgb(126, 125, 125);
    border-collapse: collapse;
}

.myTable th {
    background-color: #000;
    color: white;
    width: 50%;
}

.myTable td,
.myTable th {
    padding: 5px;
    border: 1px solid #000;
}
</style>
