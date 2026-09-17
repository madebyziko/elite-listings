"use client";

import { useMemo, useState } from "react";
import { cad } from "@/lib/listings";

/**
 * Development tool (the line's differentiator): a first-pass feasibility check on the visitor's OWN numbers.
 * Nothing is pre-filled, so no figure here reads as a market claim (BC rules) and a real pro forma comes after.
 * Logic mirrors the ink FeasibilityCalculator: all-in cost = land + hard + soft% of hard; revenue = area x sale;
 * margin = revenue - cost; return on cost = margin / cost. Elite-styled by reusing the .mg calculator classes
 * (underline fields on the cream ground, dark result panel).
 */
export function EliteFeasibility() {
  const [land, setLand] = useState("");
  const [area, setArea] = useState("");
  const [hard, setHard] = useState("");
  const [soft, setSoft] = useState("20");
  const [sale, setSale] = useState("");
  const n = (v: string) => Number(String(v).replace(/[^\d.]/g, "")) || 0;

  const r = useMemo(() => {
    const L = n(land), A = n(area), H = n(hard), S = n(soft) / 100, P = n(sale);
    const hardTotal = A * H;
    const softTotal = hardTotal * S;
    const cost = L + hardTotal + softTotal;
    const revenue = A * P;
    const profit = revenue - cost;
    const roc = cost > 0 ? profit / cost : 0;
    const ready = L > 0 && A > 0 && H > 0 && P > 0;
    return { cost, revenue, profit, roc, softTotal, ready };
  }, [land, area, hard, soft, sale]);

  return (
    <div className="mg__grid" data-reveal="up">
      <div className="mg__fields">
        <label className="mg__field mg__field--full">
          <span className="mg__label">Land price</span>
          <span className="mg__inp">
            <span className="mg__pre" aria-hidden="true">$</span>
            <input type="number" min={0} step={10000} inputMode="decimal" value={land} placeholder="Site purchase price" onChange={(e) => setLand(e.target.value)} />
          </span>
        </label>
        <label className="mg__field">
          <span className="mg__label">Buildable area</span>
          <span className="mg__inp">
            <input type="number" min={0} step={100} inputMode="decimal" value={area} placeholder="Sellable floor area" onChange={(e) => setArea(e.target.value)} />
            <span className="mg__suf" aria-hidden="true">sq ft</span>
          </span>
        </label>
        <label className="mg__field">
          <span className="mg__label">Hard cost</span>
          <span className="mg__inp">
            <span className="mg__pre" aria-hidden="true">$</span>
            <input type="number" min={0} step={10} inputMode="decimal" value={hard} placeholder="Construction" onChange={(e) => setHard(e.target.value)} />
            <span className="mg__suf" aria-hidden="true">/ sq ft</span>
          </span>
        </label>
        <label className="mg__field">
          <span className="mg__label">Soft costs</span>
          <span className="mg__inp">
            <input type="number" min={0} max={100} step={1} inputMode="decimal" value={soft} onChange={(e) => setSoft(e.target.value)} aria-describedby="fs-soft" />
            <span className="mg__suf" aria-hidden="true">% of hard</span>
          </span>
          <span className="mg__hint" id="fs-soft">{r.softTotal > 0 ? `${cad.format(Math.round(r.softTotal))} in design, permits, financing` : "Design, permits, financing"}</span>
        </label>
        <label className="mg__field mg__field--full">
          <span className="mg__label">Sale price</span>
          <span className="mg__inp">
            <span className="mg__pre" aria-hidden="true">$</span>
            <input type="number" min={0} step={10} inputMode="decimal" value={sale} placeholder="What the finished product sells for" onChange={(e) => setSale(e.target.value)} />
            <span className="mg__suf" aria-hidden="true">/ sq ft</span>
          </span>
        </label>
      </div>

      <div className="mg__out" aria-live="polite">
        {r.ready ? (
          <>
            <p className="mg__outlabel">Margin</p>
            <p className="mg__outnum">{cad.format(Math.round(r.profit))}</p>
            <p className="mg__outnote">{(r.roc * 100).toFixed(1)}% return on cost</p>
            <div className="mg__outsplit">
              <div className="mg__outrow"><span>All-in cost</span><span>{cad.format(Math.round(r.cost))}</span></div>
              <div className="mg__outrow"><span>Projected revenue</span><span>{cad.format(Math.round(r.revenue))}</span></div>
            </div>
            <p className="mg__outnote">A first pass with your numbers. Send us the site and the pro forma comes next.</p>
          </>
        ) : (
          <>
            <p className="mg__outlabel">Feasibility</p>
            <p className="mg__outnote">Enter the land price, buildable area, a hard cost and a sale price to see cost, revenue and margin.</p>
          </>
        )}
      </div>
    </div>
  );
}
