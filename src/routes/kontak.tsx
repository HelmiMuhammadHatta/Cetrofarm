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
                  <p className="text-forest/70 text-xs mt-0.5">{CONTACT.email.public}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Kontak */}
          <div className="bg-white p-8 rounded-sm border border-forest/10 shadow-lg">
            <h2 className="text-2xl font-serif font-bold text-forest mb-6">Tinggalkan Pesan</h2>
            
            <form action={import.meta.env.VITE_FORM_ENDPOINT || '/submit-form.php'} method="POST" className="space-y-4">
              <input type="hidden" name="form_type" value="contact" />
              
              {/* Honeypot field anti-spam */}
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
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">No. Telepon / WhatsApp</label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Kategori Pertanyaan *</label>
                <select 
                  name="category"
                  required
                  className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest"
                >
                  <option value="">Pilih Kategori</option>
                  <option value="[B2B] Penawaran B2B (HORECA / Ritel)">[B2B] Penawaran B2B (HORECA / Ritel)</option>
                  <option value="Kemitraan Petani">Kemitraan Petani</option>
                  <option value="Peluang Investasi">Peluang Investasi</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Pesan Anda *</label>
                <textarea 
                  name="message"
                  required
                  rows={4} 
                  className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest"
                ></textarea>
              </div>

              <div className="text-[11px] text-forest/70 leading-relaxed">
                Dengan mengklik kirim, Anda menyetujui <a href="/kebijakan-privasi" target="_blank" className="underline font-bold text-forest hover:text-wheat">Kebijakan Privasi</a> PT. Cetro Tama Indonesia.
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 bg-forest text-cream font-bold rounded-sm hover:bg-forest/90 transition-colors text-sm"
              >
                KIRIM PESAN
              </button>
            </form>
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
