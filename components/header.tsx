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
    <div className="fixed z-[9998] top-0 left-0 w-full" style={{ background: '#0E0E0E', overflow: 'visible' }}>
      <header 
        className="flex items-center"
        style={{ 
          height: '120px',
          padding: '0 60px',
          overflow: 'visible',
          maxWidth: '100%',
          position: 'relative'
        }}
      >
        <ResizableLogo />
        <nav 
          className="flex max-lg:hidden items-center"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {navItems.map((item, index) => (
            <a
              className={`transition-colors ease-out duration-150 ${
                item.highlight ? "" : "text-white hover:text-[#FD6262]"
              }`}
              style={{
                fontSize: '17px',
                fontWeight: 500,
                marginRight: index < navItems.length - 1 ? '28px' : '0',
                color: item.highlight ? '#FD6262' : undefined
              }}
              href={item.href}
              key={item.name}
            >
              {item.name}
            </a>
          ))}
        </nav>
        <div style={{ flex: '0 0 auto', marginLeft: 'auto' }}>
          <a
            className="max-lg:hidden text-white cursor-pointer"
            style={{
              border: '1.5px solid #fff',
              width: '112px',
              height: '49px',
              borderRadius: '6px',
              fontSize: '17px',
              background: 'transparent',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            href="https://www.onboardigital.com/"
        >
          Get Started
          </a>
        </div>
        <MobileMenu />
      </header>
    </div>
  );
};
