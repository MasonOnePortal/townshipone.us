import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/banner.jpg" // Using a placeholder image
        alt="Township City Background"
        fill // Makes the image fill the parent container
        style={{ objectFit: "cover" }} // Ensures the image covers the area without distortion
        sizes="100vw" // Tells Next.js to optimize for full viewport width [^1]
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Welcome to Township
        </h1>
        <p className="text-lg md:text-xl mb-6 opacity-90">
          Discover the heart of our beautiful city
        </p>
        {/* <Button className="bg-white text-gray-900 px-6 py-3 rounded-full text-base font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
          Explore Now
        </Button> */}
      </div>
    </div>
  );
}
