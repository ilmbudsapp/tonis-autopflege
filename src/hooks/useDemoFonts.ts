import { useEffect, useState } from "react";

export function useDemoFonts() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const googleHref =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Syne:wght@500;600;700;800&family=Orbitron:wght@700;800;900&display=swap";
    const id = "tonis-demo-fonts-v2";

    const markReady = () => setReady(true);

    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = googleHref;
      link.onload = markReady;
      link.onerror = markReady;
      document.head.appendChild(link);
    } else {
      markReady();
    }
  }, []);
  return ready;
}
