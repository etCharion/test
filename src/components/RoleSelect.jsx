import React from 'react';
import { BookOpen, User, BookCheck, Sparkles } from 'lucide-react';

export default function RoleSelect({ onSelectRole }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-[#f4f8fb] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#d5e5ed] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#c5d9e4] rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-md w-full text-center relative z-10">
        {/* Header Branding */}
        <div className="inline-flex items-center justify-center p-4 bg-[#0f766e] text-white rounded-2xl shadow-lg mb-6 transform hover:rotate-2 transition-transform">
          <BookOpen className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-[#102a43] mb-2 tracking-tight">
          Knihovnička
        </h1>
        <p className="text-[#264653] text-base mb-8 italic">
          Chytrý knižní skener & katalog pro přehlednou správu vaší knihovny
        </p>

        {/* Role Cards */}
        <div className="space-y-4">
          <button
            onClick={() => onSelectRole('librarian')}
            className="w-full bg-[#e8f1f5] hover:bg-[#d5e5ed] border-2 border-[#0f766e]/30 hover:border-[#0f766e] text-[#102a43] p-5 rounded-2xl shadow-md transition-all text-left flex items-center space-x-4 group cursor-pointer"
          >
            <div className="p-3 bg-[#0f766e] text-white rounded-xl group-hover:scale-105 transition-transform">
              <BookCheck className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-[#102a43]">Přihlásit jako knihovník</span>
                <Sparkles className="w-4 h-4 text-[#0f766e]" />
              </div>
              <p className="text-xs text-[#264653] mt-0.5">
                Skenování čárových kódů, zadávání ISBN a správa výpůjček
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectRole('reader')}
            className="w-full bg-[#e8f1f5] hover:bg-[#d5e5ed] border-2 border-[#264653]/20 hover:border-[#264653] text-[#102a43] p-5 rounded-2xl shadow-md transition-all text-left flex items-center space-x-4 group cursor-pointer"
          >
            <div className="p-3 bg-[#264653] text-white rounded-xl group-hover:scale-105 transition-transform">
              <User className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <span className="font-bold text-lg text-[#102a43]">Vstoupit jako čtenář</span>
              <p className="text-xs text-[#264653] mt-0.5">
                Prohlížení seznamu registrovaných knihoven a dostupnosti knih
              </p>
            </div>
          </button>
        </div>

        <div className="mt-10 text-xs text-[#45677a] border-t border-[#c5d9e4] pt-4">
          📚 Navrženo s láskou pro čtenáře a knihovníky
        </div>
      </div>
    </div>
  );
}
