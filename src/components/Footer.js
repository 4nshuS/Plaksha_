"use client"
import { Feather, BookOpen, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[hsl(35,25%,97%)] py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row justify-between gap-8">
        {/* Branding */}
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <Feather className="w-6 h-6 mr-2" color="hsl(350,65%,25%)" />
            <span className="font-semibold text-lg md:text-xl text-[hsl(350,65%,25%)] font-['Playfair_Display']">
              Plaksha
            </span>
          </div>
          <p className="text-sm text-[hsl(20,8%,35%)] max-w-sm font-['Inter']">
            Contemporary poetry exploring the beauty of human experience through verse and contemplation.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col">
          <h4 className="font-medium text-base text-[hsl(20,15%,30%)] font-['Inter'] mb-2">
            Explore
          </h4>
          <ul className="space-y-2">
            <li>
              <Link 
                href="/" 
                className="text-sm text-[hsl(20,8%,35%)] hover:text-[hsl(350,65%,25%)] transition-colors font-['Inter']"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/collections" 
                className="text-sm text-[hsl(20,8%,35%)] hover:text-[hsl(350,65%,25%)] transition-colors font-['Inter']"
              >
                Collections
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="text-sm text-[hsl(20,8%,35%)] hover:text-[hsl(350,65%,25%)] transition-colors font-['Inter']"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[hsl(35,15%,85%)] mt-12 pt-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-[hsl(20,8%,40%)] text-sm">
          <p className="flex items-center gap-1">
            © 2025 Plaksha. Crafted with <Heart className="w-4 h-4 text-[hsl(40,70%,50%)]" />
          </p>
          <p className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" /> Made By Plaksha & Anshu
          </p>
        </div>
      </div>
    </footer>
  );
}
