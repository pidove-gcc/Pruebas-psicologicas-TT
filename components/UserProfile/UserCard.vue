<template>
<card class="card-user">
    <p class="card-text"></p>
    <div class="author">
        <div class="block block-one"></div>
        <div class="block block-two"></div>
        <div class="block block-three"></div>
        <div class="block block-four"></div>
        <img class="avatar" :src="foto" alt="..." v-b-modal.modal-prevent-closing />
        <h5 class="title">{{nombre}}</h5>

        <p class="description">{{correo}}</p>
    </div>
    <p></p>
    <div v-if="level == 2" class="card-description">
        {{prop}}
    </div>

    <div slot="footer" class="button-container">
        <b-button v-if="level == 1" :href="pdf" target="_blank" class="rounded-circle px-3 mr-2" v-b-tooltip.hover title="Ver CV">
            <i class="tim-icons icon-badge"></i>
        </b-button>
        <b-button v-b-modal.modal-prevent-pass>
            Cambiar contraseña
        </b-button>
        <!-- <base-button class="btn-facebook" icon round>
            <i class="fab fa-facebook"></i>
        </base-button>
        <base-button class="btn-twitter" icon round>
            <i class="fab fa-twitter"></i>
        </base-button>
        <base-button class="btn-google" icon round>
            <i class="fab fa-google-plus"></i>
        </base-button> -->
    </div>
    <b-modal id="modal-prevent-closing" ref="modal" title="Imagen de perfil" header-bg-variant="default" header-text-variant="light" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOk">
        <b-img thumbnail fluid :src="foto" alt="Image 1"></b-img>
        <b-form-group id="register-group-1" label="Nueva imagen de perfil:" label-for="register-1">
            <b-form-file @change="onChange" accept="image/*" id="register-1" placeholder="Selecciona o arrastra      " drop-placeholder="Arrastra o selecciona"></b-form-file>
        </b-form-group>
        <b-button @click.prevent="upload">Cambiar imagen</b-button>
    </b-modal>
    <b-modal id="modal-prevent-pass" ref="modal" title="Cambio de contraseña" header-bg-variant="default" header-text-variant="light" footer-bg-variant="default" body-bg-variant="default" body-text-variant="light" @show="resetModal" @hidden="resetModal" @ok="handleOkp">
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <!-- <b-form-group  label="Contraseña actual" label-for="name-input-1" invalid-feedback="La contraseña actual es requerida" :state="nameState">
                    <b-form-input id="name-input-1" type="password" v-model="pass.old" :state="nameState" required> </b-form-input>
                </b-form-group> -->
            <!-- <b-form-group label="Nueva contraseña" label-for="name-input-2" invalid-feedback="La nueva contraseña es requerida" :state="nameState">
                    <b-form-input id="name-input-2" type="password" v-model="pass.new" :state="nameState" required></b-form-input>
                </b-form-group> -->
            <label>Contraseña actual</label>
            <b-input-group class="mb-2">
                <b-input-group-prepend is-text @click.prevent="change">
                    <b-icon :icon="icon"></b-icon>
                </b-input-group-prepend>
                <b-form-input :type="typei" id="name-input-11" v-model="pass.old" :state="nameState" required></b-form-input>
            </b-input-group>
            <label>Nueva contraseña</label>
            <b-input-group class="mb-2" label="Nueva contraseña" label-for="name-input-2" invalid-feedback="La nueva contraseña es requerida" :state="nameState">
                <b-input-group-prepend is-text @click.prevent="change2">
                    <b-icon :icon="icon2"></b-icon>
                </b-input-group-prepend>
                <b-form-input :type="typei2" id="name-input-12" v-model="pass.new" :state="nameState" required></b-form-input>
            </b-input-group>
            <label>Confirmar contraseña</label>
            <b-input-group class="mb-2" label="Nueva contraseña" label-for="name-input-2" invalid-feedback="La nueva contraseña es requerida" :state="nameState">
                <b-input-group-prepend is-text @click.prevent="change3">
                    <b-icon :icon="icon3"></b-icon>
                </b-input-group-prepend>
                <b-form-input :type="typei3" id="name-input-13" v-model="confirmpass" :state="nameState" required></b-form-input>
            </b-input-group>
        </form>

    </b-modal>
