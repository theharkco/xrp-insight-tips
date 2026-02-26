"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Types
interface TipOption {
  id: string;
  title: string;
  amount: number;
  icon: string;
  description: string;
}

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedTip, setSelectedTip] = useState<TipOption | null>(null);
  
  const tipOptions: TipOption[] = [
    {
      id: 'creator',
      title: 'Content Creator Tip',
      amount: 0.01,
      icon: '🌟',
      description: 'Support your favorite creators with a small tip',
    },
    {
      id: 'article',
      title: 'Article Access',
      amount: 0.50,
      icon: '📚',
      description: 'Pay for premium content and articles',
    },
    {
      id: 'subscription',
      title: 'Monthly Subscription',
      amount: 9.99,
      icon: '💎',
      description: 'Join our premium membership program',
    },
  ];

  const handleTip = async (tip: TipOption) => {
    setSelectedTip(tip);
    setIsProcessing(true);

    try {
      const response = await fetch('/api/tips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientAddress: 'rNPSAg97w2j2g8fC1fC1fC1fC1fC1fC1fC', // Demo recipient
          amount: tip.amount,
          type: tip.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setIsProcessing(false);
          setSelectedTip(null);
        }, 3000);
      } else {
        alert(`Transaction failed: ${data.error}`);
        setIsProcessing(false);
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ripple-orange via-ripple-gold to-gray-900 text-white overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-ripple-orange rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-ripple-gold rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-ripple-orange rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center backdrop-blur-sm bg-gray-900/30 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-ripple-orange to-ripple-gold rounded-xl flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-ripple-orange">Ripple</span>Pay
            </h1>
            <p className="text-xs text-gray-400">XRP Micropayments</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link href="#" className="hover:text-ripple-gold transition-colors duration-300 font-medium">Features</Link>
          <Link href="#" className="hover:text-ripple-gold transition-colors duration-300 font-medium">How it works</Link>
          <Link href="#" className="hover:text-ripple-gold transition-colors duration-300 font-medium">Developers</Link>
        </nav>
        <button className="bg-gradient-to-r from-ripple-gold to-yellow-400 text-gray-900 px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-ripple-gold/30 transition-all duration-300 transform hover:scale-105">
          Connect Wallet
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 bg-ripple-orange/20 rounded-full border border-ripple-orange/30">
            <span className="text-ripple-gold font-medium">⚡ Lightning Fast XRP Payments</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
            Micropayments with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ripple-orange via-ripple-gold to-yellow-400">XRP</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Lightning-fast, low-cost transactions for content creators and businesses.
            Powered by the XRP Ledger - enterprise-grade security with instant settlement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <button 
              onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-ripple-orange to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-ripple-orange/40 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
            <button className="bg-gray-800/50 backdrop-blur-md border border-ripple-gold/30 text-ripple-gold px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-300 hover:border-ripple-gold">
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { label: 'Transaction Speed', value: '< 4 seconds' },
              { label: 'Transaction Fee', value: '~0.00001 XRP' },
              { label: 'Global Reach', value: '24/7' },
              { label: 'Security', value: 'Enterprise Grade' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-ripple-gold mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why <span className="text-ripple-gold">RipplePay</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Lightning Fast',
                desc: 'Transactions settle in seconds, not days. Perfect for micropayments and real-time applications.',
              },
              {
                icon: '💰',
                title: 'Low Cost',
                desc: 'Near-zero transaction fees. Keep more of your earnings with costs as low as 0.00001 XRP.',
              },
              {
                icon: '🛡️',
                title: 'Secure',
                desc: 'Built on the XRP Ledger - enterprise-grade security with immutable transaction history.',
              },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 hover:border-ripple-orange/50 transition-all duration-300 hover:shadow-xl hover:shadow-ripple-orange/20 group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-ripple-gold transition-colors">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo-section" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Try Our <span className="text-ripple-gold">Demo</span></h2>
            <p className="text-xl text-gray-300">Send XRP tips instantly with our testnet integration</p>
          </div>

          {/* Success Alert */}
          {showSuccess && (
            <div className="fixed top-24 right-8 z-50 bg-green-500/90 backdrop-blur text-white p-6 rounded-2xl shadow-2xl animate-slide-in-right max-w-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Success!</h3>
                  <p className="opacity-90">XRP tip sent successfully</p>
                </div>
              </div>
            </div>
          )}

          {/* Card */}
          <div className="bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-ripple-orange animate-pulse"></div>
              <h3 className="text-xl font-semibold">XRP Tip Demo</h3>
              <span className="ml-auto text-sm text-gray-400 bg-gray-900/50 px-3 py-1 rounded-full">Testnet</span>
            </div>

            <div className="space-y-4">
              {tipOptions.map((tip) => (
                <div 
                  key={tip.id}
                  className="flex items-center justify-between p-6 bg-gray-700/50 hover:bg-gray-700/80 rounded-xl transition-all duration-300 border border-white/5 hover:border-ripple-gold/30 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-ripple-orange/20 to-ripple-gold/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {tip.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{tip.title}</h4>
                      <p className="text-sm text-gray-400">{tip.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-2xl font-bold text-ripple-gold">{tip.amount} XRP</span>
                    <button
                      onClick={() => handleTip(tip)}
                      disabled={isProcessing}
                      className={`
                        px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2
                        ${isProcessing 
                          ? 'bg-ripple-orange/50 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-ripple-orange to-ripple-gold text-gray-900 hover:shadow-lg hover:shadow-ripple-orange/30 hover:scale-105'
                        }
                      `}
                    >
                      {isProcessing ? (
                        <>
                          <span className="animate-spin">⚡</span>
                          Processing...
                        </>
                      ) : (
                        <>
                          Tip <span className="font-light opacity-70">→</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Section */}
            <div className="mt-8 p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">Demo Mode</h4>
                  <p className="text-sm text-blue-200/80 leading-relaxed">
                    This is a demonstration using XRP testnet. No real XRP is used. For production 
                    transactions, you'll need to connect your own wallet and configure real network credentials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-br from-ripple-orange/20 to-ripple-gold/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-ripple-gold">revolutionize</span> payments?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of content creators and businesses already using RipplePay for 
            lightning-fast, low-cost XRP transactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-ripple-gold text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 transition-all duration-300 hover:shadow-xl hover:shadow-ripple-gold/40">
              Start Using Now
            </button>
            <button className="bg-transparent border-2 border-ripple-gold text-ripple-gold px-8 py-4 rounded-full text-lg font-bold hover:bg-ripple-gold/10 transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 text-center text-gray-400 border-t border-white/10 bg-gray-900">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-ripple-orange to-ripple-gold rounded-lg flex items-center justify-center">
            <span className="text-xl">⚡</span>
          </div>
          <span className="text-ripple-orange font-bold">RipplePay</span>
        </div>
        <p className="mb-6">Powered by XRP Ledger</p>
        <div className="flex justify-center gap-8 mb-6">
          <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
          <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
        </div>
        <p className="text-sm opacity-50">
          © {new Date().getFullYear()} RipplePay. All rights reserved.
        </p>
      </footer>

      {/* Custom CSS for blob animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}