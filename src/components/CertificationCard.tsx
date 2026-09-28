import { ShieldCheck, Award, FileCheck2, ExternalLink } from 'lucide-react';

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  grade: string;
  validUntil: string;
  certNumber: string;
  desc?: string;
  documentUrl?: string;
}

interface CertificationCardProps {
  cert: CertificationItem;
}

export function CertificationCard({ cert }: CertificationCardProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'halal':
        return <Award size={32} className="text-wheat" />;
      case 'nkv':
        return <FileCheck2 size={32} className="text-wheat" />;
      case 'organik':
      default:
        return <ShieldCheck size={32} className="text-wheat" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-sm shadow-md flex flex-col border-t-4 border-wheat hover:shadow-lg transition-all border border-forest/10 h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-forest rounded-full flex items-center justify-center shrink-0 shadow-inner">
          {getIcon(cert.id)}
        </div>
        <div>
          <h3 className="text-lg font-serif font-bold text-forest leading-snug">{cert.name}</h3>
          <p className="text-xs font-semibold text-forest/70">{cert.issuer}</p>
        </div>
      </div>

      {cert.desc && (
        <p className="text-xs text-forest/80 mb-4 leading-relaxed flex-grow">
          {cert.desc}
        </p>
      )}

      <div className="w-full bg-cream/70 p-3 rounded-sm mb-4 border border-forest/5 font-mono text-xs">
        <span className="block text-[10px] text-forest/60 uppercase tracking-widest font-sans font-bold mb-1">
          Nomor Registrasi Resmi
        </span>
        <span className="text-forest font-bold select-all break-all">
          {(cert as any).verified ? cert.certNumber : '[Dalam Proses Verifikasi]'}
        </span>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-forest/10 text-xs">
        <div>
          <span className="text-forest/60 text-[10px] uppercase block">Kualifikasi</span>
          <span className="text-forest font-bold uppercase">{cert.grade}</span>
        </div>
        <div className="text-right">
          <span className="text-forest/60 text-[10px] uppercase block">Masa Berlaku</span>
          <span className="text-forest font-bold">s/d {cert.validUntil}</span>
        </div>
      </div>

      {cert.documentUrl && (
        <a 
          href={cert.documentUrl} 
          target="_blank" 
          rel="noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2 bg-cream text-forest text-xs font-bold rounded-sm border border-forest/20 hover:bg-forest hover:text-cream transition-colors"
        >
          <ExternalLink size={14} /> Lihat Dokumen Sertifikat
        </a>
      )}
    </div>
  );
}
