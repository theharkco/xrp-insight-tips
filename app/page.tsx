import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ripple-orange via-ripple-gold to-gray-900 text-white">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="text-ripple-orange">Ripple</span>Pay
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="#" className="hover:text-ripple-gold transition">Features</Link>
          <Link href="#" className="hover:text-ripple-gold transition">How it works</Link>
          <Link href="#" className="hover:text-ripple-gold transition">Developers</Link>
        </nav>
        <button className="bg-ripple-gold text-gray-900 px-4 py-2 rounded-full hover:bg-yellow-400 transition">
          Connect Wallet
        </button>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Micropayments with <span className="text-ripple-gold">XRP</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Lightning-fast, low-cost transactions for content creators and businesses.
          Powered by the XRP Ledger.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-ripple-orange text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 transition">
            Get Started
          </button>
          <button className="border-2 border-ripple-gold text-ripple-gold px-8 py-4 rounded-full text-lg font-semibold hover:bg-ripple-gold hover:text-gray-900 transition">
            View Demo
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-16">Why RipplePay?</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">
              Transactions settle in seconds, not days. Perfect for micropayments.
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-2xl font-bold mb-2">Low Cost</h3>
            <p className="text-gray-400">
              Near-zero transaction fees. Keep more of your earnings.
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="text-2xl font-bold mb-2">Secure</h3>
            <p className="text-gray-400">
              Built on the XRP Ledger - enterprise-grade security.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">Try Our Demo</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
              <span>Content Creator Tip</span>
              <button className="bg-ripple-gold text-gray-900 px-6 py-2 rounded font-semibold">
                Tip $0.01
              </button>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
              <span>Article Access</span>
              <button className="bg-ripple-gold text-gray-900 px-6 py-2 rounded font-semibold">
                Pay $0.50
              </button>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
              <span>Monthly Subscription</span>
              <button className="bg-ripple-orange text-white px-6 py-2 rounded font-semibold">
                Subscribe $9.99
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-gray-400">
        <p className="mb-4">Powered by XRP Ledger</p>
        <div className="flex justify-center gap-6">
          <Link href="#" className="hover:text-white transition">Twitter</Link>
          <Link href="#" className="hover:text-white transition">GitHub</Link>
          <Link href="#" className="hover:text-white transition">Documentation</Link>
        </div>
      </footer>
    </div>
  );
}