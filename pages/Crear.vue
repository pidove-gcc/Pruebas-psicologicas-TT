<template>
<div class="container">
    <b-card :title=Titulo>
        <div class="form-check-inline">
            <div align="left">
                <p>Selecciona el tema y evaluación de la prueba</p>
                <b-form-select class="form-control" :disabled="selctype" @change="changetype" v-model="typeclasif" align="center" id="questype" style="width: 100%" required>
                    <template #first>
                        <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                        <b-form-select-option v-for="(type, index) in clasif" :value="type.type" v-bind:key="index" style="background: #344675">{{ type.type }}</b-form-select-option>
                    </template>
                </b-form-select>
            </div> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
            <div align="right">
                <br>
                <b-button v-b-modal.modal-prevent-deleteall>Borrar todo</b-button>
                <b-button  v-if="typequest == 'Likert' && psicoform2.length > 0" v-b-modal.modal-prevent-edit @click.prevent="getanwsindex(0)">Editar respuestas</b-button>
            </div>
        </div>
        <div align="left" v-if="typeclasif != null">
            <br>
            <p>Tipo de prueba</p>
            <b-form-select class="form-control" :disabled="selctype" @change="blocktype" v-model="typequest" align="center" id="questype" style="width: 17%" required>
                <template #first>
                    <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                    <b-form-select-option v-for="(type, index) in quest" :value="type.type" v-bind:key="index" style="background: #344675">{{ type.type }}</b-form-select-option>
                </template>
            </b-form-select>
        </div>
        <br>
        <b-form v-if="typequest == 'Pregunta abierta'" @submit.stop.prevent="onSubmit">
            <b-form-group id="input-group-1" label="Titulo:" label-for="input-1">
                <b-form-input id="input-1" v-model="Titulo" type="text" placeholder="Ingresa el título de tu prueba" required>
                </b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="Descripción de la prueba" label-for="input-2">
                <b-form-input id="input-2" v-model="Descrip" type="text" placeholder="Ingresa una descripción" required>
                </b-form-input>
            </b-form-group>
            <div class="quest-buttom">
                <div v-for="(question, index) in psicoform1" :key="index">
                    <div align="right">
                        <b-button @click.prevent="getindexask(index)" v-b-modal.modal-prevent-delete variant="danger" class=" rounded-circle px-3 mr-2" v-b-tooltip.hover title="Borrar pregunta">
                            <b-icon icon="dash" scale="2"></b-icon>
                        </b-button>
                    </div>
                    <b-form-group label="Pregunta">
                        <b-form-input v-model="question.pregunta" type="text" required></b-form-input>
                    </b-form-group>
                    <b-form-group label="Respuesta">
                        <b-form-input v-model="question.respuesta" type="text" disabled></b-form-input>
                    </b-form-group>
                </div>
            </div>
            <b-form-group label="Nota">
                <b-form-textarea id="textarea" v-model="Note" placeholder="Ingresa una nota" rows="2" max-rows="6">
                </b-form-textarea>
            </b-form-group>
            <div class="form-check-inline">
                <b-button type="submit" :disabled="disaagre">Guardar prueba</b-button> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                &nbsp; <div class="addbutton mr-5" align="right" v-if="typeclasif != null && typequest == 'Pregunta abierta'">
                    <b-button @click="addQuestion">Agregar pregunta</b-button>
                </div>
                <div class="addbutton" align="right" v-if="typeclasif != null && typequest == 'Likert'">
                    <b-button v-b-modal.modal-prevent-type>Agregar pregunta</b-button>
                </div>
            </div>

        </b-form>
        <div v-if="typequest == 'Likert'">
            <!-- @change="loadoption()" -->
            <!-- <div align="center">  
                    <b-form-select class="form-control" v-model="optionbox" align="center" id="questype"
                        style="width: 30%" required>
                        <template #first>
                            <b-form-select-option :value="null" style="background: gray" disabled>Seleccione
                            </b-form-select-option>
                            <b-form-select-option v-for="(size, index) in boxsize" :value="size.size" v-bind:key="index"
                                style="background: gray">{{ size.text }}</b-form-select-option>
                        </template>
                    </b-form-select>
                </div> -->
            <b-form @submit.stop.prevent="onSubmit2">
                <b-form-group id="input-group-1" label="Titulo:" label-for="input-1">
                    <b-form-input id="input-1" v-model="Titulo" type="text" placeholder="Ingresa el título de tu prueba" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2" label="Descripción de la prueba" label-for="input-2">
                    <b-form-input id="input-2" v-model="Descrip" type="text" placeholder="Ingresa una descripción" required>
                    </b-form-input>
                </b-form-group>
                <!-- <div v-if="optionbox == 3" class="quest-buttom">
                        <div v-for="(question, index) in psicoform2" :key="index">
                            <b-form-group label="Pregunta">
                                <b-form-input v-model="question.pregunta" type="text" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="Respuesta">
                                <b-form-radio-group id="radio-group-1" :options="question.opciones"
                                    name="radio-options"></b-form-radio-group>
                            </b-form-group>
                        </div>
                    </div> -->
                <div class="quest-buttom">
                    <div v-for="(question, index) in psicoform2" :key="index">
                        <div align="right">
                            <b-button @click.prevent="getindexask(index)" v-b-modal.modal-prevent-delete variant="danger" class=" rounded-circle px-3 mr-2" v-b-tooltip.hover title="Borrar pregunta">
                                <b-icon icon="dash" scale="2"></b-icon>
                            </b-button>
                        </div>
                        <b-form-group label="Pregunta">
                            <b-form-input v-model="question.pregunta" type="text" required></b-form-input>
                        </b-form-group>
                        <div>
                            <b-form-group label="Respuesta">
                                <b-form-radio-group id="radio-group-1" :options="question.opciones" name="radio-options"></b-form-radio-group>
                                <div class="form-check-inline">
                                    <p align="right">Tipo de pregunta: {{question.tipo}}</p>
                                    <!-- <b-button v-b-modal.modal-prevent-edit @click.prevent="getanwsindex(index)">Editar respuestas</b-button> -->
                                    <!-- <p>: {{question.opciones[1]}}</p> -->
                                    <!-- <div v-for="anws in question.opciones" :key="anws.index">
                                    <b-form-input v-model="anws.text"></b-form-input>
                                    </div> -->
                                </div>
                                
                            </b-form-group>
                        </div>

                    </div>
                    <!-- <b-form-input v-model="psicoform2[0].pregunta"></b-form-input> -->
                </div>
                <b-form-group label="Nota">
                    <b-form-textarea id="textarea" v-model="Note" placeholder="Ingresa una nota" rows="2" max-rows="6"></b-form-textarea>
                </b-form-group>
                <div class="form-check-inline">
                    <b-button type="submit" :disabled="disaagre">Guardar prueba</b-button> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                    &nbsp;
                    <div class="addbutton" align="right" v-if="typeclasif != null && typequest == 'Pregunta abierta'">
                        <b-button @click="addQuestion">Agregar pregunta</b-button>
                    </div>
                    <div class="addbutton" align="right" v-if="typeclasif != null && typequest == 'Likert'">
                        <b-button v-b-modal.modal-prevent-type>Agregar pregunta</b-button>
                    </div>
                </div>
            </b-form>
        </div>
    </b-card>
    <b-modal id="modal-prevent-type" ref="modal" title="¿Que tipo de pregunta sera?" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOk">
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
    <b-modal id="modal-prevent-delete" ref="modal3" title="Borrar pregunta" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOkd">¿Deseas borrar esta pregunta?</b-modal>
    <b-modal id="modal-prevent-deleteall" ref="modal4" title="Borrar todos los ajustes" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOkda">¿Deseas borrar todas las preguntes y ajustes seleccionados?</b-modal>
    <b-modal id="modal-prevent-edit" ref="modal5" title="Editar opciones de respuesta"  header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOkedit">
    <div  v-for="answ in auxanws.opciones" :key="answ.index">
    <!-- <p>{{toedit}} {{answ.text}}</p> -->
        <b-form-input v-model="answ.text"></b-form-input>
    </div>
    </b-modal>
