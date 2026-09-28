import { createFileRoute } from '@tanstack/react-router'
import { Download, ShieldAlert, BarChart3, Users, Handshake, Calendar, CheckCircle2, Building, Briefcase, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { teamMembers } from '../data/company'
import { TeamMemberAvatar } from '../components/TeamMemberAvatar'
import { PdfDownloadModal } from '../components/PdfDownloadModal'
import { TractionChart } from '../components/TractionChart'
import { submitInvestor } from '../server/actions'
import { 
  investorMetrics, 
  marketSizeData, 
  businessModelDiagram, 
  unitEconomics, 
  fundAllocation, 
  investorMilestones, 
  riskManagement, 
  advisoryBoard 
} from '../data/investor-content'

export const Route = createFileRoute('/investor')({
  component: InvestorPage,
  head: () => ({
    meta: [
      { title: 'Investor Relations & Financial Traction | Cetrofarm' },
      { name: 'description', content: 'Laporan traksi bisnis, unit economics, alokasi dana, dan peluang investasi di ekosistem agrikultur terintegrasi Cetrofarm.' },
      { property: 'og:title', content: 'Investor Relations & Financial Traction | Cetrofarm' },
      { property: 'og:description', content: 'Analisis pasar TAM/SAM, unit economics, traksi volume panen, dan mitigasi risiko investasi.' }
    ]
  })
})

function InvestorPage() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false)
  const [honeypot, setHoneypot] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitStatus('loading')
    setErrorMessage('')

    if (honeypot) {
      setSubmitStatus('error')
      setErrorMessage('Terdeteksi aktivitas spam.')
      return
    }

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const meetingDate = formData.get('meeting_date') as string
    const message = formData.get('message') as string

    const fullMessage = `[Jadwal Pertemuan Investor]
Tanggal/Waktu Preferensi: ${meetingDate || 'Fleksibel'}
Pesan: ${message}`

    try {
      const res = await submitInvestor({
        data: {
          name,
          email,
          company: company || 'Mitra Investor',
          message: fullMessage
        }
      })

      if (res.success) {
        setSubmitStatus('success')
        e.currentTarget.reset()
      } else {
        setSubmitStatus('error')
        setErrorMessage(res.error || 'Terjadi kesalahan sistem.')
      }
    } catch (err) {
      setSubmitStatus('error')
      setErrorMessage('Koneksi terputus. Silakan coba lagi.')
    }
  }

  return (
    <div className="w-full bg-cream min-h-screen">
      
      {/* 1. Ringkasan Peluang (Masalah, Solusi, Market Size) */}
      <section className="relative w-full pt-32 pb-24 bg-forest text-cream overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/hero_investor.jpg" 
            alt="Fasilitas indoor & outdoor farming modern Cetrofarm" 
            fetchPriority="high"
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-15 grayscale mix-blend-multiply"
          />
        </div>
        <div className="container mx-auto px-4 relative z-20 max-w-5xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-wheat/20 text-wheat rounded-sm text-xs font-bold tracking-widest uppercase border border-wheat/30">
              Investor Relations & Brief Q2 2026
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6 text-cream">
            Peluang Investasi Skalabilitas Rantai Pasok Pangan
          </h1>
          <p className="text-cream/90 text-base md:text-lg max-w-3xl font-light mb-12 leading-relaxed">
            Menghubungkan 210+ petani binaan langsung dengan pasar B2B melalui model Business Aggregator terintegrasi untuk efisiensi post-harvest loss &lt; 5%.
          </p>
          
          <div className="grid md:grid-cols-2 gap-10 mt-8">
            <div className="bg-white/5 p-6 rounded-sm border border-cream/10">
              <h2 className="text-xl font-bold text-wheat mb-4 border-b border-wheat/20 pb-2 flex items-center gap-2">
                Problem & Solusi Bisnis
              </h2>
              <div className="space-y-4 text-xs md:text-sm text-cream/90 leading-relaxed">
                <p>
                  <strong className="text-wheat">Masalah:</strong> Rantai pasok agrikultur tradisional memiliki 4–5 rantai perantara (tengkulak), memicu inflasi harga jual hingga 40% dan <em>post-harvest loss</em> mencapai 20% sebelum produk tiba di ritel B2B.
                </p>
                <p>
                  <strong className="text-wheat">Solusi Cetrofarm:</strong> Model <em>Business Aggregator</em> terintegrasi. Membeli langsung dari 210+ petani (HPP terkunci), memproses di gudang pendingin mandiri (grading & batch tracking), dan mendistribusikan langsung ke pasar B2B & Ritel.
                </p>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-sm border border-cream/10">
              <h2 className="text-xl font-bold text-wheat mb-4 border-b border-wheat/20 pb-2">
                Analisis Ukuran Pasar (Market Size)
              </h2>
              <div className="space-y-4 text-xs md:text-sm">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-cream/80">{marketSizeData.tam.label}</span>
                    <span className="font-bold text-wheat">{marketSizeData.tam.value}</span>
                  </div>
                  <div className="w-full bg-black/30 h-2 rounded-full"><div className="bg-cream/40 h-2 rounded-full w-full"></div></div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-cream/80">{marketSizeData.sam.label}</span>
                    <span className="font-bold text-wheat">{marketSizeData.sam.value}</span>
                  </div>
                  <div className="w-full bg-black/30 h-2 rounded-full"><div className="bg-wheat h-2 rounded-full w-[25%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-cream/80">{marketSizeData.som.label}</span>
                    <span className="font-bold text-wheat">{marketSizeData.som.value}</span>
                  </div>
                  <div className="w-full bg-black/30 h-2 rounded-full"><div className="bg-white h-2 rounded-full w-[10%]"></div></div>
                </div>
                <div className="pt-2 text-[11px] text-cream/60 italic">* Sumber data: {marketSizeData.tam.source}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap gap-4">
            <a href="#inquiry-form" className="px-8 py-3.5 bg-wheat text-forest font-bold rounded-sm hover:bg-white transition-all text-sm shadow-md">
              Jadwalkan Pertemuan Investor
            </a>
            <button 
              onClick={() => setIsPdfModalOpen(true)}
              className="px-8 py-3.5 border border-cream/30 hover:bg-cream/10 text-cream font-bold rounded-sm transition-all text-sm flex items-center gap-2"
            >
              <Download size={16}/> Unduh Official Brief (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* 2. Diagram Model Bisnis & Alur Pendapatan */}
      <section className="py-24 bg-white border-b border-forest/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-forest uppercase tracking-widest block mb-2">Arsitektur Operasional</span>
            <h2 className="text-3xl font-serif font-bold text-forest mb-3">Model Bisnis & Aliran Pendapatan</h2>
            <p className="text-forest/70 text-sm max-w-2xl mx-auto">Kami mengamankan margin sehat melalui efisiensi rantai dingin & eliminasi tengkulak.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 relative">
            {businessModelDiagram.map((item, idx) => (
              <div key={idx} className="bg-cream/40 p-6 rounded-sm border border-forest/10 flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest/60 block mb-2">Tahap {idx + 1}: {item.stage}</span>
                  <h3 className="font-serif font-bold text-forest text-xl mb-2">{item.title}</h3>
                  <p className="text-xs text-forest/80 leading-relaxed mb-4">{item.desc}</p>
                </div>
                <div className="pt-4 border-t border-forest/10">
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-sm ${item.color}`}>
                    {item.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Traksi Bisnis */}
      <section className="py-24 bg-cream border-b border-forest/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-forest uppercase tracking-widest block mb-2">Rekam Jejak Teruji</span>
            <h2 className="text-3xl font-serif font-bold text-forest mb-3">Traksi Operasional (Q2 2026)</h2>
            <p className="text-forest/70 text-sm">Pertumbuhan konsisten volume produksi dan jumlah mitra binaan.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-forest/10">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="text-forest" size={24} />
                <h3 className="font-bold text-forest text-sm">Volume Panen</h3>
              </div>
              <p className="text-3xl font-serif font-bold text-forest mb-1">150 <span className="text-sm font-sans font-semibold">Ton/Bulan</span></p>
              <p className="text-xs text-forest/70">{investorMetrics.growthYoYSource}</p>
            </div>
            
            <div className="bg-white p-6 rounded-sm shadow-sm border border-forest/10">
              <div className="flex items-center gap-3 mb-3">
                <Users className="text-forest" size={24} />
                <h3 className="font-bold text-forest text-sm">Petani Binaan</h3>
              </div>
              <p className="text-3xl font-serif font-bold text-forest mb-1">210+ <span className="text-sm font-sans font-semibold">Petani</span></p>
              <p className="text-xs text-forest/70">{investorMetrics.farmersSource}</p>
            </div>

            <div className="bg-white p-6 rounded-sm shadow-sm border border-forest/10">
              <div className="flex items-center gap-3 mb-3">
                <Handshake className="text-forest" size={24} />
                <h3 className="font-bold text-forest text-sm">Kontrak B2B Aktif</h3>
              </div>
              <p className="text-3xl font-serif font-bold text-forest mb-1">14 <span className="text-sm font-sans font-semibold">Institusi</span></p>
              <p className="text-xs text-forest/70">{investorMetrics.offtakerRetentionSource}</p>
            </div>
          </div>

          {/* Recharts Chart */}
          <TractionChart />
        </div>
      </section>

      {/* 4. Unit Economics */}
      <section className="py-24 bg-white border-b border-forest/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-forest uppercase tracking-widest block mb-2">Metrik Keuangan Siklus</span>
            <h2 className="text-3xl font-serif font-bold text-forest mb-3">Unit Economics Rata-rata</h2>
            <p className="text-forest/70 text-sm">Struktur biaya dan margin kotor per komoditas utama.</p>
          </div>

          <div className="overflow-x-auto bg-white rounded-sm border border-forest/10 shadow-sm">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-forest text-cream">
                  <th className="p-4 font-bold">Komponen Metrik</th>
                  <th className="p-4 font-bold">Sayuran Organik</th>
                  <th className="p-4 font-bold">Protein Hewani</th>
                  <th className="p-4 font-bold">Keterangan / Asumsi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10 text-forest/80">
                {unitEconomics.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-cream/20' : 'bg-white'}>
                    <td className="p-4 font-bold text-forest">{row.metric}</td>
                    <td className="p-4 font-mono font-bold text-forest">{row.sayuran}</td>
                    <td className="p-4 font-mono font-bold text-forest">{row.protein}</td>
                    <td className="p-4 text-xs text-forest/70">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Rencana Penggunaan Dana & Milestone */}
      <section className="py-24 bg-cream border-b border-forest/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Alokasi Dana */}
            <div>
              <span className="text-xs font-bold text-forest uppercase tracking-widest block mb-2">Penggunaan Dana</span>
              <h2 className="text-2xl font-serif font-bold text-forest mb-6">Rencana Alokasi Modal</h2>
              
              <div className="space-y-4">
                {fundAllocation.map((item, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-sm border-l-4 border-forest shadow-sm">
                    <div className="flex justify-between items-center mb-1 font-bold text-forest">
                      <span className="text-sm">{item.category}</span>
                      <span className="text-base font-mono">{item.percentage}%</span>
                    </div>
                    <p className="text-xs text-forest/70 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Roadmap Milestone 12-24 Bulan */}
            <div>
              <span className="text-xs font-bold text-forest uppercase tracking-widest block mb-2">Target Pertumbuhan</span>
              <h2 className="text-2xl font-serif font-bold text-forest mb-6">Roadmap Milestone (12–24 Bulan)</h2>
              
              <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-forest/20">
                {investorMilestones.map((ms, idx) => (
                  <div key={idx} className="relative pl-10">
                    <div className="absolute left-2 top-1.5 w-4 h-4 rounded-full bg-forest border-2 border-white shadow"></div>
                    <div className="bg-white p-4 rounded-sm border border-forest/10 shadow-sm">
                      <span className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">{ms.period}</span>
                      <h3 className="font-bold text-forest text-sm mb-1">{ms.title}</h3>
                      <p className="text-xs text-forest/70 leading-relaxed">{ms.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Manajemen Risiko (Honest & Objective) */}
      <section className="py-24 bg-white border-b border-forest/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-forest uppercase tracking-widest block mb-2 flex items-center justify-center gap-2">
              <ShieldAlert size={16} /> Mitigasi Terukur
            </span>
            <h2 className="text-3xl font-serif font-bold text-forest mb-3">Manajemen & Mitigasi Risiko</h2>
            <p className="text-forest/70 text-sm max-w-2xl mx-auto">Identifikasi transparan risiko utama dan strategi mitigasi operasional Cetrofarm.</p>
          </div>

          <div className="space-y-4">
            {riskManagement.map((rm, idx) => (
              <div key={idx} className="bg-cream/40 p-5 rounded-sm border border-forest/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="md:w-1/3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest/60 block mb-1">Dampak: {rm.impact}</span>
                  <h3 className="font-bold text-forest text-sm">{rm.risk}</h3>
                </div>
                <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-forest/10 pt-3 md:pt-0 md:pl-6">
                  <p className="text-xs text-forest/80 leading-relaxed">
                    <strong className="text-forest">Strategi Mitigasi:</strong> {rm.mitigation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Tim Inti & Penasihat */}
      <section className="py-24 bg-cream border-b border-forest/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-forest uppercase tracking-widest block mb-2">Kepemimpinan Ex-Executive</span>
            <h2 className="text-3xl font-serif font-bold text-forest mb-3">Tim Manajemen & Penasihat</h2>
            <p className="text-forest/70 text-sm">Kombinasi pengalaman 20+ tahun di bidang agronomis, teknologi, dan keuangan agribisnis.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white p-6 rounded-sm border border-forest/10 text-center shadow-sm flex flex-col items-center">
                <TeamMemberAvatar 
                  src={member.image} 
                  alt={`${member.name} — ${member.role}`} 
                  sizeClassName="w-36 h-36"
                  className="mb-4"
                />
                <h3 className="font-serif font-bold text-forest text-lg mb-1">{member.name}</h3>
                <p className="text-[11px] font-bold text-forest uppercase tracking-wider mb-3 bg-cream px-2 py-0.5 rounded border border-forest/10">{member.role}</p>
                <p className="text-xs text-forest/80 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>

          {/* Advisory Board */}
          <div className="bg-white p-8 rounded-sm border border-forest/10">
            <h3 className="text-xl font-serif font-bold text-forest mb-6 text-center">Dewan Penasihat (Advisory Board)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {advisoryBoard.map((adv, idx) => (
                <div key={idx} className="bg-cream/40 p-4 rounded-sm border border-forest/5">
                  <h4 className="font-bold text-forest text-sm mb-1">{adv.name}</h4>
                  <p className="text-xs font-bold text-forest/70 mb-2">{adv.role}</p>
                  <p className="text-xs text-forest/80 leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Single CTA — Form Jadwalkan Pertemuan */}
      <section className="py-28 bg-forest text-cream" id="inquiry-form">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-wheat uppercase tracking-widest block mb-2">Sesi Presentasi Direct</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-wheat mb-3">Jadwalkan Pertemuan Investor</h2>
            <p className="text-cream/80 text-sm leading-relaxed">
              Atur sesi diskusi online (Zoom) atau kunjungan fasilitas/site secara langsung bersama tim manajemen Cetrofarm.
            </p>
          </div>
          
          <div className="bg-white/5 p-8 rounded-sm border border-cream/10 shadow-2xl">
            <form action={import.meta.env.VITE_FORM_ENDPOINT || '/submit-form.php'} method="POST" className="space-y-4">
              <input type="hidden" name="form_type" value="investor" />
              
              {/* Honeypot field for anti-spam */}
              <input 
                type="text" 
                name="_gotcha" 
                className="hidden" 
                tabIndex={-1} 
                autoComplete="off" 
              />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-cream">Nama Lengkap & Jabatan *</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="w-full px-4 py-3 rounded-sm border border-cream/20 bg-transparent text-cream focus:outline-none focus:border-wheat text-sm" 
                  placeholder="Misal: Budi Santoso (Managing Partner)" 
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-cream">Email Kerja *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="w-full px-4 py-3 rounded-sm border border-cream/20 bg-transparent text-cream focus:outline-none focus:border-wheat text-sm" 
                    placeholder="budi@fund.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-cream">Institusi / Perusahaan VC</label>
                  <input 
                    type="text" 
                    name="company" 
                    className="w-full px-4 py-3 rounded-sm border border-cream/20 bg-transparent text-cream focus:outline-none focus:border-wheat text-sm" 
                    placeholder="Misal: Nusantara Capital"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-cream">Preferensi Tanggal & Waktu *</label>
                <input 
                  type="text" 
                  name="meeting_date" 
                  required 
                  className="w-full px-4 py-3 rounded-sm border border-cream/20 bg-transparent text-cream focus:outline-none focus:border-wheat text-sm" 
                  placeholder="Misal: Rabu, 18 September 2026 jam 14:00 WIB (Online Zoom)" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-cream">Topik Diskusi / Pertanyaan *</label>
                <textarea 
                  name="message" 
                  required 
                  rows={3} 
                  className="w-full px-4 py-3 rounded-sm border border-cream/20 bg-transparent text-cream focus:outline-none focus:border-wheat text-sm" 
                  placeholder="Tuliskan fokus diskusi investor (misal: inquiry ronde Seed/Seri A, kunjungan site cold storage Semarang)..."
                ></textarea>
              </div>

              <div className="text-[11px] text-cream/70 leading-relaxed">
                Dengan mengklik kirim, Anda menyetujui <a href="/kebijakan-privasi" target="_blank" className="underline font-bold text-wheat hover:text-white">Kebijakan Privasi</a> Cetrofarm.
              </div>

              <button 
                type="submit" 
                className="w-full py-4 mt-4 bg-wheat text-forest font-bold rounded-sm hover:bg-white transition-colors text-sm tracking-wide shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar size={18} /> KIRIM PERMINTAAN MEETING
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Modal Download PDF */}
      <PdfDownloadModal 
        isOpen={isPdfModalOpen} 
        onClose={() => setIsPdfModalOpen(false)} 
        pdfUrl="/docs/CetroFarm-Company-Profile.pdf"
      />
    </div>
  )
}
