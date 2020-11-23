const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://18.207.248.164:1883")

client.on("connect", () => {
  console.log("Connected!")
  client.subscribe("test"), err => {
    if(err) {
      console.error(err)
    }
  }
})

client.on("message", (topic, msg) => {
  console.log(msg.toString())
})
