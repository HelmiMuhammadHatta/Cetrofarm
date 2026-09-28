export interface BusinessLine {
  id: string;
  title: string;
  shortTitle: string;
  desc: string;
  status: 'Berjalan' | 'Uji Coba' | 'Rencana';
  capacity: string;
  capacityNumber: number;
  capacityUnit: string;
  source: string;
  image: string;
}

export const businessLines: BusinessLine[] = [
  {
    id: "sayuran-segar",
    title: "Sayuran Segar Organik & Higienis",
    shortTitle: "Sayuran Segar",
    desc: "Budidaya dan distribusi sayuran daun hijau bernutrisi tinggi dengan metode ramah lingkungan. Menyuplai jaringan ritel modern dan mitra HORECA dengan sistem sortir terpusat.",
    status: "Berjalan",
    capacity: "120 Ton / Bulan",
    capacityNumber: 120,
    capacityUnit: "Ton/Bulan",
    source: "Data internal, Q2 2026",
    image: "/assets/produk-sayuran-segar.webp"
  },
  {
    id: "sayuran-root-buah",
    title: "Sayuran Root & Buah Tahan Lama",
    shortTitle: "Sayuran Root & Buah",
    desc: "Suplai sayuran akar dan buah berkualitas tinggi untuk menjaga pasokan bahan baku stabil. Memiliki daya simpan lebih lama sehingga efisien untuk distribusi antarprovinsi.",
    status: "Berjalan",
    capacity: "85 Ton / Bulan",
    capacityNumber: 85,
    capacityUnit: "Ton/Bulan",
    source: "Data internal, Q2 2026",
    image: "/assets/produk-sayuran-root.webp"
  },
  {
    id: "ubi-madu",
    title: "Ubi Madu Premium (Honey Sweet Potato)",
    shortTitle: "Ubi Madu Premium",
    desc: "Komoditas ubi madu pilihan dengan kadar gula alami optimal dan bentuk presisi. Ditujukan untuk memenuhi kebutuhan minimarket premium serta persiapan pasar ekspor.",
    status: "Berjalan",
    capacity: "40 Ton / Bulan",
    capacityNumber: 40,
    capacityUnit: "Ton/Bulan",
    source: "Data internal, Q2 2026",
    image: "/assets/produk-ubi-madu.webp"
  },
  {
    id: "daging-ayam",
    title: "Protein Hewani (Ayam Kampung Sehat)",
    shortTitle: "Protein Hewani",
    desc: "Pengembangan peternakan ayam kampung binaan dengan pakan herbal alami bebas residu antibiotik. Menghasilkan karkas dan potongan higienis standar premium untuk industri HORECA dan ritel.",
    status: "Berjalan",
    capacity: "1.200 Ekor / Siklus",
    capacityNumber: 1200,
    capacityUnit: "Ekor/Siklus",
    source: "Data internal, Q2 2026",
    image: "/assets/produk-protein-hewani.webp"
  },
  {
    id: "bulk-ingredients",
    title: "Bahan Pokok Grosir (Bulk Ingredients)",
    shortTitle: "Bahan Pokok Grosir",
    desc: "Penyediaan beras organik dan komoditas curah dalam skala besar untuk keperluan industri pangan. Efisien memotong rantai distribusi untuk menjaga keterjangkauan harga.",
    status: "Uji Coba",
    capacity: "20 Ton / Bulan",
    capacityNumber: 20,
    capacityUnit: "Ton/Bulan",
    source: "Data internal, Q2 2026",
    image: "/assets/produk-bulk-ingredients.webp"
  }
];
