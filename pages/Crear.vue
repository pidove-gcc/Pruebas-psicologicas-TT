<template>
<div class="container">
    <b-card :title=Titulo>
        <div align="right">
            <b-button @click="addQuestion">Agregar</b-button>
        </div>
        <div align="center">
            <b-form-select class="form-control" v-model="typequest" align="center" id="questype" style="width: 30%" required>
                <template #first>
                    <b-form-select-option :value="null" style="background: gray" disabled>Seleccione</b-form-select-option>
                    <b-form-select-option v-for="(type,index) in quest" :value="type.type" v-bind:key="index" style="background: gray">{{type.type}}</b-form-select-option>
                </template>
            </b-form-select>
        </div>
        <b-form v-if="typequest == 'Pregunta abierta'" @submit.stop.prevent="onSubmit">
            <b-form-group id="input-group-1" label="Titulo:" label-for="input-1">
                <b-form-input id="input-1" v-model="Titulo" type="text" placeholder="Ingresa el titulo de tu prueba" required>
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
            <b-button type="submit">Guardar</b-button>
        </b-form>
        <div v-if="typequest == 'Likert'">
            <div align="center">
                <b-form-select class="form-control" v-model="optionbox" align="center" id="questype" style="width: 30%" @change="loadoption()" required>
                    <template #first>
                        <b-form-select-option :value="null" style="background: gray" disabled>Seleccione</b-form-select-option>
                        <b-form-select-option v-for="(size,index) in boxsize" :value="size.size" v-bind:key="index" style="background: gray">{{size.size}}</b-form-select-option>
                    </template>
                </b-form-select>
            </div>
            <b-form @submit.stop.prevent="onSubmit2">
                <b-form-group id="input-group-1" label="Titulo:" label-for="input-1">
                    <b-form-input id="input-1" v-model="Titulo" type="text" placeholder="Ingresa el titulo de tu prueba" required>
                    </b-form-input>
                </b-form-group>
                <div v-if="optionbox == 3" class="quest-buttom">
                    <div v-for="(question,index) in psicoform2" :key="index">
                        <b-form-group label="Pregunta">
                            <b-form-input v-model="question.pregunta" type="text" required></b-form-input>
                        </b-form-group>
                        <b-form-group label="Respuesta">
                            <b-form-radio-group id="radio-group-1" :options="question.opciones"  name="radio-options"></b-form-radio-group>
                        </b-form-group>
                    </div>
                </div>
                <div v-if="optionbox == 5" class="quest-buttom">
                    <div v-for="(question,index) in psicoform3" :key="index">
                        <b-form-group label="Pregunta">
                            <b-form-input v-model="question.pregunta" type="text" required></b-form-input>
                        </b-form-group>
                        <b-form-group label="Respuesta">
                            <b-form-radio-group id="radio-group-1" :options="question.opciones"  name="radio-options"></b-form-radio-group>
                        </b-form-group>
                    </div>
                </div>
                <b-button type="submit">Guardar</b-button>
            </b-form>
        </div>
    </b-card>
</div>
</template>

<script>
export default {
    name: 'Crear',
    data() {
        return {
            Titulo: "Nuevo formulario",
            typequest: null,
            colorn: ['', 'info', 'success', 'warning', 'danger'],
            optionbox: null,
            psicoform1: [{
                pregunta: '',
                respuesta: ''
            }, ],
            psicoform2: [{
                pregunta: '',
                opciones: ['Totalmente en desacuerdo', 'Ni de acuerdo ni en desacuerdo', 'Totalmente de acuerdo']
            }, ],
            psicoform3: [{
                pregunta: '',
                opciones: ['Totalmente en desacuerdo', 'En desacuerdo', 'Ni de acuerdo ni en desacuerdo', 'De acuerdo', 'Totalmente de acuerdo']
            }, ],
            quest: [{
                    type: 'Pregunta abierta'
                },
                {
                    type: 'Likert'
                },
            ],
            boxsize: [{
                    size: 3
                },
                {
                    size: 5
                }
            ],
            boxoption: {
                option1: ['Totalmente en desacuerdo', 'Ni de acuerdo ni en desacuerdo', 'Totalmente de acuerdo'],
                option2: ['Totalmente en desacuerdo', 'En desacuerdo', 'Ni de acuerdo ni en desacuerdo', 'De acuerdo', 'Totalmente de acuerdo'],
            }
        }
    },
    methods: {
        addQuestion() {
            if (this.typequest == null) {
                this.notifyVue('top', 'right', 'Seleccione una opcion')
            } else if (this.typequest == 'Pregunta abierta') {
                this.psicoform1.push({
                    pregunta: '',
                    respuesta: ''
                })
            } else if (this.typequest == 'Likert') {
                if (this.optionbox == null) {
                    this.notifyVue('top', 'right', 'Seleccione un tamaño')
                } else if(this.optionbox == 3) {
                    this.psicoform2.push({
                        pregunta: '',
                        opciones: this.boxoption.option1
                    })
                }
                else if(this.optionbox == 5) {
                    this.psicoform3.push({
                        pregunta: '',
                        opciones: this.boxoption.option2
                    })
                }

            }
        },
        onSubmit() {
            const data = {
                psicoform1: this.psicoform1
            }
            //console.log(JSON.stringify(data))
            alert(JSON.stringify(data))
        },
        onSubmit2() {
            if (this.optionbox == 3) {
                const data = {
                psicoform2: this.psicoform2
            }
            alert(JSON.stringify(data))
            }
            else if(this.optionbox == 5) {
                const data = {
                psicoform2: this.psicoform3
            }
            alert(JSON.stringify(data))
            }
        },
        notifyVue(verticalAlign, horizontalAlign, msm) {
            let color = Math.floor(Math.random() * 4 + 1);
            this.$notify({
                message: msm,
                timeout: 3000,
                icon: 'tim-icons icon-single-02',
                horizontalAlign: horizontalAlign,
                verticalAlign: verticalAlign,
                type: this.colorn[color]
            });
        },
        loadoption(){
            if (this.optionbox == 3) {
                this.psicoform2.opciones = this.boxoption.option1
                console.log(this.psicoform2.opciones)
            }
            else if (this.optionbox == 5) {
                this.psicoform2.opciones = this.boxoption.option2
                console.log(this.psicoform2.opciones)
            }
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
</style>
