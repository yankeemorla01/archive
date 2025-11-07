import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export const Header = () => {
  const navItems = [
    { name: "Home", href: "/", highlight: false },
    { name: "Vendors", href: "/vendors", highlight: false },
    { name: "Services", href: "/services", highlight: false },
    { name: "Cybersecurity", href: "/cybersecurity", highlight: true },
    { name: "Appointment", href: "/appointment", highlight: false },
    { name: "Contact", href: "/contact", highlight: false },
  ];

  return (
    <div className="fixed z-50 top-0 left-0 w-full bg-black">
      <header className="flex items-center justify-between container py-4 md:py-6">
        <Link href="/">
          <Logo className="w-[100px] md:w-[120px]" />
        </Link>
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-6 md:gap-x-8">
          {navItems.map((item) => (
            <Link
              className={`inline-block font-serif text-sm md:text-base transition-colors ease-out duration-150 ${
                item.highlight
                  ? "text-[#FF6B9D]"
                  : "text-white/80 hover:text-white"
              }`}
              href={item.href}
              key={item.name}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <Link
          className="max-lg:hidden transition-colors ease-out duration-150 font-serif text-sm md:text-base text-white/80 hover:text-white border border-white/30 rounded px-4 py-2"
          href="/get-started"
        >
          Get Started
        </Link>
        <MobileMenu />
      </header>
    </div>
  );
};
