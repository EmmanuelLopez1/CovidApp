import { storage } from './storage.js'
const stor = new storage()

export const form = class Formulario{
    constructor(country, country2, status, graphic, date1, date2, alerta){
        this.country = country
        this.country2 = country2
        this.status = status
        this.graphic = graphic
        this.date1 = date1
        this.date2 = date2
        this.alerta = alerta
    }

    //OBTIENE LOS VALORES INGRESADOS POR EL USUARIO EN EL FORMULARIO
    getValues(){
        const values = {
            country: this.country.value,
            country2: this.country2,
            status: this.status.value,
            grapich: this.graphic.value,
            date1: this.date1.value,
            date2: this.date2.value
        }
        return values;
    }

    //VALIDA QUE EL FOMULARIO NO CONTENGA ESPACIOS VACIOS
    validarFormulario(values){
        if(values.country == "" || values.country2 == '' || values.date1 == "" || values.date2 == ""){
            this.mostrarAlerta("Ingresa todos los campos")
            return false
        }
        else{
            let condition1 = this.validarCoherencia(values)
            if(condition1){
                this.ocultarAlerta()
                return true
            }
        }
    }

    //VALIDA QUE LA PRIMERA FECHA INGRESADA SEA MENOR A LA SEGUNDA
    validarCoherencia(values){
        const date1 = values.date1
        const date2 = values.date2

        if(date1 > date2){
            this.mostrarAlerta("Ingresa una fecha anterior primero")
            return false
        }
        else{
            return true
        }
    }

    //VALIDA SI SE PUEDEN O NO ELIMINAR CIERTOS DATOS
    validarDelete(cant){
        if(cant === 0){
            this.mostrarAlerta('no hay valores para eliminar')
            return false
        }
        else{
            this.ocultarAlerta()
            return true
        }
    }

    //MUESTRA UNA ALERTA EN EL FORMULARIO CON EL MENSAJE ESPECIFICADO
    mostrarAlerta(mensaje){
        this.alerta.style.display = 'block'
        this.alerta.innerHTML = mensaje
    }

    //OCULTA LA ALERTA DEL FORMULARIO
    ocultarAlerta(){
        this.alerta.style.display = 'none'
    }

    definirValores(values){
        this.country.value = values[0]
        this.country2.value = values[1]
        this.status.value = values[2]
        this.graphic.value = values[3]
        this.date1.value = values[4]
        this.date2.value = values[5]
    }
}

