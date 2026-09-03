// src/App.tsx

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Brothers from "./pages/Brothers";
import Rush from "./pages/Rush";
import Contact from "./pages/Contact";
import Error from "./pages/Error";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { DataBaseDataContext } from "./contexts/DataBaseDataContext";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import BackToTop from "./components/ScrollTop";

// Lazy-load admin pages so Firebase only initialises when needed
const Admin = lazy(() => import("./pages/Admin/Admin"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashoard"));
const BatchAddMembers = lazy(() => import("./pages/Admin/BatchAddMembers"));
const AdminRoute = lazy(() => import("./components/Admin/AdminRoute"));

function App() {
    //DB access for entire app
    const [userData, setUserData] = useState(null);
    const [pictureData, setPictureData] = useState(null);
    const location = useLocation();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`${backendUrl}/users`);
                const pictureResponse = await axios.get(
                    `${backendUrl}/websitePics`
                );


                setUserData(userResponse.data.data);

                setPictureData(pictureResponse.data.data);
            } catch (error) {
                console.error("Error fetching data in App:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header at the top */
            !location.pathname.includes("admin") && <Header/>
            }

            {/* Main content area (grow to fill) */}
            <main className="flex-grow">
                {/* Wrap Routes with DataBaseDataContext.Provider */}
                <DataBaseDataContext.Provider value={{ userData, pictureData }}>
                    <AnimatePresence mode="wait">
                        <BackToTop />
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/brothers" element={<Brothers />} />
                            <Route path="/rush" element={<Rush />} />
                            <Route path="/contact" element={<Contact />} />

                            {/*Admin pages route : START */}
                            <Route path="/admin" element={<Suspense><Admin /></Suspense>} />
                            <Route path="/adminDashboard" element={<Suspense><AdminRoute><AdminDashboard /></AdminRoute></Suspense>} />
                            <Route path="/adminBatchAddMembers" element={<Suspense><AdminRoute><BatchAddMembers /></AdminRoute></Suspense>} />
                            {/*Admin pages route : END */}


                            <Route path="*" element={<Error />} />

                        </Routes>
                    </AnimatePresence>
                </DataBaseDataContext.Provider>
            </main>

            {/* Footer at the bottom */
            !location.pathname.includes("admin") &&  <Footer /> 
            }
      
        </div>
    );
}

export default App;
