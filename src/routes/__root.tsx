import { HeadContent, Scripts, Outlet, createRootRoute } from '@tanstack/react-router'
import * as React from 'react'
import { ShieldCheck, Menu, X, Globe } from 'lucide-react'
import { FloatingWhatsApp } from '../components/FloatingWhatsApp'
import { I18nProvider, useI18n } from '../context/i18n'
import { CONTACT } from '../config/contact'

import '../styles.css'

function NotFound() {
  return (
    <div className="w-full bg-cream min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-serif font-bold text-forest mb-4">404</h1>
      <h2 className="text-2xl font-bold text-forest mb-6">Halaman Tidak Ditemukan</h2>
      <p className="text-forest/70 mb-8 max-w-md">
        Maaf, halaman yang Anda cari mungkin telah dipindahkan atau tidak lagi tersedia.
      </p>
      <a href="/" className="px-8 py-3 bg-forest text-cream font-bold rounded-sm hover:bg-forest/90 transition-colors">
        Kembali ke Beranda
      </a>
    </div>
  )
}

export const Route = createRootRoute({
  head: () => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://cetrofarm.com';
    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:image', content: `${siteUrl}/assets/og-image.png` },
        { property: 'og:title', content: 'Cetrofarm - Agrikultur Terintegrasi Indonesia' },
        { property: 'og:description', content: 'Cetrofarm merawat rantai pasok pangan dari petani binaan sampai meja konsumen. Memberikan kepastian bagi offtaker dan kesejahteraan bagi petani.' },
        { name: 'description', content: 'Perusahaan agrikultur terintegrasi yang menghubungkan petani lokal dengan offtaker ritel, hotel, dan restoran. Sertifikasi organik dan standar mutu tinggi.' },
      ],
      links: [
        { rel: 'icon', href: '/assets/favicon.png', type: 'image/png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossOrigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:ital,wght@0,300..900;1,300..900&display=swap',
        },
        { rel: 'canonical', href: siteUrl }
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PT. Cetro Tama Indonesia (Cetrofarm)",
            "url": siteUrl,
            "logo": `${siteUrl}/assets/favicon.png`,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": CONTACT.whatsapp.display,
              "email": CONTACT.email,
              "contactType": "customer service"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Jl. Setro Raya, Desa Gondoriyo, Kec. Bergas",
              "addressLocality": "Semarang",
              "addressRegion": "Jawa Tengah",
              "postalCode": "50552",
              "addressCountry": "ID"
            }
          }),
        },
      ],
    };
  },
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <I18nProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </I18nProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <HeadContent />
        <script src="https://forminit.com/sdk/v1/forminit.js"></script>
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <Scripts />
      </body>
    </html>
  )
}

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { language, setLanguage, t } = useI18n();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-forest/20 bg-forest text-cream">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between relative">
        <a href="/" className="block hover:opacity-80 transition-opacity">
          <img src="/assets/CETRALOG.png" alt="Cetrofarm" className="h-12 md:h-16 w-auto object-contain" />
        </a>
        
        {/* Navigasi Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <div className="relative group py-6 -my-6">
            <a href="/tentang" className="hover:text-wheat transition-colors">{t('nav.tentang')}</a>
            <div className="absolute top-full left-0 mt-0 w-48 bg-forest border border-cream/10 rounded-b shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col z-50 text-cream py-2">
              <a href="/tentang" className="px-4 py-2 hover:bg-cream/10 transition-colors text-sm">Profil Perusahaan</a>
              <a href="/manajemen" className="px-4 py-2 hover:bg-cream/10 transition-colors text-sm">Manajemen</a>
              <a href="/legalitas" className="px-4 py-2 hover:bg-cream/10 transition-colors text-sm">Legalitas</a>
            </div>
          </div>
          <a href="/ekosistem" className="hover:text-wheat transition-colors">{t('nav.ekosistem')}</a>
          <a href="/produk" className="hover:text-wheat transition-colors">{t('nav.produk')}</a>
          <a href="/investor" className="hover:text-wheat transition-colors">{t('nav.investor')}</a>
          <a href="/artikel" className="hover:text-wheat transition-colors">{t('nav.artikel')}</a>
          <a href="/kontak" className="hover:text-wheat transition-colors">{t('nav.kontak')}</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <a 
            href={CONTACT.retailShopUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-3.5 py-1.5 border border-cream/40 text-cream hover:bg-wheat hover:text-forest rounded-sm transition-all font-bold text-xs"
          >
            Belanja Ritel 🛒
          </a>
          <a href="/penawaran" className="hidden lg:inline-flex px-4 py-2 bg-cream text-forest rounded-sm hover:bg-wheat transition-all font-bold text-xs">
            Penawaran (RFQ)
          </a>
          {/* <button 
            onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
            className="flex items-center gap-1 px-2 py-1 rounded-sm border border-cream/30 hover:bg-cream/10 transition-colors"
          >
            <Globe size={16} />
            <span className="text-sm font-bold uppercase">{language}</span>
          </button> */}
          {/* Tombol Toggle Menu Mobile */}
          <button 
            className="md:hidden p-2 text-cream hover:text-wheat transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Dropdown Navigasi Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-forest border-t border-cream/10 shadow-lg z-40">
          <nav className="flex flex-col px-4 py-6 gap-2 text-base font-medium">
            <a href="/tentang" className="hover:text-wheat transition-colors block py-3 border-b border-cream/10" onClick={() => setIsMobileMenuOpen(false)}>Tentang (Profil)</a>
            <a href="/manajemen" className="hover:text-wheat transition-colors block py-3 border-b border-cream/10 pl-4 text-sm" onClick={() => setIsMobileMenuOpen(false)}>└ Manajemen</a>
            <a href="/legalitas" className="hover:text-wheat transition-colors block py-3 border-b border-cream/10 pl-4 text-sm" onClick={() => setIsMobileMenuOpen(false)}>└ Legalitas</a>
            <a href="/ekosistem" className="hover:text-wheat transition-colors block py-3 border-b border-cream/10" onClick={() => setIsMobileMenuOpen(false)}>Ekosistem</a>
            <a href="/produk" className="hover:text-wheat transition-colors block py-3 border-b border-cream/10" onClick={() => setIsMobileMenuOpen(false)}>Produk</a>
            <a href="/investor" className="hover:text-wheat transition-colors block py-3 border-b border-cream/10" onClick={() => setIsMobileMenuOpen(false)}>Investor</a>
            <a href="/artikel" className="hover:text-wheat transition-colors block py-3 border-b border-cream/10" onClick={() => setIsMobileMenuOpen(false)}>Artikel</a>
            <a href="/kontak" className="hover:text-wheat transition-colors block py-3 border-b border-cream/10" onClick={() => setIsMobileMenuOpen(false)}>Kontak</a>
            <a href="/faq" className="hover:text-wheat transition-colors block py-3 border-b border-cream/10" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
            <a href="/kontak" className="inline-block mt-4 px-5 py-3.5 bg-cream text-forest rounded-sm hover:bg-wheat transition-all font-bold text-center" onClick={() => setIsMobileMenuOpen(false)}>
              Hubungi Kami
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

