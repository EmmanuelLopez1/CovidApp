export const covid = class Covid{
    constructor(){
        
    }

    //HACE UNA PETICION DE LOS DATOS SOLICITADOS Y LOS DEVUELVE
    async pedirDatos(values){
        let url = `https://api.covid19api.com/country/${values.country}/status/${values.status}?from=${values.date1}T00:00:00Z&to=${values.date2}T00:00:00Z`
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
}