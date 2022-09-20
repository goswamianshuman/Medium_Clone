function Hero() {
  return (
    <section className="h-[60vh] bg-fixed relative w-screen bg-yellow-400 flex items-center">
      <div className="ml-auto md:ml-[10%] max-w-max pl-[50px] pr-[50px] pb-[50px]">
        <h1 className="text-[90px] leading-none text-[]">Stay curious.</h1>
        <p className="text-[24px] mt-10 leading-none font-[450] w-[26rem]  ">
          Discover stories,thinking, and expertise from writers on any pics.
        </p>
        <button className="max-w-max mt-10 text-white text-lg font-medium rounded-[50px] pl-[50px] pr-[50px] pt-[7px] pb-[7px] bg-black ">
          Start reading
        </button>
      </div>
      <div className="opacity-0 md:opacity-100 max-w-max absolute right-3">
        <img src="/bg.svg" />
      </div>
    </section>
  );
}

export default Hero;
