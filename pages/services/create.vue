<template>
  <div>
    <TableGeneral title="Mantenimientos" color="yellow">

      <el-row>
        <el-col :md="24" style="padding: 15px">
          <el-card>
            <el-row>
              <el-col :md="24">
                <h3>Registro</h3>
                <br>
                <hr>
              </el-col>
              <el-col :md="24">
                <div class="content-space">
                  <p>Información de registro</p>
                </div>
              </el-col>
              <el-form ref="formService" :rules="rules" :model="form" class="form-style-curds">
                <el-col :md="8">
                  <el-form-item label="Nombre del Cliente / Empresa" prop="name">
                    <el-select v-model="form.region" placeholder="Selecciona un cliente">
                      <el-option label="Empresa SRF" value="shanghai"></el-option>
                      <el-option label="Victor Estrada Mur" value="beijing"></el-option>
                      <el-option label="Blanca Carmona" value="vc"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="8">
                  <el-form-item label="Nombre del Técnico" prop="last_name">
                    <el-select v-model="form.region" placeholder="Selecciona un técnico">
                      <el-option label="Armando Trujillo" value="shanghai"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="8">
                  <el-form-item label="Equipo" prop="last_name">
                    <el-select v-model="form.region" placeholder="Selecciona un equipo">
                      <el-option label="Equipo 00999" value="shanghai"></el-option>
                      <el-option label="Equipo 77776" value="beijing"></el-option>
                      <el-option label="Equipo 555564" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="8">
                  <el-form-item label="Tipo de mantenimiento" prop="last_name">
                    <el-select v-model="form.region" placeholder="Selecciona un tipo de mantenimiento">
                      <el-option label="Preventivo" value="shanghai"></el-option>
                      <el-option label="Corrrectivo" value="beijing"></el-option>
                      <el-option label="Virtual" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="8">
                  <el-form-item label="Fecha de mantenimiento">
                    <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :md="8">
                  <el-form-item label="Fecha de mantenimiento (termino)">
                    <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :md="24">
                  <el-form-item label="Descripción de actividad">
                    <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="24" class="custom-buttons">
                  <el-button type="primary">Crear Mantenimiento</el-button>
                </el-col>
              </el-form>
            </el-row>
          </el-card>
        </el-col>
        <el-col :md="6"></el-col>
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
    text-align: right;
  }
</style>

<script>

  import TableGeneral from "../../components/tables/TableGeneral";

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
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(process.env.URL_RA_BACKEND+'users', this.form)
              .then(response => {
                this.$notify({
                  title: 'Success',
                  message: 'El cliente fue creado correctamente',
                  type: 'success'
                });
                this.$router.push('/clients');
              }).catch(function (error) {
              this.$notify.error({
                title: 'Error',
                message: 'El cliente no ha posido ser creado'
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
        form: {
          name: '',
          last_name: '',
          second_last_name: '',
          email: '',
          password: '',
          role: 'cliente'
        },
        rules: {
          name: [{required: true, message: 'Agrega nombre', trigger: 'blur'}],
          last_name: [{required: true, message: 'Agrega apellido', trigger: 'blur'}],
          email: [{required: true, message: 'Agrega un correo', trigger: 'blur'}],
          password: [{required: true, message: 'Agrega una contraseña', trigger: 'blur'}]
        }
      }
    }
  }
</script>