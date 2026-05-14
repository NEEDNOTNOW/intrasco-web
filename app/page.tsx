"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Home from "@/app/components/Home";

// Map page uses dynamic import internally (Leaflet needs ssr:false),
// so we just import the page component directly.
import MapPage from "@/app/map/page";

export default function AppShell() {
    const [currentPage, setCurrentPage] = useState("AdminPanel");

    const navigate = (page: string) => setCurrentPage(page);

    const renderPage = () => {
        switch (currentPage) {
            case "AdminPanel":
                return <Home onNavigate={navigate} />;

            case "Map":
                return <MapPage />;

            default:
                return <Home onNavigate={navigate} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar onNavigate={navigate} currentPage={currentPage} />
            <main className="flex-1">
                {renderPage()}
            </main>
            <Footer onNavigate={navigate} />
        </div>
    );
}