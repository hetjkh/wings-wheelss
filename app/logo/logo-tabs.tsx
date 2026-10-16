"use client";

import { useState, type ReactNode } from "react";
import { LogoLab, pairGroups } from "./logo-lab";
import { singleGroups } from "./single-layouts";
import type { LogoFont } from "./fonts";

const count = (groups: typeof pairGroups) => groups.reduce((sum, group) => sum + group.layouts.length, 0);

const tabs = [
  { id: "brand", label: "Brand sheet" },
  { id: "lab", label: `W&W lab · ${count(pairGroups)}` },
  { id: "single", label: `Single W · ${count(singleGroups)}` },
];

export function LogoTabs({ brand, fonts }: { brand: ReactNode; fonts: LogoFont[] }) {
  const [tab, setTab] = useState("brand");
  return <>
    <nav className="lg-tabs" role="tablist" aria-label="Logo views">
      {tabs.map(item => <button key={item.id} type="button" role="tab" id={`tab-${item.id}`} aria-selected={tab === item.id} aria-controls={`panel-${item.id}`} className={tab === item.id ? "is-on" : ""} onClick={() => setTab(item.id)}>{item.label}</button>)}
    </nav>
    <div role="tabpanel" id="panel-brand" aria-labelledby="tab-brand" hidden={tab !== "brand"}>{brand}</div>
    <div role="tabpanel" id="panel-lab" aria-labelledby="tab-lab" hidden={tab !== "lab"}>{tab === "lab" && <LogoLab fonts={fonts} groups={pairGroups} />}</div>
    <div role="tabpanel" id="panel-single" aria-labelledby="tab-single" hidden={tab !== "single"}>{tab === "single" && <LogoLab fonts={fonts} groups={singleGroups} sample="W" className="lb-single" />}</div>
  </>;
}
