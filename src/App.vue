<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>Banco Interamericano</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-if="state == 'sign-in'" @click="signup">Registro</v-btn>
        <v-btn flat v-if="state == 'sign-up'" @click="signin">Inicio de Sesión</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <sign-up v-if="state == 'sign-up'"/>
      <sign-in v-if="state == 'sign-in'"/>
    </v-content>
  </v-app>
</template>

<script>
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

export default {
  name: 'App',
  components: {
    SignUp,
    SignIn
  },
  data () {
    return {
      state: "sign-in",
    }
  },
  methods: {
    signup: function () {
      this.state = "sign-up"
    },
    signin: function () {
      this.state = "sign-in"
    }
  }
}
</script>
