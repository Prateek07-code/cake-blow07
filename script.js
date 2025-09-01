.cake-container {
  position: relative;
  width: 100%;
  text-align: center;
  margin-top: 50px;
}

.cake {
  position: relative; /* relative to container */
  display: inline-block;
  width: 250px;
  height: 200px;
  margin-top: 20px; /* space under heading */
  background: #f2c1b6; /* example cake color */
  border-radius: 10px;
}

.candle {
  position: absolute;
  width: 10px;
  height: 30px;
  background: #FFD700; /* gold candle */
  border-radius: 2px;
}

.flame {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 15px;
  background: radial-gradient(circle, #FF4500 0%, #FFFF00 60%, transparent 80%);
  border-radius: 50%;
  animation: flicker 0.3s infinite alternate;
}

.candle.out .flame {
  display: none;
}

/* Flame flicker animation */
@keyframes flicker {
  0% { transform: translateX(-50%) scaleY(1); opacity: 1; }
  50% { transform: translateX(-50%) scaleY(1.2); opacity: 0.8; }
  100% { transform: translateX(-50%) scaleY(1); opacity: 1; }
}

#candleCount {
  font-size: 20px;
  margin-top: 20px;
  color: #6A4B18;
  font-family: 'Arial', sans-serif;
}
