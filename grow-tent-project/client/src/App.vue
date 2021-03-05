<template>
  <v-app>
    <v-main>
      <Login />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Login from "./components/login.component.vue";

export default Vue.extend({
  name: "App",

  components: {
    Login
  },

  data: () => ({
    //
  })
});
</script>
