<template>
  <div class="container">
<b-form @submit.stop.prevent="sendmsg">
<div v-for="(question,index) in trial" :key="index">
<p>{{question.tipo}}</p>
<b-form-group :label ="question.pregunta" label-class ="black" >
<b-form-radio-group  v-model="question.respuesta" :options="question.opciones" ></b-form-radio-group>
</b-form-group>
</div>
</b-form>
  </div>
</template>

<script>
export default {
name: 'OpenA',
 props: {
        trial: {
            type: Array,
            default: () => {}
        },
    },
    data(){
        return {
            triala: [],
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.black{
    font-weight: bold;
}
</style>