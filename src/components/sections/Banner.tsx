import { useContext } from "react";
import { ContentContext } from "../../context/ContentContext";
import { BANNER_WIDTH } from "../../assets/banner";

export default function Banner({ id }: { id: string }) {
  const { content } = useContext(ContentContext)!;
  const item = content.find((item) => item.id === id);
  const src = item?.content;
  return (
    <img src={src} alt="Banner" style={{ width: `${BANNER_WIDTH}px`, height: 'auto' }} />
  );
}
