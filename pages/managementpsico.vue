<template>
<div class="container">
    <h3>Psicologos registrados</h3>
<Psicolist :lista="listp" :length="listplenght"/>
</div>
</template>

<script>
// import Forms from '~/components/Inputs/Forms'
import {
    mapState
} from "vuex";
import Psicolist from '~/components/Inputs/Psicolist.vue'
export default {
    middleware: "admin",
    components: {
         Psicolist,
    },
    computed: {
        ...mapState({
            list: (state) => state.psico.listpsico,
        })
    },
    data() {
        return {
            psicolist: [],
            listp: '',
            listplenght: ''
        }
    },
    async beforeMount() {
        let a = await this.$store.dispatch("psico/getpsico");
        this.listp = this.list.filter(x => x.registrador === localStorage.getItem('usuario') )
        this.listplenght = this.listp.length
        console.log("Termine de filtrar")
        console.log(this.listp)
        console.log("Tengo: " + this.listplenght +" de tamaño")

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
