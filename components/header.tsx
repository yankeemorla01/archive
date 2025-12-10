'use client'

import { ResizableLogo } from "./resizable-logo";

import { MobileMenu } from "./mobile-menu";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";



export const Header = () => {

  const navItems = [

    { name: "Home", href: "https://www.onboardigital.com/", highlight: false },

    { name: "Vendors", href: "https://www.onboardigital.com/vendors", highlight: false },

    { name: "Services", href: "https://www.onboardigital.com/services", highlight: false },

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

                className="transition-colors ease-out duration-150 text-white hover:text-[#FD6262]"

                style={{

                  fontSize: "17px",

                  fontWeight: 500,

                  marginRight: "28px",

                }}

              >

                {item.name}

              </a>

            ))}

            <NavigationMenu viewport={false} className="!p-0">

              <NavigationMenuList className="gap-0 !m-0 !p-0">

                <NavigationMenuItem className="!m-0 !p-0">

                  <NavigationMenuTrigger

                    className="transition-colors ease-out duration-150 text-[#FD6262] hover:text-[#FD6262] bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-[#FD6262] [&>svg]:hidden !p-0 cursor-pointer"

                    style={{

                      fontSize: "17px",

                      fontWeight: 500,

                      marginRight: "28px",

                      color: "#FD6262",

                      padding: "0",

                    }}

                    onClick={(e) => {
                      // Navegar a la página de cybersecurity
                      window.location.href = 'https://www.onboardigital.com/cybersecurity';
                    }}

                  >

                    Cybersecurity

                  </NavigationMenuTrigger>

                  <NavigationMenuContent

                    className="bg-[#0b0b0b] border border-white/10"

                    style={{ background: "#0b0b0b" }}

                  >

                    <div className="p-2 w-[280px]">

                      <NavigationMenuLink

                        asChild

                        className="block rounded-md transition-colors hover:bg-white/5"

                      >

                        <a

                          href="https://www.onboardigital.com/humanriskmanagment"

                          className="text-white hover:text-[#FD6262]"

                          style={{

                            fontSize: "17px",

                            fontWeight: 500,

                            display: "block",

                            padding: "12px 16px",

                          }}

                        >

                          Human Risk Management

                        </a>

                      </NavigationMenuLink>

                      <NavigationMenuLink

                        asChild

                        className="block rounded-md transition-colors hover:bg-white/5"

                      >

                        <a

                          href="/domain-scanner"

                          className="text-white hover:text-[#FD6262]"

                          style={{

                            fontSize: "17px",

                            fontWeight: 500,

                            display: "block",

                            padding: "12px 16px",

                          }}

                        >

                          DMARC Made Simple

                        </a>

                      </NavigationMenuLink>

                    </div>

                  </NavigationMenuContent>

                </NavigationMenuItem>

              </NavigationMenuList>

            </NavigationMenu>

            <a

              href="https://www.onboardigital.com/appointment"

              className="transition-colors ease-out duration-150 text-white hover:text-[#FD6262]"

              style={{

                fontSize: "17px",

                fontWeight: 500,

                marginRight: "28px",

              }}

            >

              Appointment

            </a>

            <a

              href="https://www.onboardigital.com/contact"

              className="transition-colors ease-out duration-150 text-white hover:text-[#FD6262]"

              style={{

                fontSize: "17px",

                fontWeight: 500,

                marginRight: "28px",

              }}

            >

              Contact

            </a>

          </nav>

          <div style={{ flex: "0 0 auto", marginLeft: "auto" }}>

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



          {/* Botón centrado abajo */}

          <div className="flex justify-center w-full mt-6">

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
