import { atom } from "recoil";


export const TodoFormVisible = atom({
    key:"TodoFormVisible",
    default:false
})

export const IsLoggedIn = atom({
    key:"IsLoggedIn",
    default:false
})


export const userName = atom({
    key:"username",
    default:""
})

export const Todos = atom({
    key:"Todos",
    default:[]
})

export const isLoding = atom({
    key:"isLoding",
    default:false
})