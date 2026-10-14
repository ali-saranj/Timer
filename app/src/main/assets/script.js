function initStopwatch() {
  const btnContainer = document.getElementById("btnha");
  const mtns = document.getElementById("sanye");
  const mtnd = document.getElementById("daghighe");
  const mtnh = document.getElementById("saat");
  const startBtn = document.getElementById("start");
  const resetBtn = document.getElementById("reset");
  const stopBtn = document.getElementById("stop");

  if (!mtns || !mtnd || !mtnh) {
    console.warn("Stopwatch display elements not yet ready");
    return;
  }

  let sanie = 0;
  let daghighe = 0;
  let saat = 0;
  let timer = null;

  function handler() {
    sanie++;
    if (sanie < 10) {
      mtns.innerHTML = `0${sanie}`;
    } else if (sanie >= 10 && sanie < 60) {
      mtns.innerHTML = sanie;
    } else if (sanie >= 60) {
      sanie = 0;
      mtns.innerHTML = "00";
      daghighe++;
      if (daghighe < 10) {
        mtnd.innerHTML = `0${daghighe}`;
      } else if (daghighe >= 10 && daghighe < 60) {
        mtnd.innerHTML = daghighe;
      } else if (daghighe >= 60) {
        daghighe = 0;
        mtnd.innerHTML = "00";
        saat++;
        if (saat < 10) {
          mtnh.innerHTML = `0${saat}`;
        } else {
          mtnh.innerHTML = saat;
        }
      }
    }
  }

  function start() {
    if (timer == null) {
      timer = setInterval(handler, 1000);
    }
  }

  function stop() {
    if (timer != null) {
      clearInterval(timer);
      timer = null;
    }
  }

  function reset() {
    stop();
    sanie = 0;
    daghighe = 0;
    saat = 0;
    mtns.innerHTML = "00";
    mtnd.innerHTML = "00";
    mtnh.innerHTML = "00";
  }

  if (startBtn) startBtn.addEventListener("click", start);
  if (stopBtn) stopBtn.addEventListener("click", stop);
  if (resetBtn) resetBtn.addEventListener("click", reset);

  // Delegation fallback
  if (btnContainer) {
    btnContainer.addEventListener("click", (event) => {
      const target = event.target.closest("button");
      if (!target) return;
      const text = target.textContent.trim().toLowerCase();
      const id = target.id ? target.id.toLowerCase() : "";

      if (id === "start" || text === "start") {
        start();
      } else if (id === "stop" || text === "stop") {
        stop();
      } else if (id === "reset" || text === "reset") {
        reset();
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStopwatch);
} else {
  initStopwatch();
}
