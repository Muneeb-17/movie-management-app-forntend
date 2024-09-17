import FileUpload from "@/assets/icons/FileUpload";
import Buttons from "./Buttons";
import { DynamicFormProps } from "@/utils/interface";

const DynamicForm = ({ title }: DynamicFormProps) => {
  return (
    <>
      {/* min-h-screen */}
      <div className="flex flex-col gap-[100px] max-lg:items-center max-lg:gap-[60px] min-h-[100vh]">
        <h2 className="text-[48px] font-semibold text-white max-lg:text-[32px]">
          {title}
        </h2>
        {/* Left side: Image Drop Area */}
        <div className="flex justify-between max-lg:flex-col-reverse max-lg:gap-5 w-full">
          <div className="w-full flex max-lg:justify-center">
            <div className="w-[473px] h-[504px] border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center max-lg:max-w-[380px] max-lg:w-full max-lg:h-[372px]">
              <div className="flex flex-col items-center">
                <FileUpload />
                <p className="text-white text-[14px] font-normal">
                  Drop an image here
                </p>
              </div>
            </div>
          </div>
          {/* right side:  */}
          <div className="flex flex-col gap-6 max-lg:items-center">
            <div className="flex flex-col gap-6 max-lg:w-full max-lg:items-center">
              <input
                type="text"
                id="input-text-label"
                className="placeholder-white py-3 px-4 block  rounded-lg bg-input-green text-sm  text-white outline-0 border-0 w-[362px] h-[45px] max-lg:w-full max-lg:max-w-[380px]"
                required
                placeholder="Title"
              />
              <input
                type="text"
                id="input-publising-year-label"
                className="placeholder-white py-3 px-4 block  rounded-lg bg-input-green text-sm  text-white outline-0 border-0 w-[216px] h-[45px] max-lg:w-full max-lg:max-w-[380px]"
                required
                placeholder="Publishing year"
              />
            </div>
            <div className="max-lg:hidden">
              <Buttons />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full lg:hidden">
        <Buttons />
      </div>
    </>
  );
};

export default DynamicForm;
