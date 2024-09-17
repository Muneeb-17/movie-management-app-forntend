import FooterImage from "@/assets/icons/FooterImage";
import { usePathname } from "next/navigation";

const Footer = () => {
  return (
    <div className="relative top-[110px]">
      <div className={"absolute left-1/2 transform -translate-x-1/2 bottom-0"}>
        <FooterImage />
      </div>
    </div>
  );
};

export default Footer;