function NewsletterForm() {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = React.useState('')

  const FORM_ID = "h1z6x0p2wu6"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // @ts-ignore
      const forminit = new window.Forminit()
      const formData = new FormData(e.currentTarget)

      const { error } = await forminit.submit(FORM_ID, formData)

      if (error) {
        setStatus('error')
        setErrorMessage(error.message)
      } else {
        setStatus('success')
        e.currentTarget.reset()
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage('Terjadi kesalahan jaringan.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 relative">
      <input type="hidden" name="fi-sender-userId" value="newsletter" />
      <input
        type="email"
        name="fi-sender-email"
        required
        placeholder="Email Anda"
        className="px-4 py-2 w-full text-forest rounded-sm bg-cream focus:outline-none focus:ring-2 focus:ring-wheat"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-4 py-2 bg-wheat text-forest font-bold rounded-sm hover:bg-white transition-colors disabled:opacity-70"
      >
        {status === 'loading' ? '...' : 'Kirim'}
      </button>
      {status === 'success' && (
        <p className="absolute -bottom-6 text-xs text-wheat font-bold">Terima kasih telah berlangganan!</p>
      )}
      {status === 'error' && (
        <p className="absolute -bottom-6 text-xs text-red-400 font-bold">{errorMessage}</p>
      )}
    </form>
  )
}

function Footer() {
  return (
    <footer className="bg-forest text-cream py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <a href="/" className="block mb-6">
            <img src="/assets/CETRALOG.png" alt="Cetrofarm" width="160" height="80" className="h-16 md:h-20 w-auto object-contain" />
          </a>
          <p className="text-cream/80 text-sm leading-relaxed mb-6">
            bringing nature inside.<br />
            Merawat rantai pasok pangan dari 210+ petani binaan hingga ke jaringan ritel & mitra bisnis Anda, sejak 2018.
          </p>
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2 text-sm text-cream/90 font-bold">
              <ShieldCheck size={18} className="text-wheat" /> Bersertifikat Organik
            </span>
            <span className="flex items-center gap-2 text-sm text-cream/90 font-bold">
              <ShieldCheck size={18} className="text-wheat" /> Terdaftar Kemenkumham & NIB
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-serif text-xl mb-4 text-wheat">Kontak Kami</h3>
          <address className="not-italic text-cream/80 text-sm space-y-3">
            <p>{CONTACT.address}</p>
            <p>{CONTACT.officePhone.display}</p>
            <p>{CONTACT.whatsapp.display}</p>
            <p>{CONTACT.email.public}</p>
          </address>
        </div>
        <div>
          <h3 className="font-serif text-xl mb-4 text-wheat">Tautan</h3>
          <ul className="text-cream/80 text-sm space-y-3 flex flex-col">
            <a href="/tentang" className="hover:text-white transition-colors">Tentang Kami</a>
            <a href="/produk" className="hover:text-white transition-colors">Katalog Produk</a>
            <a href="/investor" className="hover:text-white transition-colors">Peluang Investasi</a>
            <a href="/penawaran" className="hover:text-white transition-colors font-bold text-wheat">Permintaan Penawaran (RFQ)</a>
            <a href={CONTACT.retailShopUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Toko Ritel (shop.cetrofarm.com)</a>
            <a href="/faq" className="hover:text-white transition-colors">Pusat Bantuan (FAQ)</a>
            <a href="/kontak" className="hover:text-white transition-colors">Hubungi Kami</a>
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-xl mb-4 text-wheat">Newsletter</h3>
          <p className="text-cream/80 text-sm mb-4">Dapatkan info produk terbaru dan ringkasan peluang investasi bulanan.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-cream/50 text-sm">
        <p>&copy; {new Date().getFullYear()} PT. Cetro Tama Indonesia (Cetrofarm). Hak Cipta Dilindungi.</p>
        <div className="flex gap-4">
          <a href="/syarat-ketentuan" className="hover:text-cream transition-colors">Syarat & Ketentuan</a>
          <a href="/kebijakan-privasi" className="hover:text-cream transition-colors">Kebijakan Privasi</a>
        </div>
      </div>
    </footer>
  )
}
