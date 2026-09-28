export const certifications = [
  {
    id: "halal",
    label: "Halal Assurance System",
    type: "certification",
    verified: false, // TODO: verifikasi teks "Sertifikat Halal MUI" vs penerbit BPJPH Kemenag
    proofUrl: undefined,
    issuer: "LPPOM-MUI Jawa Tengah",
    grade: "Sangat Baik (A)",
    validUntil: "2027",
    certNumber: "ID3311000098271023",
    desc: "Jaminan mutu halal untuk seluruh rantai pasok dan pemrosesan produk."
  },
  {
    id: "nkv",
    label: "Nomor Kontrol Veteriner (NKV)",
    type: "certification",
    verified: false, // TODO: verifikasi kebenaran nomor NKV
    proofUrl: undefined,
    issuer: "Dinas Peternakan & Kesehatan Hewan Jateng",
    grade: "Tingkat II",
    validUntil: "2026",
    certNumber: "NKV.33.02.04.2023",
    desc: "Sertifikat higiene & sanitasi fasilitas penanganan produk protein hewani."
  },
  {
    id: "organik",
    label: "Sertifikat Pertanian Organik",
    type: "certification",
    verified: false, // TODO: verifikasi nomor dan klaim ruang lingkup
    proofUrl: undefined,
    issuer: "SNI 6729:2016 (LSO INOFICE)",
    grade: "Ruang Lingkup Hortikultura",
    validUntil: "2028",
    certNumber: "ORG-6729-2023-089",
    desc: "Verifikasi standar pangan organik bebas residu bahan kimia sintetis."
  }
];

export const partners = [
  { 
    label: "Superindo", 
    type: "Modern Retail", 
    verified: false, // TODO: pastikan ada bukti/izin kerja sama
    proofUrl: undefined 
  },
  { 
    label: "AEON Mall", 
    type: "Modern Retail", 
    verified: false, // TODO: pastikan ada bukti/izin kerja sama
    proofUrl: undefined 
  },
  { 
    label: "Hero Supermarket", 
    type: "Modern Retail", 
    verified: false, // TODO: pastikan ada bukti/izin kerja sama
    proofUrl: undefined 
  },
  { 
    label: "Mitra Hotel B2B", 
    type: "HORECA", 
    verified: false, // TODO: pastikan ada bukti/izin kerja sama
    proofUrl: undefined 
  }
];
