import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Music } from "lucide-react";

import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Music className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-bold text-white">El Concierto</span>
            </div>
            <p className="text-sm">
              Your premier destination for live music events and concert
              tickets.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/mnaufal.kadisatria"
                className="text-zinc-400 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="http://instagram.com/@khdhi"
                className="text-zinc-400 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-white transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/information"
                  className="hover:text-white transition-colors"
                >
                  Information
                </Link>
              </li>
            </ul>
          </div>
          <div className="fixed bottom-4 right-4">
            <a
              href="https://wa.me/+628119112942"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-10 h-10"
            >
              <Image
                src="/whatsapp-svgrepo-com.svg"
                alt="WhatsApp"
                width={50}
                height={50}
                className="rounded-full hover:scale-110 transition-transform duration-300"
              />
            </a>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <address className="not-italic space-y-2">
              <p className="mt-4">
                <a
                  href="mailto:mnaufalkadisatria13@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  Raihan
                </a>
              </p>
              <p className="mt-4">
                <a
                  href="tel:+628119112942"
                  className="hover:text-white transition-colors"
                >
                  +62 777 888 99
                </a>
              </p>
              <p className="mt-4">
                <a
                  href="mailto:mnaufalkadisatria13@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  Naufal satria
                </a>
              </p>
              <p>
                <a
                  href="tel:+628119112942"
                  className="hover:text-white transition-colors"
                >
                  +62 811 911 2942
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} JepLex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
