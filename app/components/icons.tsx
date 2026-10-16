export function Arrow({ diagonal = false, back = false }: { diagonal?: boolean; back?: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={back ? { transform: "scaleX(-1)" } : undefined}><path d={diagonal ? "M7 17 17 7M8 7h9v9" : "M4 12h15m-6-6 6 6-6 6"} /></svg>;
}

const paths = {
  globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18M5 6.5h14M5 17.5h14" /></>,
  plane: <path d="M10.5 13.5 3 11l1.5-1.5 8 1 4-4.5c1-1 2.6-1.4 3.2-.7.7.6.3 2.2-.7 3.2l-4.5 4 1 8L14 22l-2.5-7.5L8 18v2.5L6.5 22 5 19l-3-1.5L3.5 16H6l4.5-2.5Z" />,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
  people: <><circle cx="9" cy="7" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v3" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m16 8-2 6-6 2 2-6 6-2Z" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>,
  route: <><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M8 19h7.5a3.5 3.5 0 0 0 0-7h-7a3.5 3.5 0 0 1 0-7H16" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4m8-4v4" /></>,
  leaf: <path d="M5 21c0-9 5-15 16-16-1 11-7 16-16 16Zm0 0 8-8" />,
  mountain: <path d="m2 20 7-12 4 6 3-4 6 10H2Zm7-12 2 3" />,
  support: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="2" y="14" width="4" height="6" rx="1.5" /><rect x="18" y="14" width="4" height="6" rx="1.5" /><path d="M20 20a4 4 0 0 1-4 3h-2" /></>,
  menu: <path d="M4 8h16M4 12h16M4 16h16" />,
  pin: <><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></>,
  ear: <path d="M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-5.5 1.6M10 9.5a2 2 0 0 1 4 0c0 1.2-1.5 1.6-1.5 3" />,
  nodes: <><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M10.8 7.2 6.2 15.8M13.2 7.2l4.6 8.6M7.5 18h9" /></>,
  bulb: <><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  document: <><path d="M6 3h8l4 4v14H6V3Z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 12h18" /></>,
  bed: <><path d="M3 5v15M3 16h18v4M21 16v-3a3 3 0 0 0-3-3h-7v6" /><circle cx="7" cy="12.5" r="2" /></>,
  car: <><path d="M4 17v-5l2.2-5h11.6L20 12v5H4Z" /><path d="M4 12h16M6.5 20v-3M17.5 20v-3" /><circle cx="8" cy="14.5" r=".8" /><circle cx="16" cy="14.5" r=".8" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  return: <path d="M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3" />,
  diamond: <><path d="M6.5 4h11L21 9l-9 11L3 9l3.5-5Z" /><path d="M3 9h18M9.5 4 12 20l2.5-16" /></>,
  megaphone: <><path d="M3 10v4h3l8 5V5L6 10H3Z" /><path d="M17 9a4 4 0 0 1 0 6M6 14l1.5 6H10l-1.2-5.2" /></>,
  handshake: <><path d="m2 12 4-5 4 1.5 2-1.5 4 .5 6 4.5" /><path d="m8 15 3 3a1.4 1.4 0 0 0 2-2l-1-1m-2 2 1.5 1.5a1.4 1.4 0 0 0 2-2M13 14l2 2a1.4 1.4 0 0 0 2-2l-4-4-2.5 2a1.6 1.6 0 0 1-2.3-2.2L11 8" /><path d="M2 12l3.5 3.5L8 15" /></>,
  chat: <><path d="M4 20.5 5.4 16.6A8.5 8.5 0 1 1 8.2 19.3L4 20.5Z" /><path d="M9 10.5c.3 1.6 1.9 3.3 3.6 3.8l1.2-1.1 1.7.8" /></>,
};

export type IconKind = keyof typeof paths;

export function TravelIcon({ kind, size = 22 }: { kind: IconKind; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>;
}
