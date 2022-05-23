<template>
<div class="container">
    <div align="center" class="mt-5 border border-primary" style="max-width: 30rem;">
        <b-card title="Ingrese su correo, un código le será enviado">
            <b-form @submit.stop.prevent="sendcode">
                <b-form-group id="input-group-1" label="Correo electrónico:" label-for="input-1">
                    <b-form-input v-model="email" id="input-1" type="email" placeholder="correo" required></b-form-input>
                </b-form-group>
                <b-button type="submit">Enviar código</b-button>
            </b-form>
        </b-card>
    </div>

</div>
</template>

<script>
export default {
    name: 'Codegenerator',
    data() {
        return {
            email: '',
            type: ["", "info", "success", "warning", "danger"],
        }
    },
    methods: {
     async   sendcode() {
            // Email no encontrado
            const msg = await this.$store.dispatch("psico/createcode", this.email);
            console.log(msg)
            if (msg == 'Email no encontrado') {
                const msg2 = await this.$store.dispatch("paci/createcode", this.email);
                if (msg2 == 'Email no encontrado') {
                    this.notifyVue("top", "right", "Usuario no registrado", 4, 'icon-simple-remove');
                }
                else {
                    this.notifyVue("top", "right", msg2, 2, 'icon-satisfied');
                }
            }
            else {
                this.notifyVue("top", "right", msg, 2, 'icon-satisfied');
            }
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
    }
}
</script>

<style>

</style>
