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
    <div className="fixed z-50 top-0 left-0 w-full bg-black">
      <header className="flex items-center justify-between container py-4 md:py-6">
        <a href="https://www.onboardigital.com/">
          <Logo className="h-8 md:h-10 w-auto" />
        </a>
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-6 md:gap-x-8">
          {navItems.map((item) => (
            <a
              className={`inline-block font-serif text-base md:text-lg transition-colors ease-out duration-150 ${
                item.highlight
                  ? "text-[#FD6262]"
                  : "text-white/80 hover:text-[#FD6262]"
              }`}
              href={item.href}
              key={item.name}
            >
              {item.name}
            </a>
          ))}
        </nav>
        <a
          className="max-lg:hidden transition-colors ease-out duration-150 font-serif text-base md:text-lg text-white/80 hover:text-[#FD6262] border border-white/30 rounded px-4 py-2"
          href="https://www.onboardigital.com/"
        >
          Get Started
        </a>
        <MobileMenu />
      </header>
    </div>
  );
};
