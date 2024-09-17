const Buttons = () => {
  return (
    <div className="flex gap-4 w-full max-lg:justify-center">
      <button className="w-[167px] h-[56px] border border-white rounded-[10px] text-white font-bold max-sm:max-w-[182px] max-sm:w-full">
        Cancel
      </button>
      <button className="w-[179px] h-[56px]  rounded-[10px] text-white font-bold bg-login-button-green max-sm:max-w-[182px] max-sm:w-full">
        Submit
      </button>
    </div>
  );
};

export default Buttons;
