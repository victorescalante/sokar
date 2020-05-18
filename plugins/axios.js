

export default function ({ $axios, redirect }) {

  $axios.onError(error => {
    console.log("Error")
  })


  $axios.onResponse(response => {
    console.log('response')
  })

  $axios.onRequest(config => {
    console.log(config)
  })

  $axios.onRequestError(error => {
    console.log('onRequestError')
  })

  $axios.onResponseError(error => {
    console.log('onResponseError')
  })

}
