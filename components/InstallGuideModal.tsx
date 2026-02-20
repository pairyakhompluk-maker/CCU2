
import React, { useState } from 'react';
import { X, Share, MoreVertical, Download, Apple, Chrome, Copy, Check, QrCode, AlertCircle, ExternalLink } from 'lucide-react';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstallGuideModal: React.FC<InstallGuideModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // QR Code URL (using a public API)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">ติดตั้ง CareEase</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[75vh] space-y-6">
          {/* Important Warning */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold text-amber-800">สำคัญมาก!</p>
              <p className="text-amber-700">ห้ามติดตั้งผ่านแอป <span className="font-bold">LINE</span> หรือ <span className="font-bold">Facebook</span> เพราะระบบจะไม่อนุญาต</p>
            </div>
          </div>

          {/* Copy Link Section */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-gray-700">1. คัดลอกลิงก์ไปเปิดในเบราว์เซอร์หลัก</p>
            <div className="flex gap-2">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-400 truncate flex items-center">
                {currentUrl}
              </div>
              <button 
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white'}`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'คัดลอกแล้ว' : 'คัดลอก'}
              </button>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-gray-50 p-6 rounded-[2rem] flex flex-col items-center text-center space-y-4 border border-gray-100">
            <QrCode className="w-6 h-6 text-gray-400" />
            <p className="text-sm font-bold text-gray-800">2. หรือสแกน QR Code นี้บนมือถือ</p>
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
              <img src={qrCodeUrl} alt="QR Code to Install" className="w-32 h-32" />
            </div>
            <p className="text-[10px] text-gray-400">สแกนเพื่อเปิดแอปบน Safari หรือ Chrome</p>
          </div>

          {/* Device Specific Guides */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold text-sm">
                <Apple className="w-4 h-4" /> iPhone
              </div>
              <p className="text-[10px] text-blue-600 leading-relaxed">
                เปิดใน <span className="font-bold">Safari</span> เท่านั้น <br/>
                กดปุ่ม <Share className="w-3 h-3 inline" /> <br/>
                เลือก <span className="font-bold">"Add to Home Screen"</span>
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <div className="flex items-center gap-2 mb-2 text-orange-700 font-bold text-sm">
                <Chrome className="w-4 h-4" /> Android
              </div>
              <p className="text-[10px] text-orange-600 leading-relaxed">
                เปิดใน <span className="font-bold">Chrome</span> <br/>
                กด <MoreVertical className="w-3 h-3 inline" /> <br/>
                เลือก <span className="font-bold text-gray-800 italic">"ติดตั้งแอป"</span>
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-transform"
          >
            เข้าใจแล้ว
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallGuideModal;
