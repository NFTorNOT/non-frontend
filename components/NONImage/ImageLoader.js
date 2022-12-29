import LoaderSvgIcon from "./loaderSvgIcon";

const ImageLoader = ({ height, width }) => {
  return (
    <div
      className={`flex items-center h-[${height}px] w-[${width}px]  justify-center`}
    >
      <LoaderSvgIcon />
    </div>
  );
};

export default ImageLoader;
