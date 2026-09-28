import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Search, PackageCheck, Truck, ShieldCheck, ArrowRight, PhoneCall } from 'lucide-react'
import { businessLines } from '../data/company'
import { getVisibleCertifications } from '../data/credentials'
import { CONTACT } from '../config/contact'
import { CertificationCard } from '../components/CertificationCard'

export const Route = createFileRoute('/produk')({
  component: ProdukPage,
  head: () => ({
    meta: [
      { title: 'Katalog Produk Agrikultur & Bahan Pokok | Cetrofarm' },
      { name: 'description', content: 'Katalog 5 lini bisnis Cetrofarm: sayuran segar organik, root & buah, ubi madu, protein hewani ayam kampung, dan bahan pokok grosir.' },
      { property: 'og:title', content: 'Katalog Produk Agrikultur & Bahan Pokok | Cetrofarm' },
      { property: 'og:description', content: 'Sayuran segar, ubi madu premium, dan protein hewani terintegrasi dari hulu ke hilir.' }
    ]
  })
})

const fadeUpVariant = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

function ProdukPage() {
  return (
    <div className="w-full bg-cream min-h-screen pt-32 pb-24">
      {/* 1. Intro Section */}
      <motion.section initial="hidden" animate="visible" variants={fadeUpVariant} className="container mx-auto px-4 max-w-4xl text-center mb-16">
        <span className="inline-block px-3 py-1 bg-forest/10 text-forest rounded-sm text-xs font-bold tracking-widest uppercase mb-4">
          5 Lini Bisnis Utama
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-forest mb-6 leading-tight">
          Katalog Produk & Komoditas Pangan
        </h1>
        <p className="text-forest/80 text-lg leading-relaxed max-w-2xl mx-auto">
          Cetrofarm mengelola 5 lini bisnis komoditas pangan dari lahan binaan tersertifikasi untuk memenuhi kebutuhan ritel modern, industri HORECA, dan pasar B2B.
        </p>
      </motion.section>

      {/* 2. 5 Business Lines Grid */}
      <section className="container mx-auto px-4 max-w-6xl mb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessLines.map((line, idx) => (
            <motion.div 
              key={line.id} 
              id={line.id}
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
              }}
              className="bg-white rounded-sm shadow-md border border-forest/10 overflow-hidden flex flex-col hover:shadow-xl transition-all group"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={line.image} 
                  alt={`${line.title} — Cetrofarm`}
                  loading="lazy" 
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/placeholder-product.webp';
                  }}
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2.5 py-1 rounded-sm text-xs font-bold ${line.status === 'Berjalan' ? 'bg-forest text-cream' : 'bg-wheat text-forest'}`}>
                    {line.status}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-forest/60 bg-cream px-2 py-0.5 rounded border border-forest/10">
                    Kapasitas: {line.capacity}
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-forest mb-3 leading-snug">{line.title}</h2>
                <p className="text-forest/80 text-sm leading-relaxed mb-6 flex-grow">{line.desc}</p>
                
                <div className="pt-4 border-t border-forest/10 flex flex-col gap-2">
                  <span className="text-[10px] text-forest/50 italic">{line.source}</span>
                  <a 
                    href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Halo Cetrofarm, saya ingin meminta penawaran B2B untuk lini produk: ${line.title}`)}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-2.5 bg-forest text-cream font-bold rounded-sm text-xs hover:bg-forest/90 transition-colors"
                  >
                    <PhoneCall size={14} /> Minta Penawaran B2B
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Traceability Section */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="bg-forest text-cream py-24 mb-24">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl font-serif font-bold mb-4 text-wheat">Transparansi Rantai Pasok (Traceability)</h2>
          <p className="text-cream/80 text-base mb-16 max-w-2xl mx-auto">
            Setiap kelompok produk kami dapat dilacak asal-usul lahannya untuk menjamin keamanan pangan dan konsistensi pasokan bagi mitra kami.
          </p>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-wheat/30 -translate-y-1/2 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-forest-deep rounded-full border-2 border-wheat flex items-center justify-center mb-4 shadow-lg">
                <Search className="text-wheat" size={26} />
              </div>
              <h3 className="font-bold text-lg mb-1">1. Seleksi Lahan</h3>
              <p className="text-xs text-cream/70">Bibit ditanam di lahan binaan bersertifikasi.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-forest-deep rounded-full border-2 border-wheat flex items-center justify-center mb-4 shadow-lg">
                <ShieldCheck className="text-wheat" size={26} />
              </div>
              <h3 className="font-bold text-lg mb-1">2. Quality Control</h3>
              <p className="text-xs text-cream/70">Sortasi ketat di fasilitas terpusat.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-forest-deep rounded-full border-2 border-wheat flex items-center justify-center mb-4 shadow-lg">
                <PackageCheck className="text-wheat" size={26} />
              </div>
              <h3 className="font-bold text-lg mb-1">3. Batch Tracking</h3>
              <p className="text-xs text-cream/70">Pengemasan higienis dengan sistem barcode.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-forest-deep rounded-full border-2 border-wheat flex items-center justify-center mb-4 shadow-lg">
                <Truck className="text-wheat" size={26} />
              </div>
              <h3 className="font-bold text-lg mb-1">4. Logistik Rantai Dingin</h3>
              <p className="text-xs text-cream/70">Pengiriman cold chain langsung ke offtaker.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. Certifications Section (Icon & Text based) */}
      {getVisibleCertifications().length > 0 && (
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-forest uppercase tracking-widest block mb-2">Jaminan Mutu Resmi</span>
            <h2 className="text-3xl font-serif font-bold text-forest mb-4">Sertifikasi & Kepatuhan Standar</h2>
            <div className="w-24 h-1 bg-wheat mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {getVisibleCertifications().map((cert) => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  )
}
