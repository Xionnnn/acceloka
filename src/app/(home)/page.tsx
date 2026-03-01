import { ArrowDown, Clapperboard, Hotel, Ship, Van } from "lucide-react";
import Image from "next/image";
import * as motion from "motion/react-client";

export default function Main() {
  return (
    <div>
      {/* hero */}
      <div className="flex flex-col items-center justify-center h-fit py-20 lg:h-dvh  gap-6 px-6">
        <motion.h1
          className="text-4xl lg:text-6xl font-bold text-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            scale: { type: "spring", visualDuration: 0.5, bounce: 0.5 },
          }}
        >
          The <br className="lg:hidden"/> <span className="underline">first choice</span> for your
          <br />
          ticketing solution
        </motion.h1>
        <p>Book your first ticket now</p>
        <div className="flex border rounded-lg divide-x lg:mb-24 scale-70 origin-center lg:scale-100">
          <div className="flex flex-col items-center px-6 py-4">
            <Van size={24} strokeWidth={1.5} />
            <span className="text-sm text-center">Ground Transport Ticket</span>
          </div>
          <div className="flex flex-col items-center px-6 py-4">
            <Ship size={24} strokeWidth={1.5} />
            <span className="text-sm text-center">Sea Transport Ticket</span>
          </div>
          <div className="flex flex-col items-center px-6 py-4">
            <Clapperboard size={24} strokeWidth={1.5} />
            <span className="text-sm text-center">Cinema Ticket</span>
          </div>
          <div className="flex flex-col items-center px-6 py-4">
            <Hotel size={24} strokeWidth={1.5} />
            <span className="text-sm text-center">Hotels Ticket</span>
          </div>
        </div>
        <motion.div
          className="text-sm lg:flex flex-col items-center text-gray-400 hidden"
          animate={{ y: [0, -8] }}
          transition={{
            type: "spring",
            bounce: 0.5,
            stiffness: 100,
            damping: 10,
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Scroll down to continue
          <ArrowDown size={24} />
        </motion.div>
      </div>

      {/* about */}
      <div className="relative flex flex-col items-center justify-center h-fit mb-20 lg:h-dvh gap-6 px-6">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute left-6 top-7 hidden lg:block"
        >
          <Image
            src="/passport_prop.png"
            alt="gambar"
            width={360}
            height={360}
          />
        </motion.div>

        <p className="max-w-lg text-center text-lg lg:text-xl ">
          Acceloka is where every ticket finds its place. Cinema, concerts,
          ground transport, sea voyages, flights, and hotels — all in one
          refined booking experience.
        </p>
        <button className="border rounded-lg px-6 py-2 hover:bg-foreground hover:text-background transition-colors cursor-pointer">
          View available tickets
        </button>
        <motion.div
          className="absolute right-6 bottom-7 hidden lg:block"
          initial={{opacity: 0, x: 100}}
          whileInView={{opacity: 1, x: 0}}
          transition={{duration: 0.4, ease: "easeOut"}}
          viewport={{once: true}}
        >
          <Image
            src="/cinema_prop.png"
            alt="gambar"
            width={500}
            height={500}
          />
        </motion.div>
      </div>
    </div>
  );
}
