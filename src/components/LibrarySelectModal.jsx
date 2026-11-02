import React, { useState, useEffect } from 'react';
import { Library, Plus, ArrowRight, Table } from 'lucide-react';

const DEFAULT_LIBRARIES = [
  {
    id: 1,
    name: 'Moje Domácí Knihovna',
    google_sheet_url: '',
    created_at: new Date().toISOString()
  }
];

export default function LibrarySelectModal({ role, currentLibrary, onSelectLibrary }) {
  const [libraries, setLibraries] = useState([]);
  const [newLibraryName, setNewLibraryName] = useState('');
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLibraries();
  }, []);

  const loadLibraries = () => {
    setLoading(true);
    try {
      const saved = localStorage.getItem('knihovnicka_libraries');
      if (saved) {
        setLibraries(JSON.parse(saved));
      } else {
        localStorage.setItem('knihovnicka_libraries', JSON.stringify(DEFAULT_LIBRARIES));
        setLibraries(DEFAULT_LIBRARIES);
      }
    } catch (err) {
      console.error('Chyba při načítání knihoven z LocalStorage:', err);
      setLibraries(DEFAULT_LIBRARIES);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (lib) => {
    onSelectLibrary(lib);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newLibraryName.trim()) {
      setError('Zadejte název knihovny');
      return;
    }

    try {
      const saved = localStorage.getItem('knihovnicka_libraries');
      const currentLibs = saved ? JSON.parse(saved) : DEFAULT_LIBRARIES;

      const newLib = {
        id: Date.now(),
        name: newLibraryName.trim(),
        google_sheet_url: googleSheetUrl.trim(),
        created_at: new Date().toISOString()
      };

      const updatedLibs = [...currentLibs, newLib];
      localStorage.setItem('knihovnicka_libraries', JSON.stringify(updatedLibs));
      setLibraries(updatedLibs);
      onSelectLibrary(newLib);
    } catch (err) {
      setError('Chyba při ukládání knihovny do LocalStorage');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-[#f4f8fb] border-2 border-[#0f766e]/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 bg-[#0f766e] text-white rounded-xl">
            <Library className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-[#102a43]">
              {role === 'librarian' ? 'Výběr nebo přidání knihovny' : 'Vyberte knihovnu'}
            </h2>
            <p className="text-xs text-[#264653]">
              {role === 'librarian'
                ? 'Zadejte název vaší knihovny nebo vyberte ze seznamu'
                : 'Zvolte knihovnu, jejíž fond chcete prozkoumat'}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-800 text-xs p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Existing Libraries List */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-[#264653] uppercase tracking-wider mb-2">
            Registrované knihovny ({libraries.length})
          </label>

          {loading ? (
            <div className="text-center py-6 text-sm text-[#264653]">Načítání knihoven...</div>
          ) : libraries.length === 0 ? (
            <div className="text-center py-6 bg-[#e8f1f5] rounded-xl text-sm text-[#264653] border border-dashed border-[#7895a6]">
              Zatím nebyla vytvořena žádná knihovna.
            </div>
          ) : (
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {libraries.map((lib) => (
                <button
                  key={lib.id}
                  onClick={() => handleSelect(lib)}
                  className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                    currentLibrary?.id === lib.id
                      ? 'bg-[#0f766e] text-white border-[#0f766e]'
                      : 'bg-[#e8f1f5] hover:bg-[#d5e5ed] text-[#102a43] border-[#c5d9e4]'
                  }`}
                >
                  <span className="font-semibold">{lib.name}</span>
                  <div className="flex items-center space-x-2 text-xs">
                    {lib.google_sheet_url && (
                      <span className={`px-2 py-0.5 rounded flex items-center gap-1 ${currentLibrary?.id === lib.id ? 'bg-white/20 text-white' : 'bg-[#264653]/10 text-[#264653]'}`}>
                        <Table className="w-3 h-3" /> Tabulka
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Create Library section for Librarian or option */}
        {role === 'librarian' && (
          <div className="border-t border-[#c5d9e4] pt-4">
            {!isCreating ? (
              <button
                onClick={() => setIsCreating(true)}
                className="w-full py-2.5 px-4 bg-[#e8f1f5] hover:bg-[#d5e5ed] border border-[#7895a6] text-[#102a43] font-semibold rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#0f766e]" />
                <span>Přidat novou knihovnu</span>
              </button>
            ) : (
              <form onSubmit={handleCreate} className="space-y-3 bg-[#e8f1f5] p-4 rounded-xl border border-[#c5d9e4]">
                <h3 className="font-bold text-sm text-[#102a43]">Vytvořit novou knihovnu</h3>
                <div>
                  <label className="block text-xs font-semibold text-[#264653] mb-1">
                    Název knihovny *
                  </label>
                  <input
                    type="text"
                    value={newLibraryName}
                    onChange={(e) => setNewLibraryName(e.target.value)}
                    placeholder="např. Městská knihovna Praha"
                    className="w-full p-2.5 text-sm bg-[#f4f8fb] border border-[#7895a6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#264653] mb-1">
                    Odkaz na Google Tabulku / Webhook (Volitelné)
                  </label>
                  <input
                    type="url"
                    value={googleSheetUrl}
                    onChange={(e) => setGoogleSheetUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="w-full p-2.5 text-sm bg-[#f4f8fb] border border-[#7895a6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                  />
                  <p className="text-[10px] text-[#45677a] mt-1">
                    Vložte odkaz na vaši Google Tabulku pro snadný přístup z menu.
                  </p>
                </div>
                <div className="flex space-x-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 bg-[#0f766e] hover:bg-[#115e59] text-white py-2 rounded-lg font-bold text-xs shadow-sm cursor-pointer"
                  >
                    Vytvořit a vybrat
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-3 py-2 bg-[#c5d9e4] text-[#102a43] rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Zrušit
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
