import { useState, useEffect } from 'react';
import { X, Download, CheckCircle, ShieldCheck } from 'lucide-react';
import { submitInvestor } from '../server/actions';

interface PdfDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
}

export function PdfDownloadModal({ isOpen, onClose, pdfUrl = "/docs/CetroFarm-Company-Profile.pdf" }: PdfDownloadModalProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setErrorMessage('');

    // Honeypot check
    if (honeypot) {
      setSubmitStatus('error');
      setErrorMessage('Terdeteksi aktivitas mencurigakan.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const company = formData.get('company') as string;

    try {
      const res = await submitInvestor({
        data: {
          name: name || 'Calon Investor',
          email,
          company: company || 'Independen',
          message: `Permintaan Unduh Company Profile PDF via Modal. Company: ${company || '-'}`
        }
      });

      if (res.success) {
        setSubmitStatus('success');
        // Open official PDF in new tab
        window.open(pdfUrl, '_blank');
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(res.error || 'Gagal memproses permintaan.');
      }
    } catch (err) {
      // Direct fallback download if server action fails
      window.open(pdfUrl, '_blank');
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white text-forest w-full max-w-md rounded-sm shadow-2xl relative border border-forest/10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-forest/50 hover:text-forest transition-colors p-1"
          aria-label="Tutup"
        >
          <X size={20} />
        </button>
        
        <div className="p-8">
          <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center text-forest mb-4">
            <Download size={24} />
          </div>

          <h2 className="text-2xl font-serif font-bold mb-2 text-forest">Minta & Unduh Company Profile</h2>
          <p className="text-forest/70 text-sm mb-6 leading-relaxed">
            Isi data diri singkat Anda untuk mendapatkan dokumen resmi profil perusahaan & ringkasan investasi CetroFarm (PDF).
          </p>

          {submitStatus === 'success' ? (
            <div className="bg-wheat/20 text-forest p-4 rounded-sm font-medium text-center flex flex-col items-center gap-2 border border-wheat/30">
              <CheckCircle size={32} className="text-forest" />
              <p className="font-bold text-sm">Dokumen sedang dibuka di tab baru!</p>
              <p className="text-xs text-forest/70">Terima kasih atas minat Anda pada CetroFarm.</p>
            </div>
          ) : (
            <form 
              action={import.meta.env.VITE_FORM_ENDPOINT || '#'} 
              method="POST" 
              onSubmit={() => {
                setTimeout(() => { window.open(pdfUrl, '_blank'); onClose(); }, 500);
              }}
              className="space-y-4"
            >
              <input type="hidden" name="form_type" value="investor" />
              
              {/* Anti-spam honeypot */}
              <input 
                type="text" 
                name="_gotcha" 
                className="hidden" 
                tabIndex={-1} 
                autoComplete="off" 
              />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Nama Lengkap *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest" 
                  placeholder="Misal: Budi Santoso"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Email Kerja / Pribadi *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest" 
                  placeholder="nama@perusahaan.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Nama Institusi / Perusahaan</label>
                <input 
                  type="text" 
                  name="company"
                  className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest" 
                  placeholder="Misal: VC Partner / PT Mandiri"
                />
              </div>

              <div className="text-[11px] text-forest/70 leading-relaxed">
                Dengan mengklik unduh, Anda menyetujui <a href="/kebijakan-privasi" target="_blank" className="underline font-bold text-forest hover:text-wheat">Kebijakan Privasi</a> Cetrofarm.
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 bg-forest text-cream font-bold rounded-sm hover:bg-forest/90 transition-colors mt-4 text-sm flex items-center justify-center gap-2"
              >
                <Download size={16} /> Unduh PDF Sekarang
              </button>

              <div className="flex items-center gap-1 justify-center text-[11px] text-forest/60 pt-2">
                <ShieldCheck size={14} /> Data Anda aman & bebas spam.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
