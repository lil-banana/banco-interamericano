<template>
  <div class="sign-up">
    <countries></countries>
  </div>
</template>

<script>
import Countries from './Countries.vue'

export default {
  name: 'sign-up',
  props: {
  },
  components: {
    Countries,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
