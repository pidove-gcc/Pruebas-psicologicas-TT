<template>
<div class="container">
    <b-card :title=Titulo>
        <div align="left">
            <p>Tema de la prueba</p>
            <b-form-select class="form-control" v-model="typeclasif" align="center" id="questype" style="width: 30%" required>
                <template #first>
                    <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                    <b-form-select-option v-for="(type,index) in clasif" :value="type.type" v-bind:key="index" style="background: #344675">{{type.type}}</b-form-select-option>
                </template>
            </b-form-select>
        </div>
        <div class="addbutton" align="right" v-if="typeclasif != null && typequest == 'Pregunta abierta'">
            <b-button @click="addQuestion">Agregar</b-button>
        </div>
        <div class="addbutton" align="right" v-if="optionbox != null && typequest== 'Likert' ">
            <b-button v-b-modal.modal-prevent-type>Agregar</b-button>
        </div>
        <div align="center" v-if="typeclasif != null">
            <b-form-select class="form-control" v-model="typequest" align="center" id="questype" style="width: 30%" required>
                <template #first>
                    <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                    <b-form-select-option v-for="(type,index) in quest" :value="type.type" v-bind:key="index" style="background: #344675">{{type.type}}</b-form-select-option>
                </template>
            </b-form-select>
        </div>
        <b-form v-if="typequest == 'Pregunta abierta'" @submit.stop.prevent="onSubmit">
            <b-form-group id="input-group-1" label="Titulo:" label-for="input-1">
                <b-form-input id="input-1" v-model="Titulo" type="text" placeholder="Ingresa el titulo de tu prueba" required>
                </b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="Descripcion de la prueba" label-for="input-2">
                <b-form-input id="input-2" v-model="Descrip" type="text" placeholder="Ingresa una descripcion" required>
                </b-form-input>
            </b-form-group>
            <div class="quest-buttom">
                <div v-for="(question,index) in psicoform1" :key="index">
                    <b-form-group label="Pregunta">
                        <b-form-input v-model="question.pregunta" type="text" required></b-form-input>
                    </b-form-group>
                    <b-form-group label="Respuesta">
                        <b-form-input v-model="question.respuesta" type="text" disabled></b-form-input>
                    </b-form-group>
                </div>
            </div>
            <b-form-group label="Nota">
                <b-form-textarea id="textarea" v-model="Note" placeholder="Ingresa una nota" rows="2" max-rows="6"></b-form-textarea>
            </b-form-group>
            <b-button type="submit">Guardar</b-button>
        </b-form>
        <div v-if="typequest == 'Likert'">
            <div align="center">
                <!-- @change="loadoption()" -->
                <b-form-select class="form-control" v-model="optionbox" align="center" id="questype" style="width: 30%" required>
                    <template #first>
                        <b-form-select-option :value="null" style="background: gray" disabled>Seleccione</b-form-select-option>
                        <b-form-select-option v-for="(size,index) in boxsize" :value="size.size" v-bind:key="index" style="background: gray">{{size.text}}</b-form-select-option>
                    </template>
                </b-form-select>
            </div>
            <b-form @submit.stop.prevent="onSubmit2">
                <b-form-group id="input-group-1" label="Titulo:" label-for="input-1">
                    <b-form-input id="input-1" v-model="Titulo" type="text" placeholder="Ingresa el titulo de tu prueba" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2" label="Descripcion de la prueba" label-for="input-2">
                    <b-form-input id="input-2" v-model="Descrip" type="text" placeholder="Ingresa una descripcion" required>
                    </b-form-input>
                </b-form-group>
                <div v-if="optionbox == 3" class="quest-buttom">
                    <div v-for="(question,index) in psicoform2" :key="index">
                        <b-form-group label="Pregunta">
                            <b-form-input v-model="question.pregunta" type="text" required></b-form-input>
                        </b-form-group>
                        <b-form-group label="Respuesta">
                            <b-form-radio-group id="radio-group-1" :options="question.opciones" name="radio-options"></b-form-radio-group>
                        </b-form-group>
                    </div>
                </div>
                <div v-if="optionbox == 5" class="quest-buttom">
                    <div v-for="(question,index) in psicoform2" :key="index">
                        <b-form-group label="Pregunta">
                            <b-form-input v-model="question.pregunta" type="text" required></b-form-input>
                        </b-form-group>
                        <b-form-group label="Respuesta">
                            <b-form-radio-group id="radio-group-1" :options="question.opciones" name="radio-options"></b-form-radio-group>
                        </b-form-group>
                    </div>
                </div>
                <b-form-group label="Nota">
                    <b-form-textarea id="textarea" v-model="Note" placeholder="Ingresa una nota" rows="2" max-rows="6"></b-form-textarea>
                </b-form-group>
                <b-button type="submit">Guardar</b-button>
            </b-form>
        </div>
    </b-card>
    <b-modal id="modal-prevent-type" ref="modal" title="¿Que tipo de pregunta sera?" header-bg-variant="default" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOk">
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-select class="form-control" v-model="optiontype" align="center" id="questype" style="width: 30%" @change="loadoption()" required>
                <template #first>
                    <b-form-select-option :value="null" style="background: gray" disabled>Seleccione</b-form-select-option>
                    <b-form-select-option v-for="(type,index) in boxtype" :value="type.value" v-bind:key="index" style="background: gray">{{type.text}}</b-form-select-option>
                </template>
            </b-form-select>
        </form>
    </b-modal>
