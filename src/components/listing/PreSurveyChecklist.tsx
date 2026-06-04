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
      title="🔍 Tips survei sebelum sewa"
      items={ITEMS}
      storageKey="speedhome_dismiss_presurvey"
    />
  );
}
