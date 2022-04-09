<template>
<div class="container">
    <h3>Psicologos registrados</h3>
<Psicolist :lista="listp"/>
</div>
</template>

<script>
// import Forms from '~/components/Inputs/Forms'
import {
    mapState
} from "vuex";
import Psicolist from '~/components/Inputs/Psicolist.vue'
export default {
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
            listp: null,
        }
    },
    async beforeMount() {
        let a = await this.$store.dispatch("psico/getpsico");
        this.listp = this.list.filter(x => x.registrador === localStorage.getItem('usuario') )
        console.log(this.listp)
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
