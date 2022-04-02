<template>
<div class="container">
<Formad/>
</div>
</template>

<script>
import Formad from '~/components/Inputs/Formad'
export default {
    layout: "empty",
    components: {
        Formad,
    },
    data() {
        return {
            usuario: {
                correo: 'prueba@gmail.com',
                pass: '123456'
            },
        }
    },
  async beforeMount(){
        // let a = await this.$store.dispatch("psico/getpsico");
    }
    // fetch({
    //     store
    // }) {
    //     console.log("Inicio aqui")
    //     const usuario = [{"correo" : 'prueba@gmail.com', "pass" : '123456'}]
    //     const usuarios = []
    //     usuarios.push(usuario)
    //     console.log("enviado al store")
    //     return store.commit('user/setUsuarios', usuarios)
    // }
}
</script>

<style>

</style>
