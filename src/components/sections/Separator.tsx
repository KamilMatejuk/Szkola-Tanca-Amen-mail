import { CSSProperties, useContext } from 'react';
import { ContentContext } from '../../context/ContentContext';
import { SectionType } from '../../utils/types';
import SeparatorSVG from '../../assets/SeparatorSVG';

const separatorStyle: CSSProperties = {
  flex: '1',
  width: '100%',
  height: '48px',
  objectFit: 'cover',
  filter: 'brightness(0) invert(1)',

}

export default function Separator({ id }: { id: string }) {
  const { content } = useContext(ContentContext)!;
  const item = content.find((item) => item.id === id);
  const variant = item?.content?.toLowerCase();
  const showTop = variant !== 'bottom';
  const showBottom = variant !== 'top';
  
  return (
    <table
      style={{
        height: showTop && showBottom ? '96px' : '48px',
        gap: '16px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundImage: `url('https://chrzescijanskaszkolatanca.pl/wp-content/uploads/2023/11/Projekt-bez-nazwy.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {showTop && <SeparatorSVG style={{ ...separatorStyle}} />}
      {showBottom && <SeparatorSVG style={{ ...separatorStyle, transform: 'rotate(180deg)' }} />}
    </table>
  );
}
