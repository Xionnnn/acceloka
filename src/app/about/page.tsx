// "use client";

// import { ArrowDown, Clapperboard, Hotel, Ship, Van } from "lucide-react";
// import EmblaCarousel from "../components/embla-carousel";
// import "../styles/embla.css";

// export default function Home() {
//   return (
//     <EmblaCarousel
//         axis="y" 
//         dragThreshold={100}
//     >
//       {/* Slide 1: Hero */}
//       <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
//         <h1 className="text-6xl font-bold text-center">
//           The <span className="underline">first choice</span> for your
//           <br />
//           ticketing solution
//         </h1>
//         <p>Book your first ticket now</p>
//         <div className="flex border rounded-lg divide-x mb-12">
//           <div className="flex flex-col items-center px-6 py-4">
//             <Van size={24} strokeWidth={1.5} />
//             <span className="text-sm text-center">Ground Transport Ticket</span>
//           </div>
//           <div className="flex flex-col items-center px-6 py-4">
//             <Ship size={24} strokeWidth={1.5} />
//             <span className="text-sm text-center">Sea Transport Ticket</span>
//           </div>
//           <div className="flex flex-col items-center px-6 py-4">
//             <Clapperboard size={24} strokeWidth={1.5} />
//             <span className="text-sm text-center">Cinema Ticket</span>
//           </div>
//           <div className="flex flex-col items-center px-6 py-4">
//             <Hotel size={24} strokeWidth={1.5} />
//             <span className="text-sm text-center">Hotels Ticket</span>
//           </div>
//         </div>
//         <div className="flex flex-col items-center text-gray-400">
//           <p className="text-sm">Scroll/drag here to continue</p>
//           <ArrowDown size={24} />
//         </div>
//       </div>

//       {/* Slide 2: About */}
//       <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
//         <p className="max-w-md text-center">
//           Acceloka is where every ticket finds its place. Cinema, concerts,
//           ground transport, sea voyages, flights, and hotels — all in one
//           refined booking experience.
//         </p>
//         <button className="border rounded-lg px-6 py-2 hover:bg-foreground hover:text-background transition-colors">
//           View available tickets
//         </button>
//       </div>
//     </EmblaCarousel>
//   );
// }
