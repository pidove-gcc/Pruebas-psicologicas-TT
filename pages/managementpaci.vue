<template>
    <div class="container">
        <h3>Pacientes registrados</h3>
        <Pacilist :lista="list" :psico="listps" />
    </div>
</template>

<script>
import {
    mapState
} from "vuex";
import Pacilist from '~/components/Inputs/Pacilist.vue'
export default {
    components: {
        Pacilist,
    },
    computed: {
        ...mapState({
            list: (state) => state.paci.listpaci,
            listps: (state) => state.psico.listpsico,
        })
    },
    data() {
        return {
            psicolist: [],
            listp: null,
            pacilist: [],
        }
    },
    async created() {
        let a = await this.$store.dispatch("paci/getpaci");
        console.log("Obtuve pacientes")
        this.pacilist = this.list
        let b = await this.$store.dispatch("psico/getpsico");
        console.log("Obtuve psicologos")
        this.psicolist = this.listps
        // for (let index = 0; index < list.length; index++) {
        //     console.log(list[index].nombre_usuario)
        //     console.log(list[index].nombre)
        //     console.log(list[index].apellidos)
        //     console.log(list[index].correo_psi)
        // }
    }

}
</script>

<style>
</style>
