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

    definirStorage(values) {
        this.setStorage('country', values.country)
        this.setStorage('country2', values.country2)
        this.setStorage('status', values.status)
        this.setStorage('graphic', values.grapich)
        this.setStorage('date1', values.date1)
        this.setStorage('date2', values.date2)
    }

    obtenerStorage(){
        return[this.getStorage('country'),  this.getStorage('status'), this.getStorage('graphic'), this.getStorage('date1'),this.getStorage('date2')] 
    }
}