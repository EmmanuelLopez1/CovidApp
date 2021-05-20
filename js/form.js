import { storage } from './storage.js'
import { covid } from "./apiCovid.js"


const stor = new storage()
const datosCovid = new covid();

export const form = class Formulario {
    constructor(country, country2, status, graphic, date1, date2, alerta) {
        this.country = country[0]
        if (country2 != null) {
            this.country2 = country2[0]
        }
        this.status = status[0]
        this.graphic = graphic[0]
        this.date1 = date1[0]
        this.date2 = date2[0]
        this.alerta = alerta[0]
    }

    //DEVUELVE LOS VALORES DE LOS INPUTS DEL FORMULARIO
    getCountries(noContries) {
        if (noContries === 1) {
            let country = this.country.value[0].toUpperCase() + this.country.value.substr(1, this.country.length)
            return country
        }
        else {
            let country = this.country.value[0].toUpperCase() + this.country.value.substr(1, this.country.length)
            let country2 = this.country2.value[0].toUpperCase() + this.country2.value.substr(1, this.country.length)
            return [country, country2]
        }
    }

    //RETORNA EL STATUS QUE INGRESO EL USUARIO
    getStatus() {
        return this.status.value
    }

    //TIPO DE GRAFICA A MOSTRAR, PASTEL, LINEA, ETC.
    getGraphic() {
        return this.graphic.value
    }

    //RETORNA LAS FECHAS QUE INGRESO EL USUARIO
    getDates(num) {
        if (num === 1) {
            return this.date1.value
        }
        else {
            return this.date2.value
        }
    }




    //ENVIA POR UN CAMINO U OTRO LA VALIDACION DEPENDIENDO SI EXISTE O NO EL DATO COUNTRY2
    validarFormulario(num) {
        //num es para saber si se estan pidiendo datos de 1 o 2 paises
        if(num === 2){
            if(this.validarCountry(num) && this.validarCoherencia()){
                return true
            }
            else{
                return false
            }
        }else{
            if(this.validarCountry() && this.validarCoherencia()){
                return true
            }
            else return false
        }

    }

    //VALIDA QUE LA SEGUNDA FECHA INGRESADA EN EL FORMULARIO NO SEA INFERIOR A LA PRIMER FECHA INGRESADA
    validarCoherencia() {
        if (this.date2.value <= this.date1.value) {
            this.mostrarAlerta('Primero debes ingresar una fecha anterior')
            return false
        } else {
            this.ocultarAlerta()
            return true
        }
    }

    //VALIDA QUE NO EXISTAN ESPACIOS EN BLANCO EN EL FORMULARIO
    validarCountry(num) {
        //num es para saber si se esta trabajando con 1 o 2 paises
        if (num === 2) {
            if (this.country.value === '' || this.country2.value === '' || this.date1.value === '' || this.date2.value === '') {
                this.mostrarAlerta('no puedes dejar los campos vacios')
                return false
            } else {
                return true
            }
        }
        else {
            if (this.country.value === '' || this.date1.value === '' || this.date2.value === '') {
                this.mostrarAlerta('no puedes dejar los campos vacios')
                return false
            }
            else {
                return true
            }
        }
    }

    //MUESTRA UN MENSAJE DE ERROR
    mostrarAlerta(mensaje) {
        this.alerta.textContent = mensaje
        this.alerta.style.display = 'block'
    }

    //OCULTA UN MENSAJE DE ERROR
    ocultarAlerta() {
        this.alerta.style.display = 'none'
    }

    //VERIFICA SI UN PAIS INGRESADO POR EL USUARIO EXISTE EN LA BASE DE DATOS DE LA API 
    async buscarPais(country){
        let datos = await datosCovid.allCountries()
        let valor
        
        for(let i = 0; i < datos.length; i++){
            if(country == datos[i].Country){
                valor = true
                if(valor){
                    this.ocultarAlerta()
                    return true
                }
            }
            else if(i == datos.length - 1){
                this.mostrarAlerta('no tenemos datos de ese pais')
                valor = false
            }  
           
        }
        return false
        
    }
}

