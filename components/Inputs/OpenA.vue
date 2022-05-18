<template>
    <div class="container">
        <div v-if="trialtype == 'Likert'">
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

        <div v-if="trialtype == 'Abierta'">
            <b-form @submit.stop.prevent="submit">
            <div v-for="(question, index) in trial" :key="index">
                <p>{{ question.tipo }}</p>
                <b-form-group :label="question.pregunta" label-class="black">
                    <b-form-input v-model="question.respuesta" required>
                    </b-form-input>
                </b-form-group>
            </div>
            <div align="right">
                <b-button type="submit">Enviar respuestas</b-button>
            </div>
        </b-form>
        </div>
        
    </div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    name: 'OpenA',
    props: {
        trial: {
            type: Array,
            default: () => { }
        },
    },
    computed: {
        ...mapState({
            triald: (state) => state.paci.asignacion,
        })
    },
    data() {
        return {
            triala: [],
            trialtype: '',
            anwers: {
                name: '',
                paci: '',
                type: '',
                clasif: '',
                trial: '',
            },
            type: ["", "info", "success", "warning", "danger"],
        }
    },
    methods: {
      async  submit() {
            // alert(JSON.stringify(this.trial))
            this.anwers.paci = localStorage.getItem('nick')
            this.anwers.name = this.triald[0].nombre_prueba
            this.anwers.type = this.triald[0].tipo
            this.anwers.clasif = this.triald[0].clasif
            this.anwers.trial = JSON.stringify(this.trial)
            if (this.trialtype == 'Likert') {
                
                const msg = await this.$store.dispatch("paci/saveanwers",this.anwers);
            }
            else{
                 const msg = await this.$store.dispatch("paci/saveanwersa",this.anwers);
            }
            this.notifyVue("top", "right", msg, 2, 'icon-alert-circle-exc');
            this.$router.push("/Asign");
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
        this.trialtype = this.triald[0].tipo
    }
}
</script>

<style scoped>
.black {
    font-weight: bold;
}
</style>