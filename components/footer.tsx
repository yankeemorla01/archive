'use client'

import { Instagram, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'

export const Footer = () => {
  return (
    <footer 
      className="w-full bg-[#0b0b0b] text-white py-12 px-4 md:px-8 lg:px-16"
      style={{ background: '#0b0b0b' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            {/* Logo con imagen */}
            <div>
              <img 
                src="/Original Logo White.png" 
                alt="Onboard Digital Logo" 
                style={{ 
                  width: '230px',
                  height: '230px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
          </div>

          {/* Content Columns */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-12 flex-1 justify-center">
            
            {/* Vendors Column */}
            <div>
              <h3 className="text-base font-bold mb-4" style={{ fontSize: '16px', fontWeight: 700 }}>
                Vendors
              </h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.onboardigital.com/vendors" 
                    className="text-sm hover:text-white transition-colors"
                    style={{ fontSize: '14px', color: '#ffffff' }}
                  >
                    Microsoft
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.onboardigital.com/vendors" 
                    className="text-sm hover:text-white transition-colors"
                    style={{ fontSize: '14px', color: '#ffffff' }}
                  >
                    usecure
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.onboardigital.com/vendors" 
                    className="text-sm hover:text-white transition-colors"
                    style={{ fontSize: '14px', color: '#ffffff' }}
                  >
                    Dropsuite
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.onboardigital.com/vendors" 
                    className="text-sm hover:text-white transition-colors"
                    style={{ fontSize: '14px', color: '#ffffff' }}
                  >
                    ESET
                  </a>
                </li>
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-base font-bold mb-4" style={{ fontSize: '16px', fontWeight: 700 }}>
                Services
              </h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.onboardigital.com/services" 
                    className="text-sm hover:text-white transition-colors"
                    style={{ fontSize: '14px', color: '#ffffff' }}
                  >
                    Business consultant
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.onboardigital.com/services" 
                    className="text-sm hover:text-white transition-colors"
                    style={{ fontSize: '14px', color: '#ffffff' }}
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.onboardigital.com/services" 
                    className="text-sm hover:text-white transition-colors"
                    style={{ fontSize: '14px', color: '#ffffff' }}
                  >
                    Software and Cloud
                  </a>
                </li>
              </ul>
            </div>

            {/* Cybersecurity Column */}
            <div>
              <h3 className="text-base font-bold mb-4" style={{ fontSize: '16px', fontWeight: 700 }}>
                <a 
                  href="https://www.onboardigital.com/cybersecurity" 
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: '#ffffff', textDecoration: 'none' }}
                >
                  Cybersecurity
                </a>
              </h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.onboardigital.com/humanriskmanagment" 
                    className="text-sm hover:text-white transition-colors"
                    style={{ fontSize: '14px', color: '#ffffff' }}
                  >
                    Security Awareness Training
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.onboardigital.com/humanriskmanagment" 
                    className="text-sm hover:text-white transition-colors"
                    style={{ fontSize: '14px', color: '#ffffff' }}
                  >
                    Simulated Phishing
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.onboardigital.com/humanriskmanagment" 
                    className="text-sm hover:text-white transition-colors"
                    style={{ fontSize: '14px', color: '#ffffff' }}
                  >
                    Dark Web Monitoring
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.onboardigital.com/humanriskmanagment" 
                    className="text-sm hover:text-white transition-colors"
                    style={{ fontSize: '14px', color: '#ffffff' }}
                  >
                    Policy Management
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.onboardigital.com/humanriskmanagment" 
                    className="text-sm hover:text-white transition-colors"
                    style={{ fontSize: '14px', color: '#ffffff' }}
                  >
                    Human Risk Scoring
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.onboardigital.com/humanriskmanagment" 
                    className="text-sm hover:text-white transition-colors"
                    style={{ fontSize: '14px', color: '#ffffff' }}
                  >
                    In-Depth Risk Analytics
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex-shrink-0">
            <div className="flex gap-2">
              <div
                className="opacity-50"
                style={{ color: '#ffffff', cursor: 'default' }}
                aria-label="Instagram"
              >
                <Instagram size={36} />
              </div>
              <div
                className="opacity-50"
                style={{ color: '#ffffff', cursor: 'default' }}
                aria-label="Facebook"
              >
                <Facebook size={36} />
              </div>
              <div
                className="opacity-50"
                style={{ color: '#ffffff', cursor: 'default' }}
                aria-label="Twitter"
              >
                <Twitter size={36} />
              </div>
              <a 
                href="https://www.linkedin.com/company/onboardthedigital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                style={{ color: '#ffffff' }}
                aria-label="LinkedIn"
              >
                <Linkedin size={36} />
              </a>
              <div
                className="opacity-50"
                style={{ color: '#ffffff', cursor: 'default' }}
                aria-label="YouTube"
              >
                <Youtube size={36} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}





