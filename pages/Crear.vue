<template>
<div class="container">
    <b-card :title=Titulo>
        <div align="right">
            <b-button @click="addQuestion">Agregar</b-button>
        </div>
        <b-form @submit.stop.prevent="onSubmit">
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
    </b-card>
</div>
</template>

<script>
export default {
    name: 'Crear',
    data() {
        return {
            Titulo: "Nuevo formulario",
            psicoform1: [{
                pregunta: '',
                respuesta: ''
            }, ],
        }
    },
    methods: {
        addQuestion() {
            this.psicoform1.push({
                pregunta: '',
                respuesta: ''
            })
        },
           onSubmit () {
      const data = {
        psicoform1: this.psicoform1
      }
      //console.log(JSON.stringify(data))
      alert(JSON.stringify(data))
    }
    }
}
</script>

<style scoped>
.quest-buttom > div {
  margin: 20px 0;
  padding-bottom: 10px;
}
.quest-buttom > div:not(:last-child) {
  border-bottom: 1px solid rgb(76, 186, 241);
}
</style>
