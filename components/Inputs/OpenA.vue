<template>
    <div class="container">
        <b-form @submit.stop.prevent="submit">
            <div v-for="(question, index) in trial" :key="index">
                <p>{{ question.tipo }}</p>
                <b-form-group :label="question.pregunta" label-class="black">
                    <b-form-radio-group v-model="question.respuesta" :options="question.opciones" required>
                    </b-form-radio-group>
                </b-form-group>
            </div>
            <div align="right">
                <b-button type="submit">Enviar respuestas</b-button>
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
            default: () => { }
        },
    },
    data() {
        return {
            triala: [],
        }
    },
    methods: {
        submit() {
            alert(JSON.stringify(this.trial))
        }
    }
}
</script>

<style scoped>
.black {
    font-weight: bold;
}
</style>