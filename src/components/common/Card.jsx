import Image from "next/image";

export const Card = ({
  image,
  imageHeight,
  imageWidth,
  div,
  className,
  imageClassName,
}) => {
  return (
    <div
      className={`flex flex-col ${className} shadow-soft group duration-300 ease-in-out`}
    >
      <Image
        src={image}
        alt="card"
        height={imageHeight}
        width={imageWidth}
        className={`${imageClassName} group-hover:scale-90 group-hover:rounded-2xl duration-300 ease-in-out`}
      />
      {div}
    </div>
  );
};
