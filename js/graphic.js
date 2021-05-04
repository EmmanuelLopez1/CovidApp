export const grapich = class Grapich{
    constructor(){
        this.cases = []
        this.fechas = []
    }

    async getGrapich(url){
        const response = await fetch(url)
    }

    generarUrl(datos, values){
        let unidades = 5
        let intervalo = datos.length / unidades;
        let posiciones = 0
        intervalo = Math.floor(intervalo)
        for(let i = 0; i< unidades; i++){
            this.cases[i] = datos[posiciones].Cases
            this.generarFechas(datos[posiciones].Date.substr(0,10),i)
            posiciones += intervalo
        }
        let url = `https://quickchart.io/chart?c={type:'${values.grapich}',data:{labels:[${this.fechas}],datasets:[{label:'${datos[0].Status}',data:[${this.cases}]}]}}`;
        return url
    }

    generarFechas(dato,i){
        this.fechas[i] = `'${dato}'`
    }

    seleccionarImg(clase){
        return document.querySelector(clase)
    }

    insertarUrl(nodo, url){
        nodo.setAttribute('src', url)
    }

    mostrarImg(img){
        img.style.display = 'block'
    }
}