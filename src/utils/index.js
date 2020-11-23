// import { URL_API } from "../constants"

export async function kirimData(url, data) {
    const respon = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(_ => _.ok ? _.json() : null)

    return respon
}

// export async function dapatkanOpsi() {
//   return fetch(`${URL_API}/options`)
//     .then(_ => _.ok ? _.json() : null)
// }

// export function validator(nilai) {
//   return typeof nilai === 'string' || nilai === null
// }