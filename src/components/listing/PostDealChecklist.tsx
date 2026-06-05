import { CheckSquare } from "lucide-react";
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
      title={
        <span className="flex items-center gap-1.5">
          <CheckSquare className="h-4 w-4 text-navy" /> Checklist setelah deal
        </span>
      }
      items={ITEMS}
      storageKey="speedhome_dismiss_postdeal"
    />
  );
}
