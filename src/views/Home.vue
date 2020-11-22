<template>
  <v-container fluid>
    <TopSetting :isHome="true"></TopSetting>
    <v-row
    no-gutters
    class="px-10 pt-10"
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
    class="px-10 pt-10"
    >
      <v-col 
      class="pr-4"
      cols="4">
        <v-card
        elevation="5"
        rounded="xl"
        >
          <v-card-text>
            <h1>Rp 5.720.000</h1>
            <p>Total Biaya Listrik</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col 
      class="pr-4"
      cols="4">
        <v-card
        elevation="5"
        rounded="xl"
        >
          <v-card-text>
            <h1>Rp 5.720.000</h1>
            <p>Total Biaya Listrik</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
      cols="4">
        <v-card
        elevation="5"
        rounded="xl"
        >
          <v-card-text>
            <h1>Rp 5.720.000</h1>
            <p>Total Biaya Listrik</p>
          </v-card-text>
        </v-card>
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
          label: "penggunaan daya total bulan ini"
        }],
        labels: ["1", "2", "3", "4", "5", "6"]
      },
      chartHeight: 100,
    }),
    methods:{
      
    }
}
</script>

<style>

</style>