export default function Navbar() {
  return (
    <nav className="w-full bg-[#D93F2E] flex items-center justify-between px-8 py-3 relative">
      {/* Left links */}
      <div className="flex items-center gap-8">
        <a href="/" className="text-white font-black text-xl tracking-widest uppercase">HOME</a>
        <a href="/store" className="text-white font-black text-xl tracking-widest uppercase">STORE</a>
      </div>

      {/* Center Logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <LogoBadge />
      </div>

      {/* Right links */}
      <div className="flex items-center gap-8">
        <a href="/recipes" className="text-white font-black text-xl tracking-widest uppercase">RECIPES</a>
        <a href="/faq" className="text-white font-black text-xl tracking-widest uppercase">FAQ</a>
        <CartBadge count={2} />
      </div>
    </nav>
  );
}

function CartBadge({ count }: { count: number }) {
  return (
    <div className="relative w-10 h-10 cursor-pointer">
      {/* Star/badge shape */}
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path
          d="M24 2L28.5 10.5L38 8L36.5 18L45 22.5L38 28L41 38L31.5 36L28 45L24 38L20 45L16.5 36L7 38L10 28L3 22.5L11.5 18L10 8L19.5 10.5L24 2Z"
          fill="white"
          stroke="white"
          strokeWidth="1"
        />
        <text x="24" y="29" textAnchor="middle" fontSize="16" fontWeight="900" fill="#D93F2E">{count}</text>
      </svg>
    </div>
  );
}

function LogoBadge() {
  return (
    <svg width="72" height="72" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" fill="white" stroke="black" strokeWidth="3" />

      {/* Lobster/crab body */}
      {/* Main head - round */}
      <ellipse cx="50" cy="48" rx="20" ry="22" fill="#C0392B" />

      {/* Eyes */}
      <circle cx="43" cy="40" r="5" fill="white" />
      <circle cx="57" cy="40" r="5" fill="white" />
      <circle cx="43" cy="41" r="3" fill="black" />
      <circle cx="57" cy="41" r="3" fill="black" />
      <circle cx="44" cy="40" r="1" fill="white" />
      <circle cx="58" cy="40" r="1" fill="white" />

      {/* Tongue sticking out */}
      <path d="M46 58 Q50 65 54 58" fill="none" stroke="black" strokeWidth="1.5" />
      <ellipse cx="50" cy="61" rx="4" ry="5" fill="#E74C3C" />
      <line x1="50" y1="61" x2="50" y2="66" stroke="#C0392B" strokeWidth="1" />

      {/* Antennae */}
      <line x1="43" y1="28" x2="35" y2="16" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <line x1="57" y1="28" x2="65" y2="16" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <circle cx="35" cy="15" r="2" fill="black" />
      <circle cx="65" cy="15" r="2" fill="black" />

      {/* Left claw */}
      <path d="M30 50 Q18 44 16 52 Q14 60 24 58 Q26 62 22 66" fill="none" stroke="#C0392B" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="18" cy="54" rx="6" ry="4" fill="#C0392B" stroke="black" strokeWidth="1.5" transform="rotate(-20 18 54)" />

      {/* Right claw */}
      <path d="M70 50 Q82 44 84 52 Q86 60 76 58 Q74 62 78 66" fill="none" stroke="#C0392B" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="82" cy="54" rx="6" ry="4" fill="#C0392B" stroke="black" strokeWidth="1.5" transform="rotate(20 82 54)" />

      {/* Body outline */}
      <ellipse cx="50" cy="48" rx="20" ry="22" fill="none" stroke="black" strokeWidth="2" />

      {/* Legs */}
      <line x1="38" y1="66" x2="32" y2="78" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="70" x2="50" y2="82" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="62" y1="66" x2="68" y2="78" stroke="black" strokeWidth="2.5" strokeLinecap="round" />

      {/* Outer ring dashed border feel */}
      <circle cx="50" cy="50" r="46" fill="none" stroke="black" strokeWidth="1" strokeDasharray="4 2" />
    </svg>
  );
}
