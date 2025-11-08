import { Logo } from "./logo";
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
    <div className="fixed z-50 top-0 left-0 w-full" style={{ background: '#0E0E0E' }}>
      <header 
        className="flex items-center justify-between"
        style={{ 
          height: '90px',
          padding: '0 60px'
        }}
      >
        <a href="https://www.onboardigital.com/" style={{ marginRight: '60px' }}>
          <Logo className="h-[6px] w-auto" />
        </a>
        <nav className="flex max-lg:hidden items-center">
          {navItems.map((item, index) => (
            <a
              className={`text-white transition-colors ease-out duration-150 ${
                item.highlight ? "text-[#E65C5C]" : "hover:text-[#E65C5C]"
              }`}
              style={{
                fontSize: '16px',
                fontWeight: 500,
                marginRight: index < navItems.length - 1 ? '28px' : '0'
              }}
              href={item.href}
              key={item.name}
            >
              {item.name}
            </a>
          ))}
        </nav>
        <a
          className="max-lg:hidden text-white cursor-pointer"
          style={{
            border: '1.5px solid #fff',
            padding: '8px 18px',
            borderRadius: '6px',
            fontSize: '15px',
            background: 'transparent'
          }}
          href="https://www.onboardigital.com/"
        >
          Get Started
        </a>
        <MobileMenu />
      </header>
    </div>
  );
};
