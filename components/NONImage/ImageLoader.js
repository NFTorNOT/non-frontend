import LoaderSvgIcon from "./loaderSvgIcon";

const ImageLoader = ({ height, width, color }) => {
  return (
    <div
      className={`flex items-center h-[${height}px] w-[${width}px]  justify-center`}
    >
      <LoaderSvgIcon color={color} />
    </div>
  );
};

export default ImageLoader;
