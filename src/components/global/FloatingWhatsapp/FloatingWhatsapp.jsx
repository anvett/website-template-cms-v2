"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { siteData } from "@/data/global/site.data";

function WhatsappIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M16.01 3.2A12.7 12.7 0 0 0 5.03 22.3L3.2 28.8l6.67-1.75A12.7 12.7 0 1 0 16.01 3.2Zm0 23.16a10.48 10.48 0 0 1-5.34-1.46l-.38-.23-3.96 1.04 1.06-3.86-.25-.4a10.46 10.46 0 1 1 8.87 4.91Zm5.75-7.84c-.31-.16-1.85-.91-2.14-1.01-.29-.11-.5-.16-.71.16-.21.31-.82 1.01-1.01 1.22-.18.21-.37.24-.68.08-.31-.16-1.32-.49-2.52-1.56-.93-.83-1.56-1.85-1.74-2.16-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.72-.97-2.36-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.62s1.13 3.04 1.29 3.25c.16.21 2.23 3.4 5.4 4.77.75.32 1.34.52 1.8.67.76.24 1.45.21 1.99.13.61-.09 1.85-.76 2.11-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37Z" />
    </svg>
  );
}

export function FloatingWhatsapp({
  message = "Hola, quiero solicitar información.",
}) {
  const phone = siteData?.contact?.whatsapp;

  if (!phone) return null;

  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 64 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Link
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] text-[var(--color-primary)] shadow-[var(--shadow-lg)] transition duration-300 ease-in-out hover:scale-105"
        >
          <WhatsappIcon className="h-[1.875rem] w-[1.875rem]" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default FloatingWhatsapp;