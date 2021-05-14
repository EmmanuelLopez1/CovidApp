export const grapich = class Grapich{
    constructor(){
        this.cases = []
        this.fechas = []
    }


    //GENERA UN GRAFICO CON LOS DATOS ESPECIFICADOS
    generarUrl(datos, values, cantBarras){
        let unidades = cantBarras //cantidad de barras o divisiones en la grafica
        let intervalo = datos.length / unidades; //cada cuantos datos se mostrara un dato
        let posiciones = 0 //posicion en la que se mostrara una barra en la grafica
        intervalo = Math.floor(intervalo)

        for(let i = 0; i< unidades; i++){

            this.cases[i] = datos[posiciones].Cases //todas los datos que se convertiran en barras en la grafica
            this.generarFechas(datos[posiciones].Date.substr(0,10),i) //fechas de los datos mostrados en la grafica
            posiciones += intervalo 
        }
        let url = `https://quickchart.io/chart?c={type:'${values.graphic}',data:{labels:[${this.fechas}],datasets:[{label:'${datos[0].Status}',data:[${this.cases}]}]}}`;
        return url
    }


    generarFechas(fecha,i){
        this.fechas[i] = `'${fecha}'`
    }

    insertarUrl(nodo, url){
        nodo.setAttribute('src', url)
    }

    mostrarImg(img){
        img.style.display = 'block'
    }

    //MUESTRA EL RESPECTIVO PAIS DE LA GRAFICA
    mostrarTituloPais(title,content){
        $(title).fadeIn(1000, ()=>{
            $(title)[0].innerHTML = content
            $(title)[0].style.display = 'block'
        })
    }
}