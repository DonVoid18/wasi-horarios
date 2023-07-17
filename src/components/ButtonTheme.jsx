import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../features/theme/themeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faDesktop } from "@fortawesome/free-solid-svg-icons";
const ContainerButtons = () => {
  const themeValue = useSelector((state) => state.theme.theme);
  const htmlDoc = document.documentElement;
  const themeSystem = window.matchMedia("(prefers-color-scheme: dark)");

  if (themeValue === "light") {
    htmlDoc.classList.remove("dark");
    localStorage.theme = "light";
  }
  if (themeValue === "dark") {
    htmlDoc.classList.add("dark");
    localStorage.theme = "dark";
  }
  if (themeValue === "system") {
    localStorage.removeItem("theme");
    if (!("theme" in localStorage) && themeSystem.matches) {
      htmlDoc.classList.add("dark");
    } else {
      htmlDoc.classList.remove("dark");
    }
  }
  const changeSystemDark = (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        htmlDoc.classList.add("dark");
      } else {
        htmlDoc.classList.remove("dark");
      }
    }
  };

  useEffect(() => {
    themeSystem.addEventListener("change", changeSystemDark);
    return () => {
      window.removeEventListener("change", changeSystemDark);
    };
  }, [themeValue]);

  return (
    <div className="flex flex-col border w-32 rounded-lg bg-white shadow-xl overflow-hidden dark:bg-fondo-dark">
      <Button name="light" icon={light} selectButton={themeValue === "light"} />
      <Button name="dark" icon={dark} selectButton={themeValue === "dark"} />
      <Button
        name="system"
        icon={system}
        selectButton={themeValue === "system"}
      />
    </div>
  );
};

const Button = ({ name, icon, selectButton }) => {
  const dispatch = useDispatch();
  return (
    <button
      className={`flex items-center gap-3 px-3 py-2 capitalize font-medium duration-200 ease-out focus:outline-none ${
        selectButton
          ? "text-black bg-gray-200 dark:bg-gray-500 dark:text-white"
          : undefined
      } hover:bg-gray-200 hover:dark:bg-gray-500`}
      onClick={() => dispatch(changeTheme(name))}
    >
      {icon}
      {name}
    </button>
  );
};
const light = <FontAwesomeIcon icon={faSun} />;
const dark = <FontAwesomeIcon icon={faMoon} />;
const system = <FontAwesomeIcon icon={faDesktop} />;
export default ContainerButtons;
