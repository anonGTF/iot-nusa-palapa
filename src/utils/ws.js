import mqtt from 'mqtt'
import { URL_WS } from '../constants'

const client = mqtt.connect(URL_WS)
client.on("connect", () => {
    console.log(`Connected to ${URL_WS}`)
    client.subscribe(("sensor/electric/+"), err => {
        if (err) console.error(err);
    })
})

export default client;