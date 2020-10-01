import '../styles/globals.css'
import {ContextProvider} from "../context/contextProvider";
import {useContext} from "react";
import {CategoryContext} from "../context/categoryProvider";

function MyApp({Component, pageProps}) {
    console.log("_APP__");

    return (
        <ContextProvider>
            <Boot>
                <Component {...pageProps} />
            </Boot>
        </ContextProvider>
    )
}

function Boot(props) {

    const {category, setCategory} = useContext(CategoryContext)
    setCategory(10)
    console.log(category, setCategory)

    return (<>
        {props.children}
        </>
    )
}

export default MyApp