</div>
</template>

<script>
export default {
    name: 'Crear',
    data() {
        return {
            Titulo: "Nuevo formulario",
            Descrip: '',
            Note: 'Ninguna',
            typequest: null,
            optiontype: null,
            typeclasif: null,
            type: ["", "info", "success", "warning", "danger"],
            optionbox: null,
            psicoform1: [{
                pregunta: '',
                respuesta: ''
            }, ],
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
                    type: 'Estres'
                },
                {
                    type: 'Ansiedad'
                },
                {
                    type: 'Depresion'
                },
                {
                    type: 'Trastorno por déficit de atención e hiperactividad (TDAH)'
                },
                {
                    type: 'Trastorno por estrés postraumático.'
                },
                {
                    type: 'Esquizofrenia'
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
            }
        }
    },
    methods: {
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
        },
   async     onSubmit() {
            const data = {
                nombre: this.Titulo,
                reactivos: JSON.stringify(this.psicoform1),
                descrip: this.Descrip,
                tipo: 'Abierta',
                clasifi: this.typeclasif,
                note: this.Note,
                create: localStorage.getItem('nick'),
            }
            let a = await this.$store.dispatch("psico/createtrial",data);
            if (a == 'Nombre de prueba en uso, ingrese otro') {
                this.notifyVue("top", "right", a, 4, 'icon-simple-remove');
            }
            else {
                this.notifyVue("top", "right", a, 2, 'icon-satisfied');
            }
            //console.log(JSON.stringify(data))
            // alert(JSON.stringify(data))
        },
     async   onSubmit2() {
            const data = {
                nombre: this.Titulo,
                reactivos: JSON.stringify(this.psicoform2),
                descrip: this.Descrip,
                tipo: 'Likert',
                clasifi: this.typeclasif,
                note: this.Note,
                create: localStorage.getItem('nick'),
            }
            let a = await this.$store.dispatch("psico/createtrial",data);
            this.notifyVue("top", "right", a, 2, 'icon-satisfied');
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
        handleSubmit() {
            if (!this.checkFormValidity()) {
                return
            }
            if (this.optionbox == 3) {
                if (this.optiontype == '+') {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption2.option2,
                        tipo: 'Positiva',
                        respuesta:''
                    })
                } else {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption2.option1,
                        tipo: 'Negativa',
                        respuesta:''
                    })
                }

            } else if (this.optionbox == 5) {
                if (this.optiontype == '+') {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption2.option3,
                        tipo: 'Positiva',
                        respuesta:''
                    })
                } else {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption2.option4,
                        tipo: 'Negativa',
                        respuesta:''
                    })
                }
            }
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
    position: fixed;
    top: 1;
    right: 0;
    left: 1;
}
</style>
