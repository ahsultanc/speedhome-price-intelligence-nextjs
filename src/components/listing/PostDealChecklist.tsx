import CollapsibleChecklist from "./CollapsibleChecklist";

const ITEMS = [
  "Foto seluruh unit sebelum masuk",
  "Test semua fasilitas hari pertama",
  "Email landlord — catat yang rusak",
  "Simpan copy tenancy agreement",
  "Dokumentasi kondisi untuk deposit",
  "Simpan kontak landlord + platform",
  "Transfer utilities",
];

export default function PostDealChecklist() {
  return (
    <CollapsibleChecklist
      title="✅ Checklist setelah deal"
      items={ITEMS}
      storageKey="speedhome_dismiss_postdeal"
    />
  );
}
