import { createFileRoute } from '@tanstack/react-router'
import { teamMembers } from '../data/company'

export const Route = createFileRoute('/manajemen')({
  component: ManajemenPage,
  head: () => ({
    meta: [
      { title: 'Jajaran Manajemen | Cetrofarm' },
      { name: 'description', content: 'Profil jajaran manajemen PT. Cetro Tama Indonesia (Cetrofarm).' },
      { property: 'og:title', content: 'Jajaran Manajemen | Cetrofarm' },
    ]
  })
})

function ManajemenPage() {
  return (
    <div className="w-full bg-cream min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-forest uppercase tracking-widest block mb-2">Profil Perusahaan</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-forest mb-4">Jajaran Manajemen</h1>
          <p className="text-forest/70 max-w-2xl mx-auto text-sm">
            Tim profesional yang berdedikasi memimpin PT. Cetro Tama Indonesia (Cetrofarm) menuju agrikultur terintegrasi yang berkelanjutan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-sm shadow-md border border-forest/10 overflow-hidden flex flex-col hover:shadow-lg transition-all">
              <div className="h-64 overflow-hidden relative bg-forest/5">
                <img 
                  src={member.image} 
                  alt={`Foto ${member.name}`}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/placeholder-person.webp';
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-bold text-forest mb-1">{member.name}</h3>
                <p className="text-xs font-bold text-wheat mb-4">{member.role}</p>
                <p className="text-forest/80 text-sm leading-relaxed">{member.desc}</p>
              </div>
            </div>
          ))}
          {/* TODO: [ISI: daftar manajemen lainnya jika ada] */}
        </div>
      </div>
    </div>
  )
}
