<template>
<div>
  <p>workfspn</p>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "../components/login.component.vue"; // @ is an alias to /src

@Component({
  components: {
    Login
  }
})
export default class Home extends Vue {}
</script>
