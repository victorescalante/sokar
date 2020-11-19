<template>
    <div class="center-layout">
      <div class="space-div">
        <el-row>
          <el-col :md="12" >
            <div v-if="!send">
              <div class="title-form">
                <h2>Formulario de servicio</h2>
                <br>
                <p>En Diken International estamos comprometidos con brindarte un servicio de calidad, por eso te pedimos nos ayudes a contestar las siguientes preguntas:</p>
                <br>
              </div>
              <div class="body-form">
                <el-form ref="formUser" :rules="rules" :model="form">
                  <el-row :gutter="25">
                    <el-col :md="24">
                      <p><b>Describe brevemente si el servicio ofrecido por parte de nuestro equipo se realizo de forma satisfactoria.</b></p>
                      <el-form-item label="Descripción"  prop="description">
                        <el-input type="textarea" v-model="form.description"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :md="24">
                      <p><b>¿Cómo calificarias el servicio ofrecido por nuestro equipo?</b></p>
                      <div class="container-rate">
                        <el-rate
                          v-model="form.star"
                          :texts="['malo', 'decepcionado', 'normal', 'bueno', 'increible']"
                          :colors="colors" show-text>
                        </el-rate>
                      </div>
                    </el-col>
                    <el-col :md="24">
                      <p><b>¿Te gustaría ser contactado para revisar el estatus de tu servicio?</b></p>
                      <div class="container-rate">
                        <el-switch
                          v-model="form.check_revision"
                          active-text="Si."
                          inactive-text="No">
                        </el-switch>
                      </div>
                    </el-col>
                    <el-col :md="24">
                      <div class="container-rate">
                        <el-button type="primary" @click="sendForm('formUser')">Enviar respuestas</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <div v-else>
              <div class="title-form">
                <h2>Muchas gracias</h2>
                <br>
                <p>Si haz solicitado una revisión de tu servicio, en breve nos comunicaremos contigo.</p>
                <div style="padding: 20px 0">
                  <el-link type="primary" href="https://www.dikeninternational.com/mex/inicio/index.php">Ir a la pagina de inicio</el-link>
                </div>
                <br>
              </div>
            </div>
          </el-col>
          <el-col :md="12">
            <img src="~/assets/images/feedback-01.png" alt="">
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
    export default {
      name: "_id.vue",
      template: "default",
      data(){
        return {
          send: false,
          colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
          form: {
            description: "",
            star: 5,
            check_revision: false,
            token_review: this.$route.query.token
          },
          rules: {
            description: [{required: true, message: 'Agrega una descripción', trigger: 'blur'}],
            star: [{required: true, message: 'Agrega calificación', trigger: 'blur'}],
          }
        }
      },
      methods: {

        sendForm(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios.post(process.env.URL_RA_BACKEND+'review/'+this.$route.params.id, this.form)
                .then(response => {
                  this.$notify({
                    title: 'Correcto',
                    message: 'El comentario fue enviado correctamente',
                    type: 'success'
                  });
                  this.send = true;
                }).catch(error => {
                this.$notify.error({
                  title: 'Error',
                  message: 'Es posible que el servicio no este disponible'
                });
              });

            } else {
              return false;
            }
          });
        }
      }

    }
</script>

<style lang="scss">
  .container-rate{
    padding: 15px 0px;
  }
  .center-layout{
    max-width: 1140px;
    padding: 0;
    margin: 0 auto;
    .space-div{
      padding: 25px 0px;
    }
  }
  .rating {
    position: absolute;
    unicode-bidi: bidi-override;
    direction: rtl;
  }
  .rating > span {
    display: inline-block;
    position: relative;
    width: 2em;
  }
  .rating > span:hover:before,
  .rating > span:hover ~ span:before {
    content: "\2605";
    position: absolute;
  }
</style>
