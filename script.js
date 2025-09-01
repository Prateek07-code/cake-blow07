document.addEventListener("DOMContentLoaded", () => {
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
      const candlesThisRing = Math.min(count - candlesPlaced, ring * 8);
      for (let i = 0; i < candlesThisRing; i++) {
        const angle = (i / candlesThisRing) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const candle = document.createElement("div");
        candle.className = "candle";

        candle.style.left = `${x - 6}px`;
        candle.style.top = `${y - 35}px`;

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

  // --- Enable microphone blow-out ---
  async function enableMicBlowOut() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const mic = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      mic.connect(analyser);

      function checkVolume() {
        analyser.getByteFrequencyData(dataArray);
        const volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        // threshold for blowing out candles
        if (volume > 40) {
          document.querySelectorAll(".candle .flame").forEach((flame) => {
            flame.style.display = "none";
          });
        }

        requestAnimationFrame(checkVolume);
      }
      checkVolume();
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  }

  enableMicBlowOut();
});
