import { useState } from "react";
export const useModal = (initialMode = false) => {
  const [isOpened, setIsOpened] = useState(initialMode);
  const toggle = () => {
    setIsOpened(!isOpened);
  };
  return [isOpened, setIsOpened, toggle];
};
