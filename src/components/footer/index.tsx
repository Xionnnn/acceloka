import Link from "next/link";
import * as motion from "motion/react-client";

export default function Footer() {
  return (
    <div className="mt-auto px-10 py-10 border-t border-slight-black/20 w-full min-h-40 flex justify-around ">
      <div className="text-xl">
        Acceloka
        <div className="text-sm">Since 2026</div>
      </div>
      <div>
        Navigation
        <motion.div
          style={{ transformOrigin: "left center" }}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.1 }}
        >
          <Link href="/about">Ticket</Link>
        </motion.div>
        <motion.div
          style={{ transformOrigin: "left center" }}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.1 }}
        >
          <Link href="/about">Booking</Link>
        </motion.div>
      </div>
    </div>
  );
}
