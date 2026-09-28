import { createFileRoute } from '@tanstack/react-router'
import { testimonials } from '../data/content'
import { Quote } from 'lucide-react'

export const Route = createFileRoute('/testimoni')({
  component: TestimoniPage,
  head: () => ({
    meta: [
      { title: 'Testimoni & Studi Kasus | Cetrofarm' },
      { name: 'description', content: 'Kisah sukses mitra petani dan klien B2B yang bertumbuh bersama ekosistem Cetrofarm.' },
      { property: 'og:title', content: 'Testimoni & Studi Kasus | Cetrofarm' },
    ],
  }),
})

function TestimoniPage() {
  return (
    <div className="w-full bg-cream min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-wheat/20 text-wheat rounded-sm text-sm font-bold tracking-widest uppercase mb-4">Kisah Nyata</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-forest mb-4">Bertumbuh Bersama</h1>
          <p className="text-forest/70 max-w-2xl mx-auto text-lg">Mendengar langsung dari mereka yang merasakan dampak ekosistem Cetrofarm setiap harinya.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimoni, idx) => (
            <div key={idx} className="bg-white p-8 rounded-sm shadow-sm border border-forest/10 flex flex-col h-full relative">
              <Quote className="text-forest/10 absolute top-6 right-6" size={48} />
              <p className="text-forest/80 italic text-lg leading-relaxed mb-8 flex-grow">"{testimoni.quote}"</p>
              <div className="flex items-center gap-4 mt-auto">
                {testimoni.photo ? (
                  <img src={testimoni.photo} alt={testimoni.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-12 h-12 bg-wheat rounded-full flex items-center justify-center font-serif font-bold text-forest text-xl shrink-0">
                    {testimoni.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-forest">
                    {testimoni.verificationUrl ? (
                      <a href={testimoni.verificationUrl} target="_blank" rel="noreferrer" className="hover:underline">{testimoni.name}</a>
                    ) : (
                      testimoni.name
                    )}
                  </h4>
                  <p className="text-sm text-forest/70">{testimoni.role}, {testimoni.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-forest text-cream p-12 rounded-sm relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold mb-4">Siap Menjadi Bagian dari Cerita Ini?</h2>
            <p className="text-cream/80 mb-8 max-w-xl mx-auto">Kami terus membuka pintu bagi petani, agen distributor, maupun offtaker B2B yang memiliki visi sejalan.</p>
            <a href="/kontak" className="px-8 py-4 bg-wheat text-forest font-bold rounded-sm hover:bg-white transition-colors">
              Mulai Kemitraan
            </a>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        </div>
      </div>
    </div>
  )
}
