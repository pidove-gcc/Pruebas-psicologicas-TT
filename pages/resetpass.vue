<template>
  <div class="container">
      <div align="center">
          <h3>Ingrese sus datos para cambiar su contraseña</h3>
          <Resetform/>
      </div>
  </div>
</template>

<script>
import Resetform from '~/components/Inputs/Resetform'
export default {
layout: "empty",
components: {
    Resetform,
}
}
</script>

<style>

</style>