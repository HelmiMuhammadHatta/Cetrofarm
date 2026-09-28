import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Leaf, ShieldCheck, Users, MoveRight, Download, PhoneCall, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { metrics, valueProps, steps, testimonials, articles } from '../data/content'
import { businessLines } from '../data/company'
import { CONTACT } from '../config/contact'
import { getVisibleCertifications, getVisiblePartners } from '../data/credentials'
import { TractionChart } from '../components/TractionChart'
import { NewsletterForm } from '../components/NewsletterForm'
import { CountUp } from '../components/CountUp'
import { useState } from 'react'
import { PdfDownloadModal } from '../components/PdfDownloadModal'
import { trackEvent } from '../utils/analytics'

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const Route = createFileRoute('/')({
  component: Homepage,
  head: () => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://cetrofarm.com';
    return {
      meta: [
        { title: 'Cetrofarm | Ekosistem Agrikultur Terintegrasi' },
        { name: 'description', content: 'Cetrofarm adalah business aggregator agrikultur terintegrasi hulu-hilir di Jawa Tengah. Menyuplai sayuran segar, ubi madu, dan protein hewani berkualitas.' },
        { property: 'og:title', content: 'Cetrofarm | Ekosistem Agrikultur Terintegrasi' },
        { property: 'og:description', content: 'Cetrofarm merawat rantai pasok pangan dari 210+ petani binaan langsung ke pasar B2B.' },
        { property: 'og:image', content: `${siteUrl}/assets/hero-panen-golden-hour.webp` }
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Cetrofarm",
            "legalName": "PT. Cetro Tama Indonesia",
            "url": siteUrl,
            "logo": `${siteUrl}/assets/1706845304_Logo Cetrofarm_Hijau.png`,
            "foundingDate": "2018",
            "identifier": "NIB 9120212080575",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Jl. Setro Raya, Desa Gondoriyo, Kec. Bergas",
              "addressLocality": "Semarang",
              "addressRegion": "Jawa Tengah",
              "postalCode": "50552",
              "addressCountry": "ID"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+62-85-8603-00-111",
              "contactType": "Customer Relations",
              "email": "customerrelation@cetrofarm.com"
            }
          })
        }
      ]
    };
  }
})

const fadeUpVariant = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
}

