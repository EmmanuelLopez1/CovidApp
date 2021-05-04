//ARCHIVOS IMPORTADOS
import { form } from "../form.js";
import { covid } from "../apiCovid.js";
import { lista } from "../lista.js";
import { storage } from '../storage.js'
import { grapich } from '../graphic.js'
import { deleteData } from '../delete.js'

//INPUTS DEL FORMULARIO
let country = $('.pais')
let country2 = $('.pais2')
let status = $('.status')
let graphic = $('.graphic')
let date1 = $('.date1')
let date2 = $('.date2')
let alerta = $('.form__alerta')


//INSTANCIANDO CLASES
const formu = new form(country, country2, status, graphic, date1, date2, alerta);
const datosCovid = new covid();
const list = new lista();
const stor = new storage()
const grap = new grapich()
const delData = new deleteData()


//EJECUCION DEL PROGRAMA
let flat = true

$('.search').on('click', () => {
    if (flat) {
        let values = mostrarDatos()
        console.log(values)
    }
    else {
        ocultarDatos()
    }
})

function mostrarDatos(params) {
    const values = formu.getValues()
    values.countrytwo()

}
