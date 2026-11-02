import React from 'react';
import { X, Book, User, Calendar, Tag, Globe, Users, CheckCircle2, Clock, Barcode, Trash2, Edit3 } from 'lucide-react';

export default function BookDetailModal({ book, isOpen, onClose, role, onToggleStatus, onEdit, onDelete }) {
  if (!isOpen || !book) return null;

  const isAvailable = book.status === 'Dostupná';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-[#f4f8fb] border-2 border-[#0f766e]/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#c5d9e4] mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-[#0f766e] text-white rounded-xl">
              <Book className="w-6 h-6" />
            </div>
            <div>
              <span
                className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold mb-1 ${
                  isAvailable
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                {isAvailable ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Dostupná v knihovně</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Momentálně půjčená</span>
                  </>
                )}
              </span>
              <h2 className="font-serif font-bold text-xl text-[#102a43] leading-snug">
                {book.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#e8f1f5] text-[#264653] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Grid */}
        <div className="space-y-3 text-sm text-[#102a43] mb-6">
          <div className="flex items-center space-x-2 bg-[#e8f1f5] p-2.5 rounded-xl border border-[#c5d9e4]">
            <User className="w-4 h-4 text-[#0f766e] shrink-0" />
            <span className="font-semibold text-xs text-[#264653]">Autor:</span>
            <span className="font-bold">{book.author || 'Neuveden'}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2 bg-[#e8f1f5] p-2.5 rounded-xl border border-[#c5d9e4]">
              <Calendar className="w-4 h-4 text-[#0f766e] shrink-0" />
              <span className="font-semibold text-xs text-[#264653]">Rok:</span>
              <span className="font-bold">{book.year || 'Neuveden'}</span>
            </div>

            <div className="flex items-center space-x-2 bg-[#e8f1f5] p-2.5 rounded-xl border border-[#c5d9e4]">
              <Globe className="w-4 h-4 text-[#0f766e] shrink-0" />
              <span className="font-semibold text-xs text-[#264653]">Jazyk:</span>
              <span className="font-bold">{book.language || 'Čeština'}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2 bg-[#e8f1f5] p-2.5 rounded-xl border border-[#c5d9e4]">
              <Tag className="w-4 h-4 text-[#0f766e] shrink-0" />
              <span className="font-semibold text-xs text-[#264653]">Žánr:</span>
              <span className="font-bold truncate">{book.genre || 'Neuveden'}</span>
            </div>

            <div className="flex items-center space-x-2 bg-[#e8f1f5] p-2.5 rounded-xl border border-[#c5d9e4]">
              <Users className="w-4 h-4 text-[#0f766e] shrink-0" />
              <span className="font-semibold text-xs text-[#264653]">Věk:</span>
              <span className="font-bold truncate">{book.target_age || 'Všechny věkové kateg.'}</span>
            </div>
          </div>

          {book.isbn && (
            <div className="flex items-center space-x-2 bg-[#e8f1f5] p-2.5 rounded-xl border border-[#c5d9e4]">
              <Barcode className="w-4 h-4 text-[#0f766e] shrink-0" />
              <span className="font-semibold text-xs text-[#264653]">ISBN:</span>
              <span className="font-mono font-bold text-xs">{book.isbn}</span>
            </div>
          )}

          {book.notes && (
            <div className="bg-[#e8f1f5] p-3 rounded-xl border border-[#c5d9e4] text-xs">
              <span className="font-bold text-[#264653] block mb-1">Poznámky:</span>
              <p className="italic text-[#102a43]">{book.notes}</p>
            </div>
          )}
        </div>

        {/* Actions for Librarian */}
        {role === 'librarian' ? (
          <div className="pt-3 border-t border-[#c5d9e4] flex flex-col space-y-2">
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  onToggleStatus(book);
                  onClose();
                }}
                className={`flex-1 py-3 rounded-xl font-bold text-sm text-white shadow-md transition-colors cursor-pointer ${
                  isAvailable ? 'bg-amber-700 hover:bg-amber-800' : 'bg-emerald-700 hover:bg-emerald-800'
                }`}
              >
                {isAvailable ? 'Označit jako Půjčenou' : 'Označit jako Dostupnou'}
              </button>
            </div>

            <div className="flex space-x-2 pt-1">
              {onEdit && (
                <button
                  onClick={() => {
                    onClose();
                    onEdit(book);
                  }}
                  className="flex-1 py-2.5 bg-[#e8f1f5] hover:bg-[#d5e5ed] text-[#102a43] border border-[#7895a6] font-bold rounded-xl text-xs flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-[#0f766e]" />
                  <span>Upravit informace o knize</span>
                </button>
              )}

              {onDelete && (
                <button
                  onClick={() => {
                    onDelete(book.id);
                    onClose();
                  }}
                  className="px-4 py-2.5 bg-red-100 hover:bg-red-200 text-red-800 font-bold rounded-xl text-xs flex items-center space-x-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Smazat</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#0f766e] hover:bg-[#115e59] text-white font-bold rounded-xl shadow-md text-sm cursor-pointer"
          >
            Zavřít detail
          </button>
        )}
      </div>
    </div>
  );
}
