<template>
  <div class="sign-up">
    <v-layout row justify-center>
        <v-flex xs1>
          <countries/>
        </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Countries from './Countries.vue'

export default {
  name: 'sign-up',
  props: {
  },
  components: {
    Countries
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
