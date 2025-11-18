import React, { createContext, useContext, useEffect, useState } from "react";

const ClickLoggerContext = createContext();

export const useClickLogger = () => {
  const context = useContext(ClickLoggerContext);
  if (!context) {
    throw new Error("useClickLogger must be used within a ClickLoggerProvider");
  }
  return context;
};

export const ClickLoggerProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  // Load logs from localStorage on mount
  useEffect(() => {
    const storedLogs = localStorage.getItem("clickLogs");
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  // Save logs to localStorage whenever logs change
  useEffect(() => {
    localStorage.setItem("clickLogs", JSON.stringify(logs));
  }, [logs]);

  const logClick = (element, path) => {
    const timestamp = new Date().toISOString();
    const newLog = { element, path, timestamp };
    setLogs((prevLogs) => [...prevLogs, newLog]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const downloadLogs = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "click_logs.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <ClickLoggerContext.Provider
      value={{ logs, logClick, clearLogs, downloadLogs }}
    >
      {children}
    </ClickLoggerContext.Provider>
  );
};
