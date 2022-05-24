<template>
<div class="container">
    <div align="center">
        <b-button align="left" @click="createlistpaci">Pacientes</b-button>
        <b-button align="center" @click="createtriallist">Pruebas Creadas</b-button>
        <b-button align="right"></b-button>
    </div>
 <b-modal id="modal-prevent-trial" ref="modal" title="Seleccion de prueba" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOk">
        <form ref="form" @submit.stop.prevent="handleSubmit" align="center">
            <b-form-select class="form-control" v-model="optiontype" align="center" id="questype" style="width: 70%" @change="loadoption()" required>
                <template #first>
                    <b-form-select-option :value="null" style="background: gray" disabled>Seleccione
                    </b-form-select-option>
                    <b-form-select-option v-for="(type, index) in boxtype" :value="type.value" v-bind:key="index" style="background: gray">{{ type.text }}</b-form-select-option>
                </template>
            </b-form-select>
        </form>
    </b-modal>

    <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true" :paginate-elements-by-height="1400" filename="Lista_pacientes" :pdf-quality="2" :manual-pagination="true" margin:4 pdf-format="a4" pdf-orientation="Portrait" pdf-content-width="800px" ref="html2Pdf">
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
                    <table class="table table-hover table-fixed myTable" style="color:black; width: 80%;" >
                        <thead>
                            <tr >
                                <th style="width:30%">Nombre(s)</th>
                                <th style="width:30%">Apellidos</th>
                                <th style="width:10%">Edad</th>
                                <th>Sexo</th>
                                <th>Correo</th>
                                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody >
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

    <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true" :paginate-elements-by-height="1400" filename="Lista_pruebas" :pdf-quality="2" :manual-pagination="true" margin:4 pdf-format="a4" pdf-orientation="Portrait" pdf-content-width="800px" ref="html2Pdf2">
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
                    <table class="table table-hover table-fixed myTable" style="color:black; width: 80%;" >
                        <thead>
                            <tr >
                                <th style="width:30%">Nombre</th>
                                <th style="width:5%">N° de preguntas</th>
                                <th style="width:10%">Descripcion</th>
                                <th style="width:10%">Clasificacion</th>
                            </tr>
                        </thead>
                        <tbody >
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
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    name: 'Reportes',
    data() {
        return {
          // Idea, poner en un modal, un select para seleccionar la prueba a buscar la respuesta, indicar quien respondio, que respondio y cuando respondio
        }
    },
    computed: {
        ...mapState({
            pruebas: (state) => state.psico.pruebas,
            listapaci: (state) => state.psico.pacilist,
            answers: (state) => state.psico.trialanws,
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
        createlistpaci() {
            this.exportToPDF()
        },
        createtriallist(){
          this.$refs.html2Pdf2.generatePdf()
        },
      async  gettrials(){
          let msg3 = await this.$store.dispatch("psico/listpaci", user);
          getansw
        }
    },
    async beforeMount() {
        let user = localStorage.getItem('nick')
        let msg3 = await this.$store.dispatch("psico/listpaci", user);
        let msg = await this.$store.dispatch("psico/getprueba", user);
        console.log(this.listapaci)
        console.log(this.pruebas)
    }
}
</script>

<style scoped>
.myTable { background-color:rgb(126, 125, 125);border-collapse:collapse; }
.myTable th { background-color:#000;color:white;width:50%; }
.myTable td, .myTable th { padding:5px;border:1px solid #000; }
</style>
