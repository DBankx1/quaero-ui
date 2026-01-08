import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Business } from "~/types/business";

interface Props {
  business: Business;
}

export function Logo({ business }: Readonly<Props>) {
  return (
    <div className="group/logo relative flex-shrink-0">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="from-primary/30 absolute inset-0 rounded-2xl bg-gradient-to-br to-purple-500/30 opacity-0 blur-xl transition-opacity duration-500 group-hover/logo:opacity-70" />
        <div className="from-muted to-muted/50 border-border/50 relative h-15 w-15 overflow-hidden rounded-2xl border-2 bg-gradient-to-br shadow-xl sm:h-20 sm:w-20">
          {business.logo ? (
            <Image
              src={business.logo || business.image || "/placeholder.png"}
              alt={`${business.name} logo`}
              fill
              className="object-cover transition-transform duration-500 group-hover/logo:scale-110"
            />
          ) : (
            <div className="from-primary/20 via-primary/10 flex h-full w-full items-center justify-center bg-gradient-to-br to-purple-500/20">
              <span className="from-primary bg-gradient-to-br to-purple-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                {business.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
