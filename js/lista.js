export const lista = class Lista{
    constructor(){
        
    }

    //CREA UNA LISTA DE ELEMENTOS, LES ASIGNA VALOR, CLASES Y LOS MUESTRA EN EL DOM
    crearElemento(indice, datos){
        //ELEMENTO PADRE
        let tBody = document.querySelector('.t-body')
        tBody.classList.add('t-body')

        //FILA DE LA LISTA
        let tr = document.createElement("tr")
        tr.classList.add('tr')

        //NUMERAL DE LA LISTA
        let th = document.createElement("th")
        tr.appendChild(th)   
        th.textContent = indice


        for(let i = 1; i <= 4; i++){
        //ASIGNACION DE VALOR A UN NODO DE LA UNA FILA DE LA LISTA POR ORDEN DE IZQUIERDA A DERECHA E INSERCCION EN EL DOM.
        let td = document.createElement("td")
            switch (i) {
                case 1:
                    td.textContent = datos[indice].Country
                    break;
                case 2:
                    td.textContent = datos[indice].Status
                    break;
                case 3:
                    const date = datos[indice].Date
                    td.textContent = date.substr(0, 10)
                    break
                case 4:
                    td.textContent = datos[indice].Cases
                default:
                    break;
            }
            //INSERCCION DE LA FILA A LA LISTA
            tr.appendChild(td)
        }

        //INSERCCION DE LA LISTA A LA TABLA
        tBody.appendChild(tr)
    }

    mostrarElemento(clase){
        let lista= document.querySelector(clase)
        lista.style.display = 'block'
    }


}