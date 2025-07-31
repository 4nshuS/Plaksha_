"use client";
import { useState, useRef } from "react";
import { colors } from "@/lib/colors";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const clickCountRef = useRef(0);
  const firstClickTimeRef = useRef(null);

  const closeMenu = () => setIsOpen(false);

  const handleLogoClick = () => {
    const now = Date.now();
    if (!firstClickTimeRef.current) {
      firstClickTimeRef.current = now;
    }

    clickCountRef.current += 1;

    if (clickCountRef.current >= 5 && now - firstClickTimeRef.current <= 7500) {
      setShowAdmin(true);
      clickCountRef.current = 0;
      firstClickTimeRef.current = null;
    }

    // Reset if time window exceeded
    if (now - firstClickTimeRef.current > 7500) {
      clickCountRef.current = 1;
      firstClickTimeRef.current = now;
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    { label: "About", href: "/about" },
    ...(showAdmin ? [{ label: "Admin", href: "/admin" }] : [])
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md shadow-sm z-20">
        {/* Logo with Easter Egg */}
        <span
          onClick={handleLogoClick}
          className="cursor-pointer text-xl font-normal transition-colors duration-300 hover:opacity-80"
          style={{ color: colors.maroon }}
        >
          Plaksha
        </span>

        {/* Centered nav links for desktop */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6 text-gray-500 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-gray-700 transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger menu (mobile) */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-gray-700"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-white/60 backdrop-blur-lg z-30 flex items-center justify-center"
            onClick={closeMenu}
          >
            {/* Close button */}
            <button
              onClick={closeMenu}
              className="absolute top-6 right-6 text-gray-700"
            >
              <X size={28} />
            </button>

            {/* Menu content */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col items-center space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-lg text-gray-700 hover:text-gray-900 transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
