import React, { useState, useEffect } from 'react';
import { X, BookPlus, Check, Save, Sparkles, Tag, Users, Globe, Calendar, User, Book } from 'lucide-react';

export default function BookFormModal({ isOpen, initialData, onClose, onSave, libraryName }) {
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author: '',
    year: '',
    genre: '',
    target_age: 'Všechny věkové kategorie',
    language: 'Čeština',
    status: 'Dostupná',
    notes: ''
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        isbn: initialData.isbn || '',
        title: initialData.title || '',
        author: initialData.author || '',
        year: initialData.year || '',
        genre: initialData.genre || '',
        target_age: initialData.target_age || 'Všechny věkové kategorie',
        language: initialData.language || 'Čeština',
        status: initialData.status || 'Dostupná',
        notes: initialData.notes || ''
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Název knihy je povinný');
      return;
    }

    setSaving(true);
    setError('');
    try {
      await onSave(formData);
    } catch (err) {
      setError(err.message || 'Chyba při ukládání knihy');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-[#f4f8fb] border-2 border-[#0f766e]/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#c5d9e4] mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2.5 bg-[#0f766e] text-white rounded-xl">
              <BookPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-[#102a43]">
                Potvrdit nebo upravit údaje o knize
              </h2>
              <p className="text-xs text-[#264653]">
                Knihovna: <span className="font-semibold text-[#0f766e]">{libraryName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#e8f1f5] text-[#264653] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-800 text-xs p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-[#102a43]">
          {/* Název knihy */}
          <div>
            <label className="block text-[#264653] mb-1 font-bold flex items-center space-x-1">
              <Book className="w-3.5 h-3.5 text-[#0f766e]" />
              <span>Název knihy *</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2.5 text-sm bg-[#e8f1f5] border border-[#7895a6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
              required
            />
          </div>

          {/* Autor */}
          <div>
            <label className="block text-[#264653] mb-1 font-bold flex items-center space-x-1">
              <User className="w-3.5 h-3.5 text-[#0f766e]" />
              <span>Autor</span>
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Jméno a příjmení autora"
              className="w-full p-2.5 text-sm bg-[#e8f1f5] border border-[#7895a6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Rok vydání */}
            <div>
              <label className="block text-[#264653] mb-1 font-bold flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-[#0f766e]" />
                <span>Rok vydání</span>
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="např. 2021"
                className="w-full p-2.5 text-sm bg-[#e8f1f5] border border-[#7895a6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
              />
            </div>

            {/* Jazyk */}
            <div>
              <label className="block text-[#264653] mb-1 font-bold flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-[#0f766e]" />
                <span>Jazyk</span>
              </label>
              <input
                type="text"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                placeholder="Čeština, Angličtina..."
                className="w-full p-2.5 text-sm bg-[#e8f1f5] border border-[#7895a6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Žánr */}
            <div>
              <label className="block text-[#264653] mb-1 font-bold flex items-center space-x-1">
                <Tag className="w-3.5 h-3.5 text-[#0f766e]" />
                <span>Žánr</span>
              </label>
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                placeholder="Román, Pohádky, Sci-fi..."
                className="w-full p-2.5 text-sm bg-[#e8f1f5] border border-[#7895a6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
              />
            </div>

            {/* Cílová skupina věková */}
            <div>
              <label className="block text-[#264653] mb-1 font-bold flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-[#0f766e]" />
                <span>Cílová věková skupina</span>
              </label>
              <select
                value={formData.target_age}
                onChange={(e) => setFormData({ ...formData, target_age: e.target.value })}
                className="w-full p-2.5 text-sm bg-[#e8f1f5] border border-[#7895a6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
              >
                <option value="Děti (0-12 let)">Děti (0-12 let)</option>
                <option value="Mládež (12-18 let)">Mládež (12-18 let)</option>
                <option value="Dospělí">Dospělí</option>
                <option value="Všechny věkové kategorie">Všechny věkové kategorie</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* ISBN */}
            <div>
              <label className="block text-[#264653] mb-1 font-bold">
                ISBN číslo
              </label>
              <input
                type="text"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                placeholder="ISBN kód"
                className="w-full p-2.5 text-sm bg-[#e8f1f5] border border-[#7895a6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
              />
            </div>

            {/* Stav výpůjčky */}
            <div>
              <label className="block text-[#264653] mb-1 font-bold">
                Počáteční stav
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-2.5 text-sm bg-[#e8f1f5] border border-[#7895a6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
              >
                <option value="Dostupná">Dostupná (v knihovně)</option>
                <option value="Půjčená">Půjčená (nedostupná)</option>
              </select>
            </div>
          </div>

          {/* Submit buttons */}
          <div className="pt-3 border-t border-[#c5d9e4] flex space-x-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#0f766e] hover:bg-[#115e59] text-white py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Ukládám...' : 'Uložit knihu do knihovny'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 bg-[#c5d9e4] hover:bg-[#9bb5c3] text-[#102a43] font-bold rounded-xl text-sm transition-colors cursor-pointer"
            >
              Zrušit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
