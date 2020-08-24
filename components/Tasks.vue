<template>
    <div>
      <el-row :gutter="20" class="my-task" v-for="activity in tasks">
        <el-col :xs="8" :sm="8" :md="8" class="date-info">
          <p class="hour">{{ $getHour(activity.date_activity) }}</p>
          <p class="type">{{ $getTypeOfActivity(activity.type_activity) }}</p>
        </el-col>
        <el-col :xs="16" :sm="16" :md="16" class="body-info">
          <div>
            <p class="client" v-if="activity.client_id">Cliente: <span class="name">{{ activity.client_name }}</span></p>
            <p class="client" v-else>Actividad Personal</p>
            <p class="activity">{{ $getActivity(activity.activity) }}</p>
            <el-button
              class="view-info"
              type="info"
              size="small"
              icon="el-icon-view"
              @click="showActivity(activity.type, activity.id, activity)"
            >Detalle</el-button>
          </div>
        </el-col>
      </el-row>

    </div>
</template>

<script>
    export default {
      name: "Tasks",
      props: ['tasks'],
      data(){
        return {
          show_detail: false
        }
      },
      methods: {
        showActivity(type_activity, id, activity){
          if (type_activity === 'service'){
            this.$router.push('/services/' + id);
          }else{
            this.$emit('detailActivity', activity);
          }
        }
      }
    }
</script>

<style scoped>

</style>
