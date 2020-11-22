<template>
  <v-container fluid>
    <TopSetting :isHome="true"></TopSetting>
    <v-row
    no-gutters
    class="px-lg-10 px-2 pt-10"
    >
      <v-col
      cols="12"
      >
        <v-card
        elevation="5"
        rounded="xl">
          <v-card-text>
            <LineChart :chartData="chartData" :height="chartHeight" ></LineChart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row
    no-gutters
    class="px-lg-10 px-2 pt-10"
    >
      <v-col 
      :class="mid.class"
      cols="12"
      lg="4"
      v-for="mid in middleData"
      :key="mid.title">
        <v-card
            color="white"
            elevation="5"
            rounded="xl"
          >
            <div class="d-flex flex-no-wrap">
              <v-avatar
                class="ml-5 my-auto"
                size="50"
              >
                <v-img :src="mid.icon"></v-img>
              </v-avatar>
              <div>
                <v-card-title class="headline" v-text="mid.data"></v-card-title>
                <v-card-subtitle v-text="mid.title"></v-card-subtitle>
              </div>
            </div>
          </v-card>
      </v-col>
    </v-row>
    <v-row
    no-gutters
    >
      <v-col
      cols="12"
      >

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TopSetting from '../components/TopSetting'
import LineChart from '../components/LineChart'

export default {
    name: 'Home',
    components:{
      TopSetting,
      LineChart,
    },
    data: () => ({
      chartData: {
        datasets: [{
          data: [100,120,135,140,160,185],
          label: "penggunaan daya total bulan ini",
          borderColor:'rgba(0,0,255,1)',
          fill: false
        }],
        labels: ["1", "2", "3", "4", "5", "6"],
        responsive: true
      },
      chartHeight: 100,
      middleData: [
        { 
          title: "Total Biaya Listrik", 
          data: "Rp 5.720.000", 
          icon: "https://cdn.vuetifyjs.com/images/cards/foster.jpg", 
          class: "pr-lg-4 pr-0 mb-2"
        },
        { 
          title: "Total Daya", 
          data: "15.000 VA", 
          icon: "https://cdn.vuetifyjs.com/images/cards/foster.jpg", 
          class: "pr-lg-4 pr-0 mb-2"
        },
        { 
          title: "Ruangan terboros", 
          data: "Ruang produksi 1", 
          icon: "https://cdn.vuetifyjs.com/images/cards/foster.jpg", 
          class: "mb-2"
        },
      ]
    }),
    methods:{
      
    }
}
</script>

<style>

</style>