</div>
</template>

<script>
export default {
    name: 'Crear',
    data() {
        return {
            Titulo: "Nueva prueba",
            Descrip: '',
            Note: 'Ninguna',
            disaagre: true,
            typequest: null,
            todelete: null,
            toedit: 0,
            auxanws: '',
            optiontype: null,
            selctype: false,
            typeclasif: null,
            type: ["", "info", "success", "warning", "danger"],
            optionbox: null,
            psicoform1: [],
            psicoform2: [],
            // psicoform2: [{
            //     pregunta: '',
            //     opciones: ['Totalmente en desacuerdo', 'Ni de acuerdo ni en desacuerdo', 'Totalmente de acuerdo']
            // }, ],
            psicoform3: [],
            quest: [{
                    type: 'Pregunta abierta'
                },
                {
                    type: 'Likert'
                },
            ],
            clasif: [{
                    type: 'Inventario de Ansiedad Estado de Ch. Spielberger'
                },
                {
                    type: 'Inventario de Ansiedad Rasgo de Ch. Spielberger'
                },
                {
                    type: 'Escala de Ansiedad patológica de J. Grau y cols'
                },
                {
                    type: 'Inventario Ansiedad Beck'
                },
                {
                    type: 'Inventario de Depresión Estado'
                },
                {
                    type: 'Inventario de Depresión Rasgo'
                },
                {
                    type: 'Escala del Centro de Estudios Epidemiológicos de la depresión'
                },
                {
                    type: 'Auto escala de depresión de Zung y Conde'
                },
            ],
            boxsize: [{
                    text: 'Opcion multiple de 3 opciones',
                    size: 3
                },
                {
                    text: 'Opcion multiple de 5 opciones',
                    size: 5
                }
            ],
            boxtype: [{
                    text: 'Pregunta positiva',
                    value: '+'
                },
                {
                    text: 'Pregunta negativa',
                    value: '-'
                }
            ],
            boxtype2: [{
                    text: 'Pegunta para medir ansiedad patológica del paciente',
                    value: 'valorar la ansiedad patológica del paciente'
                },
                {
                    text: 'Pregunta para medir sinceridad del paciente',
                    value: 'valorar escala de sinceridad del paciente'
                }
            ],
            boxtype3: [{
                    text: 'Pregunta positiva',
                    value: '+'
                },
                {
                    text: 'Pregunta negativa',
                    value: '-'
                }
            ],
            boxoption: {
                option1: ['Totalmente en desacuerdo', 'Ni de acuerdo ni en desacuerdo', 'Totalmente de acuerdo'],
                option2: ['Totalmente en desacuerdo', 'En desacuerdo', 'Ni de acuerdo ni en desacuerdo', 'De acuerdo', 'Totalmente de acuerdo'],
            },
            boxoption2: {
                option1: [{ //negativo
                        text: 'Totalmente en desacuerdo',
                        value: 1
                    },
                    {
                        text: 'Ni de acuerdo ni en desacuerdo',
                        value: 0
                    },
                    {
                        text: 'Totalmente de acuerdo',
                        value: -1
                    },
                ],
                option2: [{ //positivo
                        text: 'Totalmente en desacuerdo',
                        value: -1
                    },
                    {
                        text: 'Ni de acuerdo ni en desacuerdo',
                        value: 0
                    },
                    {
                        text: 'Totalmente de acuerdo',
                        value: 1
                    },
                ],
                option3: [{ //positivo
                        text: 'Totalmente en desacuerdo',
                        value: -2
                    },
                    {
                        text: 'En desacuerdo',
                        value: -1
                    },
                    {
                        text: 'Ni de acuerdo ni en desacuerdo',
                        value: 0
                    },
                    {
                        text: 'De acuerdo',
                        value: 1
                    },
                    {
                        text: 'Totalmente de acuerdo',
                        value: 2
                    },
                ],
                option4: [{ //negativo
                        text: 'Totalmente en desacuerdo',
                        value: 2
                    },
                    {
                        text: 'En desacuerdo',
                        value: 1
                    },
                    {
                        text: 'Ni de acuerdo ni en desacuerdo',
                        value: 0
                    },
                    {
                        text: 'De acuerdo',
                        value: -1
                    },
                    {
                        text: 'Totalmente de acuerdo',
                        value: -2
                    },
                ]
            },
            boxoption3: {
                option1: [{ //ansiedad estado
                        text: 'No',
                        value: 1
                    },
                    {
                        text: 'Un poco',
                        value: 2
                    },
                    {
                        text: 'Bastante',
                        value: 3
                    },
                    {
                        text: 'Mucho',
                        value: 4
                    },
                ],
                option2: [{ //Ansiedad rasgo
                        text: 'Casi nunca',
                        value: 1
                    },
                    {
                        text: 'Algunas veces',
                        value: 2
                    },
                    {
                        text: 'Frecuentemente',
                        value: 3
                    },
                    {
                        text: 'Casi siempre',
                        value: 4
                    },
                ],
                option3: [{ //Ansiedad patologica
                        text: 'Si',
                        value: 1
                    },
                    {
                        text: 'No',
                        value: 0
                    },
                ],
                option4: [{ //Ansiedad beck
                        text: 'En absoluto',
                        value: 0
                    },
                    {
                        text: 'Levemente, no me molesta mucho',
                        value: 1
                    },
                    {
                        text: 'Moderadamente, fue muy desagradable, pero podia soportarlo',
                        value: 2
                    },
                    {
                        text: 'Severamente, casi no podia soportarlo',
                        value: 3
                    },
                ],
                option5: [{ //Depresion estado
                        text: 'No',
                        value: 0
                    },
                    {
                        text: 'Un poco',
                        value: 1
                    },
                    {
                        text: 'Bastante',
                        value: 2
                    },
                    {
                        text: 'Mucho',
                        value: 3
                    },
                ],
                option6: [{ //Depresion rasgo
                        text: 'Casi nunca',
                        value: 0
                    },
                    {
                        text: 'Algunas veces',
                        value: 1
                    },
                    {
                        text: 'Frecuentemente',
                        value: 2
                    },
                    {
                        text: 'Casi siempre',
                        value: 3
                    },
                ],
                option7: [{ //Escala del Centro de Estudios Epidemiológicos de la depresión
                        text: 'Nunca',
                        value: 0
                    },
                    {
                        text: 'Casi nunca',
                        value: 1
                    },
                    {
                        text: 'Con frecuencia',
                        value: 2
                    },
                    {
                        text: 'Todo o casi todo el tiempo',
                        value: 3
                    },
                ],
                option8: [{ //Auto escala de depresión de Zung y Conde negativa
                        text: 'Muy pocas veces',
                        value: 1
                    },
                    {
                        text: 'Algunas veces',
                        value: 2
                    },
                    {
                        text: 'Muchas veces',
                        value: 3
                    },
                    {
                        text: 'Siempre me ocurre',
                        value: 4
                    },
                ],
                option9: [{ //Auto escala de depresión de Zung y Conde positiva
                        text: 'Muy pocas veces',
                        value: 4
                    },
                    {
                        text: 'Algunas veces',
                        value: 3
                    },
                    {
                        text: 'Muchas veces',
                        value: 2
                    },
                    {
                        text: 'Siempre me ocurre',
                        value: 1
                    },
                ],
            },
            boxoption4: {
                option1: [{ //ansiedad estado
                        text: 'No',
                        value: 1
                    },
                    {
                        text: 'Un poco',
                        value: 2
                    },
                    {
                        text: 'Bastante',
                        value: 3
                    },
                    {
                        text: 'Mucho',
                        value: 4
                    },
                ],
                option2: [{ //Ansiedad rasgo
                        text: 'Casi nunca',
                        value: 1
                    },
                    {
                        text: 'Algunas veces',
                        value: 2
                    },
                    {
                        text: 'Frecuentemente',
                        value: 3
                    },
                    {
                        text: 'Casi siempre',
                        value: 4
                    },
                ],
                option3: [{ //Ansiedad patologica
                        text: 'Si',
                        value: 1
                    },
                    {
                        text: 'No',
                        value: 0
                    },
                ],
                option4: [{ //Ansiedad beck
                        text: 'En absoluto',
                        value: 0
                    },
                    {
                        text: 'Levemente, no me molesta mucho',
                        value: 1
                    },
                    {
                        text: 'Moderadamente, fue muy desagradable, pero podia soportarlo',
                        value: 2
                    },
                    {
                        text: 'Severamente, casi no podia soportarlo',
                        value: 3
                    },
                ],
                option5: [{ //Depresion estado
                        text: 'No',
                        value: 0
                    },
                    {
                        text: 'Un poco',
                        value: 1
                    },
                    {
                        text: 'Bastante',
                        value: 2
                    },
                    {
                        text: 'Mucho',
                        value: 3
                    },
                ],
                option6: [{ //Depresion rasgo
                        text: 'Casi nunca',
                        value: 0
                    },
                    {
                        text: 'Algunas veces',
                        value: 1
                    },
                    {
                        text: 'Frecuentemente',
                        value: 2
                    },
                    {
                        text: 'Casi siempre',
                        value: 3
                    },
                ],
                option7: [{ //Escala del Centro de Estudios Epidemiológicos de la depresión
                        text: 'Nunca',
                        value: 0
                    },
                    {
                        text: 'Casi nunca',
                        value: 1
                    },
                    {
                        text: 'Con frecuencia',
                        value: 2
                    },
                    {
                        text: 'Todo o casi todo el tiempo',
                        value: 3
                    },
                ],
                option8: [{ //Auto escala de depresión de Zung y Conde negativa
                        text: 'Muy pocas veces',
                        value: 1
                    },
                    {
                        text: 'Algunas veces',
                        value: 2
                    },
                    {
                        text: 'Muchas veces',
                        value: 3
                    },
                    {
                        text: 'Siempre me ocurre',
                        value: 4
                    },
                ],
                option9: [{ //Auto escala de depresión de Zung y Conde positiva
                        text: 'Muy pocas veces',
                        value: 4
                    },
                    {
                        text: 'Algunas veces',
                        value: 3
                    },
                    {
                        text: 'Muchas veces',
                        value: 2
                    },
                    {
                        text: 'Siempre me ocurre',
                        value: 1
                    },
                ],
            }
        }
    },
    methods: {
        changetype() {
            if (this.typeclasif == 'Escala de Ansiedad patológica de J. Grau y cols') {
                this.boxtype = this.boxtype2
            } else {
                this.boxtype = this.boxtype3
            }
        },
        getindexask(index) {
            console.log("Tengo el index: " + index)
            this.todelete = index
        },
        getanwsindex(index) {
            console.log("Tengo el index: " + index)
            this.toedit = index
            console.log("Esto editare")
            console.log(this.psicoform2[this.toedit])
            this.auxanws = this.psicoform2[this.toedit]
        },
        pastenewansw(){
            console.log("Pasando respuesta")
            this.psicoform2[this.toedit].opciones =  this.auxanws.opciones
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-edit')
            })
        },
        deleteask() {
            if (this.typequest == 'Pregunta abierta') {
                console.log(this.psicoform1[this.todelete])
                this.psicoform1.splice(this.todelete, 1)
                if (this.psicoform1.length == 0) {
                    this.disaagre = true
                }
            } else if (this.typequest == 'Likert') {
                console.log(this.psicoform2[this.todelete])
                this.psicoform2.splice(this.todelete, 1)
                if (this.psicoform2.length == 0) {
                    this.disaagre = true
                }
            }
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-edit')
            })
        },
        deleteall() {
            this.psicoform1 = []
            this.psicoform2 = []
            this.selctype = false
            this.typequest = null
            this.typeclasif = null
            this.disaagre = true
            this.Titulo = "Nueva prueba"
            this.Descrip = ''
            this.Note = 'Ninguna'
            this.optiontype = null
            this.optionbox = null
            this.boxoption3 = this.boxoption4
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-deleteall')
            })
        },
        blocktype() {
            this.selctype = true
        },
        addQuestion() {

            if (this.typequest == null) {
                this.notifyVue("top", "right", "Seleccione una opcion", 4, 'icon-simple-remove');
            } else if (this.typequest == 'Pregunta abierta') {
                this.psicoform1.push({
                    pregunta: '',
                    respuesta: ''
                })
            } else if (this.typequest == 'Likert') {
                if (this.optionbox == null) {
                    this.notifyVue("top", "right", "Seleccione un tamaño", 4, 'icon-simple-remove');
                } else if (this.optionbox == 3) {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption2.option1
                    })
                } else if (this.optionbox == 5) {
                    this.psicoform3.push({
                        pregunta: '',
                        opciones: this.boxoption2.option3
                    })
                }
            }
            this.disaagre = false
        },
        async onSubmit() {
            const data = {
                nombre: this.Titulo,
                reactivos: JSON.stringify(this.psicoform1),
                descrip: this.Descrip,
                tipo: 'Abierta',
                clasifi: this.typeclasif,
                note: this.Note,
                create: localStorage.getItem('nick'),
            }
            let a = await this.$store.dispatch("psico/createtrial", data);
            if (a == 'Nombre de prueba en uso, ingrese otro') {
                this.notifyVue("top", "right", a, 4, 'icon-simple-remove');
            } else {
                this.notifyVue("top", "right", a, 2, 'icon-satisfied');
                console.log("Ya estoy resetando los datos")
                location.reload();
            }

            // this.typequest= null
            //     this.optiontype= null
            //     this.typeclasif= null

            //     this.optionbox=null
            //     this.psicoform1= []
            //     this.psicoform2= []
            //     this.psicoform3= []
            //console.log(JSON.stringify(data))
            // alert(JSON.stringify(data))
        },
        async onSubmit2() {
            const data = {
                nombre: this.Titulo,
                reactivos: JSON.stringify(this.psicoform2),
                descrip: this.Descrip,
                tipo: 'Likert',
                clasifi: this.typeclasif,
                note: this.Note,
                create: localStorage.getItem('nick'),
            }
            let a = await this.$store.dispatch("psico/createtrial", data);
            if (a == 'Nombre de prueba en uso, ingrese otro') {
                this.notifyVue("top", "right", a, 4, 'icon-simple-remove');
            } else {
                this.notifyVue("top", "right", a, 2, 'icon-satisfied');
                console.log("Ya estoy resetando los datos")
                location.reload();
            }
            //console.log(JSON.stringify(data))
            // alert(JSON.stringify(data))
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
        loadoption() {
            if (this.optionbox == 3) {
                this.psicoform2.opciones = this.boxoption.option1
                console.log(this.psicoform2.opciones)
            } else if (this.optionbox == 5) {
                this.psicoform2.opciones = this.boxoption.option2
                console.log(this.psicoform2.opciones)
            }
        },
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nameState = valid
            return valid
        },
        resetModal() {
            this.name = ''
            this.nameState = null
            this.optiontype = null
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
            this.deleteask()
        },
        handleOkda(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            this.deleteall()
        },
        handleOkedit(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            this.pastenewansw()
        },
        handleSubmit() {
            if (!this.checkFormValidity()) {
                return
            }
            if (this.typeclasif == 'Inventario de Ansiedad Estado de Ch. Spielberger') {
                if (this.optiontype == '+') {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option1,
                        tipo: 'Positiva',
                        respuesta: ''
                    })
                } else {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option1,
                        tipo: 'Negativa',
                        respuesta: ''
                    })
                }

            } else if (this.typeclasif == 'Inventario de Ansiedad Rasgo de Ch. Spielberger') {
                if (this.optiontype == '+') {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option2,
                        tipo: 'Positiva',
                        respuesta: ''
                    })
                } else {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option2,
                        tipo: 'Negativa',
                        respuesta: ''
                    })
                }
            } else if (this.typeclasif == 'Escala de Ansiedad patológica de J. Grau y cols') {
                if (this.optiontype == 'valorar escala de sinceridad del paciente') {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option3,
                        tipo: 'valorar escala de sinceridad del paciente',
                        respuesta: ''
                    })
                } else {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option3,
                        tipo: 'valorar la ansiedad patológica del paciente',
                        respuesta: ''
                    })
                }
            } else if (this.typeclasif == 'Inventario Ansiedad Beck') {
                if (this.optiontype == '+') {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option4,
                        tipo: 'Positiva',
                        respuesta: ''
                    })
                } else {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option4,
                        tipo: 'Negativa',
                        respuesta: ''
                    })
                }
            } else if (this.typeclasif == 'Inventario de Depresión Estado') {
                if (this.optiontype == '+') {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option5,
                        tipo: 'Positiva',
                        respuesta: ''
                    })
                } else {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option5,
                        tipo: 'Negativa',
                        respuesta: ''
                    })
                }
            } else if (this.typeclasif == 'Inventario de Depresión Rasgo') {
                if (this.optiontype == '+') {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option6,
                        tipo: 'Positiva',
                        respuesta: ''
                    })
                } else {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option6,
                        tipo: 'Negativa',
                        respuesta: ''
                    })
                }
            } else if (this.typeclasif == 'Escala del Centro de Estudios Epidemiológicos de la depresión') {
                if (this.optiontype == '+') {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option7,
                        tipo: 'Positiva',
                        respuesta: ''
                    })
                } else {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option7,
                        tipo: 'Negativa',
                        respuesta: ''
                    })
                }
            } else if (this.typeclasif == 'Auto escala de depresión de Zung y Conde') {
                if (this.optiontype == '+') {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option8,
                        tipo: 'Positiva',
                        respuesta: ''
                    })
                } else {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption3.option9,
                        tipo: 'Negativa',
                        respuesta: ''
                    })
                }
            }
            this.disaagre = false
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-type')
            })
        }
    }
}
</script>

<style scoped>
.quest-buttom>div {
    margin: 20px 0;
    padding-bottom: 10px;
}

.quest-buttom>div:not(:last-child) {
    border-bottom: 1px solid rgb(76, 186, 241);
}

.addbutton {
    padding-right: 20px;
    top: 1;
    right: 0;
    left: 1;
}
</style>
