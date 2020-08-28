<template>
  <div class="table-general">
    <TableGeneral title="Mantenimiento" color="purple">
      <el-row>
        <el-col :md="24">
          <el-card>
            <el-row>
              <el-col :md="24" style="padding-left: 10px">
                <h3>Visita de mantenimiento</h3>
              </el-col>
              <el-col :md="24" style="padding-top: 15px">
                <el-form ref="formService" :rules="rules" :model="form" class="form-style-curds">
                  <el-row>
                    <el-col :md="8">
                      <el-form-item label="Nombre del Técnico" prop="technical_id">
                        <el-select v-model="form.technical_id" filterable placeholder="Selecciona un técnico" :disabled="isTechUser">
                          <el-option
                            v-for="tech in techs"
                            :key="tech.id"
                            :label="tech.name"
                            :value="tech.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8">
                      <el-form-item label="Nombre del Cliente / Empresa" prop="client_id">
                        <el-select filterable v-model="form.client_id" @change="getProductsOfClients" placeholder="Selecciona un cliente">
                          <el-option
                            v-for="client in clients"
                            :key="client.id"
                            :label="client.company_name"
                            :value="client.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8">
                      <el-form-item label="Fecha tentativa de atención" prop="tentative_date">
                        <el-date-picker
                          style="width: 100%"
                          v-model="form.tentative_date"
                          type="datetime"
                          placeholder="Selecciona una fecha y hora">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8">
                      <el-form-item label="Tipo de mantenimiento">
                        <el-select v-model="form.activity" placeholder="Selecciona el tipo de mantenimiento">
                          <el-option label="Mantenimiento correctivo" value="corrective"></el-option>
                          <el-option label="Mantenimiento preventivo" value="preventive"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8">
                      <el-form-item label="Tipo de servicio">
                        <el-select v-model="form.type" @change="form.kms = 0" placeholder="Selecciona el tipo de servicio">
                          <el-option label="Remoto" value="remote"></el-option>
                          <el-option label="Presencial" value="face-to-face"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8" v-if="form.type === 'face-to-face'">
                      <el-form-item label="Distancia en kilometros">
                        <el-input-number v-model="form.kms" :min="0" :max="1000"></el-input-number>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col v-if="products.length >= 1" :md="24">
                      <div style="padding: 15px">
                        <p><strong>Selecciona los equipos a los cuales deseas realizar mantenimiento</strong></p>
                        <el-row class="container-card" :gutter="15">
                            <el-col :md="8" v-for="product_user in products">
                              <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                  <span><b>{{ product_user.product.name }}</b></span>
                                </div>
                                <p style="color: #7F828B; font-size: 14px">Número de serie</p>
                                <small>{{ product_user.serial_number }}</small>
                                <br><br>
                                <p style="color: #7F828B; font-size: 14px">Última fecha de mantenimiento</p>
                                <b>{{ $convertDateToHuman(product_user.last_service) }}</b>
                                <br><br>
                                <p>Fecha de mantenimiento proxima</p>
                                <b style="color: #5d3ce7">{{ $convertDateToHuman(product_user.next_service) }}</b>
                                <br>
                                <el-checkbox-group v-model="form.product_user_ids" style="text-align: right; padding: 15px">
                                  <el-checkbox :label="product_user.id">Seleccionar</el-checkbox>
                                </el-checkbox-group>
                              </el-card>
                            </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :md="24" class="custom-buttons">
                      <el-button type="primary" @click="submitForm('formService')" :disabled="form.product_user_ids.length <= 0">Crear ordenes de servicio</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>

    </TableGeneral>
  </div>
</template>

<style lang="scss">
  .el-select{
    width: 100%;
  }

  .custom-buttons{
    padding: 15px;
  }

  .table-general{
    .container-card{
      padding: 15px 0;
      .box-card{
        margin-top: 15px;
      }
    }
  }
</style>

<script>

  import TableGeneral from "../../components/tables/TableGeneral";
  import moment from "moment";

  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    transition: {
      name: 'default',
      mode: 'out-in'
    },
    components: {
      TableGeneral: TableGeneral
    },
    head () {
      return {
        title: 'Creación de servicio',
      }
    },
    mounted() {
      this.init();
      if (this.$auth.user.role === 'tecnico'){
        this.form.technical_id = this.$auth.user.id;
        this.isTechUser = true;
      }
    },
    methods: {
      async init() {
        let clients = await this.$axios.$get(process.env.URL_RA_BACKEND+'clients?limit=200');
        let techs = await this.$axios.$get(process.env.URL_RA_BACKEND+'users?limit=200&role=tecnico');
        this.clients = clients.data.rows;
        this.techs = techs.data.rows;
      },
      async getProductsOfClients(value) {
        this.form.product_user_ids = [];
        let products = await this.$axios.$get(process.env.URL_RA_BACKEND + 'clients/'+value+'/product-relation?limit=200');
        this.products = products.data.rows;
        if (this.products.length <= 0){
          this.$confirm('<p>Este cliente aún no tiene equipos asignados, <b>¿Quieres asignar un equipo al cliente?</b></p>', 'Imposible ofrecer mantenimiento', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: 'SI',
            cancelButtonText: 'NO',
            type: 'error'
          }).then(() => {
            this.$router.push('/clients/'+value);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Ha sido cancelada la operación'
            });
          });
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.tentative_date = moment(this.form.tentative_date).locale('es-mx').format('Y-M-D H:mm');
            this.$axios.post(process.env.URL_RA_BACKEND+'services', this.form)
              .then(response => {
                this.$notify({
                  title: 'Correcto',
                  message: 'El servicio fue creado correctamente',
                  type: 'success'
                });
                this.$router.push('/services/'+response.data.data.id);
              }).catch(error => {
              this.$notify.error({
                title: 'Error',
                message: 'El servicio no ha posido ser creado'
              });
            });

          } else {
            return false;
          }
        });
      }
    },
    data(){
      return {
        isTechUser: false,
        clients: [],
        techs: [],
        products: [],
        clientHaveProducts: false,
        form: {
          product_user_ids: [],
          client_id: "",
          technical_id: "",
          tentative_date: "",
          type: "face-to-face",
          kms: 0,
          activity: "corrective"
        },
        rules: {
          tentative_date:[
            {required: true, message: "La fecha tentativa es obligatorio",  trigger:'blur'}
          ],
          technical_id: [
            {required: true, message: "Asignar un tecnico es obligatorio",  trigger:'blur'}
          ]
        }
      }
    },
  }
</script>
