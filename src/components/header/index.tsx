import Link from "next/link";
import * as motion from "motion/react-client";

export default function Header() {
  return (
    <div className="flex justify-between mb-5 px-6 pt-5">
      <div>
        <Link href="/">Acceloka</Link>
      </div>
      <div className="flex">
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.1 }}
        >
          <Link href="/ticket" className="pr-5">
            Tickets
          </Link>
        </motion.div>
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.1 }}
        >
          <Link href="/booking">Bookings</Link>
        </motion.div>
      </div>
    </div>
  );
}
