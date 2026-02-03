"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        // Default options
        duration: 5000,
        style: {
          background: "#fff",
          color: "#363636",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
        // Success style
        success: {
          duration: 4000,
          iconTheme: {
            primary: "#10b981",
            secondary: "#fff",
          },
        },
        // Error style
        error: {
          duration: 6000,
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
        // Loading style
        loading: {
          iconTheme: {
            primary: "#3b82f6",
            secondary: "#fff",
          },
        },
      }}
    />
  );
};
