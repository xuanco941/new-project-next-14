export default function Img(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...props}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...props.style,
      }}
      alt={props.alt || "Image"}
    />
  );
}
