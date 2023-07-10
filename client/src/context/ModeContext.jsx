import { createContext, useEffect, useState } from 'react';

const initialState = {
  mode: 1,
  setMode: () => {},
};

export const ModeContext = createContext(initialState);

export const ModeContextProvider = ({ children }) => {
  useEffect(() => {
    localStorage.setItem('mode', '1');
  }, []);
  const [mode, setMode] = useState(+localStorage.getItem('mode') || 1);

  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>;
};
