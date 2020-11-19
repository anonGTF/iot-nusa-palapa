<template>
  <v-container fluid>
    <TopSetting :isHome="true"></TopSetting>
  </v-container>
</template>

<script>
import TopSetting from '../components/TopSetting'

export default {
    name: 'Home',
    components:{
      TopSetting
    },
    data: () => ({
      
    }),
    methods:{
      
    }
}
</script>

<style>

</style>