'use client';

import { useState } from 'react';

export default function Home() {
  const [insight, setInsight] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [tipping, setTipping] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [tipSuccess, setTipSuccess] = useState(false);

  const handleGenerateSummary = async () => {
    if (!insight.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ insight })
      });
      
      const data = await response.json();
      if (data.success) {
        setSummary(data.summary);
      }
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTip = async () => {
    if (!recipient || !amount) return;
    
    setTipping(true);
    try {
      const response = await fetch('/api/tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientAddress: recipient,
          amount: parseFloat(amount),
          insightId: 'mock-insight-1'
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setTipSuccess(true);
        setRecipient('');
        setAmount('');
      }
    } catch (error) {
      console.error('Error sending tip:', error);
    } finally {
      setTipping(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎭 XRP Insight Tips
          </h1>
          <p className="text-xl text-gray-300">
            Share insights, get AI summaries, and tip in XRP
          </p>
        </div>

        {/* Insight Input */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Share Your Insight</h2>
          <textarea
            value={insight}
            onChange={(e) => setInsight(e.target.value)}
            placeholder="Enter your thought, observation, or idea..."
            className="w-full h-32 bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleGenerateSummary}
            disabled={loading || !insight.trim()}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? '🤖 Processing...' : '✨ Generate AI Summary'}
          </button>
        </div>

        {/* AI Summary */}
        {summary && (
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-purple-500/30">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              🤖 AI Summary
            </h2>
            <p className="text-lg text-gray-200">{summary}</p>
          </div>
        )}

        {/* XRP Tipping */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">💎 Tip in XRP</h2>
          
          {tipSuccess ? (
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-green-400 font-semibold">✅ XRP tip sent successfully!</p>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Recipient XRP Address"
                className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount (XRP)"
                step="0.01"
                min="0.01"
                className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleTip}
                disabled={tipping || !recipient || !amount}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {tipping ? '⛽ Processing...' : '💎 Send XRP Tip'}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>Built with Next.js 14 + XRP Ledger + AI 🚀</p>
          <p className="mt-2">Deployable on Coolify with nixpacks</p>
          <p className="mt-1">v1.1.0</p>
        </div>
      </div>
    </main>
  );
}