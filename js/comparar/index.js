//ARCHIVOS IMPORTADOS
import { form } from "../form.js";
import { covid } from "../apiCovid.js";
import { storage } from '../storage.js'
import { functions } from '../funcionesGenerales.js'
import { grapich } from "../graphic.js";

//INPUTS DEL FORMULARIO
let country = $('.pais')
let country2 = $('.pais2')
let status = $('.status')
let graphic = $('.graphic-type')
let date1 = $('.date1')
let date2 = $('.date2')
let alerta = $('.form__alerta')
let tBody = $('.t-body')

//INSTANCIANDO CLASES
const formu = new form(country, country2, status, graphic, date1, date2, alerta);
const datosCovid = new covid();
const stor = new storage()
const funct = new functions(formu)
const graph = new grapich()



//RECUERDA LOS ULTIMOS DATOS PEDIDOS POR EL USUARIO E INGRESA LOS VALORES EN EL FORMULARIO
funct.setForm(country, country2, status, graphic, date1, date2, 2)



//EJECUCION DEL PROGRAMA
let flat = true

$('.search').on('click', () => {
    //Se valida que el formulario no este vacio
    if (formu.validarFormulario(2)) {
        //se obtienen los inputs del usuario
        let values = funct.obtenerValores(2)
        findCountry(values.country, values)
    }


    async function findCountry(country, values) {
        //Se valida que el o los paises ingredados por el usuario existan en la base de datos de la api
        let pais = await formu.buscarPais(country[0])

        if (pais) {
            //Se valida que el segundo pais exista
            let pais2 = await formu.buscarPais(country[1])
            if (pais2) {
                data(values)
            }
        }
    }


    //MANEJO DE ERRORES DURANTE EL PROCESO ASINCRONO

    //SE PIDEN DATOS AL FORMULARIO
    async function data(values) {

        try {
            
            //Se muestran el icono de cargando en el fomulario
           funct.mostrarLoader()

            //se obtienen los valores del pais 1 y 2
            let country1Values = await datosCovid.pedirDatos(values.country[0], values.status, values.date1, values.date2)
            let country2Values = await datosCovid.pedirDatos(values.country[1], values.status, values.date1, values.date2)

            //Se oculta el icono de cargando
           funct.ocultarLoader()

            //Se guardsa en el local Storage los valores ingresados por ele usuario
            stor.setAllStorage(country, country2, status, graphic, date1, date2)
            //Se verifica si se deben de mostrar o eliminar los datos para no llenar la pantalla de datos obsoletos
            if (flat) {
                //Se insertan las filas de las tablas y sus respectivos valores en las tablas y se muestran
                flat = funct.generarTBody(country1Values.length, country1Values, tBody[0], '.table1', flat)
                flat = funct.generarTBody(country2Values.length, country2Values, tBody[1], '.table2', flat)
            }
            else {
                //Se eleminan los valores antiguos
                flat = funct.ocultarValores('.t-body1', flat)
                flat = funct.ocultarValores('.t-body2', flat)



                flat = funct.generarTBody(country1Values.length, country1Values, tBody[0], '.table1', flat)
                flat = funct.generarTBody(country2Values.length, country2Values, tBody[1], '.table2', flat)
            }


            //Se muestran las grafica con los datos solicitados
            graph.mostrarTituloPais('#title1', values.country[0])
            flat = funct.mostrarImagen(country1Values, values, 0)
            graph.mostrarTituloPais('#title2', values.country[1])
            flat = funct.mostrarImagen(country2Values, values, 1)
        } catch (error) {

            formu.mostrarAlerta("Ha ocurrido el siguiente error durante el proceso:  " + error)

        }


    }






})


