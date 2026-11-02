import React from 'react';
import { X, Book, CheckCircle, Clock, Table, Library, ArrowLeftRight, Download, Filter } from 'lucide-react';

export default function Sidebar({
  isOpen,
  onClose,
  activeFilter,
  onSelectFilter,
  selectedGenreFilter,
  onSelectGenreFilter,
  selectedAgeFilter,
  onSelectAgeFilter,
  sortBy,
  onSelectSortBy,
  availableGenres = [],
  availableAgeGroups = [],
  currentLibrary,
  role,
  onChangeLibraryClick,
  onChangeRoleClick,
  totalCount,
  availableCount,
  borrowedCount,
  books = []
}) {
  if (!isOpen) return null;

  const handleExportCsv = () => {
    if (!currentLibrary) return;

    let csvContent = '\uFEFF'; // BOM for UTF-8 in Excel / Google Sheets
    csvContent += 'ID;ISBN;Název;Autor;Rok vydání;Žánr;Věková skupina;Jazyk;Stav;Datum naskenování;Poznámky\n';

    for (const b of books) {
      const escape = (str) => `"${(str || '').replace(/"/g, '""')}"`;
      csvContent += `${b.id};${escape(b.isbn)};${escape(b.title)};${escape(b.author)};${escape(b.year)};${escape(b.genre)};${escape(b.target_age)};${escape(b.language)};${escape(b.status)};${escape(b.scanned_at)};${escape(b.notes)}\n`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeFilename = encodeURIComponent((currentLibrary.name || 'knihovna').replace(/\s+/g, '_'));
    link.setAttribute('href', url);
    link.setAttribute('download', `knihovna_${safeFilename}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-80 max-w-[80vw] bg-[#e8f1f5] h-full shadow-2xl border-r border-[#c5d9e4] flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="p-4 bg-[#0f766e] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Book className="w-5 h-5" />
            <h2 className="font-serif font-bold text-lg">Knihovnička</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Library badge */}
        {currentLibrary && (
          <div className="p-4 bg-[#d5e5ed] border-b border-[#c5d9e4]">
            <div className="text-xs text-[#264653] font-semibold uppercase tracking-wider mb-1">
              Vybraná knihovna
            </div>
            <div className="font-bold text-[#102a43] text-base truncate">
              {currentLibrary.name}
            </div>
            <button
              onClick={() => {
                onClose();
                onChangeLibraryClick();
              }}
              className="mt-2 text-xs text-[#0f766e] hover:underline font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <Library className="w-3.5 h-3.5" />
              <span>Změnit knihovnu</span>
            </button>
          </div>
        )}

        {/* Main Navigation Categories */}
        <div className="p-4 flex-1 overflow-y-auto space-y-6">
          <div>
            <div className="text-xs font-bold text-[#45677a] uppercase tracking-wider mb-2 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Kategorie & Filtry</span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onSelectFilter('all');
                  onClose();
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between transition-colors cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#0f766e] text-white font-bold'
                    : 'text-[#102a43] hover:bg-[#d5e5ed]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Book className="w-4 h-4" />
                  <span>Všechny knihy v knihovně</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-black/10">
                  {totalCount}
                </span>
              </button>

              <button
                onClick={() => {
                  onSelectFilter('Dostupná');
                  onClose();
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between transition-colors cursor-pointer ${
                  activeFilter === 'Dostupná'
                    ? 'bg-[#0f766e] text-white font-bold'
                    : 'text-[#102a43] hover:bg-[#d5e5ed]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Dostupné knihy</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-black/10">
                  {availableCount}
                </span>
              </button>

              <button
                onClick={() => {
                  onSelectFilter('Půjčená');
                  onClose();
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between transition-colors cursor-pointer ${
                  activeFilter === 'Půjčená'
                    ? 'bg-[#0f766e] text-white font-bold'
                    : 'text-[#102a43] hover:bg-[#d5e5ed]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>Nedostupné (půjčené)</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-black/10">
                  {borrowedCount}
                </span>
              </button>
            </div>
          </div>

          {/* Genre & Age Filtering */}
          <div className="space-y-3 border-t border-[#c5d9e4] pt-4">
            <div>
              <label className="block text-xs font-bold text-[#45677a] uppercase tracking-wider mb-1.5">
                Filtrovat podle žánru
              </label>
              <select
                value={selectedGenreFilter}
                onChange={(e) => onSelectGenreFilter(e.target.value)}
                className="w-full p-2 bg-[#f4f8fb] text-[#102a43] text-xs font-semibold rounded-xl border border-[#7895a6] focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
              >
                <option value="all">Všechny žánry</option>
                {availableGenres.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#45677a] uppercase tracking-wider mb-1.5">
                Cílová věková skupina
              </label>
              <select
                value={selectedAgeFilter}
                onChange={(e) => onSelectAgeFilter(e.target.value)}
                className="w-full p-2 bg-[#f4f8fb] text-[#102a43] text-xs font-semibold rounded-xl border border-[#7895a6] focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
              >
                <option value="all">Všechny věkové skupiny</option>
                {availableAgeGroups.map((age) => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#45677a] uppercase tracking-wider mb-1.5">
                Řazení knih
              </label>
              <select
                value={sortBy}
                onChange={(e) => onSelectSortBy(e.target.value)}
                className="w-full p-2 bg-[#f4f8fb] text-[#102a43] text-xs font-semibold rounded-xl border border-[#7895a6] focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
              >
                <option value="newest">Nejnověji přidané</option>
                <option value="title">Podle názvu (A-Z)</option>
                <option value="author">Podle autora (A-Z)</option>
                <option value="year">Podle roku vydání (od nejnovějších)</option>
              </select>
            </div>
          </div>

          {/* Google Sheets Integration Section */}
          <div className="border-t border-[#c5d9e4] pt-4">
            <div className="text-xs font-bold text-[#45677a] uppercase tracking-wider mb-2 flex items-center space-x-1">
              <Table className="w-3.5 h-3.5" />
              <span>Google Tabulka & Export</span>
            </div>

            {currentLibrary?.google_sheet_url ? (
              <a
                href={currentLibrary.google_sheet_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left px-3 py-2.5 bg-[#2f855a] hover:bg-[#276749] text-white rounded-xl font-bold text-sm flex items-center justify-between shadow-xs transition-colors mb-2 cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <Table className="w-4 h-4" />
                  <span>Otevřít Google Tabulku</span>
                </div>
                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded">↗</span>
              </a>
            ) : null}

            <button
              onClick={handleExportCsv}
              className="w-full text-left px-3 py-2.5 bg-[#e8f1f5] hover:bg-[#d5e5ed] border border-[#7895a6] text-[#102a43] rounded-xl font-semibold text-sm flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#0f766e]" />
              <span>Stáhnout tabulku (CSV / Excel)</span>
            </button>
            <p className="text-[11px] text-[#45677a] mt-1.5 leading-snug">
              Exportujte kompletní seznam knih ve formátu CSV pro vložení do Google Tabulek.
            </p>
          </div>
        </div>

        {/* Footer Role Switcher */}
        <div className="p-4 bg-[#d5e5ed] border-t border-[#c5d9e4]">
          <div className="flex items-center justify-between text-xs text-[#264653] mb-2 font-semibold">
            <span>Aktivní režim:</span>
            <span className="px-2 py-0.5 bg-[#0f766e] text-white rounded font-bold">
              {role === 'librarian' ? 'Knihovník' : 'Čtenář'}
            </span>
          </div>
          <button
            onClick={() => {
              onClose();
              onChangeRoleClick();
            }}
            className="w-full py-2 px-3 bg-[#f4f8fb] hover:bg-white text-[#102a43] border border-[#7895a6] rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#0f766e]" />
            <span>Přepnout režim (Knihovník / Čtenář)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
