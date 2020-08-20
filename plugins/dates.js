import moment from "moment";

export default (context, inject) => {

  const convertDate = function(date){
    return moment(date).locale('es-mx').format('LL');
  }

  const getHour = function(date){
    return moment(date).locale('es-mx').format('LT a');
  }

  const convertDateToHuman = function(date){
    return moment(date).locale('es-mx').startOf('minutes').fromNow();
  }

  const getActivity = function (activity) {
    let activities = [];
    activities['presentation-project'] = "Presentación de proyecto";
    activities['presentation-system'] = "Presentación de sistema";
    activities['develop-project'] = "Desarrollo de proyecto";
    activities['installation-of-system'] = "Instalación de sistema";
    activities['calibration-of-equipment'] = "Calibración de equipo";
    activities['preventive'] = "Mantenimiento Preventivo";
    activities['corrective'] = "Mantenimiento correctivo";
    activities['start-system-ccs'] = "Presentación de proyecto";
    activities['delivery-system'] = "Presentación de proyecto";
    activities['other'] = "Otra";
    
    return activities[activity];
  }

  const getTypeOfActivity = function (activity) {
    let activities = [];
    activities['face-to-face'] = "Presencial";
    activities['remote'] = "Remoto";

    return activities[activity];
  }

  const currentRole = function(array){
    return array.includes(this.$auth.$state.user.role);
  }

  const getWidthModal  = function (width) {
    console.log(width);
    if (width <= 980){
      return "80%";
    }
    return "40%";
  }

  inject('getWidthModal', getWidthModal)
  context.$getWidthModal = getWidthModal

  inject('currentRole', currentRole)
  context.$currentRole = currentRole

  inject('convertDate', convertDate)
  context.$convertDate = convertDate

  inject('getActivity', getActivity)
  context.$getActivity = getActivity

  inject('getTypeOfActivity', getTypeOfActivity)
  context.$getTypeOfActivity = getTypeOfActivity

  inject('getHour', getHour)
  context.$getHour = getHour

  inject('convertDateToHuman', convertDateToHuman)
  context.$convertDateToHuman = convertDateToHuman

}
