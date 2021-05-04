// MODULOS IMPORTADOS
import { form } from "./form.js";
import { covid } from "./apiCovid.js";
import { lista } from "./lista.js";
import { storage } from './storage.js'
import { grapich } from './graphic.js'
import { deleteData } from './delete.js'

//INPUTS DEL FORMULARIO
let country = document.querySelector('.pais')
let status = document.querySelector('.status')
let graphic = document.querySelector('.graphic')
let date1 = document.querySelector('.date1')
let date2 = document.querySelector('.date2')
let alerta = document.querySelector('.form__alerta')

// INSTANCIACION DE MODULOS
const formu = new form(country,null, status, graphic, date1, date2, alerta);
const datosCovid = new covid();
const list = new lista();
const stor = new storage()
const grap = new grapich()
const delData = new deleteData()


//BANDERA PARA SABER SI SE DEBEN OCULTAR O MOSTRAR LOS DATOS
let noPeticiones = true

//BOTONES DEL FORMULARIO
const boton = document.querySelector(".search")
const buttonDelete = document.querySelector('.clear')


//EJECUCION PRINCIPAL DEL PROGRAMA


let storageData = revisarStorage()
if (storageData !== null) {
  let values = stor.obtenerStorage(5)
  formu.definirValores(values)
}



boton.addEventListener("click", () => {
  if (noPeticiones) {
    let values = mostrarDatos()
    stor.definirStorage(values)
  } else {
    let cant = document.querySelectorAll('.t-body .tr').length
    let content = document.querySelector('.t-body')
    let validar = formu.validarDelete(cant)
    ocultarDatos(cant, content, '.tr', validar)

    mostrarDatos()
  }
});

async function consultarDatos(values) {
  const datos = await datosCovid.pedirDatos(values);
  for (let i in datos) {
    list.crearElemento(parseInt(i), datos);
  }
  list.mostrarElemento('.table')

  let url = grap.generarUrl(datos, values)
  let img = grap.seleccionarImg('.graphic')
  grap.insertarUrl(img, url)
  grap.mostrarImg(img)
}

buttonDelete.addEventListener('click', () => {
  let length = document.querySelectorAll('.t-body .tr').length
  let content = document.querySelector('.t-body')
  ocultarDatos(length, content, '.tr', formu.validarDelete(length))
})

//MUESTRA LA LISTA DE DATOS Y LA GRAFICA
function mostrarDatos() {
  const values = formu.getValues()
  let validar = formu.validarFormulario(values)
  if (validar) {
    consultarDatos(values)
  }
  noPeticiones = false;
  return values
}


//OCULTA LA LISTA DE DATOS Y LA GRAFICA
function ocultarDatos(length, contenedor, child, validar) {
  if (validar) {
    delData.deleteCases(length, contenedor, child)
    delData.deleteImg('.graphic')
  }
  noPeticiones = true
}


function revisarStorage() {
  let country = stor.getStorage('country')
  if (country !== null) {
    return true
  }
}

