import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system'); // 'light', 'dark', 'system'

  const isDark = themeMode === 'system' ? systemColorScheme === 'dark' : themeMode === 'dark';

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (mode) => {
    setThemeMode(mode);
  };

  return (
    <ThemeContext.Provider value={{ isDark, themeMode, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
