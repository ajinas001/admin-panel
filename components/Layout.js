import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";

import Navbar from "./Navbar";



export default function Layout({ children, setActiveComponent, activeComponent, isSidebarOpen, setIsSidebarOpen }) {

  return (

    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}

      <Sidebar

        activeComponent={activeComponent}

        setActiveComponent={setActiveComponent}

        isSidebarOpen={isSidebarOpen}

        setIsSidebarOpen={setIsSidebarOpen}

      />



      {/* Overlay for mobile */}

      {isSidebarOpen && (

        <div

          className="fixed inset-0 bg-black/20 backdrop-blur- bg-opacity-40 z-20 lg:hidden"

          onClick={() => setIsSidebarOpen(false)}

        />

      )}



      {/* Main content */}

      <div className="flex flex-col flex-1 overflow-hidden relative ">

        {/* Top Navbar */}

        <Navbar/>

        <header className=" absolute flex items-center justify-between  ps-4 pt-4 ">

            

          {/* Mobile Menu Button */}

          <button

            onClick={() => setIsSidebarOpen(!isSidebarOpen)}

            className="text-gray-700 focus:outline-none md:hidden"

          >

            <Menu className="h-6 w-6" />

          </button>

        </header>



        {/* Page Content */}

        <main

          className="flex-1 overflow-y-auto bg-gradient-to-br from-orange-400 to-gray-100 pe-0 md:pe-20"

          style={{

            backgroundImage: 'url("/images/bg.png")',

            backgroundPosition: "center",

            backgroundSize: "cover",

            backgroundAttachment: "fixed",

          }}

        >

          <div className="p-4">

            {children}

          </div>

        </main>

      </div>

    </div>

  );

}
