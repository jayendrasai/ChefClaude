import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="custom-loading" aria-busy="true" aria-live="polite">
      <div className="custom-spinner" />
      <div className="custom-loading-text">Loading...</div>
    </div>
  );
}