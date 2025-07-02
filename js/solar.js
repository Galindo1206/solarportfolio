const solarView = document.querySelector(".solar-system");
const focusView = document.getElementById("focus-view");
const astroTitle = document.getElementById("astro-title");
const astroDesc = document.getElementById("astro-desc");
const astroImg = document.getElementById("astro-img");
const backButton = document.getElementById("back-button");

const planetLabels = ["Proyectos","Habilidades","Servicios"];
const astroData = {
  Sol: { title:"Sobre mí", desc:"<p>Desarrollador Fullstack…</p>", img:"assets/img/sol.png" },
  Proyectos: { title:"Mis Proyectos", desc:"<ul><li>Tienda online</li></ul>" },
  Habilidades: { title:"Mis Habilidades", desc:"<ul><li>HTML, CSS, JS</li><li>Laravel</li></ul>" },
  Servicios: { title:"Servicios", desc:"<ul><li>Desarrollo web</li></ul>" }
};

// 🎵 Carga de sonidos
const whooshSound = new Audio("assets/sounds/woosh.mp3");
const solSound = new Audio("assets/sounds/");
const planetSound = new Audio("assets/sounds/");
const clickSound = new Audio("assets/sounds/ckick.mp3");

// 🔊 Sonido de entrada
window.addEventListener("load", () => {
  whooshSound.volume = 0.4;
  whooshSound.play().catch(()=>{}); // evita error autplay
  
});

planetLabels.concat("Sol").forEach(label => {
  const el = label==="Sol" ? document.querySelector(".sun") : document.querySelector(`[data-label="${label}"]`);
  if (!el) return;

  el.addEventListener("click", () => {
    const data = astroData[label];
    astroTitle.innerHTML = data.title;
    astroDesc.innerHTML = data.desc;
    astroImg.src = data.img;
    focusView.classList.remove("hidden");
    solarView.classList.add("paused");

    // 🎧 Parar sonidos previos:
    whooshSound.pause(); solSound.pause(); planetSound.pause(); clickSound.pause();

    if (label==="Sol") {
      solSound.currentTime = 0; solSound.play();
      whooshSound.currentTime = 0; whooshSound.play();
      solarView.style.transform="scale(2.5) translateX(20%)";
      return;
    } else {
      planetSound.currentTime=0; planetSound.play();
      whooshSound.currentTime = 0; whooshSound.play();
    }

    document.querySelectorAll(".clone").forEach(n=>n.remove());

    const rect = el.getBoundingClientRect();
    const finalSize = 500;
    const targetX = window.innerWidth * 0.75 - finalSize/2;
    const targetY = window.innerHeight / 2 - finalSize/2;

    const planetClone = el.cloneNode(true);
    planetClone.classList.add("clone","animated");
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
  clickSound.currentTime = 0;
  clickSound.play();
  whooshSound.currentTime = 0;
  whooshSound.play();
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


