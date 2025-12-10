"use client";

import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  className?: string;
}

export const MobileMenu = ({ className }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cybersecurityOpen, setCybersecurityOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "https://www.onboardigital.com/", highlight: false },
    { name: "Vendors", href: "https://www.onboardigital.com/vendors", highlight: false },
    { name: "Services", href: "https://www.onboardigital.com/services", highlight: false },
    { name: "Appointment", href: "https://www.onboardigital.com/appointment", highlight: false },
  ];

  const cybersecuritySubItems = [
    { name: "Human Risk Management", href: "https://www.onboardigital.com/humanriskmanagment" },
    { name: "DMARC Made Simple", href: "/domain-scanner" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
    setCybersecurityOpen(false);
  };

  return (
    <Dialog.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            "group lg:hidden p-2 text-white transition-colors relative z-[10001]",
            className
          )}
          aria-label="Open menu"
        >
          {!isOpen && <Menu size={24} />}
          {isOpen && <X size={24} />}
        </button>
      </Dialog.Trigger>

      {isOpen && (
      <Dialog.Portal>
          <Dialog.Overlay
            className="fixed z-[9999] inset-0 bg-black/50 backdrop-blur-sm"
          data-overlay="true"
        />

        <Dialog.Content
          onInteractOutside={(e) => {
            if (
              e.target instanceof HTMLElement &&
              e.target.dataset.overlay !== "true"
            ) {
              e.preventDefault();
            }
          }}
            className="fixed top-0 left-0 w-full z-[10000] py-28 md:py-40"
            style={{ 
              zIndex: 10000,
              background: '#000000'
            }}
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          {/* Botón de cerrar visible en el menú */}
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 lg:hidden p-2 text-white hover:text-[#FD6262] transition-colors z-[10001]"
              aria-label="Close menu"
              style={{ zIndex: 10001 }}
            >
              <X size={28} />
            </button>
          </Dialog.Close>

          <nav className="flex flex-col space-y-6 container mx-auto">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className="text-xl font-mono uppercase transition-colors ease-out duration-150 py-2 text-white hover:text-[#FD6262]"
              >
                {item.name}
              </a>
            ))}

            {/* Cybersecurity con submenu */}
            <div>
              <button
                onClick={() => setCybersecurityOpen(!cybersecurityOpen)}
                className="text-xl font-mono uppercase transition-colors ease-out duration-150 py-2 text-[#FD6262] hover:text-[#FD6262] flex items-center gap-2 w-full"
              >
                Cybersecurity
                <ChevronDown
                  size={20}
                  className={cn(
                    "transition-transform duration-200",
                    cybersecurityOpen && "rotate-180"
                  )}
                />
              </button>
              {cybersecurityOpen && (
                <div className="ml-4 mt-2 space-y-4">
                  {cybersecuritySubItems.map((subItem) => (
                    <a
                      key={subItem.name}
                      href={subItem.href}
                      onClick={handleLinkClick}
                      className="text-lg font-mono uppercase transition-colors ease-out duration-150 py-2 text-white hover:text-[#FD6262] block"
                    >
                      {subItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://www.onboardigital.com/contact"
              onClick={handleLinkClick}
              className="text-xl font-mono uppercase transition-colors ease-out duration-150 py-2 text-white hover:text-[#FD6262]"
            >
              Contact
            </a>

            <div className="mt-6">
              <a
                href="https://www.onboardigital.com/"
                onClick={handleLinkClick}
                className="inline-block text-xl font-serif text-white transition-colors ease-out duration-150 hover:text-[#FD6262] py-2 border border-white/30 rounded px-4"
              >
                Get Started
              </a>
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
      )}
    </Dialog.Root>
  );
};
