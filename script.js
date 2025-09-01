document.addEventListener("DOMContentLoaded", () => {
  const cake = document.querySelector(".cake");
  const candlesContainer = document.getElementById("candles");
  const candleCountDisplay = document.getElementById("candleCount");

  // --- Get number of candles from URL ---
  const urlParams = new URLSearchParams(window.location.search);
  let numCandles = parseInt(urlParams.get("candles")) || 0;

  // --- Create candles in concentric circles ---
  function placeCandles(count) {
    candlesContainer.innerHTML = ""; // clear old candles

    const centerX = candlesContainer.offsetWidth / 2;
    const centerY = candlesContainer.offsetHeight / 2;

    let radiusStep = 25; // distance between rings
    let candlesPlaced = 0;
    let ring = 0;

    while (candlesPlaced < count) {
      ring++;
      const radius = ring * radiusStep;
      const candlesThisRing = Math.min(count - candlesPlaced, ring * 8); // 8 more per ring
      for (let i = 0; i < candlesThisRing; i++) {
        const angle = (i / candlesThisRing) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const candle = document.createElement("div");
        candle.className = "candle";

        // Position candle
        candle.style.left = `${x - 6}px`; // adjust to center candle width
        candle.style.top = `${y - 35}px`; // adjust to sit on cake

        // Add flame
        const flame = document.createElement("div");
        flame.className = "flame";
        candle.appendChild(flame);

        candlesContainer.appendChild(candle);
      }
      candlesPlaced += candlesThisRing;
    }

    candleCountDisplay.textContent = count;
  }

  if (numCandles > 0) {
    placeCandles(numCandles);
  }
});
