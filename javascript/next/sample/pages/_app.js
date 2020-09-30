import '../styles/globals.css'
import {ContextProvider} from "../context/contextProvider";

function MyApp({Component, pageProps}) {

    console.log("_APP__");

    return (
        <ContextProvider>
            <Component {...pageProps} />
        </ContextProvider>
    )
}

export default MyApp
