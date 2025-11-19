import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PublicLayout() {
    const { pathname } = useLocation();

    const hide = pathname === "/login" || pathname === "/register";

    return (
        <>
            {!hide && <Header />}
            <Outlet />
            {!hide && <Footer />}
        </>
    );
}
