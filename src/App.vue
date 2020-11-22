<template>
  <v-app>
   <Navbar :v-if="true"></Navbar>
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: 'App',

  components: {
    Navbar
  },

  data: () => ({
    
  }),
  computed:{
    loggedIn: ()=> {
      return true;
    }
  }
};
</script>

<style>

</style>
