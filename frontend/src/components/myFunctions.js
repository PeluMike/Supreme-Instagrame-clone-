export const setShowHandler = (id, value, setValue)=>{
    if(!value){
        let getInfo = document.getElementById(id)
        getInfo.setAttribute('class', 'infocontainer')
        document.body.style.overflow = "hidden"
        setValue(true)
    }
    }


export const removeShowHandler = (id, value, setValue)=>{
    if(value){
        let getInfo = document.getElementById(id)
        getInfo.setAttribute('class', 'show')
        document.body.style.overflow = "scroll"
        setValue(false)
    }
    }