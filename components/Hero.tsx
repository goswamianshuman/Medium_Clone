function Hero() {
  return (
    <section className="h-[65vh] sm:h-[60vh] bg-fixed relative w-screen bg-yellow-400 flex items-center">
      <div className="flex flex-col items-center justify-center  sm:block ml-auto md:ml-[10%] w-full pl-[50px] pr-[50px] pb-[50px]">
        <h1 className="text-[45px] text-center sm:text-left sm:text-[65px] md:text-[90px] leading-none font-semibold">
          Stay curious.
        </h1>
        <p className="text-[22px] text-center sm:text-left md:text-[24px] w-[80%] md:w-[26rem]  mt-10 leading-none font-[450]   ">
          Discover stories,thinking, and expertise from writers on any pics.
        </p>
        <button className="max-w-max mt-10 text-white text-lg font-medium rounded-[50px] pl-[50px] pr-[50px] pt-[7px] pb-[7px] bg-black ">
          Start reading
        </button>
      </div>
      <div className=" hidden md:block md:opacity-50 lg:opacity-100 max-w-max absolute right-3">
        <img src="/bg.svg" />
      </div>
    </section>
  );
}

export default Hero;
