import Image from "next/image";
import { useRouter } from "next/router";
import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems, TabNames } from "../Main/TabItems";
import { NONLogoSvg } from "./NONLogoSvg";
export default function NONLogo() {
  const router = useRouter();
  const { onTabChange } = useBottomTab();
  const onNonLogoPress = () => {
    if (router.route !== "/") {
      router.push("/");
      onTabChange(TabItems[TabNames.VoteImage]);
    }
  };

  return (
    <div
      className="relative h-[22px] w-[91px] md:h-[44px] md:w-[182px] cursor-pointer z-10"
      onClick={onNonLogoPress}
    >
      <NONLogoSvg />
      {/* <Image
        src="https://static.plgworks.com/assets/images/hon/hon-logo.png"
        alt="HoN Logo"
        fill
        className="object-contain"
      /> */}
    </div>
  );
}
