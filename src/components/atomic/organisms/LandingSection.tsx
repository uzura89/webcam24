export function LandingSection(props: { goToNextPlace: () => void }) {
  return (
    <div className="h-full w-full">
      {/* Content */}
      <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center z-20">
        {/* Copy and Description */}
        <div className="flex flex-col items-center gap-8">
          {/* Catch Copy */}
          <div className="text-7xl text-white font-bold max-w-[45rem] text-center">
            Random Webcams Around the World
          </div>
          {/* Short Description */}
          <div className="text-2xl text-white max-w-[30rem] text-center text-white/60">
            Connect to random live cameras across the globe, from the bustling
            Shibuya Crossing to the wild African savanna.
          </div>
        </div>

        {/* Start Button */}
        <div className="mt-10">
          <button
            onClick={props.goToNextPlace}
            className="clickable px-10 py-3 bg-[#b24b0c] text-white/80 rounded-full font-bold text-xl"
          >
            Start
          </button>
        </div>
      </div>

      {/* Background */}
      <div className="h-full w-full">
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-80 z-10" />
        <div className="w-full h-full filter grayscale bg-[url('/img/assets/landing-background3.png')] bg-cover" />
      </div>
    </div>
  );
}
