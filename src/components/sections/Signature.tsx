import { FaFacebook, FaInstagram, FaYoutube, FaGlobe } from 'react-icons/fa';

const classes = {
  container: "h-52 relative gap-4 flex flex-col",
  separator: "w-full h-12 object-cover",
  iconRow: "flex items-center justify-center space-x-4",
  iconWrapper: "bg-black rounded-full w-8 h-8 flex items-center justify-center"
};

export default function Signature() {
  return (
    <div
      className={classes.container}
      style={{ backgroundImage: `url('/src/assets/bg.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <img
        src="/src/assets/separator.svg"
        alt="separator"
        className={classes.separator}
        style={{ filter: 'brightness(0) invert(1)' }}
      />
      {/* text */}
      <div className="flex flex-col items-center text-white text-sm">
        <p>Ściskamy i pozdrawiamy!</p>
        <p>Chrześcijańska Szkoła Tańca</p>
        <img width={60} src='/src/assets/logo.png'/>
      </div>
      {/* icons */}
      <div className={classes.iconRow}>
        <span className={classes.iconWrapper}>
          <a href="https://www.facebook.com/szkolaamen" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-white" size={20} />
          </a>
        </span>
        <span className={classes.iconWrapper}>
          <a href="http://instagram.com/szkolaamen" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white" size={20} />
          </a>
        </span>
        <span className={classes.iconWrapper}>
          <a href="http://youtube.com/@szkolaamen" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-white" size={20} />
          </a>
        </span>
        <span className={classes.iconWrapper}>
          <a href="https://chrzescijanskaszkolatanca.pl" target="_blank" rel="noopener noreferrer">
            <FaGlobe className="text-white" size={20} />
          </a>
        </span>
      </div>
    </div>
  );
}
