export const userDetails = ()=>{
    return JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).user.user : null;
}

export const userId = ()=>{
    if(JSON.parse(localStorage.getItem("userId")) ){
        return JSON.parse(localStorage.getItem("userId")) ;
    }
}