</card>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    name: 'UserCard',
    data() {
        return {
            type: ["", "info", "success", "warning", "danger"],
            nameState: null,
            foto: '',
            nombre: '',
            correo: '',
            pdf: '',
            usuario: '',
            level: '',
            prop: '',
            img: null,
            user: '',
            pic: {
                user: '',
                img: ''
            },
            pass: {
                old: '',
                new: '',
                email: '',
            },
            confirmpass: '',
            icon: 'eye-slash',
            typei: 'password',
            icon2: 'eye-slash',
            typei2: 'password',
            icon3: 'eye-slash',
            typei3: 'password'
        }
    },
    computed: {
        ...mapState({
            infops: (state) => state.psico.psico,
            infop: (state) => state.paci.paci,
        })
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
        change3() {
            if (this.icon3 == 'eye') {
                this.icon3 = 'eye-slash'
                this.typei3 = 'password'
            } else if (this.icon3 == 'eye-slash') {
                this.icon3 = 'eye'
                this.typei3 = 'text'
            }
        },
        resetModal() {
            this.name = '',
                this.img = null,
                this.pass.old = '',
                this.pass.new = '',
                this.confirmpass= '',
                this.nameState = null
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            // this.handleSubmit()
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
        },

        handleOkp(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            // this.handleSubmit()
            console.log("Vas a enviar")
            console.log(this.pass)
            this.changepass()
            // this.$nextTick(() => {
            //     this.$bvModal.hide('modal-prevent-pass')
            // })
        },
        async changepass() {
            if (this.pass.new == this.confirmpass) {
                // this.notifyVue("top", "right", "Error, las contraseñas no coinciden", 4, 'icon-simple-remove');
                this.pass.email = this.correo
                console.log("Quitaras: " + this.pass.old + " para poner: " + this.pass.new)
                if (this.level == 1) {
                    let msg = await this.$store.dispatch("psico/updatepass", this.pass);
                    console.log(msg)
                    if (msg == 'Contraseña actualizada con exito') {
                        this.notifyVue("top", "right", msg, 2, 'icon-satisfied');
                        this.$nextTick(() => {
                            this.$bvModal.hide('modal-prevent-pass')
                        })
                    } else {
                        this.notifyVue("top", "right", msg, 4, 'icon-simple-remove');
                    }
                } else if (this.level == 2) {
                    let msg = await this.$store.dispatch("paci/updatepass", this.pass);
                    console.log(msg)
                    if (msg == 'Contraseña actualizada con exito') {
                        this.notifyVue("top", "right", msg, 2, 'icon-satisfied');
                        this.$nextTick(() => {
                            this.$bvModal.hide('modal-prevent-pass')
                        })
                    } else {
                        this.notifyVue("top", "right", msg, 4, 'icon-simple-remove');
                    }
                }

            } else {
                this.notifyVue("top", "right", "Error, las contraseñas no coinciden", 4, 'icon-simple-remove');
            }
        },
        onChange(event) {
            this.img = event.target.files[0]
        },
        async upload() {
            if (this.img == null) {
                this.notifyVue("top", "right", "Seleccione una imagen", 3, 'icon-attach-87');
            } else {
                if (this.level == 1) {
                    this.pic.user = this.user
                    this.pic.img = this.img
                    let msg = await this.$store.dispatch("psico/updateimg", this.pic);
                    if (msg == 'Imagen actualizada') {
                        this.notifyVue("top", "right", msg, 2, 'icon-satisfied');
                        const user = localStorage.getItem('email')
                        let infou = await this.$store.dispatch("psico/loadimg", user);
                        location.reload();
                    } else {
                        this.notifyVue("top", "right", "Error, intente de nuevo mas tarde", 4, 'icon-simple-remove');
                    }
                    // console.log("Se mandara al usuario " + this.user)
                } else if (this.level == 2) {
                    this.pic.user = this.user
                    this.pic.img = this.img
                    let msg = await this.$store.dispatch("paci/updateimg", this.pic);
                    if (msg == 'Imagen actualizada') {
                        this.notifyVue("top", "right", msg, 2, 'icon-satisfied');
                        const user = localStorage.getItem('email')
                        let infou = await this.$store.dispatch("paci/loadimg", user);
                        location.reload();
                    } else {
                        this.notifyVue("top", "right", "Error, intente de nuevo mas tarde", 4, 'icon-simple-remove');
                    }
                    // console.log("Se mandara al usuario " + this.user)
                }
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
                })
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
    },
    mounted() {
        this.foto = localStorage.getItem('photo');
        this.correo = localStorage.getItem('email');
        this.usuario = localStorage.getItem('info');
        this.user = localStorage.getItem('nick');
        this.nombre = localStorage.getItem('usern')
        this.level = localStorage.getItem('level')
        if (this.level == 1) {
            console.log('Soy psicologo')
            this.pdf = localStorage.getItem('cv')
        } else if (this.level == 2) {
            this.prop = localStorage.getItem('prop')
        }
    }
};
</script>

<style></style>
