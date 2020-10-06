import '../styles/globals.css'
import 'react-quill/dist/quill.snow.css'
import Chat from '../components/chat/chat'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Chat />
        </>
    )
}
export default MyApp
