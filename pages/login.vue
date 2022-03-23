<template>
<div class="container">
<Forms/>
</div>
</template>

<script>
import Forms from '~/components/Inputs/Forms'
export default {
    layout: "empty",
    components: {
        Forms
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
        let a = await this.$store.dispatch("psico/getpsico");
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
