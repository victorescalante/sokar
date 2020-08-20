<template>
  <div>

    <el-row :gutter="15">
      <el-col :xs="12">
        <h2 class="primary-color">Plan de trabajo</h2>
        <p>{{$convertDate(now)}}</p>
      </el-col>
      <el-col :xs="12">
        <div style="text-align: right">
          <el-date-picker
            format="d/M/yyyy"
            type="date"
            v-model="now"
            placeholder="Selecciona una día">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :xs="24" :md="12">
        <h3 style="padding-top: 25px">Hoy <span style="font-size: 12px">({{ $convertDate(now) }})</span></h3>
        <el-card class="el-card-custom">
          <div slot="header" class="clearfix">
            <span>Plan de trabajo del día</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="addTodo">Agregar actividad</el-button>
          </div>
          <Tasks :tasks="todo_day" v-if="todo_day.length > 0"></Tasks>
          <div style="text-align: center" v-else>
            <p>No hay actividades</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="12">
        <el-divider class="only-tablet"></el-divider>
        <h3 style="padding-top: 25px">Semanal <span style="font-size: 12px">(del {{ startWeek }} al {{ endWeek }})</span></h3>
        <el-card class="el-card-custom">
          <div slot="header" class="clearfix">
            <span>Plan de trabajo de la semana</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="addTodo">Agregar actividad</el-button>
          </div>
          <div style="text-align: center" v-if="isEmpty(activities_by_week)">
            <p>No hay actividades</p>
          </div>
          <div class="list-by-date" v-for="(dates, key) in activities_by_week" v-else>
            <h4 class="date-todo">{{ key }}</h4>
            <Tasks :tasks="dates" ></Tasks>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      title="Programar actividad"
      :visible.sync="viewFormTodo"
      :width="$getWidthModal(windowWidth)">
      <p>A continuación ingresa los detalles de la actividad a realizar.</p>
      <el-form class="add-todo" ref="formTodo" :model="form">
        <el-row :gutter="15">
          <el-col :md="12">
            <el-form-item label="Tipo de actividad">
              <el-select v-model="form.type" @change="form.kms = 0" placeholder="Selecciona el tipo de actividad">
                <el-option label="Remoto" value="remote"></el-option>
                <el-option label="Presencial" value="face-to-face"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="Actividad">
              <el-select v-model="form.activity" placeholder="Selecciona el tipo de actividad">
                <el-option label="Presentación de proyecto" value="presentation-project"></el-option>
                <el-option label="Presentación de sistema" value="presentation-system"></el-option>
                <el-option label="Desarrollo de proyecto" value="develop-project"></el-option>
                <el-option label="Instalación de sistema" value="installation-of-system"></el-option>
                <el-option label="Calibración de equipo" value="calibration-of-equipment"></el-option>
                <el-option label="Presentación de proyecto" value="start-system-ccs"></el-option>
                <el-option label="Presentación de proyecto" value="delivery-system"></el-option>
                <el-option label="Otra" value="other"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="Fecha y hora de la actividad">
              <el-date-picker
                v-model="form.date"
                type="datetime"
                placeholder="Selecciona fecha y hora">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="Nombre del Cliente / Empresa" prop="client_id">
              <el-select filterable v-model="form.client_id" placeholder="Selecciona un cliente">
                <el-option label="No aplica" value="no" selected>No aplica</el-option>
                <el-option
                  v-for="client in clients"
                  :key="client.id"
                  :label="client.name"
                  :value="client.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="24">
            <el-form-item label="Descripción de la actividad">
              <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="10" v-if="form.type === 'face-to-face'">
            <el-form-item label="Distancia en kilometros">
              <el-input-number v-model="form.kms" :min="0" :max="1000"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewFormTodo = false">Cancelar</el-button>
        <el-button type="primary" @click="submitForm('formTodo')">Agregar actividad</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import moment from "moment";
  import _ from "lodash";
  import Tasks from "../../components/Tasks";

  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    components: {
      Tasks: Tasks
    },
    head () {
      return {
        title: 'Plan de trabajo',
      }
    },
    data(){
      return{
        windowWidth: 0,
        value: '',
        now: moment.now(),
        todo_day: [],
        todo_week: [],
        viewFormTodo: false,
        clients: [],
        form: {
          type: 'remote',
          activity: "develop-project",
          kms: 0,
          client_id: 2,
          status: "open",
          date: moment(this.now).locale('es-mx').format('Y-M-D H:mm')
        }
      }
    },
    methods: {
      isEmpty(obj) {
        for(let key in obj) {
          if(obj.hasOwnProperty(key))
            return false;
        }
        return true;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.form.client_id === 'no'){
              delete this.form.client_id;
            }
            this.$axios.post(process.env.URL_RA_BACKEND+'todo', this.form)
              .then(response => {
                this.$notify({
                  title: 'Correcto',
                  message: 'La tarea fue creado correctamente',
                  type: 'success'
                });
                this.viewFormTodo = false
                this.getTodo();
              }).catch(function (error) {
              this.$notify.error({
                title: 'Error',
                message: 'La tarea no pudo ser creada'
              });
            });

          } else {
            return false;
          }
        });
      },
      addTodo(){
        this.viewFormTodo = true;
      },
      async getTodo() {
        let now = moment(this.now).format('YYYY-MM-DD');
        let start_week = moment(this.now).locale('es-mx').startOf('week').format('YYYY-MM-DD');
        let end_week = moment(this.now).locale('es-mx').endOf('week').format('YYYY-MM-DD');
        let data =  await this.$axios.$get(process.env.URL_RA_BACKEND + 'todo?date=' + now + '&start_week=' + start_week + '&end_week=' + end_week);
        this.todo_day = data.data.day;
        this.todo_week = data.data.week;
      }
    },
    computed: {
      startWeek: function () {
        return moment(this.now).locale('es-mx').startOf('week').format('LL')
      },
      endWeek: function () {
        return moment(this.now).locale('es-mx').endOf('week').format('LL')
      },
      activities_by_week: function () {
        return _.groupBy(this.todo_week, function (todo) {
          return moment(todo.date_activity).locale('es-mx').startOf('day').format('LL');
        });
      }
    },
    async fetch(){
      await this.getTodo();
      let clients = await this.$axios.$get(process.env.URL_RA_BACKEND+'clients?limit=200');
      this.clients = clients.data.rows;
    },
    mounted() {
      this.windowWidth = window.innerWidth;
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    }
  }
</script>

<style lang="scss">
  .add-todo{
    padding-top: 15px;
  }

  .el-card-custom{
    margin: 25px 0;
    .el-card__body{
      height: 550px;
      overflow-y: scroll;
    }
  }

  .date-todo{
    padding: 15px 0;
  }
  .my-task{
    border-radius: 15px;
    border: #5d3ce7 solid 1px;
    margin-bottom: 15px;

    .header{
      font-weight: bold;
    }

    .date-info, .body-info{
      padding: 15px;
      height: 90px;
    }

    .date-info{
      border-radius: 15px 0 0 15px;
      background: #31207b;
      color: white;
      .hour{
        text-align: center;
        font-weight: bold;
      }
      .type{
        text-transform: capitalize;
        text-align: center;
        font-size: 12px;
        padding-top: 15px;
      }
    }

    .body-info{
      position: relative;
      .client{
        text-align: right;
        font-size: 10px;
        color: #31207b;
        .name{
          font-size: 13px;
          font-weight: bold;
        }
      }
      .activity{
        padding-top: 15px;
        font-size: 15px;
        font-weight: bold;
        text-align: center;
      }
      .view-info{
        position: absolute;
        left: 0;
        top: 0;
      }
    }

  }
</style>
