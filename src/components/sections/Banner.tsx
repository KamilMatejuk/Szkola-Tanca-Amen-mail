import { useContext } from "react";
import { ContentContext } from "../../context/ContentContext";
import { BANNER_WIDTH } from "../../assets/banner";

export default function Banner({ id }: { id: string }) {
  const { content } = useContext(ContentContext)!;
  const item = content.find((item) => item.id === id);
  const src = item?.content;
  return (
    <div style={{ width: `${BANNER_WIDTH}px` }}>
      <img src={src} alt="Banner" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
}
