const Home = () => {
  return (
    <div className="h-custom-calc flex justify-center items-center flex-col gap-10">
      <h2 className="text-[48px] font-semibold text-white max-sm:text-[32px] text-center">
        Your movie list is empty
      </h2>
      <button className="w-[202px] h-[56px] rounded-[10px] bg-login-button-green text-[16px] font-bold text-white max-sm:w-full max-sm:max-w-[380px]">
        Add a new movie
      </button>
    </div>
  );
};

export default Home;
