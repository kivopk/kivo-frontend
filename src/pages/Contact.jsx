import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [messageForm, setMessageForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Inquiry',
    message: ''
  });

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-red-600 selection:text-white">
      <Header />

      {/* Page Header */}
      <div className="bg-zinc-950 border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <div className="text-xs font-black uppercase tracking-widest text-red-500">
            Customer Support & City Helplines
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white italic">
            Contact Kivo Gaming
          </h1>
          <p className="text-xs text-gray-400 max-w-lg mx-auto">
            Have questions about console availability, game titles, or express delivery? Call our city helplines or message us on WhatsApp.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 w-full flex-1 space-y-12">
        {/* Helpline Cards matching Sky Games */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lahore Card */}
          <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl space-y-3 relative overflow-hidden group hover:border-red-500 transition-all">
            <div className="w-10 h-10 bg-red-600/20 text-red-500 rounded-xl flex items-center justify-center font-black text-lg mb-2">
              📍
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-red-500 block">Express Hub</span>
            <h3 className="text-xl font-black uppercase text-white">Lahore Store & Helpline</h3>
            <a href="tel:03224200180" className="text-2xl font-black text-white hover:text-red-400 block transition-colors">
              0322 4200180
            </a>
            <p className="text-xs text-gray-400">
              Call anytime from 9 AM to 6 PM. Same-day express dispatch available across all Lahore sectors.
            </p>
          </div>

          {/* Islamabad Card */}
          <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl space-y-3 relative overflow-hidden group hover:border-red-500 transition-all">
            <div className="w-10 h-10 bg-red-600/20 text-red-500 rounded-xl flex items-center justify-center font-black text-lg mb-2">
              📍
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-red-500 block">Express Hub</span>
            <h3 className="text-xl font-black uppercase text-white">Islamabad Store & Helpline</h3>
            <a href="tel:03044036254" className="text-2xl font-black text-white hover:text-red-400 block transition-colors">
              0304 4036254
            </a>
            <p className="text-xs text-gray-400">
              Call anytime from 10 AM to 11 PM. Servicing Islamabad & Rawalpindi with express courier delivery.
            </p>
          </div>

          {/* WhatsApp Quick Connect */}
          <div className="bg-gradient-to-br from-green-950 via-zinc-900 to-black border border-green-500/30 p-6 rounded-2xl space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-green-400 block">Instant Chat</span>
              <h3 className="text-xl font-black uppercase text-white">WhatsApp Live Support</h3>
              <p className="text-xs text-gray-300">
                Chat with our sales team instantly for real-time stock photos, console prices, and digital keys.
              </p>
            </div>
            <a
              href="https://wa.me/923224200180"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-widest text-xs py-3 rounded-xl text-center shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Connect on WhatsApp</span>
              <span>💬</span>
            </a>
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-3xl mx-auto space-y-6">
          <div className="space-y-1 text-center">
            <h3 className="text-xl font-black uppercase tracking-tight text-white italic">Send Us a Direct Message</h3>
            <p className="text-xs text-gray-400">We respond to inquiries within 1 hour during call hours.</p>
          </div>

          {submitted ? (
            <div className="bg-green-500/10 border border-green-500/40 p-6 rounded-xl text-center space-y-2">
              <span className="text-2xl">✅</span>
              <h4 className="text-sm font-black uppercase text-white">Message Received!</h4>
              <p className="text-xs text-gray-300">Thank you. One of our support specialists will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleMessageSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-bold mb-1 uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={messageForm.name}
                    onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-bold mb-1 uppercase tracking-wider">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0322 1234567"
                    value={messageForm.phone}
                    onChange={(e) => setMessageForm({ ...messageForm, phone: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-bold mb-1 uppercase tracking-wider">Message *</label>
                <textarea
                  required
                  rows="4"
                  placeholder="How can we help you today?"
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  className="w-full bg-black border border-white/15 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-600/30 transition-all"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
