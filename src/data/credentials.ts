export interface CertificationItem {
  id: string;
  label: string;
  type: string;
  verified: boolean;
  proofUrl?: string;
  issuer: string;
  grade: string;
  validUntil: string;
  certNumber: string;
  desc: string;
}

export const certifications: CertificationItem[] = [
  {
    id: "halal",
    label: "Halal Assurance System",
    type: "certification",
    verified: false, // TODO: Verifikasi dokumen resmi penerbit BPJPH / LPPOM-MUI
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
    verified: false, // TODO: Verifikasi nomor NKV fisik
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
    verified: false, // TODO: Verifikasi sertifikat LSO INOFICE SNI 6729
    proofUrl: undefined,
    issuer: "SNI 6729:2016 (LSO INOFICE)",
    grade: "Ruang Lingkup Hortikultura",
    validUntil: "2028",
    certNumber: "ORG-6729-2023-089",
    desc: "Verifikasi standar pangan organik bebas residu bahan kimia sintetis."
  }
];

export interface PartnerItem {
  label: string;
  type: string;
  verified: boolean;
  proofUrl?: string;
}

export const partners: PartnerItem[] = [
  { 
    label: "Superindo", 
    type: "Modern Retail", 
    verified: false, // TODO: Verifikasi izin nama/logo mitra
    proofUrl: undefined 
  },
  { 
    label: "AEON Mall", 
    type: "Modern Retail", 
    verified: false, // TODO: Verifikasi izin nama/logo mitra
    proofUrl: undefined 
  },
  { 
    label: "Hero Supermarket", 
    type: "Modern Retail", 
    verified: false, // TODO: Verifikasi izin nama/logo mitra
    proofUrl: undefined 
  },
  { 
    label: "Mitra Hotel B2B", 
    type: "HORECA", 
    verified: false, // TODO: Verifikasi izin nama/logo mitra
    proofUrl: undefined 
  }
];

const showUnverified = import.meta.env.VITE_SHOW_UNVERIFIED_CLAIMS === 'true';

export function getVisibleCertifications(): CertificationItem[] {
  if (showUnverified) return certifications;
  return certifications.filter(c => c.verified);
}

export function getVisiblePartners(): PartnerItem[] {
  if (showUnverified) return partners;
  return partners.filter(p => p.verified);
}
