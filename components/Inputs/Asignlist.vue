<template>
    <div class="container">
        <div class="table-responsive-sm">
            <table class="table table-hover table-fixed">
                <thead>
                    <tr>
                        <th>Prueba</th>
                        <th>Asignado a</th>
                        <th>Fecha limite</th>
                        <th>Status</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="asignation in pageOfItems" :key="asignation.index">
                        <td>{{ asignation.prueba }}</td>
                        <td>{{ asignation.paciente }}</td>
                        <td v-if="day > asignation.fecha_limite" bgcolor="red">{{ asignation.fecha_limite }} - caducada
                        </td>
                        <td v-else>{{ asignation.fecha_limite }}</td>
                        <td>{{ asignation.status }}</td>
                        <td>
                            <b-button @click.prevent="showpaci(prueba)" v-b-modal.modal-prevent-closing
                                variant="warning" class="rounded-circle px-3 mr-2" v-b-tooltip.hover
                                title="Comentarios">
                                <b-icon icon="chat" scale="2"></b-icon>
                            </b-button>
                            <b-button @click.prevent="deleteUser(usuario.nombre_usuario)" v-b-modal.modal-prevent-delete
                                variant="info" class="rounded-circle px-3" v-b-tooltip.hover title="Cambiar fecha">
                                <b-icon icon="calendar2-date" scale="2"></b-icon>
                            </b-button>

                            <b-button @click.prevent="deleteUser(usuario.nombre_usuario)" v-b-modal.modal-prevent-delete
                                variant="danger" class="rounded-circle px-3" v-b-tooltip.hover title="Eliminar">
                                <b-icon icon="x-circle" scale="2"></b-icon>
                            </b-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <footer class="mt-30">
                <jw-pagination :items="asign" :pageSize="5" @changePage="onChangePage"></jw-pagination>
            </footer>
            <p>{{ day }}</p>
        </div>
    </div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    name: 'Asignlist',
    data() {
        return {
            pageOfItems: [],
            day: '',
            day2: '2022-04-29'
        }
    },
    computed: {
        ...mapState({
            asign: (state) => state.psico.asignaciones,
        }),
    },
    methods: {
        onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
            console.log(this.pageOfItems)
        },
        padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        },
        formatDate(date) {
            return [
                date.getFullYear(),
                this.padTo2Digits(date.getMonth() + 1),
                this.padTo2Digits(date.getDate()),
            ].join('-');
        }
    },
    async beforeMount() {
        let user = localStorage.getItem('nick')
        let msg = await this.$store.dispatch("psico/getasign", user);
        console.log(msg);
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        this.day = this.formatDate(today)
        console.log(this.day)
    }
}
</script>

<style>
</style>
