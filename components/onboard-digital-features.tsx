'use client'

import React, { useState } from 'react'
import { Mail, Eye, Shield, Zap, Play, MessageSquare, Database, Bot, Send, CheckCircle, Cloud, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

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
    <motion.div 
      className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg cursor-pointer"
      whileHover={{ 
        scale: 1.05,
        backgroundColor: "rgb(55, 65, 81)", // gray-700
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 20px rgba(59, 130, 246, 0.5)",
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <motion.div 
          className="p-3 rounded-lg bg-gray-700 text-white"
          whileHover={{ 
            scale: 1.1,
            backgroundColor: "rgb(59, 130, 246)", // blue-500
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)"
          }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

// Digital Transformation Flow Component
type FlowNode = {
  id: number;
  name: string;
  icon: typeof Zap;
  color: string;
  description: string;
};

const emailSecurityNodes: FlowNode[] = [
  { id: 1, name: "Message Created", icon: Mail, color: "bg-blue-600", description: "Compose email message" },
  { id: 2, name: "Security Scan", icon: Shield, color: "bg-purple-600", description: "Threat detection check" },
  { id: 3, name: "Authentication", icon: Lock, color: "bg-green-600", description: "Verify sender identity" },
  { id: 4, name: "Send Message", icon: Send, color: "bg-emerald-600", description: "Secure delivery process" }
];

const basicEmailNodes: FlowNode[] = [
  { id: 1, name: "Email Received", icon: Mail, color: "bg-blue-600", description: "Incoming message" },
  { id: 2, name: "Send Attempt", icon: Send, color: "bg-emerald-600", description: "Trying to send" }
];

const EmailSecurityFlow = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const [failed, setFailed] = useState(false);
  const [flowType, setFlowType] = useState<'with' | 'without'>('with');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [selectedButton, setSelectedButton] = useState<'with' | 'without' | null>(null);
  const [showLoadingBar, setShowLoadingBar] = useState(false);
  const [currentNodeBeingTouched, setCurrentNodeBeingTouched] = useState<number | null>(null);

  const runWorkflow = async (type: 'with' | 'without') => {
    if (isRunning) return;
    setSelectedButton(type);
    setIsRunning(true);
    setCompleted([]);
    setActiveNode(null);
    setFailed(false);
    setFlowType(type);
    setLoadingProgress(0);

    const delay = type === 'with' ? 800 : 1500; // Slower without service

    if (type === 'with') {
      // Full workflow for "with service" with loading bar and progressive node completion
      setShowLoadingBar(true);
      
      // Loading bar animation over 3 seconds with precise node activation
      const loadingDuration = 3000; // 3 seconds for smoother animation
      const updateInterval = 20; // Update every 20ms for ultra-smooth animation
      const totalSteps = loadingDuration / updateInterval;
      
      // Precise thresholds - nodes activate exactly when loading bar touches them
      const nodeThresholds = [
        { progress: 5, nodeIndex: 0 },   // Message Created - bar starts from this node
        { progress: 33, nodeIndex: 1 },  // Security Scan - bar reaches center
        { progress: 66, nodeIndex: 2 },  // Authentication - bar reaches center
        { progress: 95, nodeIndex: 3 }   // Send Message - bar reaches end
      ];
      
      for (let step = 0; step <= totalSteps; step++) {
        const progress = (step / totalSteps) * 100;
        setLoadingProgress(progress);
        
        // Determine which node the loading bar is currently touching
        let touchingNode = null;
        if (progress >= 0 && progress < 25) touchingNode = 0;
        else if (progress >= 25 && progress < 50) touchingNode = 1;
        else if (progress >= 50 && progress < 75) touchingNode = 2;
        else if (progress >= 75) touchingNode = 3;
        
        setCurrentNodeBeingTouched(touchingNode);
        
        // Activate nodes exactly when loading bar touches them
        nodeThresholds.forEach(({ progress: threshold, nodeIndex }) => {
          if (progress >= threshold && !completed.includes(emailSecurityNodes[nodeIndex].id)) {
            // Immediately complete the node when bar touches it - no intermediate states
            setCompleted((prev) => [...prev, emailSecurityNodes[nodeIndex].id]);
          }
        });
        
        await new Promise((resolve) => setTimeout(resolve, updateInterval));
      }
      
      setShowLoadingBar(false);
    } else {
      // Simplified workflow for "without service" with loading bar animation
      
      // First step: Email received
      setActiveNode(emailSecurityNodes[0].id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCompleted([emailSecurityNodes[0].id]);
      setActiveNode(null);
      
      // Loading bar animation over 5 seconds
      const loadingDuration = 5000; // 5 seconds
      const updateInterval = 50; // Update every 50ms
      const totalSteps = loadingDuration / updateInterval;
      
      for (let step = 0; step <= totalSteps; step++) {
        setLoadingProgress((step / totalSteps) * 100);
        await new Promise((resolve) => setTimeout(resolve, updateInterval));
      }
      
      // Final step: Fail immediately without showing success
      setFailed(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setTimeout(() => {
        setIsRunning(false);
        setCompleted([]);
        setFailed(false);
        setLoadingProgress(0);
        setShowLoadingBar(false);
        setCurrentNodeBeingTouched(null);
      }, 2000);
      return;
    }

    setActiveNode(null);
    setTimeout(() => {
      setIsRunning(false);
      setCompleted([]);
      setLoadingProgress(0);
      setShowLoadingBar(false);
      setCurrentNodeBeingTouched(null);
    }, 1400);
  };

  return (
    <div className="w-full h-[480px] rounded-2xl bg-gray-800/80 border border-gray-700 p-6 text-white flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gray-400 mb-1">EMAIL SECURITY FLOW</p>
          <h3 className="text-2xl font-semibold text-white">Email Security Process</h3>
          <p className="text-sm text-gray-300">Compare with and without our service</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => runWorkflow('with')}
            disabled={isRunning}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 text-sm ${
              isRunning
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : selectedButton === 'with'
                ? "bg-blue-600 text-white shadow-inner scale-95 border-2 border-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-xl active:scale-95 shadow-lg"
            }`}
          >
            With Service
          </button>
          <button
            onClick={() => runWorkflow('without')}
            disabled={isRunning}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-200 text-sm ${
              isRunning
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : selectedButton === 'without'
                ? "bg-gray-300 text-gray-700 shadow-inner scale-95 border-2 border-gray-400"
                : "bg-transparent text-gray-400 hover:bg-gray-700 hover:text-gray-300 active:scale-95 border border-gray-600"
            }`}
          >
            Without Service
          </button>
        </div>
      </div>

      <div className="flex-1 bg-gray-900/60 rounded-2xl border border-gray-600/20 px-6 py-6 overflow-hidden">
        <div className="relative flex items-center justify-between gap-6 mb-5">
          {/* Base line - positioned to connect icon centers */}
          <div className="absolute top-1/2 h-[2px] bg-gray-600/30 -translate-y-1/2" 
               style={{ 
                 left: 'calc(12.5% + 40px)', // Start from center of first icon
                 right: 'calc(12.5% + 40px)' // End at center of last icon
               }} />
          
          {/* Animated loading bar for "with service" (green) */}
          {flowType === 'with' && showLoadingBar && loadingProgress > 0 && (
            <div 
              className="absolute top-1/2 h-[4px] bg-gradient-to-r from-green-500 to-green-600 transition-all duration-25 ease-linear -translate-y-1/2 shadow-lg"
              style={{ 
                left: 'calc(12.5% + 40px)', // Start from center of first icon
                width: `${(loadingProgress / 100) * (75 - 0)}%`, // Progress across the line
                maxWidth: 'calc(75% - 80px)', // Max width to center of last icon
                boxShadow: '0 0 12px rgba(34, 197, 94, 0.8), 0 0 24px rgba(34, 197, 94, 0.5)',
                filter: 'brightness(1.3)'
              }}
            />
          )}
          
          {/* Animated loading bar for "without service" (red) */}
          {flowType === 'without' && isRunning && loadingProgress > 0 && (
            <div 
              className="absolute top-1/2 h-[4px] bg-gradient-to-r from-red-500 to-red-600 transition-all duration-50 ease-linear -translate-y-1/2 shadow-lg"
              style={{ 
                left: 'calc(12.5% + 40px)', // Start from center of first icon
                width: `${(loadingProgress / 100) * (75 - 0)}%`, // Progress across the line
                maxWidth: 'calc(75% - 80px)', // Max width to center of last icon
                boxShadow: '0 0 12px rgba(253, 98, 98, 0.8), 0 0 24px rgba(253, 98, 98, 0.5)',
                filter: 'brightness(1.3)'
              }}
            />
          )}
          
          {emailSecurityNodes.map((node, index) => {
            const Icon = node.icon;
            
            // For "without service", only first and last nodes are active
            const isActiveNode = flowType === 'without' ? (index === 0 || index === 3) : true;
            const isActive = activeNode === node.id && isActiveNode;
            const isCompleted = flowType === 'with' 
              ? completed.includes(node.id) 
              : completed.includes(node.id) && isActiveNode && !failed; // Don't show completed if failed
            const isFailed = failed && index === 3 && flowType === 'without';
            
            // Node is elevated when completed OR being touched (but not both to avoid conflicts)
            const isElevated = isCompleted || (currentNodeBeingTouched === index && flowType === 'with' && showLoadingBar && !isCompleted);
            
            // Middle nodes are grayed out in "without service"
            const isGrayedOut = flowType === 'without' && (index === 1 || index === 2);
            
            // Keep all connectors gray - only loading bar shows progress
            const connectorClass = 'bg-gray-600/30';

            return (
              <div key={`icon-${node.id}`} className="relative flex items-center justify-center z-10 flex-1">
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ease-out ${
                    isGrayedOut
                      ? "bg-gray-800 opacity-30 border border-gray-700"
                      : isFailed
                      ? "bg-red-600 scale-110 shadow-2xl"
                      : isActive
                      ? `${node.color} scale-115 shadow-2xl` 
                      : isElevated
                      ? `${node.color} scale-110 shadow-xl` 
                      : "bg-gray-700 border border-gray-600"
                  }`}
                >
                  {isFailed ? (
                    <div className="text-white text-3xl font-bold">✕</div>
                  ) : isCompleted ? (
                    <CheckCircle className="text-white" size={30} />
                  ) : (
                    <Icon className={`${isGrayedOut ? 'text-gray-600' : 'text-white'}`} size={30} />
                  )}
                  {index < emailSecurityNodes.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute top-1/2 left-full w-12 h-[2px] -translate-y-1/2 ${connectorClass}`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-4 gap-6 text-center">
          {emailSecurityNodes.map((node, index) => {
            const isGrayedOut = flowType === 'without' && (index === 1 || index === 2);
            return (
              <div key={`text-${node.id}`} className="min-h-[60px] flex flex-col justify-center items-center">
                <p className={`text-sm font-bold mb-1 leading-tight ${isGrayedOut ? 'text-gray-600' : 'text-white'}`}>
                  {flowType === 'without' && index === 3 ? 'Send Attempt' : node.name}
                </p>
                <p className={`text-xs leading-tight text-center ${isGrayedOut ? 'text-gray-700' : 'text-gray-300'}`}>
                  {flowType === 'without' && index === 3 ? 'Basic delivery attempt' : 
                   isGrayedOut ? 'Service not available' : node.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 p-4 rounded-2xl border border-gray-600/20 bg-gray-800/30">
        <h4 className="font-semibold text-sm text-white flex items-center gap-2 mb-1">
          <Mail size={16} style={{ color: "#FD6262" }} /> Email Security Status
        </h4>
        <p className="text-xs text-gray-300">
          {!isRunning && completed.length === 0 && !failed && "Click a button to compare email security with and without our service."}
          {isRunning && flowType === 'with' && showLoadingBar && `Processing with OnboardDigital security... ${Math.round(loadingProgress)}% - ${completed.length} steps completed [FAST & SECURE]`}
          {isRunning && flowType === 'without' && loadingProgress === 0 && "Message created, attempting to send..."}
          {isRunning && flowType === 'without' && loadingProgress > 0 && loadingProgress < 100 && `Sending message without security... ${Math.round(loadingProgress)}% [SLOW PROCESSING]`}
          {isRunning && flowType === 'without' && loadingProgress === 100 && !failed && "Processing complete, delivery failed..."}
          {!isRunning && completed.length === emailSecurityNodes.length && flowType === 'with' && "✅ Email delivered securely with OnboardDigital protection!"}
          {!isRunning && failed && flowType === 'without' && "❌ Email delivery failed - security threats detected without protection!"}
        </p>
      </div>
    </div>
  );
};

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
    <div className="w-full bg-gray-900 py-24 px-4 mt-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simplify, Manage, and Automate Your Email Security Journey with OnboardDigital
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
          <motion.button 
            className="bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg border border-gray-500"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgb(220, 38, 38)", // red-600
              borderColor: "rgb(220, 38, 38)",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 20px rgba(220, 38, 38, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              duration: 0.2,
              ease: "easeInOut"
            }}
            onClick={() => window.open('https://www.onboardigital.com/appointment', '_blank')}
          >
            Book a Live Demo
          </motion.button>
        </div>
      </div>
      
      {/* Key Features Section */}
      <div className="w-full bg-gray-900 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Key Features for Digital Transformation and Business Growth
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              Accelerate your digital transformation, enhance operational efficiency, and scale your business with our comprehensive technology solutions and expert guidance.
            </p>
          </div>

          {/* Features Content */}
          <div className="flex justify-center">
            {/* Digital Transformation Services - Centered Stack */}
            <div className="w-full max-w-3xl space-y-4">
              {/* Digital Transformation Services */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-3" style={{ color: "#FD6262" }}>Digital Transformation Services</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Our comprehensive digital transformation solution provides end-to-end modernization of your business processes. From legacy system migration to cloud infrastructure setup, our experts ensure your digital transformation is seamless, secure, and aligned with industry best practices. A dedicated Digital Transformation Specialist supports you every step of the way.
                </p>
                <a href="https://www.onboardigital.com/appointment" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline flex items-center hover:opacity-80 transition-opacity" style={{ color: "#FD6262" }}>
                  Find Out More <span className="ml-1">→</span>
                </a>
              </div>

              {/* Cloud Migration */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                <h3 className="text-lg font-semibold text-white" style={{ color: "#FD6262" }}>Cloud Migration</h3>
              </div>

              {/* Security Assessment */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                <h3 className="text-lg font-semibold text-white" style={{ color: "#FD6262" }}>Security Assessment</h3>
              </div>

              {/* IT Infrastructure Management */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                <h3 className="text-lg font-semibold text-white" style={{ color: "#FD6262" }}>IT Infrastructure Management</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Email Security Compliance Section */}
      <div className="w-full bg-gray-900 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Email Security Compliance Made Easy
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-6">
              Email security compliance is mandatory in many industries globally, as protecting company data and consumer privacy 
              becomes increasingly important. Your business needs to become compliant with regulations quickly, 
              accurately, and without risk, and OnboardDigital makes compliance seamless.
            </p>
            <p className="text-base text-gray-200 font-semibold">
              Here are some of the regulations that mandate email security compliance as best practice:
            </p>
          </div>
          
          {/* Email Security Flow - Centered */}
          <div className="flex justify-center mb-12">
            <EmailSecurityFlow />
          </div>

          {/* Compliance Table */}
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full bg-gray-800 border-collapse">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="px-6 py-4 text-left font-semibold text-lg border-r border-gray-600">REGULATION</th>
                  <th className="px-6 py-4 text-left font-semibold text-lg border-r border-gray-600">WHAT IT MEANS</th>
                  <th className="px-6 py-4 text-left font-semibold text-lg border-r border-gray-600">REGION</th>
                  <th className="px-6 py-4 text-left font-semibold text-lg">INDUSTRY</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-600">
                  <td className="px-6 py-4 border-r border-gray-600">
                    <a href="https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730" target="_blank" rel="noopener noreferrer" className="font-bold text-lg underline cursor-pointer hover:opacity-80 transition-opacity" style={{ color: "#FD6262" }}>Microsoft</a> <span className="text-white">sender requirements</span>
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    Requirement to set up SPF, DKIM, and DMARC for sending domains
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    Global requirement from 5 May 2025
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    All companies sending over 5,000 emails daily that include hotmail.com, live.com, and outlook.com consumer domain addresses
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="px-6 py-4 border-r border-gray-600">
                    <a href="https://support.google.com/a/answer/81126?sjid=8821608630663246210&visit_id=638991497519026819-4252877126&rd=1" target="_blank" rel="noopener noreferrer" className="font-bold text-lg underline cursor-pointer hover:opacity-80 transition-opacity" style={{ color: "#FD6262" }}>Google</a> <span className="text-white"> & </span><a href="https://senders.yahooinc.com/best-practices/" target="_blank" rel="noopener noreferrer" className="font-bold text-lg underline cursor-pointer hover:opacity-80 transition-opacity" style={{ color: "#FD6262" }}>Yahoo</a> <span className="text-white">sender requirements</span>
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    Requirement to set up SPF, DKIM, and DMARC for sending domains
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    Global requirement from February 2024
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    All companies sending over 5,000 emails daily that include Google or Yahoo addresses
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="px-6 py-4 border-r border-gray-600">
                    <a href="https://gdpr.eu/what-is-gdpr/" target="_blank" rel="noopener noreferrer" className="font-bold text-lg underline cursor-pointer hover:opacity-80 transition-opacity" style={{ color: "#FD6262" }}>General Data Protection Regulation (GDPR)</a>
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    Europe's primary data privacy and security law
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    EU countries
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    All industries
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="px-6 py-4 border-r border-gray-600">
                    <a href="https://www.digital-operational-resilience-act.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-lg underline cursor-pointer hover:opacity-80 transition-opacity" style={{ color: "#FD6262" }}>Digital Operational Resilience Act (DORA)</a>
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    Framework to manage ICT cybersecurity risks
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    EU countries from January 2025
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    Financial institutions (insurers, banks, lenders, financial and investment advisors)
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="px-6 py-4 border-r border-gray-600">
                    <a href="https://digital-strategy.ec.europa.eu/en/policies/nis2-directive" target="_blank" rel="noopener noreferrer" className="font-bold text-lg underline cursor-pointer hover:opacity-80 transition-opacity" style={{ color: "#FD6262" }}>Network and Information Security Directive (NIS 2)</a>
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    Revised EU Directive on ICT cybersecurity risks
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    EU countries from October 2024
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    Multiple sectors, including telecoms, ICT, health, energy, chemicals, and manufacturing
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="px-6 py-4 border-r border-gray-600">
                    <a href="https://www.pcisecuritystandards.org/standards/pci-dss/" target="_blank" rel="noopener noreferrer" className="font-bold text-lg underline cursor-pointer hover:opacity-80 transition-opacity" style={{ color: "#FD6262" }}>Payment Card Industry Data Security Standard (PCI DSS 4.0)</a>
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    Technical and operational requirements to protect payment data
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    Global requirement from March 2025
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    All companies processing, storing, or transmitting payment card data
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="px-6 py-4 border-r border-gray-600">
                    <a href="https://www.oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer" className="font-bold text-lg underline cursor-pointer hover:opacity-80 transition-opacity" style={{ color: "#FD6262" }}>California Consumer Privacy Act (CCPA)</a>
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    Provides privacy rights and consumer protection
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    All companies targeting people in California, US
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    All industries
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="px-6 py-4 border-r border-gray-600">
                    <a href="https://www.ftc.gov/business-guidance/privacy-security/gramm-leach-bliley-act" target="_blank" rel="noopener noreferrer" className="font-bold text-lg underline cursor-pointer hover:opacity-80 transition-opacity" style={{ color: "#FD6262" }}>The Gramm-Leach-Bliley Act (GLBA)</a>
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    Safeguards consumers' financial information and requires transparency in how it's shared
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    US
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    Financial institutions (insurers, banks, lenders, financial and investment advisors)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border-r border-gray-600">
                    <a href="https://security.cms.gov/learn/health-insurance-portability-and-accountability-act-1996-hipaa" target="_blank" rel="noopener noreferrer" className="font-bold text-lg underline cursor-pointer hover:opacity-80 transition-opacity" style={{ color: "#FD6262" }}>The Health Insurance Portability and Accountability Act (HIPAA)</a>
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    Establishes standards to protect personal health information
                  </td>
                  <td className="px-6 py-4 text-gray-300 border-r border-gray-600">
                    US
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    Healthcare Industry
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Statistics Section */}
      <div className="w-full bg-gray-900 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Guard Against Financial, Data, and Customer Loss
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              Use OnboardDigital to prevent cybercriminals from sending fraudulent emails to your business partners, employees, 
              and customers from your business email addresses.
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* WE BLOCK */}
            <div className="text-center p-8 border-r border-gray-700 lg:border-r md:border-r-0 lg:border-r">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-white mb-2">WE BLOCK</h3>
                <div className="text-5xl font-bold mb-2" style={{ color: "#FD6262" }}>380K+</div>
                <p className="text-sm text-gray-300 uppercase tracking-wide">
                  DOMAIN SPOOFING ATTEMPTS<br />PER DAY
                </p>
              </div>
            </div>

            {/* WE AUTHENTICATE */}
            <div className="text-center p-8 border-r border-gray-700 lg:border-r md:border-r-0 lg:border-r">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-white mb-2">WE AUTHENTICATE</h3>
                <div className="text-5xl font-bold mb-2" style={{ color: "#FD6262" }}>9B+</div>
                <p className="text-sm text-gray-300 uppercase tracking-wide">
                  EMAILS<br />PER DAY
                </p>
              </div>
            </div>

            {/* WE ANALYZE */}
            <div className="text-center p-8">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-white mb-2">WE ANALYZE</h3>
                <div className="text-5xl font-bold mb-2" style={{ color: "#FD6262" }}>27M+</div>
                <p className="text-sm text-gray-300 uppercase tracking-wide">
                  DATA POINTS<br />PER DAY
                </p>
              </div>
            </div>

            {/* WE SEND */}
            <div className="text-center p-8 border-r border-gray-700 lg:border-r md:border-r-0 lg:border-r">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-white mb-2">WE SEND</h3>
                <div className="text-5xl font-bold mb-2" style={{ color: "#FD6262" }}>180K+</div>
                <p className="text-sm text-gray-300 uppercase tracking-wide">
                  SECURITY REPORTS<br />PER WEEK
                </p>
              </div>
            </div>

            {/* WE CHECK */}
            <div className="text-center p-8 border-r border-gray-700 lg:border-r md:border-r-0 lg:border-r">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-white mb-2">WE CHECK</h3>
                <div className="text-5xl font-bold mb-2" style={{ color: "#FD6262" }}>15K+</div>
                <p className="text-sm text-gray-300 uppercase tracking-wide">
                  PHISHING URLS<br />PER WEEK
                </p>
              </div>
            </div>

            {/* WE MONITOR */}
            <div className="text-center p-8">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-white mb-2">WE MONITOR</h3>
                <div className="text-5xl font-bold mb-2" style={{ color: "#FD6262" }}>14K+</div>
                <p className="text-sm text-gray-300 uppercase tracking-wide">
                  DOMAINS<br />PER WEEK
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer (temporarily hidden) */}
      {false && (
        <div className="w-full bg-gray-900 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              {/* Logo Section */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  {/* Logo Placeholder - Replace with actual logo */}
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <div className="text-black font-bold text-sm">OD</div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">ONBOARD DIGITAL</div>
                    <div className="text-gray-400 text-xs">DIGITAL BUSINESS TRANSFORMATION</div>
                  </div>
                </div>
              </div>

              {/* Vendors Column */}
              <div className="lg:col-span-1">
                <h3 className="text-white font-semibold text-lg mb-4">Vendors</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Microsoft</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">usecure</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Dropsuite</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">ESET</a></li>
                </ul>
              </div>

              {/* Services Column */}
              <div className="lg:col-span-1">
                <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Business Consultant</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Support</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Software and Cloud</a></li>
                </ul>
              </div>

              {/* Cybersecurity Column */}
              <div className="lg:col-span-1">
                <h3 className="text-white font-semibold text-lg mb-4">Cybersecurity</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Security Awareness Training</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Simulated Phishing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Dark Web Monitoring</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Policy Management</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Human Risk Scoring</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">In-Depth Risk Analytics</a></li>
                </ul>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-end mt-8 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017 0z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