function Homepage() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[620px] flex items-center pt-10">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero-panen-golden-hour.webp"
            alt="Petani binaan Cetrofarm memanen sayuran saat golden hour"
            fetchPriority="high"
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/30 mix-blend-multiply z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-transparent to-cream z-10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-cream">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
            }}
            className="max-w-3xl"
          >
            <span className="inline-block px-3 py-1 bg-wheat/20 text-wheat rounded-sm text-xs font-bold tracking-widest uppercase mb-4 border border-wheat/30">
              PT. Cetro Tama Indonesia (NIB 9120212080575)
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6 text-cream">
              Membangun Ketahanan Pangan, <span className="text-wheat italic">Satu Panen Sekaligus.</span>
            </h1>
            <p className="text-base md:text-xl text-cream/90 mb-10 max-w-2xl font-light leading-relaxed">
              Cetrofarm merawat rantai pasok pangan dari 210+ petani binaan langsung ke pasar B2B. Memberikan kepastian pasokan bagi offtaker sejak 2018.
            </p>
            <div className="flex flex-wrap gap-4 mb-16 relative z-20">
              <a
                href="/tentang"
                onClick={() => trackEvent('cta_click', { button: 'Lihat Profil' })}
                className="px-6 py-3.5 bg-wheat text-forest font-bold rounded-sm hover:bg-white hover:shadow-lg transition-all flex items-center gap-2 text-sm"
              >
                Lihat Profil Perusahaan <ArrowRight size={18} />
              </a>
              <a
                href="/investor"
                onClick={() => trackEvent('cta_click', { button: 'Peluang Investasi' })}
                className="px-6 py-3.5 bg-transparent border-2 border-cream/80 text-cream font-bold rounded-sm hover:bg-cream/10 transition-all text-sm"
              >
                Peluang Investasi
              </a>
            </div>

            {/* Panel Metrik Validated (Q2 2026) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-cream/20 relative z-20">
              <div>
                <p className="text-3xl md:text-4xl font-serif font-bold text-wheat">
                  <CountUp end={210} suffix="+" />
                </p>
                <p className="text-xs text-cream/90 font-bold uppercase tracking-wider mt-1 mb-0.5">Petani Binaan</p>
                <p className="text-[10px] text-cream/60 italic">{metrics.farmersSource}</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-serif font-bold text-wheat">
                  <CountUp end={340} suffix=" ha" />
                </p>
                <p className="text-xs text-cream/90 font-bold uppercase tracking-wider mt-1 mb-0.5">Lahan Kelola</p>
                <p className="text-[10px] text-cream/60 italic">{metrics.landAreaSource}</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-serif font-bold text-wheat">
                  <CountUp end={businessLines.length} suffix=" lini" />
                </p>
                <p className="text-xs text-cream/90 font-bold uppercase tracking-wider mt-1 mb-0.5">Lini Bisnis</p>
                <p className="text-[10px] text-cream/60 italic">{metrics.productLinesSource}</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-serif font-bold text-wheat">
                  <CountUp end={2018} duration={1.5} />
                </p>
                <p className="text-xs text-cream/90 font-bold uppercase tracking-wider mt-1 mb-0.5">Tahun Berdiri</p>
                <p className="text-[10px] text-cream/60 italic">{metrics.establishedSource}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      {(getVisibleCertifications().length > 0 || getVisiblePartners().length > 0) && (
        <section className="bg-cream py-8 border-b border-forest/10 overflow-hidden">
          <div className="container mx-auto px-4 mb-4">
            <p className="text-center text-forest/70 text-xs font-bold uppercase tracking-widest">
              Dipercaya oleh mitra strategis & sertifikasi mutu resmi
            </p>
          </div>
          <div className="relative flex overflow-x-hidden group">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-12 md:gap-24 opacity-80 transition-all">
              {getVisibleCertifications().map(cert => (
                <span key={cert.id} className="font-serif text-xl font-bold flex items-center gap-2 text-forest mx-4">
                  <ShieldCheck size={22} className="text-forest" /> {cert.label}
                </span>
              ))}
              {getVisiblePartners().map((partner, idx) => (
                <span key={idx} className="font-serif text-xl font-bold text-forest mx-4">
                  Mitra {partner.label}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Value Proposition */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
        className="py-24 bg-cream"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-forest uppercase tracking-widest block mb-2">Keunggulan Utama</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-forest mb-4">Membawa Alam Lebih Dekat</h2>
            <p className="text-forest/80 text-sm leading-relaxed">Kami merawat ekosistem agrikultur terintegrasi yang memberikan nilai tambah terukur di setiap mata rantai.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {valueProps.map((prop, idx) => (
              <div key={idx} className="bg-white p-8 rounded-sm border border-forest/10 text-center shadow-sm">
                <div className="w-14 h-14 bg-forest/10 rounded-full flex items-center justify-center text-forest mb-6 mx-auto">
                  {idx === 0 ? <MoveRight size={26} /> : idx === 1 ? <ShieldCheck size={26} /> : <Users size={26} />}
                </div>
                <h3 className="text-xl font-serif font-bold text-forest mb-3">{prop.title}</h3>
                <p className="text-forest/80 text-sm leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. Supply Chain Ecosystem */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
        className="py-24 bg-forest text-cream"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="text-xs font-bold text-wheat uppercase tracking-widest block mb-2">Model Alur Distribusi</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-cream">Ekosistem Rantai Pasok Terintegrasi</h2>
              <p className="text-cream/80 text-base mb-8 leading-relaxed">
                Menghubungkan kerja keras petani langsung ke pelanggan B2B dengan mengeliminasi perantara tengkulak tradisional.
              </p>
              <div className="space-y-6">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="text-xl font-serif text-wheat font-bold bg-white/10 px-3 py-1 rounded border border-wheat/20">{step.num}</span>
                    <div>
                      <h3 className="text-lg font-bold mb-1 text-cream">{step.title}</h3>
                      <p className="text-cream/70 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-sm overflow-hidden shadow-2xl border border-cream/10">
                <img
                  src="/assets/ilustrasi-rantai-pasok.webp"
                  alt="Diagram Alur Ekosistem Rantai Pasok Cetrofarm"
                  loading="lazy"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. 5 Lini Bisnis Products Preview */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
        className="py-24 bg-cream"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-forest uppercase tracking-widest block mb-1">Portofolio Komoditas</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-forest">{businessLines.length} Lini Bisnis Utama</h2>
            </div>
            <a href="/produk" className="inline-flex items-center gap-2 text-forest font-bold hover:text-forest/80 transition-colors text-sm">
              Lihat Katalog Lengkap <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessLines.map(p => (
              <div key={p.id} className="group block bg-white rounded-sm overflow-hidden border border-forest/10 hover:shadow-xl transition-all flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={p.image}
                    alt={`${p.title} Cetrofarm`}
                    loading="lazy"
                    width={400}
                    height={250}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/placeholder-product.webp';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-forest text-cream px-2.5 py-1 rounded text-xs font-bold">{p.status}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[11px] font-bold uppercase text-forest/60 mb-2">{p.capacity}</span>
                  <h3 className="text-xl font-serif font-bold text-forest mb-2">{p.title}</h3>
                  <p className="text-forest/70 text-xs leading-relaxed mb-6 flex-grow">{p.desc}</p>

                  <div className="pt-4 border-t border-forest/10 flex justify-between items-center text-xs font-bold">
                    <a href={`/produk#${p.id}`} className="text-forest hover:underline">Detail Lini</a>
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Halo Cetrofarm, saya tertarik meminta penawaran B2B untuk ${p.title}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-forest text-cream rounded hover:bg-forest/90 transition-colors"
                    >
                      Penawaran B2B
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 6. Investor Brief Teaser */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
        className="py-24 bg-forest text-cream"
      >
        <div className="container mx-auto px-4 max-w-6xl flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <span className="text-xs font-bold text-wheat uppercase tracking-widest block mb-2">Investor Relations</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-cream">Peluang Pertumbuhan Berkelanjutan</h2>
            <p className="text-cream/80 text-sm md:text-base mb-8 leading-relaxed">
              Model aggregator agrikultur Cetrofarm menawarkan margin stabil, risiko iklim terkurasi lewat greenhouse & diversifikasi lahan, serta skalabilitas bisnis di Pulau Jawa.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/investor" className="px-6 py-3 bg-wheat text-forest font-bold rounded-sm hover:bg-white transition-colors text-sm">
                Lihat Halaman Investor
              </a>
              <button
                onClick={() => setIsPdfModalOpen(true)}
                className="px-6 py-3 border border-cream/30 text-cream font-bold rounded-sm hover:bg-cream/10 transition-colors flex items-center gap-2 text-sm"
              >
                <Download size={16} /> Unduh Company Profile (PDF)
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="bg-white/5 p-6 rounded-sm border border-cream/10">
              <TractionChart />
            </div>
          </div>
        </div>
      </motion.section>

      {/* 7. Articles */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
        className="py-24 bg-cream"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold text-forest uppercase tracking-widest block mb-1">Edukasi & Berita</span>
              <h2 className="text-3xl font-serif font-bold text-forest">Kabar Terbaru Cetrofarm</h2>
            </div>
            <a href="/artikel" className="hidden md:flex items-center gap-2 text-forest font-bold hover:text-forest/80 transition-colors text-sm">
              Lihat Semua Artikel <ArrowRight size={16} />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((art, idx) => (
              <a href={`/artikel/${art.slug}`} key={idx} className="group block bg-white rounded-sm border border-forest/10 overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="overflow-hidden h-48">
                  <img
                    src={art.image}
                    alt={art.title}
                    loading="lazy"
                    width={400}
                    height={250}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-forest/60 font-bold mb-2">{art.date}</p>
                  <h3 className="text-lg font-serif font-bold text-forest group-hover:text-forest/80 transition-colors leading-snug">{art.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 8. Newsletter Band */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
        className="relative py-16 text-cream bg-forest border-t border-forest/20"
      >
        <div className="container mx-auto px-4 text-center relative z-10 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 text-wheat">Tetap Terhubung dengan Inovasi Pangan</h2>
          <p className="mb-8 text-cream/80 text-sm">Dapatkan update panen musim ini dan Ringkasan Investasi langsung ke email Anda.</p>
          <NewsletterForm />
        </div>
      </motion.section>

      {/* Download PDF Modal */}
      <PdfDownloadModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl="/docs/CetroFarm-Company-Profile.pdf"
      />
    </div>
  )
}
