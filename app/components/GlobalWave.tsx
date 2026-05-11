"use client";
import Wave from "react-wavify";

export default function GlobalWave() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "120px",
        zIndex: -1,
        opacity: 0.5,
      }}
    >
      <Wave
        fill="#f7a32f"
        options={{ height: 36, amplitude: 30, speed: 0.15, points: 6 }}
      />
    </div>
  );
}
