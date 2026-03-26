import { useState, useRef, useEffect, useCallback } from "react";

export interface DropdownOption {
  value: string;
  label: string;
}

interface LuxuryDropdownProps {
  label: string;
  placeholder?: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function LuxuryDropdown({
  label,
  placeholder = "Please select",
  options,
  value,
  onChange,
  className = "",
}: LuxuryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    []
  );

  // Handle escape key
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  // Scroll selected option into view when dropdown opens
  useEffect(() => {
    if (isOpen && listRef.current && value) {
      const selectedElement = listRef.current.querySelector(
        `[data-value="${value}"]`
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [isOpen, value]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Label */}
      <label className="block text-[16px] md:text-[17px] font-semibold text-black mb-2 md:mb-3">
        {label}
      </label>

      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full h-[58px] bg-white border border-[#d9d9d9] px-4
          flex items-center justify-between
          transition-all duration-200
          ${isOpen ? "border-[#999999]" : "hover:border-[#bbbbbb]"}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`text-[18px] font-medium ${
            selectedOption ? "text-black" : "text-[#999999]"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Arrow Icon */}
        <svg
          className={`w-5 h-5 text-black transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`
          absolute left-0 right-0 bg-white border-x border-b border-[#d9d9d9]
          z-50 overflow-hidden
          transition-all duration-300 ease-out
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
        `}
        style={{ maxHeight: "320px" }}
      >
        <div
          ref={listRef}
          className="overflow-y-auto max-h-[320px] py-2"
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              data-value={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                w-full text-left px-[18px] py-4
                text-[18px] text-black
                transition-colors duration-150
                hover:bg-[#f5f5f5]
                focus:outline-none focus:bg-[#f5f5f5]
                ${value === option.value ? "bg-[#f5f5f5] font-medium" : ""}
              `}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

