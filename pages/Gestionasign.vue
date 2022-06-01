<template>
  <div class="container">
    <h3>Asignaciones programadas</h3>
    <Asignlist />
  </div>
</template>

<script>
import Asignlist from '~/components/Inputs/Asignlist'
export default {
  middleware: "psico",
  components: { Asignlist }
}
</script>

<style>
</style>