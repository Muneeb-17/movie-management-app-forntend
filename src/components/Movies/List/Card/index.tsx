import CardImg1 from "@/assets/images/card-img-1.svg";
import Image from "next/image";

const Card = () => {
  return (
    <div className="w-[282px] h-[504px] bg-card-color rounded-xl flex items-start justify-center p-2 flex-col max-sm:w-[180px] max-sm:h-[334px]">
      <Image
        src={CardImg1.src}
        width={266}
        height={400}
        alt="card-img"
        className="mb-4"
      />
      <div className="flex flex-col gap-4 ml-2">
        <p className="text-white">Movie 1</p>
        <p className="text-white">2021</p>
      </div>
    </div>
  );
};

export default Card;
