import type React from "react";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  children,
}: FilterDrawerProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-[90%] max-w-[320px] bg-brand-green z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ height: "100vh", overflow: "hidden" }}
      >
        {children}
      </div>
    </>
  );
}
