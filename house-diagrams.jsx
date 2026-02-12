import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   THEME & SHARED INFRASTRUCTURE
   ═══════════════════════════════════════════════════════════════ */

const THEME = {
  bg: { page: "#0a0e1a", diagram: "#0f1729", zone: "#1e293b" },
  text: { heading: "#f1f5f9", body: "#cbd5e1", secondary: "#94a3b8", muted: "#64748b" },
  accent: { amber: "#f59e0b", red: "#ef4444", blue: "#3b82f6", green: "#22c55e", purple: "#8b5cf6", teal: "#14b8a6", pink: "#ec4899", orange: "#f97316", indigo: "#6366f1", cyan: "#06b6d4" },
  detailGradient: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
};

function SubTabSelector({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            padding: "6px 14px", borderRadius: 20,
            border: active === t.id ? "2px solid #f59e0b" : "1px solid #334155",
            background: active === t.id ? "#1e293b" : "transparent",
            color: active === t.id ? "#f59e0b" : "#94a3b8",
            cursor: "pointer", fontSize: 12, fontWeight: active === t.id ? 700 : 400,
            fontFamily: "system-ui", transition: "all 0.2s",
          }}
        >{t.label}</button>
      ))}
    </div>
  );
}

function DetailPanel({ color, title, detail }) {
  return (
    <div style={{ marginTop: 12, padding: 16, background: THEME.detailGradient, borderRadius: 12, borderLeft: `4px solid ${color}` }}>
      <div style={{ color: THEME.text.heading, fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ color: THEME.text.body, fontSize: 13, lineHeight: 1.6 }}>{detail}</div>
    </div>
  );
}

function DiagramWrapper({ children }) {
  return (
    <div style={{ background: THEME.bg.diagram, borderRadius: 16, padding: 16, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}

function ClickHint({ text }) {
  return (
    <div style={{ textAlign: "center", color: THEME.text.muted, fontSize: 11, marginTop: 8, fontFamily: "monospace" }}>
      {text || "Kattints egy elemre a részletes leírásért"}
    </div>
  );
}

function PhotoSection({ title, images, searchQuery }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 10 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: 8, padding: "8px 14px",
          borderRadius: 10, border: `1px solid ${open ? "#f59e0b" : "#334155"}`,
          background: open ? "#1e293b" : "transparent", color: open ? "#f59e0b" : "#94a3b8",
          cursor: "pointer", fontSize: 12, fontFamily: "system-ui", fontWeight: 600,
          transition: "all 0.2s",
        }}
      >
        <span style={{ fontSize: 14 }}>{open ? "▾" : "▸"}</span>
        {title || "Hogyan néz ki a valóságban?"}
      </button>
      {open && (
        <div style={{ marginTop: 8 }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 10, marginBottom: 8,
          }}>
            {images.map((img, i) => (
              <div key={i} style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #334155", background: "#0f172a" }}>
                <img
                  src={img.url} alt={img.alt || ""}
                  style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }}
                  loading="lazy"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                {img.caption && (
                  <div style={{ padding: "6px 8px", fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>
                    {img.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
          {searchQuery && (
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-block", padding: "6px 12px", borderRadius: 8,
                border: "1px solid #334155", color: "#94a3b8", fontSize: 11,
                textDecoration: "none", fontFamily: "monospace",
              }}
            >
              További képek keresése &rarr;
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TABS CONFIGURATION (16 tabs, 4 groups)
   ═══════════════════════════════════════════════════════════════ */

const tabs = [
  { id: "permits", label: "📋 Engedélyek", subtitle: "Jog & CSOK", group: "tervezes" },
  { id: "budget", label: "💰 Költségvetés", subtitle: "Árak & fizetés", group: "tervezes" },
  { id: "foundation", label: "🧱 Alapozás", subtitle: "Sáv & lemez", group: "szerkezet" },
  { id: "wall", label: "🏠 Falszerkezet", subtitle: "Rétegrend", group: "szerkezet" },
  { id: "fodem", label: "🏗️ Födém", subtitle: "Típusok", group: "szerkezet" },
  { id: "roof", label: "🏗️ Tetőszerkezet", subtitle: "Elemek", group: "szerkezet" },
  { id: "window", label: "🪟 Nyílászáró", subtitle: "Beépítés", group: "szerkezet" },
  { id: "mechanical", label: "🔧 Gépészet", subtitle: "Fűtés & HMV", group: "gepeszet" },
  { id: "electrical", label: "⚡ Villany", subtitle: "Elosztás", group: "gepeszet" },
  { id: "ventilation", label: "🌬️ Szellőzés", subtitle: "Párazárás", group: "gepeszet" },
  { id: "utilities", label: "🚰 Közmű", subtitle: "Csatlakozás", group: "gepeszet" },
  { id: "smarthome", label: "🔌 Smart home", subtitle: "Napelem", group: "gepeszet" },
  { id: "waterproof", label: "💧 Vízszigetelés", subtitle: "Típusok", group: "szigeteles" },
  { id: "sound", label: "🔇 Hangszigetelés", subtitle: "Rétegek", group: "szigeteles" },
  { id: "energy", label: "🌡️ Energetika", subtitle: "Méretezés", group: "szigeteles" },
  { id: "tiling", label: "🔲 Burkolás", subtitle: "Lépések", group: "kivitelezes" },
  { id: "interior", label: "🚪 Belső kivitelezés", subtitle: "Ajtók & festés", group: "kivitelezes" },
  { id: "compare", label: "⚖️ Összehasonlítás", subtitle: "Anyagok", group: "kivitelezes" },
  { id: "inspector", label: "👷 Műsz. ellenőr", subtitle: "Szerepe", group: "kivitelezes" },
  { id: "timeline", label: "⏱️ Ütemterv", subtitle: "Fázisok", group: "kivitelezes" },
  { id: "maintenance", label: "🛡️ Karbantartás", subtitle: "Garancia", group: "kivitelezes" },
];

const groups = [
  { id: "tervezes", label: "Tervezés" },
  { id: "szerkezet", label: "Szerkezet" },
  { id: "gepeszet", label: "Gépészet" },
  { id: "szigeteles", label: "Szigetelés" },
  { id: "kivitelezes", label: "Kivitelezés" },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENT STUBS — will be replaced with full implementations
   ═══════════════════════════════════════════════════════════════ */

/* ─── MECHANICAL SYSTEM ─── */
function MechanicalDiagram() {
  const [subTab, setSubTab] = useState("system");
  const [activeNode, setActiveNode] = useState(null);

  const subTabs = [
    { id: "system", label: "Rendszer" },
    { id: "heatpump", label: "Hőszivattyú típusok" },
  ];

  const nodes = [
    { id: "outdoor", x: 80, y: 80, w: 150, h: 70, label: "KÜLTÉRI EGYSÉG", sub: "Levegőből hőt nyer", color: "#3b82f6", icon: "❄️" },
    { id: "indoor", x: 340, y: 80, w: 150, h: 70, label: "BELTÉRI EGYSÉG", sub: "Vezérlés + kompresszor", color: "#6366f1", icon: "🎛️" },
    { id: "buffer", x: 340, y: 220, w: 150, h: 70, label: "PUFFER TARTÁLY", sub: "Fűtővíz tárolás (50-100L)", color: "#f59e0b", icon: "🛢️" },
    { id: "hmv", x: 580, y: 80, w: 150, h: 70, label: "HMV TÁROLÓ", sub: "Meleg víz (200-300L)", color: "#ef4444", icon: "🚿" },
    { id: "manifold", x: 340, y: 370, w: 150, h: 70, label: "OSZTÓ-GYŰJTŐ", sub: "Körök elosztása", color: "#10b981", icon: "🔀" },
    { id: "floor1", x: 100, y: 500, w: 130, h: 60, label: "NAPPALI", sub: "Padlófűtés kör 1", color: "#14b8a6", icon: "🏠" },
    { id: "floor2", x: 280, y: 500, w: 130, h: 60, label: "HÁLÓSZOBA", sub: "Padlófűtés kör 2", color: "#14b8a6", icon: "🛏️" },
    { id: "floor3", x: 460, y: 500, w: 130, h: 60, label: "FÜRDŐ", sub: "Padlófűtés kör 3", color: "#14b8a6", icon: "🛁" },
    { id: "floor4", x: 640, y: 500, w: 130, h: 60, label: "KONYHA", sub: "Padlófűtés kör 4", color: "#14b8a6", icon: "🍳" },
    { id: "thermo", x: 580, y: 370, w: 150, h: 70, label: "TERMOSZTÁTOK", sub: "Szobánkénti szabályozás", color: "#8b5cf6", icon: "🌡️" },
  ];

  const connections = [
    { from: "outdoor", to: "indoor", label: "Hűtőközeg", color: "#3b82f6", type: "thick" },
    { from: "indoor", to: "buffer", label: "Fűtővíz", color: "#f59e0b" },
    { from: "indoor", to: "hmv", label: "HMV fűtés", color: "#ef4444" },
    { from: "buffer", to: "manifold", label: "Meleg víz ↓", color: "#f59e0b" },
    { from: "manifold", to: "floor1", label: "", color: "#14b8a6" },
    { from: "manifold", to: "floor2", label: "", color: "#14b8a6" },
    { from: "manifold", to: "floor3", label: "", color: "#14b8a6" },
    { from: "manifold", to: "floor4", label: "", color: "#14b8a6" },
    { from: "thermo", to: "manifold", label: "Jel", color: "#8b5cf6", dashed: true },
  ];

  const systemDetails = {
    outdoor: { title: "❄️ KÜLTÉRI EGYSÉG", color: "#3b82f6", detail: "A kültéri egység ventilátorral szívja be a levegőt, és a hőcserélő kivonja belőle a hőt — még -15°C-ban is! FONTOS: a reklámban szereplő COP (teljesítménytényező — 1 kW villanyból hány kW hőt ad) 5-6 az +7°C-on mért érték. Valós téli COP -7°C-on: 2.5-4.0! -15°C-on már csak 2.0-2.5. Kérd el a gyártó SCOP értékét (szezonális COP, éves átlag — reálisabb)." },
    indoor: { title: "🎛️ BELTÉRI EGYSÉG", color: "#6366f1", detail: "A beltéri egység a kompresszort és a vezérlő elektronikát tartalmazza. A forró, nagy nyomású hűtőközeg itt adja le a hőt a fűtővíznek. Modern inverter kompresszorral a teljesítmény 30-100% között szabályozható." },
    buffer: { title: "🛢️ PUFFER TARTÁLY", color: "#f59e0b", detail: "A puffer FŰTŐVIZET tárol (35-45°C), nem csapvizet! Mérete: 50-100L. Kiegyenlíti a termelés és felhasználás közötti különbséget. NE keverd a HMV tárolóval: a puffer a padlófűtésé, a HMV a zuhanyzóé. Ha valaki 'egy tartályt' ajánl mindenre → gyanús." },
    hmv: { title: "🚿 HMV TÁROLÓ", color: "#ef4444", detail: "A HMV (használati melegvíz) tároló a CSAPVIZET melegíti (55°C, 200-300L). A hőszivattyú prioritásban kezeli: ha a HMV lehűl, először azt melegíti, aztán fűt. LEGIONELLA ellen hetente 60°C-ra kell felmelegíteni! Ez kötelező higiéniai előírás." },
    manifold: { title: "🔀 OSZTÓ-GYŰJTŐ", color: "#10b981", detail: "Az osztó-gyűjtő elosztja a meleg vizet a padlófűtési körökre, és visszagyűjti a lehűlt vizet. Minden körön szelep van, amit a termosztát vezérel. NYOMÁSPRÓBA ITT: 6-10 bar, 24 óráig! Jegyzőkönyvet kérj!" },
    floor1: { title: "🏠 NAPPALI", color: "#14b8a6", detail: "Nappali padlófűtés: 15-20 cm csőosztás, csigavonalban fektetve. Az ablak előtt sűrűbb (10-15 cm) az egyenletes hőért." },
    floor2: { title: "🛏️ HÁLÓSZOBA", color: "#14b8a6", detail: "Hálószoba: alacsonyabb hőmérséklet (20-21°C), 20 cm csőosztás elegendő." },
    floor3: { title: "🛁 FÜRDŐ", color: "#14b8a6", detail: "Fürdőszoba: sűrű csőosztás (10-15 cm), 24-25°C. A zuhanyzó alá NEM szabad csövet fektetni (szifon útban van)!" },
    floor4: { title: "🍳 KONYHA", color: "#14b8a6", detail: "Konyha: 15 cm csőosztás. Beépített konyhabútor alá ne kerüljön felesleges cső (nem hatékony)." },
    thermo: { title: "🌡️ TERMOSZTÁTOK", color: "#8b5cf6", detail: "Szobánkénti termosztát vezérli az osztó-gyűjtő szelepeit. WiFi-s (Honeywell, tado°) app-ból is vezérelhető." },
  };

  const hpElements = [
    { id: "air_outdoor", x: 40, y: 60, w: 300, h: 180, label: "Levegő-víz kültéri", color: "#3b82f6" },
    { id: "air_cop", x: 40, y: 260, w: 300, h: 80, label: "COP görbe", color: "#60a5fa" },
    { id: "geo_well", x: 430, y: 60, w: 300, h: 90, label: "Függőleges szonda", color: "#22c55e" },
    { id: "geo_collector", x: 430, y: 170, w: 300, h: 90, label: "Vízszintes kollektor", color: "#4ade80" },
    { id: "geo_cop", x: 430, y: 280, w: 300, h: 60, label: "Állandó COP 4-5", color: "#16a34a" },
    { id: "cost_compare", x: 150, y: 380, w: 470, h: 60, label: "Költség összehasonlítás", color: "#f59e0b" },
  ];

  const hpDetails = {
    air_outdoor: { title: "Levegő-víz kültéri egység", color: "#3b82f6", detail: "A levegő-víz hőszivattyú a leggyakoribb választás. A kültéri egység ventilátorral szívja be a levegőt és hőcserélőn keresztül vonja ki a hőt. Előny: egyszerű telepítés, nincs fúrás. Hátrány: a COP erősen függ a külső hőmérséklettől, és a ventilátor hangos lehet (35-55 dB)." },
    air_cop: { title: "COP alakulása hőmérséklet szerint", color: "#60a5fa", detail: "A COP (hatásfok) a külső hőmérséklettel csökken: +7°C → COP 4.5-5.5 | 0°C → COP 3.0-4.0 | -7°C → COP 2.5-3.5 | -15°C → COP 2.0-2.5. Az éves átlag (SCOP) 3.0-4.0 közé esik. A gyártók a +7°C-os értéket reklámozzák — ez FÉLREVEZETŐ!" },
    geo_well: { title: "Függőleges szonda (fúrt kút)", color: "#22c55e", detail: "80-150 méter mély fúrás, zárt rendszerű szondával. A talaj hőmérséklete 10-12°C egész évben. Kis helyigény (1-2 m²), de drága fúrás: 8-15.000 Ft/méter. Engedélyköteles! Bányakapitányság jóváhagyása kell." },
    geo_collector: { title: "Vízszintes kollektor", color: "#4ade80", detail: "1-1.5 méter mélyen, vízszintesen fektetett csőrendszer. 200-400 m² kertterület kell (a fűtött alapterület 1.5-2x-ese). Olcsóbb mint a fúrás, de nagy kert kell. A kollektor felett NEM lehet beton, medence, vagy mély gyökerű fa." },
    geo_cop: { title: "Állandó COP: miért jobb?", color: "#16a34a", detail: "A földhő 10-12°C egész évben → a COP állandó 4.0-5.0! Nincs téli teljesítménycsökkenés. Ez évi 20-30% megtakarítást jelent a levegő-vízhez képest. Plusz: teljesen csendes (nincs kültéri ventilátor)." },
    cost_compare: { title: "Költség összehasonlítás", color: "#f59e0b", detail: "Levegő-víz: 2-4M Ft telepítve, 15-20 év élettartam, éves üzemeltetés: 150-300k Ft. Föld-víz: 5-10M Ft (fúrás/kollektor drága!), 25-30+ év élettartam, éves üzemeltetés: 100-200k Ft. A föld-víz 10-15 év alatt megtérül a levegő-vízhez képest." },
  };

  const getNodeCenter = (id) => {
    const n = nodes.find(n => n.id === id);
    return { x: n.x + n.w / 2, y: n.y + n.h / 2 };
  };

  const currentDetails = subTab === "system" ? systemDetails : hpDetails;
  const currentColor = activeNode && currentDetails[activeNode] ? currentDetails[activeNode].color : "#94a3b8";
  const currentTitle = activeNode && currentDetails[activeNode] ? currentDetails[activeNode].title : "";
  const currentDetail = activeNode && currentDetails[activeNode] ? currentDetails[activeNode].detail : "";

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveNode(null); }} />

      {subTab === "system" && (
        <DiagramWrapper>
          <svg viewBox="0 0 820 590" style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <marker id="mech-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
              </marker>
              <filter id="mech-glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <rect x="30" y="40" width="760" height="130" rx="12" fill="#1e293b" opacity="0.5" />
            <text x="50" y="30" fill="#64748b" fontSize="11" fontFamily="monospace">KAZÁNHÁZ</text>
            <rect x="30" y="190" width="760" height="280" rx="12" fill="#1e293b" opacity="0.3" />
            <text x="50" y="185" fill="#64748b" fontSize="11" fontFamily="monospace">ELOSZTÁS + SZABÁLYOZÁS</text>
            <rect x="30" y="480" width="760" height="100" rx="12" fill="#1e293b" opacity="0.2" />
            <text x="50" y="475" fill="#64748b" fontSize="11" fontFamily="monospace">PADLÓFŰTÉS KÖRÖK</text>
            {connections.map((c, i) => {
              const from = getNodeCenter(c.from);
              const to = getNodeCenter(c.to);
              return (
                <g key={i}>
                  <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={c.color} strokeWidth={c.type === "thick" ? 4 : 2} strokeDasharray={c.dashed ? "6,4" : "none"} opacity={0.6} markerEnd="url(#mech-arrow)" />
                  {c.label && <text x={(from.x + to.x) / 2 + 8} y={(from.y + to.y) / 2 - 6} fill={c.color} fontSize="10" fontFamily="monospace" opacity={0.8}>{c.label}</text>}
                </g>
              );
            })}
            {nodes.map((n) => (
              <g key={n.id} onClick={() => setActiveNode(activeNode === n.id ? null : n.id)} style={{ cursor: "pointer" }}>
                <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={10} fill={activeNode === n.id ? n.color : "#1e293b"} stroke={n.color} strokeWidth={activeNode === n.id ? 3 : 1.5} filter={activeNode === n.id ? "url(#mech-glow)" : "none"} />
                <text x={n.x + 12} y={n.y + 22} fill="white" fontSize="11" fontWeight="bold" fontFamily="system-ui">{n.icon} {n.label}</text>
                <text x={n.x + 12} y={n.y + 40} fill="#94a3b8" fontSize="9" fontFamily="monospace">{n.sub}</text>
                {activeNode !== n.id && <text x={n.x + n.w - 20} y={n.y + n.h - 8} fill="#475569" fontSize="9" fontFamily="monospace">[?]</text>}
              </g>
            ))}
            <g>
              <rect x="80" y="165" width="150" height="35" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1" />
              <text x="92" y="178" fill="#93c5fd" fontSize="9" fontWeight="bold" fontFamily="monospace">COP @ -7°C: 2.5-4.0</text>
              <text x="92" y="189" fill="#64748b" fontSize="8" fontFamily="monospace">1 kW villany → 2.5-4 kW hő</text>
              <text x="92" y="199" fill="#475569" fontSize="7" fontFamily="monospace">(COP = teljesítménytényező, magasabb = jobb)</text>
            </g>
          </svg>
        </DiagramWrapper>
        <PhotoSection searchQuery="hőszivattyú levegő víz heat pump" images={[
          { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Outunit_of_heat_pump.jpg/320px-Outunit_of_heat_pump.jpg", alt: "Hőszivattyú", caption: "Levegő-víz hőszivattyú kültéri egység" },
          { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Boiler_Room.jpg/320px-Boiler_Room.jpg", alt: "Kazánház", caption: "HMV tároló és fűtési rendszer" }
        ]} />
      )}

      {subTab === "heatpump" && (
        <DiagramWrapper>
          <svg viewBox="0 0 780 460" style={{ width: "100%", height: "auto", display: "block" }}>
            <text x="195" y="30" fill="#3b82f6" fontSize="14" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">Levegő-víz</text>
            <text x="195" y="48" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">Leggyakoribb választás</text>
            <text x="585" y="30" fill="#22c55e" fontSize="14" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">Föld-víz (geotermikus)</text>
            <text x="585" y="48" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">Prémium, de megéri</text>
            <line x1="385" y1="20" x2="385" y2="450" stroke="#334155" strokeWidth="1" strokeDasharray="6,4" />
            {hpElements.map((el) => (
              <g key={el.id} onClick={() => setActiveNode(activeNode === el.id ? null : el.id)} style={{ cursor: "pointer" }}>
                <rect x={el.x} y={el.y} width={el.w} height={el.h} rx={10} fill={activeNode === el.id ? el.color : "#1e293b"} stroke={el.color} strokeWidth={activeNode === el.id ? 2.5 : 1} opacity={activeNode === el.id ? 1 : 0.8} />
                <text x={el.x + 15} y={el.y + 25} fill="#f1f5f9" fontSize="12" fontWeight="bold" fontFamily="system-ui">{el.label}</text>
              </g>
            ))}
            {/* Air unit fan */}
            <circle cx="190" cy="150" r="40" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.5" />
            <text x="190" y="155" fill="#93c5fd" fontSize="24" textAnchor="middle">❄️</text>
            {/* COP curve */}
            <polyline points="60,280 120,285 180,295 240,310 300,325" fill="none" stroke="#60a5fa" strokeWidth="2" />
            <text x="60" y="275" fill="#64748b" fontSize="8" fontFamily="monospace">COP 5</text>
            <text x="300" y="338" fill="#64748b" fontSize="8" fontFamily="monospace">COP 2.5</text>
            <text x="100" y="335" fill="#475569" fontSize="8" fontFamily="monospace">+7°C → → → -15°C</text>
            {/* Geo well */}
            <line x1="580" y1="80" x2="580" y2="140" stroke="#22c55e" strokeWidth="4" />
            <text x="600" y="120" fill="#64748b" fontSize="9" fontFamily="monospace">80-150m mély</text>
            {/* Geo collector wavy */}
            <path d="M 460,200 Q 480,190 500,200 Q 520,210 540,200 Q 560,190 580,200 Q 600,210 620,200 Q 640,190 660,200 Q 680,210 700,200" fill="none" stroke="#4ade80" strokeWidth="2" />
            <text x="460" y="245" fill="#64748b" fontSize="9" fontFamily="monospace">200-400 m² kert alatt</text>
            {/* Geo COP flat */}
            <line x1="450" y1="310" x2="710" y2="310" stroke="#16a34a" strokeWidth="3" />
            <text x="460" y="305" fill="#86efac" fontSize="9" fontWeight="bold" fontFamily="monospace">COP 4-5 egész évben!</text>
            {/* Cost */}
            <text x="200" y="415" fill="#3b82f6" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">2-4M Ft</text>
            <text x="560" y="415" fill="#22c55e" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">5-10M Ft</text>
          </svg>
        </DiagramWrapper>
      )}

      {activeNode && currentDetails[activeNode] && (
        <DetailPanel color={currentColor} title={currentTitle} detail={currentDetail} />
      )}
      <ClickHint />
    </div>
  );
}

/* ─── FOUNDATION ─── */
function FoundationDiagram() {
  const [subTab, setSubTab] = useState("layers");
  const [activeEl, setActiveEl] = useState(null);

  const subTabs = [
    { id: "layers", label: "Rétegek" },
    { id: "types", label: "Sáv vs Lemez" },
    { id: "soil", label: "Talajtípusok" },
    { id: "mistakes_f", label: "⚠ Gyakori hibák" },
  ];

  const layers = [
    { id: "floor", y: 40, h: 30, color: "#d4a574", label: "Padlóburkolat", detail: "Kerámia, vinyl vagy laminált. Padlófűtésnél a kerámia a legjobb hővezető, de kikapcsolt fűtésnél hideg a lábnak." },
    { id: "ragaszto", y: 70, h: 12, color: "#c9956e", label: "Ragasztó (flex!)", detail: "Padlófűtésnél FLEXIBILIS ragasztó kell! A hőtágulás miatt a merev ragasztó repedne. Pl. Mapei Keraflex, Weber Flex." },
    { id: "estrich", y: 82, h: 50, color: "#9ca3af", label: "Aljzatbeton (estrich) – min. 6 cm", detail: "Cement vagy anhydrit aljzatbeton. Min. 6 cm a cső FELETT. Száradás: cm-enként 1 hét! 6 cm = 6 hét. Burkolás ELŐTT CM mérés: max 2% nedvesség." },
    { id: "padlofutes", y: 132, h: 20, color: "#ef4444", label: "⟿ Padlófűtés csövek (PEX-AL-PEX)", detail: "Ötrétegű cső, csigavonalban fektetve. Osztás: fürdő 10-15 cm, szoba 15-20 cm. NYOMÁSPRÓBA: 6-10 bar, 24 óra! Betonozás ELŐTT!" },
    { id: "folia", y: 152, h: 8, color: "#fbbf24", label: "Hővisszaverő fólia (alu)", detail: "Alumínium fólia felfelé veri a hőt. Nélküle a padlófűtés energiájának 20-30%-a lefelé sugárzik." },
    { id: "eps_padlo", y: 160, h: 50, color: "#60a5fa", label: "EPS hőszigetelés – 5-10 cm", detail: "Expandált polisztirol (hungarocell). Min. 5 cm, ideálisan 10 cm. λ=0.038 W/mK (hővezetési tényező — minél kisebb, annál jobb szigetelő)." },
    { id: "vizszig", y: 210, h: 10, color: "#1f2937", label: "Vízszigetelés (bitumenes lemez)", detail: "VÍZSZINTES vízszigetelés az alap tetején. Bitumenes lemez lehegesztve vagy HDPE membrán. SOHA ne csak kent (Hidrosol) — lemez kell!" },
    { id: "alap_beton", y: 220, h: 80, color: "#6b7280", label: "Vasbeton alap (C25/30)", detail: "Sávalap: 40-60 cm széles, 80-120 cm mély (fagyhatár alá!). Vasalás: Ø12 mm, kengyel Ø8/20-25 cm. VIBRÁTORRAL tömöríteni! A fagyhatár Magyarországon 80-100 cm — ha az alap ennél magasabban van, a fagy felemeli és megrepeszti!" },
    { id: "alab", y: 300, h: 15, color: "#9ca3af", label: "Alábetonozás (C12/15)", detail: "5-10 cm sovány beton az árok alján. Egyenletes felület a vasalásnak." },
    { id: "kavics", y: 315, h: 35, color: "#d97706", label: "Tömörített kavicságy – 15-20 cm", detail: "Mosott kavics, géppel tömörítve. Teherelosztás + vízelvezetés. FIGYELD: sok kivitelező elvékonyítja vagy kihagyja! Betonozás ELŐTT mérd le és fotózd! A kavicságy nélkül a talajvíz közvetlenül az alapot támadja." },
    { id: "talaj", y: 350, h: 50, color: "#78716c", label: "Eredeti talaj", detail: "A talaj teherbírását talajmechanikai vizsgálat határozza meg (40-80.000 Ft). Ez dönti el: sávalap vagy lemezalap. Talajvízszint is itt derül ki." },
  ];

  const typeElements = [
    { id: "strip_section", x: 30, y: 60, w: 300, h: 180, label: "Sávalap metszet", color: "#6b7280" },
    { id: "strip_rebar", x: 30, y: 260, w: 300, h: 60, label: "Vasalás részletek", color: "#94a3b8" },
    { id: "slab_section", x: 410, y: 60, w: 300, h: 180, label: "Lemezalap metszet", color: "#3b82f6" },
    { id: "slab_edge", x: 410, y: 260, w: 300, h: 60, label: "Szélgerenda", color: "#60a5fa" },
    { id: "when_strip", x: 30, y: 340, w: 300, h: 60, label: "Mikor sávalapot?", color: "#22c55e" },
    { id: "when_slab", x: 410, y: 340, w: 300, h: 60, label: "Mikor lemezalapot?", color: "#f59e0b" },
  ];

  const typeDetails = {
    strip_section: { title: "Sávalap keresztmetszet", color: "#6b7280", detail: "Sávalap: keskeny, mély betoncsík a teherhordó falak alatt. 40-60 cm széles, 80-120 cm mély (fagyhatár alá!). A fal közvetlenül a sávra épül. Magyarországon a legelterjedtebb alapozási mód." },
    strip_rebar: { title: "Sávalap vasalás", color: "#94a3b8", detail: "Alsó-felső Ø12mm betonacél, kengyel Ø8/20cm. A betonfedés min. 5 cm. A vasalási tervet MINDIG statikus készítse! A kengyel tartja össze az alsó és felső vasat, és felveszi a nyíróerőt." },
    slab_section: { title: "Lemezalap keresztmetszet", color: "#3b82f6", detail: "Az egész ház alatt egybefüggő vasbeton tábla. 25-35 cm vastag, alsó-felső vasháló (Ø10-12/15x15). Egyenletes teherelosztás — a ház súlya nagy felületen oszlik el." },
    slab_edge: { title: "Szélgerenda (edge beam)", color: "#60a5fa", detail: "A lemez szélén vastagított rész (40-60 cm mély). Megakadályozza az oldalirányú elmozdulást és a szélső falak alatti süllyedést. Extra vasalás a szélgerendában!" },
    when_strip: { title: "Mikor válassz sávalapot?", color: "#22c55e", detail: "Jó teherbírású talaj (>150 kPa — kilopascal, a talaj teherbírásának mértékegysége), egyszerű téglalap alaprajz, alacsony talajvíz. Olcsóbb: 15-25.000 Ft/m². Egyszerű kivitelezés, nem kell speciális gép." },
    when_slab: { title: "Mikor válassz lemezalapot?", color: "#f59e0b", detail: "Gyenge/változó teherbírású talaj, magas talajvíz, bonyolult alaprajz, padlófűtés mindenhol. Drágább: 25-40.000 Ft/m², de egyenletesebb és biztosabb. Passzívházaknál szinte mindig lemezalap." },
  };

  const soilTypes = [
    { id: "humus", y: 60, h: 50, color: "#4a3728", label: "Humusz (termőtalaj)", detail: "20-40cm vastag. MINDIG el kell távolítani az alapozás előtt! Nem teherhordó, szerves anyag, rothadásnak indul a beton alatt." },
    { id: "clay", y: 120, h: 70, color: "#b45309", label: "Agyag – 100-200 kPa", detail: "Problémás talaj: nedvesen duzzad, szárazon zsugorodik. Mozog az évszakokkal! Lemezalapot vagy mélyített sávalapot igényel. Drénezés KÖTELEZŐ." },
    { id: "sand", y: 200, h: 70, color: "#eab308", label: "Homok – 150-300 kPa", detail: "Jó teherbírás, jó vízelvezetés. Tömörítés után kiváló alap. De figyelni kell a vízmosásra (aláásás). Sávalap általában elegendő." },
    { id: "gravel_soil", y: 280, h: 70, color: "#d97706", label: "Kavics – 300-600 kPa", detail: "A legjobb természetes alapozási talaj. Kiváló teherbírás, kiváló vízelvezetés. Sávalap tökéletesen megfelel." },
    { id: "water_table", y: 380, h: 50, color: "#3b82f6", label: "Talajvíz szint", detail: "A talajvízszint DÖNTŐ tényező! Ha az alap a talajvíz alatt van, speciális vízszigetelés és szivattyúzás kell. Talajmechanikai vizsgálat (40-80.000 Ft) KÖTELEZŐ alapozás előtt!" },
  ];

  const currentDetails = subTab === "layers" ? null : subTab === "types" ? typeDetails : null;

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />

      {subTab === "layers" && (
        <DiagramWrapper>
          <svg viewBox="0 0 780 430" style={{ width: "100%", height: "auto", display: "block" }}>
            <line x1="0" y1="218" x2="780" y2="218" stroke="#4ade80" strokeWidth="2" strokeDasharray="8,4" />
            <text x="690" y="215" fill="#4ade80" fontSize="10" fontFamily="monospace">TEREPSZINT</text>
            <line x1="0" y1="310" x2="780" y2="310" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4,4" />
            <text x="680" y="307" fill="#60a5fa" fontSize="9" fontFamily="monospace">FAGYHATÁR 80-100cm</text>
            <rect x="50" y="40" width="40" height="180" rx="2" fill="#b45309" opacity="0.3" stroke="#b45309" strokeWidth="1" />
            <text x="55" y="130" fill="#d97706" fontSize="9" fontFamily="monospace" transform="rotate(-90, 55, 130)">FALTÉGLA 30cm</text>
            <rect x="20" y="40" width="30" height="180" rx="2" fill="#60a5fa" opacity="0.2" stroke="#60a5fa" strokeWidth="1" />
            <text x="25" y="130" fill="#93c5fd" fontSize="8" fontFamily="monospace" transform="rotate(-90, 25, 130)">SZIGETELÉS 15cm</text>
            <rect x="88" y="220" width="4" height="100" fill="#1f2937" opacity="0.8" />
            <text x="96" y="275" fill="#94a3b8" fontSize="8" fontFamily="monospace">FÜGGŐLEGES</text>
            <text x="96" y="285" fill="#94a3b8" fontSize="8" fontFamily="monospace">vízszigetelés</text>
            {layers.map((l) => (
              <g key={l.id} onClick={() => setActiveEl(activeEl === l.id ? null : l.id)} style={{ cursor: "pointer" }}>
                <rect x="100" y={l.y} width="550" height={l.h} rx={3} fill={l.color} opacity={activeEl === l.id ? 1 : 0.7} stroke={activeEl === l.id ? "#fff" : "transparent"} strokeWidth={2} />
                <text x="115" y={l.y + l.h / 2 + 4} fill={l.y < 200 ? "#1e293b" : "#f1f5f9"} fontSize={l.h > 20 ? "12" : "9"} fontWeight="bold" fontFamily="system-ui">{l.label}</text>
                <line x1="670" y1={l.y} x2="670" y2={l.y + l.h} stroke="#64748b" strokeWidth="1" />
                <line x1="665" y1={l.y} x2="675" y2={l.y} stroke="#64748b" strokeWidth="1" />
                <line x1="665" y1={l.y + l.h} x2="675" y2={l.y + l.h} stroke="#64748b" strokeWidth="1" />
              </g>
            ))}
            {[120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520, 540, 560, 580].map((x, i) => (
              <circle key={i} cx={x} cy={142} r={4} fill="#ef4444" stroke="#fca5a5" strokeWidth="1" opacity={0.8} />
            ))}
          </svg>
        </DiagramWrapper>
        <PhotoSection searchQuery="sávalap alapozás építés" images={[
          { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Streifenfundament.jpg/320px-Streifenfundament.jpg", alt: "Sávalap", caption: "Sávalap betonozás előtt — vasalás a zsaluban" },
          { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Concrete_foundation.jpg/320px-Concrete_foundation.jpg", alt: "Betonalap", caption: "Kiöntött betonalap száradás közben" }
        ]} />
      )}

      {subTab === "types" && (
        <DiagramWrapper>
          <svg viewBox="0 0 780 420" style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              {/* Hatched pattern for concrete */}
              <pattern id="concreteHatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="#94a3b8" strokeWidth="0.5" opacity="0.4" />
              </pattern>
              {/* Stipple pattern for gravel */}
              <pattern id="gravelStipple" patternUnits="userSpaceOnUse" width="8" height="8">
                <circle cx="2" cy="2" r="1" fill="#a16207" opacity="0.5" />
                <circle cx="6" cy="6" r="0.8" fill="#92400e" opacity="0.4" />
                <circle cx="5" cy="1" r="0.6" fill="#a16207" opacity="0.3" />
              </pattern>
              {/* Brick pattern */}
              <pattern id="brickPattern" patternUnits="userSpaceOnUse" width="20" height="12">
                <rect width="20" height="12" fill="#b45309" />
                <line x1="0" y1="6" x2="20" y2="6" stroke="#92400e" strokeWidth="0.5" />
                <line x1="0" y1="0" x2="0" y2="6" stroke="#92400e" strokeWidth="0.5" />
                <line x1="10" y1="0" x2="10" y2="6" stroke="#92400e" strokeWidth="0.5" />
                <line x1="5" y1="6" x2="5" y2="12" stroke="#92400e" strokeWidth="0.5" />
                <line x1="15" y1="6" x2="15" y2="12" stroke="#92400e" strokeWidth="0.5" />
              </pattern>
              {/* Reinforcement mesh pattern for slab */}
              <pattern id="rebarMesh" patternUnits="userSpaceOnUse" width="12" height="12">
                <line x1="0" y1="6" x2="12" y2="6" stroke="#dc2626" strokeWidth="0.4" opacity="0.5" />
                <line x1="6" y1="0" x2="6" y2="12" stroke="#dc2626" strokeWidth="0.4" opacity="0.5" />
              </pattern>
              {/* XPS insulation pattern */}
              <pattern id="xpsPattern" patternUnits="userSpaceOnUse" width="30" height="14">
                <rect width="30" height="14" fill="#67e8f9" opacity="0.3" />
                <rect x="1" y="1" width="13" height="12" rx="1" fill="#22d3ee" opacity="0.25" stroke="#06b6d4" strokeWidth="0.3" />
                <rect x="16" y="1" width="13" height="12" rx="1" fill="#22d3ee" opacity="0.25" stroke="#06b6d4" strokeWidth="0.3" />
              </pattern>
              {/* Soil gradient for strip side */}
              <linearGradient id="soilGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a3728" />
                <stop offset="25%" stopColor="#78552b" />
                <stop offset="50%" stopColor="#b45309" />
                <stop offset="80%" stopColor="#92400e" />
                <stop offset="100%" stopColor="#78716c" />
              </linearGradient>
            </defs>

            {/* Titles */}
            <text x="190" y="25" fill="#94a3b8" fontSize="14" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">SÁVALAP</text>
            <text x="575" y="25" fill="#3b82f6" fontSize="14" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">LEMEZALAP</text>
            {/* Divider */}
            <line x1="385" y1="15" x2="385" y2="410" stroke="#334155" strokeWidth="1" strokeDasharray="6,4" />

            {/* ===== SÁVALAP (LEFT SIDE x=30-350) ===== */}

            {/* Soil background with gradient layers */}
            <rect x="30" y="120" width="320" height="200" fill="url(#soilGradient)" opacity="0.3" rx="2" />
            {/* Soil layer labels */}
            <text x="38" y="145" fill="#a18072" fontSize="7" fontFamily="monospace" opacity="0.7">humusz</text>
            <text x="38" y="200" fill="#b45309" fontSize="7" fontFamily="monospace" opacity="0.7">agyag</text>
            <text x="38" y="290" fill="#92400e" fontSize="7" fontFamily="monospace" opacity="0.7">kavics</text>

            {/* Green dashed terepszint (ground level) */}
            <line x1="30" y1="120" x2="350" y2="120" stroke="#4ade80" strokeWidth="2" strokeDasharray="8,4" />
            <text x="290" y="115" fill="#4ade80" fontSize="9" fontFamily="monospace">TEREPSZINT</text>

            {/* Frost depth marker - blue dashed line */}
            <line x1="30" y1="260" x2="350" y2="260" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4,4" />
            <text x="290" y="255" fill="#60a5fa" fontSize="8" fontFamily="monospace">fagyhatár</text>
            {/* Frost depth dimension */}
            <line x1="48" y1="120" x2="48" y2="260" stroke="#60a5fa" strokeWidth="0.8" />
            <line x1="44" y1="120" x2="52" y2="120" stroke="#60a5fa" strokeWidth="0.8" />
            <line x1="44" y1="260" x2="52" y2="260" stroke="#60a5fa" strokeWidth="0.8" />
            <text x="50" y="195" fill="#60a5fa" fontSize="8" fontFamily="monospace" transform="rotate(-90,50,195)">80 cm</text>

            {/* Tömörített kavicságy (gravel bed) with stipple */}
            <rect x="120" y="295" width="120" height="20" fill="#d4a030" opacity="0.6" />
            <rect x="120" y="295" width="120" height="20" fill="url(#gravelStipple)" />
            <text x="180" y="308" fill="#78552b" fontSize="7" fontFamily="monospace" textAnchor="middle">kavicságy</text>

            {/* Alábetonozás (lean concrete) - thin gray layer */}
            <rect x="120" y="285" width="120" height="10" fill="#9ca3af" opacity="0.7" />
            <text x="180" y="293" fill="#e2e8f0" fontSize="6" fontFamily="monospace" textAnchor="middle">alábetonozás C12/15</text>

            {/* Main concrete strip foundation with hatch */}
            <rect x="130" y="155" width="100" height="130" fill="#6b7280" opacity="0.85" rx="1" />
            <rect x="130" y="155" width="100" height="130" fill="url(#concreteHatch)" rx="1" />

            {/* Rebar - main bars shown as red circles (Ø12) */}
            {/* Bottom row */}
            <circle cx="145" cy="275" r="3.5" fill="#dc2626" stroke="#fca5a5" strokeWidth="0.8" />
            <circle cx="160" cy="275" r="3.5" fill="#dc2626" stroke="#fca5a5" strokeWidth="0.8" />
            <circle cx="195" cy="275" r="3.5" fill="#dc2626" stroke="#fca5a5" strokeWidth="0.8" />
            <circle cx="215" cy="275" r="3.5" fill="#dc2626" stroke="#fca5a5" strokeWidth="0.8" />
            {/* Top row */}
            <circle cx="145" cy="165" r="3" fill="#dc2626" stroke="#fca5a5" strokeWidth="0.8" />
            <circle cx="215" cy="165" r="3" fill="#dc2626" stroke="#fca5a5" strokeWidth="0.8" />
            {/* Stirrups (kengyel Ø8) - thin rectangles */}
            <rect x="140" y="162" width="80" height="118" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.6" rx="2" />
            <rect x="140" y="185" width="80" height="0.5" fill="#ef4444" opacity="0.4" />
            <rect x="140" y="210" width="80" height="0.5" fill="#ef4444" opacity="0.4" />
            <rect x="140" y="235" width="80" height="0.5" fill="#ef4444" opacity="0.4" />
            <rect x="140" y="255" width="80" height="0.5" fill="#ef4444" opacity="0.4" />

            {/* Rebar labels */}
            <text x="248" y="278" fill="#fca5a5" fontSize="7" fontFamily="monospace">Ø12 fővas</text>
            <text x="248" y="210" fill="#fca5a5" fontSize="7" fontFamily="monospace">Ø8 kengyel</text>
            <line x1="222" y1="275" x2="246" y2="275" stroke="#fca5a5" strokeWidth="0.5" />
            <line x1="222" y1="210" x2="246" y2="210" stroke="#fca5a5" strokeWidth="0.5" />

            {/* Foundation wall (brick pattern) rising above ground */}
            <rect x="140" y="55" width="80" height="100" fill="url(#brickPattern)" rx="1" />
            <text x="180" y="110" fill="#fef3c7" fontSize="8" fontFamily="monospace" textAnchor="middle">falazat</text>

            {/* Horizontal waterproofing (bitumenes lemez) at top of foundation */}
            <rect x="128" y="152" width="104" height="3" fill="#1f2937" />
            <line x1="235" y1="153" x2="265" y2="148" stroke="#475569" strokeWidth="0.5" />
            <text x="267" y="150" fill="#94a3b8" fontSize="7" fontFamily="monospace">bitumenes lemez</text>

            {/* Width dimension: 40-60 cm */}
            <line x1="130" y1="320" x2="230" y2="320" stroke="#f59e0b" strokeWidth="0.8" />
            <line x1="130" y1="316" x2="130" y2="324" stroke="#f59e0b" strokeWidth="0.8" />
            <line x1="230" y1="316" x2="230" y2="324" stroke="#f59e0b" strokeWidth="0.8" />
            <text x="180" y="332" fill="#f59e0b" fontSize="9" fontFamily="monospace" textAnchor="middle">40-60 cm</text>

            {/* Depth dimension: 80-120 cm */}
            <line x1="85" y1="155" x2="85" y2="285" stroke="#f59e0b" strokeWidth="0.8" />
            <line x1="81" y1="155" x2="89" y2="155" stroke="#f59e0b" strokeWidth="0.8" />
            <line x1="81" y1="285" x2="89" y2="285" stroke="#f59e0b" strokeWidth="0.8" />
            <text x="75" y="225" fill="#f59e0b" fontSize="8" fontFamily="monospace" textAnchor="end" transform="rotate(-90,75,225)">80-120 cm</text>

            {/* Load arrows pointing down from wall to foundation */}
            <polygon points="155,48 160,38 165,48" fill="#e2e8f0" opacity="0.7" />
            <polygon points="185,48 190,38 195,48" fill="#e2e8f0" opacity="0.7" />
            <polygon points="170,48 175,38 180,48" fill="#e2e8f0" opacity="0.7" />
            <line x1="160" y1="38" x2="160" y2="48" stroke="#e2e8f0" strokeWidth="1" opacity="0.7" />
            <line x1="175" y1="38" x2="175" y2="48" stroke="#e2e8f0" strokeWidth="1" opacity="0.7" />
            <line x1="190" y1="38" x2="190" y2="48" stroke="#e2e8f0" strokeWidth="1" opacity="0.7" />
            <text x="175" y="36" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle">teher</text>

            {/* ===== LEMEZALAP (RIGHT SIDE x=400-740) ===== */}

            {/* Kavicságy (gravel bed) - stippled layer */}
            <rect x="410" y="270" width="320" height="25" fill="#d4a030" opacity="0.5" />
            <rect x="410" y="270" width="320" height="25" fill="url(#gravelStipple)" />
            <text x="570" y="286" fill="#78552b" fontSize="8" fontFamily="monospace" textAnchor="middle">tömörített kavicságy</text>

            {/* PE fólia - thin yellow line */}
            <line x1="410" y1="268" x2="730" y2="268" stroke="#fbbf24" strokeWidth="2" />
            <text x="735" y="271" fill="#fbbf24" fontSize="7" fontFamily="monospace">PE fólia</text>

            {/* XPS insulation layer under slab */}
            <rect x="410" y="240" width="320" height="26" fill="url(#xpsPattern)" />
            <rect x="410" y="240" width="320" height="26" fill="none" stroke="#06b6d4" strokeWidth="0.5" />
            <text x="570" y="257" fill="#0891b2" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">XPS hőszigetelés</text>
            {/* XPS sub-block lines */}
            <line x1="490" y1="240" x2="490" y2="266" stroke="#06b6d4" strokeWidth="0.3" />
            <line x1="570" y1="240" x2="570" y2="266" stroke="#06b6d4" strokeWidth="0.3" />
            <line x1="650" y1="240" x2="650" y2="266" stroke="#06b6d4" strokeWidth="0.3" />

            {/* Reinforced slab with mesh pattern */}
            <rect x="430" y="195" width="280" height="45" fill="#3b82f6" opacity="0.7" rx="1" />
            <rect x="430" y="195" width="280" height="45" fill="url(#rebarMesh)" rx="1" />

            {/* Peremgerenda (edge beam) - thicker sections at both edges */}
            <rect x="410" y="180" width="30" height="85" fill="#2563eb" opacity="0.85" rx="1" />
            <rect x="410" y="180" width="30" height="85" fill="url(#concreteHatch)" rx="1" />
            <rect x="700" y="180" width="30" height="85" fill="#2563eb" opacity="0.85" rx="1" />
            <rect x="700" y="180" width="30" height="85" fill="url(#concreteHatch)" rx="1" />
            {/* Edge beam labels */}
            <text x="425" y="230" fill="#bfdbfe" fontSize="6" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,425,230)">peremgerenda</text>
            <text x="715" y="230" fill="#bfdbfe" fontSize="6" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,715,230)">peremgerenda</text>

            {/* Optional floor heating pipes (small red circles in upper portion of slab) */}
            {[450, 470, 490, 510, 530, 550, 570, 590, 610, 630, 650, 670, 690].map((cx, i) => (
              <circle key={`pipe-${i}`} cx={cx} cy={205} r="2.5" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.6" />
            ))}
            <text x="738" y="208" fill="#fca5a5" fontSize="6" fontFamily="monospace">padlófűtés</text>

            {/* Slab thickness dimension: 25-35 cm */}
            <line x1="750" y1="195" x2="750" y2="240" stroke="#f59e0b" strokeWidth="0.8" />
            <line x1="746" y1="195" x2="754" y2="195" stroke="#f59e0b" strokeWidth="0.8" />
            <line x1="746" y1="240" x2="754" y2="240" stroke="#f59e0b" strokeWidth="0.8" />
            <text x="758" y="222" fill="#f59e0b" fontSize="8" fontFamily="monospace">25-35 cm</text>

            {/* Edge beam depth dimension: 40-60 cm */}
            <line x1="398" y1="180" x2="398" y2="265" stroke="#f59e0b" strokeWidth="0.8" />
            <line x1="394" y1="180" x2="402" y2="180" stroke="#f59e0b" strokeWidth="0.8" />
            <line x1="394" y1="265" x2="402" y2="265" stroke="#f59e0b" strokeWidth="0.8" />
            <text x="393" y="228" fill="#f59e0b" fontSize="7" fontFamily="monospace" textAnchor="end" transform="rotate(-90,393,228)">40-60 cm</text>

            {/* Wall above slab on left edge beam */}
            <rect x="410" y="120" width="30" height="60" fill="url(#brickPattern)" rx="1" />
            {/* Wall above slab on right edge beam */}
            <rect x="700" y="120" width="30" height="60" fill="url(#brickPattern)" rx="1" />

            {/* Ground level on slab side */}
            <line x1="400" y1="178" x2="740" y2="178" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="8,4" />
            <text x="660" y="174" fill="#4ade80" fontSize="8" fontFamily="monospace">terepszint</text>

            {/* Load arrows on slab */}
            <polygon points="420,112 425,102 430,112" fill="#e2e8f0" opacity="0.7" />
            <polygon points="710,112 715,102 720,112" fill="#e2e8f0" opacity="0.7" />
            <line x1="425" y1="102" x2="425" y2="112" stroke="#e2e8f0" strokeWidth="1" opacity="0.7" />
            <line x1="715" y1="102" x2="715" y2="112" stroke="#e2e8f0" strokeWidth="1" opacity="0.7" />
            <text x="570" y="108" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle">teher eloszlik az egész felületen</text>

            {/* Color-coded layer legend for slab */}
            <rect x="440" y="300" width="8" height="8" fill="#3b82f6" opacity="0.7" />
            <text x="452" y="308" fill="#94a3b8" fontSize="7" fontFamily="monospace">vasbeton lemez</text>
            <rect x="540" y="300" width="8" height="8" fill="#67e8f9" opacity="0.5" />
            <text x="552" y="308" fill="#94a3b8" fontSize="7" fontFamily="monospace">XPS szigetelés</text>
            <rect x="640" y="300" width="8" height="8" fill="#d4a030" opacity="0.6" />
            <text x="652" y="308" fill="#94a3b8" fontSize="7" fontFamily="monospace">kavicságy</text>

            {/* Clickable typeElements overlay */}
            {typeElements.map((el) => (
              <g key={el.id} onClick={() => setActiveEl(activeEl === el.id ? null : el.id)} style={{ cursor: "pointer" }}>
                <rect x={el.x} y={el.y} width={el.w} height={el.h} rx={8} fill="transparent" stroke={activeEl === el.id ? "#fff" : el.color} strokeWidth={activeEl === el.id ? 2 : 1} strokeDasharray={activeEl === el.id ? "none" : "4,4"} />
                <text x={el.x + 10} y={el.y + el.h - 10} fill={el.color} fontSize="10" fontFamily="monospace">{el.label} [?]</text>
              </g>
            ))}
          </svg>
        </DiagramWrapper>
        <PhotoSection searchQuery="lemezalap vasszerelés alapozás" images={[
          { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Reinforcement_for_a_slab_foundation.jpg/320px-Reinforcement_for_a_slab_foundation.jpg", alt: "Lemezalap vasalás", caption: "Lemezalap vasszerelés — alsó-felső háló" },
          { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Mat_foundation.JPG/320px-Mat_foundation.JPG", alt: "Lemezalap", caption: "Betonozott lemezalap" }
        ]} />
      )}

      {subTab === "soil" && (
        <DiagramWrapper>
          <svg viewBox="0 0 700 450" style={{ width: "100%", height: "auto", display: "block" }}>
            <text x="250" y="30" fill="#94a3b8" fontSize="13" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">TALAJTÍPUSOK ÉS TEHERBÍRÁS</text>
            <text x="550" y="28" fill="#64748b" fontSize="11" fontFamily="monospace" textAnchor="middle">Teherbírás (kPa)</text>
            <text x="550" y="42" fill="#475569" fontSize="8" fontFamily="monospace" textAnchor="middle">(kilopascal — magasabb = erősebb talaj)</text>
            {soilTypes.map((s) => (
              <g key={s.id} onClick={() => setActiveEl(activeEl === s.id ? null : s.id)} style={{ cursor: "pointer" }}>
                <rect x="40" y={s.y} width="400" height={s.h} rx={6} fill={s.color} opacity={activeEl === s.id ? 1 : 0.6} stroke={activeEl === s.id ? "#fff" : "transparent"} strokeWidth={2} />
                <text x="60" y={s.y + s.h / 2 + 5} fill="#f1f5f9" fontSize="13" fontWeight="bold" fontFamily="system-ui">{s.label}</text>
                {activeEl !== s.id && <text x="410" y={s.y + s.h / 2 + 4} fill="#475569" fontSize="10" fontFamily="monospace">[?]</text>}
              </g>
            ))}
            {/* Bearing capacity bars */}
            <rect x="470" y="125" width="60" height="16" rx="3" fill="#f59e0b" opacity="0.6" />
            <text x="540" y="137" fill="#94a3b8" fontSize="9" fontFamily="monospace">100-200</text>
            <rect x="470" y="225" width="100" height="16" rx="3" fill="#eab308" opacity="0.6" />
            <text x="580" y="237" fill="#94a3b8" fontSize="9" fontFamily="monospace">150-300</text>
            <rect x="470" y="305" width="180" height="16" rx="3" fill="#d97706" opacity="0.6" />
            <text x="660" y="317" fill="#94a3b8" fontSize="9" fontFamily="monospace">300-600</text>
          </svg>
        </DiagramWrapper>
      )}

      {subTab === "layers" && activeEl && (() => {
        const l = layers.find(l => l.id === activeEl);
        return l ? <DetailPanel color={l.color} title={l.label} detail={l.detail} /> : null;
      })()}
      {subTab === "types" && activeEl && typeDetails[activeEl] && (
        <DetailPanel color={typeDetails[activeEl].color} title={typeDetails[activeEl].title} detail={typeDetails[activeEl].detail} />
      )}
      {subTab === "soil" && activeEl && (() => {
        const s = soilTypes.find(s => s.id === activeEl);
        return s ? <DetailPanel color={s.color} title={s.label} detail={s.detail} /> : null;
      })()}
      {subTab === "mistakes_f" && (() => {
        const mistakes = [
          { id: "no_survey", title: "Nincs talajmechanikai vizsgálat", color: THEME.accent.red, detail: "A LEGNAGYOBB hiba! Talajvizsgálat nélkül a statikus nem tud megfelelő alapot tervezni. Duzzadó agyag, magas talajvíz, feltöltött talaj → mind más alaptípust igényel. Költség: 80-180k Ft. Enélkül: alaprepedés, ülésből fakadó falrepedések. Az alap javítása 5-10M Ft — a vizsgálat 100x kevesebbe kerül!" },
          { id: "shallow", title: "Sekély alap (fagyhatár felett)", color: THEME.accent.orange, detail: "Magyarországon a fagyhatár 80-100 cm. Ha a sávalap ennél magasabban van → a fagy felemeli és megrepeszti! Tipikus 'spórolós' hiba: 40-50 cm mély alap. Ez az ELSŐ télen kiderül — repedés, ülés, a ház mozog. Lemezalapnál: perem XPS védi a fagyot, de min. 10 cm kell." },
          { id: "no_rebar", title: "Hiányzó/rossz vasalás", color: THEME.accent.red, detail: "Vasalás NÉLKÜL a beton csak nyomásra jó, húzásra törik! A vasalási tervet STATIKUS készítse, NE a kőműves 'szokás' alapján. Tipikus hibák: kevés kengyel, rossz betonfedés (<5 cm), vasalás a földre téve (nem alátétekre), korrózió (rozsdás vas → csökkent teherbírás)." },
          { id: "no_vibrate", title: "Vibrátor nélküli betonozás", color: THEME.accent.amber, detail: "A betont tüskés vibrátorral kell tömöríteni! Vibrátor nélkül légzsákok maradnak → 20-30%-kal gyengébb a beton. Sok kőműves 'kézi lapátolással' dolgozik — ez NEM elég. A vibrátor bérlése 5-10k Ft/nap — ehhez képest az alap értéke millió Ft." },
          { id: "bad_waterproof", title: "Hiányos vízszigetelés", color: THEME.accent.blue, detail: "Vízszintes vízszigetelés (bitumenes lemez) KÖTELEZŐ az alap tetején! Nélküle a talajnedvesség felszívódik a falba → penész, salétrom, vakolat hámlás. Gyakori hiba: 'csak kent' (Hidrosol) vízszigetelés — ez önmagában NEM elég, LEMEZ kell! Függőleges vízszigetelés: az alapfal külső oldalán, a terepszintig." },
          { id: "no_gravel", title: "Hiányzó/vékony kavicságy", color: THEME.accent.amber, detail: "A tömörített kavicságy (15-20 cm) teherelosztó és vízelvezetõ funkciót lát el. Sok kivitelező elvékonyítja (5-10 cm) vagy kihagyja → egyenetlen teherelosztás, talajvíz közvetlenül az alapot támadja. TIPP: betonozás ELŐTT mérd le és fotózd — utólag nem ellenőrizhető!" },
        ];
        return (
          <>
            <DiagramWrapper>
              <svg viewBox="0 0 750 330" style={{ width: "100%" }}>
                <text x="375" y="25" textAnchor="middle" fill={THEME.accent.red} fontSize="14" fontWeight="700">⚠ ALAPOZÁS — GYAKORI HIBÁK</text>
                {mistakes.map((m, i) => (
                  <g key={m.id} onClick={() => setActiveEl(activeEl === m.id ? null : m.id)} style={{ cursor: "pointer" }}>
                    <rect x={20 + (i % 2) * 370} y={50 + Math.floor(i / 2) * 60} width="350" height="50" rx="8" fill={activeEl === m.id ? m.color + "22" : "#111827"} stroke={m.color} strokeWidth={activeEl === m.id ? 2.5 : 1.5} />
                    <text x={35 + (i % 2) * 370} y={72 + Math.floor(i / 2) * 60} fill={m.color} fontSize="11" fontWeight="700">⚠ {m.title}</text>
                    <text x={35 + (i % 2) * 370} y={88 + Math.floor(i / 2) * 60} fill={THEME.text.muted} fontSize="9">[kattints a részletekért]</text>
                  </g>
                ))}
              </svg>
            </DiagramWrapper>
            {activeEl && (() => { const m = mistakes.find(m => m.id === activeEl); return m ? <DetailPanel color={m.color} title={m.title} detail={m.detail} /> : null; })()}
          </>
        );
      })()}
      <ClickHint />
    </div>
  );
}

/* ─── WALL STRUCTURE ─── */
function WallDiagram() {
  const [subTab, setSubTab] = useState("exterior");
  const [activeEl, setActiveEl] = useState(null);
  const [ytongActive, setYtongActive] = useState(null);
  const subTabs = [{ id: "exterior", label: "Külső fal" }, { id: "partition", label: "Válaszfal" }, { id: "ytong_light", label: "Ytong & Könnyű" }, { id: "plastering", label: "Vakolás" }];

  const layers = [
    { id: "paint", x: 30, w: 20, color: "#e2e8f0", label: "Belső festés", detail: "Diszperziós falfesték, 2-3 rétegben. Az utolsó lépés." },
    { id: "vakolat_belso", x: 50, w: 25, color: "#d1d5db", label: "Belső vakolat 1.5-2 cm", detail: "Gépi vakolat (cement- vagy gipszbázisú). Gipszvakolat simább, de nedves helyre (fürdő) cement kell." },
    { id: "tegla", x: 75, w: 120, color: "#c2410c", label: "POROTHERM NF30 30 cm", detail: "Üreges kerámiatégla, vékonyágyazatú ragasztóhabarccsba rakva (2-3 mm). Fugák KÖTÉSBE rakva. Nyomószilárdság: 10-15 N/mm²." },
    { id: "ragaszto_k", x: 195, w: 10, color: "#9ca3af", label: "Ragasztó", detail: "Pontokban VAGY teljes felületen. A ragasztás ÖNMAGÁBAN nem elég — dübel is kell (min. 6-8 db/m²)!" },
    { id: "szigeteles", x: 205, w: 60, color: "#93c5fd", label: "EPS/Grafit 15 cm", detail: "Fehér EPS (λ=0.038) vagy szürke/grafit EPS (λ=0.031, 20%-kal jobb). λ = hővezetési tényező W/mK-ban — minél kisebb, annál jobb. 15 cm szürke ≈ 20 cm fehér. Kőzetgyapot: tűzálló, drágább." },
    { id: "halo", x: 265, w: 8, color: "#fbbf24", label: "Háló", detail: "Üvegszövet háló BELEÁGYAZVA a ragasztóba — nem ráfektetve!" },
    { id: "alapozo", x: 273, w: 5, color: "#f97316", label: "Alapozó", detail: "Kvarchomokos alapozó, a vékonyvakolat tapadásáért. Színezett." },
    { id: "vakolat_k", x: 278, w: 15, color: "#a3a3a3", label: "Vékonyvakolat", detail: "Szilikon a legjobb: vízlepergető + páraáteresztő. Kapart (2mm) vagy dörzsölt (1.5mm). Ár: 2000-5000 Ft/m²." },
  ];

  const partElements = {
    brick_partition: { title: "Tégla válaszfal (Porotherm 10-12cm)", color: "#c2410c", detail: "Előny: tömör, jó hangszigetelés (Rw 40-42 dB — léghangszigetelés, minél magasabb, annál csendesebb), polcakasztás egyszerű. Hátrány: nehéz (100-130 kg/m²), lassú, nedves technológia. Ár: 8-12.000 Ft/m²." },
    tooth_interlock: { title: "Fogazás (befordítás)", color: "#f59e0b", detail: "Minden második sor 5-10 cm-re beköt a teherhordó falba. Merev kapcsolat. HA nincs fogazás → a fal leválhat → repedés a csatlakozásnál!" },
    l_iron: { title: "L-vas kapcsolat", color: "#94a3b8", detail: "Utólagos válaszfalnál rozsdamentes L-vassal rögzítjük a főfalhoz. Minden 2. sorba, dűbelezve. Nem olyan erős mint a fogazás, de működik." },
    drywall_frame: { title: "Gipszkarton váz (CW+UW)", color: "#8b5cf6", detail: "CW profil (álló, 50-75mm) + UW profil (padló/mennyezet). 60 cm-enként. Eltolt állóprofilok = dupla hangszigetelés!" },
    gypsum_board: { title: "Gipszkarton tábla", color: "#60a5fa", detail: "12.5mm standard (fehér) vagy impregnált (zöld, nedves helyre). 2 réteg = 25mm → jobb hang + tűzvédelem. Csavarok 25 cm-enként." },
    mineral_fill: { title: "Ásványgyapot kitöltés", color: "#fbbf24", detail: "40-60mm gyapot a profilok közt: hangszigetelő funkció. Nélküle a gipszkarton fal dobként szól!" },
    partition_cmp: { title: "Összehasonlítás", color: "#22c55e", detail: "Tégla: 8-12k Ft/m², 2-3 nap/szoba, polc egyszerű. Gipszkarton: 10-15k Ft/m², 1 nap/szoba, de polchoz speciális dübel (Molly, Tog) kell!" },
    ytong_partition: { title: "Ytong válaszfal (10-15cm)", color: "#06b6d4", detail: "Pórusbeton válaszfal. Rw 36-42 dB (vastagságtól függően). Könnyű (50-70 kg/m²), de jó hangszigetelés. Ragasztóhabarccsal falazva (vékony, 2-3mm ágyazat). Nehéz tárgyak: speciális Ytong dübel szükséges (Fischer Ytong dübel). Ár: 7-10.000 Ft/m². Előny: gyors, könnyű, jó hő- és hangszigetelés. Hátrány: nedvességérzékeny, speciális rögzítők kellenek." },
    when_which: { title: "Melyiket válaszd?", color: "#f59e0b", detail: "TEHERHORDÓ válaszfal (ritka, de előfordul): tégla 20-25cm, Ytong 20-25cm. NEM teherhordó: Tégla 10cm: ha nehéz tárgyakat akarsz (konyhai felső szekrény, TV tartó), jó hangszigetelés kell. Gipszkarton: ha gyors, száraz építés kell, könnyű szerkezet, rugalmas alaprajz. Ytong 10-15cm: ha kompromisszumot keresel (gyorsabb mint tégla, jobb teherbírás mint GK). Nehéz tárgyak felfüggesztése: tégla > Ytong > gipszkarton (speciális dübelekkel)." },
  };

  const plasterSteps = {
    splash: { title: "Fröcskölés (spriccelés)", color: "#94a3b8", detail: "Híg cement-homok keveréket fröcskölnek a nyers falra. Javítja a tapadást a gépi vakolatnak." },
    corners: { title: "Sarokvédő profilok", color: "#f59e0b", detail: "Alumínium vagy PVC sarokprofil, ragasztóba ágyazva. Védi a sarkokat és egyenes éleket ad." },
    machine: { title: "Gépi vakolás", color: "#3b82f6", detail: "Gépszórás: gyorsabb és egyenletesebb, mint kézi. Gipsz- vagy cementbázisú. 1.5-2 cm vastagság." },
    leveling: { title: "Lehúzás H-szabállyal", color: "#8b5cf6", detail: "A vakolatot alumínium léccel húzzák egyenesre a szegélylécek között." },
    adhesive_eps: { title: "Ragasztó + EPS táblák", color: "#93c5fd", detail: "EPS táblákat ragasztóhabarccsal rögzítik. Keretes-pontos módszer. Kötésbe ragasztva (mint a tégla)!" },
    dubel: { title: "Dübelezés", color: "#ef4444", detail: "Min. 6-8 db/m² tárcsás dübel. Csak ragasztóval NEM elég! A dübel a téglába horgonyzik. Az EPS ragasztás után 24 órával." },
    mesh: { title: "Hálóágyazás", color: "#fbbf24", detail: "160 g/m² üvegszövet háló, BELEÁGYAZVA a ragasztórétegbe. Megakadályozza a repedéseket. Átfedés: min. 10 cm." },
    thin_coat: { title: "Vékonyvakolat", color: "#22c55e", detail: "Szilikon (legjobb, 3-5k Ft/m²), szilikon-gyanta (jó, 2-3.5k), akril (olcsó, nem páraáteresztő). Kapart vagy dörzsölt textúra." },
  };

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); setYtongActive(null); }} />

      {subTab === "exterior" && (
        <DiagramWrapper>
          <svg viewBox="0 0 380 480" style={{ width: "100%", maxWidth: 500, height: "auto", display: "block", margin: "0 auto" }}>
            <text x="160" y="20" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle">← BELSŐ  |  KÜLSŐ →</text>
            {layers.map((l) => (
              <g key={l.id} onClick={() => setActiveEl(activeEl === l.id ? null : l.id)} style={{ cursor: "pointer" }}>
                <rect x={l.x} y={30} width={l.w} height={360} rx={2} fill={l.color} opacity={activeEl === l.id ? 1 : 0.75} stroke={activeEl === l.id ? "#fff" : "rgba(255,255,255,0.1)"} strokeWidth={activeEl === l.id ? 2 : 0.5} />
                {l.id === "tegla" && Array.from({ length: 12 }).map((_, row) => (
                  <g key={row}>
                    <line x1={l.x} y1={30 + row * 30} x2={l.x + l.w} y2={30 + row * 30} stroke="#9a3412" strokeWidth="1" opacity="0.4" />
                    {Array.from({ length: 3 }).map((_, col) => (
                      <line key={col} x1={l.x + (row % 2 === 0 ? col * 40 + 20 : col * 40)} y1={30 + row * 30} x2={l.x + (row % 2 === 0 ? col * 40 + 20 : col * 40)} y2={30 + (row + 1) * 30} stroke="#9a3412" strokeWidth="1" opacity="0.3" />
                    ))}
                  </g>
                ))}
                {l.id === "szigeteles" && [80, 160, 240, 320].map((dy, i) => (
                  <g key={i}><circle cx={l.x + l.w / 2} cy={30 + dy} r={6} fill="#475569" stroke="#94a3b8" strokeWidth="1" /><circle cx={l.x + l.w / 2} cy={30 + dy} r={2} fill="#1e293b" /></g>
                ))}
              </g>
            ))}
            {layers.map((l) => (
              <g key={`lbl-${l.id}`}>
                <line x1={l.x + l.w / 2} y1={390} x2={l.x + l.w / 2} y2={405} stroke="#475569" strokeWidth="1" />
                <text x={l.x + l.w / 2} y={420} fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle" transform={`rotate(45, ${l.x + l.w / 2}, 420)`}>{l.label.split(' ')[0]}</text>
              </g>
            ))}
            <line x1="195" y1="395" x2="293" y2="395" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="244" y="470" fill="#60a5fa" fontSize="10" fontFamily="monospace" textAnchor="middle">ETICS rendszer</text>
            <text x="160" y="478" fill="#fbbf24" fontSize="10" fontFamily="monospace" textAnchor="middle">~48 cm össz</text>
          </svg>
        </DiagramWrapper>
        <PhotoSection searchQuery="téglafalazás Porotherm falazás" images={[
          { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Bricklayer_at_work.jpg/320px-Bricklayer_at_work.jpg", alt: "Falazás", caption: "Kőműves falazás közben" },
          { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/ETICS_polystyrene_insulation.jpg/320px-ETICS_polystyrene_insulation.jpg", alt: "Hőszigetelés", caption: "Homlokzati EPS hőszigetelés felragasztva" }
        ]} />
      )}

      {subTab === "partition" && (
        <DiagramWrapper>
          <svg viewBox="0 0 700 450" style={{ width: "100%", height: "auto", display: "block" }}>
            <text x="115" y="25" fill="#c2410c" fontSize="13" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">Tégla válaszfal</text>
            <text x="350" y="25" fill="#06b6d4" fontSize="13" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">Ytong válaszfal</text>
            <text x="575" y="25" fill="#8b5cf6" fontSize="13" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">Gipszkarton válaszfal</text>
            <line x1="233" y1="15" x2="233" y2="340" stroke="#334155" strokeWidth="1" strokeDasharray="6,4" />
            <line x1="467" y1="15" x2="467" y2="340" stroke="#334155" strokeWidth="1" strokeDasharray="6,4" />
            {/* Brick wall */}
            <rect x="70" y="50" width="90" height="280" rx="3" fill="#c2410c" opacity="0.7" />
            {Array.from({ length: 10 }).map((_, r) => (
              <g key={r}>
                <line x1="70" y1={50 + r * 28} x2="160" y2={50 + r * 28} stroke="#9a3412" strokeWidth="1" opacity="0.5" />
                <line x1={r % 2 === 0 ? 115 : 95} y1={50 + r * 28} x2={r % 2 === 0 ? 115 : 95} y2={50 + (r + 1) * 28} stroke="#9a3412" strokeWidth="1" opacity="0.4" />
              </g>
            ))}
            <text x="115" y="200" fill="#fca5a5" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,115,200)">10-12 cm</text>
            {/* Ytong wall */}
            <rect x="305" y="50" width="90" height="280" rx="3" fill="#06b6d4" opacity="0.3" stroke="#06b6d4" strokeWidth="0.5" />
            {Array.from({ length: 10 }).map((_, r) => (
              <g key={r}>
                <rect x="305" y={50 + r * 28} width="90" height="27" rx="1" fill="#06b6d4" opacity="0.25" />
                <line x1="305" y1={50 + r * 28} x2="395" y2={50 + r * 28} stroke="#0e7490" strokeWidth="0.8" opacity="0.6" />
                {r % 2 === 0 ? (
                  <line x1="350" y1={50 + r * 28} x2="350" y2={50 + (r + 1) * 28} stroke="#0e7490" strokeWidth="0.5" opacity="0.4" />
                ) : (
                  <><line x1="330" y1={50 + r * 28} x2="330" y2={50 + (r + 1) * 28} stroke="#0e7490" strokeWidth="0.5" opacity="0.4" /><line x1="370" y1={50 + r * 28} x2="370" y2={50 + (r + 1) * 28} stroke="#0e7490" strokeWidth="0.5" opacity="0.4" /></>
                )}
              </g>
            ))}
            <text x="350" y="200" fill="#22d3ee" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,350,200)">10-15 cm</text>
            <text x="350" y="342" fill="#0e7490" fontSize="7" fontFamily="monospace" textAnchor="middle">ragasztóhabarcs 2-3mm</text>
            {/* Drywall */}
            <rect x="490" y="50" width="8" height="280" rx="1" fill="#e2e8f0" opacity="0.8" />
            <rect x="498" y="50" width="8" height="280" rx="1" fill="#d1d5db" opacity="0.8" />
            {[0, 1, 2, 3].map((i) => <rect key={i} x="510" y={60 + i * 70} width="50" height="260" rx="0" fill="#94a3b8" opacity="0.3" style={{height: 3, width: 3, transform: `translate(${i * 15}px, 0)`}} />)}
            <rect x="510" y="50" width="4" height="280" fill="#94a3b8" opacity="0.5" />
            <rect x="540" y="50" width="4" height="280" fill="#94a3b8" opacity="0.5" />
            <rect x="570" y="50" width="4" height="280" fill="#94a3b8" opacity="0.5" />
            <rect x="580" y="50" width="60" height="4" fill="#94a3b8" opacity="0.5" />
            <rect x="580" y="326" width="60" height="4" fill="#94a3b8" opacity="0.5" />
            <rect x="630" y="50" width="8" height="280" rx="1" fill="#d1d5db" opacity="0.8" />
            <rect x="638" y="50" width="8" height="280" rx="1" fill="#e2e8f0" opacity="0.8" />
            <rect x="548" y="80" width="30" height="220" rx="2" fill="#fbbf24" opacity="0.25" />
            <text x="563" y="200" fill="#fbbf24" fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,563,200)">gyapot</text>
            {Object.keys(partElements).map((key, i) => {
              const el = partElements[key];
              const y = 355 + (i % 3) * 22;
              const x = 15 + Math.floor(i / 3) * 230;
              return (
                <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                  <rect x={x} y={y} width={220} height={18} rx={4} fill={activeEl === key ? el.color : "#1e293b"} stroke={el.color} strokeWidth={1} />
                  <text x={x + 8} y={y + 13} fill={activeEl === key ? "#fff" : el.color} fontSize="9" fontFamily="monospace">{el.title.substring(0, 28)}</text>
                </g>
              );
            })}
          </svg>
        </DiagramWrapper>
      )}

      {subTab === "ytong_light" && (() => {
        const ytongDetails = {
          ytong30: { title: "Ytong 30 cm", color: "#06b6d4", detail: "U-érték (hőátbocsátási tényező — mennyi hő jut át 1 m²-en): ~0.36 W/m²K kiegészítő szigetelés nélkül. Plusz 5-8 cm EPS-sel: U=0.18-0.22 → AA osztályhoz elég. Ragasztóhabarccsal falazva (2-3mm réteg). Blokk méret: 60×25×30 cm. Gyors falazás. Ár: ~12.000 Ft/m² (anyag + munka). Előny: egyetlen anyagból jó hőszigetelés, gyors, könnyű. Hátrány: nedvességérzékeny (lábazatnál tégla/beton kell!), speciális Ytong rögzítők szükségesek." },
          ytong375: { title: "Ytong 37.5 cm", color: "#22d3ee", detail: "U-érték: ~0.29 W/m²K — kiegészítő szigetelés nélkül is elfogadható! Plusz 5 cm EPS-sel: U=0.17-0.20 → AA osztály elérhető. Vastagabb blokk → jobb hőszigetelés, de vastagabb fal → kisebb belső tér. Ár: ~14.000 Ft/m². Előny: minimális vagy nulla kiegészítő szigetelés. Hátrány: drágább, vastagabb fal (belső tér csökken), továbbra is nedvességérzékeny." },
          tegla_eps: { title: "Porotherm 30 + EPS 15cm", color: "#f59e0b", detail: "U-érték: ~0.18-0.22 W/m²K (a szigetelés vastagságától függően). Ez a klasszikus magyar megoldás. Erős teherbírás, kiváló páraáteresztés (kőzetgyapotnál), bevált technológia. Hátrány: két lépés (falazás + szigetelés külön), lassabb, drágább összességében: ~16-22.000 Ft/m². Előny: robosztus, jó akusztika, mindenki ismeri a technológiát, nem nedvességérzékeny." },
          ytong_pros: { title: "Ytong előnyök/hátrányok", color: "#22c55e", detail: "ELŐNYÖK: Könnyű (400-600 kg/m³ vs tégla 800-1200), jó hőszigetelés egyetlen anyagból, gyors falazás (nagy blokkok), könnyen megmunkálható (fűrésszel vágható), tűzálló (A1). HÁTRÁNYOK: Nedvességérzékeny (soha nem érintkezhet közvetlenül talajjal/vízzel — lábazatnál min. 30 cm beton/tégla), speciális rögzítők kellenek (Fischer Ytong dübel, kémiai dübel nehéz terheknél), kisebb nyomószilárdság mint tégla." },
          timber: { title: "Könnyűszerkezetes (fa váz)", color: "#a78bfa", detail: "OSB + párazáró fólia + fa oszlopváz (KVH gerenda 16-20 cm) + ásványgyapot szigetelés + szélzáró membrán + külső burkolat. U-érték: 0.12-0.18 W/m²K (kiváló!). Ár: 55-85.000 Ft/m² kulcsrakészen. Építési idő: 2-4 hónap (vs hagyományos 8-14 hónap). Élettartam: 50-100+ év (skandináv példák). Mikor éri meg: passzívház, könnyű talaj (lemezalap elég), gyors építés szükséges, energiahatékonyság prioritás." },
          timber_vs: { title: "Könnyű vs hagyományos", color: "#8b5cf6", detail: "Összehasonlítás: Idő: könnyű 2-4 hó vs hagyományos 8-14 hó. Ár/m²: könnyű 55-85k vs hagy. 50-75k (hasonló!). Energia: könnyű U=0.12-0.18 vs hagy. U=0.18-0.25. Élettartam: könnyű 50-100 év vs hagy. 80-100+ év. Tűzállóság: könnyű B-s1 (gipszkarton védi) vs hagy. A1. Hangvédelem: könnyű Rw 45-55 dB vs hagy. Rw 50-60 dB (magasabb dB = csendesebb). Tömeg: könnyű 60-100 kg/m² vs hagy. 300-500 kg/m². FONTOS: Magyarországon még kevés a tapasztalt könnyűszerkezetes kivitelező — referenciákat MINDIG kérj!" },
        };
        return (
          <>
            <DiagramWrapper>
              <svg viewBox="0 0 760 520" style={{ width: "100%" }}>
                <text x="380" y="25" textAnchor="middle" fill={THEME.text.heading} fontSize="14" fontWeight="700">YTONG (PÓRUSBETON) vs HAGYOMÁNYOS vs KÖNNYŰSZERKEZETES</text>
                {/* Ytong comparison table */}
                <text x="380" y="55" textAnchor="middle" fill={THEME.text.muted} fontSize="10" fontFamily="monospace">U-érték összehasonlítás (alacsonyabb = jobb)</text>
                {[
                  { id: "ytong30", x: 20, label: "Ytong 30cm", u: "0.36", uPlus: "+EPS: 0.20", color: "#06b6d4" },
                  { id: "ytong375", x: 270, label: "Ytong 37.5cm", u: "0.29", uPlus: "+EPS: 0.17", color: "#22d3ee" },
                  { id: "tegla_eps", x: 520, label: "Tégla 30+EPS 15", u: "0.20", uPlus: "Bevált", color: "#f59e0b" },
                ].map((item) => (
                  <g key={item.id} onClick={() => setYtongActive(ytongActive === item.id ? null : item.id)} style={{ cursor: "pointer" }}>
                    <rect x={item.x} y={70} width={230} height={90} rx={10} fill={ytongActive === item.id ? item.color + "22" : "#111827"} stroke={item.color} strokeWidth={ytongActive === item.id ? 2.5 : 1.5} />
                    <text x={item.x + 115} y={95} textAnchor="middle" fill={item.color} fontSize="13" fontWeight="700">{item.label}</text>
                    <text x={item.x + 115} y={118} textAnchor="middle" fill={THEME.text.heading} fontSize="16" fontWeight="800">U={item.u}</text>
                    <text x={item.x + 115} y={138} textAnchor="middle" fill={THEME.text.secondary} fontSize="10">{item.uPlus}</text>
                    <text x={item.x + 115} y={152} textAnchor="middle" fill={THEME.text.muted} fontSize="9">[kattints]</text>
                  </g>
                ))}
                {/* Ytong cross-section */}
                <text x="190" y="190" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="700">Ytong fal metszet</text>
                <rect x="60" y="200" width="260" height="180" rx="6" fill="#0a1520" stroke="#1e293b" strokeWidth="1" />
                {/* Vékonyvakolat outer */}
                <rect x="62" y="202" width="10" height="176" fill="#a3a3a3" opacity="0.6" />
                <text x="67" y="295" fill="#d4d4d4" fontSize="7" textAnchor="middle" transform="rotate(-90,67,295)">Vakolat</text>
                {/* Ytong blocks */}
                {[0,1,2,3,4,5].map((row) => (
                  <g key={row}>
                    <rect x={74} y={202 + row * 29} width="240" height="27" rx="2" fill="#06b6d4" opacity={0.3} stroke="#06b6d4" strokeWidth="0.5" />
                    {row % 2 === 0 ? (
                      <><line x1={194} y1={202 + row * 29} x2={194} y2={229 + row * 29} stroke="#0e7490" strokeWidth="0.5" /></>
                    ) : (
                      <><line x1={154} y1={202 + row * 29} x2={154} y2={229 + row * 29} stroke="#0e7490" strokeWidth="0.5" /><line x1={234} y1={202 + row * 29} x2={234} y2={229 + row * 29} stroke="#0e7490" strokeWidth="0.5" /></>
                    )}
                  </g>
                ))}
                <text x="194" y="298" fill="#22d3ee" fontSize="8" textAnchor="middle" fontFamily="monospace">ragasztóhabarcs 2-3mm</text>
                {/* Inner plaster */}
                <rect x="316" y="202" width="4" height="176" fill="#d1d5db" opacity="0.5" />
                {/* Dimension */}
                <line x1="74" y1="390" x2="314" y2="390" stroke="#06b6d4" strokeWidth="1" />
                <text x="194" y="405" fill="#06b6d4" fontSize="9" textAnchor="middle" fontFamily="monospace">30 cm</text>
                {/* Timber frame cross-section */}
                <text x="570" y="190" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="700">Könnyűszerk. metszet</text>
                <rect x="430" y="200" width="280" height="180" rx="6" fill="#0a1520" stroke="#1e293b" strokeWidth="1" />
                {/* Layers from inside to outside */}
                <rect x="432" y="202" width="12" height="176" fill="#e2e8f0" opacity="0.5" />
                <text x="438" y="295" fill="#d4d4d4" fontSize="6" textAnchor="middle" transform="rotate(-90,438,295)">GK</text>
                <rect x="446" y="202" width="3" height="176" fill="#ef4444" opacity="0.5" />
                <text x="447" y="210" fill="#fca5a5" fontSize="5">párazáró</text>
                <rect x="451" y="202" width="14" height="176" fill="#d97706" opacity="0.4" />
                <text x="458" y="295" fill="#fbbf24" fontSize="6" textAnchor="middle" transform="rotate(-90,458,295)">OSB</text>
                {/* Timber studs + insulation */}
                {[0,1,2,3].map((i) => (
                  <g key={i}>
                    <rect x={467 + i * 42} y="202" width="8" height="176" fill="#92400e" opacity="0.6" />
                    <rect x={477 + i * 42} y="204" width="30" height="172" fill="#fbbf24" opacity="0.15" />
                  </g>
                ))}
                <text x="545" y="295" fill="#fbbf24" fontSize="7" textAnchor="middle" fontFamily="monospace">ásványgyapot</text>
                {/* Wind barrier */}
                <rect x="635" y="202" width="14" height="176" fill="#d97706" opacity="0.3" />
                <text x="642" y="295" fill="#ca8a04" fontSize="6" textAnchor="middle" transform="rotate(-90,642,295)">OSB</text>
                <rect x="651" y="202" width="3" height="176" fill="#22c55e" opacity="0.5" />
                <text x="652" y="210" fill="#86efac" fontSize="5">szélzáró</text>
                {/* Facade */}
                <rect x="656" y="202" width="52" height="176" fill="#a3a3a3" opacity="0.2" />
                <text x="682" y="295" fill="#94a3b8" fontSize="7" textAnchor="middle" transform="rotate(-90,682,295)">burkolat</text>
                <line x1="451" y1="390" x2="654" y2="390" stroke="#a78bfa" strokeWidth="1" />
                <text x="552" y="405" fill="#a78bfa" fontSize="9" textAnchor="middle" fontFamily="monospace">~25-30 cm</text>
                {/* Bottom detail boxes */}
                {[
                  { id: "ytong_pros", x: 20, label: "Ytong +/-", color: "#22c55e" },
                  { id: "timber", x: 200, label: "Fa váz részletek", color: "#a78bfa" },
                  { id: "timber_vs", x: 400, label: "Könnyű vs hagyományos", color: "#8b5cf6" },
                ].map((box) => (
                  <g key={box.id} onClick={() => setYtongActive(ytongActive === box.id ? null : box.id)} style={{ cursor: "pointer" }}>
                    <rect x={box.x} y={430} width={170} height="35" rx="8" fill={ytongActive === box.id ? box.color + "22" : "#111827"} stroke={box.color} strokeWidth={ytongActive === box.id ? 2 : 1} />
                    <text x={box.x + 85} y={452} textAnchor="middle" fill={box.color} fontSize="10" fontWeight="600">{box.label}</text>
                  </g>
                ))}
                <rect x="600" y="430" width="140" height="35" rx="8" fill="#111827" stroke={THEME.accent.amber} strokeWidth="1" />
                <text x="670" y="447" textAnchor="middle" fill={THEME.accent.amber} fontSize="9" fontWeight="600">Ytong lábazatnál:</text>
                <text x="670" y="460" textAnchor="middle" fill={THEME.accent.red} fontSize="8" fontWeight="700">SOHA! Tégla/beton kell!</text>
              </svg>
            </DiagramWrapper>
            <PhotoSection searchQuery="Ytong pórusbeton falazás" images={[
              { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Autoclaved_aerated_concrete.jpg/320px-Autoclaved_aerated_concrete.jpg", alt: "Ytong blokk", caption: "Pórusbeton (Ytong) blokkok — könnyű, vágható" },
              { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Lightweight_framing.jpg/320px-Lightweight_framing.jpg", alt: "Fa váz", caption: "Könnyűszerkezetes fa vázszerkezet" }
            ]} />
            {ytongActive && ytongDetails[ytongActive] && <DetailPanel color={ytongDetails[ytongActive].color} title={ytongDetails[ytongActive].title} detail={ytongDetails[ytongActive].detail} />}
            <ClickHint />
          </>
        );
      })()}

      {subTab === "plastering" && (
        <DiagramWrapper>
          <svg viewBox="0 0 780 380" style={{ width: "100%", height: "auto", display: "block" }}>
            <text x="390" y="25" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle">BELSŐ VAKOLÁS LÉPÉSEI</text>
            {["splash", "corners", "machine", "leveling"].map((key, i) => {
              const step = plasterSteps[key];
              const x = 20 + i * 185;
              return (
                <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                  <rect x={x} y={40} width={175} height={80} rx={10} fill={activeEl === key ? step.color : "#1e293b"} stroke={step.color} strokeWidth={activeEl === key ? 2 : 1} />
                  <text x={x + 10} y={60} fill={activeEl === key ? "#fff" : "#f1f5f9"} fontSize="10" fontWeight="bold" fontFamily="system-ui">{i + 1}. lépés</text>
                  <text x={x + 10} y={78} fill={activeEl === key ? "#fff" : step.color} fontSize="9" fontFamily="monospace">{step.title}</text>
                  {i < 3 && <text x={x + 180} y={80} fill="#475569" fontSize="16">→</text>}
                </g>
              );
            })}
            <text x="390" y="155" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle">KÜLSŐ VAKOLÁS (ETICS) LÉPÉSEI</text>
            {["adhesive_eps", "dubel", "mesh", "thin_coat"].map((key, i) => {
              const step = plasterSteps[key];
              const x = 20 + i * 185;
              return (
                <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                  <rect x={x} y={170} width={175} height={80} rx={10} fill={activeEl === key ? step.color : "#1e293b"} stroke={step.color} strokeWidth={activeEl === key ? 2 : 1} />
                  <text x={x + 10} y={190} fill={activeEl === key ? "#fff" : "#f1f5f9"} fontSize="10" fontWeight="bold" fontFamily="system-ui">{i + 5}. lépés</text>
                  <text x={x + 10} y={208} fill={activeEl === key ? "#fff" : step.color} fontSize="9" fontFamily="monospace">{step.title}</text>
                  {i < 3 && <text x={x + 180} y={210} fill="#475569" fontSize="16">→</text>}
                </g>
              );
            })}
            <rect x="30" y="280" width="720" height="50" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
            <text x="50" y="302" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="system-ui">FONTOS: A belső vakolat ELŐBB készül! A külső ETICS csak utána.</text>
            <text x="50" y="320" fill="#94a3b8" fontSize="10" fontFamily="monospace">Min. +5°C mindkét oldalon. Külsőnél: nem napon, nem esőben, nem szélben.</text>
          </svg>
        </DiagramWrapper>
      )}

      {subTab === "exterior" && activeEl && (() => { const l = layers.find(l => l.id === activeEl); return l ? <DetailPanel color={l.color} title={l.label} detail={l.detail} /> : null; })()}
      {subTab === "partition" && activeEl && partElements[activeEl] && <DetailPanel color={partElements[activeEl].color} title={partElements[activeEl].title} detail={partElements[activeEl].detail} />}
      {subTab === "plastering" && activeEl && plasterSteps[activeEl] && <DetailPanel color={plasterSteps[activeEl].color} title={plasterSteps[activeEl].title} detail={plasterSteps[activeEl].detail} />}
      <ClickHint />
    </div>
  );
}

/* ─── ROOF ─── */
function RoofDiagram() {
  const [subTab, setSubTab] = useState("structure");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [{ id: "structure", label: "Szerkezet" }, { id: "layers", label: "Rétegrend" }, { id: "attic", label: "Padlástér" }, { id: "mistakes_r", label: "⚠ Gyakori hibák" }];

  const elements = {
    tarej: { label: "Taréjszelemen", detail: "A tető csúcsán futó gerenda, 15x15 vagy 15x20 cm. Tartós kemény fa (lucfenyő, vörösfenyő).", color: "#b45309" },
    szarufa: { label: "Szarufák", detail: "Ferde gerendák, 15x15 vagy 15x20 cm. Osztás: 60-90 cm. 100 cm felett problémás! Gomba+rovarkezelés (Wolmanit) KELL!", color: "#92400e" },
    fogopár: { label: "Fogópár", detail: "Vízszintes gerenda, összeköti a szarufákat. Nélküle a fal teteje kifelé dőlne!", color: "#d97706" },
    talp: { label: "Talpszelemen", detail: "A fal tetején, koszorúba csavarozott gerenda. A szarufák erre támaszkodnak alulról.", color: "#78350f" },
    folia: { label: "Páraáteresztő fólia", detail: "Véd esőtől DE kiengedi a párát. Drágábbat vegyél (Bramac, Tyvek: 500-1000 Ft/m²)! Az olcsó 5-8 év alatt elporlik → 3-8M Ft kár!", color: "#475569" },
    ellenlec: { label: "Ellenléc (4x5 cm)", detail: "Szellőzőrést biztosít a fólia és cserép között. Ha nincs szellőzés → pára → farothadás.", color: "#a16207" },
    tetolec: { label: "Tetőléc (3x5 cm)", detail: "Az ellenlécre merőlegesen, a cseréposztás szerint. Erre kerülnek a cserepek.", color: "#ca8a04" },
    cserep: { label: "Tetőcserép", detail: "Beton (40-45 kg/m², 30-50 év) vagy kerámia (35-40 kg/m², 50-100 év). Szélen és gerincen csavarozva!", color: "#dc2626" },
    koszoru: { label: "Koszorú + hőszigetelés", detail: "Vasbeton gyűrű a fal tetején. KÍVÜLRE 3-5 cm EPS kell — a beton hőhíd! Nélküle: penész a fal-mennyezet vonalában.", color: "#6b7280" },
    csatorna: { label: "Ereszcsatorna", detail: "Esővíz elvezetés. Lefolyó cső szikkasztóba vagy csapadékcsatornába, NEM a szomszédra!", color: "#64748b" },
  };

  const roofLayers = [
    { id: "gypsum_c", y: 340, h: 15, color: "#e2e8f0", label: "Gipszkarton 12.5mm", detail: "Belső felület, csavarozva a szarufákra vagy keresztlécekre. Erre kerül a festés." },
    { id: "vapor_barrier", y: 315, h: 12, color: "#ef4444", label: "PÁRAZÁRÓ FÓLIA ‼️", detail: "A LEGKRITIKUSABB réteg! Meleg oldalon (belül) KELL. Ha hiányzik/sérül → pára a szigetelésben → penész, farothadás → 3-8 MILLIÓ Ft kár! Ragasztószalaggal tömíteni (SIGA, Tyvek)!" },
    { id: "rafter_ins", y: 250, h: 55, color: "#fbbf24", label: "Szarufák közti szigetelés 15-20cm", detail: "Ásványgyapot (kőzetgyapot), szorosan illesztve a szarufák közé. λ=0.035-0.040 W/mK (alacsonyabb λ = jobb szigetelő)." },
    { id: "under_rafter", y: 225, h: 20, color: "#f59e0b", label: "Szarufa alatti kiegészítő 5-8cm", detail: "Plusz szigetelés a szarufák ALATT. Csökkenti a hőhidakat — a fa 4x rosszabb hőszigetelő mint a gyapot!" },
    { id: "breathable", y: 205, h: 12, color: "#22c55e", label: "Páraáteresztő membrán", detail: "KÜLSŐ oldalon. Kiengedi a párát, nem engedi be az esőt. Sd=0.02-0.3m (páradiffúziós ellenállás — mekkora légrétegnek felel meg; alacsonyabb = jobban átengedi a párát). Drágábbat vegyél!" },
    { id: "counter_b", y: 185, h: 15, color: "#92400e", label: "Ellenléc (szellőzőrés!)", detail: "A levegőnek ÁRAMOLNIA kell a membrán és cserép között. 4-5 cm rés. Ha nincs → pára → farothadás." },
    { id: "batten", y: 170, h: 10, color: "#a16207", label: "Tetőléc", detail: "Ellenlécre merőlegesen, cseréposztásnak megfelelően (pl. 33 cm)." },
    { id: "tile", y: 150, h: 15, color: "#dc2626", label: "Tetőcserép", detail: "Beton vagy kerámia. A szélső és gerinccserepeket rögzíteni kell! A súly a statikai terv része." },
    { id: "total_r", y: 380, h: 1, color: "#f59e0b", label: "Összvastagság: 30-40 cm", detail: "A gipszkartontól a cserépig 30-40 cm. Jó tetőszigetelés: havi 10-20.000 Ft megtakarítás!" },
  ];

  const atticDetails = {
    cold: { title: "Hideg padlás", color: "#3b82f6", detail: "Szigetelés a FÖDÉMEN van (20-30 cm). A padlástér hideg, szellőztetett (oromfalon rács). Olcsóbb, ha nem kell a padlástér." },
    warm: { title: "Meleg padlás (tetőtér)", color: "#ef4444", detail: "Szigetelés a TETŐHÉJAZATBAN (szarufák közt + alatt). A padlás fűtött lakótér. Drágább, de +30-50% lakóterület! Párazáró fólia KRITIKUS." },
    cold_vent: { title: "Hideg padlás szellőzés", color: "#22c55e", detail: "Oromfalon szellőzőrács, gerincen szellőzőelem. A pára ki KELL jusson! Penész elleni védelem." },
    warm_vapor: { title: "Meleg padlás párazárás", color: "#f59e0b", detail: "Blower-door teszt ajánlott: n50 < 1.5 1/h (n50 = légcsere szám 50 Pa nyomáskülönbségnél — minél alacsonyabb, annál légzáróbb a ház). Minden átvezetés (kábel, cső, kémény) speciális gallérral tömítendő." },
    wolmanit: { title: "Wolmanit (gyári kezelés)", color: "#14b8a6", detail: "Vákuumimpregnálás: nagy nyomáson juttatják be a védőszert. 20-30 év védelem gomba és rovar ellen. Kérd a tanúsítványt!" },
    bochemit: { title: "Bochemit (helyszíni)", color: "#8b5cf6", detail: "Ecsetelés vagy permetezés. 5-10 év védelem, ismétlendő. Olcsóbb, de kevésbé tartós. Régi tetőknél utólagos kezelésre alkalmas." },
  };

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />

      {subTab === "structure" && (
        <DiagramWrapper>
          <svg viewBox="0 0 700 420" style={{ width: "100%", height: "auto", display: "block" }}>
            {/* Walls */}
            <rect x="80" y="280" width="50" height="120" fill="#c2410c" opacity="0.6" stroke="#9a3412" strokeWidth="1" rx="2" />
            <rect x="570" y="280" width="50" height="120" fill="#c2410c" opacity="0.6" stroke="#9a3412" strokeWidth="1" rx="2" />
            {/* Koszorú (ring beam) */}
            <g onClick={() => setActiveEl("koszoru")} style={{ cursor: "pointer" }}>
              <rect x="75" y="268" width="60" height="16" fill={activeEl === "koszoru" ? "#9ca3af" : "#6b7280"} stroke={activeEl === "koszoru" ? "#fff" : "#94a3b8"} strokeWidth={activeEl === "koszoru" ? 2 : 1} rx="2" />
              <rect x="565" y="268" width="60" height="16" fill={activeEl === "koszoru" ? "#9ca3af" : "#6b7280"} stroke={activeEl === "koszoru" ? "#fff" : "#94a3b8"} strokeWidth={activeEl === "koszoru" ? 2 : 1} rx="2" />
              {/* EPS strips on outside */}
              <rect x="70" y="268" width="6" height="16" fill="#93c5fd" opacity="0.7" />
              <rect x="624" y="268" width="6" height="16" fill="#93c5fd" opacity="0.7" />
            </g>
            {/* Talpszelemen (wall plate) */}
            <g onClick={() => setActiveEl("talp")} style={{ cursor: "pointer" }}>
              <rect x="88" y="252" width="30" height="18" fill={activeEl === "talp" ? "#a16207" : "#78350f"} stroke={activeEl === "talp" ? "#fff" : "#92400e"} strokeWidth={activeEl === "talp" ? 2 : 1} rx="2" />
              <rect x="582" y="252" width="30" height="18" fill={activeEl === "talp" ? "#a16207" : "#78350f"} stroke={activeEl === "talp" ? "#fff" : "#92400e"} strokeWidth={activeEl === "talp" ? 2 : 1} rx="2" />
            </g>
            {/* Szarufák (rafters) — shown as the main slope beams + spacing marks */}
            <g onClick={() => setActiveEl("szarufa")} style={{ cursor: "pointer" }}>
              {/* Main rafter pair (front) — full lines from wall plate to ridge */}
              <line x1="103" y1="255" x2="350" y2="60" stroke={activeEl === "szarufa" ? "#b45309" : "#92400e"} strokeWidth={activeEl === "szarufa" ? 7 : 5} strokeLinecap="round" />
              <line x1="597" y1="255" x2="350" y2="60" stroke={activeEl === "szarufa" ? "#b45309" : "#92400e"} strokeWidth={activeEl === "szarufa" ? 7 : 5} strokeLinecap="round" />
              {/* Additional rafter pairs behind (lighter, suggesting depth) */}
              {[1, 2, 3, 4].map((i) => {
                const offset = i * 8;
                return <g key={i} opacity={1 - i * 0.18}>
                  <line x1={103 + offset} y1="255" x2={350} y2={60} stroke={activeEl === "szarufa" ? "#b45309" : "#92400e"} strokeWidth="3" strokeLinecap="round" />
                  <line x1={597 - offset} y1="255" x2={350} y2={60} stroke={activeEl === "szarufa" ? "#b45309" : "#92400e"} strokeWidth="3" strokeLinecap="round" />
                </g>;
              })}
            </g>
            {/* Fogópár (collar tie) */}
            <g onClick={() => setActiveEl("fogopár")} style={{ cursor: "pointer" }}>
              <line x1="185" y1="185" x2="515" y2="185" stroke={activeEl === "fogopár" ? "#fbbf24" : "#d97706"} strokeWidth={activeEl === "fogopár" ? 5 : 3} strokeLinecap="round" />
            </g>
            {/* Taréjszelemen (ridge beam) */}
            <g onClick={() => setActiveEl("tarej")} style={{ cursor: "pointer" }}>
              <ellipse cx="350" cy="58" rx="28" ry="10" fill={activeEl === "tarej" ? "#d97706" : "#b45309"} stroke={activeEl === "tarej" ? "#fff" : "#92400e"} strokeWidth={activeEl === "tarej" ? 2 : 1} />
            </g>
            {/* Tetőfólia (roof membrane) — dashed line under the slope */}
            <g onClick={() => setActiveEl("folia")} style={{ cursor: "pointer" }}>
              <line x1="95" y1="258" x2="350" y2="56" stroke={activeEl === "folia" ? "#94a3b8" : "#475569"} strokeWidth="1.5" strokeDasharray="4,3" />
              <line x1="605" y1="258" x2="350" y2="56" stroke={activeEl === "folia" ? "#94a3b8" : "#475569"} strokeWidth="1.5" strokeDasharray="4,3" />
            </g>
            {/* Ellenléc + Tetőléc indicators */}
            <g onClick={() => setActiveEl("ellenlec")} style={{ cursor: "pointer" }}>
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const t = 0.08 + i * 0.16;
                const lx = 103 + t * (350 - 103); const ly = 255 + t * (60 - 255);
                const rx = 597 - t * (597 - 350); const ry = 255 + t * (60 - 255);
                return <g key={i}>
                  <rect x={lx - 1} y={ly - 1} width="3" height="10" fill={activeEl === "ellenlec" ? "#d97706" : "#a16207"} transform={`rotate(-39, ${lx}, ${ly})`} />
                  <rect x={rx - 1} y={ry - 1} width="3" height="10" fill={activeEl === "ellenlec" ? "#d97706" : "#a16207"} transform={`rotate(39, ${rx}, ${ry})`} />
                </g>;
              })}
            </g>
            <g onClick={() => setActiveEl("tetolec")} style={{ cursor: "pointer" }}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                const t = 0.05 + i * 0.12;
                const lx = 103 + t * (350 - 103) - 10; const ly = 255 + t * (60 - 255) - 5;
                const rx = 597 - t * (597 - 350) + 10; const ry = 255 + t * (60 - 255) - 5;
                return <g key={i}>
                  <line x1={lx - 8} y1={ly} x2={lx + 8} y2={ly} stroke={activeEl === "tetolec" ? "#eab308" : "#ca8a04"} strokeWidth="2" />
                  <line x1={rx - 8} y1={ry} x2={rx + 8} y2={ry} stroke={activeEl === "tetolec" ? "#eab308" : "#ca8a04"} strokeWidth="2" />
                </g>;
              })}
            </g>
            {/* Cserép (tiles) */}
            <g onClick={() => setActiveEl("cserep")} style={{ cursor: "pointer" }}>
              {Array.from({ length: 10 }).map((_, i) => {
                const t = 0.03 + i * 0.097;
                const lx = 100 + t * (350 - 100); const ly = 258 + t * (58 - 258);
                const rx = 600 - t * (600 - 350); const ry = 258 + t * (58 - 258);
                const angle = Math.atan2(58 - 258, 350 - 100) * 180 / Math.PI;
                return <g key={i}>
                  <rect x={lx} y={ly} width="20" height="5" rx="2" fill={activeEl === "cserep" ? "#ef4444" : "#dc2626"} opacity="0.8" transform={`rotate(${angle}, ${lx}, ${ly})`} />
                  <rect x={rx - 20} y={ry} width="20" height="5" rx="2" fill={activeEl === "cserep" ? "#ef4444" : "#dc2626"} opacity="0.8" transform={`rotate(${-angle}, ${rx}, ${ry})`} />
                </g>;
              })}
            </g>
            {/* Ereszcsatorna (gutter) */}
            <g onClick={() => setActiveEl("csatorna")} style={{ cursor: "pointer" }}>
              <path d="M60,264 Q72,278 84,264" stroke={activeEl === "csatorna" ? "#94a3b8" : "#64748b"} strokeWidth="3" fill="none" />
              <line x1="60" y1="264" x2="60" y2="400" stroke={activeEl === "csatorna" ? "#94a3b8" : "#64748b"} strokeWidth="2" />
              <path d="M616,264 Q628,278 640,264" stroke={activeEl === "csatorna" ? "#94a3b8" : "#64748b"} strokeWidth="3" fill="none" />
              <line x1="640" y1="264" x2="640" y2="400" stroke={activeEl === "csatorna" ? "#94a3b8" : "#64748b"} strokeWidth="2" />
            </g>
            {/* Labels */}
            <text x="350" y="42" fill="#fbbf24" fontSize="10" fontFamily="monospace" textAnchor="middle">Taréjszelemen ▲</text>
            <text x="350" y="203" fill="#d97706" fontSize="10" fontFamily="monospace" textAnchor="middle">← Fogópár →</text>
            <text x="140" y="294" fill="#4ade80" fontSize="9" fontFamily="monospace" textAnchor="middle">↔ 60-90 cm</text>
            <text x="70" y="248" fill="#94a3b8" fontSize="8" fontFamily="monospace">Koszorú</text>
            <text x="595" y="248" fill="#94a3b8" fontSize="8" fontFamily="monospace">Koszorú</text>
          </svg>
        </DiagramWrapper>
        <PhotoSection searchQuery="tetőszerkezet ácsozás szarufák" images={[
          { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Roof_trusses.jpg/320px-Roof_trusses.jpg", alt: "Tetőszerkezet", caption: "Tetőszerkezet szarufákkal és fogópárokkal" },
          { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Roof_construction_detail.jpg/320px-Roof_construction_detail.jpg", alt: "Tető részlet", caption: "Cserépfedés és ellenléc részlet" }
        ]} />
      )}

      {subTab === "layers" && (
        <DiagramWrapper>
          <svg viewBox="0 0 700 420" style={{ width: "100%", height: "auto", display: "block" }}>
            <text x="350" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">TETŐRÉTEGREND — belülről kifelé</text>
            <text x="60" y="395" fill="#64748b" fontSize="9" fontFamily="monospace">BELSŐ ↑</text>
            <text x="60" y="145" fill="#64748b" fontSize="9" fontFamily="monospace">↑ KÜLSŐ</text>
            {roofLayers.filter(l => l.h > 1).map((l) => (
              <g key={l.id} onClick={() => setActiveEl(activeEl === l.id ? null : l.id)} style={{ cursor: "pointer" }}>
                <rect x="100" y={l.y} width="480" height={l.h} rx={3} fill={l.color} opacity={activeEl === l.id ? 1 : 0.7} stroke={activeEl === l.id ? "#fff" : "transparent"} strokeWidth={2} />
                <text x="115" y={l.y + l.h / 2 + 4} fill={l.color === "#e2e8f0" ? "#1e293b" : "#f1f5f9"} fontSize={l.h > 15 ? "11" : "9"} fontWeight="bold" fontFamily="system-ui">{l.label}</text>
                {l.id === "vapor_barrier" && <text x="590" y={l.y + 10} fill="#ef4444" fontSize="12" fontWeight="bold">⚠️</text>}
              </g>
            ))}
            {/* Rafter indicators in insulation zone */}
            {[200, 300, 400, 500].map((x, i) => (
              <rect key={i} x={x} y="250" width="8" height="55" fill="#92400e" opacity="0.5" rx="1" />
            ))}
            <text x="600" y="280" fill="#92400e" fontSize="8" fontFamily="monospace">← szarufák</text>
          </svg>
        </DiagramWrapper>
      )}

      {subTab === "attic" && (
        <DiagramWrapper>
          <svg viewBox="0 0 750 420" style={{ width: "100%", height: "auto", display: "block" }}>
            <text x="190" y="25" fill="#3b82f6" fontSize="13" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">Hideg padlás</text>
            <text x="560" y="25" fill="#ef4444" fontSize="13" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">Meleg padlás</text>
            <line x1="375" y1="15" x2="375" y2="320" stroke="#334155" strokeWidth="1" strokeDasharray="6,4" />
            {/* Cold attic */}
            <polygon points="50,200 190,80 330,200" fill="none" stroke="#94a3b8" strokeWidth="2" />
            <line x1="50" y1="200" x2="330" y2="200" stroke="#3b82f6" strokeWidth="6" />
            <rect x="50" y="200" width="280" height="8" rx="2" fill="#fbbf24" opacity="0.7" />
            <text x="190" y="215" fill="#fbbf24" fontSize="9" fontFamily="monospace" textAnchor="middle">↑ szigetelés a födémen</text>
            <text x="190" y="150" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">hideg, szellőzött tér</text>
            {/* Warm attic */}
            <polygon points="420,200 560,80 700,200" fill="none" stroke="#94a3b8" strokeWidth="2" />
            <line x1="422" y1="198" x2="560" y2="82" stroke="#fbbf24" strokeWidth="6" opacity="0.7" />
            <line x1="560" y1="82" x2="698" y2="198" stroke="#fbbf24" strokeWidth="6" opacity="0.7" />
            <text x="560" y="150" fill="#ef4444" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">FŰTÖTT LAKÓTÉR</text>
            {/* Interactive elements */}
            {Object.keys(atticDetails).map((key, i) => {
              const el = atticDetails[key];
              const col = i < 3 ? 0 : 1;
              const row = i % 3;
              const x = 30 + col * 370;
              const y = 260 + row * 45;
              return (
                <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                  <rect x={x} y={y} width={340} height={38} rx={8} fill={activeEl === key ? el.color : "#1e293b"} stroke={el.color} strokeWidth={activeEl === key ? 2 : 1} />
                  <text x={x + 15} y={y + 24} fill={activeEl === key ? "#fff" : el.color} fontSize="11" fontWeight="bold" fontFamily="system-ui">{el.title}</text>
                </g>
              );
            })}
          </svg>
        </DiagramWrapper>
      )}

      {subTab === "structure" && activeEl && elements[activeEl] && <DetailPanel color={elements[activeEl].color} title={elements[activeEl].label} detail={elements[activeEl].detail} />}
      {subTab === "layers" && activeEl && (() => { const l = roofLayers.find(l => l.id === activeEl); return l ? <DetailPanel color={l.color} title={l.label} detail={l.detail} /> : null; })()}
      {subTab === "attic" && activeEl && atticDetails[activeEl] && <DetailPanel color={atticDetails[activeEl].color} title={atticDetails[activeEl].title} detail={atticDetails[activeEl].detail} />}
      {subTab === "mistakes_r" && (() => {
        const mistakes = [
          { id: "no_foil", title: "Hiányzó/rossz tetőfólia", color: THEME.accent.red, detail: "A tetőfólia (alátétfólia/DHV) védi a hőszigeteléstépáralecsapódástól és a beázástól (ha a cserép alá befúj az eső/hó). Páraáteresztő (diffúz) fólia KELL — a régi típusú, nem lélegző fólia penészt okoz! Gyakori hiba: lyukas fólia (szeg, léc átüti), nem ragasztott átfedések. A tetőfólia hiánya = az ELSŐ viharban beázás." },
          { id: "ventilation_gap", title: "Nincs szellőzőrés", color: THEME.accent.amber, detail: "A tetőfedés (cserép/fémlemez) és a tetőfólia KÖZÖTT min. 4-5 cm szellőzőrés kell (ellenléc biztosítja). Az eresznél szellőzőrács, a gerinánél szellőző kúpcserép/szellőzőelem. Nélküle: a pára nem tud távozni → penész, farothadás a szarufákon, csökkenő hőszigetelő képesség. 5-10 éven belül a tető tönkremegy!" },
          { id: "weak_timber", title: "Alulméretezett/kezeletlen faszerkezet", color: THEME.accent.orange, detail: "A szarufák, szelemenek méretét STATIKUS tervezi (hó- és szélteher!). Gyakori hiba: túl vékony szarufák (10x10 helyett 15x15 kellene), túl nagy osztás (>90 cm). Gomba- és rovarkezelés (Wolmanit, Bochemit) KÖTELEZŐ! Kezeletlen fa: 10-15 év múlva szú, gomba, korhadt tetőszerkezet." },
          { id: "flashing", title: "Rossz/hiányzó szegélylemezek", color: THEME.accent.blue, detail: "A kémény, fal-tető csatlakozás, ablak körüli szegélylemezek (flashings) a beázás leggyakoribb helyei. Ólom- vagy alu szegélylemez, szilikon tömítéssel. Gyakori hiba: csak szilikon ragasztó lemez nélkül → 2-3 éven belül elöregszik és beázik. A szegélylemezezés BÁDOGOS munkája — ne a tetőfedő csinálja (hacsak nem mindkettőhöz ért)!" },
          { id: "insulation_gap", title: "Hézagos tetőszigetelés", color: THEME.accent.red, detail: "A tetőszigetelés (ásványgyapot/cellulóz) hézagmentesen kell feküdjön — 1-2 cm rés is hőhidat jelent! Tipikus hely: szarufa mellett, tetőablak körül, falfejnél. Párázáró fólia (belső oldal) RAGASZTOTT átfedéssel. Blower Door teszt kimutatja a légzárási hibákat. Rossz szigetelés = magas fűtésszámla + nyári túlmelegedés." },
        ];
        return (
          <>
            <DiagramWrapper>
              <svg viewBox="0 0 750 300" style={{ width: "100%" }}>
                <text x="375" y="25" textAnchor="middle" fill={THEME.accent.red} fontSize="14" fontWeight="700">⚠ TETŐSZERKEZET — GYAKORI HIBÁK</text>
                {mistakes.map((m, i) => (
                  <g key={m.id} onClick={() => setActiveEl(activeEl === m.id ? null : m.id)} style={{ cursor: "pointer" }}>
                    <rect x={20 + (i % 2) * 370} y={50 + Math.floor(i / 2) * 60} width="350" height="50" rx="8" fill={activeEl === m.id ? m.color + "22" : "#111827"} stroke={m.color} strokeWidth={activeEl === m.id ? 2.5 : 1.5} />
                    <text x={35 + (i % 2) * 370} y={72 + Math.floor(i / 2) * 60} fill={m.color} fontSize="11" fontWeight="700">⚠ {m.title}</text>
                    <text x={35 + (i % 2) * 370} y={88 + Math.floor(i / 2) * 60} fill={THEME.text.muted} fontSize="9">[kattints a részletekért]</text>
                  </g>
                ))}
              </svg>
            </DiagramWrapper>
            {activeEl && (() => { const m = mistakes.find(m => m.id === activeEl); return m ? <DetailPanel color={m.color} title={m.title} detail={m.detail} /> : null; })()}
          </>
        );
      })()}
      <ClickHint />
    </div>
  );
}

/* ─── WINDOW ─── */
function WindowDiagram() {
  const [subTab, setSubTab] = useState("installation");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [{ id: "installation", label: "Beépítés" }, { id: "mounting", label: "Előtétes vs falba" }, { id: "shutters", label: "Redőny" }, { id: "mistakes_w", label: "⚠ Gyakori hibák" }];

  const installDetails = {
    glass: { title: "Háromrétegű üveg", color: "#60a5fa", detail: "3 üveglap, 2 db argon-töltött rés, Low-E bevonat. Ug=0.5-0.7 (Ug = üveg hőátbocsátása W/m²K-ban — alacsonyabb = jobb). MINDIG háromréteget kérj! Kétrétegű 'modern' = marketing, Uw 1.0-1.1 vs. háromrétegű Uw 0.7-0.8 (Uw = a teljes ablak hőátbocsátása, kerettel együtt)." },
    frame: { title: "PVC tok (5-7 kamrás)", color: "#94a3b8", detail: "Minél több kamra, annál jobb. Uf=1.0-1.3 W/m²K (keret hőátbocsátása — alacsonyabb = jobb). A TELJES ablak Uw értéke számít (Uw = üveg + keret + távtartó együtt)!" },
    foam: { title: "PU hab", color: "#fbbf24", detail: "Kitölti a 2-3 cm hézagot. Hőszigetel, DE szalag nélkül 3-5 éven belül szétesik a nedvességtől!" },
    tape_in: { title: "PÁRAZÁRÓ szalag (belső)", color: "#ef4444", detail: "A BELSŐ oldalra! Megakadályozza a pára bejutását a habba. Ha nincs → hab szétesik → fúj, penész. Javítás: 30-50.000 Ft/ablak! Anyagköltség: 500-1000 Ft/fm." },
    tape_out: { title: "PÁRAÁTERESZTŐ szalag (külső)", color: "#22c55e", detail: "A KÜLSŐ oldalra. Kiengedi a nedvességet, nem engedi be az esőt. A LEGTÖBB KIVITELEZŐ KIHAGYJA! 20-40.000 Ft az egész háznál." },
    sill_in: { title: "Belső párkány", color: "#a78bfa", detail: "Műanyag, fa vagy kő. Lejtés befelé, hogy a páralecsapódás ne csorogjon a falra." },
    sill_out: { title: "Külső vízorr", color: "#f97316", detail: "LEFELÉ kell lejtenie! Csepegő él az alján. Ha sík → víz a falba → penész, fagyás." },
    console: { title: "Előtétes konzol", color: "#64748b", detail: "Az ablak a szigetelés síkjába kerül → kevesebb hőhíd. Fém vagy műanyag tartók." },
    insulation_w: { title: "Tok-átfedés", color: "#38bdf8", detail: "A szigetelés ráfed 2-3 cm-t az ablak tokjára. Nélküle → hőhíd az ablak körül." },
  };

  const mountDetails = {
    front_mount: { title: "Előtétes beépítés", color: "#22c55e", detail: "Ablak a fal KÜLSŐ síkjában vagy a szigetelésben. Konzollal rögzítve. Hőhíd-mentes! Költség: +20-40.000 Ft/ablak a konzolokra." },
    wall_mount: { title: "Falba épített", color: "#f59e0b", detail: "Hagyományos, az ablak a fal síkjában. Nagyobb hőhíd a tok körül. Olcsóbb, de rosszabb energetika." },
    thermal_br: { title: "Hőhíd hatás", color: "#ef4444", detail: "Előtétes beépítésnél 50-70%-kal kisebb a hőhíd. Ez évi 15-25.000 Ft fűtési megtakarítás ablakokként!" },
    uw_formula: { title: "Uw számítás", color: "#8b5cf6", detail: "Uw = (Ag×Ug + Af×Uf + lg×Ψg) / (Ag+Af). Függ az üvegtől (Ug), kerettől (Uf), és távtartótól (Ψg — hőhíd veszteségi tényező W/mK-ban, alacsonyabb = kevesebb hőveszteség). Cél: Uw < 0.85 W/m²K (hőátbocsátási tényező — mennyi hő jut át 1 m²-en)." },
    spacer: { title: "Meleg peremes távtartó", color: "#3b82f6", detail: "Warm-edge spacer: műanyag/rozsdamentes acél, nem alumínium. Ψg=0.04 vs 0.08 W/mK (Ψ = hőhíd veszteségi tényező, alacsonyabb = jobb). Csökkenti a hőhidat az üveg szélén." },
    mount_cmp: { title: "Összehasonlítás", color: "#14b8a6", detail: "Előtétes: Uw 0.7-0.8, drágább, de 5-8 év megtérülés. Falba épített: Uw 0.9-1.1, olcsóbb, de 25-40% több hőveszteség az ablak körül." },
  };

  const shutterDetails = {
    box_type: { title: "Redőnydoboz típusok", color: "#f59e0b", detail: "Vakolatba épített (Aluprof, DOCO): szebb, de ÉPÍTÉS KÖZBEN kell tervezni! Min. 20 cm hely. Ráépített: utólag is, de látszik." },
    motor: { title: "Redőny motor", color: "#3b82f6", detail: "Csőmotor 230V, max 40 Nm. Kábelt (3x1.5mm²) AZ ÉPÍTÉS SORÁN befalazni! Ha kimarad: utólag kívül kell vezetni = csúnya + drága." },
    slats: { title: "Redőny lamellák", color: "#94a3b8", detail: "Alumínium (könnyű, tartós) vagy PVC (olcsóbb). Szélálló kivitel reteszelődik. Hőszigetelő hatás: 10-15% fűtésmegtakarítás." },
    insulated_box: { title: "Szigetelt tokozat", color: "#ef4444", detail: "A redőnydoboz HŐHÍD! Szigetelt: Ud=0.6-1.0 W/m²K. Szigeteletlen: 2-3 W/m²K → fázik az ablak fölött! Ár különbség: 5-10.000 Ft/ablak." },
    cable_prep: { title: "Kábel előkészítés", color: "#22c55e", detail: "Minden ablakhoz 3x1.5mm² kábel. ÉPÍTÉS KÖZBEN befalazni! Smart vezérléshez 5x1.5mm² vagy UTP is. Ha kimarad, utólag nem szép." },
  };

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />
      {subTab === "installation" && (
        <DiagramWrapper>
          <svg viewBox="0 0 700 480" style={{ width: "100%", height: "auto", display: "block" }}>
            <text x="350" y="20" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">ABLAK BEÉPÍTÉS — vízszintes metszet (felülnézet)</text>
            <text x="70" y="45" fill="#64748b" fontSize="10" fontFamily="monospace">← BELSŐ</text>
            <text x="570" y="45" fill="#64748b" fontSize="10" fontFamily="monospace">KÜLSŐ →</text>
            {/* Wall - brick */}
            <rect x="160" y="60" width="150" height="360" fill="#c2410c" opacity="0.45" rx="3" />
            <text x="235" y="250" fill="#fca5a5" fontSize="10" fontFamily="monospace" textAnchor="middle" transform="rotate(-90, 235, 250)">TÉGLA 30 cm</text>
            {/* Insulation layer */}
            <g onClick={() => setActiveEl("insulation_w")} style={{ cursor: "pointer" }}>
              <rect x="310" y="60" width="80" height="360" fill="#38bdf8" opacity={0.25} rx="3" stroke={activeEl === "insulation_w" ? "#fff" : "#38bdf8"} strokeWidth={activeEl === "insulation_w" ? 2 : 1} />
              <text x="350" y="250" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90, 350, 250)">SZIGETELÉS 15 cm</text>
            </g>
            {/* Window opening in the wall */}
            <rect x="170" y="140" width="130" height="200" fill="#0f172a" rx="3" />
            {/* Window frame (PVC profile) */}
            <g onClick={() => setActiveEl("frame")} style={{ cursor: "pointer" }}>
              <rect x="178" y="148" width="22" height="184" fill={activeEl === "frame" ? "#cbd5e1" : "#94a3b8"} rx="3" stroke={activeEl === "frame" ? "#fff" : "#64748b"} strokeWidth={activeEl === "frame" ? 2 : 1} />
              <rect x="270" y="148" width="22" height="184" fill={activeEl === "frame" ? "#cbd5e1" : "#94a3b8"} rx="3" stroke={activeEl === "frame" ? "#fff" : "#64748b"} strokeWidth={activeEl === "frame" ? 2 : 1} />
            </g>
            {/* Triple glass */}
            <g onClick={() => setActiveEl("glass")} style={{ cursor: "pointer" }}>
              <rect x="206" y="158" width="4" height="164" fill="#bfdbfe" opacity="0.9" />
              <rect x="222" y="158" width="4" height="164" fill="#bfdbfe" opacity="0.7" />
              <rect x="238" y="158" width="4" height="164" fill="#bfdbfe" opacity="0.9" />
              {/* Argon gaps */}
              <rect x="210" y="158" width="12" height="164" fill="#6366f1" opacity="0.12" />
              <rect x="226" y="158" width="12" height="164" fill="#6366f1" opacity="0.12" />
              {activeEl === "glass" && <rect x="203" y="153" width="43" height="174" fill="none" stroke="#fff" strokeWidth="2" rx="3" />}
              <text x="224" y="345" fill="#60a5fa" fontSize="7" fontFamily="monospace" textAnchor="middle">3x üveg</text>
            </g>
            {/* PU foam */}
            <g onClick={() => setActiveEl("foam")} style={{ cursor: "pointer" }}>
              <rect x="170" y="148" width="10" height="184" fill="#fbbf24" opacity="0.5" rx="2" stroke={activeEl === "foam" ? "#fff" : "transparent"} strokeWidth={2} />
              <rect x="290" y="148" width="10" height="184" fill="#fbbf24" opacity="0.5" rx="2" stroke={activeEl === "foam" ? "#fff" : "transparent"} strokeWidth={2} />
              <text x="175" y="395" fill="#fbbf24" fontSize="8" fontFamily="monospace" textAnchor="middle">PU hab</text>
            </g>
            {/* Inner tape (vapor barrier) */}
            <g onClick={() => setActiveEl("tape_in")} style={{ cursor: "pointer" }}>
              <rect x="165" y="145" width="5" height="190" fill={activeEl === "tape_in" ? "#f87171" : "#ef4444"} rx="1" stroke={activeEl === "tape_in" ? "#fff" : "transparent"} strokeWidth={2} />
              <line x1="167" y1="155" x2="110" y2="120" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" />
              <text x="40" y="118" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">PÁRAZÁRÓ szalag!</text>
            </g>
            {/* Outer tape (vapor permeable) */}
            <g onClick={() => setActiveEl("tape_out")} style={{ cursor: "pointer" }}>
              <rect x="300" y="145" width="5" height="190" fill={activeEl === "tape_out" ? "#4ade80" : "#22c55e"} rx="1" stroke={activeEl === "tape_out" ? "#fff" : "transparent"} strokeWidth={2} />
              <line x1="303" y1="155" x2="410" y2="100" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3" />
              <text x="415" y="98" fill="#22c55e" fontSize="9" fontWeight="bold" fontFamily="monospace">PÁRAÁTERESZTŐ</text>
            </g>
            {/* Mounting console */}
            <g onClick={() => setActiveEl("console")} style={{ cursor: "pointer" }}>
              <rect x="295" y="310" width="25" height="14" fill={activeEl === "console" ? "#94a3b8" : "#64748b"} rx="2" stroke={activeEl === "console" ? "#fff" : "transparent"} strokeWidth={2} />
              <text x="307" y="340" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">konzol</text>
            </g>
            {/* Inner sill */}
            <g onClick={() => setActiveEl("sill_in")} style={{ cursor: "pointer" }}>
              <rect x="100" y="335" width="70" height="7" fill={activeEl === "sill_in" ? "#c4b5fd" : "#a78bfa"} rx="2" stroke={activeEl === "sill_in" ? "#fff" : "transparent"} strokeWidth={2} />
              <text x="135" y="355" fill="#a78bfa" fontSize="7" fontFamily="monospace" textAnchor="middle">belső párkány</text>
            </g>
            {/* Outer sill (drip edge) */}
            <g onClick={() => setActiveEl("sill_out")} style={{ cursor: "pointer" }}>
              <polygon points="300,335 400,335 405,343 295,343" fill={activeEl === "sill_out" ? "#fb923c" : "#f97316"} stroke={activeEl === "sill_out" ? "#fff" : "transparent"} strokeWidth={2} />
              <text x="420" y="342" fill="#f97316" fontSize="8" fontFamily="monospace">← vízorr (lejtés!)</text>
            </g>
            {/* Rule box */}
            <rect x="40" y="415" width="620" height="45" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
            <text x="60" y="436" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="system-ui">SZABÁLY: Belül ZÁRT, kívül NYITOTT</text>
            <text x="60" y="452" fill="#94a3b8" fontSize="10" fontFamily="monospace">Belső szalag zár → PU hab száraz marad → külső szalag kienged</text>
          </svg>
        </DiagramWrapper>
        <PhotoSection searchQuery="ablakbeépítés műanyag ablak beszerelés" images={[
          { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Window_installation.jpg/320px-Window_installation.jpg", alt: "Ablakbeépítés", caption: "Háromrétegű ablak beépítés közben" },
          { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Triple_glazing_cross_section.jpg/320px-Triple_glazing_cross_section.jpg", alt: "Háromrétegű üveg", caption: "Háromrétegű üvegezés metszete" }
        ]} />
      )}
      {subTab === "mounting" && (
        <DiagramWrapper>
          <svg viewBox="0 0 700 400" style={{ width: "100%", height: "auto", display: "block" }}>
            <text x="175" y="25" fill="#22c55e" fontSize="13" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">Előtétes beépítés</text>
            <text x="525" y="25" fill="#f59e0b" fontSize="13" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">Falba épített</text>
            <line x1="350" y1="15" x2="350" y2="320" stroke="#334155" strokeWidth="1" strokeDasharray="6,4" />
            {/* Front-mounted: small thermal bridge */}
            <rect x="80" y="60" width="80" height="200" fill="#c2410c" opacity="0.5" rx="2" />
            <rect x="160" y="60" width="40" height="200" fill="#93c5fd" opacity="0.3" rx="2" />
            <rect x="165" y="110" width="30" height="80" fill="#94a3b8" rx="2" />
            <text x="180" y="155" fill="#22c55e" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">✓</text>
            {/* Wall-mounted: big thermal bridge */}
            <rect x="430" y="60" width="80" height="200" fill="#c2410c" opacity="0.5" rx="2" />
            <rect x="510" y="60" width="40" height="200" fill="#93c5fd" opacity="0.3" rx="2" />
            <rect x="445" y="110" width="30" height="80" fill="#94a3b8" rx="2" />
            <line x1="440" y1="120" x2="420" y2="100" stroke="#ef4444" strokeWidth="3" />
            <line x1="440" y1="150" x2="415" y2="150" stroke="#ef4444" strokeWidth="3" />
            <line x1="440" y1="180" x2="420" y2="200" stroke="#ef4444" strokeWidth="3" />
            <text x="405" y="155" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">hőhíd!</text>
            {Object.keys(mountDetails).map((key, i) => {
              const el = mountDetails[key];
              const x = 20 + (i % 3) * 220;
              const y = 290 + Math.floor(i / 3) * 45;
              return (
                <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                  <rect x={x} y={y} width={210} height={38} rx={8} fill={activeEl === key ? el.color : "#1e293b"} stroke={el.color} strokeWidth={activeEl === key ? 2 : 1} />
                  <text x={x + 10} y={y + 24} fill={activeEl === key ? "#fff" : el.color} fontSize="10" fontFamily="system-ui">{el.title}</text>
                </g>
              );
            })}
          </svg>
        </DiagramWrapper>
      )}
      {subTab === "shutters" && (
        <DiagramWrapper>
          <svg viewBox="0 0 700 380" style={{ width: "100%", height: "auto", display: "block" }}>
            <text x="350" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">REDŐNYDOBOZ METSZET</text>
            {/* Shutter box */}
            <rect x="180" y="50" width="340" height="100" rx="8" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
            <text x="350" y="75" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle">Redőnydoboz (min. 20cm)</text>
            <circle cx="350" cy="110" r="20" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
            <text x="350" y="115" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">motor+tengely</text>
            {/* Slats rolled up */}
            <circle cx="350" cy="110" r="12" fill="#475569" opacity="0.5" />
            {/* Window below */}
            <rect x="220" y="160" width="260" height="140" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" rx="3" />
            <rect x="230" y="170" width="240" height="120" fill="#0f172a" rx="2" />
            <text x="350" y="235" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">ABLAK</text>
            {/* Insulated vs not */}
            <rect x="180" y="50" width="170" height="100" rx="8" fill="#22c55e" opacity="0.1" stroke="#22c55e" strokeWidth="1" strokeDasharray="4,4" />
            <text x="265" y="145" fill="#22c55e" fontSize="8" fontFamily="monospace" textAnchor="middle">Szigetelt Ud=0.6-1.0</text>
            <rect x="350" y="50" width="170" height="100" rx="8" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,4" />
            <text x="435" y="145" fill="#ef4444" fontSize="8" fontFamily="monospace" textAnchor="middle">Nem szigetelt Ud=2-3!</text>
            {Object.keys(shutterDetails).map((key, i) => {
              const el = shutterDetails[key];
              return (
                <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                  <rect x={20 + (i % 3) * 225} y={320 + Math.floor(i / 3) * 42} width={215} height={36} rx={8} fill={activeEl === key ? el.color : "#1e293b"} stroke={el.color} strokeWidth={activeEl === key ? 2 : 1} />
                  <text x={30 + (i % 3) * 225} y={343 + Math.floor(i / 3) * 42} fill={activeEl === key ? "#fff" : el.color} fontSize="10" fontFamily="system-ui">{el.title}</text>
                </g>
              );
            })}
          </svg>
        </DiagramWrapper>
      )}
      {activeEl && installDetails[activeEl] && subTab === "installation" && <DetailPanel color={installDetails[activeEl].color} title={installDetails[activeEl].title} detail={installDetails[activeEl].detail} />}
      {activeEl && mountDetails[activeEl] && subTab === "mounting" && <DetailPanel color={mountDetails[activeEl].color} title={mountDetails[activeEl].title} detail={mountDetails[activeEl].detail} />}
      {activeEl && shutterDetails[activeEl] && subTab === "shutters" && <DetailPanel color={shutterDetails[activeEl].color} title={shutterDetails[activeEl].title} detail={shutterDetails[activeEl].detail} />}
      {subTab === "mistakes_w" && (() => {
        const mistakes = [
          { id: "no_ral", title: "Nem RAL-szabvány szerinti beépítés", color: THEME.accent.red, detail: "RAL beépítés: belül PÁRAZÁRÓ szalag, középen HŐSZIGETELŐ hab, kívül PÁRAÁTERESZTŐ szalag. Enélkül: a hab nedvességet szív → penész a tok körül, hőhíd, fúvás. Sok szerelő 'csak habozza' → 2-3 év múlva penész és fúvás az ablak körül. Ragaszd meg a RAL szalagokat — 1000-2000 Ft/ablak, de 100.000 Ft-os hibát előz meg!" },
          { id: "wrong_position", title: "Rossz beépítési pozíció", color: THEME.accent.amber, detail: "Az ablakot a hőszigetelés síkjába (vagy elé: előtétes) kell beépíteni! Ha a fal belső síkjába kerül → HATALMAS hőhíd a tok körül (páralecsapódás, penész). Előtétes beépítés: konzolokra, a fal elé. Ez a legjobb hővédelmi megoldás, de precíz kivitelezést igényel." },
          { id: "no_sill", title: "Rossz/hiányzó külső párkány", color: THEME.accent.blue, detail: "A külső ablakpárkány (alu vagy kő) lejtéssel kifelé kell álljon (min. 3-5°), és túl kell nyúljon a homlokzaton 3-4 cm-rel. Nélküle: az esővíz a falra folyik → algásodás, vakolat hámlás, beázás. Alatta párkánytömítő szalag. A párkány és a tok közötti hézag: szilikon (NE hab — az nem vízálló)." },
          { id: "thermal_bridge", title: "Hőhíd a tok körül", color: THEME.accent.orange, detail: "A nyílászáró tok és a fal között FOLYAMATOS hőszigetelés kell. Ha a szigetelés nem takarja a tok szélét min. 3-4 cm-re → hőhíd → páralecsapódás a belső oldalon. Előtétes beépítésnél a konzolok hőhíd-elemek — hőhídmentes konzol használata ajánlott (pl. JB-D, Compacfoam)." },
          { id: "no_shade", title: "Árnyékolás hiánya déli ablakoknál", color: THEME.accent.red, detail: "Déli/nyugati nagy üvegfelületek NYÁRON 40-50°C-ra melegednek → a ház belül elviselhetetlenül forró lesz. Megoldás: redőny, napellenző, vagy fix árnyékoló (előtető). 3 réteg üveg g-értéke: 0,5 (g-érték = napenergia-áteresztés 0-1 skálán — mennyi naphő jut be) → a napsugárzás 50%-a átjut! TIPP: a redőnyhöz a motor kábelt MOST húzd be (5×1,5mm²), utólag nehézkes." },
        ];
        return (
          <>
            <DiagramWrapper>
              <svg viewBox="0 0 750 300" style={{ width: "100%" }}>
                <text x="375" y="25" textAnchor="middle" fill={THEME.accent.red} fontSize="14" fontWeight="700">⚠ NYÍLÁSZÁRÓK — GYAKORI HIBÁK</text>
                {mistakes.map((m, i) => (
                  <g key={m.id} onClick={() => setActiveEl(activeEl === m.id ? null : m.id)} style={{ cursor: "pointer" }}>
                    <rect x={20 + (i % 2) * 370} y={50 + Math.floor(i / 2) * 60} width="350" height="50" rx="8" fill={activeEl === m.id ? m.color + "22" : "#111827"} stroke={m.color} strokeWidth={activeEl === m.id ? 2.5 : 1.5} />
                    <text x={35 + (i % 2) * 370} y={72 + Math.floor(i / 2) * 60} fill={m.color} fontSize="11" fontWeight="700">⚠ {m.title}</text>
                    <text x={35 + (i % 2) * 370} y={88 + Math.floor(i / 2) * 60} fill={THEME.text.muted} fontSize="9">[kattints a részletekért]</text>
                  </g>
                ))}
              </svg>
            </DiagramWrapper>
            {activeEl && (() => { const m = mistakes.find(m => m.id === activeEl); return m ? <DetailPanel color={m.color} title={m.title} detail={m.detail} /> : null; })()}
          </>
        );
      })()}
      <ClickHint />
    </div>
  );
}

/* ─── ELECTRICAL ─── */
function ElectricalDiagram() {
  const [subTab, setSubTab] = useState("distribution");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [{ id: "distribution", label: "Elosztás" }, { id: "protection", label: "Védelmek" }, { id: "solar", label: "Napelem előkészítés" }, { id: "mistakes_e", label: "⚠ Gyakori hibák" }];

  const nodes = [
    { id: "utility", x: 30, y: 140, w: 120, h: 60, label: "SZOLGÁLTATÓ", sub: "E.ON / MVM", color: "#f59e0b", icon: "⚡" },
    { id: "meter", x: 200, y: 140, w: 120, h: 60, label: "MÉRŐSZEKRÉNY", sub: "Telekhatáron", color: "#f97316", icon: "📊" },
    { id: "main", x: 370, y: 140, w: 130, h: 60, label: "ELOSZTÓ", sub: "FI + kismegszakítók", color: "#ef4444", icon: "🔌" },
    { id: "light", x: 550, y: 40, w: 130, h: 50, label: "VILÁGÍTÁS", sub: "10A, 1.5mm²", color: "#fbbf24", icon: "💡" },
    { id: "socket", x: 550, y: 110, w: 130, h: 50, label: "KONNEKTOROK", sub: "16A, 2.5mm²", color: "#22c55e", icon: "🔋" },
    { id: "kitchen", x: 550, y: 180, w: 130, h: 50, label: "KONYHA", sub: "32A, 4mm²", color: "#3b82f6", icon: "🍳" },
    { id: "heatpump_e", x: 550, y: 250, w: 130, h: 50, label: "HŐSZIVATTYÚ", sub: "3×16A", color: "#8b5cf6", icon: "❄️" },
    { id: "boiler", x: 550, y: 320, w: 130, h: 50, label: "BOJLER", sub: "16A", color: "#ec4899", icon: "🚿" },
  ];

  const distDetails = {
    utility: { title: "⚡ SZOLGÁLTATÓ", color: "#f59e0b", detail: "3x32A háromfázis = 22 kW. Új házhoz MINDIG háromfázist kérj! Egyfázis = max 7.4 kW → hőszivattyú + főzőlap = nem bírja." },
    meter: { title: "📊 MÉRŐSZEKRÉNY", color: "#f97316", detail: "Telekhatáron. Csatlakozási díj: 200-500.000 Ft, átfutás: 4-12 hét! A mérőtől a házig bekötőkábel (földben, védőcsőben)." },
    main: { title: "🔌 ELOSZTÓ", color: "#ef4444", detail: "FI-relék (min. 2 db!) + kismegszakítók + T2 védelem. Schneider, Hager, ABB márkát kérj! Az OMU/noname megbízhatatlan." },
    light: { title: "💡 VILÁGÍTÁS", color: "#fbbf24", detail: "10A kismegszakító, 1.5mm² kábel. LED-ekkel egy kör több szobára elég." },
    socket: { title: "🔋 KONNEKTOROK", color: "#22c55e", detail: "16A, 2.5mm². Max 8-10 konnektor/kör. USB-s konnektor tervezd be!" },
    kitchen: { title: "🍳 KONYHA", color: "#3b82f6", detail: "Indukciós főzőlap: 7kW = 32A, 4mm² kábel. MINDIG külön kör!" },
    heatpump_e: { title: "❄️ HŐSZIVATTYÚ", color: "#8b5cf6", detail: "Háromfázis (3x16A vagy 3x20A). Külön FI! Kültéri egységhez kábelt ÉPÍTÉS KÖZBEN kell vezetni." },
    boiler: { title: "🚿 BOJLER", color: "#ec4899", detail: "16A külön kör. 2kW = 8.7A folyamatos terhelés." },
  };

  const protDetails = {
    main_sw: { title: "Főkapcsoló (63A)", color: "#f59e0b", detail: "Egyetlen mozdulattal lekapcsolja az egész házat. Tűz vagy áramütés esetén az első! Mindenkinek tudnia kell, hol van." },
    fi_a: { title: "FI-relé Type A (30mA)", color: "#ef4444", detail: "Általános életvédelem. Min. 2 db: világítás+konnektor külön! 30ms alatt leold → életmentő. Ár: 15-25.000 Ft/db." },
    fi_b: { title: "FI-relé Type B", color: "#8b5cf6", detail: "Egyenáramú szivárgáshoz. KÖTELEZŐ: hőszivattyú, EV töltő, napelemes inverter. Drágább (40-80.000 Ft), de nélküle a Type A nem old le!" },
    mcb_light: { title: "MCB B10 (világítás)", color: "#fbbf24", detail: "10A, B karakterisztika (gyors kioldás). 1.5mm² kábelhez." },
    mcb_socket: { title: "MCB B16 (konnektor)", color: "#22c55e", detail: "16A, B karakter. 2.5mm² kábelhez. Max 8-10 konnektor/kör." },
    mcb_heavy: { title: "MCB C32 (főzőlap)", color: "#3b82f6", detail: "32A, C karakter (nagy indítóáram tűrés). Indukciós főzőlaphoz. 4mm² kábel." },
    surge: { title: "T2 túlfeszültség-védelem", color: "#06b6d4", detail: "Villám és hálózati túlfeszültség ellen. 10-20.000 Ft, de egy villám 200.000+ Ft kárt okoz az elektronikában!" },
  };

  const solarDetails = {
    dc_conduit: { title: "DC kábelvezető cső", color: "#f59e0b", detail: "Tetőtől inverterig üres védőcső (min. Ø32mm). ÉPÍTÉS KÖZBEN befalazni! Utólag kívül kell vezetni = csúnya." },
    inverter_loc: { title: "Inverter helye", color: "#3b82f6", detail: "Száraz, hűvös, szellőző (garázs, kazánház). WiFi monitoring (Fronius, Huawei app). Faltól 10cm hely hátul!" },
    ac_conn: { title: "AC csatlakozás", color: "#22c55e", detail: "Inverter kimenete → elosztó. Külön MCB + FI Type B kell! Kábelezés előre tervezett." },
    meter_upg: { title: "Kétirányú mérő", color: "#8b5cf6", detail: "Régi mérő cserélendő kétirányúra. E.ON/MVM cseréli, 4-8 hét! Szaldó elszámolás." },
    roof_prep: { title: "Tetőelőkészítés", color: "#ef4444", detail: "Statika: plusz 15-20 kg/m². Déli tájolás, 30-40° ideális. Cserépkampók építés közben olcsóbbak!" },
    battery_p: { title: "Akkumulátor hely", color: "#14b8a6", detail: "Helyet és kábelt most kiépíteni! 10kWh: 800×500×200mm, 100 kg. Szellőző hely kell. Kábel nélkül utólag 50-100.000 Ft plusz." },
  };

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />
      {subTab === "distribution" && (
        <DiagramWrapper>
          <svg viewBox="0 0 720 400" style={{ width: "100%", height: "auto", display: "block" }}>
            <rect x="20" y="120" width="140" height="90" rx="8" fill="#1e293b" opacity="0.5" />
            <text x="90" y="115" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">TELEKHATÁR</text>
            <rect x="355" y="120" width="160" height="90" rx="8" fill="#1e293b" opacity="0.5" />
            <text x="435" y="115" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">HÁZBAN</text>
            <rect x="535" y="25" width="160" height="360" rx="8" fill="#1e293b" opacity="0.3" />
            <text x="615" y="20" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">ÁRAMKÖRÖK</text>
            <line x1="150" y1="170" x2="200" y2="170" stroke="#f59e0b" strokeWidth="3" />
            <line x1="320" y1="170" x2="370" y2="170" stroke="#f97316" strokeWidth="3" />
            {nodes.filter(n => !["utility", "meter", "main"].includes(n.id)).map((n) => (
              <line key={n.id} x1="500" y1="170" x2="550" y2={n.y + n.h / 2} stroke={n.color} strokeWidth="2" opacity="0.5" />
            ))}
            <line x1="155" y1="160" x2="195" y2="160" stroke="#ef4444" strokeWidth="2" />
            <line x1="155" y1="170" x2="195" y2="170" stroke="#fbbf24" strokeWidth="2" />
            <line x1="155" y1="180" x2="195" y2="180" stroke="#3b82f6" strokeWidth="2" />
            <text x="175" y="195" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="middle">3 fázis</text>
            {nodes.map((n) => (
              <g key={n.id} onClick={() => setActiveEl(activeEl === n.id ? null : n.id)} style={{ cursor: "pointer" }}>
                <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={8} fill={activeEl === n.id ? n.color : "#1e293b"} stroke={n.color} strokeWidth={activeEl === n.id ? 2.5 : 1.5} />
                <text x={n.x + 10} y={n.y + 20} fill="white" fontSize="10" fontWeight="bold" fontFamily="system-ui">{n.icon} {n.label}</text>
                <text x={n.x + 10} y={n.y + 36} fill="#94a3b8" fontSize="8" fontFamily="monospace">{n.sub}</text>
              </g>
            ))}
            <rect x="370" y="210" width="150" height="40" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
            <text x="385" y="228" fill="#fca5a5" fontSize="9" fontWeight="bold" fontFamily="monospace">FI-relé: 30ms leoldás</text>
            <text x="385" y="242" fill="#94a3b8" fontSize="8" fontFamily="monospace">Min. 2 db + T2 védelem!</text>
            <rect x="30" y="280" width="300" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
            <text x="50" y="305" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">⚡ SZÁMOLÁS:</text>
            <text x="50" y="325" fill="#94a3b8" fontSize="9" fontFamily="monospace">1 fázis: 230V × 32A = 7.4 kW</text>
            <text x="50" y="345" fill="#94a3b8" fontSize="9" fontFamily="monospace">3 fázis: 3 × 7.4 kW = 22 kW</text>
            <text x="50" y="360" fill="#4ade80" fontSize="9" fontFamily="monospace">Új háznál 3 fázis KELL!</text>
          </svg>
        </DiagramWrapper>
      )}
      {subTab === "protection" && (
        <DiagramWrapper>
          <svg viewBox="0 0 750 320" style={{ width: "100%", height: "auto", display: "block" }}>
            <text x="375" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">DIN SÍNRE SZERELT VÉDELMEK</text>
            <rect x="20" y="130" width="710" height="8" rx="2" fill="#475569" />
            {Object.keys(protDetails).map((key, i) => {
              const el = protDetails[key];
              const x = 25 + i * 100;
              return (
                <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                  <rect x={x} y={50} width={90} height={80} rx={6} fill={activeEl === key ? el.color : "#1e293b"} stroke={el.color} strokeWidth={activeEl === key ? 2.5 : 1.5} />
                  <text x={x + 45} y={80} fill={activeEl === key ? "#fff" : "#f1f5f9"} fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">{el.title.split('(')[0].trim()}</text>
                  <text x={x + 45} y={100} fill={activeEl === key ? "#fff" : el.color} fontSize="7" fontFamily="monospace" textAnchor="middle">{el.title.match(/\(([^)]+)\)/)?.[1] || ""}</text>
                  {i < Object.keys(protDetails).length - 1 && <text x={x + 95} y={90} fill="#475569" fontSize="14">→</text>}
                </g>
              );
            })}
            <rect x="20" y="160" width="710" height="50" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
            <text x="40" y="182" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="system-ui">Minőségi márkák: Schneider, Hager, ABB, Legrand</text>
            <text x="40" y="200" fill="#94a3b8" fontSize="9" fontFamily="monospace">Az OMU/noname 50-120.000 Ft-tal olcsóbb, de lassabban old és megbízhatatlan.</text>
          </svg>
        </DiagramWrapper>
      )}
      {subTab === "solar" && (
        <DiagramWrapper>
          <svg viewBox="0 0 750 380" style={{ width: "100%", height: "auto", display: "block" }}>
            <text x="375" y="25" fill="#f59e0b" fontSize="12" fontFamily="monospace" textAnchor="middle">NAPELEMES RENDSZER ELŐKÉSZÍTÉS</text>
            {Object.keys(solarDetails).map((key, i) => {
              const el = solarDetails[key];
              const x = 20 + (i % 3) * 240;
              const y = 50 + Math.floor(i / 3) * 140;
              return (
                <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                  <rect x={x} y={y} width={225} height={120} rx={10} fill={activeEl === key ? el.color : "#1e293b"} stroke={el.color} strokeWidth={activeEl === key ? 2.5 : 1} />
                  <text x={x + 15} y={y + 30} fill={activeEl === key ? "#fff" : "#f1f5f9"} fontSize="11" fontWeight="bold" fontFamily="system-ui">{el.title}</text>
                  <text x={x + 15} y={y + 55} fill={activeEl === key ? "#fff" : "#94a3b8"} fontSize="9" fontFamily="monospace">{el.detail.substring(0, 40)}...</text>
                  {i < 5 && i % 3 < 2 && <text x={x + 230} y={y + 60} fill="#475569" fontSize="16">→</text>}
                </g>
              );
            })}
          </svg>
        </DiagramWrapper>
      )}
      {subTab === "distribution" && activeEl && distDetails[activeEl] && <DetailPanel color={distDetails[activeEl].color} title={distDetails[activeEl].title} detail={distDetails[activeEl].detail} />}
      {subTab === "protection" && activeEl && protDetails[activeEl] && <DetailPanel color={protDetails[activeEl].color} title={protDetails[activeEl].title} detail={protDetails[activeEl].detail} />}
      {subTab === "solar" && activeEl && solarDetails[activeEl] && <DetailPanel color={solarDetails[activeEl].color} title={solarDetails[activeEl].title} detail={solarDetails[activeEl].detail} />}
      {subTab === "mistakes_e" && (() => {
        const mistakes = [
          { id: "few_sockets", title: "Kevés konnektor", color: THEME.accent.red, detail: "A LEGGYAKORIBB panasz a beköltözés után! Minimum szobánként: Háló: 6-8 konnektor. Nappali: 10-14. Konyha: 8-10 (munkalap felett 4-6!). Fürdő: 2-3 (IPX4 védett). Garázs: 4-6. TIPP: inkább 20%-kal több legyen — egy konnektor ára: 3-5k Ft, utólag bontani a falat: 20-50k Ft. Hosszabbító = tűzveszély + ronda." },
          { id: "no_rcd", title: "Hiányzó/rossz FI-relé (RCD)", color: THEME.accent.red, detail: "Az FI-relé (áram-védőkapcsoló) ÉLETMENTŐ — áramütésnél 30 ms alatt lekapcsol! Fürdőben, konyhában, kültéren KÖTELEZŐ 30mA FI. Típusok: AC (alap), A (ajánlott — pulzáló egyenáramot is érzékeli), B (inverterhez — napelem, EV töltő). Gyakori hiba: egy FI az egész házra → kiold, minden lekapcsol. MINIMUM: 3-4 FI kör külön." },
          { id: "undersized", title: "Alulméretezett kábel", color: THEME.accent.amber, detail: "Villanyszerelők 'spórolnak' a kábelvastagságon: 1,5mm² konnektor körre (ahol 2,5mm² kellene), 2,5mm² főtőkörre (ahol 4mm² kellene). Konnektor: min. 2,5mm². Főzőlap: 5×4mm² vagy 5×6mm². Hőszivattyú: 5×4mm². Az alulméretezett kábel MELEGSZIK → tűzveszély! Az elosztó tervet VILLAMOS TERVEZŐ készítse, NE a szerelő fejéből." },
          { id: "no_conduit", title: "Üres védőcsövek hiánya", color: THEME.accent.blue, detail: "MOST szinte semmibe kerül egy extra Ø25mm védőcsövet behúzni → UTÓLAG kábelt cserélni, bővíteni pótolhatatlan lehetőség. Minden szobába: 1-2 üres cső a patch panelhez. Tetőhöz: kamera, antenna. Garázsba: EV töltő előkészítés (5×6mm² vagy 5×10mm² cső — utólag 10x drágább). Kertbe: kültéri konnektor, világítás." },
          { id: "no_surge", title: "Túlfeszültség-védelem hiánya", color: THEME.accent.orange, detail: "Villámcsapás vagy hálózati tüske pillanatok alatt tönkreteszi a hőszivattyút, invertert, smart home eszközöket. T1+T2 kombinált túlfeszültség-levezető: 30-80k Ft. Nélküle: egy villám → 500k-2M Ft kár. A fő elosztóba, a napelem invertere elé, és a hőszivattyú előtti alkörbe." },
        ];
        return (
          <>
            <DiagramWrapper>
              <svg viewBox="0 0 750 300" style={{ width: "100%" }}>
                <text x="375" y="25" textAnchor="middle" fill={THEME.accent.red} fontSize="14" fontWeight="700">⚠ ELEKTROMOS RENDSZER — GYAKORI HIBÁK</text>
                {mistakes.map((m, i) => (
                  <g key={m.id} onClick={() => setActiveEl(activeEl === m.id ? null : m.id)} style={{ cursor: "pointer" }}>
                    <rect x={20 + (i % 2) * 370} y={50 + Math.floor(i / 2) * 60} width="350" height="50" rx="8" fill={activeEl === m.id ? m.color + "22" : "#111827"} stroke={m.color} strokeWidth={activeEl === m.id ? 2.5 : 1.5} />
                    <text x={35 + (i % 2) * 370} y={72 + Math.floor(i / 2) * 60} fill={m.color} fontSize="11" fontWeight="700">⚠ {m.title}</text>
                    <text x={35 + (i % 2) * 370} y={88 + Math.floor(i / 2) * 60} fill={THEME.text.muted} fontSize="9">[kattints a részletekért]</text>
                  </g>
                ))}
              </svg>
            </DiagramWrapper>
            {activeEl && (() => { const m = mistakes.find(m => m.id === activeEl); return m ? <DetailPanel color={m.color} title={m.title} detail={m.detail} /> : null; })()}
          </>
        );
      })()}
      <PhotoSection searchQuery="villanyszerelés falhorony elektromos vezeték" images={[
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Electrical_wiring_installation.jpg/320px-Electrical_wiring_installation.jpg", alt: "Villanyszerelés", caption: "Elektromos vezetékek a falhoronyban" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Electrical_panel.jpg/320px-Electrical_panel.jpg", alt: "Elosztó", caption: "Lakáselosztó (biztosítéktábla)" }
      ]} />
      <ClickHint />
    </div>
  );
}

/* ─── FLOOR SLAB ─── */
function FloorSlabDiagram() {
  const [subTab, setSubTab] = useState("filler");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [{ id: "filler", label: "Béléstestes" }, { id: "monolithic", label: "Monolit" }, { id: "prefab", label: "Előregyártott" }];

  const fillerDetails = {
    filler_block: { title: "Bélestest", color: "#f59e0b", detail: "EPS (hungarocell, könnyű) vagy kerámia (nehezebb, jobb hang). 50-60 cm széles, 16-25 cm magas a fesztáv szerint." },
    concrete_rib: { title: "Betonborda", color: "#6b7280", detail: "A béléstest sorok közti beton, vasalással. A teherhordó rész! Alsó vas húzásra, felső nyomásra dolgozik." },
    topping: { title: "Kiegészítő beton (min. 5cm)", color: "#94a3b8", detail: "C25/30 beton a béléstestek felett, felső vasháló (Ø6/15x15). Ez fogja össze a födémet egyetlen lemezzé!" },
    propping: { title: "Dúcolás", color: "#8b5cf6", detail: "Ideiglenes alátámasztás betonozás alatt. 2-3 hétig bent marad, amíg a beton eléri a 70%-os szilárdságot!" },
    rib_rebar: { title: "Vasalás", color: "#ef4444", detail: "Alsó Ø12-16mm a bordákban, felső háló Ø6/15x15. Koszorúvas a széleknél! A tervet STATIKUS készíti." },
  };

  const monoDetails = {
    formwork: { title: "Zsaluzat", color: "#f59e0b", detail: "Fa vagy fém zsaluzat az egész födém alatt. Bérlés: 1500-3000 Ft/m²/hó. Legjobb minőségű födém!" },
    lower_rebar: { title: "Alsó vasháló", color: "#ef4444", detail: "Ø10-12/15x15 cm. Húzási zóna (alul). Betonfedés min. 2.5 cm!" },
    upper_rebar: { title: "Felső vasháló", color: "#f97316", detail: "Ø8-10/15x15 cm. Nyomási zóna és negatív nyomaték. Felkötővas tartja magasságban!" },
    concrete_f: { title: "C25/30 beton", color: "#6b7280", detail: "FOLYAMATOS betonozás kell — munkahézag nélkül! Szállítmánybeton + pumpa a legbiztosabb." },
    thickness_f: { title: "Vastagság", color: "#3b82f6", detail: "15-25 cm a fesztáv szerint. Hüvelykszabály: fesztáv/30 = min vastagság. 6m → min 20 cm." },
  };

  const prefabDetails = {
    beam: { title: "Feszített gerenda", color: "#f59e0b", detail: "Gyárilag előfeszített, nagy teherbírás. 12-25 cm magas, 60 cm béléstest-osztással." },
    prefab_fill: { title: "Béléstest", color: "#94a3b8", detail: "Gerendák közé kerül, nem teherhordó, csak kitöltő. EPS vagy kerámia." },
    prefab_top: { title: "Kiegészítő beton", color: "#6b7280", detail: "Min. 4-5 cm C25/30 vashálóval. Összeköti a gerendákat egyetlen lemezzé." },
    crane: { title: "Daruzás", color: "#8b5cf6", detail: "Gerendákat daruval emelik be. Daruhozzáférés kell! Előre egyeztetni a szállítóval." },
    cost_f: { title: "Költség összehasonlítás", color: "#22c55e", detail: "Előregyártott: 12-18k Ft/m² (legolcsóbb!). Béléstestes: 15-22k Ft/m². Monolit: 20-30k Ft/m² (legdrágább, legrugalmasabb)." },
  };

  const allDetails = subTab === "filler" ? fillerDetails : subTab === "monolithic" ? monoDetails : prefabDetails;

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />
      <DiagramWrapper>
        <svg viewBox="0 0 700 350" style={{ width: "100%", height: "auto", display: "block" }}>
          {subTab === "filler" && (<g>
            <text x="350" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">KÖZTETIŐS FÖDÉM METSZET</text>
            {/* Topping */}
            <rect x="50" y="60" width="600" height="30" rx="2" fill="#9ca3af" opacity="0.7" />
            <text x="350" y="80" fill="#1e293b" fontSize="10" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">Kiegészítő beton (min. 5cm) + vasháló</text>
            {/* Filler blocks and ribs */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const x = 70 + i * 100;
              return (
                <g key={i}>
                  <rect x={x} y={90} width={70} height={60} rx="3" fill="#f59e0b" opacity="0.6" stroke="#d97706" strokeWidth="1" />
                  <text x={x + 35} y={125} fill="#92400e" fontSize="8" fontFamily="monospace" textAnchor="middle">bélestest</text>
                  {i < 5 && <rect x={x + 70} y={90} width={30} height={60} rx="1" fill="#6b7280" opacity="0.8" />}
                </g>
              );
            })}
            {/* Rebar dots */}
            {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={155 + i * 100} cy={140} r={3} fill="#ef4444" stroke="#fca5a5" strokeWidth="1" />)}
            {/* Propping */}
            {[150, 350, 550].map((x, i) => (
              <g key={i}><line x1={x} y1={150} x2={x} y2={220} stroke="#8b5cf6" strokeWidth="3" /><line x1={x - 15} y1={220} x2={x + 15} y2={220} stroke="#8b5cf6" strokeWidth="3" /></g>
            ))}
            <text x="350" y="250" fill="#8b5cf6" fontSize="9" fontFamily="monospace" textAnchor="middle">↑ dúcolás (ideiglenes alátámasztás)</text>
          </g>)}
          {subTab === "monolithic" && (<g>
            <text x="350" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">MONOLIT VASBETON FÖDÉM</text>
            <rect x="50" y="80" width="600" height="80" rx="3" fill="#6b7280" opacity="0.7" />
            <text x="350" y="125" fill="#f1f5f9" fontSize="11" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">C25/30 vasbeton lemez (15-25 cm)</text>
            {/* Rebar */}
            {[100, 150, 200, 250, 300, 350, 400, 450, 500, 550].map((x, i) => (
              <g key={i}><circle cx={x} cy={90} r={3} fill="#ef4444" /><circle cx={x} cy={150} r={3} fill="#f97316" /></g>
            ))}
            <text x="580" y="93" fill="#ef4444" fontSize="8" fontFamily="monospace">alsó vas</text>
            <text x="580" y="153" fill="#f97316" fontSize="8" fontFamily="monospace">felső vas</text>
            {/* Formwork */}
            <rect x="50" y="160" width="600" height="10" rx="1" fill="#d97706" opacity="0.5" />
            <text x="350" y="190" fill="#f59e0b" fontSize="9" fontFamily="monospace" textAnchor="middle">zsaluzat (ideiglenesen)</text>
            {[150, 350, 550].map((x, i) => (
              <line key={i} x1={x} y1={170} x2={x} y2={230} stroke="#d97706" strokeWidth="2" />
            ))}
          </g>)}
          {subTab === "prefab" && (<g>
            <text x="350" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">ELŐREGYÁRTOTT FÖDÉM</text>
            <rect x="50" y="60" width="600" height="25" rx="2" fill="#9ca3af" opacity="0.6" />
            <text x="350" y="78" fill="#1e293b" fontSize="9" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">Kiegészítő beton + vasháló</text>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const x = 60 + i * 100;
              return (
                <g key={i}>
                  <rect x={x + 5} y={85} width={60} height={50} rx="2" fill="#f59e0b" opacity="0.4" stroke="#d97706" strokeWidth="1" />
                  {i < 5 && <rect x={x + 65} y={90} width={40} height={45} rx="1" fill="#8b5cf6" opacity="0.6" />}
                </g>
              );
            })}
            <text x="350" y="160" fill="#8b5cf6" fontSize="9" fontFamily="monospace" textAnchor="middle">↑ feszített gerendák + béléstestek</text>
            <text x="600" y="180" fill="#64748b" fontSize="20">🏗️</text>
            <text x="600" y="200" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">daru</text>
          </g>)}
          {/* Clickable element buttons */}
          {Object.keys(allDetails).map((key, i) => {
            const el = allDetails[key];
            const x = 20 + (i % 3) * 225;
            const y = 270 + Math.floor(i / 3) * 38;
            return (
              <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                <rect x={x} y={y} width={215} height={32} rx={6} fill={activeEl === key ? el.color : "#1e293b"} stroke={el.color} strokeWidth={activeEl === key ? 2 : 1} />
                <text x={x + 10} y={y + 21} fill={activeEl === key ? "#fff" : el.color} fontSize="10" fontFamily="system-ui">{el.title}</text>
              </g>
            );
          })}
        </svg>
      </DiagramWrapper>
      <PhotoSection searchQuery="födém zsaluzás vasszerelés" images={[
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Deckenschalung.jpg/320px-Deckenschalung.jpg", alt: "Födém", caption: "Monolit födém zsaluzás és vasalás" }
      ]} />
      {activeEl && allDetails[activeEl] && <DetailPanel color={allDetails[activeEl].color} title={allDetails[activeEl].title} detail={allDetails[activeEl].detail} />}
      <ClickHint />
    </div>
  );
}

/* ─── VENTILATION ─── */
function VentilationDiagram() {
  const [subTab, setSubTab] = useState("hrv");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [{ id: "hrv", label: "Hővisszanyerés" }, { id: "vapor", label: "Párazárás" }, { id: "dewpoint", label: "Harmatpont" }];

  const hrvDetails = {
    hrv_unit: { title: "Hővisszanyerő (HRV)", color: "#3b82f6", detail: "A kimenő meleg levegő hőjét átadja a bejövőnek. 80-95% hatásfok! Márkák: Zehnder, Helios, Vents. Ár: 400-1200.000 Ft." },
    supply: { title: "Friss levegő (befúvás)", color: "#22c55e", detail: "Szobákba (nappali, háló, dolgozó) jut a szűrt, előmelegített levegő. Mennyezeten vagy fal felső részén." },
    extract: { title: "Elszívás", color: "#ef4444", detail: "Nedves helyekből (konyha, fürdő, WC) szívja el a párás levegőt." },
    ducting: { title: "Légcsatorna", color: "#f59e0b", detail: "Merev Ø125-160mm JOBB mint flexibilis (kisebb ellenállás, csendesebb, tisztítható)!" },
    filters: { title: "Szűrők (F7+G4)", color: "#8b5cf6", detail: "Befúvásnál F7 (pollen, por), elszívásnál G4. 3-6 havonta csere! Évi 15-30k Ft." },
    why_need: { title: "Miért kell?", color: "#06b6d4", detail: "Légzáró házban nincs természetes légcsere → CO2, pára → penész! Szellőztető nélkül az energiahatékony ház egészségtelen." },
    bypass: { title: "Nyári bypass", color: "#14b8a6", detail: "Ha kinn hűvösebb: kikerüli a hőcserélőt, közvetlenül hűt. Automatikus hőmérséklet-érzékelővel." },
    co2: { title: "CO2 érzékelő", color: "#f97316", detail: "Fordulatszám CO2 szint szerint. 800 ppm = rendben. 1000+ = fokozni. Smart: telefonról figyelhető." },
  };

  const vaporDetails = {
    barrier_t: { title: "Párazáró fólia típusok", color: "#ef4444", detail: "PE fólia (Sd>100m, olcsó), alumínium kasírozott (Sd>1500m, legjobb), smart membrán (változó Sd). Magasabb Sd = jobban zár. A ragasztás a kulcs!" },
    smart_m: { title: "Okos párazáró membrán", color: "#8b5cf6", detail: "Pl. Isover Vario: télen zárt (Sd=10m+), nyáron nyitott (Sd=0.3m). Sd = páradiffúziós ellenállás méterben — mekkora légrétegnek felel meg. Magasabb Sd = jobban zár. Kiengedi a nyári visszaszáradást." },
    tape_seal: { title: "Ragasztás MINDEN átvezetésnél", color: "#f59e0b", detail: "Kábel, cső, ablak: speciális ragasztó (SIGA, proclima). Szigetelőszalag NEM jó! A légzáróság 80%-a a ragasztáson múlik." },
    blower: { title: "Blower-door teszt", color: "#3b82f6", detail: "Nyomáspróba: n50 < 1.5 = jó, n50 < 0.6 = passzívház (alacsonyabb = légzáróbb). Ár: 60-120k Ft. Félkész állapotban érdemes (javítható)!" },
    condensation: { title: "Páralecsapódás veszélye", color: "#ef4444", detail: "Meleg párás levegő + hideg felület = víz. A fal BELSEJÉBEN ez katasztrófa → penész, rothadás, szerkezeti kár." },
    breathable: { title: "Páraáteresztő külső membrán", color: "#22c55e", detail: "KÜLSŐ oldalon: kiengedi a párát, nem engedi be az esőt. Sd=0.02-0.3m (alacsony Sd = jól átengedi a párát)." },
  };

  const dewDetails = {
    temp_grad: { title: "Hőmérséklet-gradiens", color: "#3b82f6", detail: "A fal belsejében a hő fokozatosan csökken. Jó szigetelés: meredek esés a SZIGETELÉSBEN (nem a falban) → a fal meleg marad." },
    dew_line: { title: "Harmatpont vonal", color: "#ef4444", detail: "20°C, 50% pára → harmatpont ~9-10°C. Ha a fal belsejében ennél hidegebb van → páralecsapódás a SZERKEZETBEN." },
    safe: { title: "Biztonságos kialakítás", color: "#22c55e", detail: "Szigetelés KÍVÜL → harmatpont a szigetelésben, nem a falban → nincs szerkezeti kár. KÜLSŐ szigetelés a helyes!" },
    danger: { title: "Veszélyes kialakítás", color: "#f59e0b", detail: "Belső szigetelés: harmatpont a falban → páralecsapódás → penész, kár. Belső szigetelés CSAK párazáró réteggel együtt!" },
  };

  const allDetails = subTab === "hrv" ? hrvDetails : subTab === "vapor" ? vaporDetails : dewDetails;

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />
      <DiagramWrapper>
        <svg viewBox="0 0 750 400" style={{ width: "100%", height: "auto", display: "block" }}>
          {subTab === "hrv" && (<g>
            <text x="375" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">HŐVISSZANYERŐS SZELLŐZÉS (HRV)</text>
            {/* HRV unit center */}
            <rect x="290" y="100" width="170" height="100" rx="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x="375" y="140" fill="#3b82f6" fontSize="12" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">HRV EGYSÉG</text>
            <text x="375" y="160" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">80-95% hővisszanyerés</text>
            <text x="375" y="175" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">Zehnder/Helios/Vents</text>
            {/* Supply air path (blue/green) */}
            <rect x="30" y="90" width="100" height="40" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="1" />
            <text x="80" y="115" fill="#22c55e" fontSize="9" fontFamily="monospace" textAnchor="middle">Kültéri levegő</text>
            <line x1="130" y1="110" x2="290" y2="130" stroke="#22c55e" strokeWidth="2" markerEnd="url(#vent-arr)" />
            <rect x="590" y="80" width="130" height="35" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="1" />
            <text x="655" y="102" fill="#22c55e" fontSize="9" fontFamily="monospace" textAnchor="middle">Nappali, Háló</text>
            <line x1="460" y1="130" x2="590" y2="97" stroke="#22c55e" strokeWidth="2" />
            {/* Extract air path (red) */}
            <rect x="590" y="170" width="130" height="35" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
            <text x="655" y="192" fill="#ef4444" fontSize="9" fontFamily="monospace" textAnchor="middle">Konyha, Fürdő</text>
            <line x1="590" y1="187" x2="460" y2="165" stroke="#ef4444" strokeWidth="2" />
            <rect x="30" y="160" width="100" height="40" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
            <text x="80" y="185" fill="#ef4444" fontSize="9" fontFamily="monospace" textAnchor="middle">Kifúvás</text>
            <line x1="290" y1="170" x2="130" y2="180" stroke="#ef4444" strokeWidth="2" />
            {/* Heat exchange arrows */}
            <text x="375" y="195" fill="#f59e0b" fontSize="10" fontFamily="monospace" textAnchor="middle">⇄ hőcsere</text>
          </g>)}
          {subTab === "vapor" && (<g>
            <text x="375" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">PÁRAZÁRÁS ELVE — belülről kifelé</text>
            <text x="80" y="180" fill="#64748b" fontSize="10" fontFamily="monospace">BELSŐ</text>
            <text x="650" y="180" fill="#64748b" fontSize="10" fontFamily="monospace">KÜLSŐ</text>
            {/* Layers left to right */}
            <rect x="130" y="80" width="60" height="200" rx="3" fill="#e2e8f0" opacity="0.5" />
            <text x="160" y="185" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,160,185)">gipszkarton</text>
            <rect x="195" y="80" width="15" height="200" rx="2" fill="#ef4444" opacity="0.8" />
            <text x="202" y="185" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,202,185)">PÁRAZÁRÓ</text>
            <rect x="220" y="80" width="150" height="200" rx="3" fill="#fbbf24" opacity="0.3" />
            <text x="295" y="185" fill="#d97706" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,295,185)">Hőszigetelés</text>
            <rect x="380" y="80" width="15" height="200" rx="2" fill="#22c55e" opacity="0.8" />
            <text x="387" y="185" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,387,185)">ÁTERESZTŐ</text>
            <rect x="405" y="80" width="80" height="200" rx="3" fill="#c2410c" opacity="0.3" />
            {/* Moisture arrows */}
            <text x="160" y="70" fill="#3b82f6" fontSize="14">💧→</text>
            <text x="200" y="70" fill="#ef4444" fontSize="14">✋</text>
            <text x="360" y="70" fill="#22c55e" fontSize="10">💧→ OK</text>
          </g>)}
          {subTab === "dewpoint" && (<g>
            <text x="375" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">HARMATPONT GRAFIKON</text>
            {/* Axes */}
            <line x1="100" y1="50" x2="100" y2="280" stroke="#64748b" strokeWidth="1" />
            <line x1="100" y1="280" x2="650" y2="280" stroke="#64748b" strokeWidth="1" />
            <text x="60" y="55" fill="#64748b" fontSize="9" fontFamily="monospace">°C</text>
            <text x="375" y="300" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">belső → → → fal → → → szigetelés → → → külső</text>
            {/* Temp gradient line (blue) - drops steeply in insulation */}
            <polyline points="120,80 250,90 300,95 400,200 550,250 630,260" fill="none" stroke="#3b82f6" strokeWidth="3" />
            <text x="135" y="75" fill="#3b82f6" fontSize="9" fontFamily="monospace">20°C</text>
            <text x="635" y="255" fill="#3b82f6" fontSize="9" fontFamily="monospace">-10°C</text>
            {/* Dew point line (red dashed) - relatively flat */}
            <line x1="120" y1="165" x2="630" y2="175" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,4" />
            <text x="640" y="178" fill="#ef4444" fontSize="9" fontFamily="monospace">~10°C harmatpont</text>
            {/* Danger zone where blue goes below red */}
            <rect x="420" y="175" width="200" height="80" rx="4" fill="#ef4444" opacity="0.1" />
            <text x="520" y="230" fill="#ef4444" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">PÁRALECSAPÓDÁS</text>
            {/* Wall/insulation zones */}
            <rect x="250" y="45" width="100" height="240" fill="#c2410c" opacity="0.1" />
            <text x="300" y="42" fill="#c2410c" fontSize="8" fontFamily="monospace" textAnchor="middle">fal</text>
            <rect x="350" y="45" width="200" height="240" fill="#fbbf24" opacity="0.1" />
            <text x="450" y="42" fill="#d97706" fontSize="8" fontFamily="monospace" textAnchor="middle">szigetelés</text>
          </g>)}
          {/* Element buttons */}
          {Object.keys(allDetails).map((key, i) => {
            const el = allDetails[key];
            const cols = Object.keys(allDetails).length <= 4 ? 2 : 4;
            const x = 20 + (i % cols) * (700 / cols);
            const y = 320 + Math.floor(i / cols) * 35;
            const w = (700 / cols) - 10;
            return (
              <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                <rect x={x} y={y} width={w} height={28} rx={6} fill={activeEl === key ? el.color : "#1e293b"} stroke={el.color} strokeWidth={activeEl === key ? 2 : 1} />
                <text x={x + 8} y={y + 19} fill={activeEl === key ? "#fff" : el.color} fontSize="9" fontFamily="system-ui">{el.title}</text>
              </g>
            );
          })}
        </svg>
      </DiagramWrapper>
      <PhotoSection searchQuery="hővisszanyerős szellőzés HRV" images={[
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Vmc-double-flux.jpg/320px-Vmc-double-flux.jpg", alt: "HRV", caption: "Hővisszanyerős szellőztető (HRV) egység" }
      ]} />
      {activeEl && allDetails[activeEl] && <DetailPanel color={allDetails[activeEl].color} title={allDetails[activeEl].title} detail={allDetails[activeEl].detail} />}
      <ClickHint />
    </div>
  );
}

/* ─── SMART HOME ─── */
function SmartHomeDiagram() {
  const [subTab, setSubTab] = useState("infrastructure");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [{ id: "infrastructure", label: "Infrastruktúra" }, { id: "solar", label: "Napelem rendszer" }, { id: "protocols", label: "KNX vs WiFi vs Zigbee" }];

  const infraDetails = {
    patch: { title: "Patch panel / rack", color: "#3b82f6", detail: "A ház 'digitális központja'. Minden UTP kábel ide fut. Hely: kazánház, garázs, szekrényben. Min. 19\" 6U rack." },
    utp: { title: "UTP Cat6 kábel", color: "#22c55e", detail: "Minden szobába min. 2 db, konyhába 2, nappali 3-4. ÉPÍTÉS KÖZBEN húzni! Utólag: drága és csúnya." },
    conduit: { title: "Üres védőcsövek", color: "#f59e0b", detail: "Ø25-32mm patch paneltől mindenhova. Nem kerül semmibe, de UTÓLAG PÓTOLHATATLAN! Tetőhöz is (kamera, antenna)." },
    wifi: { title: "WiFi AP (mennyezeti)", color: "#8b5cf6", detail: "UniFi vagy hasonló profi AP, PoE (kábelen megy áram). 1 db/70-100 m² → háztartási routernél SOKKAL jobb." },
    backbox: { title: "Mély kötődoboz (60mm)", color: "#ef4444", detail: "MINDEN kapcsolónál mély dobozt kérj! Smart switch-ek nem férnek a 40mm-esbe. Többlet: 100-200 Ft/db." },
    doorbell: { title: "Videó kaputelefon", color: "#06b6d4", detail: "UTP + védőcső a bejárathoz. PoE vagy 12V táplálás. Csengő hely: nappali + háló." },
    shutter_m: { title: "Redőnymotor kábel", color: "#14b8a6", detail: "Minden ablakhoz 3x1.5mm² (vagy 5x1.5mm² Smart-hoz). Shelly/Sonoff relé utólag beépíthető." },
    plan_tip: { title: "Tervezési tipp", color: "#f59e0b", detail: "Most OLCSÓ, utólag DRÁGA. Összköltség: 150-300k Ft → évi 50-100k megtakarítás smart megoldásokkal. Minden ablak: redőnykábel+UTP. Szobánként: 2x UTP + üres cső." },
  };

  const solarDetails = {
    panels: { title: "Napelemek", color: "#f59e0b", detail: "Monokristályos PERC, 400-450 Wp/panel. 10 kWp = 22-24 panel ≈ 40 m² tető. Déli, 30-40° ideális." },
    dc_cable: { title: "DC kábel", color: "#ef4444", detail: "UV-álló napelem kábel (4-6mm²). Védőcsőben, ÉPÍTÉS KÖZBEN a legszebb!" },
    inverter: { title: "Inverter", color: "#3b82f6", detail: "String (Fronius, Huawei, GoodWe) vagy mikroinverter (panelenként). String olcsóbb, mikro jobb árnyéknál." },
    battery: { title: "Akkumulátor", color: "#22c55e", detail: "LiFePO4, 5-15 kWh. Helyet és kábelt MOST készítsd elő! 800×500×200mm, 100 kg. Szellőző hely kell." },
    distrib: { title: "Elosztó csatlakozás", color: "#8b5cf6", detail: "Inverter kimenet → elosztószekrény. Külön MCB + FI Type B!" },
    meter_s: { title: "Kétirányú mérő", color: "#f97316", detail: "Szaldó elszámolás. Szolgáltatóval egyeztetni, 4-12 hét!" },
    roi: { title: "Megtérülés", color: "#14b8a6", detail: "10 kWp: 3-5M Ft. Évi megtakarítás: 400-700k Ft. Megtérülés: 5-8 év. Élettartam: 25-30 év. A legjobb befektetés!" },
  };

  const protocolDetails = {
    knx: { title: "KNX (vezetékes)", color: "#3b82f6", detail: "Ipari szabvány, VEZETÉKES rendszer (zöld KNX kábel). Előny: 100% megbízható, nincs interferencia, 20+ év élettartam, gyártófüggetlen (200+ gyártó). Hátrány: DRÁGA (rendszer: 1-5M Ft), tervezést és programozást igényel (KNX technikus: 100-300k Ft), a kábelezést ÉPÍTÉS KÖZBEN kell megcsinálni. Ajánlott: igényes, értékes ingatlannál, ahol a megbízhatóság kritikus." },
    wifi: { title: "WiFi alapú (Shelly, Sonoff)", color: "#22c55e", detail: "A legegyszerűbb és legolcsóbb belépő. Előny: olcsó (Shelly relé: 5-10k Ft/db), bárki telepítheti, UTÓLAG is beépíthető, app-ból vezérelhető. Hátrány: WiFi router függő (ha leáll a router, leáll a smart home), 30+ eszköznél lassulhat a WiFi, felhőfüggő lehet (bár Shelly lokálisan is működik). Ajánlott: egyszerű igényekhez (világítás, redőny, fűtés), bővítgetéshez." },
    zigbee: { title: "Zigbee / Z-Wave (mesh)", color: "#8b5cf6", detail: "Alacsony fogyasztású mesh hálózat (minden eszköz továbbítja a jelet). Hub kell: Philips Hue, IKEA Dirigera, vagy univerzális (Home Assistant + Zigbee stick). Előny: alacsony fogyasztás (elemes érzékelők 2-3 évet bírnak), mesh = nagy lefedettség, 100+ eszköz egy hálózaton. Hátrány: hub-függő, néha kompatibilitási gondok márkák között. Ajánlott: érzékelőkhöz (mozgás, ajtó, hőmérséklet), világításhoz." },
    homeassistant: { title: "Home Assistant (központi vezérlés)", color: "#f59e0b", detail: "Nyílt forráskódú, LOKÁLIS smart home szerver. Raspberry Pi-n vagy mini PC-n fut. MINDEN protokollt összefog: KNX + WiFi + Zigbee + Z-Wave egyszerre. Előny: nincs felhőfüggőség, teljes kontroll, automatizációk (ha X → akkor Y). Hátrány: technikai tudás kell a beállításhoz. TIPP: készíts elő egy RJ45 csatlakozást és egy konnektort a patch panel mellé — ide kerül a szerver." },
    cable_plan: { title: "Kábelezési terv szobánként", color: "#14b8a6", detail: "MINDEN szobába: min. 2x Cat6 UTP + 1x üres Ø25mm védőcső. Nappali: 3-4x UTP + 2x üres cső. Konyha: 2x UTP (okos gépeknek). Minden ablakhoz: redőnymotor kábel (5×1,5mm²). Minden szobában: mély kötődoboz (60mm!) a kapcsolóknál. Tetőhöz: 1x UTP + 1x koax + üres cső (kamera, antenna, napelem). Bejárat: UTP (kaputelefon) + tápkábel." },
    cost_proto: { title: "Költség összehasonlítás", color: "#ef4444", detail: "Alap WiFi (Shelly, 10 eszköz): 50-150k Ft. Zigbee (30 eszköz + hub): 150-400k Ft. KNX (teljes ház, 20 kör): 1-5M Ft. Home Assistant szerver: 30-80k Ft. A kábelezés (UTP + védőcsövek): 150-300k Ft — ezt MINDENKÉPP csináld meg, bármilyen rendszert is választasz! Utólag 10x drágább." },
  };

  const allDetails = subTab === "infrastructure" ? infraDetails : subTab === "solar" ? solarDetails : protocolDetails;

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />
      <DiagramWrapper>
        <svg viewBox="0 0 750 420" style={{ width: "100%", height: "auto", display: "block" }}>
          {subTab === "infrastructure" && (<g>
            <text x="375" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">SMART HOME INFRASTRUKTÚRA</text>
            {/* Simplified floor plan */}
            <rect x="150" y="50" width="450" height="240" rx="8" fill="none" stroke="#334155" strokeWidth="2" />
            {/* Rooms */}
            <line x1="375" y1="50" x2="375" y2="290" stroke="#334155" strokeWidth="1" />
            <line x1="150" y1="170" x2="600" y2="170" stroke="#334155" strokeWidth="1" />
            <text x="260" y="115" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">Nappali</text>
            <text x="490" y="115" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">Konyha</text>
            <text x="260" y="235" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">Háló</text>
            <text x="490" y="235" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">Fürdő</text>
            {/* Patch panel */}
            <rect x="40" y="140" width="80" height="50" rx="6" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
            <text x="80" y="162" fill="#3b82f6" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">PATCH</text>
            <text x="80" y="175" fill="#3b82f6" fontSize="8" fontFamily="monospace" textAnchor="middle">PANEL</text>
            {/* UTP cables */}
            {[[120, 165, 200, 100], [120, 165, 200, 220], [120, 165, 420, 100], [120, 165, 420, 220]].map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#22c55e" strokeWidth="1.5" opacity="0.5" strokeDasharray="4,4" />
            ))}
            {/* WiFi APs */}
            {[[260, 90], [490, 90], [260, 210], [490, 210]].map(([x, y], i) => (
              <g key={i}><circle cx={x} cy={y} r={8} fill="#8b5cf6" opacity="0.5" /><text x={x} y={y + 3} fill="#fff" fontSize="7" textAnchor="middle">AP</text></g>
            ))}
            {/* Window motor indicators */}
            {[[150, 80], [150, 200], [600, 80], [600, 200]].map(([x, y], i) => (
              <rect key={i} x={x - 5} y={y} width="10" height="15" rx="2" fill="#14b8a6" opacity="0.6" />
            ))}
          </g>)}
          {subTab === "solar" && (<g>
            <text x="375" y="25" fill="#f59e0b" fontSize="12" fontFamily="monospace" textAnchor="middle">NAPELEMES RENDSZER</text>
            {/* Flow diagram */}
            {[
              { x: 30, label: "Napelemek", icon: "☀️", color: "#f59e0b" },
              { x: 145, label: "DC kábel", icon: "⚡", color: "#ef4444" },
              { x: 260, label: "Inverter", icon: "🔄", color: "#3b82f6" },
              { x: 375, label: "Akku", icon: "🔋", color: "#22c55e" },
              { x: 490, label: "Elosztó", icon: "🔌", color: "#8b5cf6" },
              { x: 605, label: "Mérő→Hálózat", icon: "📊", color: "#f97316" },
            ].map((n, i) => (
              <g key={i}>
                <rect x={n.x} y={60} width={105} height={70} rx={10} fill="#1e293b" stroke={n.color} strokeWidth="1.5" />
                <text x={n.x + 52} y={90} fill={n.color} fontSize="16" textAnchor="middle">{n.icon}</text>
                <text x={n.x + 52} y={115} fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">{n.label}</text>
                {i < 5 && <text x={n.x + 112} y={100} fill="#475569" fontSize="14">→</text>}
              </g>
            ))}
            {/* ROI box */}
            <rect x="150" y="160" width="450" height="50" rx="8" fill="#1e293b" stroke="#14b8a6" strokeWidth="1" />
            <text x="375" y="182" fill="#14b8a6" fontSize="11" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">10 kWp: 3-5M Ft | Megtérülés: 5-8 év | Élettartam: 25-30 év</text>
            <text x="375" y="200" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">Évi megtakarítás: 400-700.000 Ft</text>
          </g>)}
          {subTab === "protocols" && (<g>
            <text x="375" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">SMART HOME PROTOKOLLOK ÖSSZEHASONLÍTÁS</text>
            {/* Three main protocols */}
            {[
              { x: 30, w: 220, label: "KNX (vezetékes)", sub: "Profi, ipari szabvány", color: "#3b82f6", icon: "🔌", cost: "1-5M Ft" },
              { x: 270, w: 220, label: "WiFi (Shelly/Sonoff)", sub: "Egyszerű, olcsó, utólag is", color: "#22c55e", icon: "📶", cost: "50-150k Ft" },
              { x: 510, w: 220, label: "Zigbee / Z-Wave", sub: "Mesh, energiatakarékos", color: "#8b5cf6", icon: "🔗", cost: "150-400k Ft" },
            ].map((p, i) => (
              <g key={i}>
                <rect x={p.x} y={50} width={p.w} height="100" rx="12" fill="#1e293b" stroke={p.color} strokeWidth="2" />
                <text x={p.x + p.w / 2} y={78} textAnchor="middle" fill={p.color} fontSize="20">{p.icon}</text>
                <text x={p.x + p.w / 2} y={100} textAnchor="middle" fill="#f1f5f9" fontSize="11" fontWeight="bold">{p.label}</text>
                <text x={p.x + p.w / 2} y={118} textAnchor="middle" fill="#94a3b8" fontSize="9">{p.sub}</text>
                <text x={p.x + p.w / 2} y={140} textAnchor="middle" fill={p.color} fontSize="10" fontWeight="600">{p.cost}</text>
              </g>
            ))}
            {/* Comparison rows */}
            {[
              { prop: "Megbízhatóság", vals: ["★★★★★", "★★★☆☆", "★★★★☆"], colors: ["#22c55e", "#eab308", "#84cc16"] },
              { prop: "Utólag bővíthető", vals: ["Nehéz", "Könnyű", "Könnyű"], colors: ["#ef4444", "#22c55e", "#22c55e"] },
              { prop: "Tervezés igény", vals: ["Magas", "Nincs", "Alacsony"], colors: ["#ef4444", "#22c55e", "#84cc16"] },
            ].map((row, ri) => (
              <g key={ri}>
                <text x="140" y={195 + ri * 30} textAnchor="middle" fill={THEME.text.secondary} fontSize="10" fontWeight="600">{row.prop}</text>
                {row.vals.map((v, vi) => (
                  <text key={vi} x={[140, 380, 620][vi]} y={195 + ri * 30} textAnchor="middle" fill={row.colors[vi]} fontSize="10">{v}</text>
                ))}
              </g>
            ))}
          </g>)}
          {Object.keys(allDetails).map((key, i) => {
            const el = allDetails[key];
            const cols = subTab === "protocols" ? 3 : 4;
            const x = 20 + (i % cols) * (subTab === "protocols" ? 245 : 180);
            const y = subTab === "solar" ? 240 + Math.floor(i / cols) * 35 : subTab === "protocols" ? 290 + Math.floor(i / cols) * 35 : 310 + Math.floor(i / cols) * 35;
            return (
              <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                <rect x={x} y={y} width={170} height={28} rx={6} fill={activeEl === key ? el.color : "#1e293b"} stroke={el.color} strokeWidth={activeEl === key ? 2 : 1} />
                <text x={x + 8} y={y + 19} fill={activeEl === key ? "#fff" : el.color} fontSize="9" fontFamily="system-ui">{el.title}</text>
              </g>
            );
          })}
        </svg>
      </DiagramWrapper>
      <PhotoSection searchQuery="napelem telepítés tetőre solar panel" images={[
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Photovoltaik_Dachanlage_Hannover_-_Schwarze_Heide_-_1_MW.jpg/320px-Photovoltaik_Dachanlage_Hannover_-_Schwarze_Heide_-_1_MW.jpg", alt: "Napelem", caption: "Napelem rendszer tetőn" }
      ]} />
      {activeEl && allDetails[activeEl] && <DetailPanel color={allDetails[activeEl].color} title={allDetails[activeEl].title} detail={allDetails[activeEl].detail} />}
      <ClickHint />
    </div>
  );
}

/* ─── WATERPROOFING ─── */
function WaterproofDiagram() {
  const [subTab, setSubTab] = useState("overview");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [{ id: "overview", label: "Áttekintés" }, { id: "foundation_wp", label: "Alap" }, { id: "bathroom", label: "Fürdő" }, { id: "roof_terrace", label: "Terasz" }, { id: "mistakes_wp", label: "⚠ Gyakori hibák" }];

  const overviewDetails = {
    horiz: { title: "Vízszintes vízszigetelés", color: "#3b82f6", detail: "Az alap tetején bitumenes lemez. Megakadályozza a felszívódást. SOHA ne csak kent (Hidrosol) — lemez kell!" },
    vertical: { title: "Függőleges vízszigetelés", color: "#06b6d4", detail: "Alapfal külsején, terepszint alatt. Bitumen + dombornyomott lemez (Technodrain) + XPS." },
    bath_z: { title: "Fürdőszoba", color: "#8b5cf6", detail: "Kenhető vízszigetelés padlón és zuhanyzó mögötti falon (min. 200cm). NEM opcionális — KÖTELEZŐ!" },
    flat_r: { title: "Lapostető / terasz", color: "#ef4444", detail: "Két réteg bitumenes lemez hegesztve. Felhajtás min. 15 cm. Lejtés min. 2% (2 cm/m)." },
    balcony: { title: "Erkély", color: "#f59e0b", detail: "Bitumenes lemez + járólap. Küszöbnél felhajtás és csepegő él! A legkritikusabb pont: erkély-fal csatlakozás." },
    rule: { title: "Alapszabály", color: "#22c55e", detail: "A víz MINDIG utat talál. Inkább többet költs vízszigetelésre. Javítás 5-10x drágább, mint a megelőzés!" },
  };

  const foundWpDetails = {
    h_bit: { title: "Vízszintes bitumen", color: "#3b82f6", detail: "V60 S4 lemez, hegesztve az alap tetejére. Átfedés min. 10 cm. Ez zárja el a felszívódó nedvességet." },
    v_bit: { title: "Függőleges bitumen", color: "#06b6d4", detail: "2 réteg kent bitumen (Hidrosol) + 1 réteg bitumenes lemez. Alaptól terepszint fölé 30 cm-re." },
    dimpled: { title: "Dombornyomott lemez", color: "#94a3b8", detail: "Technodrain: védi a bitument, elvezeti a vizet. Domborodás kifelé néz!" },
    drain: { title: "Dréncsövezés", color: "#22c55e", detail: "Perforált cső az alap talpszintjén, kavicságyba, geotextíliába. Lejtés min. 0.5%. Elvezeti a vizet." },
    xps_u: { title: "XPS (föld alatti)", color: "#f59e0b", detail: "Föld alatt CSAK XPS! Az EPS vizet szív, az XPS nem (zárt cellás). λ=0.034 W/mK (alacsonyabb λ = jobb szigetelő)." },
    backfill: { title: "Visszatöltés", color: "#8b5cf6", detail: "Mosott kavics vagy homok, NE föld! A föld vizet tart és nyomja a falat." },
  };

  const bathDetails = {
    paint_wp: { title: "Kenhető vízszigetelés", color: "#3b82f6", detail: "2 réteg (Mapelastic, Weber Superflex), keresztben kenve. Rétegek közt 4-6 óra, teljes: 24 óra száradás." },
    reinf_tape: { title: "Erősítő szalag", color: "#f59e0b", detail: "Minden sarok, csatlakozás, átvezetés! BELE ágyazva a rétegbe. A leggyakrabban kihagyott lépés!" },
    height: { title: "Magassági szabályok", color: "#8b5cf6", detail: "Zuhanyzó mögött: TELJES falmagasság. Kád: min. 200 cm. Mosdó: min. 120 cm. Máshol: min. 20 cm lábazat." },
    drain_c: { title: "Lefolyó gallér", color: "#ef4444", detail: "Speciális manchetta a lefolyónál. Ha hiányzik → víz a lefolyó MELLETT szivárog a födémbe!" },
    test_wp: { title: "Vízzáróság próba", color: "#22c55e", detail: "24 óra: dugd el a lefolyót, 2-3 cm vizet, várd meg. Így kiderül a hiba MIELŐTT a burkolat rámegy." },
  };

  const terraceDetails = {
    bit_layers: { title: "Bitumenes lemezek", color: "#3b82f6", detail: "Két réteg: első ragasztva, második hegesztve. Teljes lezárás a csatlakozásoknál!" },
    warm_inv: { title: "Meleg vs fordított tető", color: "#f59e0b", detail: "Meleg: szigetelés ALATT a bitumen. Fordított: FELETT (XPS-sel). A fordított könnyebben javítható." },
    upstand: { title: "Felhajtás (min. 15cm)", color: "#ef4444", detail: "Bitumen a falnál min. 15 cm-rel a burkolat FÖLÉ. A leggyakrabban elrontott részlet!" },
    drain_t: { title: "Vízelvezetés (min. 2%)", color: "#22c55e", detail: "Lejtés a víznyelő felé. Pangó víz tönkreteszi a szigetelést." },
    finish_t: { title: "Burkolat", color: "#8b5cf6", detail: "Járólap talpakkal (javítható!) vagy kavics 5-8cm (olcsóbb). SOHA ne ragassz lapot közvetlenül a bitumenre!" },
  };

  const allDetails = subTab === "overview" ? overviewDetails : subTab === "foundation_wp" ? foundWpDetails : subTab === "bathroom" ? bathDetails : terraceDetails;

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />
      <DiagramWrapper>
        <svg viewBox="0 0 750 400" style={{ width: "100%", height: "auto", display: "block" }}>
          {subTab === "overview" && (<g>
            <text x="375" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">VÍZSZIGETELÉSI ZÓNÁK</text>
            {/* House silhouette */}
            <polygon points="375,50 180,150 180,300 570,300 570,150" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
            <polygon points="375,50 180,150 570,150" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
            {/* Foundation */}
            <rect x="180" y="300" width="390" height="30" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="1" />
            <text x="375" y="320" fill="#3b82f6" fontSize="9" fontFamily="monospace" textAnchor="middle">Vízszintes vízszigetelés</text>
            {/* Vertical sides underground */}
            <rect x="170" y="300" width="15" height="50" fill="#06b6d4" opacity="0.5" />
            <rect x="565" y="300" width="15" height="50" fill="#06b6d4" opacity="0.5" />
            {/* Bathroom zone */}
            <rect x="400" y="180" width="100" height="110" fill="#8b5cf6" opacity="0.2" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4,4" />
            <text x="450" y="240" fill="#8b5cf6" fontSize="8" fontFamily="monospace" textAnchor="middle">Fürdő</text>
            {/* Flat roof zone */}
            <rect x="250" y="140" width="100" height="15" fill="#ef4444" opacity="0.3" stroke="#ef4444" strokeWidth="1" />
            <text x="300" y="135" fill="#ef4444" fontSize="8" fontFamily="monospace" textAnchor="middle">terasz</text>
          </g>)}
          {subTab === "foundation_wp" && (<g>
            <text x="375" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">ALAP VÍZSZIGETELÉS METSZET</text>
            <rect x="250" y="60" width="100" height="200" fill="#c2410c" opacity="0.4" rx="3" />
            <text x="300" y="165" fill="#fca5a5" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,300,165)">Alapfal</text>
            <line x1="200" y1="160" x2="450" y2="160" stroke="#4ade80" strokeWidth="1" strokeDasharray="4,4" />
            <text x="460" y="157" fill="#4ade80" fontSize="8" fontFamily="monospace">terepszint</text>
            {/* Horizontal bitumen */}
            <rect x="250" y="258" width="100" height="5" fill="#3b82f6" opacity="0.8" />
            {/* Vertical bitumen */}
            <rect x="345" y="60" width="5" height="200" fill="#06b6d4" opacity="0.7" />
            {/* Dimpled membrane */}
            <rect x="355" y="60" width="10" height="200" fill="#94a3b8" opacity="0.4" />
            {/* XPS */}
            <rect x="370" y="160" width="30" height="100" fill="#f59e0b" opacity="0.3" />
            <text x="385" y="215" fill="#d97706" fontSize="7" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,385,215)">XPS</text>
            {/* Drain pipe */}
            <circle cx="380" cy="255" r="10" fill="none" stroke="#22c55e" strokeWidth="2" />
            <text x="400" y="260" fill="#22c55e" fontSize="7" fontFamily="monospace">drén</text>
          </g>)}
          {subTab === "bathroom" && (<g>
            <text x="375" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">FÜRDŐSZOBA VÍZSZIGETELÉS</text>
            {/* Floor + wall corner */}
            <rect x="100" y="200" width="500" height="60" fill="#6b7280" opacity="0.4" rx="2" />
            <rect x="100" y="60" width="30" height="200" fill="#c2410c" opacity="0.4" rx="2" />
            {/* Waterproofing membrane */}
            <path d="M 100,60 L 100,200 L 600,200 L 600,260" fill="none" stroke="#3b82f6" strokeWidth="4" opacity="0.6" />
            {/* Reinforcing tape at corner */}
            <circle cx="100" cy="200" r="15" fill="#f59e0b" opacity="0.3" stroke="#f59e0b" strokeWidth="1" />
            <text x="130" y="195" fill="#f59e0b" fontSize="8" fontFamily="monospace">erősítő szalag</text>
            {/* Height markers */}
            <line x1="95" y1="60" x2="80" y2="60" stroke="#8b5cf6" strokeWidth="1" />
            <line x1="95" y1="200" x2="80" y2="200" stroke="#8b5cf6" strokeWidth="1" />
            <line x1="80" y1="60" x2="80" y2="200" stroke="#8b5cf6" strokeWidth="1" />
            <text x="65" y="135" fill="#8b5cf6" fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,65,135)">teljes magasság</text>
            {/* Drain */}
            <circle cx="400" cy="210" r="12" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
            <text x="400" y="215" fill="#ef4444" fontSize="7" fontFamily="monospace" textAnchor="middle">⊕</text>
            <text x="430" y="215" fill="#ef4444" fontSize="8" fontFamily="monospace">lefolyó gallér!</text>
          </g>)}
          {subTab === "roof_terrace" && (<g>
            <text x="375" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">LAPOSTETŐ / TERASZ RÉTEGEK</text>
            {[
              { y: 190, h: 20, color: "#8b5cf6", label: "Járólap / kavics" },
              { y: 170, h: 15, color: "#94a3b8", label: "Védőréteg" },
              { y: 130, h: 35, color: "#f59e0b", label: "Hőszigetelés (XPS/EPS)" },
              { y: 115, h: 10, color: "#3b82f6", label: "Bitumen 2. réteg (hegesztve)" },
              { y: 105, h: 8, color: "#60a5fa", label: "Bitumen 1. réteg (ragasztva)" },
              { y: 85, h: 15, color: "#94a3b8", label: "Alapozó (primer)" },
              { y: 60, h: 20, color: "#6b7280", label: "Vasbeton födém" },
            ].map((l, i) => (
              <g key={i}>
                <rect x="100" y={l.y} width="500" height={l.h} rx="2" fill={l.color} opacity="0.6" />
                <text x="110" y={l.y + l.h / 2 + 4} fill="#f1f5f9" fontSize="9" fontWeight="bold" fontFamily="system-ui">{l.label}</text>
              </g>
            ))}
            {/* Upstand */}
            <rect x="598" y="60" width="8" height="160" fill="#ef4444" opacity="0.5" />
            <text x="620" y="140" fill="#ef4444" fontSize="8" fontWeight="bold" fontFamily="monospace">felhajtás min. 15cm !</text>
            {/* Slope indicator */}
            <line x1="100" y1="215" x2="600" y2="220" stroke="#22c55e" strokeWidth="1" />
            <text x="350" y="238" fill="#22c55e" fontSize="9" fontFamily="monospace" textAnchor="middle">lejtés min. 2% →</text>
          </g>)}
          {Object.keys(allDetails).map((key, i) => {
            const el = allDetails[key];
            const cols = 3;
            const x = 20 + (i % cols) * 240;
            const y = 290 + Math.floor(i / cols) * 35;
            return (
              <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                <rect x={x} y={y} width={225} height={28} rx={6} fill={activeEl === key ? el.color : "#1e293b"} stroke={el.color} strokeWidth={activeEl === key ? 2 : 1} />
                <text x={x + 8} y={y + 19} fill={activeEl === key ? "#fff" : el.color} fontSize="9" fontFamily="system-ui">{el.title}</text>
              </g>
            );
          })}
        </svg>
      </DiagramWrapper>
      <PhotoSection searchQuery="lábazatszigetelés vízszigetelés építés" images={[
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Foundation_waterproofing.jpg/320px-Foundation_waterproofing.jpg", alt: "Vízszigetelés", caption: "Lábazat vízszigetelés bitumenes lemezzel" }
      ]} />
      {activeEl && allDetails[activeEl] && subTab !== "mistakes_wp" && <DetailPanel color={allDetails[activeEl].color} title={allDetails[activeEl].title} detail={allDetails[activeEl].detail} />}
      {subTab === "mistakes_wp" && (() => {
        const mistakes = [
          { id: "kent_only", title: "Csak kent vízszigetelés az alapon", color: THEME.accent.red, detail: "A LEGGYAKORIBB hiba: 'kenjük be Hidrosolnal, az elég'. NEM ELÉG! A vízszintes vízszigetelés LEMEZZEL (bitumenes vagy HDPE) kell, amit lehegesztenek. A kent szigetelés kiegészítő, önmagában nem tartja a felszálló nedvességet. 5-10 év múlva: nedves falak, salétrom, penész. Javítása utólag: 1-5M Ft (injektálás vagy aláfűrészelés)." },
          { id: "no_bathroom_wp", title: "Hiányos fürdőszoba vízszigetelés", color: THEME.accent.red, detail: "A zuhanyzó/kád alatti és melletti fal + padló TELJES felületén kenhető vízszigetelés kell (Mapei Mapegum, Weber Tec). Padló: teljes felületen. Fal: zuhanyzónál min. 200 cm, máshol min. 20 cm. Sarkok, csőáttörések: szalaggal/mandzsettával megerősítve. Hiányos szigetelés = 2-5 év múlva beázás az alsó szintre." },
          { id: "overlap", title: "Átfedés és csatlakozás hibák", color: THEME.accent.amber, detail: "A vízszigetelő lemezek átfedése min. 10-15 cm, HEGESZTVE (nem ragasztva!). A fal-padló csatlakozásnál a vízszintes és függőleges szigetelés ÖSSZEFÜGGŐ kell legyen. Gyakori hiba: a vízszintes és függőleges nem csatlakozik → a víz betalál a résbe. Speciális sarokelemek és tömítőszalagok használata kötelező." },
          { id: "drain_wrong", title: "Rossz vízelvezetés az alap körül", color: THEME.accent.blue, detail: "A ház körül dréncsövezés szükséges, ha a talajvíz magas. Drén: kavicságyba fektetett perforált cső, geotextília burkolattal. Esés: min. 0,5% a szikkasztó felé. Gyakori hiba: drén NÉLKÜL a víz a pince/alap falán gyülemlik → nyomóvíz → beázás. A dréncsövet a ház ÉPÍTÉSEKOR kell lefektetni — utólag: felásni az egész ház körüli területet." },
          { id: "roof_wp", title: "Lapostető/terasz vízszigetelés hibák", color: THEME.accent.orange, detail: "Lapostetőn/teraszon a vízszigetelés KRITIKUS: bitumenes lemez (2 réteg, lángal hegesztve) vagy PVC/TPO membrán. Esés: min. 2-3% a lefolyó felé. Gyakori hibák: nincs elég lejtés (pocsolyák → fagykár), rossz átlapolás, felhajtás a falnál túl rövid (min. 15 cm a burkolat FELETT). Javítása: a teljes burkolatot fel kell szedni." },
        ];
        return (
          <>
            <DiagramWrapper>
              <svg viewBox="0 0 750 300" style={{ width: "100%" }}>
                <text x="375" y="25" textAnchor="middle" fill={THEME.accent.red} fontSize="14" fontWeight="700">⚠ VÍZSZIGETELÉS — GYAKORI HIBÁK</text>
                {mistakes.map((m, i) => (
                  <g key={m.id} onClick={() => setActiveEl(activeEl === m.id ? null : m.id)} style={{ cursor: "pointer" }}>
                    <rect x={20 + (i % 2) * 370} y={50 + Math.floor(i / 2) * 60} width="350" height="50" rx="8" fill={activeEl === m.id ? m.color + "22" : "#111827"} stroke={m.color} strokeWidth={activeEl === m.id ? 2.5 : 1.5} />
                    <text x={35 + (i % 2) * 370} y={72 + Math.floor(i / 2) * 60} fill={m.color} fontSize="11" fontWeight="700">⚠ {m.title}</text>
                    <text x={35 + (i % 2) * 370} y={88 + Math.floor(i / 2) * 60} fill={THEME.text.muted} fontSize="9">[kattints a részletekért]</text>
                  </g>
                ))}
              </svg>
            </DiagramWrapper>
            {activeEl && (() => { const m = mistakes.find(m => m.id === activeEl); return m ? <DetailPanel color={m.color} title={m.title} detail={m.detail} /> : null; })()}
          </>
        );
      })()}
      <ClickHint />
    </div>
  );
}

/* ─── SOUND INSULATION ─── */
function SoundInsulationDiagram() {
  const [subTab, setSubTab] = useState("impact");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [{ id: "impact", label: "Lépéshang" }, { id: "partition", label: "Válaszfal" }, { id: "slab_sound", label: "Födém" }];

  const impactDetails = {
    eps_t: { title: "EPS T (lépéshang)", color: "#60a5fa", detail: "Speciális, rugalmas polisztirol. 2-3 cm, 15-25 kPa. NEM a hőszigetelő EPS! A 'T' = taposásra tervezett." },
    pe_foil: { title: "PE fólia", color: "#fbbf24", detail: "Beton és EPS T között. Megakadályozza a nedves beton beivódását. Átfedés: 15 cm, ragasztószalaggal." },
    edge_strip: { title: "Peremszalag (KRITIKUS!)", color: "#22c55e", detail: "5-8 mm habszalag a fal mentén. Az esztrich NEM ÉRHET a falhoz! Ha érintkezik → hangvezetés → értelmetlen rendszer. Burkolás után levágni!" },
    float_princ: { title: "Úszóesztrich elv", color: "#8b5cf6", detail: "Az aljzatbeton 'lebeg' a rugalmas rétegen. Nem kapcsolódik falhoz sem födémhez → lépéshang nem terjed." },
    dry_time: { title: "Száradási idő", color: "#f59e0b", detail: "Cementesztrich: 1 cm = 1 hét. 6 cm = 6 hét! Anhydrit: 3-4 hét. Burkolás ELŐTT CM mérés: cement max 2%, anhydrit max 0.5%." },
  };

  const partSoundDetails = {
    brick_s: { title: "Tégla Rw értékek", color: "#c2410c", detail: "Rw = súlyozott léghangszigetelési index dB-ben (minél magasabb, annál csendesebb). 10cm tömör: Rw=40 dB. 12cm Porotherm: Rw=42 dB. 25cm: Rw=48 dB. Tömegfüggő." },
    drywall_s: { title: "Gipszkarton Rw értékek", color: "#8b5cf6", detail: "2x12.5mm/CW75/2x12.5mm = Rw=54 dB. Eltolt profilokkal + vastag gyapot: Rw=60+ dB! Könnyebb és jobb!" },
    staggered: { title: "Eltolt állóprofil", color: "#3b82f6", detail: "Két oldal KÜLÖNBÖZŐ profilokhoz csavarodik → nincs merev kapcsolat → hang nem rezeg át. Double-skin elv." },
    mass_law: { title: "Tömegszabály", color: "#f59e0b", detail: "Hangszigetelés ∝ tömeg². Kétszeres tömeg ≈ +6 dB javulás. Ezért nehéz csak téglával jó értéket elérni." },
    double_sk: { title: "Kéthéjú szerkezet", color: "#22c55e", detail: "Két különálló felület, köztük légrés + elnyelő. A legjobb hangszigetelés alapja. 25 cm gipszkarton fal > 30 cm tégla!" },
  };

  const slabSoundDetails = {
    upper_fl: { title: "Felső úszóesztrich", color: "#60a5fa", detail: "EPS T + leválasztott aljzat: csökkenti a lépéshangot 18-25 dB-lel." },
    conc_mass: { title: "Vasbeton födém", color: "#6b7280", detail: "15-25 cm vasbeton, önmagában Rw=50-55 dB. A tömeg a léghang ellen dolgozik." },
    susp_ceil: { title: "Álmennyezet", color: "#f59e0b", detail: "Gipszkarton + RUGALMAS függesztő (Nonius!) + ásványgyapot. Plusz 8-15 dB! Merev függesztővel NINCS javulás." },
    combined: { title: "Kombinált rendszer", color: "#22c55e", detail: "Úszó padló + vasbeton + álmennyezet = Rw 60-65 dB. Többlakásos minimum. Családi háznál emeleti hálóhoz ajánlott." },
  };

  const allDetails = subTab === "impact" ? impactDetails : subTab === "partition" ? partSoundDetails : slabSoundDetails;

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />
      <DiagramWrapper>
        <svg viewBox="0 0 700 380" style={{ width: "100%", height: "auto", display: "block" }}>
          {subTab === "impact" && (<g>
            <text x="350" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">ÚSZÓ ESZTRICH — LÉPÉSHANG-SZIGETELÉS</text>
            {/* Layers bottom to top */}
            <rect x="100" y="200" width="500" height="40" rx="2" fill="#6b7280" opacity="0.7" />
            <text x="350" y="225" fill="#f1f5f9" fontSize="10" fontFamily="system-ui" textAnchor="middle">Vasbeton födém</text>
            <rect x="100" y="185" width="500" height="12" rx="1" fill="#fbbf24" opacity="0.6" />
            <text x="350" y="195" fill="#92400e" fontSize="8" fontFamily="monospace" textAnchor="middle">PE fólia</text>
            <rect x="100" y="155" width="500" height="28" rx="2" fill="#60a5fa" opacity="0.5" />
            <text x="350" y="173" fill="#1e293b" fontSize="10" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">EPS T (lépéshang) 2-3 cm</text>
            {/* Edge strip - key element */}
            <rect x="95" y="100" width="8" height="55" fill="#22c55e" opacity="0.8" />
            <rect x="597" y="100" width="8" height="55" fill="#22c55e" opacity="0.8" />
            <text x="615" y="130" fill="#22c55e" fontSize="8" fontWeight="bold" fontFamily="monospace">peremszalag!</text>
            {/* Screed */}
            <rect x="103" y="100" width="494" height="55" rx="2" fill="#9ca3af" opacity="0.6" />
            <text x="350" y="132" fill="#1e293b" fontSize="10" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">Aljzatbeton (esztrich) — NEM ér a falhoz!</text>
            {/* Finished floor */}
            <rect x="100" y="85" width="500" height="12" rx="1" fill="#d4a574" opacity="0.7" />
            <text x="350" y="95" fill="#78350f" fontSize="8" fontFamily="monospace" textAnchor="middle">burkolat</text>
            {/* Walls */}
            <rect x="85" y="60" width="20" height="190" fill="#c2410c" opacity="0.3" rx="2" />
            <rect x="595" y="60" width="20" height="190" fill="#c2410c" opacity="0.3" rx="2" />
            {/* Gap indicator */}
            <line x1="103" y1="60" x2="103" y2="75" stroke="#ef4444" strokeWidth="1" />
            <text x="110" y="72" fill="#ef4444" fontSize="7" fontWeight="bold" fontFamily="monospace">rés!</text>
          </g>)}
          {subTab === "partition" && (<g>
            <text x="350" y="22" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">VÁLASZFAL HANGSZIGETELÉS</text>
            <text x="350" y="36" fill="#475569" fontSize="8" fontFamily="monospace" textAnchor="middle">Rw = léghangszigetelés dB-ben (magasabb = csendesebb)</text>
            <text x="175" y="50" fill="#c2410c" fontSize="11" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">Tégla (Rw=40-48 dB)</text>
            <text x="525" y="50" fill="#8b5cf6" fontSize="11" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">Gipszkarton (Rw=54-60+ dB)</text>
            <line x1="350" y1="40" x2="350" y2="230" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />
            <rect x="140" y="65" width="70" height="160" fill="#c2410c" opacity="0.5" rx="2" />
            {Array.from({length: 6}).map((_,i) => <line key={i} x1="140" y1={65+i*27} x2="210" y2={65+i*27} stroke="#9a3412" strokeWidth="1" opacity="0.4" />)}
            <rect x="430" y="65" width="6" height="160" fill="#e2e8f0" opacity="0.7" />
            <rect x="436" y="65" width="6" height="160" fill="#d1d5db" opacity="0.7" />
            <rect x="450" y="65" width="3" height="160" fill="#94a3b8" opacity="0.5" />
            <rect x="470" y="65" width="3" height="160" fill="#94a3b8" opacity="0.5" />
            <rect x="490" y="65" width="3" height="160" fill="#94a3b8" opacity="0.5" />
            <rect x="460" y="80" width="20" height="130" fill="#fbbf24" opacity="0.2" />
            <rect x="500" y="65" width="6" height="160" fill="#d1d5db" opacity="0.7" />
            <rect x="506" y="65" width="6" height="160" fill="#e2e8f0" opacity="0.7" />
            <text x="175" y="245" fill="#c2410c" fontSize="9" fontFamily="monospace" textAnchor="middle">tömeg alapú</text>
            <text x="525" y="245" fill="#8b5cf6" fontSize="9" fontFamily="monospace" textAnchor="middle">kéthéjú (double-skin)</text>
          </g>)}
          {subTab === "slab_sound" && (<g>
            <text x="350" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">FÖDÉM HANGSZIGETELÉS — KOMBINÁLT</text>
            <rect x="100" y="70" width="500" height="30" rx="2" fill="#60a5fa" opacity="0.4" />
            <text x="350" y="90" fill="#60a5fa" fontSize="10" fontFamily="system-ui" textAnchor="middle">Felső úszóesztrich + lépéshang EPS</text>
            <rect x="100" y="110" width="500" height="60" rx="2" fill="#6b7280" opacity="0.6" />
            <text x="350" y="145" fill="#f1f5f9" fontSize="11" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">Vasbeton födém (15-25 cm)</text>
            <rect x="100" y="185" width="500" height="25" rx="2" fill="#f59e0b" opacity="0.4" />
            <text x="350" y="202" fill="#f59e0b" fontSize="10" fontFamily="system-ui" textAnchor="middle">Álmennyezet (rugalmas felfüggesztés!)</text>
            {[180, 300, 420, 540].map((x,i) => <line key={i} x1={x} y1={170} x2={x} y2={185} stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2" />)}
            <text x="350" y="230" fill="#22c55e" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Kombinált Rw = 60-65 dB</text>
          </g>)}
          {Object.keys(allDetails).map((key, i) => {
            const el = allDetails[key]; const cols = 3;
            const x = 20 + (i % cols) * 225; const y = 260 + Math.floor(i / cols) * 35;
            return (
              <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                <rect x={x} y={y} width={215} height={28} rx={6} fill={activeEl === key ? el.color : "#1e293b"} stroke={el.color} strokeWidth={activeEl === key ? 2 : 1} />
                <text x={x + 8} y={y + 19} fill={activeEl === key ? "#fff" : el.color} fontSize="9" fontFamily="system-ui">{el.title}</text>
              </g>
            );
          })}
        </svg>
      </DiagramWrapper>
      <PhotoSection searchQuery="hangszigetelés ásványgyapot" images={[
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Glasswool_insulation.jpg/320px-Glasswool_insulation.jpg", alt: "Hangszigetelés", caption: "Ásványgyapot hangszigetelés a válaszfalban" }
      ]} />
      {activeEl && allDetails[activeEl] && <DetailPanel color={allDetails[activeEl].color} title={allDetails[activeEl].title} detail={allDetails[activeEl].detail} />}
      <ClickHint />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ENERGY DIAGRAM — Energetika & Fűtésméretezés
   ═══════════════════════════════════════════════════════════════ */
function EnergyDiagram() {
  const [subTab, setSubTab] = useState("heatloss");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [
    { id: "heatloss", label: "🔥 Hőveszteség" },
    { id: "rating", label: "📊 Energiaosztály" },
    { id: "certificate", label: "📜 Tanúsítvány" },
    { id: "csok", label: "💰 CSOK & Hitel" },
  ];
  const detailsHeatloss = {
    roof: { title: "Tető hőveszteség (25-30%)", color: THEME.accent.red, detail: "A meleg levegő felfelé száll, ezért a tető a legnagyobb hőveszteség-forrás. Megoldás: 25-30 cm ásványgyapot vagy cellulóz a födémre (hideg padlás) vagy szarufák közé+alá (meleg padlás). U-érték cél: ≤ 0,15 W/m²K (alacsonyabb U = kevesebb hőveszteség). A légzárás (párazáró fólia) legalább olyan fontos, mint a vastagság!" },
    walls: { title: "Fal hőveszteség (20-25%)", color: THEME.accent.orange, detail: "30 cm Porotherm (B30) önmagában U≈0,75 — ez messze nem elég. 15-20 cm EPS/grafit EPS hozzáadásával U≈0,18-0,22 érhető el. Hőszigetelő habot SOHA ne spórolj: a falfelület a legnagyobb, itt a legtöbb energia vész el. Hőhidak kezelése: nyílászáró-csatlakozás, koszorú, erkélykonzol." },
    windows: { title: "Nyílászáró hőveszteség (15-20%)", color: THEME.accent.amber, detail: "Háromrétegű üveg (Ug ≤ 0,6 — üveg hőátbocsátása) és meleg-peremes távtartó (ψ ≤ 0,04 — hőhíd veszteségi tényező W/mK) alapkövetelmény. Beépítési pozíció: a hőszigetelés síkjába vagy elé (előtétes). A redőny nélküli üvegfelületen éjjel akár 3x annyi hő távozik. Árnyékolás nélkül nyáron túlmelegedés!" },
    ventilation: { title: "Szellőzési hőveszteség (20-30%)", color: THEME.accent.blue, detail: "Nyitott ablakon keresztül szellőztetve a fűtési energia 20-30%-a elvész! HRV (hővisszanyerős szellőztető) 80-95%-ot visszanyer. Korszerű háznál a szellőzési veszteség a LEGNAGYOBB tétel — ezért kell gépészeti szellőzés. Blower Door teszt: n50 ≤ 1,5 1/h (alacsonyabb = légzáróbb)." },
    floor: { title: "Padló/alap hőveszteség (5-10%)", color: THEME.accent.teal, detail: "Lemezalap alatt 10-15 cm XPS (≥300 kPa) véd a talaj felé. Peremszigeteléssel a hőhíd csökkenthető a fal-alap csomópontnál. Talajhőmérséklet télen kb. 8-10°C, tehát kisebb a hőmérsékletkülönbség, mint a falnál." },
    formula: { title: "Q = U × A × ΔT képlet", color: THEME.accent.purple, detail: "Q [W] = U-érték [W/m²K] (hőátbocsátási tényező — mennyi hő jut át 1 m²-en, alacsonyabb = jobb) × felület [m²] × hőmérsékletkülönbség [K]. Példa: fal U=0,24, A=120 m², ΔT=32K (kint -12°C, bent +20°C) → Q = 0,24×120×32 = 921 W. Összesítve minden szerkezetre + szellőzés: megkapjuk a fűtési teljesítményigényt (tipikusan 4-8 kW 100-150 m² háznál, ha jól szigetelt)." },
    total: { title: "Összes hőveszteség összesítés", color: THEME.accent.green, detail: "Modern, jól szigetelt 120 m² ház: 4-6 kW fűtési csúcsigény. Régi, szigeteletlen: 15-25 kW! A hőszivattyú méretezése a fűtési igény alapján történik — túlméretezett hőszivattyú taktozik (ki-be kapcsolgat), drágább, és rosszabb hatásfokú. Mindig energetikus méretezzen!" },
  };
  const detailsRating = {
    aa: { title: "AA osztály (< 40 kWh/m²a)", color: THEME.accent.green, detail: "Közel nulla energiaigényű (nearly zero energy). kWh/m²a = éves energiaigény négyzetméterenként — ez az épület energiahatékonyságának fő mérőszáma. 2022 óta ez az új építésű házak minimuma az EU-ban. Fűtésköltség: ~200-400 ezer Ft/év (hőszivattyúval). Eléréséhez: 20+ cm szigetelés, 3 réteg üveg, HRV szellőzés, hőhídmentes szerkezet kell." },
    bb: { title: "BB osztály (40-80 kWh/m²a)", color: "#84cc16", detail: "Korszerűnek számít, de az új előírásoktól már elmarad. Régebbi (2010-2018) energiatudatos építéseknél jellemző. Fűtésköltség: ~400-700 ezer Ft/év. Utólagos HRV beépítéssel és nyílászáró-cserével AA-ra javítható." },
    cc: { title: "CC osztály (80-120 kWh/m²a)", color: THEME.accent.amber, detail: "2006-2010 közötti építési minimum. 10-12 cm EPS, kétrétegű üveg. Fűtésköltség: ~700 ezer - 1M Ft/év. Felújításnál a szigetelés vastagítása és nyílászárócsere hozza a legnagyobb javulást." },
    dd_jj: { title: "DD-JJ osztály (120-500+ kWh/m²a)", color: THEME.accent.red, detail: "Régi, 2006 előtti vagy szigeteletlen házak. 30 cm tégla/panel, egyszerű üveg, huzatos nyílászárók. Fűtésköltség: 1-3M+ Ft/év! A magyar lakásállomány ~70%-a DD vagy rosszabb. Felújítás megtérülése: 5-15 év." },
    scale: { title: "Az energiaosztály skála", color: THEME.accent.blue, detail: "A skála AA-tól JJ-ig terjed. Minden osztály egy fűtési energiaigény-sávot jelöl (kWh/m²/év). Új építésnél 2022-től kötelező: BB, de AA ajánlott. CSOK-hoz, zöld hitelhez AA szükséges. Az energetikai tanúsítvány 10 évig érvényes." },
  };
  const detailsCert = {
    header: { title: "Tanúsítvány fejléc", color: THEME.accent.blue, detail: "Az épület alapadatai: cím, helyrajzi szám, épület típusa (lakó/nem lakó), hasznos alapterület, építés éve, tanúsítás dátuma, érvényesség (10 év). A tanúsítvány az egész épületre vonatkozik, nem egy lakásra." },
    rating_field: { title: "Energetikai besorolás mező", color: THEME.accent.green, detail: "A fő eredmény: energetikai osztály (AA-JJ) és a számított fajlagos fűtési energiaigény kWh/m²/év-ben. Ez nem a tényleges fogyasztás, hanem szabványos feltételekkel (20°C belső hő, szabvány szellőzés) számított érték. A valós fogyasztás 10-30%-kal eltérhet." },
    breakdown: { title: "Energiamérleg részletezés", color: THEME.accent.amber, detail: "Részletezi a veszteségeket szerkezetenként: fal, tető, padló, nyílászáró, hőhidak, szellőzés. Ebből látszik, hol érdemes felújítani. Tartalmazza a fűtési rendszer hatásfokát is (kazán/hőszivattyú, elosztás veszteségei)." },
    recommendations: { title: "Felújítási javaslatok", color: THEME.accent.purple, detail: "A tanúsítvány kötelező része: legalább 2 felújítási javaslat, amelyek javítják az energiaosztályt. Megadják a becsült megtérülést is. FIGYELEM: a tanúsítványban szereplő árak gyakran elavultak — mindig kérj friss árajánlatot!" },
    who: { title: "Ki készítheti?", color: THEME.accent.teal, detail: "Csak jogosult energetikai tanúsító (MMK névjegyzékben szereplő). Költség: 50-150 ezer Ft épület mérettől és bonyolultságtól függően. Adásvételnél, bérbeadásnál KÖTELEZŐ. Új építésnél a használatbavételi engedélyhez kell. Online is ellenőrizhető az érvényessége." },
  };
  const detailsCsok = {
    csok_falusi: { title: "Falusi CSOK", color: THEME.accent.green, detail: "Kedvezményes települések listáján (kistelepülések). Összeg: max 5M Ft vissza nem térítendő támogatás + kedvezményes hitel. Feltétel: AA energiaosztály (< 40 kWh/m²a), gyermekvállalás (meglévő vagy vállalt). Új építésnél a használatbavételi engedély + energetikai tanúsítvány szükséges a folyósításhoz. FONTOS: ha nem születik meg a vállalt gyermek → a támogatás VISSZAFIZETENDŐ!" },
    zold_hitel: { title: "Zöld hitel (MNB)", color: THEME.accent.teal, detail: "Max összeg: 70M Ft, fix kamat: 2,5%, futamidő: max 25 év. Feltétel: AA energiaosztály + primer energia ≤ 90 kWh/m²a. Ez a piaci hiteleknél SOKKAL olcsóbb (piaci: 6-9%). 70M Ft hitelnél a különbség: 20-30M Ft megtakarítás a futamidő alatt! Szükséges: energetikai számítás (tervezéskor) + tanúsítvány (befejezéskor)." },
    babaváró: { title: "Babaváró hitel", color: THEME.accent.purple, detail: "Max 10M Ft, kamatmentes (ha 5 éven belül születik gyermek). NEM kötött felhasználású — használhatod építkezésre is. 2. gyermek születésekor 30% elengedés, 3. gyermeknél teljes elengedés. Önerőnek elfogadják a bankok. FONTOS: igénylés a házasságkötés után 5 éven belül, 41 év alatti nő." },
    aa_how: { title: "Hogyan érj el AA osztályt?", color: THEME.accent.amber, detail: "AA osztály (< 40 kWh/m²a) eléréséhez tipikusan kell: 20+ cm homlokzati szigetelés (grafit EPS vagy kőzetgyapot), 3 rétegű üvegezés (Ug ≤ 0,6), HRV szellőzés (≥80% hővisszanyerés), hőszivattyú (COP ≥ 3,5 — magasabb = hatékonyabb), 25-30 cm tető szigetelés, hőhídmentes csomópontok, Blower Door n50 ≤ 1,5 1/h (alacsonyabb = légzáróbb). Mindez kb. 5-10% többletköltség a BB-hez képest — de a zöld hitel megtakarítás TÖBBSZÖRÖSEN fedezi!" },
    docs_needed: { title: "Szükséges dokumentumok", color: THEME.accent.blue, detail: "Zöld hitelhez: 1. Energetikai számítás (tervezéskor, az energetikus készíti). 2. Tervrajzok. 3. Költségvetés. 4. Vállalkozási szerződés. 5. Építési engedély/bejelentés. Folyósításhoz: 6. Használatbavételi engedély. 7. Energetikai tanúsítvány (AA igazolás). 8. Műszaki átadás-átvételi jegyzőkönyv. A bank szakértője helyszíni szemlét tart!" },
    timeline_csok: { title: "Időzítés és ütemezés", color: THEME.accent.red, detail: "1. Tervezés megkezdése ELŐTT: energetikus bevonása (ő számolja az AA-t). 2. Hitel igénylése: az építkezés megkezdése ELŐTT. 3. Folyósítás: ütemezetten, a bank teljesítésigazolás alapján (hasonló a kivitelezői fizetési mérföldkövekhez). 4. Utolsó részlet: használatbavételi engedély + AA tanúsítvány bemutatása UTÁN. FONTOS: az építkezést NE kezdd el a hitel jóváhagyása előtt!" },
  };
  const details = subTab === "heatloss" ? detailsHeatloss : subTab === "rating" ? detailsRating : subTab === "certificate" ? detailsCert : detailsCsok;
  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />
      {subTab === "csok" && (
        <DiagramWrapper>
          <svg viewBox="0 0 750 380" style={{ width: "100%" }}>
            <text x="375" y="25" textAnchor="middle" fill={THEME.accent.green} fontSize="14" fontWeight="700">CSOK & ZÖLD HITEL — Támogatások új építéshez</text>
            <text x="375" y="45" textAnchor="middle" fill={THEME.text.muted} fontSize="10">AA energiaosztály = kapunyitó a legjobb támogatásokhoz</text>
            {Object.entries(detailsCsok).map(([key, d], i) => (
              <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                <rect x={20 + (i % 3) * 245} y={65 + Math.floor(i / 3) * 80} width="235" height="65" rx="10" fill={activeEl === key ? d.color + "22" : "#111827"} stroke={d.color} strokeWidth={activeEl === key ? 2.5 : 1.5} />
                <text x={138 + (i % 3) * 245} y={90 + Math.floor(i / 3) * 80} textAnchor="middle" fill={d.color} fontSize="11" fontWeight="700">{d.title}</text>
                <text x={138 + (i % 3) * 245} y={112 + Math.floor(i / 3) * 80} textAnchor="middle" fill={THEME.text.muted} fontSize="9">[kattints]</text>
              </g>
            ))}
            <rect x="100" y="250" width="550" height="55" rx="8" fill="#0e1a14" stroke={THEME.accent.green} strokeWidth="1.5" />
            <text x="375" y="272" textAnchor="middle" fill={THEME.accent.green} fontSize="11" fontWeight="700">AA osztály többletköltsége: ~5-10% → Zöld hitel megtakarítás: 20-30M Ft</text>
            <text x="375" y="292" textAnchor="middle" fill={THEME.text.muted} fontSize="10">Az AA energiaosztály NEM luxus — a leggazdaságosabb választás hosszú távon!</text>
          </svg>
        </DiagramWrapper>
      )}
      {subTab === "heatloss" && (
        <DiagramWrapper>
          <svg viewBox="0 0 700 420" style={{ width: "100%" }}>
            {/* House silhouette */}
            <polygon points="350,30 130,160 130,380 570,380 570,160" fill="#1a2744" stroke="#334155" strokeWidth="2" />
            <polygon points="350,30 130,160 570,160" fill="#1e3355" stroke="#334155" strokeWidth="2" />
            {/* Roof arrow */}
            <g onClick={() => setActiveEl("roof")} style={{ cursor: "pointer" }}>
              <path d="M350,50 L350,10" stroke={THEME.accent.red} strokeWidth="4" markerEnd="url(#arrowRed)" />
              <rect x="280" y="60" width="140" height="28" rx="6" fill={activeEl === "roof" ? THEME.accent.red : "#2a1a1a"} stroke={THEME.accent.red} strokeWidth="1.5" />
              <text x="350" y="79" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600">Tető 25-30%</text>
            </g>
            {/* Wall arrows */}
            <g onClick={() => setActiveEl("walls")} style={{ cursor: "pointer" }}>
              <path d="M125,260 L75,260" stroke={THEME.accent.orange} strokeWidth="4" markerEnd="url(#arrowOrange)" />
              <path d="M575,260 L625,260" stroke={THEME.accent.orange} strokeWidth="4" markerEnd="url(#arrowOrange)" />
              <rect x="10" y="230" width="70" height="45" rx="6" fill={activeEl === "walls" ? THEME.accent.orange : "#2a1e0e"} stroke={THEME.accent.orange} strokeWidth="1.5" />
              <text x="45" y="249" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">Falak</text>
              <text x="45" y="266" textAnchor="middle" fill="#fff" fontSize="10">20-25%</text>
              <rect x="620" y="230" width="70" height="45" rx="6" fill={activeEl === "walls" ? THEME.accent.orange : "#2a1e0e"} stroke={THEME.accent.orange} strokeWidth="1.5" />
              <text x="655" y="249" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">Falak</text>
              <text x="655" y="266" textAnchor="middle" fill="#fff" fontSize="10">20-25%</text>
            </g>
            {/* Windows */}
            <g onClick={() => setActiveEl("windows")} style={{ cursor: "pointer" }}>
              <rect x="200" y="220" width="60" height="80" rx="4" fill={activeEl === "windows" ? "#1e3a5f" : "#0f2340"} stroke={THEME.accent.amber} strokeWidth="2" />
              <line x1="230" y1="220" x2="230" y2="300" stroke={THEME.accent.amber} strokeWidth="1" />
              <line x1="200" y1="260" x2="260" y2="260" stroke={THEME.accent.amber} strokeWidth="1" />
              <rect x="440" y="220" width="60" height="80" rx="4" fill={activeEl === "windows" ? "#1e3a5f" : "#0f2340"} stroke={THEME.accent.amber} strokeWidth="2" />
              <line x1="470" y1="220" x2="470" y2="300" stroke={THEME.accent.amber} strokeWidth="1" />
              <line x1="440" y1="260" x2="500" y2="260" stroke={THEME.accent.amber} strokeWidth="1" />
              <text x="350" y="330" textAnchor="middle" fill={THEME.accent.amber} fontSize="11" fontWeight="600">Nyílászárók 15-20%</text>
            </g>
            {/* Ventilation */}
            <g onClick={() => setActiveEl("ventilation")} style={{ cursor: "pointer" }}>
              <path d="M350,170 Q350,130 390,110" stroke={THEME.accent.blue} strokeWidth="3" fill="none" strokeDasharray="6,3" markerEnd="url(#arrowBlue)" />
              <rect x="380" y="90" width="130" height="28" rx="6" fill={activeEl === "ventilation" ? THEME.accent.blue : "#0e1e3a"} stroke={THEME.accent.blue} strokeWidth="1.5" />
              <text x="445" y="109" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">Szellőzés 20-30%</text>
            </g>
            {/* Floor */}
            <g onClick={() => setActiveEl("floor")} style={{ cursor: "pointer" }}>
              <rect x="130" y="370" width="440" height="18" rx="0" fill={activeEl === "floor" ? "#1a2a20" : "#0e1a14"} stroke={THEME.accent.teal} strokeWidth="1.5" />
              <path d="M350,388 L350,410" stroke={THEME.accent.teal} strokeWidth="3" markerEnd="url(#arrowTeal)" />
              <text x="350" y="415" textAnchor="middle" fill={THEME.accent.teal} fontSize="11" fontWeight="600" dy="5">Padló/alap 5-10%</text>
            </g>
            {/* Formula box */}
            <g onClick={() => setActiveEl("formula")} style={{ cursor: "pointer" }}>
              <rect x="20" y="340" width="95" height="40" rx="8" fill={activeEl === "formula" ? THEME.accent.purple : "#1a1030"} stroke={THEME.accent.purple} strokeWidth="1.5" />
              <text x="67" y="357" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">Q = U·A·ΔT</text>
              <text x="67" y="372" textAnchor="middle" fill={THEME.accent.purple} fontSize="9">Képlet</text>
            </g>
            {/* Total box */}
            <g onClick={() => setActiveEl("total")} style={{ cursor: "pointer" }}>
              <rect x="570" y="340" width="120" height="40" rx="8" fill={activeEl === "total" ? THEME.accent.green : "#0e1a14"} stroke={THEME.accent.green} strokeWidth="1.5" />
              <text x="630" y="357" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">Σ 4-8 kW</text>
              <text x="630" y="372" textAnchor="middle" fill={THEME.accent.green} fontSize="9">(jól szigetelt)</text>
            </g>
            {/* Arrow markers */}
            <defs>
              <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0,0 8,3 0,6" fill={THEME.accent.red} /></marker>
              <marker id="arrowOrange" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0,0 8,3 0,6" fill={THEME.accent.orange} /></marker>
              <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0,0 8,3 0,6" fill={THEME.accent.blue} /></marker>
              <marker id="arrowTeal" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0,0 8,3 0,6" fill={THEME.accent.teal} /></marker>
            </defs>
          </svg>
        </DiagramWrapper>
      )}
      {subTab === "rating" && (
        <DiagramWrapper>
          <svg viewBox="0 0 700 380" style={{ width: "100%" }}>
            <text x="350" y="18" fill="#475569" fontSize="8" fontFamily="monospace" textAnchor="middle">kWh/m²a = éves energiaigény négyzetméterenként (alacsonyabb = energiahatékonyabb)</text>
            {/* Energy rating scale */}
            {[
              { id: "aa", label: "AA", range: "< 40", color: "#16a34a", w: 160, y: 30 },
              { id: "bb", label: "BB", range: "40-80", color: "#84cc16", w: 220, y: 80 },
              { id: "cc", label: "CC", range: "80-120", color: "#eab308", w: 280, y: 130 },
              { id: "dd_jj", label: "DD", range: "120-160", color: "#f97316", w: 340, y: 180 },
              { id: "dd_jj", label: "EE-FF", range: "160-250", color: "#ef4444", w: 430, y: 230 },
              { id: "dd_jj", label: "GG-JJ", range: "250-500+", color: "#991b1b", w: 520, y: 280 },
            ].map((bar, i) => (
              <g key={i} onClick={() => setActiveEl(bar.id)} style={{ cursor: "pointer" }}>
                <rect x="50" y={bar.y} width={bar.w} height="38" rx="6" fill={activeEl === bar.id ? bar.color : bar.color + "33"} stroke={bar.color} strokeWidth="2" />
                <text x="70" y={bar.y + 24} fill="#fff" fontSize="14" fontWeight="800">{bar.label}</text>
                <text x={bar.w + 30} y={bar.y + 24} fill={THEME.text.body} fontSize="12">{bar.range} kWh/m²a</text>
              </g>
            ))}
            {/* Scale explanation */}
            <g onClick={() => setActiveEl("scale")} style={{ cursor: "pointer" }}>
              <rect x="440" y="30" width="230" height="80" rx="10" fill={activeEl === "scale" ? "#1e293b" : "#111827"} stroke={THEME.accent.blue} strokeWidth="1.5" />
              <text x="555" y="55" textAnchor="middle" fill={THEME.accent.blue} fontSize="13" fontWeight="700">Energiaosztály skála</text>
              <text x="555" y="75" textAnchor="middle" fill={THEME.text.secondary} fontSize="11">AA = legjobb → JJ = legrosszabb</text>
              <text x="555" y="93" textAnchor="middle" fill={THEME.text.secondary} fontSize="11">Új építés: min. BB (2022~)</text>
            </g>
            {/* Arrow showing "new build minimum" */}
            <line x1="400" y1="55" x2="280" y2="55" stroke={THEME.accent.green} strokeWidth="2" strokeDasharray="4,3" />
            <text x="340" y="48" textAnchor="middle" fill={THEME.accent.green} fontSize="9" fontWeight="700">ÚJ ÉPÍTÉS CÉL</text>
            {/* Cost indicator */}
            <text x="600" y="200" fill={THEME.text.muted} fontSize="11" textAnchor="middle">Éves fűtésköltség</text>
            <text x="600" y="220" fill={THEME.accent.green} fontSize="11" textAnchor="middle">AA: ~200-400e Ft</text>
            <text x="600" y="240" fill={THEME.accent.amber} fontSize="11" textAnchor="middle">CC: ~700e-1M Ft</text>
            <text x="600" y="260" fill={THEME.accent.red} fontSize="11" textAnchor="middle">FF+: 1,5-3M+ Ft</text>
            {/* Magyar átlag */}
            <rect x="440" y="290" width="230" height="50" rx="8" fill="#1c1111" stroke={THEME.accent.red} strokeWidth="1.5" strokeDasharray="4,3" />
            <text x="555" y="312" textAnchor="middle" fill={THEME.accent.red} fontSize="11" fontWeight="700">Magyar lakásállomány ~70%</text>
            <text x="555" y="330" textAnchor="middle" fill={THEME.text.muted} fontSize="10">DD vagy rosszabb kategória</text>
          </svg>
        </DiagramWrapper>
      )}
      {subTab === "certificate" && (
        <DiagramWrapper>
          <svg viewBox="0 0 700 440" style={{ width: "100%" }}>
            {/* Stylized certificate */}
            <rect x="100" y="20" width="500" height="400" rx="12" fill="#111827" stroke="#334155" strokeWidth="2" />
            <rect x="110" y="30" width="480" height="380" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            {/* Header section */}
            <g onClick={() => setActiveEl("header")} style={{ cursor: "pointer" }}>
              <rect x="130" y="45" width="440" height="60" rx="8" fill={activeEl === "header" ? "#1e293b" : "#0a0e1a"} stroke={THEME.accent.blue} strokeWidth="1.5" />
              <text x="350" y="70" textAnchor="middle" fill={THEME.accent.blue} fontSize="14" fontWeight="800">ENERGETIKAI TANÚSÍTVÁNY</text>
              <text x="350" y="90" textAnchor="middle" fill={THEME.text.muted} fontSize="10">Épület: Minta u. 1. | Hrsz: 12345 | Alapterület: 120 m²</text>
            </g>
            {/* Rating display */}
            <g onClick={() => setActiveEl("rating_field")} style={{ cursor: "pointer" }}>
              <rect x="130" y="120" width="200" height="100" rx="10" fill={activeEl === "rating_field" ? "#0a2a1a" : "#0a0e1a"} stroke={THEME.accent.green} strokeWidth="2" />
              <text x="230" y="150" textAnchor="middle" fill={THEME.accent.green} fontSize="36" fontWeight="900">AA</text>
              <text x="230" y="175" textAnchor="middle" fill={THEME.text.body} fontSize="11">38 kWh/m²/év</text>
              <text x="230" y="195" textAnchor="middle" fill={THEME.text.muted} fontSize="9">fajlagos fűtési energiaigény</text>
            </g>
            {/* Mini scale */}
            {["#16a34a","#84cc16","#eab308","#f97316","#ef4444","#991b1b"].map((c, i) => (
              <rect key={i} x={350 + i * 30} y="130" width="26" height="14" rx="2" fill={c} opacity={i === 0 ? 1 : 0.4} />
            ))}
            <text x="440" y="160" textAnchor="middle" fill={THEME.text.muted} fontSize="9">AA BB CC DD EE+ GG+</text>
            {/* Breakdown */}
            <g onClick={() => setActiveEl("breakdown")} style={{ cursor: "pointer" }}>
              <rect x="130" y="235" width="440" height="70" rx="8" fill={activeEl === "breakdown" ? "#1e293b" : "#0a0e1a"} stroke={THEME.accent.amber} strokeWidth="1.5" />
              <text x="150" y="257" fill={THEME.accent.amber} fontSize="12" fontWeight="700">Energiamérleg részletezés</text>
              <text x="150" y="275" fill={THEME.text.secondary} fontSize="10">Fal: 18% | Tető: 22% | Padló: 8% | Nyílászáró: 16%</text>
              <text x="150" y="292" fill={THEME.text.secondary} fontSize="10">Szellőzés: 28% | Hőhidak: 8% | Rendszer hat.fok: 350%</text>
            </g>
            {/* Recommendations */}
            <g onClick={() => setActiveEl("recommendations")} style={{ cursor: "pointer" }}>
              <rect x="130" y="318" width="440" height="45" rx="8" fill={activeEl === "recommendations" ? "#1e1030" : "#0a0e1a"} stroke={THEME.accent.purple} strokeWidth="1.5" />
              <text x="150" y="338" fill={THEME.accent.purple} fontSize="12" fontWeight="700">Felújítási javaslatok</text>
              <text x="150" y="354" fill={THEME.text.secondary} fontSize="10">1. Nyílászáró csere → 15% javulás | 2. Tető szigetelés → 20% javulás</text>
            </g>
            {/* Who */}
            <g onClick={() => setActiveEl("who")} style={{ cursor: "pointer" }}>
              <rect x="130" y="375" width="440" height="28" rx="6" fill={activeEl === "who" ? "#1a2a1e" : "#0a0e1a"} stroke={THEME.accent.teal} strokeWidth="1" />
              <text x="350" y="394" textAnchor="middle" fill={THEME.accent.teal} fontSize="10" fontWeight="600">Tanúsító: MMK jogosult energetikus | Díj: 50-150e Ft | Érvényesség: 10 év</text>
            </g>
          </svg>
        </DiagramWrapper>
      )}
      <PhotoSection searchQuery="energetikai tanúsítvány épület" images={[
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Energieausweis-Muster.png/220px-Energieausweis-Muster.png", alt: "Energetikai tanúsítvány", caption: "Energetikai tanúsítvány minta" }
      ]} />
      {activeEl && details[activeEl] && <DetailPanel color={details[activeEl].color} title={details[activeEl].title} detail={details[activeEl].detail} />}
      <ClickHint />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TILING DIAGRAM — Burkolás lépései
   ═══════════════════════════════════════════════════════════════ */
function TilingDiagram() {
  const [activeEl, setActiveEl] = useState(null);
  const details = {
    prep: { title: "1. Felületelőkészítés", color: THEME.accent.blue, detail: "Az aljzatnak száraznak, pormentesnek, szilárdnak és síknak kell lennie. Cement esztrich: min. 28 nap száradás (CM mérés ≤ 2%). Anhidrit esztrich: ≤ 0,5% CM. Régi csempe eltávolítása VAGY tapadóhíd (Mapei Eco Prim Grip). Önterülő kiegyenlítő: max ±2 mm/2m szabály. Padlófűtésnél: felfűtési protokoll kötelező (fokozatos, 1 hét)!" },
    waterproof: { title: "2. Vízszigetelés", color: THEME.accent.teal, detail: "Nedves helyiségekben (fürdő, konyha) KÖTELEZŐ! Kenhető vízszigetelés: Mapelastic AquaDefense, Ceresit CL 51. Minimum 2 réteg, keresztben kenve. Erősítő szalag: sarkok, csőáttörések, padló-fal találkozás. Kád/zuhanyzó mögött teljes falmagasságig! Száradás: 4-24 óra rétegenként." },
    adhesive: { title: "3. Ragasztás", color: THEME.accent.amber, detail: "Ragasztó típusa a burkolat méretétől függ! ≤30×30 cm: C1 (normál cement). 30-60 cm: C2 (flexibilis, S1). ≥60 cm: C2TE S2 (gyorskötő, erősen flexibilis). Fésűméret: 6-8-10-12 mm a lapméret szerint. NAGYON FONTOS: nagy lapnál (60×60+) kétoldali ragasztás (buttering-floating) kötelező — mind az aljzatra, mind a lap hátoldalára!" },
    laying: { title: "4. Laprakás", color: THEME.accent.green, detail: "Keresztek vagy ékkiegyenlítő (SVP/nivelláló) rendszer használata. Fugaméret: rektifikált lapnál min. 2 mm, normálnál 3-5 mm. Kötéskép: fél-kötésben max. 33% eltolás (nagy lapnál!), mert az ún. lippage (szintkülönbség) a hajlítás miatt romlik. Falkezdés: egész lappal, vágott a sarokba. Padló: szoba közepéről kiindulva szimmetrikusan." },
    grouting: { title: "5. Fugázás", color: THEME.accent.purple, detail: "Ragasztó kötése után (min. 24 óra, C2TE: 4-8 óra). Cement fuga: max 6 mm szélesség, normál igénybevételhez. Epoxy fuga: konyha, fürdő, medence — vízálló, foltálló, de drágább és nehezebb feldolgozni. Átlós mozdulatokkal, gumilehúzóval (simító). Felesleg eltávolítása nedves szivaccsal 15-20 perc után. Teljes terhelés: 7 nap." },
    silicone: { title: "6. Szilikon dilatáció", color: THEME.accent.pink, detail: "Fal-padló találkozás, sarok, kád/zuhanyzó széle, küszöb, ajtókeret: MINDIG szilikon, SOHA nem cementfuga! Szaniter szilikon penészgátlóval (fürdőben). Neutrális szilikon fémhez, kőhöz. Fugaszalag (maszkoló) a szélekre a szép egyenes vonalért. Szilikonpisztoly 45°-ban, egyenletes húzással." },
    largeformat: { title: "Nagyformátumú lapok (60×120+)", color: THEME.accent.orange, detail: "Különleges odafigyelést igényel! Tökéletesen sík aljzat (önterülő kötelező). C2TE S2 ragasztó, 10-12 mm fésűvel, kétoldali ragasztás. Szállítókorongok a mozgatáshoz. Lapszintező (nivelláló) rendszer KÖTELEZŐ a lippage elkerülésére. Kötéskép: max 20-25% eltolás vagy paralel rakás. Nagyobb törési kockázat — vigyázat a szállításnál!" },
    floorheat: { title: "Padlófűtéses burkolás", color: THEME.accent.red, detail: "Felfűtési protokoll a ragasztás ELŐTT: fokozatosan növelve a hőmérsékletet 1 héten át, majd kikapcsolva, és lehűtve. Ragasztó: C2 S1 vagy S2 (flexibilis, hőálló). Dilatáció minden ajtónál és 25-40 m² felett. A fuga SOHA nem merev — szilikon dilatáció! Burkolat hőellenállása: max 0,15 m²K/W (kerámia jó, fa rossz)." },
    tools: { title: "Szükséges szerszámok", color: THEME.accent.cyan, detail: "Fogazott glettvas (6/8/10/12 mm), szintező léc (2m), vizes lapvágó (kézi: egyenes, elektromos: L/U vágáshoz), fugakereszt, nivelláló klipsz+ék, gumi simító/lehúzó, szivacs, keverővödör, keverőszár (fúrógépbe), szilikonpisztoly, maszkolószalag, kréta/ceruza, mérőszalag. Nagy lapoknál: szívókorongos emelő (2 db)." },
    mistakes: { title: "Gyakori hibák", color: THEME.accent.red, detail: "1) Nincs vízszigetelés a zuhanyzóban → penész, beázás. 2) Rossz ragasztó nagy laphoz → leválás. 3) Nem kétoldali ragasztás → üreges hangú lap, törésveszély. 4) Cement fuga a sarokba → megreped. 5) Nincs felfűtési protokoll → ragasztó leválik. 6) Túl keskeny fuga (1 mm) → tágulás miatti felpúposodás. 7) Egyenlőtlen ragasztó → lippage. 8) Fugázás túl korán → elszíneződés." },
  };
  return (
    <div>
      <DiagramWrapper>
        <svg viewBox="0 0 760 340" style={{ width: "100%" }}>
          {/* Horizontal 6-step process */}
          {[
            { id: "prep", x: 15, label: "Előkészítés", icon: "🧹", time: "1-7 nap", color: THEME.accent.blue },
            { id: "waterproof", x: 135, label: "Vízszigetelés", icon: "💧", time: "1-2 nap", color: THEME.accent.teal },
            { id: "adhesive", x: 255, label: "Ragasztás", icon: "🪣", time: "—", color: THEME.accent.amber },
            { id: "laying", x: 375, label: "Laprakás", icon: "🔲", time: "2-5 nap", color: THEME.accent.green },
            { id: "grouting", x: 495, label: "Fugázás", icon: "🖌️", time: "1 nap", color: THEME.accent.purple },
            { id: "silicone", x: 625, label: "Szilikon", icon: "🔧", time: "1 nap", color: THEME.accent.pink },
          ].map((step, i) => (
            <g key={step.id} onClick={() => setActiveEl(step.id)} style={{ cursor: "pointer" }}>
              {/* Step card */}
              <rect x={step.x} y="40" width="105" height="150" rx="10" fill={activeEl === step.id ? step.color + "33" : "#111827"} stroke={step.color} strokeWidth={activeEl === step.id ? 2.5 : 1.5} />
              {/* Step number */}
              <circle cx={step.x + 52} cy="20" r="16" fill={step.color} />
              <text x={step.x + 52} y="25" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800">{i + 1}</text>
              {/* Icon */}
              <text x={step.x + 52} y="85" textAnchor="middle" fontSize="28">{step.icon}</text>
              {/* Label */}
              <text x={step.x + 52} y="115" textAnchor="middle" fill={THEME.text.heading} fontSize="11" fontWeight="700">{step.label}</text>
              {/* Drying time */}
              <text x={step.x + 52} y="140" textAnchor="middle" fill={THEME.text.muted} fontSize="9">Idő: {step.time}</text>
              {/* Connector arrow */}
              {i < 5 && <path d={`M${step.x + 110},115 L${step.x + 130},115`} stroke="#334155" strokeWidth="2" markerEnd="url(#arrowGray)" />}
            </g>
          ))}
          {/* Bottom extras row */}
          {[
            { id: "largeformat", x: 50, label: "🔳 Nagyformátumú lapok", color: THEME.accent.orange },
            { id: "floorheat", x: 245, label: "🔥 Padlófűtés + burkolat", color: THEME.accent.red },
            { id: "tools", x: 440, label: "🧰 Szerszámok", color: THEME.accent.cyan },
            { id: "mistakes", x: 600, label: "⚠️ Hibák", color: THEME.accent.red },
          ].map((extra) => (
            <g key={extra.id} onClick={() => setActiveEl(extra.id)} style={{ cursor: "pointer" }}>
              <rect x={extra.x} y="230" width={extra.id === "mistakes" ? 110 : 150} height="36" rx="8" fill={activeEl === extra.id ? extra.color + "22" : "#111827"} stroke={extra.color} strokeWidth="1.5" />
              <text x={extra.x + (extra.id === "mistakes" ? 55 : 75)} y="253" textAnchor="middle" fill={extra.color} fontSize="11" fontWeight="600">{extra.label}</text>
            </g>
          ))}
          {/* Timeline bar at bottom */}
          <rect x="15" y="290" width="730" height="20" rx="6" fill="#1e293b" />
          <rect x="15" y="290" width="100" height="20" rx="6" fill={THEME.accent.blue + "44"} />
          <rect x="115" y="290" width="90" height="20" rx="0" fill={THEME.accent.teal + "44"} />
          <rect x="205" y="290" width="140" height="20" rx="0" fill={THEME.accent.green + "44"} />
          <rect x="345" y="290" width="60" height="20" rx="0" fill={THEME.accent.purple + "44"} />
          <rect x="405" y="290" width="50" height="20" rx="0" fill={THEME.accent.pink + "44"} />
          <rect x="455" y="290" width="290" height="20" rx="6" fill="#22c55e11" />
          <text x="600" y="304" textAnchor="middle" fill={THEME.text.muted} fontSize="9">Járható: 24-48 óra | Teljes terhelés: 7 nap</text>
          <text x="15" y="330" fill={THEME.text.muted} fontSize="10">Összesen: kb. 5-14 nap (mérettől és száradástól függően)</text>
          <defs>
            <marker id="arrowGray" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0,0 8,3 0,6" fill="#334155" /></marker>
          </defs>
        </svg>
      </DiagramWrapper>
      <PhotoSection searchQuery="csemperagasztás burkolás járólap" images={[
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Fliesenleger_bei_der_Arbeit.jpg/320px-Fliesenleger_bei_der_Arbeit.jpg", alt: "Burkolás", caption: "Burkoló csemperagasztás közben" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Tile_grout.jpg/320px-Tile_grout.jpg", alt: "Fugázás", caption: "Csempe fugázás" }
      ]} />
      {activeEl && details[activeEl] && <DetailPanel color={details[activeEl].color} title={details[activeEl].title} detail={details[activeEl].detail} />}
      <ClickHint />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPARISON DIAGRAM — Összehasonlítások
   ═══════════════════════════════════════════════════════════════ */
function ComparisonDiagram() {
  const [subTab, setSubTab] = useState("insulation");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [
    { id: "insulation", label: "🧱 Szigetelés" },
    { id: "glass", label: "🪟 Üvegezés" },
    { id: "foundation_cmp", label: "🧱 Alapozás" },
    { id: "screed", label: "🔲 Esztrich" },
    { id: "pipes", label: "🔧 Csövek" },
    { id: "heating", label: "🔥 Fűtés" },
    { id: "roofing", label: "🏗️ Tető" },
  ];
  const tableCfg = {
    insulation: {
      headers: ["Tulajdonság", "EPS", "Grafit EPS", "Kőzetgyapot", "XPS", "Üveggyapot"],
      rows: [
        { prop: "Lambda λ (W/mK) — kisebb = jobb", vals: ["0,038", "0,031", "0,035", "0,033", "0,035"], colors: ["#eab308", "#22c55e", "#84cc16", "#22c55e", "#84cc16"] },
        { prop: "Ár (Ft/m², 15cm)", vals: ["2.500", "4.000", "5.500", "6.000", "2.000"], colors: ["#22c55e", "#84cc16", "#eab308", "#ef4444", "#22c55e"] },
        { prop: "Tűzosztály", vals: ["E (gyúlékony)", "E (gyúlékony)", "A1 (nem ég!)", "E (gyúlékony)", "A1 (nem ég!)"], colors: ["#ef4444", "#ef4444", "#22c55e", "#ef4444", "#22c55e"] },
        { prop: "Nyomószilárdság", vals: ["Alacsony", "Alacsony", "Közepes", "Magas (≥300kPa)", "Alacsony"], colors: ["#eab308", "#eab308", "#84cc16", "#22c55e", "#eab308"] },
        { prop: "Páraáteresztés", vals: ["Rossz", "Rossz", "Kiváló", "Rossz", "Kiváló"], colors: ["#ef4444", "#ef4444", "#22c55e", "#ef4444", "#22c55e"] },
        { prop: "Alkalmazás", vals: ["Homlokzat", "Homlokzat", "Homl.+tető", "Talaj, lábazat", "Tető, válaszfal"], colors: ["#3b82f6", "#3b82f6", "#3b82f6", "#3b82f6", "#3b82f6"] },
      ],
      details: {
        eps: { title: "EPS (expandált polisztirol)", color: THEME.accent.amber, detail: "A legolcsóbb és legelterjedtebb homlokzati szigetelés. Lambda (λ): 0,038 W/mK (hővezetési tényező — minél kisebb, annál jobb szigetelő). Könnyű, jól megmunkálható. Hátránya: gyúlékony (E osztály), ezért 3 emelet felett kőzetgyapot sáv kötelező. Nem páraáteresztő — belülről légzáró réteget igényel. NEM alkalmas lábazatra vagy talajra (vízfelvétel). 15-20 cm vastagság ajánlott (AA osztályhoz)." },
        grafit: { title: "Grafit EPS (grafitos polisztirol)", color: THEME.accent.green, detail: "Az EPS fejlettebb változata grafit adalékkal. Lambda: 0,031 — ez 20%-kal jobb, mint a sima EPS! 12 cm grafit EPS ≈ 15 cm normál EPS hőszigetelő képesség. Sötétszürke színe miatt napfénytől védeni kell a beépítés előtt (nem szabad a tűző napon tárolni). Ára ~60%-kal magasabb, de vékonyabb réteg kell. Homlokzatra kiváló." },
        rockwool: { title: "Kőzetgyapot (ásványgyapot)", color: "#84cc16", detail: "A1 tűzosztály — NEM ÉG! Ez a fő előnye. Lambda: 0,035 (kicsit rosszabb, mint grafit EPS). Kiváló páraáteresztő — a fal \"lélegzik\". Kötelező: 3 emelet feletti homlokzaton, minden szintközi fal-tető csomópontnál. Tetőszigeteléshez a legjobb (szarufák közé). Hátránya: drágább, nehezebb, nedvességre érzékeny (párnyomás kerüljön a külső oldalra)." },
        xps: { title: "XPS (extrudált polisztirol)", color: THEME.accent.blue, detail: "Rendkívül nyomásálló (≥300 kPa) és zárt cellás — gyakorlatilag nem vesz fel vizet! Ezért ideális: lábazat (talapzat), talajra fektetett lemezalap alá, lapostető (járható), peremeknél. Lambda: 0,033. Hátrány: drága, nem páraáteresztő, homlokzatra overkill. Zöld/kék/rózsaszín színe alapján felismerhető. Mindig ragasztva+dübelezve rögzítendő." },
        uveggyapot: { title: "Üveggyapot (glass wool)", color: "#84cc16", detail: "Hővezetési tényező (λ — minél kisebb, annál jobb szigetelő): 0,035 W/mK. A legolcsóbb ásványgyapot-típus. A1 tűzosztály — NEM ÉG! Kiváló hangszigetelő (tetőtérben, válaszfalban a legjobb ár/érték arány). Nedvességre érzékeny — páranyomás a külső oldalra kerüljön! Könnyű (~15-25 kg/m³). Előny: olcsó, tűzálló, kiváló hangszigetelés. Hátrány: nedvességérzékeny, szálak irritálhatják a bőrt/tüdőt (védőfelszerelés!). Felhasználás: tetőszigetelés (szarufák közt), gipszkarton válaszfal kitöltés, födémszigetelés." },
      },
    },
    glass: {
      headers: ["Tulajdonság", "2 réteg", "3 réteg"],
      rows: [
        { prop: "Ug — üveg hőátbocsátása (W/m²K)", vals: ["1,0-1,1", "0,5-0,6"], colors: ["#eab308", "#22c55e"] },
        { prop: "Uw — teljes ablak (W/m²K)", vals: ["1,2-1,4", "0,7-0,9"], colors: ["#eab308", "#22c55e"] },
        { prop: "Ár (többlet)", vals: ["alap", "+15-25%"], colors: ["#22c55e", "#eab308"] },
        { prop: "Súly", vals: ["~20 kg/m²", "~30 kg/m²"], colors: ["#22c55e", "#eab308"] },
        { prop: "Hangszigetelés (Rw dB — magasabb = jobb)", vals: ["Rw 30-32 dB", "Rw 33-36 dB"], colors: ["#eab308", "#22c55e"] },
        { prop: "g-érték (naphő-áteresztés 0-1)", vals: ["g=0,60", "g=0,50"], colors: ["#eab308", "#22c55e"] },
      ],
      details: {
        double: { title: "Kétrétegű üvegezés", color: THEME.accent.amber, detail: "Ug ≈ 1,0-1,1 W/m²K. 2022-es előírásoknak már NEM felel meg új építésnél (max Uw ≤ 1,15 szükséges). Felújításnál még elfogadható, ha a keret jó minőségű. Előny: olcsóbb, könnyebb, meglévő keretbe beépíthető. Hátrány: kondenzáció veszélye hideg éjszakákon, magasabb fűtésköltség." },
        triple: { title: "Háromrétegű üvegezés", color: THEME.accent.green, detail: "Ug ≈ 0,5-0,6 W/m²K (üveg hőátbocsátása — alacsonyabb = jobb). Új építésnél ez a SZABVÁNY. Két argon/krypton töltésű kamra. Meleg-peremes (warm-edge) távtartó: ψ ≤ 0,04 W/mK (hőhíd veszteségi tényező — alacsonyabb = jobb). Súlyosabb (~50%), ezért erősebb vasalat kell. Megtérülés: 5-10 év vs kétrétegű. Délre néző ablaknál: g-értékre figyelj (napenergia-áteresztés 0-1 skálán, alacsonyabb = kevesebb naphő jut be)." },
      },
    },
    foundation_cmp: {
      headers: ["Tulajdonság", "Sávalap", "Lemezalap"],
      rows: [
        { prop: "Mélység", vals: ["80-120 cm", "25-35 cm"], colors: ["#eab308", "#22c55e"] },
        { prop: "Ár (Ft/m²)", vals: ["15-25e", "20-35e"], colors: ["#22c55e", "#eab308"] },
        { prop: "Földmunka", vals: ["Sok (árokásás)", "Kevés (tereprendezés)"], colors: ["#ef4444", "#22c55e"] },
        { prop: "Talajigény", vals: ["Jó teherbírás kell", "Bármilyen talaj"], colors: ["#eab308", "#22c55e"] },
        { prop: "Fagyvédelem", vals: ["Fagymentes mélyítés", "Perem XPS védi"], colors: ["#eab308", "#22c55e"] },
        { prop: "Pincelehetőség", vals: ["Igen", "Nem"], colors: ["#22c55e", "#ef4444"] },
      ],
      details: {
        strip: { title: "Sávalap (talpgerenda-alap)", color: THEME.accent.amber, detail: "Hagyományos megoldás: falak alatt futó beton sáv, 40-60 cm széles, 80-120 cm mély (fagymentes). Előny: pincével kombinálható, kisebb betonigény. Hátrány: sok földmunka, talajvíz esetén drága vízszigetelés. Jó talajhoz (kavics, homok, szilárd agyag). Rossz talajnál (duzzadó agyag, feltöltés) kockázatos — lemezalap biztonságosabb." },
        slab: { title: "Lemezalap (alaplemez)", color: THEME.accent.green, detail: "Modern megoldás: összefüggő vasbeton lemez az egész ház alatt. 25-35 cm vastag, peremgerenda az széleken. Előny: bármilyen talajon működik (teher eloszlik), kevés földmunka, gyors, padlófűtés alapvezeték belefektethető. Hátrány: több beton/vasalás kell, pince nem építhető alá. FONTOS: alá XPS szigetelés (legalább 10 cm, ≥300 kPa) és PE fólia." },
      },
    },
    screed: {
      headers: ["Tulajdonság", "Cement", "Anhidrit"],
      rows: [
        { prop: "Száradás (cm/hét)", vals: ["1 cm/hét", "1 cm/nap (első 4cm)"], colors: ["#ef4444", "#22c55e"] },
        { prop: "Zsugorodás", vals: ["Jelentős", "Nincs"], colors: ["#ef4444", "#22c55e"] },
        { prop: "Padlófűtéshez", vals: ["Megfelelő", "Kiváló (jobb hővezetés)"], colors: ["#84cc16", "#22c55e"] },
        { prop: "Max vastagság", vals: ["Korlátlan", "Max 6-8 cm"], colors: ["#22c55e", "#eab308"] },
        { prop: "Nedves helyiség", vals: ["Igen", "Nem (vízérzékeny)"], colors: ["#22c55e", "#ef4444"] },
        { prop: "Csiszolás", vals: ["Nem kell", "3-7 nap múlva kötelező!"], colors: ["#22c55e", "#eab308"] },
      ],
      details: {
        cement: { title: "Cement esztrich", color: THEME.accent.amber, detail: "Hagyományos, univerzális megoldás. Száradás: 1 cm/hét szabály (6 cm = 6 hét!). Zsugorodási repedés veszélye — dilatáció ajtóknál, 25-40 m² felett. Nedves helyiségben (fürdő, konyha, garázs) kötelezően ez kell. Padlófűtésnél jól működik, de lassabb melegátadás, mint anhidrit. CM mérés burkolás előtt: ≤ 2,0% (fűtés nélkül) / ≤ 1,8% (padlófűtéssel)." },
        anhydrite: { title: "Anhidrit (kalcium-szulfát) esztrich", color: THEME.accent.green, detail: "Öntött, önterülő esztrich. Rendkívül sík felület (±2 mm/2 m). Nincs zsugorodás → nincs repedés! Padlófűtéssel KIVÁLÓ: vékonyabb réteggel (4-5 cm) is jó, és gyorsabban melegít. HÁTRÁNY: vízérzékeny → fürdőszobában nem használható! 3-7 nap után CSISZOLNI KELL (felszíni réteget eltávolítani). CM mérés: ≤ 0,5%. Drágább, mint a cement esztrich." },
      },
    },
    pipes: {
      headers: ["Tulajdonság", "PPR", "PEX-AL-PEX", "PEX"],
      rows: [
        { prop: "Tágulás", vals: ["Nagy!", "Minimális", "Közepes"], colors: ["#ef4444", "#22c55e", "#eab308"] },
        { prop: "Kötés", vals: ["Hegesztés", "Préselt idom", "Préselt idom"], colors: ["#22c55e", "#eab308", "#eab308"] },
        { prop: "Hajlíthatóság", vals: ["Merev", "Jól hajlítható", "Nagyon hajlékony"], colors: ["#ef4444", "#84cc16", "#22c55e"] },
        { prop: "Oxigéndiffúzió", vals: ["Van", "Nincs (Al réteg)", "Barrierrel nincs"], colors: ["#ef4444", "#22c55e", "#22c55e"] },
        { prop: "Ár", vals: ["Olcsó", "Közepes", "Közepes"], colors: ["#22c55e", "#eab308", "#eab308"] },
        { prop: "Padlófűtéshez", vals: ["NEM!", "Igen", "LEGJOBB"], colors: ["#ef4444", "#22c55e", "#22c55e"] },
      ],
      details: {
        ppr: { title: "PPR (polipropilén) cső", color: THEME.accent.blue, detail: "Zöld vagy szürke merev cső, hegesztett kötésekkel. Olcsó és megbízható HIDEG-MELEG VÍZRE. Hátránya: nagy hőtágulás → kompenzátorok kellenek, merev → sok idom, NEM alkalmas padlófűtésre! Fűtési vezetéknek sem ideális (oxigéndiffúzió korróziót okoz a fém alkatrészekben). Nyílt vezetéknek jó, fal alá kevésbé." },
        pex_al: { title: "PEX-AL-PEX (többrétegű) cső", color: THEME.accent.green, detail: "PEX belső + alumínium réteg + PEX külső. Előny: minimális tágulás (alumínium stabilizál), hajlítható (formáját tartja), nincs oxigéndiffúzió. Préselt idomokkal kötve — gyors szerelés. Padlófűtésre és fűtésre kiváló. Fal alá, esztrichbe betongolható. Hátrány: idomok drágábbak, présgép szükséges (bérelj vagy szereztess szakemberrel)." },
        pex: { title: "PEX (térhálósított polietilén) cső", color: THEME.accent.teal, detail: "Rendkívül hajlékony, tekercsben kapható. PEX-a (Engel), PEX-b (szilán), PEX-c (besugárzás) — mind jó. Padlófűtéshez a LEGJOBB: egy tekercsből körívenként egy csővezeték, kötés nélkül! Oxigénbarrier-réteg kötelező fűtéshez. Préselt vagy szorítógyűrűs idomok. Hőálló (95°C-ig), fagytűrő. Hátrány: nem tartja a hajlított formáját, mint a PEX-AL-PEX." },
      },
    },
    heating: {
      headers: ["Tulajdonság", "Hőszivattyú (levegő-víz)", "Kondenzációs gázkazán"],
      rows: [
        { prop: "Beruházási költség", vals: ["2-4M Ft", "500k-1.2M Ft"], colors: ["#ef4444", "#22c55e"] },
        { prop: "Éves üzemeltetés (120m²)", vals: ["150-300k Ft", "250-500k Ft"], colors: ["#22c55e", "#ef4444"] },
        { prop: "COP / Hatásfok (1 kW-ból hány kW hő)", vals: ["COP 3-5 (SCOP 3-4)", "97-109%"], colors: ["#22c55e", "#84cc16"] },
        { prop: "Karbantartás", vals: ["Évi 30-60k Ft", "Évi 20-40k Ft + kéményseprő"], colors: ["#84cc16", "#eab308"] },
        { prop: "Élettartam", vals: ["15-20 év", "15-20 év"], colors: ["#22c55e", "#22c55e"] },
        { prop: "Hűtés lehetőség", vals: ["Igen (fan-coil/padló)", "Nem"], colors: ["#22c55e", "#ef4444"] },
        { prop: "CO₂ kibocsátás", vals: ["Alacsony (villany)", "Közepes (gáz)"], colors: ["#22c55e", "#eab308"] },
        { prop: "CSOK/zöld hitel", vals: ["Könnyebb AA-t elérni", "Nehezebb AA-t elérni"], colors: ["#22c55e", "#eab308"] },
      ],
      details: {
        heatpump: { title: "Hőszivattyú (levegő-víz)", color: THEME.accent.green, detail: "2024-25-ben a LEGJOBB választás új építéshez. A beruházás drágább, de éves szinten 30-50%-kal olcsóbb, mint a gáz. Hűtésre is alkalmas (nyáron a padlófűtést hűtésre is használhatod). AA energiaosztály könnyebben elérhető → zöld hitel. Hátrány: kültéri egység hangos lehet (35-55 dB), hidegben COP csökken. Megtérülés gázhoz képest: 5-8 év." },
        gasboiler: { title: "Kondenzációs gázkazán", color: THEME.accent.amber, detail: "Olcsóbb beruházás, de drágább üzemeltetés. 2024-ben a gázár emelkedése miatt egyre kevésbé gazdaságos. Előny: egyszerű, bevált technológia, kis helyen elfér, nincs kültéri egység. Hátrány: fosszilis üzemanyag (CO₂), gázcsatlakozás díja (200-600k Ft), kéményseprő kötelező (évi 10-20k Ft). ÚJ ÉPÍTÉSNÉL egyre ritkább — a hőszivattyú gazdaságosabb." },
      },
    },
    roofing: {
      headers: ["Tulajdonság", "Betoncserép", "Fémlemez (Lindab)", "Bitumenes zsindely"],
      rows: [
        { prop: "Ár (Ft/m²)", vals: ["4-8k", "5-10k", "3-6k"], colors: ["#22c55e", "#eab308", "#22c55e"] },
        { prop: "Súly (kg/m²)", vals: ["40-50", "4-6", "8-12"], colors: ["#ef4444", "#22c55e", "#22c55e"] },
        { prop: "Élettartam", vals: ["50-80 év", "30-50 év", "20-30 év"], colors: ["#22c55e", "#84cc16", "#eab308"] },
        { prop: "Hanghatás (eső)", vals: ["Csendes", "Hangos!", "Csendes"], colors: ["#22c55e", "#ef4444", "#22c55e"] },
        { prop: "Hajlásszög min.", vals: ["22-25°", "7-10°", "15-20°"], colors: ["#eab308", "#22c55e", "#84cc16"] },
        { prop: "Szín/forma választék", vals: ["Közepes", "Kiváló", "Kiváló"], colors: ["#84cc16", "#22c55e", "#22c55e"] },
        { prop: "Szerelés gyorsaság", vals: ["Lassú", "Gyors", "Közepes"], colors: ["#eab308", "#22c55e", "#84cc16"] },
      ],
      details: {
        tile: { title: "Betoncserép (Bramac, Tondach)", color: THEME.accent.amber, detail: "A leggyakoribb Magyarországon. Előny: olcsó, csendes, hatalmas színválaszték, 50-80 év élettartam. Hátrány: NEHÉZ (40-50 kg/m²) → erősebb tetőszerkezet kell, lassabb szerelés, törékeny (létrán ne lépj rá!). HÉSZ: sok település előírja a cserépfedést. Bramac Montero, Tondach Figaro a legnépszerűbbek." },
        metal: { title: "Fémlemez tetőfedés (Lindab, Ruukki)", color: THEME.accent.blue, detail: "Modern, könnyű megoldás. Előny: 4-6 kg/m² (10x könnyebb, mint cserép!), gyors szerelés, alacsony hajlásszögű tetőkhöz is. Hátrány: esőben HANGOS (hangszigetelés a pallásban), kondenzáció veszélye (alátétfólia kell), 30-50 év élettartam (korrózió a festékréteg sérülésekor). Ár: minőségfüggő — az olcsó fémlemez 10 év után lyukas!" },
        shingle: { title: "Bitumenes zsindely (IKO, Katepal)", color: THEME.accent.teal, detail: "Amerikai stílusú, rugalmas fedés. Előny: könnyű, csendes, bonyolult tetőformákra is jó (kúp, íves). Hátrány: 20-30 év élettartam (UV + fagyciklus rombolja), mohásodás, javítása nehezebb. Alá teljes deszkázás kell (OSB vagy fenyő deszka) → ez extra költség. Magyarországon RITKA — HÉSZ miatt nem mindig engedélyezett." },
      },
    },
  };
  const cfg = tableCfg[subTab];
  const colCount = cfg.headers.length;
  const colW = subTab === "pipes" || subTab === "roofing" ? 140 : subTab === "insulation" ? 110 : 180;
  const tableW = 120 + colW * (colCount - 1) + 20;
  const rowH = 32;
  const headerH = 36;
  const startY = 20;
  const svgH = startY + headerH + cfg.rows.length * rowH + 20;
  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />
      <DiagramWrapper>
        <svg viewBox={`0 0 ${Math.max(tableW, 700)} ${svgH}`} style={{ width: "100%" }}>
          {/* Header row */}
          {cfg.headers.map((h, i) => (
            <g key={i}>
              <rect x={i === 0 ? 10 : 120 + (i - 1) * colW} y={startY} width={i === 0 ? 105 : colW - 5} height={headerH} rx="6" fill="#1e293b" />
              <text x={i === 0 ? 62 : 120 + (i - 1) * colW + (colW - 5) / 2} y={startY + 22} textAnchor="middle" fill={THEME.text.heading} fontSize="11" fontWeight="700">{h}</text>
            </g>
          ))}
          {/* Data rows */}
          {cfg.rows.map((row, ri) => (
            <g key={ri}>
              <rect x="10" y={startY + headerH + ri * rowH} width="105" height={rowH - 2} rx="4" fill="#111827" />
              <text x="62" y={startY + headerH + ri * rowH + 20} textAnchor="middle" fill={THEME.text.secondary} fontSize="10" fontWeight="600">{row.prop}</text>
              {row.vals.map((val, vi) => (
                <g key={vi}>
                  <rect x={120 + vi * colW} y={startY + headerH + ri * rowH} width={colW - 5} height={rowH - 2} rx="4" fill={row.colors[vi] + "15"} stroke={row.colors[vi] + "44"} strokeWidth="1" />
                  <text x={120 + vi * colW + (colW - 5) / 2} y={startY + headerH + ri * rowH + 20} textAnchor="middle" fill={row.colors[vi]} fontSize="10">{val}</text>
                </g>
              ))}
            </g>
          ))}
          {/* Clickable detail buttons — material names */}
          {cfg.details && Object.entries(cfg.details).map(([key, d], i) => (
            <g key={key} onClick={() => setActiveEl(key)} style={{ cursor: "pointer" }}>
              <rect x={10 + i * (colW + 5)} y={svgH - 16} width={colW - 2} height="14" rx="4" fill={activeEl === key ? d.color + "44" : "#111827"} stroke={d.color} strokeWidth="1" />
              <text x={10 + i * (colW + 5) + (colW - 2) / 2} y={svgH - 6} textAnchor="middle" fill={d.color} fontSize="8" fontWeight="600">{d.title.split("(")[0].trim()}</text>
            </g>
          ))}
        </svg>
      </DiagramWrapper>
      <PhotoSection searchQuery="EPS homlokzati hőszigetelés polisztirol" images={[
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Polystyrene_insulation_board.jpg/320px-Polystyrene_insulation_board.jpg", alt: "EPS", caption: "EPS (hungarocell) hőszigetelő táblák" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Styrofoam_insulation.jpg/320px-Styrofoam_insulation.jpg", alt: "Szigetelés", caption: "Dübelezett homlokzati szigetelés" }
      ]} />
      {activeEl && cfg.details && cfg.details[activeEl] && <DetailPanel color={cfg.details[activeEl].color} title={cfg.details[activeEl].title} detail={cfg.details[activeEl].detail} />}
      <ClickHint />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INSPECTOR DIAGRAM — Műszaki Ellenőr
   ═══════════════════════════════════════════════════════════════ */
function InspectorDiagram() {
  const [activeEl, setActiveEl] = useState(null);
  const details = {
    who: { title: "Ki a műszaki ellenőr?", color: THEME.accent.blue, detail: "Független, jogosult mérnök (MV-É, MV-ÉG stb. tervezői vagy szakértői jogosultsággal). Az ÉN embered a kivitelezésen — NEM a kivitelezőé! Feladata: ellenőrzi, hogy a terveknek és szabványoknak megfelelően épül-e a ház. JOGSZABÁLYI KÖTELEZETTSÉG 300 m² felett, de kisebb háznál is ERŐSEN ajánlott. SOHA ne fogadd el a kivitelező saját műszaki ellenőrét!" },
    cost: { title: "Mennyibe kerül?", color: THEME.accent.green, detail: "Díj: 300.000 - 800.000 Ft az egész építkezésre (8-15 helyszíni szemle). Ez az építkezés legolcsóbb biztosítása! Egy elfedett hiba (rossz vízszigetelés, hiányzó vasalás) milliós javítási költséget okozhat. A műszaki ellenőr a beruházási költség 0,5-1,5%-ába kerül. Válassz olyat, aki elérhető és időben ki tud jönni a kritikus pillanatokban." },
    what: { title: "Mit csinál?", color: THEME.accent.amber, detail: "1) Ellenőrzi a tervek betartását. 2) Anyagminőséget vizsgálja (pl. beton szilárdsági osztály). 3) Rejtett szerkezeteket ellenőrzi ELFEDÉS ELŐTT (vasalás, csomópontok). 4) Építési naplót vezet/ellenőriz. 5) Mennyiségi felmérést végez (nem számláz-e többet a kivitelező?). 6) Garanciális hibáknál képviseli az építtetőt." },
    foundation_check: { title: "1. Alapozás ellenőrzése", color: THEME.accent.teal, detail: "KRITIKUS pont — az alapot nem lehet utólag javítani! Ellenőrzendő: ásott talp mélysége (fagymentes-e?), talajminőség (megfelel-e a tervezettnek?), sávalap vasalása betonozás előtt, zsaluzat méretei, beton szilárdsági osztálya (C20/25 min.), tömörítés. BETONOZÁS ELŐTT kell kimennie — utána nem látszik semmi!" },
    wall_check: { title: "2. Falazat ellenőrzés", color: THEME.accent.orange, detail: "Falsíkok függőlegessége (libella), vízszintesség, falvastagság, koszorú vasalása és betonozása, nyílásáthidalók mérete és alátámasztása. Porotherm esetén: vékony ágyazatú habarcs-e vagy hagyományos (tervben mi van). Sarkoknál, T-csomópontoknál: fogazás vagy vasalt kötés. Falszárítás: min. 1 fűtési szezon ajánlott a vakolás előtt." },
    roof_check: { title: "3. Tetőszerkezet ellenőrzés", color: THEME.accent.purple, detail: "Faanyag minősége (C24, száraz, kezelt-e Wolmanittal?). Csomópontok: szarufacsap, kötőgerenda rögzítés, szelemen alátámasztás. Méretezés: megfelelő-e a szarufaosztás (60-90 cm), a keresztmetszetek. Tetőfólia: lélegző membrán, átfedések ragasztva. Szellőzés: ellenléc biztosítja-e a hátsó szellőzést." },
    mep_check: { title: "4. Gépészet ellenőrzés", color: THEME.accent.red, detail: "Csővezetékek nyomáspróbája (víz: min. 10 bar, 30 perc; gáz: levegővel). Fűtéscsövek lefektetése padlófűtésnél: körívek, rögzítés, visszacsatolás. Elektromos: vezetékkeresztmetszetek, kötődobozok, FI-relé. FONTOS: az esztrich/betonozás ELŐTT kell ellenőrizni — utána nem javítható!" },
    insulation_check: { title: "5. Szigetelés ellenőrzés", color: THEME.accent.cyan, detail: "Hőszigetelés vastagsága és típusa egyezik-e a tervvel? Rögzítés: ragasztás + dübelezés (8-10 db/m²). Hőhídmentes csomópontok: nyílászáró csatlakozás, lábazat, koszorú, erkélykonzol. Párazárás: fólia átfedések ragasztva, áttörések tömítve. Blower Door teszt eredménye: n50 ≤ 1,5 1/h (alacsonyabb = légzáróbb)." },
    final_check: { title: "6. Átadás-átvétel", color: THEME.accent.green, detail: "Végellenőrzés: minden korábbi észrevétel javítva? Hibajegyzék készítése. Használatbavételi engedélyhez szükséges dokumentumok: energetikai tanúsítvány, tűzvédelmi nyilatkozat, megvalósulási terv. Garanciális feltételek rögzítése. TIPP: 1 évvel az átadás után még egyszer járjon ki — az első telet/nyarat kibírt-e minden?" },
  };
  return (
    <div>
      <DiagramWrapper>
        <svg viewBox="0 0 740 420" style={{ width: "100%" }}>
          {/* Title banner */}
          <rect x="10" y="10" width="720" height="40" rx="10" fill="#1e293b" stroke={THEME.accent.amber} strokeWidth="1.5" />
          <text x="370" y="35" textAnchor="middle" fill={THEME.accent.amber} fontSize="15" fontWeight="800">👷 MŰSZAKI ELLENŐR — A Te embered az építkezésen!</text>
          {/* Info cards row */}
          {[
            { id: "who", x: 15, label: "Ki?", icon: "👤", sub: "Független mérnök", color: THEME.accent.blue },
            { id: "what", x: 255, label: "Mit csinál?", icon: "📋", sub: "Tervek betartása", color: THEME.accent.amber },
            { id: "cost", x: 495, label: "Mennyibe kerül?", icon: "💰", sub: "300-800e Ft", color: THEME.accent.green },
          ].map((card) => (
            <g key={card.id} onClick={() => setActiveEl(card.id)} style={{ cursor: "pointer" }}>
              <rect x={card.x} y="65" width="225" height="70" rx="10" fill={activeEl === card.id ? card.color + "22" : "#111827"} stroke={card.color} strokeWidth={activeEl === card.id ? 2.5 : 1.5} />
              <text x={card.x + 20} y="92" fill="#fff" fontSize="20">{card.icon}</text>
              <text x={card.x + 50} y="95" fill={THEME.text.heading} fontSize="13" fontWeight="700">{card.label}</text>
              <text x={card.x + 50} y="118" fill={THEME.text.secondary} fontSize="11">{card.sub}</text>
            </g>
          ))}
          {/* Timeline bar */}
          <rect x="30" y="165" width="680" height="6" rx="3" fill="#334155" />
          {/* Timeline checkpoints */}
          {[
            { id: "foundation_check", x: 70, label: "Alapozás", phase: "1", color: THEME.accent.teal },
            { id: "wall_check", x: 200, label: "Falazat", phase: "2", color: THEME.accent.orange },
            { id: "roof_check", x: 330, label: "Tető", phase: "3", color: THEME.accent.purple },
            { id: "mep_check", x: 440, label: "Gépészet", phase: "4", color: THEME.accent.red },
            { id: "insulation_check", x: 550, label: "Szigetelés", phase: "5", color: THEME.accent.cyan },
            { id: "final_check", x: 660, label: "Átadás", phase: "6", color: THEME.accent.green },
          ].map((cp) => (
            <g key={cp.id} onClick={() => setActiveEl(cp.id)} style={{ cursor: "pointer" }}>
              <circle cx={cp.x} cy="168" r="14" fill={activeEl === cp.id ? cp.color : "#1e293b"} stroke={cp.color} strokeWidth="2.5" />
              <text x={cp.x} y="173" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="800">{cp.phase}</text>
              <text x={cp.x} y="200" textAnchor="middle" fill={THEME.text.body} fontSize="10" fontWeight="600">{cp.label}</text>
            </g>
          ))}
          {/* Expanded checkpoint details */}
          {[
            { id: "foundation_check", x: 20, y: 220, items: ["Talpmélység", "Vasalás", "Beton osztály", "Zsaluzat"] },
            { id: "wall_check", x: 150, y: 220, items: ["Függőlegesség", "Koszorú vasalás", "Nyílásáthidaló", "Faltípus"] },
            { id: "roof_check", x: 280, y: 220, items: ["Fa minőség", "Csomópontok", "Fólia + léc", "Méretezés"] },
            { id: "mep_check", x: 390, y: 220, items: ["Nyomáspróba", "Padlófűtés", "Villany FI", "Gáz próba"] },
            { id: "insulation_check", x: 500, y: 220, items: ["Vastagság", "Rögzítés", "Hőhíd", "Blower Door"] },
            { id: "final_check", x: 610, y: 220, items: ["Hibajegyzék", "Dokumentumok", "Garancia", "1 éves felmérés"] },
          ].map((block) => (
            <g key={block.id + "_detail"}>
              {block.items.map((item, i) => (
                <g key={i}>
                  <rect x={block.x} y={block.y + i * 22} width="115" height="18" rx="4" fill="#111827" stroke="#1e293b" strokeWidth="1" />
                  <text x={block.x + 57} y={block.y + i * 22 + 13} textAnchor="middle" fill={THEME.text.muted} fontSize="8">{item}</text>
                </g>
              ))}
            </g>
          ))}
          {/* Warning box */}
          <rect x="60" y="330" width="620" height="70" rx="12" fill="#1c1111" stroke={THEME.accent.red} strokeWidth="2" />
          <text x="370" y="355" textAnchor="middle" fill={THEME.accent.red} fontSize="14" fontWeight="800">⚠️ FONTOS SZABÁLY</text>
          <text x="370" y="378" textAnchor="middle" fill={THEME.text.body} fontSize="12">MINDIG a SAJÁT műszaki ellenőrödet fogadd meg — SOHA ne a kivitelezőét!</text>
          <text x="370" y="393" textAnchor="middle" fill={THEME.text.muted} fontSize="10">A kivitelező által ajánlott ellenőr összeférhetetlenség — nem a Te érdekedet képviseli.</text>
        </svg>
      </DiagramWrapper>
      {activeEl && details[activeEl] && <DetailPanel color={details[activeEl].color} title={details[activeEl].title} detail={details[activeEl].detail} />}
      <ClickHint />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TIMELINE DIAGRAM — Építési Ütemterv & Időjárás
   ═══════════════════════════════════════════════════════════════ */
function TimelineDiagram() {
  const [subTab, setSubTab] = useState("timeline");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [
    { id: "timeline", label: "📊 Ütemterv" },
    { id: "weather", label: "🌦️ Időjárás" },
    { id: "costcurve", label: "💰 Költséggörbe" },
  ];
  const detailsCostCurve = {
    month_1_3: { title: "1-3. hónap: Tervezés (5-8%)", color: THEME.accent.blue, detail: "Kumulatív kiadás: 5-8M Ft. Tételek: tervező díjak (2-5M Ft), talajmechanika (80-180k Ft), geodéta (80-230k Ft), engedélyezési illetékek. Összeg relatíve alacsony, de FONTOS: a jó tervek 15-20%-ot spórolnak később! Ne vágj bele tervek nélkül." },
    month_4_5: { title: "4-5. hónap: Alap + falak (25-35%)", color: THEME.accent.teal, detail: "Kumulatív kiadás: 25-35M Ft. A LEGNAGYOBB ugrás a költségekben! Anyagok: beton, vas, tégla (hatalmas mennyiség). Munka: földmunka, alapozás, falazás. Közműcsatlakozási díjak (1-3M Ft). TIPP: anyagár-rögzítés a szerződésben — az árak építési szezonban 5-15%-ot emelkedhetnek." },
    month_6_7: { title: "6-7. hónap: Tető + nyílászárók (50-60%)", color: THEME.accent.amber, detail: "Kumulatív kiadás: 50-60M Ft. A félúton járunk! Tető (szerkezet + fedés): 3-6M Ft. Nyílászárók: 2-5M Ft. A ház esővédett — innentől belső munkák is folyhatnak. FONTOS: a nyílászárókat 2 hónappal korábban kell megrendelni (gyártási idő)!" },
    month_8_10: { title: "8-10. hónap: Gépészet + szigetelés (70-80%)", color: THEME.accent.red, detail: "Kumulatív kiadás: 70-80M Ft. Hőszivattyú: 2-4M Ft. Elektromos rendszer: 2-4M Ft. Szellőzés: 800k-1.5M Ft. Homlokzati szigetelés: 3-6M Ft. Ez a második legnagyobb költség-periódus a szerkezet után. Sok párhuzamos munkafázis — koordináció fontos!" },
    month_11_14: { title: "11-14. hónap: Befejezés (90-100%)", color: THEME.accent.green, detail: "Kumulatív kiadás: 90-108M Ft. Belső vakolás, burkolás, festés: 5-10M Ft. Konyha: 1-4M Ft. Fürdő szaniter: 500k-2M Ft. Padló: 1-3M Ft. Ajtók: 500k-1.5M Ft. ITT a legnagyobb kísértés a túlköltés — tartsd magad a büdzséhez! Az utolsó 5-10% visszatartás a hibajavítási garancia." },
    tips: { title: "Pénzügyi tippek", color: THEME.accent.purple, detail: "1. 10-15% tartalékot MINDIG tervezz be. 2. Anyagárat rögzítsd a szerződésben. 3. Fizetés MINDIG teljesítésigazolás (műszaki ellenőr) UTÁN. 4. Az előleg max 15%. 5. A hitel folyósítását az építési ütemhez igazítsd. 6. Számlákat GYŰJTSD — adókedvezmény, garancia bizonyíték. 7. Készpénzes fizetés = nincs számla = nincs garancia." },
  };
  const detailsTimeline = {
    design: { title: "1. Tervezés (2-6 hónap)", color: THEME.accent.blue, detail: "Építész tervek, statika, gépészet, elektromos tervek, energetikai számítás. Engedélyezési terv → építési engedély (60 nap). Kiviteli terv → részletes árazáshoz. TIPP: NE spórolj a terveken! Rossz/hiányos terv = drága változtatások az építkezésen. Tervező díja: a beruházás 3-8%-a. Jó tervekkel akár 15-20% megtakarítás a kivitelezésen." },
    permit: { title: "2. Engedélyezés (2-3 hónap)", color: THEME.accent.purple, detail: "Egyszerű bejelentés (max 300 m², kétszintes): 15 nap. Építési engedély: 60 nap (gyakorlatban 2-4 hónap). Szükséges: engedélyezési terv, statika, településképi vélemény, közműnyilatkozatok. E-naplóba bejelentés. FONTOS: engedély nélküli építkezés = bontás + bírság!" },
    earthwork: { title: "3. Földmunka (1-2 hét)", color: THEME.accent.amber, detail: "Humuszolás, tereprendezés, árokásás/szintre hozás. Talajmechanikai vizsgálat eredménye alapján. Vízelvezetés, ideiglenes víztelenítés ha magas a talajvíz. Ideális időszak: tavasz-ősz (nem fagyott, nem túl nedves). Esőben NEM szabad dolgozni — az agyagos talaj felázik és teherbírása drasztikusan csökken." },
    foundation_tl: { title: "4. Alapozás (2-4 hét)", color: THEME.accent.teal, detail: "Sávalap: árok → sovány beton → vasalás → zsaluzás → betonozás → kötés (7 nap). Lemezalap: szintezés → kavicságy → XPS → PE fólia → vasalás → betonozás → kötés. FONTOS: +5°C alatt nem betonozunk (fagyásgátló adalék drága és kockázatos). Beton kötési idő: 28 nap a teljes szilárdsághoz, de 7 nap után ráépíthető." },
    walls_tl: { title: "5. Falazás (3-6 hét)", color: THEME.accent.orange, detail: "Lábazati fal → vízszigetelés → teherhordó falak → koszorú (emeleti födémnél) → válaszfalak. Porotherm 30/38/44: 2-3 tégla/perc egy jó kőművessel. 100 m² ház falai: 2-3 hét (2 fő). +5°C felett dolgozunk, esővédelem! Nyílásáthidalók beépítése a haladással együtt. Koszorú vasalás + betonozás az utolsó sor után." },
    slab_tl: { title: "6. Födém (1-2 hét)", color: THEME.accent.red, detail: "Béléstestes: gerendák + béléstestek + helyszíni vasalás + betonozás. Monolit: zsaluzás + vasalás + betonozás. Mindkettő: alátámasztás 28 napig (kitámasztó gerendák)! A födém készültéig az emeleti falak nem kezdhetők. Beton szilárdsági vizsgálat: próbakocka minden 50 m³ betonhoz." },
    roof_tl: { title: "7. Tetőfedés (2-4 hét)", color: THEME.accent.purple, detail: "Szarufák felállítása → szelemen → kötőgerenda → tetőfólia → ellenléc → léc → cserép/fémlemez. Kulcsrakész: kb. 2-3 hét (4-5 fős brigád). Az esővédelem szempontjából fontos, hogy a tetőfólia minél hamarabb rákerüljön! A komplett tető után belső munkák esőtől védve folytathatók." },
    windows_tl: { title: "8. Nyílászárók (1-2 hét)", color: THEME.accent.cyan, detail: "Gyártási idő: 4-8 hét a megrendeléstől! Tervezzél előre. Beépítés: 1-2 nap/nyílászáró. Előtétes beépítésnél a szigetelés UTÁN kerül be, hagyományosnál a falazás után. RAL-beépítés: párazáró belül, páraáteresztő kívül, hőszigetelő hab középen. A nyílászáró beépítése után kezdhető a belső vakolás." },
    mep_tl: { title: "9. Gépészet (3-5 hét)", color: THEME.accent.red, detail: "Víz-csatorna → fűtés csövek → elektromos vezetékek → szellőzés csövek → gáz (ha van). Sorrend FONTOS: a nagyobb átmérőjű csövek (csatorna, szellőzés) előbb, mert nehezebb utólag elhelyezni. Nyomáspróba KÖTELEZŐ a lefedés előtt! Elektromos: csillagpontos elosztás, minden szobába üres cső a jövőre." },
    screed_tl: { title: "10. Esztrich (1-2 hét + száradás)", color: THEME.accent.amber, detail: "Padlófűtés csövek lefektetése → PE fólia → esztrich öntés. Cement esztrich: 1 cm/hét száradás (6 cm = 6 hét!). Anhidrit: gyorsabb, de csiszolás kell. FONTOS: felfűtési protokoll az esztrich száradása UTÁN, a burkolás ELŐTT! Ez akár 2-3 hetet is igénybe vehet. NE siess — a nedves esztrichre rakott burkolat penészedik." },
    insulation_tl: { title: "11. Hőszigetelés (2-3 hét)", color: THEME.accent.green, detail: "Homlokzati hőszigetelés: ragasztás → dübelezés → üvegszövet háló → alapvakolat → simítóvakolat. Száradási idők rétegenként 1-3 nap. +5°C felett, árnyékban kell dolgozni (ne száradjon túl gyorsan a napon). Esővédelem a vakolás után 48 óráig! Tető szigetelés a belső oldali munkákkal párhuzamosan végezhető." },
    finishing: { title: "12. Belső burkolás & festés (4-8 hét)", color: THEME.accent.pink, detail: "Belső vakolás (gépi vakolat: 1-2 hét) → száradás (2-4 hét) → glettelés → festés. Fürdőszoba burkolás: vízszigetelés → csempe → szaniter. Padlóburkolás: esztrich száraz → ragasztás → fugázás. Konyha: bútor felmérés a vakolás UTÁN (pontosabb méretek). Ajtók beépítése a festés ELŐTT (tokkal), festés UTÁN (tok nélkül)." },
  };
  const detailsWeather = {
    concrete_w: { title: "Betonozás időjárási korlátai", color: THEME.accent.blue, detail: "Optimális: +10 – +25°C. MINIMUM: +5°C (24 órán belül nem csökkenhet 0°C alá!). Forróságban (30°C+): locsolás, lefedés, késleltetett kötés. Télen: fagyásgátló adalék (+20-30% költség), takarás, melegítés — DE kockázatos, kerüld ha lehet! Esőben: friss betont LE KELL fedni (kimosódik a cement). Kötési hő: nagy tömbben (alap) 3-5 napig melegít." },
    masonry_w: { title: "Falazás időjárási korlátai", color: THEME.accent.orange, detail: "MINIMUM: +5°C (habarcs kötéséhez). Fagyban a habarcs nem köt → a fal szétesik! Esőben: lefedni a friss falat (a Porotherm lyukaiba beleáll a víz → fagyban szétrepeszti). Hőségben: téglát megnedvesíteni (szívja el a habarcs vizét). Nyári hőhullámban a habarcs túl gyorsan szárad → rosszabb tapadás. Ideális: tavasz (márc-máj), ősz (szept-okt)." },
    plaster_w: { title: "Vakolás időjárási korlátai", color: THEME.accent.amber, detail: "Külső vakolás: +5°C és +25°C között! 30°C felett NEM szabad vakolni (repedés, gyors száradás). Közvetlen napfényben sem (háló+árnyékoló). Eső előtt 24-48 óra védelem kell. Szél: erős szélben a vékonyrétegű vakolat túl gyorsan szárad. Ideális: kora ősz (szeptember-október) — mérsékelt hő, kevés eső. TIPP: állványon napvédő hálóval dolgozz!" },
    earthwork_w: { title: "Földmunka időjárási korlátai", color: THEME.accent.teal, detail: "Fagyott talaj: nem ásható (drága gép kell, rossz minőség). Nagyon nedves/sáros: gépek elakadnak, árok beomlás veszélye, talaj teherbírása csökken. Ideális: száraz, fagymentes időszak (ápr-nov). Agyagos talaj: esőben felduzzad, szárazságban összehúzódik → csak stabil időjárásban dolgozz! Kavicsos talaj: szinte bármikor megmunkálható." },
    interior_w: { title: "Belső munkák", color: THEME.accent.green, detail: "Télen is végezhető, HA a fűtés és szellőzés megoldott! Belső vakolás: +5°C felett, de a páralecsapódás ellen szellőztetni kell. Festés: +10°C felett, páratartalom < 70%. Burkolás: +5°C felett. A téli belső munkák előnye: kevesebb kivitelezői kapacitáshiány, esetleg jobb árak. Hátrány: fűtési költség, szellőztetés nehézkes." },
    jan_mar: { title: "Január-Március: Tervezési időszak", color: THEME.accent.purple, detail: "Ideális a tervezésre és engedélyezésre! Ilyenkor a tervezők kevésbé leterheltek (kedvezőbb árak). Januárban induló tervezéssel márciusra meglesz az engedély, áprilisban indulhat az építkezés. Anyagárak: év eleji árlista-frissítés — érdemes januárban árajánlatot kérni. Kivitelezők: ilyenkor lehet jó brigádot lekötni a nyári szezonra." },
    apr_jun: { title: "Április-Június: Építési főszezon", color: THEME.accent.green, detail: "Optimális az alapozásra, falazásra, és tetőfedésre. Stabil időjárás, mérsékelten meleg, hosszú nappalok. Április: földmunka + alap. Május-Június: falazás. Hátrány: a kivitelezők ilyenkor a legleterheltebbek → magasabb árak, nehezebb időpontot kapni. TIPP: decemberben kösd le a brigádot, januárban rendeld meg az anyagot!" },
    jul_sep: { title: "Július-Szeptember: Tető + Gépészet", color: THEME.accent.amber, detail: "Július-Augusztus: hőség miatt külső vakolásra NEM ideális! De tető alatti munkák (gépészet, belső falak) jól haladnak. Szeptember: homlokzati szigetelés és vakolás ideális hónapja — mérsékelten meleg, száraz. VIGYÁZAT: nyári viharok → tetőfólia legyen kint, mielőtt a cserép rákerül!" },
    oct_dec: { title: "Október-December: Belső befejezés", color: THEME.accent.cyan, detail: "Október: utolsó esély a külső vakolásra (éjszakai fagy!). November-December: belső vakolás, esztrich, gépészeti befejezés. Fűtés beindítása, próbaüzem. A téli beszáradás fontos — az első fűtési szezon kiszárítja a szerkezeteket. Festés-burkolás: inkább januártól (szárazabb falak). NE siess a befejezéssel — a nedves falra rakott festék lepereg!" },
  };
  const details = subTab === "timeline" ? detailsTimeline : subTab === "weather" ? detailsWeather : detailsCostCurve;
  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />
      {subTab === "timeline" && (
        <DiagramWrapper>
          <svg viewBox="0 0 760 520" style={{ width: "100%" }}>
            {/* Month markers */}
            {Array.from({ length: 15 }, (_, i) => (
              <g key={i}>
                <line x1={55 + i * 46} y1="15" x2={55 + i * 46} y2="440" stroke="#1e293b" strokeWidth="1" />
                <text x={55 + i * 46} y="12" textAnchor="middle" fill={THEME.text.muted} fontSize="9">{i + 1}. hó</text>
              </g>
            ))}
            {/* Gantt bars */}
            {[
              { id: "design", label: "Tervezés", start: 0, dur: 5, color: THEME.accent.blue, y: 30 },
              { id: "permit", label: "Engedély", start: 3, dur: 3, color: THEME.accent.purple, y: 62 },
              { id: "earthwork", label: "Földmunka", start: 5.5, dur: 0.7, color: THEME.accent.amber, y: 94 },
              { id: "foundation_tl", label: "Alapozás", start: 6, dur: 1.5, color: THEME.accent.teal, y: 126 },
              { id: "walls_tl", label: "Falazás", start: 7, dur: 2.5, color: THEME.accent.orange, y: 158 },
              { id: "slab_tl", label: "Födém", start: 8.5, dur: 1.5, color: THEME.accent.red, y: 190 },
              { id: "roof_tl", label: "Tető", start: 9, dur: 1.5, color: THEME.accent.purple, y: 222 },
              { id: "windows_tl", label: "Nyílászárók", start: 9.5, dur: 1, color: THEME.accent.cyan, y: 254 },
              { id: "mep_tl", label: "Gépészet", start: 9, dur: 2.5, color: THEME.accent.red, y: 286 },
              { id: "screed_tl", label: "Esztrich", start: 11, dur: 2.5, color: THEME.accent.amber, y: 318 },
              { id: "insulation_tl", label: "Szigetelés", start: 10, dur: 1.5, color: THEME.accent.green, y: 350 },
              { id: "finishing", label: "Befejezés", start: 12, dur: 3, color: THEME.accent.pink, y: 382 },
            ].map((bar) => (
              <g key={bar.id} onClick={() => setActiveEl(bar.id)} style={{ cursor: "pointer" }}>
                <rect x={55 + bar.start * 46} y={bar.y} width={bar.dur * 46} height="26" rx="6" fill={activeEl === bar.id ? bar.color + "55" : bar.color + "33"} stroke={bar.color} strokeWidth={activeEl === bar.id ? 2.5 : 1.5} />
                <text x={55 + bar.start * 46 + 8} y={bar.y + 18} fill={THEME.text.heading} fontSize="10" fontWeight="600">{bar.label}</text>
              </g>
            ))}
            {/* Total duration */}
            <rect x="55" y="425" width={14 * 46} height="28" rx="8" fill="#111827" stroke="#334155" strokeWidth="1.5" />
            <text x="370" y="444" textAnchor="middle" fill={THEME.text.heading} fontSize="12" fontWeight="700">Összesen: 10-14 hónap (tervezéstől kulcsrakészig)</text>
            {/* Dependencies arrows */}
            <text x="55" y="480" fill={THEME.text.muted} fontSize="10">→ A sávok átfedése = párhuzamosan végezhető munkák</text>
            <text x="55" y="498" fill={THEME.text.muted} fontSize="10">⚠ Esztrich száradása (6-8 hét) a kritikus várakozási pont!</text>
            <text x="55" y="516" fill={THEME.accent.amber} fontSize="10" fontWeight="600">TIPP: Nyílászárót 2 hónappal az építkezés indulása ELŐTT rendeld meg!</text>
          </svg>
        </DiagramWrapper>
      )}
      {subTab === "weather" && (
        <DiagramWrapper>
          <svg viewBox="0 0 740 480" style={{ width: "100%" }}>
            {/* Month headers */}
            {["Jan","Feb","Már","Ápr","Máj","Jún","Júl","Aug","Szep","Okt","Nov","Dec"].map((m, i) => (
              <text key={i} x={115 + i * 50} y="25" textAnchor="middle" fill={THEME.text.heading} fontSize="10" fontWeight="700">{m}</text>
            ))}
            {/* Activity rows with color coded cells */}
            {[
              { id: "concrete_w", label: "Betonozás", colors: ["#991b1b","#991b1b","#ef4444","#22c55e","#22c55e","#22c55e","#eab308","#eab308","#22c55e","#22c55e","#ef4444","#991b1b"] },
              { id: "masonry_w", label: "Falazás", colors: ["#991b1b","#991b1b","#ef4444","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#eab308","#ef4444","#991b1b"] },
              { id: "plaster_w", label: "Külső vakolás", colors: ["#991b1b","#991b1b","#991b1b","#eab308","#22c55e","#eab308","#ef4444","#ef4444","#22c55e","#eab308","#991b1b","#991b1b"] },
              { id: "earthwork_w", label: "Földmunka", colors: ["#991b1b","#991b1b","#ef4444","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#eab308","#991b1b"] },
              { id: "interior_w", label: "Belső munkák", colors: ["#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e"] },
            ].map((row, ri) => (
              <g key={row.id} onClick={() => setActiveEl(row.id)} style={{ cursor: "pointer" }}>
                <text x="5" y={60 + ri * 50} fill={THEME.text.body} fontSize="10" fontWeight="600">{row.label}</text>
                {row.colors.map((c, ci) => (
                  <rect key={ci} x={90 + ci * 50} y={45 + ri * 50} width="46" height="28" rx="5" fill={c + "33"} stroke={c} strokeWidth="1.5" />
                ))}
              </g>
            ))}
            {/* Legend */}
            <rect x="90" y="300" width="20" height="14" rx="3" fill="#22c55e33" stroke="#22c55e" strokeWidth="1" />
            <text x="118" y="312" fill={THEME.text.secondary} fontSize="10">Ideális</text>
            <rect x="200" y="300" width="20" height="14" rx="3" fill="#eab30833" stroke="#eab308" strokeWidth="1" />
            <text x="228" y="312" fill={THEME.text.secondary} fontSize="10">Lehetséges, de kockázatos</text>
            <rect x="420" y="300" width="20" height="14" rx="3" fill="#ef444433" stroke="#ef4444" strokeWidth="1" />
            <text x="448" y="312" fill={THEME.text.secondary} fontSize="10">Kerülendő</text>
            <rect x="560" y="300" width="20" height="14" rx="3" fill="#991b1b33" stroke="#991b1b" strokeWidth="1" />
            <text x="588" y="312" fill={THEME.text.secondary} fontSize="10">Tilos / nem ajánlott</text>
            {/* Seasonal planning boxes */}
            {[
              { id: "jan_mar", x: 30, label: "Jan-Már", sub: "Tervezés, engedélyezés", color: THEME.accent.purple },
              { id: "apr_jun", x: 210, label: "Ápr-Jún", sub: "Alap, falazás, tető", color: THEME.accent.green },
              { id: "jul_sep", x: 390, label: "Júl-Szep", sub: "Gépészet, szigetelés", color: THEME.accent.amber },
              { id: "oct_dec", x: 570, label: "Okt-Dec", sub: "Belső befejezés", color: THEME.accent.cyan },
            ].map((season) => (
              <g key={season.id} onClick={() => setActiveEl(season.id)} style={{ cursor: "pointer" }}>
                <rect x={season.x} y="340" width="155" height="55" rx="10" fill={activeEl === season.id ? season.color + "22" : "#111827"} stroke={season.color} strokeWidth={activeEl === season.id ? 2.5 : 1.5} />
                <text x={season.x + 78} y="363" textAnchor="middle" fill={season.color} fontSize="12" fontWeight="700">{season.label}</text>
                <text x={season.x + 78} y="382" textAnchor="middle" fill={THEME.text.secondary} fontSize="10">{season.sub}</text>
              </g>
            ))}
            {/* Bottom tips */}
            <text x="370" y="425" textAnchor="middle" fill={THEME.accent.amber} fontSize="11" fontWeight="700">Ideális építkezés-indítás: ÁPRILIS (előtte: tervezés Jan-Már)</text>
            <text x="370" y="445" textAnchor="middle" fill={THEME.text.muted} fontSize="10">Kulcsrakész: következő év január-március (10-14 hónap)</text>
            <text x="370" y="465" textAnchor="middle" fill={THEME.text.muted} fontSize="10">⚠ Decemberi indítás = téli betonozás kockázata + drágább munka</text>
          </svg>
        </DiagramWrapper>
      )}
      {subTab === "costcurve" && (
        <DiagramWrapper>
          <svg viewBox="0 0 750 440" style={{ width: "100%" }}>
            <text x="375" y="25" textAnchor="middle" fill={THEME.accent.amber} fontSize="14" fontWeight="700">KUMULATÍV KÖLTSÉGGÖRBE (120 m² ház, ~100M Ft)</text>
            {/* Axes */}
            <line x1="80" y1="50" x2="80" y2="320" stroke="#334155" strokeWidth="1.5" />
            <line x1="80" y1="320" x2="720" y2="320" stroke="#334155" strokeWidth="1.5" />
            {/* Y axis labels (million Ft) */}
            {[0, 20, 40, 60, 80, 100].map((v, i) => (
              <g key={i}>
                <text x="70" y={320 - i * 45 + 4} textAnchor="end" fill={THEME.text.muted} fontSize="9">{v}M</text>
                <line x1="78" y1={320 - i * 45} x2="720" y2={320 - i * 45} stroke="#1e293b" strokeWidth="1" />
              </g>
            ))}
            {/* X axis labels (months) */}
            {Array.from({ length: 14 }, (_, i) => (
              <text key={i} x={110 + i * 43} y="338" textAnchor="middle" fill={THEME.text.muted} fontSize="9">{i + 1}</text>
            ))}
            <text x="400" y="355" textAnchor="middle" fill={THEME.text.muted} fontSize="10">Hónapok</text>
            {/* Cost curve - S-curve shape */}
            <polyline points="110,310 153,305 196,300 239,260 282,210 325,185 368,160 411,130 454,105 497,85 540,75 583,68 626,62 669,55" fill="none" stroke={THEME.accent.amber} strokeWidth="3" />
            {/* Fill under curve */}
            <polygon points="110,310 153,305 196,300 239,260 282,210 325,185 368,160 411,130 454,105 497,85 540,75 583,68 626,62 669,55 669,320 110,320" fill={THEME.accent.amber} opacity="0.1" />
            {/* Key milestone dots */}
            {[
              { x: 196, y: 300, key: "month_1_3", label: "Tervezés" },
              { x: 282, y: 210, key: "month_4_5", label: "Alap+Falak" },
              { x: 368, y: 160, key: "month_6_7", label: "Tető" },
              { x: 497, y: 85, key: "month_8_10", label: "Gépészet" },
              { x: 669, y: 55, key: "month_11_14", label: "Befejezés" },
            ].map((dot) => (
              <g key={dot.key} onClick={() => setActiveEl(activeEl === dot.key ? null : dot.key)} style={{ cursor: "pointer" }}>
                <circle cx={dot.x} cy={dot.y} r={activeEl === dot.key ? 8 : 6} fill={activeEl === dot.key ? THEME.accent.amber : "#1e293b"} stroke={THEME.accent.amber} strokeWidth="2.5" />
                <text x={dot.x} y={dot.y - 12} textAnchor="middle" fill={THEME.text.heading} fontSize="9" fontWeight="600">{dot.label}</text>
              </g>
            ))}
            {/* Tips box */}
            <g onClick={() => setActiveEl("tips")} style={{ cursor: "pointer" }}>
              <rect x="100" y="370" width="550" height="40" rx="8" fill={activeEl === "tips" ? THEME.accent.purple + "22" : "#111827"} stroke={THEME.accent.purple} strokeWidth="1.5" />
              <text x="375" y="395" textAnchor="middle" fill={THEME.accent.purple} fontSize="11" fontWeight="600">💡 Pénzügyi tippek — kattints a részletekért</text>
            </g>
            {/* Biggest jump annotation */}
            <line x1="240" y1="260" x2="282" y2="210" stroke={THEME.accent.red} strokeWidth="2" strokeDasharray="4,3" />
            <text x="290" y="230" fill={THEME.accent.red} fontSize="8" fontWeight="600">← LEGNAGYOBB ugrás!</text>
          </svg>
        </DiagramWrapper>
      )}
      {activeEl && details[activeEl] && <DetailPanel color={details[activeEl].color} title={details[activeEl].title} detail={details[activeEl].detail} />}
      <ClickHint />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PERMITS DIAGRAM — Engedélyek & Jog
   ═══════════════════════════════════════════════════════════════ */
function PermitsDiagram() {
  const [subTab, setSubTab] = useState("flow");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [
    { id: "flow", label: "📋 Engedélyezési út" },
    { id: "docs", label: "📄 Dokumentumok" },
    { id: "roles", label: "👥 Szereplők" },
    { id: "enaplo", label: "💻 E-napló" },
  ];

  const flowDetails = {
    simple: { title: "Egyszerű bejelentés", color: THEME.accent.green, detail: "Feltételek: max 300 m² hasznos alapterület, max 2 szint (földszint + emelet VAGY tetőtér), nem műemléki/természetvédelmi terület. Folyamat: tervező elkészíti a tervet → bejelentés az ÉTDR-en keresztül (elektronikus) → 15 napos várakozás → lehet építeni. NEM kell hatósági engedély! De a terveket el kell készíteni és a kivitelezés szabályait be kell tartani. Az egyszerű bejelentés NEM mentesít a helyi HÉSZ szabályok alól!" },
    permit: { title: "Építési engedély", color: THEME.accent.amber, detail: "Szükséges: 300 m² felett, 2 szintnél több, műemléki/védett területen, vagy ha a HÉSZ előírja. Folyamat: engedélyezési terv → ÉTDR beadvány → hatóság 60 napja van (gyakorlatban 2-4 hónap). Hiánypótlás: +30 nap. Költség: illetékmentes, de a tervező díja: 500k-2M Ft. Az engedély 2 évig érvényes — ezen belül el kell kezdeni az építést!" },
    hasz: { title: "Használatbavételi engedély", color: THEME.accent.blue, detail: "Az építkezés befejezésekor kell kérni. Szükséges: energetikai tanúsítvány, e-napló lezárása, közműszolgáltatói nyilatkozatok, tűzvédelmi megfelelőség. Egyszerű bejelentésnél: hatósági bizonyítvány kérhető (nem kötelező, de bank/CSOK kéri). Engedélyköteles építésnél: 15 napon belül helyszíni szemle. NÉLKÜLE nem lehet lakcímet bejelenteni, és a CSOK-ot nem folyósítják!" },
    hesz: { title: "HÉSZ (Helyi Építési Szabályzat)", color: THEME.accent.purple, detail: "Minden településnek van HÉSZ-e — ez határozza meg: beépítési %, építménymagasság, elő-/oldal-/hátsókert méret, tetőhajlásszög, homlokzati anyag/szín. MIELŐTT telket veszel, OLVASD EL a HÉSZ-t! Tipikus meglepetés: 30%-os beépíthetőség 600 m²-es telken = max 180 m² alapterület. Vagy: csak nyeregtető, min. 35° hajlásszög. A HÉSZ megszegése → bontás + bírság." },
    neighbor: { title: "Szomszédjogok & telekhatár", color: THEME.accent.red, detail: "Oldalkerti távolság: min. 3 m (OTÉK, de HÉSZ felülírhatja). Tűztávolság: 4-6 m szomszéd épülettől. Csapadékvíz: NEM vezethetők a szomszédra! Kerítés: a saját telekhatáron belül, max 2 m (HÉSZ!). Építési szándék bejelentése a szomszédnak: udvariasság, de engedélyköteles építésnél a hatóság értesíti. Jogvita: jegyző → bíróság. TIPP: fotózd le a szomszéd ingatlan állapotát építés előtt!" },
    csok: { title: "CSOK & Zöld hitel", color: THEME.accent.green, detail: "Falusi CSOK (2024-25): max 5M Ft vissza nem térítendő + kedvezményes hitel. Feltétel: kistelepülésen, AA energiaosztály, gyermekvállalás. Zöld hitel (MNB): max 70M Ft, fix 2,5% kamat, 25 év. Feltétel: AA energiaosztály, primer energia ≤ 90 kWh/m²a. FONTOS: az AA osztály eléréséhez 3 réteg üveg + HRV + min. 15-20 cm szigetelés + hőszivattyú szinte kötelező. A tanúsítványt a használatbavétel ELŐTT kell beszerezni!" },
  };

  const docsDetails = {
    plan_arch: { title: "Építészeti terv", color: THEME.accent.blue, detail: "Alaprajzok, metszetek, homlokzatok, helyszínrajz, műszaki leírás. Engedélyezési szintű: M 1:100. Kiviteli szintű: M 1:50, részletrajzok 1:10/1:20. A KIVITELI terv nélkül a kivitelező 'fejből' dolgozik → hibák, viták, drágább lesz. Tervező díja: engedélyezési 300-800k Ft, kiviteli +500k-1.5M Ft." },
    plan_struct: { title: "Tartószerkezeti (statikai) terv", color: THEME.accent.red, detail: "Alapozás, koszorú, áthidaló, födém, lépcső vasalási tervek. KÖTELEZŐ minden építkezéshez! A statikus határozza meg: alap típusa és mérete, vasalás Ø és kiosztás, beton minőség. Nélküle a kőműves 'szokás' alapján dolgozik — de a szokás nem mindig elég (pl. rossz talaj, nagy fesztáv)." },
    plan_mep: { title: "Gépészeti tervek", color: THEME.accent.teal, detail: "Fűtés-hűtés, víz-csatorna, szellőzés, gáz (ha van). Tartalmazza: csőméretezés, padlófűtés kiosztás, szellőzőcsatorna nyomvonal, hőszivattyú/kazán méretezés. A gépész tervező határozza meg a hőszivattyú méretét — NE a kereskedő! Tervező díja: 200-600k Ft." },
    plan_elec: { title: "Elektromos terv", color: THEME.accent.amber, detail: "Erős- és gyengeáramú tervek: konnektorkiosztás, világítási pontok, kapcsolók, elosztószekrény terv, túláramvédelmi számítás. Smart home előkészítés: UTP pontok, redőnymotorok, üres csövek. Villanyszerelő tervező díja: 100-300k Ft." },
    plan_energy: { title: "Energetikai számítás", color: THEME.accent.green, detail: "TNM rendelet szerinti energetikai számítás: fajlagos hőveszteség, primer energiaigény, energiaosztály. Kötelező MINDEN új építésnél. Az energetikus mondja meg, milyen vastagságú szigetelés, milyen ablak, milyen gépészet kell az AA osztályhoz. Díja: 80-200k Ft." },
    talaj: { title: "Talajmechanikai szakvélemény", color: THEME.accent.orange, detail: "Fúrásos talajvizsgálat: 2-4 fúrás, 3-6 m mélységig. Megadja: talaj rétegek, teherbírás (kPa), talajvízszint, fagyveszélyes mélység. Ez alapján tervez a statikus! Költség: 80-180k Ft. FONTOS: duzzadó agyagos területen (Alföld nagy része!) ez LÉTKÉRDÉS — az alap méretezése ettől függ. Nélküle: vakrepülés." },
    kozmu: { title: "Közműnyilatkozatok", color: THEME.accent.purple, detail: "Víz (szolgáltató), csatorna (szolgáltató), villany (E.ON/ELMŰ/stb.), gáz (ha kell), telefonvezeték. Minden szolgáltatótól NYILATKOZAT kell a csatlakozási lehetőségről. Díjmentes, de 30-60 napig tart! Engedélyezési tervhez kötelező melléklet. TIPP: a telek vásárlása ELŐTT kérd el — ha nincs csatorna, 1-3M Ft szikkasztó/házi szennyvízkezelő kell." },
    map: { title: "Geodéziai felmérés", color: THEME.accent.cyan, detail: "Földmérő (geodéta) által készített aktuális térképmásolat + terepfelmérés. Szükséges a helyszínrajz elkészítéséhez. Tartalmazza: telekhatárok, szintvonalak, meglévő építmények, közművek nyomvonala. Költség: 50-150k Ft. Kitűzés (az épület sarkainak kijelölése a terepen): +30-80k Ft." },
  };

  const rolesDetails = {
    designer: { title: "Tervező (építész)", color: THEME.accent.blue, detail: "Jogosult építész tervező (É1 vagy É2 kategória, MMK névjegyzékben). Készíti: az engedélyezési és kiviteli tervet. Felelős a terv szabályszerűségéért és műszaki tartalmáért. Koordinálja a szaktervezőket (statikus, gépész, villamos, energetikus). TIPP: válassz olyan tervezőt, aki ÉPÍTETT már hasonló házat — ne csak rajzolni tudjon, hanem építkezési tapasztalata is legyen." },
    struct_eng: { title: "Statikus (tartószerkezet-tervező)", color: THEME.accent.red, detail: "A szerkezet biztonságáért felel: alap, falak, födém, tető, lépcső méretezése. A talajmechanikai vizsgálat alapján dolgozik. Vasalási terveket készít — a kőműves EBBŐL dolgozik. FONTOS: ha a kivitelező 'nem kell statikus' mondja → TILOS elfogadni! Díja: 150-500k Ft (a ház méretétől függően)." },
    contractor: { title: "Kivitelező (fővállalkozó)", color: THEME.accent.amber, detail: "A tényleges építkezést végző cég/személy. Jogosultság: egyéni vállalkozó vagy cég, aki az e-naplóban regisztrált. Fővállalkozó: egy kézben tartja az egész projektet, alvállalkozókat koordinál. ELŐNY: egy felelős, egy szerződés. HÁTRÁNY: 15-25% felárat számít. Alternatíva: generálkivitelezés (te koordinálsz) — olcsóbb, de rengeteg munka és tudás kell." },
    inspector_role: { title: "Műszaki ellenőr", color: THEME.accent.green, detail: "Az TE embered a kivitelezésen! Független mérnök, aki ellenőrzi: tervek szerinti kivitelezés, anyagminőség, technológiai sorrend, rejtett munkák (vasalás, szigetelés, csővezetékek). 300 m² felett KÖTELEZŐ, de kisebb háznál is erősen ajánlott. Díja: a kivitelezési összeg 1-3%-a (500k-1.5M Ft). SOHA ne fogadd el a kivitelező saját műszaki ellenőrét!" },
    energy_cert: { title: "Energetikus", color: THEME.accent.teal, detail: "Készíti: energetikai számítást (tervezéskor) és energetikai tanúsítványt (befejezéskor). MMK jogosultság szükséges. Az ő számítása határozza meg, milyen szigetelés/ablak/gépészet kell az AA osztályhoz. CSOK-hoz és zöld hitelhez az ő tanúsítványa szükséges. Díja: 80-200k Ft (számítás) + 50-150k Ft (tanúsítvány)." },
    geodezia: { title: "Geodéta (földmérő)", color: THEME.accent.purple, detail: "Készíti: terepfelmérés, helyszínrajz, kitűzés (épületsarkok kijelölése), változási vázrajz (befejezéskor). A kitűzés PONTOS kell legyen — 5 cm eltérés a telekhatártól → jogi vita a szomszéddal! A változási vázrajz a használatbavételhez és az ingatlan-nyilvántartási bejegyzéshez kell." },
  };

  const eNaploDetails = {
    what: { title: "Mi az E-napló?", color: THEME.accent.blue, detail: "Elektronikus építési napló — 2013 óta KÖTELEZŐ minden építkezésen (egyszerű bejelentés + engedélyköteles). Online felület (e-epites.hu). Az építkezés hivatalos dokumentációja: ki, mikor, mit csinált, milyen anyagot használt. A műszaki ellenőr és a kivitelező is ide ír. Használatbavételi engedélyhez a lezárt e-napló KÖTELEZŐ!" },
    who_writes: { title: "Ki ír bele?", color: THEME.accent.amber, detail: "Fővállalkozó: napi bejegyzések (időjárás, létszám, elvégzett munka, felhasznált anyag). Műszaki ellenőr: ellenőrzési bejegyzések, rejtett munka elfogadása. Tervező: tervmódosítások. Építtető (te): észrevételek, reklamáció. FONTOS: ha a kivitelező nem vezeti az e-naplót → szabálysértés! Ellenőrizd hetente!" },
    when: { title: "Mikor kell megnyitni?", color: THEME.accent.green, detail: "Az építkezés megkezdése ELŐTT! Egyszerű bejelentésnél: a 15 napos várakozás letelte után, de az első kapavágás előtt. Az e-naplót az ÉTDR-en (Építésügyi Hatósági Engedélyezési Eljárást Támogató Rendszer) keresztül kell megnyitni. A fővállalkozó adatait be kell jegyezni. Nélküle az építkezés ILLEGÁLIS!" },
    close: { title: "Lezárás és archiválás", color: THEME.accent.purple, detail: "Az építkezés befejeztével a fővállalkozó lezárja az e-naplót. A műszaki ellenőr ellenjegyzi. Ezután kérhető a használatbavételi engedély/hatósági bizonyítvány. Az e-napló 10 évig elérhető online. TIPP: nyomtasd ki PDF-ben is — garanciális vitáknál fontos bizonyíték!" },
  };

  const details = subTab === "flow" ? flowDetails : subTab === "docs" ? docsDetails : subTab === "roles" ? rolesDetails : eNaploDetails;

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />

      {subTab === "flow" && (
        <DiagramWrapper>
          <svg viewBox="0 0 750 500" style={{ width: "100%" }}>
            <text x="375" y="25" textAnchor="middle" fill={THEME.text.heading} fontSize="14" fontWeight="700">ENGEDÉLYEZÉSI FOLYAMAT</text>
            {/* Two paths */}
            <text x="200" y="60" textAnchor="middle" fill={THEME.accent.green} fontSize="12" fontWeight="700">Egyszerű bejelentés</text>
            <text x="200" y="75" textAnchor="middle" fill={THEME.text.muted} fontSize="9">≤300 m², max 2 szint</text>
            <text x="560" y="60" textAnchor="middle" fill={THEME.accent.amber} fontSize="12" fontWeight="700">Építési engedély</text>
            <text x="560" y="75" textAnchor="middle" fill={THEME.text.muted} fontSize="9">&gt;300 m², vagy védett terület</text>
            <line x1="375" y1="50" x2="375" y2="330" stroke="#334155" strokeWidth="1" strokeDasharray="6,4" />
            {/* Simple path steps */}
            {[
              { y: 95, label: "Terv elkészítése", sub: "Építész + szaktervezők" },
              { y: 145, label: "ÉTDR bejelentés", sub: "Elektronikus beadvány" },
              { y: 195, label: "15 nap várakozás", sub: "Automatikus — nincs döntés" },
              { y: 245, label: "Építkezés megkezdhető!", sub: "E-napló megnyitása" },
            ].map((step, i) => (
              <g key={i}>
                <rect x="70" y={step.y} width="260" height="38" rx="8" fill="#111827" stroke={THEME.accent.green} strokeWidth="1.5" />
                <text x="200" y={step.y + 16} textAnchor="middle" fill={THEME.text.heading} fontSize="11" fontWeight="600">{step.label}</text>
                <text x="200" y={step.y + 30} textAnchor="middle" fill={THEME.text.muted} fontSize="9">{step.sub}</text>
                {i < 3 && <text x="200" y={step.y + 48} textAnchor="middle" fill={THEME.accent.green} fontSize="14">↓</text>}
              </g>
            ))}
            {/* Permit path steps */}
            {[
              { y: 95, label: "Engedélyezési terv", sub: "Építész + szaktervezők" },
              { y: 145, label: "ÉTDR beadvány", sub: "Dokumentumok feltöltése" },
              { y: 195, label: "Hatósági elbírálás", sub: "60 nap (valóságban 2-4 hó)" },
              { y: 245, label: "Építési engedély kiadása", sub: "2 évig érvényes" },
            ].map((step, i) => (
              <g key={`p${i}`}>
                <rect x="430" y={step.y} width="260" height="38" rx="8" fill="#111827" stroke={THEME.accent.amber} strokeWidth="1.5" />
                <text x="560" y={step.y + 16} textAnchor="middle" fill={THEME.text.heading} fontSize="11" fontWeight="600">{step.label}</text>
                <text x="560" y={step.y + 30} textAnchor="middle" fill={THEME.text.muted} fontSize="9">{step.sub}</text>
                {i < 3 && <text x="560" y={step.y + 48} textAnchor="middle" fill={THEME.accent.amber} fontSize="14">↓</text>}
              </g>
            ))}
            {/* Common end */}
            <rect x="200" y="310" width="350" height="40" rx="10" fill="#111827" stroke={THEME.accent.blue} strokeWidth="2" />
            <text x="375" y="335" textAnchor="middle" fill={THEME.accent.blue} fontSize="12" fontWeight="700">Használatbavételi engedély / Hatósági bizonyítvány</text>
            {/* Clickable detail boxes */}
            {Object.entries(flowDetails).map(([key, d], i) => (
              <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                <rect x={20 + (i % 3) * 245} y={370 + Math.floor(i / 3) * 42} width="235" height="35" rx="8" fill={activeEl === key ? d.color + "33" : "#111827"} stroke={d.color} strokeWidth={activeEl === key ? 2 : 1} />
                <text x={20 + (i % 3) * 245 + 118} y={370 + Math.floor(i / 3) * 42 + 22} textAnchor="middle" fill={d.color} fontSize="10" fontWeight="600">{d.title}</text>
              </g>
            ))}
          </svg>
        </DiagramWrapper>
      )}

      {subTab === "docs" && (
        <DiagramWrapper>
          <svg viewBox="0 0 750 420" style={{ width: "100%" }}>
            <text x="375" y="25" textAnchor="middle" fill={THEME.text.heading} fontSize="14" fontWeight="700">SZÜKSÉGES DOKUMENTUMOK CHECKLIST</text>
            {Object.entries(docsDetails).map(([key, d], i) => (
              <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                <rect x={20 + (i % 2) * 370} y={50 + Math.floor(i / 2) * 52} width="350" height="44" rx="8" fill={activeEl === key ? d.color + "22" : "#111827"} stroke={d.color} strokeWidth={activeEl === key ? 2.5 : 1.5} />
                <text x={35 + (i % 2) * 370} y={50 + Math.floor(i / 2) * 52 + 18} fill={d.color} fontSize="11" fontWeight="700">{activeEl === key ? "✓" : "☐"} {d.title}</text>
                <text x={35 + (i % 2) * 370} y={50 + Math.floor(i / 2) * 52 + 35} fill={THEME.text.muted} fontSize="9">{d.detail.substring(0, 55)}...</text>
              </g>
            ))}
            <rect x="150" y="270" width="450" height="40" rx="8" fill="#1a1a0e" stroke={THEME.accent.amber} strokeWidth="1.5" />
            <text x="375" y="295" textAnchor="middle" fill={THEME.accent.amber} fontSize="11" fontWeight="600">⚠ Minden dokumentumot a tervezéssel PÁRHUZAMOSAN indíts — a közműnyilatkozatok 30-60 napig tartanak!</text>
          </svg>
        </DiagramWrapper>
      )}

      {subTab === "roles" && (
        <DiagramWrapper>
          <svg viewBox="0 0 750 380" style={{ width: "100%" }}>
            <text x="375" y="25" textAnchor="middle" fill={THEME.text.heading} fontSize="14" fontWeight="700">SZEREPLŐK AZ ÉPÍTKEZÉSEN</text>
            {/* Central "you" */}
            <circle cx="375" cy="160" r="35" fill="#1e293b" stroke={THEME.accent.amber} strokeWidth="2.5" />
            <text x="375" y="155" textAnchor="middle" fill={THEME.accent.amber} fontSize="12" fontWeight="800">TE</text>
            <text x="375" y="170" textAnchor="middle" fill={THEME.text.muted} fontSize="8">(Építtető)</text>
            {/* Surrounding roles */}
            {[
              { key: "designer", angle: -120, label: "Tervező", icon: "📐", color: THEME.accent.blue },
              { key: "struct_eng", angle: -60, label: "Statikus", icon: "🏗️", color: THEME.accent.red },
              { key: "contractor", angle: 0, label: "Kivitelező", icon: "👷", color: THEME.accent.amber },
              { key: "inspector_role", angle: 60, label: "Műsz. ellenőr", icon: "🔍", color: THEME.accent.green },
              { key: "energy_cert", angle: 120, label: "Energetikus", icon: "🌡️", color: THEME.accent.teal },
              { key: "geodezia", angle: 180, label: "Geodéta", icon: "📍", color: THEME.accent.purple },
            ].map((role) => {
              const rad = (role.angle * Math.PI) / 180;
              const rx = 375 + Math.cos(rad) * 150;
              const ry = 160 + Math.sin(rad) * 100;
              return (
                <g key={role.key} onClick={() => setActiveEl(activeEl === role.key ? null : role.key)} style={{ cursor: "pointer" }}>
                  <line x1="375" y1="160" x2={rx} y2={ry} stroke={role.color} strokeWidth="1" opacity="0.4" strokeDasharray="4,4" />
                  <rect x={rx - 55} y={ry - 22} width="110" height="44" rx="10" fill={activeEl === role.key ? role.color + "33" : "#111827"} stroke={role.color} strokeWidth={activeEl === role.key ? 2.5 : 1.5} />
                  <text x={rx} y={ry - 2} textAnchor="middle" fill={THEME.text.heading} fontSize="10" fontWeight="600">{role.icon} {role.label}</text>
                  <text x={rx} y={ry + 13} textAnchor="middle" fill={THEME.text.muted} fontSize="8">[kattints]</text>
                </g>
              );
            })}
            <text x="375" y="310" textAnchor="middle" fill={THEME.accent.red} fontSize="11" fontWeight="600">⚠ A műszaki ellenőr a TE embered — NEM a kivitelezőé!</text>
            <text x="375" y="330" textAnchor="middle" fill={THEME.text.muted} fontSize="10">Szerződést MINDENKIVEL írásban köss (Ptk. vállalkozási szerződés)</text>
          </svg>
        </DiagramWrapper>
      )}

      {subTab === "enaplo" && (
        <DiagramWrapper>
          <svg viewBox="0 0 750 320" style={{ width: "100%" }}>
            <text x="375" y="25" textAnchor="middle" fill={THEME.text.heading} fontSize="14" fontWeight="700">E-NAPLÓ (Elektronikus Építési Napló)</text>
            <text x="375" y="45" textAnchor="middle" fill={THEME.text.muted} fontSize="10">e-epites.hu — 2013 óta kötelező minden építkezésen</text>
            {Object.entries(eNaploDetails).map(([key, d], i) => (
              <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                <rect x={20 + i * 180} y={70} width="170" height="80" rx="10" fill={activeEl === key ? d.color + "22" : "#111827"} stroke={d.color} strokeWidth={activeEl === key ? 2.5 : 1.5} />
                <text x={105 + i * 180} y={100} textAnchor="middle" fill={d.color} fontSize="11" fontWeight="700">{d.title}</text>
                <text x={105 + i * 180} y={118} textAnchor="middle" fill={THEME.text.muted} fontSize="8">[kattints]</text>
                {i < 3 && <text x={195 + i * 180} y={110} fill="#475569" fontSize="16">→</text>}
              </g>
            ))}
            <rect x="100" y="180" width="550" height="50" rx="8" fill="#1a0e0e" stroke={THEME.accent.red} strokeWidth="1.5" />
            <text x="375" y="202" textAnchor="middle" fill={THEME.accent.red} fontSize="11" fontWeight="700">⚠ E-napló nélküli építkezés = ILLEGÁLIS ÉPÍTKEZÉS</text>
            <text x="375" y="220" textAnchor="middle" fill={THEME.text.muted} fontSize="10">Bírság + használatbavételi engedély megtagadása + CSOK visszafizetés!</text>
            <rect x="100" y="250" width="550" height="45" rx="8" fill="#0e1a14" stroke={THEME.accent.green} strokeWidth="1" />
            <text x="375" y="270" textAnchor="middle" fill={THEME.accent.green} fontSize="10" fontWeight="600">TIPP: Hetente ellenőrizd az e-naplót — a kivitelező tényleg vezeti-e?</text>
            <text x="375" y="285" textAnchor="middle" fill={THEME.text.muted} fontSize="9">A rejtett munkák (vasalás, csővezetékek) elfogadása FOTÓVAL a legjobb!</text>
          </svg>
        </DiagramWrapper>
      )}

      {activeEl && details[activeEl] && <DetailPanel color={details[activeEl].color} title={details[activeEl].title} detail={details[activeEl].detail} />}
      <ClickHint />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BUDGET DIAGRAM — Költségvetés
   ═══════════════════════════════════════════════════════════════ */
function BudgetDiagram() {
  const [subTab, setSubTab] = useState("breakdown");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [
    { id: "breakdown", label: "💰 Költségbontás" },
    { id: "milestones", label: "📅 Fizetési ütemezés" },
    { id: "hidden", label: "⚠️ Rejtett költségek" },
    { id: "quotes", label: "📝 Árajánlat" },
  ];

  const breakdownDetails = {
    structure: { title: "Szerkezet (35-40%)", color: THEME.accent.blue, detail: "Alap, falak, födém, tető, koszorúk, áthidalók. A LEGNAGYOBB költségtétel. 120 m² ház: 15-25M Ft. Ide tartozik: földmunka, beton, tégla (Porotherm), vasalás, tetőfedés, állványzat. TIPP: a szerkezetben NE spórolj — ami a falban/alapban van, azt utólag nem javítható olcsón. A tégla és beton ára fix, a munkaerő drágult 2022-24 között ~30-40%-ot." },
    mep: { title: "Gépészet (20-25%)", color: THEME.accent.red, detail: "Fűtés (hőszivattyú: 2-4M Ft), vízvezeték, csatorna, szellőzés (HRV: 800k-1.5M Ft), villanyszerelés. 120 m² ház: 8-16M Ft. A hőszivattyú a legnagyobb tétel — NE a legolcsóbbat válaszd! Daikin, Vaillant, Bosch megbízható márkák. A gépészet minősége határozza meg a komfortot és az üzemeltetési költséget 20-30 évre." },
    finishing: { title: "Befejezés (25-30%)", color: THEME.accent.amber, detail: "Belső vakolás, festés, burkolás, nyílászárók, belső ajtók, konyhabútor, fürdőszoba szaniter, padlóburkolat, lépcső. 120 m² ház: 10-20M Ft. Itt a LEGNAGYOBB a szórás — egy olasz csempe 3x annyiba kerül, mint a hazai. TIPP: a befejezésnél könnyen túlköltesz! Állíts fel büdzsét anyagonként, és tartsd magad hozzá." },
    design_admin: { title: "Tervezés + Admin (5-10%)", color: THEME.accent.purple, detail: "Építész: 500k-2M Ft, statikus: 150-500k Ft, gépész: 200-600k Ft, villamos: 100-300k Ft, energetikus: 130-350k Ft, geodéta: 80-230k Ft, talajmechanika: 80-180k Ft. Engedélyezés, e-napló, műszaki ellenőr (500k-1.5M Ft). ÖSSZESEN: 2-5M Ft. EZ NEM FELESLEGES KÖLTSÉG — a jó tervek 15-20%-ot spórolnak a kivitelezésen!" },
    per_sqm: { title: "Fajlagos költség (Ft/m²)", color: THEME.accent.green, detail: "2024-25-ös árak (kulcsrakész): Egyszerű, takarékos: 600-750k Ft/m². Átlagos minőség: 750-900k Ft/m². Jó minőség: 900k-1.2M Ft/m². Prémium: 1.2M+ Ft/m². 120 m² átlagos ház: 90-108M Ft kulcsrakész. FONTOS: a 'kulcsrakész' definíciója változó! Kérdezd meg: tartalmazza-e a kerítést, tereprendezést, garázst, teraszburkolatot." },
    warranty: { title: "Garancia", color: THEME.accent.teal, detail: "Ptk. szerinti kötelező jótállás: Szerkezet (alap, fal, tető): 5 év. Gépészet (fűtés, víz, villany): 3 év. Befejező munkák: 1-3 év. A jótállás a műszaki átadás-átvételtől indul. FONTOS: garanciális igényt ÍRÁSBAN jelezd, és adj 15 napos határidőt! Fotózzál, dokumentálj. Az e-napló a bizonyíték, hogy mit, mikor csináltak." },
  };

  const milestoneDetails = {
    m1: { title: "1. Előleg (10-15%)", color: THEME.accent.blue, detail: "Szerződéskötéskor, anyagbeszerzésre. MAX 15% előleg! Ha a kivitelező 30-50%-ot kér előre → PIROS ZÁSZLÓ. Az előlegről SZÁMLÁT kérj. A szerződésben rögzítsd: mire fordítja, és mi történik, ha nem kezd dolgozni." },
    m2: { title: "2. Alap kész (15-20%)", color: THEME.accent.teal, detail: "Alap + vízszigetelés + feltöltés elkészülte után. A műszaki ellenőr ÁTVESZI a rejtett munkákat (vasalás, vízszigetelés). Fizetés: CSAK az átvétel után! TIPP: vasalás fotózása + nyomáspróba jegyzőkönyv = bizonyíték." },
    m3: { title: "3. Falak + Födém (20-25%)", color: THEME.accent.orange, detail: "Teherhordó falak, koszorú, födém, belső válaszfalak kész. Ez a legnagyobb anyagigényű fázis (tégla, beton, vas). A műszaki ellenőr újra ellenőriz. Fizetés: teljesítésigazolás alapján." },
    m4: { title: "4. Tető + Nyílászárók (15-20%)", color: THEME.accent.purple, detail: "Tetőszerkezet + tetőfedés + nyílászárók beépítve. A ház innentől CSAPADÉKMENTES. A nyílászárókra jellemzően 50% előleg + 50% beépítéskor. RAL-beépítést követelj meg (és ellenőriztesd)!" },
    m5: { title: "5. Gépészet + Szigetelés (15-20%)", color: THEME.accent.red, detail: "Víz-csatorna, fűtés, villany, szellőzés, homlokzati szigetelés. Nyomáspróba-jegyzőkönyvek, villamos mérési jegyzőkönyv. FONTOS: a rejtett gépészeti munkákat (fali vezetékek, padlófűtés csövek) a lefedés ELŐTT fotózd és vetesd el a műszaki ellenőrrel!" },
    m6: { title: "6. Befejezés + Visszatartás (10-15%)", color: THEME.accent.green, detail: "Belső burkolás, festés, szaniterek, konyha. Az utolsó 5-10%-ot TARTSD VISSZA hibajavításra! Ez a 'visszatartás' — a Ptk. megengedi. A műszaki átadás-átvételi jegyzőkönyv rögzíti a hiányosságokat. Hibalista: minden hibát ÍRÁSBAN, fényképpel. Javítási határidő: 15-30 nap." },
  };

  const hiddenDetails = {
    utility_conn: { title: "Közműcsatlakozás", color: THEME.accent.red, detail: "Víz bekötés: 200-500k Ft. Csatorna: 200-800k Ft. Villany (3x32A): 300-800k Ft. Gáz: 300-600k Ft. ÖSSZESEN: 1-3M Ft! Ha nincs közcsatorna → szikkasztó: 300-800k Ft, vagy házi szennyvízkezelő: 1-3M Ft. Ez az egyik leggyakrabban elfelejtett tétel." },
    temp_power: { title: "Ideiglenes áram + víz", color: THEME.accent.amber, detail: "Építkezés alatt: ideiglenes villamos csatlakozás (100-200k Ft) + vízvételi lehetőség. Ha nincs közeli csatlakozási pont → aggregátor (üzemanyag: 50-100k Ft/hó) vagy hosszabbító a szomszédtól (megállapodás írásban!)." },
    landscaping: { title: "Tereprendezés + kerítés", color: THEME.accent.green, detail: "Humusz visszahordás, füvesítés, járda, teraszburkolat, kerítés. Kerítés: 15-30k Ft/fm (drótkerítés) vagy 40-80k Ft/fm (tégla/kő). 60 fm-es telek: 900k-4.8M Ft. Térburkolat: 8-15k Ft/m². ÖSSZESEN: 2-5M Ft." },
    permits_cost: { title: "Engedélyek + tervezés", color: THEME.accent.purple, detail: "Tervezők díja (összes szak): 2-5M Ft. Geodéta: 80-230k Ft. Talajmechanika: 80-180k Ft. Műszaki ellenőr: 500k-1.5M Ft. Energetikai tanúsítvány: 50-150k Ft. ÖSSZESEN: 3-7M Ft. Sokan csak a 'fizikai' építkezésre terveznek, és a tervezés-admin 5-7M Ft-jára nem." },
    unexpected: { title: "Nem tervezett munkák", color: THEME.accent.red, detail: "10-15% tartalék a teljes költségvetésre! Példák: rosszabb talaj mint várták (mélyebb alap), tervmódosítás, anyagár-emelkedés, alvállalkozó cseréje, időjárás miatti késés, közműáthelyezés. SOHA ne tervezz a fillérre — a tartalék nélküli építkezés félbemaradhat." },
    furnishing: { title: "Berendezés + költözés", color: THEME.accent.cyan, detail: "Konyhabútor (anyaggal): 1-4M Ft. Beépített szekrények: 500k-2M Ft. Világítás (lámpatestek): 200-800k Ft. Költözés: 100-300k Ft. Kert (növények, öntözés): 300k-1.5M Ft. ÖSSZESEN: 2-8M Ft. A 'kulcsrakész' ár ezeket NEM tartalmazza!" },
  };

  const quotesDetails = {
    compare: { title: "Árajánlat összehasonlítás", color: THEME.accent.blue, detail: "Min. 3 árajánlatot kérj, AZONOS műszaki tartalom alapján (kiviteli terv!). Hasonlítsd össze: tételesen (ne csak az összárat), anyagminőség (márka, típus megnevezve), munka+anyag külön, fizetési ütemezés, határidő, garancia. A legolcsóbb ajánlat gyakran a legdrágább: hiányos tartalom, pótmunka, rossz minőség." },
    redflags: { title: "Piros zászlók (Red flags)", color: THEME.accent.red, detail: "1. 30%+ előleg kérés. 2. Nincs írásos szerződés. 3. 'Majd kiderül az ára' tételes ajánlat nélkül. 4. Nem vállalja az e-napló vezetést. 5. 'Nem kell tervező/statikus'. 6. Saját műszaki ellenőrt ajánl. 7. Készpénzben, számla nélkül kéri a fizetést. 8. Nem ad referenciát. 9. Irreálisan olcsó ajánlat (valahol spórolni fog). 10. Nem hajlandó tételes kiírás alapján ajánlatot adni." },
    contract: { title: "Vállalkozási szerződés", color: THEME.accent.green, detail: "KÖTELEZŐ tartalma: felek adatai, műszaki tartalom (tervre hivatkozás), vállalási ár (fix vagy elszámolásos), fizetési ütemezés, kezdési és befejezési határidő, kötbér késés esetén (napi 0,1-0,5%), garancia, vis major, szerződésbontás feltételei. TIPP: ügyvéddel nézessed át (50-100k Ft). A szóbeli megállapodás NEM elég — vitánál bizonyíthatatlan." },
    potmunka: { title: "Pótmunka kezelése", color: THEME.accent.amber, detail: "Pótmunka = a szerződésben NEM szereplő, de szükséges munka. MINDIG írásos megrendelővel, ELŐZETESEN elfogadott árral! Ne fogadd el utólagosan: 'ja, ezt meg ezt is megcsináltuk, X millió lesz'. A jó szerződés tartalmaz pótmunka-kezelési eljárást. A műszaki ellenőr feladata a pótmunka jogosságának megítélése." },
  };

  const details = subTab === "breakdown" ? breakdownDetails : subTab === "milestones" ? milestoneDetails : subTab === "hidden" ? hiddenDetails : quotesDetails;

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />

      {subTab === "breakdown" && (
        <DiagramWrapper>
          <svg viewBox="0 0 750 420" style={{ width: "100%" }}>
            <text x="375" y="25" textAnchor="middle" fill={THEME.text.heading} fontSize="14" fontWeight="700">KÖLTSÉGMEGOSZLÁS (120 m² ház, átlagos minőség)</text>
            {/* Pie chart - simplified with arcs */}
            <circle cx="200" cy="210" r="140" fill="none" stroke="#1e293b" strokeWidth="40" />
            {/* Pie segments as colored arcs */}
            <circle cx="200" cy="210" r="140" fill="none" stroke={THEME.accent.blue} strokeWidth="42" strokeDasharray="330 550" strokeDashoffset="0" opacity={activeEl === "structure" ? 1 : 0.7} onClick={() => setActiveEl("structure")} style={{ cursor: "pointer" }} />
            <circle cx="200" cy="210" r="140" fill="none" stroke={THEME.accent.red} strokeWidth="42" strokeDasharray="198 682" strokeDashoffset="-330" opacity={activeEl === "mep" ? 1 : 0.7} onClick={() => setActiveEl("mep")} style={{ cursor: "pointer" }} />
            <circle cx="200" cy="210" r="140" fill="none" stroke={THEME.accent.amber} strokeWidth="42" strokeDasharray="242 638" strokeDashoffset="-528" opacity={activeEl === "finishing" ? 1 : 0.7} onClick={() => setActiveEl("finishing")} style={{ cursor: "pointer" }} />
            <circle cx="200" cy="210" r="140" fill="none" stroke={THEME.accent.purple} strokeWidth="42" strokeDasharray="110 770" strokeDashoffset="-770" opacity={activeEl === "design_admin" ? 1 : 0.7} onClick={() => setActiveEl("design_admin")} style={{ cursor: "pointer" }} />
            {/* Center text */}
            <text x="200" y="200" textAnchor="middle" fill={THEME.text.heading} fontSize="16" fontWeight="800">90-108M</text>
            <text x="200" y="220" textAnchor="middle" fill={THEME.text.muted} fontSize="10">Ft összesen</text>
            {/* Legend */}
            {[
              { key: "structure", label: "Szerkezet 35-40%", color: THEME.accent.blue, y: 90 },
              { key: "mep", label: "Gépészet 20-25%", color: THEME.accent.red, y: 125 },
              { key: "finishing", label: "Befejezés 25-30%", color: THEME.accent.amber, y: 160 },
              { key: "design_admin", label: "Tervezés+Admin 5-10%", color: THEME.accent.purple, y: 195 },
              { key: "per_sqm", label: "Fajlagos: 750-900k Ft/m²", color: THEME.accent.green, y: 240 },
              { key: "warranty", label: "Garancia (3-5 év)", color: THEME.accent.teal, y: 275 },
            ].map((item) => (
              <g key={item.key} onClick={() => setActiveEl(activeEl === item.key ? null : item.key)} style={{ cursor: "pointer" }}>
                <rect x="420" y={item.y} width="300" height="28" rx="6" fill={activeEl === item.key ? item.color + "33" : "#111827"} stroke={item.color} strokeWidth={activeEl === item.key ? 2 : 1} />
                <rect x="428" y={item.y + 7} width="14" height="14" rx="3" fill={item.color} />
                <text x="450" y={item.y + 19} fill={THEME.text.heading} fontSize="11" fontWeight="600">{item.label}</text>
              </g>
            ))}
            <text x="570" y="340" textAnchor="middle" fill={THEME.text.muted} fontSize="10">2024-25 átlagos árak</text>
            <text x="570" y="358" textAnchor="middle" fill={THEME.accent.amber} fontSize="10" fontWeight="600">⚠ + 10-15% tartalék kötelező!</text>
          </svg>
        </DiagramWrapper>
      )}

      {subTab === "milestones" && (
        <DiagramWrapper>
          <svg viewBox="0 0 750 380" style={{ width: "100%" }}>
            <text x="375" y="25" textAnchor="middle" fill={THEME.text.heading} fontSize="14" fontWeight="700">FIZETÉSI ÜTEMEZÉS (mérföldkövek)</text>
            {/* Milestone timeline */}
            <line x1="60" y1="80" x2="700" y2="80" stroke="#334155" strokeWidth="2" />
            {Object.entries(milestoneDetails).map(([key, d], i) => {
              const x = 60 + i * 115;
              return (
                <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                  <circle cx={x + 50} cy="80" r="8" fill={activeEl === key ? d.color : "#1e293b"} stroke={d.color} strokeWidth="2.5" />
                  <rect x={x} y="100" width="110" height="65" rx="8" fill={activeEl === key ? d.color + "22" : "#111827"} stroke={d.color} strokeWidth={activeEl === key ? 2 : 1} />
                  <text x={x + 55} y="120" textAnchor="middle" fill={d.color} fontSize="10" fontWeight="700">{d.title.split("(")[0]}</text>
                  <text x={x + 55} y="138" textAnchor="middle" fill={THEME.text.heading} fontSize="14" fontWeight="800">{d.title.match(/\(([^)]+)\)/)?.[1] || ""}</text>
                  <text x={x + 55} y="155" textAnchor="middle" fill={THEME.text.muted} fontSize="8">[kattints]</text>
                </g>
              );
            })}
            <rect x="100" y="200" width="550" height="50" rx="8" fill="#1a0e0e" stroke={THEME.accent.red} strokeWidth="1.5" />
            <text x="375" y="220" textAnchor="middle" fill={THEME.accent.red} fontSize="11" fontWeight="700">⚠ SOHA ne fizess előre 15%-nál többet!</text>
            <text x="375" y="238" textAnchor="middle" fill={THEME.text.muted} fontSize="10">Mindig teljesítésigazolás (műszaki ellenőr) UTÁN fizess!</text>
            <rect x="100" y="265" width="550" height="40" rx="8" fill="#0e1a14" stroke={THEME.accent.green} strokeWidth="1" />
            <text x="375" y="285" textAnchor="middle" fill={THEME.accent.green} fontSize="10" fontWeight="600">TIPP: Az utolsó 5-10% visszatartása a hibajavítás garanciája!</text>
            <text x="375" y="298" textAnchor="middle" fill={THEME.text.muted} fontSize="9">A Ptk. vállalkozási szerződés ezt lehetővé teszi.</text>
          </svg>
        </DiagramWrapper>
      )}

      {subTab === "hidden" && (
        <DiagramWrapper>
          <svg viewBox="0 0 750 350" style={{ width: "100%" }}>
            <text x="375" y="25" textAnchor="middle" fill={THEME.accent.red} fontSize="14" fontWeight="700">⚠ REJTETT KÖLTSÉGEK — amire sokan nem számítanak</text>
            {Object.entries(hiddenDetails).map(([key, d], i) => (
              <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                <rect x={20 + (i % 3) * 245} y={55 + Math.floor(i / 3) * 90} width="235" height="75" rx="10" fill={activeEl === key ? d.color + "22" : "#111827"} stroke={d.color} strokeWidth={activeEl === key ? 2.5 : 1.5} />
                <text x={138 + (i % 3) * 245} y={80 + Math.floor(i / 3) * 90} textAnchor="middle" fill={d.color} fontSize="11" fontWeight="700">{d.title}</text>
                <text x={138 + (i % 3) * 245} y={100 + Math.floor(i / 3) * 90} textAnchor="middle" fill={THEME.text.muted} fontSize="9">{d.detail.substring(0, 50)}...</text>
                <text x={138 + (i % 3) * 245} y={118 + Math.floor(i / 3) * 90} textAnchor="middle" fill={THEME.text.muted} fontSize="8">[kattints a részletekért]</text>
              </g>
            ))}
            <rect x="100" y="280" width="550" height="40" rx="8" fill="#1a1a0e" stroke={THEME.accent.amber} strokeWidth="1.5" />
            <text x="375" y="305" textAnchor="middle" fill={THEME.accent.amber} fontSize="12" fontWeight="700">Rejtett költségek összesen: +8-20M Ft (a teljes büdzsé 10-20%-a!)</text>
          </svg>
        </DiagramWrapper>
      )}

      {subTab === "quotes" && (
        <DiagramWrapper>
          <svg viewBox="0 0 750 300" style={{ width: "100%" }}>
            <text x="375" y="25" textAnchor="middle" fill={THEME.text.heading} fontSize="14" fontWeight="700">ÁRAJÁNLAT & SZERZŐDÉS</text>
            {Object.entries(quotesDetails).map(([key, d], i) => (
              <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                <rect x={20 + (i % 2) * 370} y={55 + Math.floor(i / 2) * 80} width="350" height="65" rx="10" fill={activeEl === key ? d.color + "22" : "#111827"} stroke={d.color} strokeWidth={activeEl === key ? 2.5 : 1.5} />
                <text x={195 + (i % 2) * 370} y={80 + Math.floor(i / 2) * 80} textAnchor="middle" fill={d.color} fontSize="12" fontWeight="700">{d.title}</text>
                <text x={195 + (i % 2) * 370} y={100 + Math.floor(i / 2) * 80} textAnchor="middle" fill={THEME.text.muted} fontSize="9">[kattints a részletekért]</text>
              </g>
            ))}
          </svg>
        </DiagramWrapper>
      )}

      {activeEl && details[activeEl] && <DetailPanel color={details[activeEl].color} title={details[activeEl].title} detail={details[activeEl].detail} />}
      <ClickHint />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   UTILITIES DIAGRAM — Közmű-csatlakozás
   ═══════════════════════════════════════════════════════════════ */
function UtilitiesDiagram() {
  const [subTab, setSubTab] = useState("water");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [
    { id: "water", label: "🚰 Víz" },
    { id: "sewer", label: "🏗️ Csatorna" },
    { id: "electric", label: "⚡ Villany" },
    { id: "gas_net", label: "🔥 Gáz & Internet" },
    { id: "storm", label: "🌧️ Csapadékvíz" },
  ];

  const waterDetails = {
    plan: { title: "Bekötési terv", color: THEME.accent.blue, detail: "A víziközmű-szolgáltató (pl. Fővárosi Vízművek, DRV, TRV) készíti vagy készítteti. Tartalmazza: csatlakozási pont, nyomvonal, csőméret (tipikusan PE32 vagy PE40). Díj: 50-150k Ft a tervért. Benyújtás: a szolgáltatónál, engedélyezési tervvel együtt." },
    meter: { title: "Vízmérőakna", color: THEME.accent.teal, detail: "A telekhatáron belül, a csatlakozási pontnál. Előregyártott beton vagy műanyag akna. Mérete: Ø 80-100 cm, mélység: 80-120 cm (fagymentes). A vízmérőt a szolgáltató szereli be. FONTOS: a telekhatártól a házig a bekötővezeték a TE felelősséged — fagymentesen (80 cm mélyen) kell vezetni!" },
    cost: { title: "Csatlakozási díj", color: THEME.accent.amber, detail: "Egyszeri csatlakozási díj: 100-400k Ft (szolgáltató és hely függő). Plusz a földmunka és csőszerelés: 100-200k Ft. ÖSSZESEN: 200-600k Ft. Ha a fővezeték messze van (>20 m) → drágább, akár 500k-1M Ft. TIPP: a telek vásárlása előtt ellenőrizd, hol van a legközelebbi csatlakozási pont!" },
    internal: { title: "Belső vízhálózat", color: THEME.accent.green, detail: "A vízmérőtől a házba: PE cső (kívül) → PPR vagy PEX-AL-PEX (belül). Elosztás: csillagpontos (osztó-gyűjtővel minden ponthoz külön cső) VAGY soros. Csillagpontos: drágább, de minden pont egyenlő nyomást kap, és javítható elzárás nélkül. Melegvíz: a hőszivattyú HMV tárolójából keringtetéssel (komfort + legionella-véd)." },
  };

  const sewerDetails = {
    gravity: { title: "Gravitációs csatorna", color: THEME.accent.blue, detail: "A legjobb megoldás: a szennyvíz önmagától folyik a közcsatornába. Feltétel: a csatlakozási pont alacsonyabban legyen, mint a ház kifolyója. Minimális esés: 1-2% (1 cm/m). KG cső (narancs) Ø110-160, homokágyba fektetve. Ellenőrző akna 10-15 méterenként és irányváltásnál." },
    pump: { title: "Átemelő (szivattyús)", color: THEME.accent.amber, detail: "Ha a csatorna magasabban van, mint a ház → átemelő szivattyú kell. Gyűjtőakna a ház mellett, benne 1-2 szivattyú. Költség: 300-800k Ft (telepítve). Hátrány: áramszünetben nem működik (tartalék akkumulátor ajánlott), karbantartást igényel (évi 1x ellenőrzés), szag lehetséges." },
    szikkaszto: { title: "Szikkasztó (nincs közcsatorna)", color: THEME.accent.red, detail: "Községekben gyakori: nincs közcsatorna. Régi megoldás: szikkasztó (betongyűrűk) — 2015 óta TILOS új építésnél! Modern megoldás: házi szennyvízkezelő (biológiai tisztító): 1-3M Ft telepítve. A tisztított vizet szikkasztóba vagy patakba vezeti. Engedélyköteles (vízügyi hatóság)! Zárt gyűjtő (szippantós): utolsó megoldás, 3-5k Ft/m³ szippantás." },
    cost_s: { title: "Csatorna csatlakozási költség", color: THEME.accent.teal, detail: "Közcsatorna bekötés: 200-800k Ft (távolságtól függően). A csatlakozási pont kiépítését a szolgáltató végzi, a telek belső hálózatát a tulajdonos. TIPP: a csatorna mélysége (2-4 m) befolyásolja, hogy gravitációs vagy átemelős megoldás kell-e — a tervező a szolgáltatói adatokból számítja ki." },
  };

  const electricDetails = {
    connection: { title: "Villamos csatlakozás", color: THEME.accent.amber, detail: "Standard háztartás: 3×32A (22 kW) vagy 3×40A (28 kW). Hőszivattyúval: min. 3×32A, de 3×40A ajánlott. Napelemmel: a betáplálási teljesítményt is figyelembe kell venni. Csatlakozási kérelmet a szolgáltatónak (E.ON, ELMŰ, DÉMÁSZ stb.) kell benyújtani — 30-90 napos ügyintézés!" },
    mero: { title: "Mérőszekrény", color: THEME.accent.blue, detail: "A telekhatáron: szabadtéri mérőszekrény (CSP). Benne: főbiztosító + fogyasztásmérő. Innen a házig: 4-5 eres földkábel (NYY-J 5x10 mm² vagy 5x16 mm²), 60 cm mélyen, homokágyba, védőcsőben. A mérőszekrénytől a házig a vezeték a TE költséged!" },
    cost_e: { title: "Csatlakozási díj", color: THEME.accent.red, detail: "Egyszeri csatlakozási díj (szolgáltatófüggő): 200-600k Ft (3×32A). 3×40A: +50-100k Ft. Plusz földkábel + mérőszekrény + földmunka: 100-300k Ft. ÖSSZESEN: 300-900k Ft. Fontos: az ideiglenes (építkezés alatti) csatlakozás külön díj: 100-200k Ft!" },
    solar_conn: { title: "Napelem csatlakozás", color: THEME.accent.green, detail: "Napelemmel: kétirányú mérő szükséges (szaldó elszámolás). A szolgáltatóval egyeztetni KELL — csatlakozási kérelmet kell benyújtani a napelemes rendszerre is. Ügyintézés: 4-12 hét. A rendszert ÉÁSZ (villamosmérnök) tervezi, és a szerelést is jogosult villanyszerelő végzi. Használatbavételi engedély a napelem rendszerre is kell!" },
  };

  const gasNetDetails = {
    gas: { title: "Gáz csatlakozás", color: THEME.accent.orange, detail: "Hőszivattyús házban NEM KELL gáz — csak villany. Ha mégis (kondenzációs kazán + tűzhely): csatlakozási díj: 200-600k Ft. Gáztervező kell, gáz nyomáspróba kötelező, gázszerelő csak minősített lehet (TIGÁZ, FŐGÁZ stb. regisztrált). Modern építkezésen EGYRE RITKÁBB — a hőszivattyú gazdaságosabb." },
    internet: { title: "Internet / Optika", color: THEME.accent.blue, detail: "Üres védőcső (Ø 32-40mm) a telekhatártól a házig — építsd be MOST! Az optikai szolgáltató (Telekom, DIGI, Invitel) ezt használja majd. A ház belsejében: Cat6 UTP kábel minden szobába (patch panelből kiindulva). WiFi AP előkészítés: UTP + tápkábel a mennyezetre (PoE). A védőcső beépítése 5000 Ft — utólag ásni 50-100k Ft!" },
    conduit_tip: { title: "Védőcső összefoglaló", color: THEME.accent.green, detail: "Építs be üres védőcsövet MINDENHOVA, amerre BÁRMIKOR kábelre lehet szükség! Telekhatár → ház (Ø40 mm, min. 2 db): 1 víz mellé, 1 elektromos mellé. Ház belsejében: padlóban, falban, patch paneltől mindenhova Ø25 mm. Tető felé: kamera, antenna, napelem bővítés. Költség: szinte nulla. Utólag pótolni: LEHETETLEN (vagy nagyon drága)." },
  };

  const stormDetails = {
    szikkaszto_csap: { title: "Csapadékvíz szikkasztó", color: THEME.accent.blue, detail: "A leggyakoribb megoldás: szikkasztóaknák (betongyűrűk vagy műanyag blokkok) a telken belül. A tető csapadékvizét + a térburkolat lefolyóvizét ide vezetjük. Méretezés: tető m² × csapadékintenzitás. 120 m² tető: 4-8 m³ szikkasztó. Költség: 200-500k Ft. Homokos talajban jól szikkad, agyagban LASSAN — nagyobb szikkasztó kell!" },
    gyujto: { title: "Esővízgyűjtő tartály", color: THEME.accent.green, detail: "Földbe süllyesztett PE tartály (2-5 m³): a tető csapadékvizét gyűjti → öntözésre használható. Szivattyúval locsolórendszerre kötve. 200 m² kert öntözése: évi 50-100 m³ víz megtakarítás (10-20k Ft). Beruházás: 200-600k Ft. Megtérülés: 10-20 év (de környezetbarát + szikkasztó terhelést csökkenti)." },
    elvezetes: { title: "Felszíni elvezetés", color: THEME.accent.amber, detail: "Folyóka, vályú, árkolás a felszíni víz elvezetésére. Fontos: a csapadékvíz NEM vezethető a szomszéd telekre (jogszabály)! Lejtés a háztól kifelé: min. 2-3%. A ház körüli járda/térburkolat is lejtsen kifelé. Dréncsövezés: az alap mellé, ha magas a talajvíz (kavicságy + geotextília + drén → szikkasztóba)." },
    szabaly: { title: "Jogszabályi háttér", color: THEME.accent.purple, detail: "A csapadékvíz a saját telken belül kezelendő (OTÉK, helyi HÉSZ). A közcsatornába NEM vezethető (vagy csak külön engedéllyel, egyesített csatornánál)! A szomszéd telekre átvezetni TILOS. Új építésnél a csapadékvíz-kezelés a használatbavételi engedély feltétele. Méretezés: 10 perces, 1%-os gyakoriságú csapadékintenzitásra (MSZ EN 12056)." },
  };

  const details = subTab === "water" ? waterDetails : subTab === "sewer" ? sewerDetails : subTab === "electric" ? electricDetails : subTab === "gas_net" ? gasNetDetails : stormDetails;

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />
      <DiagramWrapper>
        <svg viewBox="0 0 750 350" style={{ width: "100%" }}>
          {subTab === "water" && (
            <g>
              <text x="375" y="25" textAnchor="middle" fill={THEME.accent.blue} fontSize="14" fontWeight="700">VÍZBEKÖTÉS</text>
              {/* Water connection flow */}
              {[
                { x: 30, y: 60, w: 130, h: 70, label: "Fővezeték", sub: "(utcában)", color: THEME.accent.blue, key: "plan" },
                { x: 195, y: 60, w: 130, h: 70, label: "Vízmérő-akna", sub: "(telekhatáron)", color: THEME.accent.teal, key: "meter" },
                { x: 360, y: 60, w: 130, h: 70, label: "Bekötőcső", sub: "PE32/40, 80cm mélyen", color: THEME.accent.amber, key: "cost" },
                { x: 525, y: 60, w: 150, h: 70, label: "Házi elosztás", sub: "PPR / PEX-AL-PEX", color: THEME.accent.green, key: "internal" },
              ].map((n, i) => (
                <g key={n.key} onClick={() => setActiveEl(activeEl === n.key ? null : n.key)} style={{ cursor: "pointer" }}>
                  <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="10" fill={activeEl === n.key ? n.color + "33" : "#111827"} stroke={n.color} strokeWidth={activeEl === n.key ? 2.5 : 1.5} />
                  <text x={n.x + n.w / 2} y={n.y + 28} textAnchor="middle" fill={n.color} fontSize="11" fontWeight="700">{n.label}</text>
                  <text x={n.x + n.w / 2} y={n.y + 46} textAnchor="middle" fill={THEME.text.muted} fontSize="9">{n.sub}</text>
                  {i < 3 && <text x={n.x + n.w + 15} y={n.y + 38} fill="#475569" fontSize="16">→</text>}
                </g>
              ))}
              <text x="375" y="160" textAnchor="middle" fill={THEME.text.muted} fontSize="10">Csatlakozási díj: 200-600k Ft | Átfutás: 30-90 nap</text>
            </g>
          )}
          {subTab === "sewer" && (
            <g>
              <text x="375" y="25" textAnchor="middle" fill={THEME.accent.teal} fontSize="14" fontWeight="700">CSATORNA-CSATLAKOZÁS</text>
              {Object.entries(sewerDetails).map(([key, d], i) => (
                <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                  <rect x={20 + (i % 2) * 370} y={55 + Math.floor(i / 2) * 80} width="350" height="65" rx="10" fill={activeEl === key ? d.color + "22" : "#111827"} stroke={d.color} strokeWidth={activeEl === key ? 2.5 : 1.5} />
                  <text x={195 + (i % 2) * 370} y={80 + Math.floor(i / 2) * 80} textAnchor="middle" fill={d.color} fontSize="11" fontWeight="700">{d.title}</text>
                  <text x={195 + (i % 2) * 370} y={100 + Math.floor(i / 2) * 80} textAnchor="middle" fill={THEME.text.muted} fontSize="9">[kattints a részletekért]</text>
                </g>
              ))}
            </g>
          )}
          {subTab === "electric" && (
            <g>
              <text x="375" y="25" textAnchor="middle" fill={THEME.accent.amber} fontSize="14" fontWeight="700">VILLAMOS CSATLAKOZÁS</text>
              {Object.entries(electricDetails).map(([key, d], i) => (
                <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                  <rect x={20 + (i % 2) * 370} y={55 + Math.floor(i / 2) * 80} width="350" height="65" rx="10" fill={activeEl === key ? d.color + "22" : "#111827"} stroke={d.color} strokeWidth={activeEl === key ? 2.5 : 1.5} />
                  <text x={195 + (i % 2) * 370} y={80 + Math.floor(i / 2) * 80} textAnchor="middle" fill={d.color} fontSize="11" fontWeight="700">{d.title}</text>
                  <text x={195 + (i % 2) * 370} y={100 + Math.floor(i / 2) * 80} textAnchor="middle" fill={THEME.text.muted} fontSize="9">[kattints a részletekért]</text>
                </g>
              ))}
            </g>
          )}
          {subTab === "gas_net" && (
            <g>
              <text x="375" y="25" textAnchor="middle" fill={THEME.accent.orange} fontSize="14" fontWeight="700">GÁZ & INTERNET</text>
              {Object.entries(gasNetDetails).map(([key, d], i) => (
                <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                  <rect x={55 + i * 225} y={55} width="205" height="85" rx="10" fill={activeEl === key ? d.color + "22" : "#111827"} stroke={d.color} strokeWidth={activeEl === key ? 2.5 : 1.5} />
                  <text x={157 + i * 225} y={85} textAnchor="middle" fill={d.color} fontSize="11" fontWeight="700">{d.title}</text>
                  <text x={157 + i * 225} y={105} textAnchor="middle" fill={THEME.text.muted} fontSize="9">[kattints]</text>
                </g>
              ))}
            </g>
          )}
          {subTab === "storm" && (
            <g>
              <text x="375" y="25" textAnchor="middle" fill={THEME.accent.blue} fontSize="14" fontWeight="700">CSAPADÉKVÍZ-KEZELÉS</text>
              {Object.entries(stormDetails).map(([key, d], i) => (
                <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                  <rect x={20 + (i % 2) * 370} y={55 + Math.floor(i / 2) * 80} width="350" height="65" rx="10" fill={activeEl === key ? d.color + "22" : "#111827"} stroke={d.color} strokeWidth={activeEl === key ? 2.5 : 1.5} />
                  <text x={195 + (i % 2) * 370} y={80 + Math.floor(i / 2) * 80} textAnchor="middle" fill={d.color} fontSize="11" fontWeight="700">{d.title}</text>
                  <text x={195 + (i % 2) * 370} y={100 + Math.floor(i / 2) * 80} textAnchor="middle" fill={THEME.text.muted} fontSize="9">[kattints a részletekért]</text>
                </g>
              ))}
            </g>
          )}
        </svg>
      </DiagramWrapper>
      {activeEl && details[activeEl] && <DetailPanel color={details[activeEl].color} title={details[activeEl].title} detail={details[activeEl].detail} />}
      <ClickHint />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INTERIOR DIAGRAM — Belső Kivitelezés
   ═══════════════════════════════════════════════════════════════ */
function InteriorDiagram() {
  const [subTab, setSubTab] = useState("doors");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [
    { id: "doors", label: "🚪 Belső ajtók" },
    { id: "painting", label: "🎨 Festés" },
    { id: "flooring", label: "🏠 Padló" },
    { id: "stairs", label: "🪜 Lépcső" },
    { id: "kitchen", label: "🍳 Konyha" },
    { id: "bathroom_fin", label: "🛁 Fürdőszoba" },
  ];

  const doorDetails = {
    tokos: { title: "Tokos ajtó (tokokkal együtt beépített)", color: THEME.accent.blue, detail: "A tok a falazáskor kerül be, az ajtólap a festés után. Előny: tökéletes illeszkedés, masszív. Hátrány: vakoláskor védeni kell, méret módosítás nehéz. Anyag: fa tok (bükk, tölgy) vagy MDF tok. Méretek (szabvány): 75, 80, 90 cm széles, 200-210 cm magas (tok belméret). Tipikus ár: 40-120k Ft/db (tokkal, lappal)." },
    tokboritas: { title: "Tokborításos (utólag beépített)", color: THEME.accent.green, detail: "A falba csak a nyílás marad, a tok utólag kerül be (vakolás UTÁN). Előny: pontos méret, nem sérül a vakoláskor. Hátrány: a tok borítja a fal szélét — nem olyan masszív, mint a befalazott tok. Gyorsabb, könnyebb cserélni. Ár: 50-150k Ft/db. TIPP: ha gipszkarton válaszfalba kell → speciális álmennyezetes tok." },
    sizes: { title: "Ajtóméretek (szabvány)", color: THEME.accent.amber, detail: "Szabvány belméretek: Háló/nappali: 80-90 cm. Fürdő/WC: 70-75 cm. Bejárat: 90-100 cm. Tolóajtó: tok belméret + 10 cm. Magasság: 200-210 cm. FONTOS: a falnyílás a toknál 3-4 cm-rel nagyobb mindkét oldalon! Ajtó megrendelés: a VAKOLÁS UTÁN mérj, akkor pontos." },
    install: { title: "Beépítés sorrendje", color: THEME.accent.purple, detail: "1. Vakolás kész, száraz. 2. Padlóburkolat kész (vagy legalább a szintje ismert). 3. Tokok beépítése (vízszintezés, habosítás). 4. Festés (a tokot leragasztod). 5. Ajtólapok felakasztása. 6. Szegélyléc, takarólécek. FONTOS: a padlóburkolat VASTAGSÁGA számít a tok beépítésekor — ha utólag jön a padló, hagyd meg az alatta lévő hézagot!" },
  };

  const paintDetails = {
    glettel: { title: "Glettelés", color: THEME.accent.blue, detail: "A vakolat felületének elsimítása glettel anyaggal. 2-3 réteg, rétegenként csiszolás (P120-P180). Gépi glettezés: gyorsabb, egyenletesebb. Cél: Q2-Q3 felület (standard lakás) vagy Q4 (extra sima, reflektálóddal is jól néz ki). Száradás: rétegenként 12-24 óra. Költség (anyag+munka): 2-4k Ft/m²." },
    alapozo_f: { title: "Alapozó (mélyalapozó)", color: THEME.accent.teal, detail: "A glettelt felületre mélyalapozó (primer) kerül: csökkenti a felszívást, javítja a festék tapadását. Hígítás: 1:1-1:3 vízzel (gyártó utasítás). Egyetlen réteg elég. Száradás: 4-12 óra. NE hagyd ki! Alapozó nélkül a festék foltos lesz (az eltérő felszívás miatt)." },
    festes: { title: "Festés (2 réteg)", color: THEME.accent.green, detail: "Diszperziós falfesték: leggyakoribb, vízzel hígítható, szagmentes. Latex festék: mosható, fürdőbe/konyhába (de drágább). Szín: első réteg fedőfestékkel, második réteg a végleges szín. Henger: sima (18 cm) vagy mintás. Sarkoknál ecsettel előfestés. Ár: festék 3-8k Ft/liter (8-12 m²/liter). Munka: 800-1500 Ft/m²." },
    order: { title: "Festés sorrendje", color: THEME.accent.amber, detail: "1. Mennyezet (először!). 2. Falak. 3. Nyílászáró keretek (ha festendők). 4. Szegélylécek (ha festendők). TIPP: a festés a LEGUTOLSÓ lépés — a bútormozgatás, lépcső beépítés, ajtóberakás ELŐTTE történjen. Hőmérséklet: min. +10°C, max 70% páratartalom. Szellőztetés: ablakot nyitva, de huzat nélkül." },
  };

  const floorDetails = {
    laminate: { title: "Laminált padló", color: THEME.accent.amber, detail: "HDF hordozó + dekor fólia + kopásálló réteg. Osztályok: AC3 (háló), AC4 (nappali), AC5 (kereskedelmi). Vastagság: 7-12 mm. Ár: 3-12k Ft/m². Előny: olcsó, gyors (click rendszer), sokféle dekor. Hátrány: nem csiszolható, vízérzékeny (duzzad!), kopogós hang (PE alátét kell). Padlófűtéshez: max 28°C felületi hő, alacsony hőellenállás." },
    vinyl: { title: "Vinyl (LVT/SPC)", color: THEME.accent.green, detail: "SPC (kő-polimer mag): vízálló, strapabíró. Vastagság: 4-6 mm + alátét. Ár: 6-18k Ft/m². Előny: 100% vízálló (fürdőbe is!), csendes, kellemes járni, padlófűtéssel kiváló. Hátrány: UV-érzékeny (elszíneződés), nehéz bútor benyomódhat. Click rendszer, úszó fektetés. MA a LEGJOBB ár/érték arány. TIPP: SPC-t válassz, NE hagyományos PVC-t!" },
    parketta: { title: "Parketta (tömör/rétegelt)", color: THEME.accent.blue, detail: "Rétegelt parketta: 3 réteg, felső 3-6 mm nemes fa. Tömör parketta: egyetlen darab fa, 15-22 mm. Előny: természetes, meleg, csiszolható (rétegelt: 1-2x, tömör: 4-5x). Hátrány: drága (8-30k+ Ft/m²), érzékeny (nedvesség, karcolás), karbantartás (olaj/lakk). Padlófűtéshez: CSAK rétegelt parketta, tölgy (stabil), max 27°C felületi hő." },
    compare_fl: { title: "Összehasonlítás", color: THEME.accent.purple, detail: "Laminált: 3-12k Ft/m² | Vinyl SPC: 6-18k Ft/m² | Rétegelt parketta: 8-30k Ft/m². Vízállóság: Laminált ✗ | Vinyl ✓✓ | Parketta ✗. Padlófűtés: Laminált ✓ | Vinyl ✓✓ | Parketta ✓ (rétegelt). Élettartam: Laminált 10-15 év | Vinyl 15-25 év | Parketta 30-50 év (csiszolás). 2024-25 trend: SPC vinyl a LEGNÉPSZERŰBB — vízálló, meleg érzet, jó ár." },
  };

  const stairDetails = {
    concrete_st: { title: "Betonlépcső", color: THEME.accent.blue, detail: "Monolit vasbeton: a legmasszívabb, nem recseg, tűzálló. Zsaluzás + vasalás + betonozás a szerkezetépítésnél (födém szintjén). Burkolás: fa (tölgy, bükk), kerámia, kő, vagy szőnyeg. Ár: 300-800k Ft (szerkezet) + burkolás. TIPP: a vasalási tervet a statikus készítse — a lépcső dinamikus terhelést kap (nem csak álló súly)!" },
    wood_st: { title: "Falépcső", color: THEME.accent.amber, detail: "Tartószerkezet: tölgy, bükk, vagy acél váz + fa fokok. Könnyebb, mint a beton, de NEM tűzálló. Konzolos (lebegő) lépcső: modern, de drága (800k-2M Ft). Standard falépcső: 400k-1.2M Ft. FONTOS: a fa dolgozik (száradás, páratartalom) — az első 1-2 évben recseghet. Kezelés: lakk vagy olaj, évi 1x." },
    metal_st: { title: "Fémlépcső (acél)", color: THEME.accent.teal, detail: "Acél tartószerkezet + fa vagy üveg fokok. Modern, ipari stílus. Előny: karcsú, átlátszó, könnyű. Hátrány: hideg, kopogós (gumi/fa burkolat segít), rozsdásodik (festés/horganyozás). Csigalépcső: kis helyen elfér, de nehéz bútort szállítani rajta. Ár: 600k-2M Ft." },
    rules: { title: "Lépcsőméretezés szabályok", color: THEME.accent.red, detail: "2h + b = 60-65 cm (ahol h = fokmagasság, b = fokmélység). Ideális: h=17 cm, b=29 cm (2×17+29=63). Minimális szélesség: 80 cm (lakóépület), de 90-100 cm kényelmesebb. Korlát: min. 90 cm magasan (emeletközi), 100 cm (lépcső felső vége). Szabad lépcső: min. 200 cm belmagasság. Max 18 fok után pihenő! MSZ 24203 szabvány." },
  };

  const kitchenDetails = {
    timing: { title: "Felmérés időzítése", color: THEME.accent.amber, detail: "A konyhabútor felmérése a BELSŐ VAKOLÁS UTÁN történjen (pontos méretek). A gépészeti csatlakozásokat (víz, csatorna, gáz, villany) a konyhatervnek megfelelően kell kivezetni — ezért a konyha TERVE már a gépészeti munkák ELŐTT kell! Tipikus hiba: a gépész kihozza a vizet 'valahova', aztán a konyhás nem tud tervet csinálni." },
    material: { title: "Anyagok & Felületek", color: THEME.accent.blue, detail: "Szekrénytest: laminált forgácslap (LMDP) 18 mm — ez a standard. Front: LMDP (olcsó), MDF fóliázott (közép), MDF festett (prémium), tömör fa (luxus). Munkalap: laminált (olcsó, 5-15k Ft/fm), kvarc-kompozit (40-80k Ft/fm), gránit (60-120k Ft/fm), tömör fa (tölgy: 20-40k Ft/fm). A laminált munkalap víznél DUDORODIK — kvarc a legpraktikusabb." },
    appliances: { title: "Gépek & Beépítés", color: THEME.accent.green, detail: "Beépítés sorrendje: 1. Víz-csatorna kiállások pontos helye. 2. Villany (konnektor a munkalap felett, hűtő, sütő, páraelszívó). 3. Konyhabútor beszállítás és összeszerelés. 4. Munkalap felszerelés (mosogató kivágás). 5. Csatlakozás (víz, csatorna, gáz). 6. Gépek beépítése. A HÁTFAL (csempe vagy üveghátfal) a bútor UTÁN kerül!" },
    cost_k: { title: "Költségkeret", color: THEME.accent.red, detail: "Takarékos (IKEA stílus): 500k-1.2M Ft. Közepes (magyar bútoros): 1.2-2.5M Ft. Prémium (egyedi, kvarc munkalappal): 2.5-5M+ Ft. A gépek KÜLÖN: hűtő (150-500k), sütő (80-300k), főzőlap (60-250k), mosogatógép (120-350k), páraelszívó (40-200k). ÖSSZESEN (gépekkel): 1-7M Ft. TIPP: a konyhabútor a leghasználtabb bútor — ne spórolj a vasalaton (Blum, Hettich)!" },
  };

  const bathDetails = {
    order: { title: "Kivitelezés sorrendje", color: THEME.accent.blue, detail: "1. Gépészet (víz, csatorna, fűtés csövek). 2. Vízszigetelés (kenhető: Mapei Mapegum, Weber Tec). 3. Burkolás (padló → fal). 4. Fugázás (epoxy fugázó a legjobb). 5. Szaniterek beépítése (WC, mosdó, kád/zuhany). 6. Kiegészítők (tükör, polc, törölközőtartó). FONTOS: a vízszigetelés a LEGKRITIKUSABB lépés — ha rossz, az egész burkolatot fel kell szedni!" },
    shower: { title: "Zuhanyzó típusok", color: THEME.accent.teal, detail: "Zuhanytálca: egyszerű, olcsó (20-80k Ft), de magasan van (5-15 cm). Walk-in (beépített): sík padlóba süllyesztett lefolyó, üvegfal. Modern, akadálymentes, de a lefolyó beépítéséhez 10-12 cm aljzatmagasítás kell. Vízszigetelés: TELJES padlófelület + falak min. 200 cm magasságig. Üvegfal: 8-10 mm edzett üveg, 80-200k Ft." },
    wc: { title: "WC típusok", color: THEME.accent.amber, detail: "Álló WC: olcsó (20-60k Ft), egyszerű cseréje. Fali WC (beépített tartállyal): modern, könnyen takarítható, helytakarékos. Befalazott tartály (Geberit): 40-100k Ft, WC-csésze: 30-150k Ft. FONTOS: a fali WC-hez az előfal (Geberit Duofix) a GÉPÉSZETI fázisban kerül be, nem a burkoláskor!" },
    sink: { title: "Mosdó típusok", color: THEME.accent.green, detail: "Fali mosdó: egyszerű, olcsó. Bútor-mosdó: bútor+mosdó kombó, tároló hellyel. Pult-mosdó: design darab, pultra ültetett. Méret: min. 50 cm széles (kis fürdő), 60-80 cm (standard). Csaptelep: mosdóra (egykaros) vagy falra (befalazott — csövet a burkolás ELŐTT kell beépíteni!). Ár: 15-200k Ft (mosdó) + 10-80k Ft (csap)." },
  };

  const details = subTab === "doors" ? doorDetails : subTab === "painting" ? paintDetails : subTab === "flooring" ? floorDetails : subTab === "stairs" ? stairDetails : subTab === "kitchen" ? kitchenDetails : bathDetails;

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />
      <DiagramWrapper>
        <svg viewBox="0 0 750 300" style={{ width: "100%" }}>
          <text x="375" y="25" textAnchor="middle" fill={THEME.text.heading} fontSize="14" fontWeight="700">
            {subTab === "doors" ? "BELSŐ AJTÓK" : subTab === "painting" ? "FESTÉS LÉPÉSEI" : subTab === "flooring" ? "PADLÓBURKOLATOK" : subTab === "stairs" ? "LÉPCSŐ TÍPUSOK" : subTab === "kitchen" ? "KONYHABÚTOR" : "FÜRDŐSZOBA SZANITER"}
          </text>
          {Object.entries(details).map(([key, d], i) => {
            const cols = Object.keys(details).length <= 4 ? 2 : 3;
            const colW = cols === 2 ? 350 : 235;
            const x = 20 + (i % cols) * (colW + 15);
            const y = 45 + Math.floor(i / cols) * 80;
            return (
              <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                <rect x={x} y={y} width={colW} height="65" rx="10" fill={activeEl === key ? d.color + "22" : "#111827"} stroke={d.color} strokeWidth={activeEl === key ? 2.5 : 1.5} />
                <text x={x + colW / 2} y={y + 25} textAnchor="middle" fill={d.color} fontSize="11" fontWeight="700">{d.title}</text>
                <text x={x + colW / 2} y={y + 45} textAnchor="middle" fill={THEME.text.muted} fontSize="9">[kattints a részletekért]</text>
              </g>
            );
          })}
        </svg>
      </DiagramWrapper>
      <PhotoSection searchQuery="glettelés festés falfelület" images={[
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Painter_and_decorator.jpg/320px-Painter_and_decorator.jpg", alt: "Festés", caption: "Festés — glettelés után 2-3 réteg diszperziós festék" }
      ]} />
      {activeEl && details[activeEl] && <DetailPanel color={details[activeEl].color} title={details[activeEl].title} detail={details[activeEl].detail} />}
      <ClickHint />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAINTENANCE DIAGRAM — Karbantartás & Garancia
   ═══════════════════════════════════════════════════════════════ */
function MaintenanceDiagram() {
  const [subTab, setSubTab] = useState("calendar");
  const [activeEl, setActiveEl] = useState(null);
  const subTabs = [
    { id: "calendar", label: "📅 Éves karbantartás" },
    { id: "first2", label: "🏠 Első 2 év" },
    { id: "systems", label: "🔧 Rendszerek" },
    { id: "warranty", label: "🛡️ Garancia" },
  ];

  const calendarDetails = {
    spring: { title: "Tavasz (március-május)", color: THEME.accent.green, detail: "Tető ellenőrzés: cserepek, ereszcsatorna, villámhárító. Homlokzat szemrevételezés: repedések, moha, algásodás. Csapadékvíz-elvezető rendszer tisztítása. Kert: öntözőrendszer indítása, kerítés ellenőrzés. Klíma/hőszivattyú: kültéri egység tisztítása (levelek, szennyeződés). Nyílászárók: vasalat kenése (szilikonspray), tömítés ellenőrzés." },
    summer: { title: "Nyár (június-augusztus)", color: THEME.accent.amber, detail: "Klíma szűrőcsere / tisztítás. Árnyékolók (redőny, napellenző) ellenőrzése, kenése. Homlokzat javítás (ha szükséges — nyáron a legjobb). Kültéri csapok, locsolórendszer ellenőrzés. Napelem tisztítás (ha szükséges, évente 1x). Kertben: szúnyoghálók ellenőrzése, csapadékvíz-szikkasztó szemle." },
    autumn: { title: "Ősz (szeptember-november)", color: THEME.accent.orange, detail: "Ereszcsatorna és lefolyók tisztítása (LEVELEK!). Fűtésrendszer indítása, légtelenítés. Kazán/hőszivattyú éves karbantartás (KÖTELEZŐ a garancia fenntartásához). HRV szűrőcsere (6-12 havonta). Homlokzati repedések javítása fagyok előtt. Külső csapok lefagyás elleni védelme (víz leürítés). Tetőablak tömítés ellenőrzése." },
    winter: { title: "Tél (december-február)", color: THEME.accent.blue, detail: "Hó és jég eltávolítás a tetőről (nagy hóterhelés!). Ereszcsatorna jégmentesítés. Fűtésrendszer figyelése (fagyvédelem!). Páratartalom ellenőrzés belül (45-55% ideális). Páramentesítő szellőzés (HRV boost mód fürdőzés/főzés után). Nyílászárók kondenzáció-ellenőrzés — ha párásodik: tömítés rossz vagy nem szellőztetsz eleget!" },
  };

  const first2Details = {
    cracks: { title: "Zsugorodási repedések", color: THEME.accent.amber, detail: "NORMÁLIS! Az első 1-2 évben a vakolat, esztrich és beton kiszárad, és hajszálrepedések keletkeznek. Tipikus helyek: ajtó-ablak sarkok, mennyezet-fal találkozás, gipszkarton illesztések. NE pánikolj — ez NEM szerkezeti hiba. Megoldás: 1-2 év után átfestés (a repedéseket be kell glettelni). A festő ezt ELŐRE mondja meg, ha profin csinálja." },
    settling: { title: "Üledési (ülési) repedések", color: THEME.accent.red, detail: "Az első évben a ház 'megül' — az alap és a talaj összeállapodik. Hajszálrepedések az alap-fal csatlakozásnál, vagy a falak alsó részén. 0,1-0,3 mm széles repedés: normális. 0,5 mm felett: figyelni kell (fotózd, jelöld dátummal). 1 mm felett vagy növekvő: STATIKUS véleményt kérj! Duzzadó agyagon gyakoribb — ezért fontos a talajmechanikai vizsgálat." },
    humidity: { title: "Nedvesség és száradás", color: THEME.accent.blue, detail: "Új ház: 3-6 m³ vizet tartalmaz (beton, vakolat, esztrich). Az első fűtési szezonban NAGYON párás lesz — 70-80% → penész veszély! Megoldás: HRV boost üzemmód, vagy ablakszellőzés 3-4x naponta 5-10 percig. Páramérő (higrométer): 500-3000 Ft. Cél: 45-55% relatív páratartalom. A bútorok mögötti falak különösen veszélyesek — hagyd el 5-10 cm-re!" },
    doors_adj: { title: "Ajtók/ablakok beállítása", color: THEME.accent.green, detail: "A faanyag és a ház mozgása miatt az ajtók/ablakok beállítást igényelhetnek az első évben. Tipikus: ajtó nem csukódik rendesen, ablak nehezen nyílik, tömítés nem zár jól. Megoldás: vasalat állítása (csavarhúzóval, imbuszkulccsal). A legtöbb nyílászáró gyártó INGYENES beállítást ad az első évben — HASZNÁLD ki! Garanciális javítás: a kivitelezőt hívd." },
  };

  const systemsDetails = {
    hrv_filter: { title: "HRV szűrőcsere", color: THEME.accent.blue, detail: "LEGFONTOSABB karbantartás! 6-12 havonta szűrőcsere (F7/M5 szűrő: 3-8k Ft/pár). Ha elhanyagolod: csökken a légmennyiség, nő az energiafogyasztás, és a szűrő penészedik → egészségügyi kockázat. A szűrő cseréje 5 perc, házilag megoldható. Évi 1x: hőcserélő tisztítása (langyos vízzel). Évi 1x: csatornák ellenőrzése." },
    heatpump_m: { title: "Hőszivattyú karbantartás", color: THEME.accent.red, detail: "Évi 1x kötelező karbantartás (a garancia feltétele!): hűtőközeg nyomás, kültéri egység tisztítása, szűrők, elektromos csatlakozások. Költség: 30-60k Ft/alkalom. Élettartam: 15-20 év (kültéri) / 20+ év (beltéri). FONTOS: a hőszivattyú NEM igényel kéményseprőt (gázkazán igen!). A padlófűtés osztó-gyűjtőjén a szelepek évi 1x működtetése (hogy ne ragadjanak be)." },
    boiler: { title: "Gázkazán karbantartás", color: THEME.accent.amber, detail: "Ha gázkazán van (nem hőszivattyú): évi 1x KÖTELEZŐ karbantartás + kéményseprő ellenőrzés (CO-mérgezés veszély!). Kondenzációs kazán: szifon és kondenzvíz-elvezető tisztítása. Szűrő: visszatérő ágon 1x/év csere. Gázszivárgás: szagoló anyag van a gázban — ha érzed, azonnal kimenni + gázszivárgás-bejelentés (104)." },
    facade: { title: "Homlokzat + csatorna + tető", color: THEME.accent.green, detail: "Homlokzat: szemrevételezés évente (repedés, algásodás). Algaölő kezelés: 2-4k Ft/m². Ereszcsatorna: tavasszal és ősszel tisztítás (levelek!). Tető: cserepek ellenőrzés (eltolódás, törés), villámhárító feszesség, tetőablak tömítés. Alu ereszcsatorna: 30+ év. Horganyzott: 15-20 év. Réz: 50+ év. A horganyzott csatorna rozsdásodási jeleinél AZONNAL cserélj!" },
  };

  const warrantyDetails = {
    structural: { title: "Szerkezeti garancia (5 év)", color: THEME.accent.blue, detail: "Ptk. kötelező jótállás: alap, falak, födém, tető, lépcső = 5 év. Szerkezeti hiba: alap süllyedés, fal repedése (>1 mm), tető beázás, födém lehajlás. A jótállási idő alatt a KIVITELEZŐ köteles javítani. FONTOS: a hibát ÍRÁSBAN jelezd (e-mail, ajánlott levél), és adj 15 napos határidőt. Ha nem reagál → Fogyasztóvédelem → Bíróság." },
    mep_warranty: { title: "Gépészeti garancia (3 év)", color: THEME.accent.red, detail: "Fűtés, víz-csatorna, villanyszerelés, szellőzés: 3 év jótállás. Ide tartozik: csőtörés, szelepszivárgás, elektromos hiba, vezérlés meghibásodás. A hőszivattyú/kazán GYÁRTÓI garanciája: 2-5 év (karbantartási szerződéssel akár 5-10 év). FONTOS: a gyártói garancia CSAK akkor érvényes, ha jogosult szerviz végzi az éves karbantartást!" },
    finish_warranty: { title: "Befejező munkák garanciája (1-3 év)", color: THEME.accent.amber, detail: "Burkolás, festés, parketta, belső ajtók: 1-3 év. Tipikus garanciális esetek: csempe leválás, festék hámlás, padló felgyűrődés. A garancia NEM vonatkozik: normál kopásra, nem rendeltetésszerű használatra, vagy ha a karbantartást elhanyagolod (pl. parkettát nem olajoztad)." },
    how_to: { title: "Hogyan érvényesíts garanciát?", color: THEME.accent.green, detail: "1. FOTÓZZ és dokumentálj (dátum, hely, probléma leírása). 2. Írásban jelezd a kivitelezőnek (e-mail + ajánlott levél). 3. Adj 15-30 napos határidőt a javításra. 4. Ha nem reagál: Fogyasztóvédelmi hatóság, Építési és Közlekedési Minisztérium, vagy bíróság. AZ E-NAPLÓ a legfontosabb bizonyíték — tartalmazza, mit, mikor, hogyan csináltak. Garanciális igénynél a BIZONYÍTÁSI TEHER a kivitelezőé (3 éven belül)!" },
  };

  const details = subTab === "calendar" ? calendarDetails : subTab === "first2" ? first2Details : subTab === "systems" ? systemsDetails : warrantyDetails;

  return (
    <div>
      <SubTabSelector tabs={subTabs} active={subTab} onChange={(id) => { setSubTab(id); setActiveEl(null); }} />
      <DiagramWrapper>
        <svg viewBox="0 0 750 320" style={{ width: "100%" }}>
          <text x="375" y="25" textAnchor="middle" fill={THEME.text.heading} fontSize="14" fontWeight="700">
            {subTab === "calendar" ? "ÉVES KARBANTARTÁSI NAPTÁR" : subTab === "first2" ? "ELSŐ 2 ÉV — jellemző problémák" : subTab === "systems" ? "RENDSZEREK KARBANTARTÁSA" : "GARANCIÁLIS JOGOK"}
          </text>
          {subTab === "calendar" && (
            <g>
              {Object.entries(calendarDetails).map(([key, d], i) => {
                const colors = [THEME.accent.green, THEME.accent.amber, THEME.accent.orange, THEME.accent.blue];
                const icons = ["🌱", "☀️", "🍂", "❄️"];
                return (
                  <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
                    <rect x={20 + i * 180} y={50} width="170" height="100" rx="12" fill={activeEl === key ? colors[i] + "22" : "#111827"} stroke={colors[i]} strokeWidth={activeEl === key ? 2.5 : 1.5} />
                    <text x={105 + i * 180} y={80} textAnchor="middle" fill={colors[i]} fontSize="24">{icons[i]}</text>
                    <text x={105 + i * 180} y={105} textAnchor="middle" fill={colors[i]} fontSize="12" fontWeight="700">{d.title.split("(")[0]}</text>
                    <text x={105 + i * 180} y={122} textAnchor="middle" fill={THEME.text.muted} fontSize="9">{d.title.match(/\(([^)]+)\)/)?.[1]}</text>
                    <text x={105 + i * 180} y={140} textAnchor="middle" fill={THEME.text.muted} fontSize="8">[kattints]</text>
                  </g>
                );
              })}
              <rect x="100" y="175" width="550" height="35" rx="8" fill="#111827" stroke={THEME.accent.purple} strokeWidth="1" />
              <text x="375" y="197" textAnchor="middle" fill={THEME.accent.purple} fontSize="10" fontWeight="600">TIPP: Állíts be naptári emlékeztetőket minden szezonra — ne felejtsd el!</text>
            </g>
          )}
          {subTab !== "calendar" && Object.entries(details).map(([key, d], i) => (
            <g key={key} onClick={() => setActiveEl(activeEl === key ? null : key)} style={{ cursor: "pointer" }}>
              <rect x={20 + (i % 2) * 370} y={50 + Math.floor(i / 2) * 80} width="350" height="65" rx="10" fill={activeEl === key ? d.color + "22" : "#111827"} stroke={d.color} strokeWidth={activeEl === key ? 2.5 : 1.5} />
              <text x={195 + (i % 2) * 370} y={75 + Math.floor(i / 2) * 80} textAnchor="middle" fill={d.color} fontSize="11" fontWeight="700">{d.title}</text>
              <text x={195 + (i % 2) * 370} y={95 + Math.floor(i / 2) * 80} textAnchor="middle" fill={THEME.text.muted} fontSize="9">[kattints a részletekért]</text>
            </g>
          ))}
        </svg>
      </DiagramWrapper>
      {activeEl && details[activeEl] && <DetailPanel color={details[activeEl].color} title={details[activeEl].title} detail={details[activeEl].detail} />}
      <ClickHint />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */

export default function HouseEducation() {
  const [activeTab, setActiveTab] = useState("permits");

  const renderDiagram = () => {
    switch (activeTab) {
      case "permits": return <PermitsDiagram />;
      case "budget": return <BudgetDiagram />;
      case "mechanical": return <MechanicalDiagram />;
      case "foundation": return <FoundationDiagram />;
      case "wall": return <WallDiagram />;
      case "roof": return <RoofDiagram />;
      case "window": return <WindowDiagram />;
      case "electrical": return <ElectricalDiagram />;
      case "fodem": return <FloorSlabDiagram />;
      case "ventilation": return <VentilationDiagram />;
      case "utilities": return <UtilitiesDiagram />;
      case "smarthome": return <SmartHomeDiagram />;
      case "waterproof": return <WaterproofDiagram />;
      case "sound": return <SoundInsulationDiagram />;
      case "energy": return <EnergyDiagram />;
      case "tiling": return <TilingDiagram />;
      case "interior": return <InteriorDiagram />;
      case "compare": return <ComparisonDiagram />;
      case "inspector": return <InspectorDiagram />;
      case "timeline": return <TimelineDiagram />;
      case "maintenance": return <MaintenanceDiagram />;
      default: return null;
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: THEME.bg.page,
      color: THEME.text.heading,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      padding: "20px 16px",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');`}</style>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: THEME.text.muted, fontFamily: "monospace", marginBottom: 4 }}>
          INTERAKTÍV TANANYAG
        </div>
        <h1 style={{
          fontSize: 26, fontWeight: 700,
          background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #8b5cf6 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0,
        }}>
          Házépítés A-tól Z-ig
        </h1>
        <div style={{ fontSize: 12, color: THEME.text.muted, marginTop: 4 }}>
          Kattints az elemekre a részletes magyarázatért
        </div>
      </div>

      {groups.map((g) => (
        <div key={g.id} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: THEME.text.muted, fontFamily: "monospace", marginBottom: 4, letterSpacing: 2, textTransform: "uppercase" }}>
            {g.label}
          </div>
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, WebkitOverflowScrolling: "touch" }}>
            {tabs.filter(t => t.group === g.id).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: "0 0 auto", padding: "10px 14px", borderRadius: 10,
                  border: activeTab === tab.id ? "2px solid #f59e0b" : "1px solid #1e293b",
                  background: activeTab === tab.id ? "linear-gradient(135deg, #1e293b, #0f172a)" : "#0f1729",
                  color: activeTab === tab.id ? "#f59e0b" : "#64748b",
                  cursor: "pointer", fontSize: 12,
                  fontWeight: activeTab === tab.id ? 700 : 400,
                  fontFamily: "system-ui", textAlign: "left", lineHeight: 1.3,
                  transition: "all 0.2s",
                }}
              >
                <div>{tab.label}</div>
                <div style={{ fontSize: 9, opacity: 0.7 }}>{tab.subtitle}</div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {renderDiagram()}
    </div>
  );
}
