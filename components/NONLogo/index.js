import Image from "next/image";
export default function NONLogo() {
  return (
    <div className="relative h-[22px] w-[91px] md:h-[44px] md:w-[182px]">
      <Image
        src="https://static.plgworks.com/assets/images/hon/hon-logo.png"
        alt="HoN Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
