'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast() {
  const { toast, clearToast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-xl border text-sm font-medium ${
          toast.type === 'success'
            ? 'bg-[#102B5C] text-white border-[#173C78]'
            : toast.type === 'error'
            ? 'bg-rose-900 text-white border-rose-800'
            : 'bg-[#173C78] text-white border-[#102B5C]'
        }`}
      >
        {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#EC70C9] shrink-0" />}
        {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-300 shrink-0" />}
        {toast.type === 'info' && <Info className="w-5 h-5 text-[#E9D9FF] shrink-0" />}
        <span className="flex-1 leading-snug">{toast.message}</span>
        <button
          onClick={clearToast}
          className="text-white/70 hover:text-white p-1 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
