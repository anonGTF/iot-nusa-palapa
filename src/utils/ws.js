import mqtt from 'mqtt'

const client = mqtt.connect("ws://18.207.248.164:8000/")
client.on("connect", () => {
    console.log("Connected!")
    client.subscribe(("sensor/electric/+"), err => {
        if (err) console.error(err);
    })
})

export default client;