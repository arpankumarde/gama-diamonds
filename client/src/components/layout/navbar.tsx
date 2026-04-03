import { useEffect, useRef, useState } from "react";
import {
  Search,
  User,
  ShoppingBag,
  House,
  X,
  Menu,
  Plus,
  Minus,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/components/cart/cart-context";
import { useUser } from "@/contexts/user-context";
import { supportedCurrencies, useCurrency } from "@/contexts/storefront/CurrencyContext";

const menuItems = [
  "ENGAGEMENT RINGS",
  "WEDDING RINGS",
  "ETERNITY RINGS",
  "EARRINGS",
  "NECKLACE",
  "BRACELETS",
  "JEWELLERY",
  "BESPOKE",
  "JEWELLERY CREATOR",
];

// Mega Menu Data (used for desktop mega menu and mobile sidebar navigation)
const megaMenuData: Record<
  string,
  {
    columns: {
      title: string;
      items: {
        label: string;
        shape: string;
        collectionId?: string;
        subCollection?: string;
      }[];
    }[];
    images: { src: string; label: string; shape: string }[];
  }
> = {
  "ENGAGEMENT RINGS": {
    columns: [
      {
        title: "All Engagement Rings",
        items: [{ label: "Create Your Own", shape: "" }],
      },
      {
        title: "Shop By Shape",
        items: [
          { label: "Asscher", shape: "Asscher" },
          { label: "Heart", shape: "Heart" },
          { label: "Elongated Cushion", shape: "Elongated Cushion" },
          { label: "Trillion", shape: "Trillion" },
          { label: "Baguette", shape: "Baguette" },
          { label: "Rose Cut", shape: "Rose Cut" },
        ],
      },
      {
        title: "Shop By Style",
        items: [
          { label: "Solitaire", shape: "Solitaire" },
          { label: "Halo", shape: "Halo" },
          { label: "Three Stone", shape: "Three Stone" },
        ],
      },
    ],
    images: [
      { src: "/images/roundbriliant.webp", label: "Round Brilliant", shape: "Round" },
      { src: "/images/cusioncut.webp", label: "Cushion Halo", shape: "Cushion" },
    ],
  },
  "WEDDING RINGS": {
    columns: [
      {
        title: "Women Collection",
        items: [
          {
            label: "Women's Plain",
            shape: "",
            collectionId: "69ca34030ac03a3986e3c86a",
            subCollection: "women plain",
          },
          {
            label: "Women's Diamond",
            shape: "",
            collectionId: "69ca34030ac03a3986e3c86a",
            subCollection: "women diamond",
          },
          {
            label: "Eternity Rings",
            shape: "",
            collectionId: "69ca34030ac03a3986e3c86a",
            subCollection: "eternity rings",
          },
        ],
      },
      {
        title: "Men's Collection",
        items: [
          {
            label: "Men's Plain",
            shape: "",
            collectionId: "69ca33800ac03a3986e3c835",
            subCollection: "mens plain",
          },
          {
            label: "Men's Diamond",
            shape: "",
            collectionId: "69ca33800ac03a3986e3c835",
            subCollection: "mens diamond",
          },
          {
            label: "Men's Pattern",
            shape: "",
            collectionId: "69ca33800ac03a3986e3c835",
            subCollection: "mens pattern",
          },
        ],
      },
      {
        title: "Shop By Style",
        items: [
          { label: "Oval", shape: "Oval" },
          { label: "Pear", shape: "Pear" },
          { label: "Marquise", shape: "Marquise" },
          { label: "Radiant", shape: "Radiant" },
          { label: "Emerald", shape: "Emerald" },
        ],
      },
    ],
    images: [
      { src: "/images/womenswedding.webp", label: "Women's Rings", shape: "" },
      { src: "/images/menswedding.webp", label: "Men's Rings", shape: "" },
    ],
  },
};

// Mobile-only menu data with nested items
const mobileMenuData: Record<
  string,
  {
    sections: { title: string; items: string[] | Record<string, string[]> }[];
  }
> = {
  "JEWELLERY": {
    sections: [
      {
        title: "Necklaces",
        items: ["Pendant Necklaces", "Chain Necklaces", "Statement Necklaces"],
      },
      {
        title: "Earrings",
        items: ["Stud Earrings", "Hoop Earrings", "Drop Earrings"],
      },
      {
        title: "Bracelets",
        items: ["Tennis Bracelets", "Bangles", "Charm Bracelets"],
      },
    ],
  },
};

// Social media icons
const socialIcons: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

// Mobile Menu Component
function MobileMenu() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  if (!isMobile) return null;

  const expandableItems = [
    ...Object.keys(megaMenuData),
    ...Object.keys(mobileMenuData),
  ];

  const closeMenu = () => {
    setActiveSection(null);
    setActiveSubSection(null);
    setCurrencyDropdownOpen(false);
    setOpen(false);
  };

  const navigateToShape = (shape: string) => {
    closeMenu();
    if (shape) {
      navigate(`/products?shape=${encodeURIComponent(shape)}`);
    } else {
      navigate("/products");
    }
  };

  const navigateToCollection = (subCollectionName?: string) => {
    closeMenu();
    const params = new URLSearchParams();
    if (subCollectionName) params.set("subCollection", subCollectionName);
    const query = params.toString();
    navigate(query ? `/products?${query}` : "/products");
  };

  const navigateToSearch = (term: string) => {
    closeMenu();
    navigate(`/products?search=${encodeURIComponent(term)}`);
  };

  const handleMenuClick = (item: string) => {
    if (expandableItems.includes(item)) {
      setActiveSection(activeSection === item ? null : item);
      setActiveSubSection(null);
    } else {
      setActiveSection(null);
      setActiveSubSection(null);
      setOpen(false);
    }
  };

  const handleSubSectionClick = (subItem: string) => {
    setActiveSubSection(activeSubSection === subItem ? null : subItem);
  };

  const renderSubItems = (items: string[] | Record<string, string[]>) => {
    if (Array.isArray(items)) {
      return (
        <ul className="ml-4 mt-3 space-y-3">
          {items.map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => navigateToSearch(item)}
                className="text-[11px] tracking-[2px] uppercase text-white/70 hover:text-brand-gold transition text-left"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      );
    } else {
      // Second level accordion
      return (
        <ul className="ml-4 mt-3 space-y-3">
          {Object.entries(items).map(([key, value]) => (
            <li key={key}>
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleSubSectionClick(key)}
              >
                <span className="text-[11px] tracking-[2px] uppercase text-white/70 hover:text-brand-gold transition">
                  {key}
                </span>
                {activeSubSection === key ? (
                  <Minus size={14} strokeWidth={1.5} className="text-brand-gold" />
                ) : (
                  <Plus size={14} strokeWidth={1.5} className="text-brand-gold" />
                )}
              </div>
              {activeSubSection === key && (
                <ul className="ml-4 mt-2 space-y-2 border-l border-white/15 pl-3">
                  {value.map((subItem) => (
                    <li key={subItem}>
                      <button
                        type="button"
                        onClick={() => navigateToSearch(subItem)}
                        className="text-[10px] tracking-[1.5px] uppercase text-white/60 hover:text-brand-gold transition text-left"
                      >
                        {subItem}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu 
          size={26} 
          strokeWidth={1.5} 
          className="cursor-pointer hover:opacity-70 transition text-brand-gold"
        />
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-[85%] max-w-[360px] bg-brand-green text-white p-0 border-r border-white/10"
        showCloseButton={false}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header with close */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
            <button 
              onClick={() => setOpen(false)}
              className="p-1 hover:opacity-60 transition"
            >
              <X size={24} strokeWidth={1.5} className="text-white/90" />
            </button>
            <span className="text-xs tracking-[3px] uppercase text-brand-gold font-light">
              Menu
            </span>
            <div className="w-6" /> {/* Spacer for alignment */}
          </div>
          
          {/* Menu items */}
          <nav className="flex-1 overflow-y-auto py-2">
            {menuItems.map((item, index) => (
              <div key={item}>
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition ${
                    activeSection === item ? "bg-white/5" : ""
                  }`}
                >
                  <span className="text-[13px] tracking-[2px] uppercase font-normal text-white/85">
                    {item}
                  </span>
                  {expandableItems.includes(item) && (
                    activeSection === item ? (
                      <Minus size={16} strokeWidth={1.5} className="text-brand-gold" />
                    ) : (
                      <Plus size={16} strokeWidth={1.5} className="text-brand-gold" />
                    )
                  )}
                </button>
                
                {/* Accordion content */}
                {activeSection === item && (megaMenuData[item] || mobileMenuData[item]) && (
                  <div className="bg-white/5 px-5 py-4 border-b border-white/10">
                    {megaMenuData[item] ? (
                      <div className="space-y-6">
                        {megaMenuData[item].columns.map((col) => (
                          <div key={col.title}>
                            <h4 className="text-[10px] tracking-[2px] uppercase text-brand-gold font-normal mb-3">
                              {col.title}
                            </h4>
                            <ul className="ml-4 mt-3 space-y-3">
                              {col.items.map((entry) => (
                                <li key={entry.label}>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      entry.collectionId
                                        ? navigateToCollection(entry.subCollection)
                                        : navigateToShape(entry.shape)
                                    }
                                    className="text-[11px] tracking-[2px] uppercase text-white/70 hover:text-brand-gold transition text-left"
                                  >
                                    {entry.label}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      mobileMenuData[item]?.sections.map((section) => (
                        <div key={section.title} className="mb-5 last:mb-0">
                          <h4 className="text-[10px] tracking-[2px] uppercase text-brand-gold font-normal mb-3">
                            {section.title}
                          </h4>
                          {renderSubItems(section.items)}
                        </div>
                      ))
                    )}
                  </div>
                )}
                
                {/* Divider line */}
                {index < menuItems.length - 1 && (
                  <div className="mx-5 border-t border-white/10" />
                )}
              </div>
            ))}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-white/10 px-5 py-5 space-y-4">

            
            {/* Book Appointment */}
            <button className="w-full py-3 border border-brand-gold text-[11px] tracking-[2px] uppercase text-brand-gold hover:bg-brand-gold hover:text-brand-green transition rounded-lg">
              Book a Free Consultation
            </button>
            
           
            {/* Social Icons */}
            <div className="flex justify-center gap-5 pt-2">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-white/70 hover:text-brand-gold transition"
                  aria-label={social.label}
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
            
            {/* Currency selector with dropdown */}
            <div className="relative">
              <button 
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center justify-center gap-2 text-[11px] tracking-[2px] text-white/70 font-light pt-2 w-full hover:text-brand-gold transition"
              >
                <House size={14} strokeWidth={1.5} />
                <span>{currency}</span>
                <ChevronDown 
                  size={12} 
                  strokeWidth={1.5} 
                  className={`transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {/* Dropdown */}
              {currencyDropdownOpen && (
                <div className="absolute bottom-full left-0 right-0 bg-brand-green border border-white/10 shadow-lg mb-2 py-2">
                  {supportedCurrencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrency(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-[11px] tracking-[1.5px] uppercase hover:bg-white/5 transition ${
                        currency === c.code ? 'text-brand-gold font-medium' : 'text-white/70'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Dynamic Mega Menu Component
function MegaMenu({ activeMenu, onClose }: { activeMenu: string; onClose: () => void }) {
  const menuData = megaMenuData[activeMenu];
  const navigate = useNavigate();

  if (!menuData) return null;

  const handleShapeClick = (shape: string) => {
    onClose();
    if (shape) {
      navigate(`/products?shape=${encodeURIComponent(shape)}`);
    } else {
      navigate("/products");
    }
  };

  const handleCollectionClick = (collectionId: string, subCollectionName?: string) => {
    onClose();
    const params = new URLSearchParams();
    if (subCollectionName) params.set("subCollection", subCollectionName);
    navigate(`/products?${params.toString()}`);
  };

  return (
    <div className="absolute left-0 top-full w-full bg-brand-green/95 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.25)] border-t-2 border-brand-gold/60 z-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-8 md:py-12 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10">
        {menuData.columns.map((col, index) => (
          <div key={index} className="col-span-1">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <span className="block w-4 h-[1px] bg-brand-gold/60"></span>
              <h4 className="text-[11px] md:text-[12px] tracking-[3px] uppercase text-brand-gold font-medium">{col.title}</h4>
            </div>
            <ul className="space-y-2 md:space-y-3 text-[11px] md:text-[12px] tracking-[2px] md:tracking-[3px] uppercase">
              {col.items.map((item) => (
                <li
                  key={item.label}
                  onClick={() =>
                    item.collectionId
                      ? handleCollectionClick(item.collectionId, item.subCollection)
                      : handleShapeClick(item.shape)
                  }
                  className="cursor-pointer hover:text-brand-gold transition duration-300 text-white/80 hover:translate-x-1"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {menuData.images.map((img, index) => (
          <div key={index} className="group col-span-1 cursor-pointer" onClick={() => handleShapeClick(img.shape)}>
            <div className="overflow-hidden rounded-xl border border-brand-gold/20 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
              <img src={img.src} alt={img.label} className="w-full h-[150px] md:h-[220px] object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.05]" />
            </div>
            <p className="text-center mt-3 md:mt-4 tracking-[2px] md:tracking-[3px] uppercase text-[10px] md:text-[11px] text-white/70 group-hover:text-brand-gold transition duration-300">{img.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 pb-8 md:pb-10 px-4">
        <button
          onClick={() => { onClose(); navigate("/products"); }}
          className="px-6 md:px-8 py-3 md:py-4 bg-brand-gold text-brand-green border border-brand-gold tracking-[2px] md:tracking-[3px] uppercase text-[11px] md:text-[12px] font-semibold rounded-lg hover:bg-brand-gold-soft hover:shadow-[0_8px_24px_rgba(211,160,42,0.25)] transition duration-300"
        >
          Explore {activeMenu}
        </button>
        <button className="px-6 md:px-8 py-3 md:py-4 bg-transparent text-brand-gold border border-brand-gold/60 tracking-[2px] md:tracking-[3px] uppercase text-[11px] md:text-[12px] font-semibold rounded-lg hover:bg-brand-gold hover:text-brand-green transition duration-300">
          Book an Appointment
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");  
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const handleSearch = (e: React.KeyboardEvent | React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
    setSearchOpen(false);
    setSearchTerm("");
  };
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useUser();
  const { currency, setCurrency } = useCurrency();
  const searchButtonRef = useRef<HTMLDivElement>(null);
  const searchDrawerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const currencyMenuRef = useRef<HTMLDivElement>(null);
  

  const handleMenuClick = (item: string) => {
    if (item === "ENGAGEMENT RINGS" || item === "WEDDING RINGS") {
      setActiveMenu(activeMenu === item ? null : item);
    } else {
      setActiveMenu(null);
    }
  };

  const handleLogoClick = () => {
    setActiveMenu(null);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!searchOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (searchDrawerRef.current?.contains(target)) return;
      if (searchButtonRef.current?.contains(target)) return;

      setSearchOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [searchOpen]);

  useEffect(() => {
    if (!userMenuOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (userMenuRef.current?.contains(target)) return;
      setUserMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [userMenuOpen]);

  useEffect(() => {
    if (!currencyDropdownOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (currencyMenuRef.current?.contains(target)) return;
      setCurrencyDropdownOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [currencyDropdownOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-brand-green border-b border-white/10 shadow-none relative">

        {/* Main container */}

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[50px] pt-3 md:pt-[12px] pb-6 md:pb-[28px]">

        {/* Top row */}
        <div className="relative flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center z-10">
            <MobileMenu />
            {!isMobile && (
              <div className="relative ml-3" ref={currencyMenuRef}>
                <button
                  type="button"
                  onClick={() => setCurrencyDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 text-[11px] md:text-[13px] tracking-[2px] md:tracking-[3px] text-white/70 font-light hover:text-brand-gold transition"
                  aria-haspopup="menu"
                  aria-expanded={currencyDropdownOpen}
                >
                  <House size={15} strokeWidth={1.5} />
                  <span>{currency}</span>
                  <ChevronDown
                    size={14}
                    strokeWidth={1.5}
                    className={`transition-transform ${currencyDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {currencyDropdownOpen && (
                  <div className="absolute left-0 mt-3 min-w-[160px] bg-brand-green border border-white/10 shadow-lg py-2 rounded-lg z-50">
                    {supportedCurrencies.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setCurrency(c.code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-[11px] tracking-[1.5px] uppercase hover:bg-white/5 transition ${
                          currency === c.code ? "text-brand-gold font-medium" : "text-white/70"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-center items-center md:top-auto md:translate-y-0 md:mt-6">
            <Link to="/" onClick={handleLogoClick} className="flex flex-col items-center justify-center leading-none">

              <div className="text-brand-gold text-[24px] md:text-[36px] lg:text-[42px] leading-none font-serif">
                G
              </div>

              <h1 className="text-[13px] md:text-[18px] lg:text-[22px] font-light tracking-[1px] leading-none whitespace-nowrap">
                <span className="text-brand-gold">GAMA </span>
                <span className="text-white">DIAMONDS</span>
              </h1>
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 md:gap-6 z-10">
            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              {isAuthenticated && user ? (
                <>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 hover:opacity-70 transition"
                  >
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-brand-gold text-brand-green flex items-center justify-center text-[10px] md:text-[12px] font-semibold">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {userMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-30"
                        onClick={() => setUserMenuOpen(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md border border-brand-gold/20 shadow-[0_8px_32px_rgba(0,0,0,0.15)] rounded-xl z-40 overflow-hidden">
                        <div className="px-4 py-4 border-b border-brand-gold/10 bg-brand-green/5">
                          <p className="text-[13px] font-semibold text-brand-green">{user.name}</p>
                          <p className="text-[11px] text-black/60 mt-1">{user.email}</p>
                        </div>
                        <button
                          onClick={() => {
                            navigate("/profile");
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-[12px] tracking-[1px] uppercase text-[#333] hover:bg-brand-green/5 hover:text-brand-green transition duration-300"
                        >
                          My Profile
                        </button>
                        <button
                          onClick={async () => {
                            await logout();
                            setUserMenuOpen(false);
                            navigate("/");
                          }}
                          className="w-full text-left px-4 py-3 border-t border-brand-gold/10 text-[12px] tracking-[1px] uppercase text-red-500 hover:bg-red-50 transition duration-300"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <User
                  size={22}
                  strokeWidth={1.5}
                  className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:opacity-70 transition text-white/90"
                  onClick={() => navigate("/signup")}
                />
              )}
            </div>

            <div ref={searchButtonRef}>
              <Search
                size={22}
                strokeWidth={1.5}
                className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:opacity-70 transition text-white/90"
                onClick={() => setSearchOpen(true)}
              />
            </div>

            <button type="button" onClick={() => navigate("/cart")} className="relative">
              <ShoppingBag
                size={22}
                strokeWidth={1.5}
                className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:opacity-70 transition text-white/90"
              />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-gold px-1 text-[10px] text-brand-green">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
          
          {/* Menu - Desktop Only */}
          {!isMobile && (
            <nav className="flex justify-center flex-wrap gap-x-6 lg:gap-x-10 gap-y-2 pt-10 md:pt-14 text-[11px] md:text-[12px] tracking-[2px] md:tracking-[3px] font-normal text-white/80">

              {menuItems.map((item) => (
                <div key={item} className="relative">
                  <button
                    onClick={() => handleMenuClick(item)}
                    className={`uppercase whitespace-nowrap relative text-white/80 hover:text-brand-gold transition after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-brand-gold hover:after:w-full after:transition-all ${
                      activeMenu === item ? "after:w-full" : ""
                    }`}
                  >
                    {item}
                  </button>
                </div>
              ))}
            </nav>
          )}


        </div>

        {/* Mega Menu - Desktop Only */}
        {!isMobile && activeMenu && megaMenuData[activeMenu] && (
          <>
            <div 
              className="fixed inset-0 top-[140px] z-40"
              onClick={() => setActiveMenu(null)}
            ></div>
            <MegaMenu activeMenu={activeMenu} onClose={() => setActiveMenu(null)} />
          </>
        )}

        {/* Search Drawer */}
        {searchOpen && (
          <>
            {/* Search Bar */}
            <div
              ref={searchDrawerRef}
              className="absolute left-0 top-full w-full bg-brand-green/95 backdrop-blur-md z-50 border-t-2 border-brand-gold/60 border-b border-brand-gold/20 h-16 md:h-[80px] flex items-center px-4 md:px-14 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
            >
              <Search size={24} strokeWidth={1.5} className="text-brand-gold/70 w-5 h-5 md:w-6 md:h-6" />

              <input
                type="text"
                placeholder="SEARCH FOR DIAMONDS, RINGS, JEWELRY..."
                className="ml-3 md:ml-5 flex-1 text-[14px] md:text-[18px] tracking-[2px] md:tracking-[4px] outline-none bg-transparent text-white placeholder:text-white/50 font-light"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                autoFocus
              />

              <button 
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchTerm("");
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition duration-300"
              >
                <X size={24} strokeWidth={1.5} className="text-brand-gold/70 hover:text-white w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Overlay */}
            <div
              className="fixed inset-0 top-[140px] md:top-[220px] bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setSearchOpen(false)}
            ></div>
          </>
        )}
      </header>
    </>
  );
}
