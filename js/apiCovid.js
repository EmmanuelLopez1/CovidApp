export const covid = class Covid {
    constructor() {
        this.data = '';
    }

    //HACE UNA PETICION DE LOS DATOS DEL PAIS SOLICITADO Y LOS DEVUELVE
    async pedirDatos(country, status, date1, date2) {
        let url = `https://api.covid19api.com/country/${country}/status/${status}?from=${date1}T00:00:00Z&to=${date2}T00:00:00Z`
        const response = await fetch(url)
        const data = await response.json()
        return data
    }


    //DEVUELVE TODOS LOS DATOS DE TODOS LOS PAISES
    allCountries() {
        return $.ajax({ 
            url: 'https://api.covid19api.com/countries'
        })
            .done((data) => {
                let datos = data
                return datos
            })
            .fail((error) => {
                console.log(error)
            })
    }

   

}