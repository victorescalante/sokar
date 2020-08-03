import moment from "moment";

export default (context, inject) => {

  const convertDate = function(date){
    return moment(date).locale('es-mx').format('LL');
  }

  const convertDateToHuman = function(date){
    return moment(date).locale('es-mx').startOf('minutes').fromNow();
  }

  inject('convertDate', convertDate)
  context.$convertDate = convertDate

  inject('convertDateToHuman', convertDateToHuman)
  context.$convertDateToHuman = convertDateToHuman

}
