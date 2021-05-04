export const deleteData = class Delete{
    constructor(){

    }

    //ELIMINA NODOS DE UN PADRE HTML ESPECIFICADO
    deleteCases(length, content, child){
        for(let i = 0; i < length; i++){
            let nodo = document.querySelector(child)
            content.removeChild(nodo)
        }
    }

    //OCULTA UNA IMAGEN ESPECIFICADA
    deleteImg(imgClass){
            let img = document.querySelector(imgClass)
            img.style.display = 'none'
    }
}