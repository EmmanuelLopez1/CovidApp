export const storage = class Storage {
    constructor() {

    }

    //INSERTA UN ELEMENTO EN EL SESSION STORAGE
    setStorage(key, value) {
        localStorage.setItem(key, value)
    }

    //SOLICITA UN ELEMENTO DEL SESSION STORAGE
    getStorage(key) {
        let stor = localStorage.getItem(key)
        return stor
    }

    //OBTINE UN ARRAY DE ELEMENTOS DEL LOCAL STORAGE
    obtenerStorage() {
        return [this.getStorage('country'), this.getStorage('country2'), this.getStorage('status'), this.getStorage('graphic'), this.getStorage('date1'), this.getStorage('date2')]
    }

    //DEFINE TODAS LAS PROPIEDADES RELEVANTES DENTRO DEL LOCALSTORAGE
    setAllStorage(country, country2, status, graphic, date1, date2) {
        this.setStorage('country', country[0].value)
        if(country2 != null){
            this.setStorage('country2', country2[0].value)
        }
        this.setStorage('status', status[0].value)
        this.setStorage('graphic', graphic[0].value)
        this.setStorage('date1', date1[0].value)
        this.setStorage('date2', date2[0].value)
    }
}