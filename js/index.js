// MODULOS IMPORTADOS
import { form } from "./form.js";
import { covid } from "./apiCovid.js";
import { storage } from './storage.js'
import { functions } from './funcionesGenerales.js'



//INPUTS DEL FORMULARIO
let country = $('.pais')
let status = $('.status')
let graphic = $('.grapich-type')
let date1 = $('.date1')
let date2 = $('.date2')
let alerta = $('.form__alerta')


//LISTA DE ELEMENTOS
let padre = $('.t-body')[0]


// INSTANCIACION DE MODULOS
const formu = new form(country, null, status, graphic, date1, date2, alerta);
const datosCovid = new covid();
const stor = new storage()
const funct = new functions(formu)



//RECUERDA LOS ULTIMOS DATOS PEDIDOS POR EL USUARIO E INGRESA LOS VALORES EN EL FORMULARIO
funct.setForm(country, null, status, graphic, date1, date2)


//ECUCION DEL PROGRAMA
let flat = true


$('.search').on('click', () => {
  //Se valida que el formulario no este vacio
  if (formu.validarFormulario()) {
    //se obtienen los inputs del usuario
    let values = funct.obtenerValores()
    findCountry(values.country)

    //MANEJO DE ERRORES


    
    async function findCountry(country) {
      try {
        //Se muestra el loader del formulario
        funct.mostrarLoader()

        //Se valida que el o los paises ingredados por el usuario existan en la base de datos de la api
        let pais = await formu.buscarPais(country)
        if (pais) {
          data()
        }
      } catch (error) {
        formu.mostrarAlerta("Ha ocurrido el siguiente error durante el proceso:  " + error)

      }


    }


    async function data() {


      //MANEJO DE ERRORES DURANTE EL PROCESO ASINCRONO
      try {
        //SE PIDEN DATOS AL FORMULARIO



        //se obtienen los valores del pais solicitados
        let datos = await datosCovid.pedirDatos(values.country, values.status, values.date1, values.date2)

        //Se oculta el loader del formulario
        funct.ocultarLoader()

        //Se guardsa en el local Storage los valores ingresados por ele usuario
        stor.setAllStorage(country, null, status, graphic, date1, date2)

        //Se verifica si se deben de mostrar o eliminar los datos para no llenar la pantalla de datos obsoletos
        if (flat) {
          //Se insertan las filas de las tablas y sus respectivos valores en las tablas y se muestran
          flat = funct.generarTBody(datos.length, datos, padre, '.table', flat)
        } else {
          //Se eleminan los valores antiguos
          flat = funct.ocultarValores('.t-body', flat)



          flat = funct.generarTBody(datos.length, datos, padre, '.table', flat)
        }

        //Se muestran la grafica con los datos solicitados
        flat = funct.mostrarImagen(datos, values, 0)

      } catch (error) {

        formu.mostrarAlerta("Ha ocurrido el siguiente error durante el proceso:  " + error)

      }


    }
  }

})
