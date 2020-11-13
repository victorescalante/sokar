<template>
  <div>
    <el-row>
      <el-col :md="24">

        <p class="error">{{ error }}</p>
        <p>{{result}}</p>
        <div class="qr-div">
          <qrcode-stream @decode="onDecode" @init="onInit" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    head () {
      return {
        title: 'Lectura de QR',
      }
    },
    data(){
      return{
        result: '',
        error: ''
      }
    },
    watch: {
      result: function (oldVal, newVal) {
        if (this.result.includes('diken-')){
          this.$router.push('/read/'+this.result.replace("diken-", ""));
        }
      }
    },
    methods: {
      onDecode (result) {
        this.result = result
      },

      async onInit (promise) {
        try {
          await promise
        } catch (error) {
          if (error.name === 'NotAllowedError') {
            this.error = "ERROR: you need to grant camera access permisson"
          } else if (error.name === 'NotFoundError') {
            this.error = "ERROR: no camera on this device"
          } else if (error.name === 'NotSupportedError') {
            this.error = "ERROR: secure context required (HTTPS, localhost)"
          } else if (error.name === 'NotReadableError') {
            this.error = "ERROR: is the camera already in use?"
          } else if (error.name === 'OverconstrainedError') {
            this.error = "ERROR: installed cameras are not suitable"
          } else if (error.name === 'StreamApiNotSupportedError') {
            this.error = "ERROR: Stream API is not supported in this browser"
          }
        }
      }
    }
  }
</script>
