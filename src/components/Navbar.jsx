import React from 'react';
import { BookMarked, BookOpen, Search, Library, Table } from 'lucide-react';

export default function Navbar({
  onOpenSidebar,
  currentLibrary,
  onOpenLibraryModal,
  role,
  searchQuery,
  onSearchChange
}) {
  return (
    <header className="bg-[#264653] text-[#e8f1f5] sticky top-0 z-30 shadow-md border-b-2 border-[#0f766e]">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Left Side: Category Menu (Book icon) & App Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenSidebar}
            className="p-2 bg-[#0f766e] hover:bg-[#115e59] text-white rounded-xl transition-colors cursor-pointer flex items-center space-x-1 shadow-sm"
            title="Otevřít menu kategorií a filtrů"
          >
            <BookMarked className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-[#0f766e] text-white rounded-lg hidden sm:flex">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg sm:text-xl text-white tracking-tight leading-none">
                Knihovnička
              </h1>
              {currentLibrary && (
                <button
                  onClick={onOpenLibraryModal}
                  className="text-xs text-[#c5d9e4] hover:text-white flex items-center space-x-1 cursor-pointer"
                >
                  <Library className="w-3 h-3" />
                  <span className="truncate max-w-[120px] sm:max-w-[200px] font-medium">
                    {currentLibrary.name}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="flex-1 max-w-xs sm:max-w-md mx-2">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7895a6] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Hledat podle názvu, autora, ISBN..."
              className="w-full bg-[#e8f1f5] text-[#102a43] text-xs sm:text-sm pl-9 pr-3 py-1.5 rounded-xl border border-[#7895a6] focus:outline-none focus:ring-2 focus:ring-[#0f766e] placeholder-[#587486]"
            />
          </div>
        </div>

        {/* Right Side: Role badge / Google Sheet quick link */}
        <div className="flex items-center space-x-2">
          {currentLibrary?.google_sheet_url && (
            <a
              href={currentLibrary.google_sheet_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#2f855a] hover:bg-[#276749] text-white rounded-xl text-xs font-bold hidden md:flex items-center space-x-1 transition-colors cursor-pointer"
              title="Otevřít Google Tabulku"
            >
              <Table className="w-4 h-4" />
              <span>Google Tabulka</span>
            </a>
          )}

          <div className="px-2.5 py-1 bg-[#0f766e] text-white text-xs font-bold rounded-lg shadow-xs hidden xs:block">
            {role === 'librarian' ? 'Knihovník' : 'Čtenář'}
          </div>
        </div>
      </div>
    </header>
  );
}
