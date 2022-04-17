<template>
<div class="container">
    <div align="center" class="mt-5 border border-primary" style="max-width: 30rem;">
        <b-card title="Ingrese sus datos">
            <b-form @submit.stop.prevent="changepass">
                <b-form-group id="input-group-1" label="Correo electronico:" label-for="input-1">
                    <b-form-input v-model="user.email" id="input-1" type="email" placeholder="correo" required></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2" label="Codigo de seguridad:" label-for="input-2">
                    <b-form-input v-model="user.token" id="input-2" type="text" placeholder="token" required></b-form-input>
                </b-form-group>
                <label>Nueva contraseña</label>
                <b-input-group class="mb-2" label="Nueva contraseña" label-for="name-input-3" invalid-feedback="La nueva contraseña es requerida" :state="nameState">
                    <b-input-group-prepend is-text @click.prevent="change">
                        <b-icon :icon="icon"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input :type="typei" id="name-input-3" v-model="user.pass" :state="nameState" required></b-form-input>
                </b-input-group>
                <label>Confirmar contraseña</label>
                <b-input-group class="mb-2" label="Nueva contraseña" label-for="name-input-4" invalid-feedback="La nueva contraseña es requerida" :state="nameState">
                    <b-input-group-prepend is-text @click.prevent="change2">
                        <b-icon :icon="icon2"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input :type="typei2" id="name-input-4" v-model="confirmpass" :state="nameState" required></b-form-input>
                </b-input-group>
                <b-button type="submit">Enviar</b-button>
            </b-form>
        </b-card>
    </div>

</div>
</template>

<script>
export default {
    name: 'Resetform',
    data() {
        return {
            type: ["", "info", "success", "warning", "danger"],
            nameState: null,
            user: {
                pass: '',
                email: '',
                token: '',
            },
            confirmpass: '',
            icon: 'eye-slash',
            typei: 'password',
            icon2: 'eye-slash',
            typei2: 'password',
        }
    },
    methods: {
        change() {
            if (this.icon == 'eye') {
                this.icon = 'eye-slash'
                this.typei = 'password'
            } else if (this.icon == 'eye-slash') {
                this.icon = 'eye'
                this.typei = 'text'
            }
        },
        change2() {
            if (this.icon2 == 'eye') {
                this.icon2 = 'eye-slash'
                this.typei2 = 'password'
            } else if (this.icon2 == 'eye-slash') {
                this.icon2 = 'eye'
                this.typei2 = 'text'
            }
        },
        async changepass() {
            if (this.user.pass == this.confirmpass) {
                const msg = await this.$store.dispatch("psico/changepass", this.user);
                if (msg == 'Correo no encontrado') {
                    const msg2 = await this.$store.dispatch("paci/changepass", this.user);
                    if (msg2 == 'Correo no encontrado') {
                        this.notifyVue("top", "right", msg2, 4, 'icon-simple-remove');
                    } else if(msg2 == 'Código de validación incorrecto') {
                        this.notifyVue("top", "right", msg2, 4, 'icon-simple-remove');
                    } else if(msg2 == 'Contraseña actualizada con éxito'){
                        this.notifyVue("top", "right", msg2, 2, 'icon-satisfied');
                        this.$router.push("/");
                    }
                } else if(msg == 'Código de validación incorrecto') {
                    this.notifyVue("top", "right", msg, 4, 'icon-simple-remove');
                } else if(msg == 'Contraseña actualizada con éxito'){
                    this.notifyVue("top", "right", msg, 2, 'icon-satisfied');
                    this.$router.push("/");
                }
            } else {
                this.notifyVue("top", "right", "Las contraseñas no coinciden", 4, 'icon-simple-remove');
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
