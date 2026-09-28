"use client";

import { useState, type CSSProperties } from "react";
import { fill, type Dictionary, type Locale } from "@/lib/i18n";
import { CALCULATOR, PLANS, estimateCredits, formatNumber, recommendPlan } from "@/lib/pricing";
import { CalculatorIcon } from "./icons";

export default function Calculator({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [messages, setMessages] = useState<number>(CALCULATOR.messages.initial);
  const [minutes, setMinutes] = useState<number>(CALCULATOR.minutes.initial);
  const c = t.credits.calculator;

  const { messageCredits, voiceCredits, total } = estimateCredits(messages, minutes);
  const planId = recommendPlan(total);
  const planName = t.pricing.plans[planId].name;
  const demoHref = `/${locale}/demo?plan=${planId}&credits=${total}`;

  return (
    <div className="calc">
      <div className="calc__head">
        <CalculatorIcon size={24} className="teal" />
        <h3 className="calc__title">{c.title}</h3>
        <p className="calc__subtitle">{c.subtitle}</p>
      </div>
      <div className="calc__body">
        <div className="calc__inputs">
          <Slider
            id="calc-msgs"
            label={c.messagesLabel}
            value={messages}
            onChange={setMessages}
            range={CALCULATOR.messages}
            maxLabel={c.messagesMax}
          />
          <Slider
            id="calc-mins"
            label={c.minutesLabel}
            value={minutes}
            onChange={setMinutes}
            range={CALCULATOR.minutes}
            maxLabel={c.minutesMax}
          />
        </div>
        <div className="calc__results">
          <dl className="calc__breakdown">
            <div className="calc__row">
              <dt>{fill(c.messagesRow, { n: formatNumber(messages) })}</dt>
              <dd>{formatNumber(messageCredits)}</dd>
            </div>
            <div className="calc__row">
              <dt>{fill(c.voiceRow, { n: formatNumber(minutes) })}</dt>
              <dd>{formatNumber(voiceCredits)}</dd>
            </div>
            <div className="calc__row calc__row--total">
              <dt>{c.totalRow}</dt>
              <dd>{formatNumber(total)}</dd>
            </div>
          </dl>
          <div className="calc__rec" aria-live="polite">
            <div className="calc__rec-text">
              <span className="calc__rec-label">{c.recommended}</span>
              <span className="calc__rec-plan">{planName}</span>
              <span className="calc__rec-note">{fill(c.included, { n: formatNumber(PLANS[planId].credits) })}</span>
            </div>
            <a href={demoHref} className="calc__rec-cta">{fill(c.getPlan, { plan: planName })}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

type SliderProps = {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  range: { min: number; max: number; step: number };
  maxLabel: string;
};

function Slider({ id, label, value, onChange, range, maxLabel }: SliderProps) {
  const pct = ((value - range.min) / (range.max - range.min)) * 100;
  return (
    <div className="slider">
      <div className="slider__top">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id} className="slider__value">{formatNumber(value)}</output>
      </div>
      <input
        id={id}
        type="range"
        min={range.min}
        max={range.max}
        step={range.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--pct": `${pct}%` } as CSSProperties}
      />
      <div className="slider__scale"><span>{range.min}</span><span>{maxLabel}</span></div>
    </div>
  );
}
