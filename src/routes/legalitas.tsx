import { createFileRoute } from '@tanstack/react-router'
import { getVisibleCertifications } from '../data/credentials'

export const Route = createFileRoute('/legalitas')({
  component: LegalitasPage,
  head: () => ({
    meta: [
      { title: 'Legalitas & Sertifikasi | Cetrofarm' },
      { name: 'description', content: 'Dokumen legalitas dan sertifikasi mutu PT. Cetro Tama Indonesia (Cetrofarm).' },
      { property: 'og:title', content: 'Legalitas & Sertifikasi | Cetrofarm' },
    ]
  })
})

function LegalitasPage() {
  return (
    <div className="w-full bg-cream min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-forest uppercase tracking-widest block mb-2">Transparansi Kepatuhan</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-forest mb-4">Legalitas & Sertifikasi</h1>
          <p className="text-forest/70 max-w-2xl mx-auto text-sm">
            Sebagai perusahaan agrikultur terintegrasi yang terpercaya, kami mematuhi standar hukum dan mutu nasional.
          </p>
        </div>

        {/* NIB Section */}
        <div className="bg-white p-8 rounded-sm shadow-md border border-forest/10 mb-12">
          <h2 className="text-2xl font-serif font-bold text-forest mb-4">Legalitas Perusahaan</h2>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="font-bold text-forest mb-1">PT. Cetro Tama Indonesia (Cetrofarm)</h3>
              <p className="text-forest/70 text-sm mb-4">Terdaftar resmi di Kemenkumham RI</p>
              
              <div className="bg-cream/50 p-4 rounded border border-forest/5">
                <span className="text-xs font-bold uppercase text-forest/60 block mb-1">Nomor Induk Berusaha (NIB)</span>
                <span className="text-lg font-bold text-forest tracking-wide">9120212080575</span>
              </div>
            </div>
            <div className="h-48 bg-forest/5 flex items-center justify-center rounded border border-forest/10 relative overflow-hidden">
              {/* Slot bukti NIB */}
              <span className="text-forest/40 font-bold text-sm z-10">[ISI: Bukti NIB / PDF Thumbnail]</span>
              <img src="/assets/placeholder-document.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-serif font-bold text-forest mb-6">Sertifikasi Standar Mutu</h2>
        {getVisibleCertifications().length === 0 ? (
          <div className="bg-white p-8 rounded-sm shadow-sm border border-forest/10 text-center text-forest/70 text-sm">
            [Dokumen sertifikasi resmi sedang dalam tahap finalisasi verifikasi oleh tim legal]
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleCertifications().map(cert => (
              <div key={cert.id} className="bg-white rounded-sm shadow-md border border-forest/10 overflow-hidden flex flex-col">
                <div className="h-40 bg-forest/5 flex items-center justify-center border-b border-forest/10 relative">
                   <span className="text-forest/40 font-bold text-xs text-center px-4 z-10">[ISI: Sertifikat {cert.label}]</span>
                   <img src="/assets/placeholder-document.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
                </div>
                <div className="p-6">
                  <span className="inline-block px-2 py-1 bg-forest/10 text-forest text-[10px] font-bold uppercase tracking-wider rounded mb-3">
                    {cert.issuer}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-forest mb-2">{cert.label}</h3>
                  <p className="text-xs text-forest/80 mb-2 font-mono">
                    No: {cert.verified ? cert.certNumber : '[Dalam Proses Verifikasi]'}
                  </p>
                  <p className="text-xs text-forest/60 leading-relaxed mb-4">{cert.desc}</p>
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-forest/50">Status: {cert.verified ? 'Terverifikasi' : 'Pending Verifikasi'}</span>
                    <span className="text-wheat">Hingga {cert.validUntil}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
