import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("appSettings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          themeMode: "light",
          themeContrast: "contrast",
          primaryColor: "theme3",
          sidebarCaption: "caption",
          layout: "default",
          direction: "ltr",
          layoutWidth: "fluid",
          fontFamily: "Inter",
        };
  });

  useEffect(() => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};
