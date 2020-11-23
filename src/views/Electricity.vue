<template>
  <div>
    <Navbar></Navbar>
    <v-container>
    <TopSetting></TopSetting>
    </v-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import TopSetting from '../components/TopSetting'

export default {
    name: 'Electricity',
    components:{
      Navbar,
      TopSetting
    },
    data: () => ({

    }),
}
</script>

<style>

</style>