import Logo from "/logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import ButtonTheme from "./ButtonTheme";
import { faSun, faMoon, faDesktop } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  const [buttonTheme, setButtonTheme] = useState(false);
  const themeIcon = () => {
    const valueTheme = useSelector((state) => state.theme.theme);
    if (valueTheme === "light") return faSun;
    if (valueTheme === "dark") return faMoon;
    if (valueTheme === "system") return faDesktop;
    return faDesktop;
  };
  return (
    <div className="w-full h-14 px-5 flex justify-between bg-gradient-to-r items-center border-b border-gray-300">
      <div className="w-full flex justify-start items-center">
        <Link to="/" className="flex select-none items-center gap-3">
          <img className="w-9" src={Logo} alt="Logo page" />
          <h1 className="text-2xl font-bold dark:text-white">UNILIX</h1>
        </Link>
      </div>
      <div className="grid grid-cols-[repeat(2,_35px)] text-center dark:text-white">
        {/* <div>
          <button>
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div> */}
        <div className="relative">
          <button onClick={() => setButtonTheme(!buttonTheme)}>
            <FontAwesomeIcon icon={themeIcon()} />
          </button>
          {buttonTheme && (
            <div className="absolute top-8 right-0">
              <ButtonTheme />
            </div>
          )}
        </div>
        <div>
          <button>
            <FontAwesomeIcon icon={faPowerOff} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
