import { useContext } from "react";
import { ClickLoggerContext } from "../context/ClickLoggerContext";

export const useClickLogger = () => {
  const context = useContext(ClickLoggerContext);
  if (!context) {
    throw new Error("useClickLogger must be used within a ClickLoggerProvider");
  }
  return context;
};
