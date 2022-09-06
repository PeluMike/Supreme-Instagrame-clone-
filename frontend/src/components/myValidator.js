
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


// export function isContainUppercase(){
//     const alphCap = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

//     let character = ''
//     let value = 'elumgiH'
//     let arr = []
//     for(let i=0; i<=value.length; i++){
//         character = value.charAt(i);
//         // console.log(character)
//         arr.push(character)
//         const check = alphCap.includes(character)
//         console.log(check)
       
//     }

//     // console.log(arr.map())
//     // console.log(Object.keys(test))
//     // console.log(alphCap)
// }










// export function isContainUppercas(value){
//     let character = ''
//     for(let i=0; i<=value.length; i++){
//         character = value.charAt(i);
//         if (value.charAt(i) == value.charAt(i).toUpperCase()){
//             return true
//         }else{
//             return false
//         }
//     }
// }



// export function isContainUppercase(value){
    // const uperCases = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ']
   
    // var checkValue = value.split('').reverse()
    // console.log(checkValue)
    // checkValue.find((values) =>{
    //    if (values === values.toUpperCase()){
    //         console.log('upper is there')
    //    }else{
    //         console.log('upper is not there')
    //    }
    // })

    // let character = ''

    // for(let i=0; i<=value.length; i++){
    //     character = value.charAt(i);
    //     // console.log(i)
    //     if (!isNaN(character * 1)){
    //         console.log('it contains number')
    //     }}

    // for(let i=0; i<=value.length; i++){
    //     character = value.charAt(i);
    //     console.log(i)
    //     if (!isNaN(character * 1)){
    //         // alert('character is numeric');
    //     }else{
    //         if (character === character.toUpperCase()) {
    //             // alert ('upper case true');
    //         }
    //         if (character === character.toLowerCase()){
    //             // alert ('lower case true');
    //         }
    //     }
    // }


    // function palindromeChecker(string) {
    //     var myString = string.toLowerCase();
    //     var myArray = myString.split(" ");
    //     var newArray = myArray.map(function (item) {
    //           return item.split("").reverse().join("");
    //       });
    //     console.log(newArray);
    //     return newArray.reverse().join(" ") === string;
    //   }
      
    //   console.log(palindromeChecker("dad did what"));
    
// }