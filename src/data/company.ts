import { businessLines } from './business-lines';

export { businessLines };

export const companyData = {
  legalName: "PT. Cetro Tama Indonesia (Cetrofarm)",
  brandName: "Cetrofarm",
  established: 2018,
  nib: "9120212080575",
  description: "Ekosistem Agrikultur Terintegrasi"
};

export const target2030 = {
  growthPerYear: "30%",
  valuationIncrease: "200%",
  marketShareOrganicVeg: "20%",
  marketShareChicken: "10%",
  beneficiaryFarmers: "8.000 (Data target 2030)"
};

export const teamMembers = [
  {
    name: "Aris Priyambodo",
    role: "Chief Executive Officer / Komisaris",
    image: "/team/aris.jpg",
    desc: "Latar belakang pendidikan pertanian & kehutanan, 20+ tahun pengalaman mengelola perusahaan berbasis agrikultur, mengembangkan program regenerative agriculture dan socio-entrepreneurship."
  },
  {
    name: "Devi Silvia",
    role: "Chief Operation Officer / Direktur",
    image: "/team/devi.jpg",
    desc: "Latar belakang IT, 15+ tahun pengalaman supply chain management dan pemasaran produk pertanian, program kolaborasi dengan petani di 14 kabupaten se-Jawa."
  },
  {
    name: "M. Tara Wijaya",
    role: "Chief Finance Officer / Direktur",
    image: "/team/tara.jpg",
    desc: "Latar belakang manajemen bisnis, 15 tahun pengalaman mengelola keuangan bisnis pertanian dan perkebunan di berbagai wilayah Indonesia."
  }
];

export const cultivationProcess = [
  { step: 1, title: "Penyemaian Bibit", image: "/assets/produk-sayuran-segar.webp", desc: "Seleksi bibit unggul tersertifikasi dan penyemaian terkontrol." },
  { step: 2, title: "Penanaman Ramah Lingkungan", image: "/assets/produk-bahan-pokok.webp", desc: "Penanaman di lahan binaan dengan nutrisi tanah terjaga." },
  { step: 3, title: "Perawatan Organik", image: "/assets/hero-panen-golden-hour.webp", desc: "Pemeliharaan berkala bebas pestisida sintetis berbahaya." },
  { step: 4, title: "Panen Presisi", image: "/assets/produk-protein-hewani.webp", desc: "Panen tepat waktu untuk menjaga kesegaran dan daya simpan produk." }
];

export const certifications = [
  {
    id: "halal",
    name: "Halal Assurance System",
    issuer: "LPPOM-MUI Jawa Tengah",
    grade: "Sangat Baik (A)",
    validUntil: "2027",
    certNumber: "ID3311000098271023",
    desc: "Jaminan mutu halal untuk seluruh rantai pasok dan pemrosesan produk."
  },
  {
    id: "nkv",
    name: "Nomor Kontrol Veteriner (NKV)",
    issuer: "Dinas Peternakan & Kesehatan Hewan Jateng",
    grade: "Tingkat II",
    validUntil: "2026",
    certNumber: "NKV.33.02.04.2023",
    desc: "Sertifikat higiene & sanitasi fasilitas penanganan produk protein hewani."
  },
  {
    id: "organik",
    name: "Sertifikat Pertanian Organik",
    issuer: "SNI 6729:2016 (LSO INOFICE)",
    grade: "Ruang Lingkup Hortikultura",
    validUntil: "2028",
    certNumber: "ORG-6729-2023-089",
    desc: "Verifikasi standar pangan organik bebas residu bahan kimia sintetis."
  }
];

export const clients = [
  { name: "Superindo", category: "Modern Retail" },
  { name: "AEON Mall", category: "Modern Retail" },
  { name: "Hero Supermarket", category: "Modern Retail" },
  { name: "Mitra Hotel B2B", category: "HORECA" }
];
