import { Children } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

export default function PageLayout({children}){
    return <>
            <NavBar/>
                    {children}
            <Footer/>  
    </>
}