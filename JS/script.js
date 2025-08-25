 document.addEventListener("DOMContentLoaded", () => {
      const popupOverlay = document.getElementById("popup-overlay");
      const closeBtn = document.getElementById("popup-close");
      const heroSection = document.querySelector("section"); // adjust selector if needed

      let popupShown = false;

      // Function to show popup
      function showPopup() {
        if (!popupShown) {
          popupOverlay.classList.remove("pointer-events-none");
          popupOverlay.classList.add("opacity-100");
          popupShown = true;
        }
      }

      // Function to hide popup
      function hidePopup() {
        popupOverlay.classList.add("pointer-events-none");
        popupOverlay.classList.remove("opacity-100");
      }

      // Show popup after scrolling past hero
      window.addEventListener("scroll", () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom && !popupShown) {
          showPopup();
        }
      });

      // OR show popup after 10 seconds (backup trigger)
      setTimeout(() => {
        if (!popupShown) {
          showPopup();
        }
      }, 10000);

      // Close button action
      closeBtn.addEventListener("click", hidePopup);
    });
      AOS.init({ duration: 800, once: true });
    document.getElementById('year').textContent = new Date().getFullYear();
    (function countdown() {
      const LS_KEY = 'fbaCountdownDeadline';
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
      const now = Date.now();
      let deadline = Number(localStorage.getItem(LS_KEY));
      if (!deadline || deadline < now) {
        deadline = now + sevenDaysMs;
        localStorage.setItem(LS_KEY, String(deadline));
      }
      const elD = document.getElementById('cd-days');
      const elH = document.getElementById('cd-hours');
      const elM = document.getElementById('cd-mins');
      const elS = document.getElementById('cd-secs');
      function tick() {
        const diff = deadline - Date.now();
        if (diff <= 0) { elD.textContent = '0'; elH.textContent = '00'; elM.textContent = '00'; elS.textContent = '00'; return; }
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        elD.textContent = d; elH.textContent = String(h).padStart(2, '0'); elM.textContent = String(m).padStart(2, '0'); elS.textContent = String(s).padStart(2, '0');
        requestAnimationFrame(() => setTimeout(tick, 1000));
      }
      tick();
    })();

    