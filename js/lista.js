export const lista = class Lista {
    constructor() {

    }

    //CREA UNA LISTA DE ELEMENTOS, LES ASIGNA VALOR Y CLASES
    crearElementoFila(data) {
        let elements = []
        for (let i in data) {
            let nodo = document.createElement('td')
            let baby = i
            if (baby == 2) {
                let fecha = data[i].substr(0, 10)
                nodo.textContent = fecha
                elements[i] = nodo
            }
            else {
                nodo.textContent = data[i]
                elements[i] = nodo
            }

        }
        return elements
    }

    //FILA DE LA LISTA
    crearFila(clase) {
        let tr = $(`<tr></tr>`)[0]
        tr.classList.add(clase)
        return tr
    }

    //NUMERAL DE LA LISTA
    noFila(indice) {
        let th = document.createElement("th")
        th.textContent = indice
        return th
    }

    crearTBody(indice, data, padre) {
        //OBTENIENDO LOS ELEMENTOS DEL TBODY DE LA LISTA
        let tBody = padre
        let fila = this.crearFila('tr')
        let noFila = this.noFila(indice)
        let elements = this.crearElementoFila([data.Country, data.Status, data.Date, data.Cases])

        //CREANDO UNA FILA DE ELEMENTOS Y AGREGANDOLA A LA FILA
        tBody.appendChild(fila)
        fila.appendChild(noFila)
        for (let i = 0; i < 4; i++) {
            fila.appendChild(elements[i])
        }
    }

    //MUESTRA LA TABLA CON LOS DATOS YA INGRESADOS EN ELLA
    mostrarTabla(clase) {
        let lista = $(`${clase}`)
        lista.fadeIn(1000, () => {
            lista[0].style.display = 'block'
        })

    }
}