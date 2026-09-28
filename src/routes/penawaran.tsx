import { createFileRoute } from '@tanstack/react-router'
import { CONTACT } from '../config/contact'
import { ShieldCheck, FileText, Send, PhoneCall } from 'lucide-react'

export const Route = createFileRoute('/penawaran')({
  component: PenawaranPage,
  head: () => ({
    meta: [
      { title: 'Permintaan Penawaran B2B (RFQ) | Cetrofarm' },
      { name: 'description', content: 'Formulir resmi permintaan penawaran harga dan komoditas pangan B2B (RFQ) untuk ritel, HORECA, dan distributor.' },
      { property: 'og:title', content: 'Permintaan Penawaran B2B (RFQ) | Cetrofarm' },
      { property: 'og:description', content: 'Ajukan spesifikasi dan volume kebutuhan pangan industri Anda langsung ke tim B2B Cetrofarm.' }
    ],
  }),
})

function PenawaranPage() {
  const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT || '/submit-form.php'

  return (
    <div className="w-full bg-cream min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <span className="inline-block px-3.5 py-1 bg-forest/10 text-forest rounded-sm text-xs font-bold tracking-widest uppercase mb-3">
            B2B & Institutional Procurement
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-forest mb-4">
            Permintaan Penawaran Formal (RFQ)
          </h1>
          <p className="text-forest/80 max-w-2xl mx-auto text-base leading-relaxed">
            Silakan isi spesifikasi & kebutuhan volume komoditas Anda. Tim Business Development Cetrofarm akan mengirimkan Surat Penawaran Harga resmi dalam 1x24 jam kerja.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-sm border border-forest/10 shadow-xl">
          <form action={formEndpoint} method="POST" className="space-y-6">
            <input type="hidden" name="form_type" value="rfq" />
            
            {/* Honeypot field anti-spam */}
            <input 
              type="text" 
              name="_gotcha" 
              className="hidden" 
              tabIndex={-1} 
              autoComplete="off" 
            />

            {/* Section 1: Identitas Pemohon */}
            <div>
              <h2 className="text-xl font-serif font-bold text-forest mb-4 pb-2 border-b border-forest/10 flex items-center gap-2">
                <FileText size={20} className="text-wheat" /> 1. Informasi Perusahaan / Pemohon
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Nama Lengkap *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="Nama Lengkap Penanggung Jawab"
                    className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Jabatan *</label>
                  <input 
                    type="text" 
                    name="role" 
                    required 
                    placeholder="Misal: Purchasing Manager / Head of Chef"
                    className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Nama Perusahaan / Instansi *</label>
                  <input 
                    type="text" 
                    name="company" 
                    required 
                    placeholder="Nama PT / Restoran / Supermarket"
                    className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Jenis Usaha / Sektor *</label>
                  <select 
                    name="business_type" 
                    required 
                    className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest"
                  >
                    <option value="">Pilih Sektor Usaha</option>
                    <option value="Ritel Modern / Supermarket">Ritel Modern / Supermarket</option>
                    <option value="HORECA (Hotel, Restoran, Kafe)">HORECA (Hotel, Restoran, Kafe)</option>
                    <option value="Distributor / Sub-Distributor Pangan">Distributor / Sub-Distributor Pangan</option>
                    <option value="Industri Pengolahan Makanan">Industri Pengolahan Makanan</option>
                    <option value="Institusi Pemerintah / BUMD">Institusi / BUMD / Koperasi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Email Resmi *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="nama@perusahaan.com"
                    className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">No. Telepon / WhatsApp *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    placeholder="081234567890"
                    className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest" 
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Kebutuhan Komoditas */}
            <div className="pt-4">
              <h2 className="text-xl font-serif font-bold text-forest mb-4 pb-2 border-b border-forest/10 flex items-center gap-2">
                <ShieldCheck size={20} className="text-wheat" /> 2. Detail Spesifikasi Komoditas
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-forest">Komoditas yang Dibutuhkan (Bisa Pilih Lebih dari Satu) *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <label className="flex items-center gap-2 bg-cream/40 p-3 rounded border border-forest/10 cursor-pointer">
                      <input type="checkbox" name="commodities[]" value="Sayuran Segar Organik" className="accent-forest" />
                      <span>Sayuran Segar Organik</span>
                    </label>
                    <label className="flex items-center gap-2 bg-cream/40 p-3 rounded border border-forest/10 cursor-pointer">
                      <input type="checkbox" name="commodities[]" value="Sayuran Root & Buah" className="accent-forest" />
                      <span>Sayuran Root & Buah</span>
                    </label>
                    <label className="flex items-center gap-2 bg-cream/40 p-3 rounded border border-forest/10 cursor-pointer">
                      <input type="checkbox" name="commodities[]" value="Ubi Madu Premium" className="accent-forest" />
                      <span>Ubi Madu Premium</span>
                    </label>
                    <label className="flex items-center gap-2 bg-cream/40 p-3 rounded border border-forest/10 cursor-pointer">
                      <input type="checkbox" name="commodities[]" value="Protein Hewani (Ayam Kampung)" className="accent-forest" />
                      <span>Protein Hewani (Ayam Kampung)</span>
                    </label>
                    <label className="flex items-center gap-2 bg-cream/40 p-3 rounded border border-forest/10 cursor-pointer sm:col-span-2">
                      <input type="checkbox" name="commodities[]" value="Bahan Pokok Grosir (Bulk)" className="accent-forest" />
                      <span>Bahan Pokok Grosir (Beras Organik / Komoditas Curah)</span>
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Perkiraan Volume & Satuan *</label>
                    <input 
                      type="text" 
                      name="volume" 
                      required 
                      placeholder="Misal: 5 Ton / 500 Ekor / 50 Karung"
                      className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Frekuensi Pengiriman *</label>
                    <select 
                      name="frequency" 
                      required 
                      className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest"
                    >
                      <option value="">Pilih Frekuensi</option>
                      <option value="Sekali Pembelian (Spot Purchase)">Sekali Pembelian (Spot Purchase)</option>
                      <option value="Mingguan">Mingguan</option>
                      <option value="Bulanan">Bulanan</option>
                      <option value="Kontrak Pasokan Tahunan">Kontrak Pasokan Tahunan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Lokasi Pengiriman / DC *</label>
                    <input 
                      type="text" 
                      name="delivery_location" 
                      required 
                      placeholder="Kota / Alamat Gudang / DC"
                      className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Target Tanggal Pasokan Pertama</label>
                    <input 
                      type="text" 
                      name="start_date" 
                      placeholder="Misal: 15 Oktober 2026"
                      className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Tautan Dokumen Spesifikasi / TOR (Google Drive / Dropbox, Opsional)</label>
                  <input 
                    type="url" 
                    name="spec_url" 
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest" 
                  />
                  <span className="text-[11px] text-forest/60 mt-1 block">
                    Sesuai kebijakan keamanan, unggah file langsung dibatasi. Silakan bagikan tautan dokumen publik jika ada.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-forest">Catatan Spesifikasi Khusus</label>
                  <textarea 
                    name="message" 
                    rows={4} 
                    placeholder="Tuliskan spesifikasi Grade (A/B), standar pengemasan, toleransi kadar air, atau persyaratan khusus lainnya..."
                    className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:border-forest bg-cream/30 text-sm text-forest"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Privacy Agreement */}
            <div className="pt-2 text-xs text-forest/80 leading-relaxed border-t border-forest/10">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="mt-0.5 accent-forest" />
                <span>
                  Saya mengonfirmasi bahwa data yang diisikan adalah benar untuk keperluan bisnis, dan menyetujui <a href="/kebijakan-privasi" target="_blank" className="underline font-bold text-forest">Kebijakan Privasi</a> PT. Cetro Tama Indonesia.
                </span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                type="submit" 
                className="flex-1 py-4 bg-forest text-cream font-bold rounded-sm hover:bg-forest/90 transition-colors text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <Send size={16} /> KIRIM PERMINTAAN PENAWARAN (RFQ)
              </button>
              <a 
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent('Halo Cetrofarm B2B, saya ingin berdiskusi cepat mengenai Permintaan Penawaran (RFQ) komoditas.')}`}
                target="_blank"
                rel="noreferrer"
                className="py-4 px-6 border-2 border-forest text-forest font-bold rounded-sm hover:bg-forest/10 transition-colors text-sm flex items-center justify-center gap-2"
              >
                <PhoneCall size={16} /> Diskusi Cepat via WhatsApp
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
