export interface ROIInput {
  hargaBeli: number;
  renovasi: number;
  sewaBulan: number;
  maintenanceTahun: number;
  mgmtFeePct: number;
  tenor: number;
}

export interface ROIBenchmark {
  label: string;
  emoji: string;
  tone: "good" | "medium" | "low";
}

export interface ROIResult {
  grossYield: number | null;
  netYield: number | null;
  paybackYears: number | null;
  totalReturn: number | null;
  breakEvenMonth: number | null;
  biayaTahunan: number;
  benchmark: ROIBenchmark | null;
}

export function calculateROI(i: ROIInput): ROIResult {
  const sewaTahun = i.sewaBulan * 12;
  const mgmtFee = sewaTahun * (i.mgmtFeePct / 100);
  const biayaTahunan = i.maintenanceTahun + mgmtFee;
  const netTahun = sewaTahun - biayaTahunan;
  const totalCost = i.hargaBeli + i.renovasi;

  const grossYield = i.hargaBeli > 0 ? (sewaTahun / i.hargaBeli) * 100 : null;
  const netYield = i.hargaBeli > 0 ? (netTahun / i.hargaBeli) * 100 : null;
  const paybackYears = netTahun > 0 ? totalCost / netTahun : null;
  const totalReturn = i.tenor > 0 ? netTahun * i.tenor : null;

  const netBulan = i.sewaBulan - biayaTahunan / 12;
  const breakEvenMonth = netBulan > 0 ? totalCost / netBulan : null;

  let benchmark: ROIBenchmark | null = null;
  if (netYield != null) {
    if (netYield < 3)
      benchmark = { label: "Di bawah rata-rata deposito bank", emoji: "🔴", tone: "low" };
    else if (netYield < 5)
      benchmark = { label: "Setara deposito bank", emoji: "🟡", tone: "medium" };
    else if (netYield < 7)
      benchmark = { label: "Lebih baik dari deposito", emoji: "🟢", tone: "good" };
    else benchmark = { label: "Yield sangat menarik", emoji: "🟢", tone: "good" };
  }

  return {
    grossYield,
    netYield,
    paybackYears,
    totalReturn,
    breakEvenMonth,
    biayaTahunan,
    benchmark,
  };
}
