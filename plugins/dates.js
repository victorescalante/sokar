import moment from "moment";

export default (context, inject) => {

  const convertDate = function(date){
    return moment(date).locale('es-mx').format('LL');
  }

  const convertDateToHuman = function(date){
    return moment(date).locale('es-mx').startOf('minutes').fromNow();
  }

  const currentRole = function(array){
    console.log(this.$auth.$state.user.role, array.includes(this.$auth.$state.user.role));
    return array.includes(this.$auth.$state.user.role);
  }

  inject('currentRole', currentRole)
  context.$currentRole = currentRole

  inject('convertDate', convertDate)
  context.$convertDate = convertDate

  inject('convertDateToHuman', convertDateToHuman)
  context.$convertDateToHuman = convertDateToHuman

}
