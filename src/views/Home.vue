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
        rounded="xl"
        class="d-none d-md-block"
        >
          <v-card-text>
            <LineChart :chartData="chartData" :options="options" :height="200" ></LineChart>
          </v-card-text>
        </v-card>
        <div class="d-sm-block d-md-none">
          <LineChart :chartData="chartData" :options="options" :height="200" ></LineChart>
        </div>
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
    class="px-lg-10 px-2 pt-10"
    >
      <v-col
      cols="12"
      >
        <v-card
        elevation="5"
        rounded="xl"
        class="d-none d-md-block">
          <v-card-text>
            <BarChart :chartData="barData" :height="100"></BarChart>
          </v-card-text>
        </v-card>
        <div class="d-sm-block d-md-none">
          <BarChart :chartData="barData" :height="200"></BarChart>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TopSetting from '../components/TopSetting'
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'
import mqtt from 'mqtt';

const client = mqtt.connect("ws://18.207.248.164:8000/")
client.on("connect", () => {
  console.log("Connected!")
  client.subscribe(("sensor/electric"), err => {
    if(err) console.error(err);
  })
})

export default {
    name: 'Home',
    components:{
      TopSetting,
      LineChart,
      BarChart
    },
    data: () => ({
      chartData: null,
      iniData: [],
      iniLabel:[],
      iniDataBar: [],
      iniLabelBar:[],
      barData: null,
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
      ],
      options: { //Chart.js options
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  },
                  gridLines: {
                    display: true
                  }
                }],
                xAxes: [ {
                  gridLines: {
                    display: false
                  }
                }]
              },
              legend: {
                display: true
              },
              responsive: true,
              maintainAspectRatio: false,
              elements:{
                point: {
                  radius:0
                }
              }
            }
    }),
    methods:{
      fillData(){
        client.on("message", (topic, msg) => {
          let data = parseFloat(msg.toString());
          if (this.iniData.length > 1) {
            data = this.iniData[this.iniData.length - 1] + parseFloat(msg.toString())
          }
          this.iniData.push(data);
          this.iniDataBar.push(msg.toString());
          this.iniLabel.push("l");
          this.iniLabelBar.push("l");
          if (this.iniDataBar.length > 6) {
            this.iniDataBar.shift();
            this.iniLabelBar.shift();            
          }
          this.updateData()
        })
      },
      updateData(){
        this.chartData = {
            datasets: [{
              data: this.iniData,
              label: "penggunaan daya total bulan ini",
              borderColor:'rgba(0,0,255,1)',
              fill: true
            }],
            labels: this.iniLabel,
            responsive: true
          }
          this.barData = {
            datasets: [{
              data: this.iniDataBar,
              label: "penggunaan daya tiap room",
              borderColor:'rgba(0,0,255,1)',
              fill: false
            }],
            labels: this.iniLabelBar,
            responsive: true
          }
      }
    },
    created: function(){
      this.fillData();
    },
    mounted: function() {
      this.fillData();
    }
}
</script>

<style>

</style>