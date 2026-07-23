import { HeroSky } from "./HeroSky";
import { SearchBar } from "./SearchBar";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 pt-16 text-center sm:px-6">
      <HeroSky />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)] sm:text-6xl md:text-7xl">
          AIRPORT CHARTS
          <br />
          FOR PILOTS
        </h1>

        <p className="text-lg font-medium text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] sm:text-xl">
          Every Pilot&rsquo;s Website
        </p>

        <p className="max-w-xl text-sm text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] sm:text-base">
          Search, view and explore airport charts from airports around the world.
        </p>

        <div className="mt-4 w-full px-2 sm:px-0">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
