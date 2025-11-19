'use client'

import { Mail, Eye, Shield, Zap } from 'lucide-react'

/**
 * OnboardDigital Features Component
 * Purpose: Display features section for Email Security and Deliverability
 * Last Updated: 2025-11-19
 * Author: System
 */

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-750 transition-all duration-300">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 rounded-lg bg-gray-700 text-white">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

export default function OnboardDigitalFeatures() {
  const features = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Reliable",
      description: "Trusted by over 175,000 domains, we deliver robust, scalable solutions that grow with your organization's needs, ensuring long-term security and stability."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Easy to Manage",
      description: "Our smart dashboards and simplified reporting keep your email authentication on track, reducing time spent troubleshooting and increasing operational efficiency."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Risk-Free",
      description: "We provide peace of mind with world-class support available 24/7, so you can focus on your business while we handle your email security."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast",
      description: "Our streamlined email security implementation ensures a rapid, hassle-free transition from monitoring to full enforcement, minimizing disruptions and enhancing email deliverability."
    }
  ]

  return (
    <div className="w-full bg-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simplify, Manage, and Automate Your Email Security Journey: OnboardDigital
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Protect your company reputation, ensure compliance with industry regulations, and boost email deliverability 
            with our Email Security and Deliverability platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button 
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl border border-gray-600"
            onClick={() => window.open('https://www.onboardigital.com/appointment', '_blank')}
          >
            Request Demo
          </button>
        </div>
      </div>
    </div>
  )
}
