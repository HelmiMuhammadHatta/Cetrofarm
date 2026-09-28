import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { MapPin, Phone, Mail, Building2, CheckCircle2 } from 'lucide-react'
import { submitContact } from '../server/actions'
import { CONTACT } from '../config/contact'

export const Route = createFileRoute('/kontak')({
  component: KontakPage,
  head: () => ({
    meta: [
      { title: 'Hubungi Kami | Cetrofarm' },
      { name: 'description', content: 'Hubungi Cetrofarm untuk pertanyaan, peluang kemitraan B2B, atau informasi pemesanan komoditas pangan.' },
      { property: 'og:title', content: 'Hubungi Kami | Cetrofarm' },
      { property: 'og:description', content: 'Hubungi Cetrofarm untuk informasi pemesanan komoditas pangan segar.' }
    ],
  }),
})

function KontakPage() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitStatus('loading')
    setErrorMessage('')

    if (honeypot) {
      setSubmitStatus('error')
      setErrorMessage('Terdeteksi aktivitas mencurigakan.')
      return
    }

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const category = formData.get('category') as string
    const message = formData.get('message') as string

    const fullMessage = `[Kategori: ${category || 'Umum'}] ${message}`

    try {
      const res = await submitContact({
        data: {
          name,
          email,
          phone: phone || undefined,
          message: fullMessage
        }
      })

      if (res.success) {
        setSubmitStatus('success')
        e.currentTarget.reset()
      } else {
        setSubmitStatus('error')
        setErrorMessage(res.error || 'Gagal mengirim pesan.')
      }
    } catch (err) {
      setSubmitStatus('error')
      setErrorMessage('Terjadi kesalahan koneksi.')
    }
  }

  return (
    <div className="w-full bg-cream min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-forest mb-4 text-center">Hubungi Kami</h1>
        <p className="text-forest/70 text-center max-w-2xl mx-auto mb-16 text-sm">
          Mari berdiskusi tentang bagaimana Cetrofarm dapat membantu memenuhi kebutuhan bahan baku pangan Anda atau peluang kolaborasi strategis.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Informasi Kontak */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-forest mb-6">Informasi Perusahaan</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Building2 className="text-forest shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="font-bold text-forest">PT. Cetro Tama Indonesia (Cetrofarm)</h3>
                  <p className="text-forest/70 text-xs mt-0.5">NIB: 9120212080575 (Terverifikasi)</p>
                  <p className="text-forest/70 text-xs">Terdaftar di Kemenkumham RI</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="text-forest shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="font-bold text-forest">Kantor & Pusat Distribusi</h3>
                  <p className="text-forest/70 text-xs mt-0.5 leading-relaxed">{CONTACT.address}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="text-forest shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="font-bold text-forest">Kantor Perwakilan</h3>
                  <p className="text-forest/70 text-xs mt-0.5">{CONTACT.repOffice}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="text-forest shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="font-bold text-forest">Telepon & WhatsApp</h3>
                  <p className="text-forest/70 text-xs mt-0.5">Office: {CONTACT.officePhone.display}</p>
                  <p className="text-forest/70 text-xs">WhatsApp: {CONTACT.whatsapp.display}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="text-forest shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="font-bold text-forest">Email Resmi</h3>
                  <p className="text-forest/70 text-xs mt-0.5">{CONTACT.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Kontak */}
          <div className="bg-white p-8 rounded-sm border border-forest/10 shadow-lg">
            <h2 className="text-2xl font-serif font-bold text-forest mb-6">Tinggalkan Pesan</h2>
            
            {submitStatus === 'success' ? (
              <div className="bg-forest/10 p-6 rounded-sm text-center border border-forest/20">
                <CheckCircle2 size={36} className="text-forest mx-auto mb-2" />
                <h3 className="font-bold text-forest text-lg mb-2">Pesan Terkirim!</h3>
                <p className="text-forest/80 text-xs mb-4">Terima kasih telah menghubungi Cetrofarm. Tim kami akan merespons dalam 1x24 jam.</p>
                <button 
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-2 bg-forest text-cream rounded-sm font-bold text-xs hover:bg-forest/90"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field */}
                <input 
                  type="text" 
                  name="user_check" 
                  value={honeypot} 
                  onChange={(e) => setHoneypot(e.target.value)} 
                  className="hidden" 
                  tabIndex={-1} 
                />

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Nama Lengkap *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm" 
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">No. Telepon</label>
                    <input 
                      type="tel" 
                      name="phone"
                      className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Kategori Pertanyaan *</label>
                  <select 
                    name="category"
                    required
                    className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm"
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Kerjasama B2B">Kerjasama B2B (HORECA / Ritel)</option>
                    <option value="Suplai Petani">Kemitraan Petani</option>
                    <option value="Investor">Peluang Investasi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Pesan Anda *</label>
                  <textarea 
                    name="message"
                    required
                    rows={4} 
                    className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm"
                  ></textarea>
                </div>

                {submitStatus === 'error' && (
                  <p className="text-red-600 text-xs font-bold bg-red-50 p-2 rounded">{errorMessage}</p>
                )}

                <button 
                  type="submit" 
                  disabled={submitStatus === 'loading'}
                  className="w-full py-3.5 bg-forest text-cream font-bold rounded-sm hover:bg-forest/90 transition-colors disabled:opacity-50 text-sm"
                >
                  {submitStatus === 'loading' ? 'Mengirim...' : 'KIRIM PESAN'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Embed Google Maps */}
        <div className="mt-16 bg-white p-2 rounded-sm border border-forest/10 shadow-sm">
          <iframe 
            src="https://maps.google.com/maps?q=%20Jl.%20Setro%20Raya%2C%20Desa%20Gondoriyo%2C%20Kecamatan%20Bergas%2C%20Kabupaten%20Semarang&z=15&hl=id&t=m&output=embed&iwloc=near" 
            width="100%" 
            height="380" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-sm"
            title="Google Maps Lokasi Cetrofarm"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
