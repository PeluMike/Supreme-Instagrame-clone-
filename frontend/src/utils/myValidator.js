
import axios from "axios"

export function isEmpty(value){
    return value === ''
}

export function isSame(value, value2){
    return value === value2
}

export function getLength(value, index){
    return value.length < index
}

export async function fecthUsers(setState){
    const { data } = await axios.get('/user/alluser/')
    setState(data)
}

export function usernameExist(value, username){
    const findUsername = value.find((users) => users.username === username)
    return findUsername
}

export function emailExist(value, email){
    const findEmail = value.find((users) => users.email === email)
    return findEmail
    // console.log(findEmail)
}

export function isContainUppercase(value){
    let upperCase = false
   if (value.match(/[A-Z]/)){
        upperCase = true
   }
   return upperCase
}

export function isContainLowercase(value){
    let lowerCase = false
   if (value.match(/[a-z]/)){
        lowerCase = true
   }
   return lowerCase
}

export function isContainNumbers(value){
    let num = false
   if (value.match(/[0-9]/)){
        num = true
   }
   return num
}

export function isContainRegExp(value){
    let regExp = false
   if (value.match(/[!\@\#\$\^\*\(\)\_\+\=\%\<\>\?\.\,]/)){
        regExp = true
   }
   return regExp
}