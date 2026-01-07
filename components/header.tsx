'use client'

import { ResizableLogo } from "./resizable-logo";

import { MobileMenu } from "./mobile-menu";



export const Header = () => {

  const navItems = [

    { name: "Home", href: "https://www.onboardigital.com/", highlight: false },

    { name: "Vendors", href: "https://www.onboardigital.com/vendors", highlight: false },

    { name: "Services", href: "https://www.onboardigital.com/services", highlight: false },

    { name: "Cybersecurity", href: "https://www.onboardigital.com/cybersecurity", highlight: true },

    { name: "Appointment", href: "https://www.onboardigital.com/appointment", highlight: false },

    { name: "Contact", href: "https://www.onboardigital.com/contact", highlight: false },

  ];



  return (

    <div

      className="fixed z-[9998] top-0 left-0 w-full"

      style={{ background: "#0b0b0b", overflow: "visible" }}

    >

      <header

        className="flex flex-col lg:flex-row items-center lg:px-[60px] px-5 py-4"

        style={{

          overflow: "visible",

          maxWidth: "100%",

          position: "relative",

        }}

      >

        {/* Desktop Layout */}

        <div className="hidden lg:flex items-center w-full">

          <ResizableLogo />

          <nav

            className="flex items-center"

            style={{

              position: "absolute",

              left: "50%",

              top: "50%",

              transform: "translate(-50%, -50%)",

            }}

          >

            {navItems.map((item, index) => (

              <a

                key={item.name}

                href={item.href}

                className={`transition-colors ease-out duration-150 ${

                  item.highlight ? "" : "text-white hover:text-[#FD6262]"

                }`}

                style={{

                  fontSize: "17px",

                  fontWeight: 500,

                  marginRight: index < navItems.length - 1 ? "28px" : "0",

                  color: item.highlight ? "#FD6262" : undefined,

                }}

              >

                {item.name}

              </a>

            ))}

          </nav>

          <div style={{ flex: "0 0 auto", marginLeft: "auto", display: "flex", gap: "12px" }}>

            <a

              className="text-white cursor-pointer"

              style={{

                width: "112px",

                height: "49px",

                borderRadius: "6px",

                fontSize: "17px",

                background: "transparent",

                fontWeight: 500,

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

              }}

              href="https://portal.onboardigital.com"

            >

              Login

            </a>

            <a

              className="text-white cursor-pointer"

              style={{

                border: "1.5px solid #fff",

                width: "112px",

                height: "49px",

                borderRadius: "6px",

                fontSize: "17px",

                background: "transparent",

                fontWeight: 500,

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

              }}

              href="https://www.onboardigital.com/"

            >

              Get Started

            </a>

          </div>

        </div>



        {/* Mobile Layout */}

        <div className="flex lg:hidden flex-col w-full">

          {/* Línea superior: logo izquierda, menú derecha */}

          <div className="flex justify-between items-center w-full">

            <div className="flex-shrink-0">

              <ResizableLogo />

            </div>

            <div className="flex-shrink-0">

              <MobileMenu />

            </div>

          </div>



          {/* Botones centrados abajo */}

          <div className="flex justify-center w-full mt-6 gap-3">

            <a

              href="https://portal.onboardigital.com"

              className="text-white px-5 py-2 rounded hover:bg-white hover:text-black transition-all duration-300"

              style={{

                fontSize: "17px",

                fontWeight: 500,

              }}

            >

              Login

            </a>

            <a

              href="https://www.onboardigital.com/"

              className="text-white border border-white px-5 py-2 rounded hover:bg-white hover:text-black transition-all duration-300"

              style={{

                fontSize: "17px",

                fontWeight: 500,

              }}

            >

              Get Started

            </a>

          </div>

        </div>

      </header>

    </div>

  );

};
