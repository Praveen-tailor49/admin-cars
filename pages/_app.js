import { MassageProvider } from "@/context/MassageContext";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <MassageProvider>
       <ToastContainer position="bottom-center" autoClose={1000}  theme='colored'/>
      <Component {...pageProps} />
    </MassageProvider>

  );
}
