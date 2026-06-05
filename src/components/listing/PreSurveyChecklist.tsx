import { Search } from "lucide-react";
import CollapsibleChecklist from "./CollapsibleChecklist";

const ITEMS = [
  "AC — test cooling",
  "Tekanan air — buka semua kran",
  "Dinding — cari bekas bocor",
  "Semua kunci berfungsi",
  "Furnitur sesuai foto?",
  "WiFi tersedia?",
  "Parkir included?",
  "Handle maintenance: siapa?",
  "Area bersama (lift, lobby)",
];

export default function PreSurveyChecklist() {
  return (
    <CollapsibleChecklist
      title={
        <span className="flex items-center gap-1.5">
          <Search className="h-4 w-4 text-navy" /> Tips survei sebelum sewa
        </span>
      }
      items={ITEMS}
      storageKey="speedhome_dismiss_presurvey"
    />
  );
}
