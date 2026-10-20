'use client';

import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email is required';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim()) errs.message = 'Message cannot be empty';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="bg-[#F8F9FF] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#173C78] bg-[#F3ECFF] px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#EC70C9]" />
            <span>Customer Service & Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#102B5C] tracking-tight">
            Contact Saverz Supermarket
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            Have questions about an order, product availability, or local delivery in Model Colony? Get in touch with our team.
          </p>
        </div>

        {/* Contact Grid: Info Cards + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Official Store Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Store Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-[#102B5C] pb-4 border-b border-slate-100 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#EC70C9]" />
                <span>Store Location</span>
              </h2>

              <div className="mt-4 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <div>
                  <strong className="block text-[#102B5C] font-bold text-sm mb-1">
                    Saverz Supermarket
                  </strong>
                  <p>W53M+77F, Liaquat Ali Khan Rd</p>
                  <p>Model Colony Sheet 4 Lasi Para</p>
                  <p>Karachi, Pakistan</p>
                </div>

                <a
                  href="https://maps.google.com/?q=W53M%2B77F%2C+Liaquat+Ali+Khan+Rd%2C+Model+Colony+Sheet+4+Lasi+Para%2C+Karachi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173C78] hover:text-[#EC70C9] transition-colors pt-2"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Direct Phone Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-[#102B5C] pb-4 border-b border-slate-100 flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#173C78]" />
                <span>Phone Helpline</span>
              </h2>

              <div className="mt-4 text-xs sm:text-sm text-slate-600">
                <p className="mb-2">Click to dial our customer support desk:</p>
                <a
                  href="tel:02134500444"
                  className="inline-flex items-center gap-2 text-xl font-black text-[#102B5C] hover:text-[#EC70C9] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#EC70C9]" />
                  <span>(021) 34500444</span>
                </a>
                <p className="text-xs text-slate-400 mt-2">
                  Operating 7 days a week: 9:00 AM – 11:00 PM
                </p>
              </div>
            </div>

            {/* Store Hours Card */}
            <div className="bg-[#102B5C] text-white rounded-3xl p-6 sm:p-8 shadow-lg">
              <div className="flex items-center gap-2 text-[#EC70C9] text-xs font-bold uppercase mb-2">
                <Clock className="w-4 h-4" />
                <span>Supermarket Working Hours</span>
              </div>
              <h3 className="text-xl font-black text-white">Monday – Sunday</h3>
              <p className="text-sm text-slate-200 mt-1">9:00 AM – 11:00 PM</p>
              <p className="text-xs text-slate-300 mt-4 pt-4 border-t border-[#173C78]">
                Open on all public holidays and weekends for your convenience.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
            <h2 className="text-xl font-bold text-[#102B5C] mb-1">Send Us a Message</h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Fill out the form below. For immediate order updates, please call (021) 34500444.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#F3ECFF] border border-[#E9D9FF] text-center flex flex-col items-center justify-center gap-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#EC70C9]" />
                <h3 className="text-xl font-bold text-[#102B5C]">
                  Message Received (Demo Mode)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                  Thank you for reaching out to Saverz Supermarket. Since this is a frontend prototype, your submission has been processed locally without external email dispatch.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold text-[#173C78] hover:underline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-[#EC70C9]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Your full name"
                      className={`w-full bg-[#F8F9FF] border rounded-xl px-4 py-2.5 text-xs text-[#102B5C] focus:outline-none focus:bg-white transition-colors ${
                        errors.fullName ? 'border-rose-400' : 'border-slate-200 focus:border-[#173C78]'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-[#EC70C9]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className={`w-full bg-[#F8F9FF] border rounded-xl px-4 py-2.5 text-xs text-[#102B5C] focus:outline-none focus:bg-white transition-colors ${
                        errors.email ? 'border-rose-400' : 'border-slate-200 focus:border-[#173C78]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-[#EC70C9]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="03xx xxxxxxx"
                      className={`w-full bg-[#F8F9FF] border rounded-xl px-4 py-2.5 text-xs text-[#102B5C] focus:outline-none focus:bg-white transition-colors ${
                        errors.phone ? 'border-rose-400' : 'border-slate-200 focus:border-[#173C78]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
                      Subject <span className="text-[#EC70C9]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Order inquiry, product question..."
                      className={`w-full bg-[#F8F9FF] border rounded-xl px-4 py-2.5 text-xs text-[#102B5C] focus:outline-none focus:bg-white transition-colors ${
                        errors.subject ? 'border-rose-400' : 'border-slate-200 focus:border-[#173C78]'
                      }`}
                    />
                    {errors.subject && <p className="text-[11px] text-rose-600 mt-1">{errors.subject}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
                    Your Message <span className="text-[#EC70C9]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry or order details..."
                    className={`w-full bg-[#F8F9FF] border rounded-xl px-4 py-2.5 text-xs text-[#102B5C] focus:outline-none focus:bg-white transition-colors resize-none ${
                      errors.message ? 'border-rose-400' : 'border-slate-200 focus:border-[#173C78]'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-rose-600 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#173C78] hover:bg-[#102B5C] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4 text-[#EC70C9]" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Embedded Google Map Frame */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-[#102B5C]">
                Store Map & Surroundings
              </h3>
              <p className="text-xs text-slate-500">
                Liaquat Ali Khan Rd, Model Colony Sheet 4 Lasi Para, Karachi
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=W53M%2B77F%2C+Liaquat+Ali+Khan+Rd%2C+Model+Colony+Sheet+4+Lasi+Para%2C+Karachi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#173C78] hover:text-[#EC70C9] flex items-center gap-1"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative">
            <iframe
              title="Saverz Supermarket Model Colony Karachi"
              src="https://maps.google.com/maps?q=Model+Colony+Karachi+Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
