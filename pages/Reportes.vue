<template>
<div class="container">
    <div align="center">
        <h2>Generacion de reportes</h2>
        <Reportes />
        <!-- <div style="width:60%; height:60%;">
            <Pie :datos="labels" :numbers="data" />
        </div> -->

    </div>
</div>
</template>

<script>
import Reportes from '~/components/Inputs/Reportes.vue';
import Pie from '~/components/Charts/Pie.vue';
// import PieChart from '~/components/Charts/Pie.vue'
export default {
    components: {
        Reportes,
        Pie
    },
    data() {
        return {
            largo: 50,
            ancho: 50,
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
        }
    },
}
</script>

<style scoped>

</style>
