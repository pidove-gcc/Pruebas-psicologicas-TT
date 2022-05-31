<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
   props: {
        width: {
            type: Number,
            default: () => { }
        },
        height: {
            type: Number,
            default: () => { }
        },
        titulos: {
            type: Array,
            default: () => { }
        },
        datos: {
            type: Array,
            default: () => { }
        },
        numbers: {
            type: Array,
            default: () => { }
        },
    },
  mounted() {
    this.renderChart({
    //   labels: [
    //     "January",
    //     "February",
    //     "March",
    //     "April",
    //     "May",
    //     "June",
    //     "July",
    //     "August",
    //     "September",
    //     "October",
    //     "November",
    //     "December"
    //   ],
    labels: this.datos
        
    //     "January",
    //     "February",
    //     "March",
    //     "April",
    //     "May",
    //     "June",
    //     "July",
    //     "August",
    //     "September",
    //     "October",
    //     "November",
    //     "December"
      ,
      datasets: [
        {
        //   label: ['algo','algo2'],
        //   backgroundColor: "#f87979",
        backgroundColor: [ '#00D8FF', '#DD1B16', '#ded826','#41B883', '#E46651', '#7326de','#2632de','#c526de','#de7626','#5ade26','#de265a','#10de7e'],
        //   data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
        data: this.numbers
          
        }
      ]
    });
  }
};
</script>