import { FaFacebook, FaInstagram, FaYoutube, FaGlobe } from 'react-icons/fa';
import SeparatorSVG from '../../assets/SeparatorSVG';
import { CSSProperties } from 'react';

const iconRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
};

const iconWrapperStyle: CSSProperties = {
  backgroundColor: 'black',
  borderRadius: '50%',
  width: '32px',
  height: '32px',
  position: 'relative',
};

const iconStyle: CSSProperties = {
  color: 'white',
  margin: '0',
  padding: '0',
  position: 'absolute',
  top: '6px',
  left: '6px',
};

export default function Signature() {
  return (
    <table
      style={{
        height: '208px',
        position: 'relative',
        gap: '16px',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url('https://chrzescijanskaszkolatanca.pl/wp-content/uploads/2023/11/Projekt-bez-nazwy.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <SeparatorSVG style={{
        width: '100%',
        height: '48px',
        objectFit: 'cover',
        filter: 'brightness(0) invert(1)'
      }} />
      {/* text */}
      <table style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', fontSize: '14px' }}>
        <p style={{ margin: 0 }}>Ściskamy i pozdrawiamy!</p>
        <p style={{ margin: 0 }}>Chrześcijańska Szkoła Tańca</p>
        <img width={60} src='https://chrzescijanskaszkolatanca.pl/wp-content/uploads/2022/04/logo_white_amen_trimmed-163x99.png' />
      </table>
      {/* icons */}
      <table style={iconRowStyle}>
        <span style={iconWrapperStyle}>
          <a style={iconStyle} href="https://www.facebook.com/szkolaamen" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-white" size={20} />
          </a>
        </span>
        <span style={iconWrapperStyle}>
          <a style={iconStyle} href="http://instagram.com/szkolaamen" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white" size={20} />
          </a>
        </span>
        <span style={iconWrapperStyle}>
          <a style={iconStyle} href="http://youtube.com/@szkolaamen" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-white" size={20} />
          </a>
        </span>
        <span style={iconWrapperStyle}>
          <a style={iconStyle} href="https://chrzescijanskaszkolatanca.pl" target="_blank" rel="noopener noreferrer">
            <FaGlobe className="text-white" size={20} />
          </a>
        </span>
      </table>
    </table>
  );
}
