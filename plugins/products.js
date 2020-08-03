export default (context, inject) => {

  const statusProduct = function(status){
    if (status === true){
      return "Activo";
    }
    return "Inactivo";
  }

  const typeProduct = function(type){
    if (type === 'own'){
      return "Propio";
    }
    return "Comodato";
  }

  inject('statusProduct', statusProduct)
  context.$statusProduct = statusProduct
  inject('typeProduct', typeProduct)
  context.$typeProduct = typeProduct


}
