import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/85 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-32 w-32 animate-spin origin-center md:h-32 md:w-32">
          <Image
            src="/bees-circle.png"
            alt="Loading"
            height={100}
            width={100}
            className="block h-full w-full object-contain"
            priority
          />
        </div>
        <p className="text-sm uppercase tracking-[0.2em] text-white/70">Loading</p>
      </div>
    </div>
  );
};

export default Loader;