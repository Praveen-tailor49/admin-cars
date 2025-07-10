import SideBar from "@/components/SideBar";
import { MassageProvider } from "@/context/MassageContext";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  const path = usePathname();
  return (
    <MassageProvider>
      <ToastContainer position="top-right" autoClose={2000} theme="light" />
      <div className="flex flex-wrap bg-gray-200 w-full h-screen">
        {['/home', '/audit'].includes(path) ? <SideBar {...{path}} /> : null}
        <div className=" my-5 bg-gray-200 overflow-auto" style={{ width: 'calc(100% - 80px)' }}>
          <Component {...pageProps} />
        </div>
      </div>
    </MassageProvider>

  );
}
