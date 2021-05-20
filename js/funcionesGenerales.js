
import { grapich } from './graphic.js'
import { lista } from "./lista.js"
import { storage } from './storage.js'


const grap = new grapich()
const list = new lista()
const stor = new storage()

export const functions = class Functions {
    constructor(form) {
        this.formu = form
    }


    ////OBTIENE LOS VALORES INGRESADOS POR EL USUARIO EN EL FOMRMULARIO
    obtenerValores(num) {
        if (num === 2) {
            let values = {
                country: this.formu.getCountries(),
                status: this.formu.getStatus(),
                graphic: this.formu.getGraphic(),
                date1: this.formu.getDates(1),
                date2: this.formu.getDates(2)
            }
            return values
        }
        else {
            let values = {
                country: this.formu.getCountries(1),
                status: this.formu.getStatus(),
                graphic: this.formu.getGraphic(),
                date1: this.formu.getDates(1),
                date2: this.formu.getDates(2)
            }
            return values
        }
    }

    //ELIMINA ELEMENTOS OBSOLETOS DE LA LISTA
    ocultarValores(tbody, flat) {
        let body = $(`${tbody} tr`)
        $('.table')[0].style.display = 'none'
        for (let i = 0; i < body.length; i++) {
            const element = body[i];
            element.remove()
        }
        flat = true
    }

    //MUESTRA LA IMAGEN DE LA GRAFICA
    mostrarImagen(datos, values, index) {
        let url = grap.generarUrl(datos, values, 6)
        let img = $('.graphic')[index]
        grap.insertarUrl(img, url)
        grap.mostrarImg(img)
    }

    //GENERA CADA UNO DE LOS ELEMENTOS DE LA LISTA, LOS INGRESA A LA TABLA Y LA MUESTRA
    generarTBody(length, values, padre, table, flat) {
        for (let i = 1; i < length; i++) {
            list.crearTBody(i, values[i], padre)
        }
        list.mostrarTabla(table)
        flat = false
    }

    //INGRESA EN EL FOMRULARIO LOS DATOS DEL LOCAL STORAGE
    setForm(country, country2, status, graphic, date1, date2, num) {
        let storage = stor.obtenerStorage()
        if (stor.getStorage('country2') !== null && num === 2) {
            country[0].value = storage[0]
            country2[0].value = storage[1]
            status[0].value = storage[2]
            graphic[0].value = storage[3]
            date1[0].value = storage[4]
            date2[0].value = storage[5]
        }
        else if (stor.getStorage('country') !== null) {
            country[0].value = storage[0]
            status[0].value = storage[2]
            graphic[0].value = storage[3]
            date1[0].value = storage[4]
            date2[0].value = storage[5]
        }
    }


    //SE MUESTRA EL LOADER EN EL FORMULARIO
    mostrarLoader(){
         let loading = document.querySelector('.loader').style
         loading.display = 'block'
    }

    //SE OCULTA EL LOADER EN EL FORMULARIO
    ocultarLoader(){
        let loading = document.querySelector('.loader').style
        loading.display = 'none'
    }
}