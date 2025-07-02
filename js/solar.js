window.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", () => {
  const bgMusic = document.getElementById("bg-music");
  if (bgMusic && bgMusic.paused) {
    bgMusic.volume = 0.2;
    bgMusic.play().catch(() => {});
  }
}, { once: true }); // 🔁 Solo se ejecuta una vez


  const solarView = document.querySelector(".solar-system");
  const focusView = document.getElementById("focus-view");
  const astroTitle = document.getElementById("astro-title");
  const astroDesc = document.getElementById("astro-desc");
  const astroImg = document.getElementById("astro-img");
  const backButton = document.getElementById("back-button");

  const planetLabels = ["Proyectos", "Habilidades", "Servicios"];
  const astroData = {
    Sol: { title: "Sobre mí", desc: "<p>Desarrollador Fullstack…</p>" },
    Proyectos: { title: "Mis Proyectos", desc: "<ul><li>Tienda online</li></ul>" },
    Habilidades: { title: "Mis Habilidades", desc: "<ul><li>HTML, CSS, JS</li><li>Laravel</li></ul>" },
    Servicios: { title: "Servicios", desc: "<ul><li>Desarrollo web</li></ul>" }
  };

  const whooshSound = new Audio("assets/sounds/woosh.mp3");
  const solSound = new Audio("assets/sounds/woosh.mp3");
  const planetSound = new Audio("assets/sounds/woosh.mp3");
  const clickSound = new Audio("assets/sounds/click.mp3");

  window.addEventListener("load", () => {
    whooshSound.volume = 0.4;
    whooshSound.play().catch(() => {});
  });

  planetLabels.concat("Sol").forEach(label => {
    const el = label === "Sol" ? document.querySelector(".sun") : document.querySelector(`[data-label="${label}"]`);
    if (!el) return;

    el.addEventListener("click", () => {
      const data = astroData[label];
      astroTitle.innerHTML = data.title;
      astroDesc.innerHTML = data.desc;
      astroImg.src = data.img || "";
      focusView.classList.remove("hidden");
      solarView.classList.add("paused");

      [whooshSound, solSound, planetSound, clickSound].forEach(s => { s.pause(); s.currentTime = 0; });
      if (label === "Sol") solSound.play(); else planetSound.play();
      whooshSound.play();

      document.querySelectorAll(".clone").forEach(n => n.remove());

      const rect = el.getBoundingClientRect();
      const finalSize = 500;
      const targetX = window.innerWidth * 0.75 - finalSize / 2;
      const targetY = window.innerHeight / 2 - finalSize / 2;

      const planetClone = el.cloneNode(true);
      planetClone.classList.add("clone", "animated");
      planetClone.setAttribute("data-label", label);
      Object.assign(planetClone.style, {
        position: "fixed",
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        transition: "all 1.5s ease-in-out",
        borderRadius: "50%",
        zIndex: "200",
        pointerEvents: "none"
      });
      document.body.appendChild(planetClone);

      setTimeout(() => {
        planetClone.style.left = `${targetX}px`;
        planetClone.style.top = `${targetY}px`;
        planetClone.style.width = `${finalSize}px`;
        planetClone.style.height = `${finalSize}px`;
      }, 20);
    });
  });

  backButton.addEventListener("click", () => {
    [clickSound, whooshSound].forEach(s => { s.currentTime = 0; s.play(); });
    focusView.classList.add("hidden");
    solarView.style.transform = "";
    solarView.classList.remove("paused");
    document.querySelectorAll(".clone").forEach(n => n.remove());
  });

  const starContainer = document.querySelector('.starry-bg');
  for (let i = 0; i < 150; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    const size = Math.random() * 3 + 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.background = Math.random() > 0.95 ? '#f8f' : 'white';
    star.style.animationDuration = `${1 + Math.random() * 2}s, ${30 + Math.random() * 60}s`;
    starContainer.appendChild(star);
  }

  const meteorContainer = document.querySelector('.meteors');
  for (let i = 0; i < 15; i++) {
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    meteor.style.left = `${Math.random() * 100}vw`;
    meteor.style.top = `${-Math.random() * 100}px`;
    meteor.style.animationDelay = `${Math.random() * 10}s`;
    meteorContainer.appendChild(meteor);
  }

  const randomizePlanetPosition = (selector, orbitRadius) => {
    const container = document.querySelector(selector);
    if (container) {
      const angle = Math.random() * 360;
      container.style.transform = `rotate(${angle}deg) translateX(${orbitRadius}px)`;
    }
  };

  randomizePlanetPosition('.orbit1 .planet-container', 200);
  randomizePlanetPosition('.orbit2 .planet-container', 300);
  randomizePlanetPosition('.orbit3 .planet-container', 425);

  function spawnComet() {
    const layer = document.querySelector('.comet-layer');
    const comet = document.createElement('div');
    comet.className = 'comet';
    const tail = document.createElement('div');
    tail.className = 'tail';
    comet.appendChild(tail);

    const startY = Math.random() * 50;
    comet.style.top = startY + 'vh';
    comet.style.left = '-10px';
    layer.appendChild(comet);

    const duration = 5000 + Math.random() * 5000;
    comet.animate([
      { transform: 'translate(0,0)' },
      { transform: 'translate(110vw, 50vh)' }
    ], { duration, easing: 'ease-out' });

    setTimeout(() => comet.remove(), duration);
  }

  setInterval(spawnComet, 8000);

  function spawnShootingStar() {
    const star = document.createElement('div');
    star.className = 'comet';
    const tail = document.createElement('div');
    tail.className = 'tail';
    star.appendChild(tail);

    star.style.top = Math.random() * 100 + 'vh';
    star.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(star);

    star.animate([
      { transform: 'translate(0,0)', opacity: 1 },
      { transform: 'translate(300px,300px)', opacity: 0 }
    ], {
      duration: 1000,
      easing: 'ease-out'
    });

    setTimeout(() => star.remove(), 1000);
  }

  setInterval(spawnShootingStar, 15000);

  const musicBtn = document.getElementById('music-btn');
  const bgMusic = document.getElementById('bg-music');

  if (musicBtn && bgMusic) {
    musicBtn.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.volume = 0.2;
        bgMusic.play().then(() => {
          musicBtn.textContent = '🔊';
        }).catch(err => {
          console.log("Playback error:", err);
        });
      } else {
        bgMusic.pause();
        musicBtn.textContent = '🎵';
      }
    });
  }

});

/*rocas espaciales*/
function spawnFloatingRock() {
  const rock = document.createElement('div');
  rock.className = 'rock';

  const size = 20 + Math.random() * 30; // tamaño entre 20px y 50px
  rock.style.width = `${size}px`;
  rock.style.height = `${size}px`;

  rock.style.left = `${Math.random() * 100}vw`;
  rock.style.top = `${Math.random() * 100}vh`;
  rock.style.animationDuration = `${15 + Math.random() * 10}s`; // duración entre 15s y 25s

  document.body.appendChild(rock);

  setTimeout(() => rock.remove(), 30000); // eliminar tras 30s
}

// Generar una nueva roca cada 3 segundos
setInterval(spawnFloatingRock, 3000);



