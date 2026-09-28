import { createFileRoute } from '@tanstack/react-router'
import { ShieldCheck } from 'lucide-react'
import { CONTACT } from '../config/contact'

export const Route = createFileRoute('/kebijakan-privasi')({
  component: PrivacyComponent,
  head: () => ({
    meta: [
      { title: 'Kebijakan Privasi | Cetrofarm' },
      { name: 'description', content: 'Kebijakan Privasi penggunaan layanan Cetrofarm.' }
    ]
  })
})

function PrivacyComponent() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-[70vh] flex flex-col items-center text-center">
      <ShieldCheck className="w-16 h-16 text-forest mb-6" />
      <h1 className="text-4xl md:text-5xl font-serif text-forest mb-6">Kebijakan Privasi</h1>
      <p className="text-forest/70 max-w-2xl mb-8">
        Halaman ini sedang dalam tahap penyusunan dan akan segera diperbarui. 
        Terima kasih atas pengertian Anda.
      </p>
      <div className="text-left bg-white p-6 rounded-sm shadow-sm border border-forest/10 w-full max-w-2xl mx-auto">
        <p className="text-sm text-forest mb-2"><strong>PT. Cetro Tama Indonesia (Cetrofarm)</strong></p>
        <p className="text-xs text-forest/80 mb-1">NIB: 9120212080575</p>
        <p className="text-xs text-forest/80 mb-1">{CONTACT.address}</p>
        <p className="text-xs text-forest/80">Email: {CONTACT.email.public}</p>
      </div>
    </div>
  )
}
