"use client";

import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Tutup drawer jika layar menjadi besar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <NavigationMenu className="hidden md:block p-4 bg-gray-900 shadow-lg rounded-xl">
        <NavigationMenuList className="flex space-x-6">
          {navItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Link href={item.href}>
                <motion.p
                  className="text-white font-medium text-lg hover:text-gray-300 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.p>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Navigation */}
      <div className="md:hidden p-4 bg-gray-900 shadow-lg rounded-xl flex items-center justify-between">
        <button
          className="text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Slide-out Drawer + Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)} // Tutup jika overlay diklik
            ></motion.div>

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-3/4 max-w-xs h-full bg-gray-900 shadow-lg z-50"
            >
              <div className="p-4">
                <button
                  className="text-white mb-6 focus:outline-none"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={24} />
                </button>
                <nav className="space-y-4">
                  {navItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.p
                        className="text-white font-medium text-lg hover:text-gray-300 transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.label}
                      </motion.p>
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
