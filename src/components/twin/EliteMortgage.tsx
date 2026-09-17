"use client";

import { useMemo, useState } from "react";
import { cad } from "@/lib/listings";

/**
 * Buyer tool (locked in the brief): a live planning estimate, standard amortized payment on the balance after
 * the down payment. The rate is the visitor's to enter; nothing here is a quote. Elite-styled for the cream
 * ground (underline fields, dark result panel). Logic mirrors the ink MortgageCalculator.
 */
export function EliteMortgage({ initialPrice = 1_000_000 }: { initialPrice?: number } = {}) {
  const [price, setPrice] = useState(initialPrice);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(25);

  const { monthly, principal, down } = useMemo(() => {
    const down = Math.round((price * downPct) / 100);
    const principal = Math.max(price - down, 0);
    const r = rate / 100 / 12;
    const n = years * 12;
    const monthly = r > 0 ? (principal * r) / (1 - Math.pow(1 + r, -n)) : principal / n;
    return { monthly, principal, down };
  }, [price, downPct, rate, years]);

  return (
    <div className="mg__grid" data-reveal="up">
      <div className="mg__fields">
        <label className="mg__field mg__field--full">
          <span className="mg__label">Purchase price</span>
          <span className="mg__inp">
            <span className="mg__pre" aria-hidden="true">$</span>
            <input type="number" min={0} step={10000} value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} />
          </span>
        </label>
        <label className="mg__field">
          <span className="mg__label">Down payment</span>
          <span className="mg__inp">
            <input type="number" min={5} max={95} step={1} value={downPct} onChange={(e) => setDownPct(Number(e.target.value) || 0)} aria-describedby="mg-down" />
            <span className="mg__suf" aria-hidden="true">%</span>
          </span>
          <span className="mg__hint" id="mg-down">{cad.format(down)} down</span>
        </label>
        <label className="mg__field">
          <span className="mg__label">Interest rate</span>
          <span className="mg__inp">
            <input type="number" min={0} max={20} step={0.05} value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)} />
            <span className="mg__suf" aria-hidden="true">%</span>
          </span>
          <span className="mg__hint">Enter your rate</span>
        </label>
        <label className="mg__field">
          <span className="mg__label">Amortization</span>
          <span className="mg__inp">
            <input type="number" min={5} max={30} step={5} value={years} onChange={(e) => setYears(Number(e.target.value) || 25)} />
            <span className="mg__suf" aria-hidden="true">years</span>
          </span>
        </label>
      </div>
      <div className="mg__out">
        <p className="mg__outlabel">Estimated monthly payment</p>
        <p className="mg__outnum" aria-live="polite">{cad.format(Math.round(monthly))}</p>
        <p className="mg__outnote">
          On {cad.format(principal)} after a {downPct}% down payment, over {years} years. An estimate for planning, not a quote.
        </p>
      </div>
    </div>
  );
}
