window.onload = Inicio;

const caminho = "./imagens/";
const prefix = "banner";
const extensao = ".png";
let cont = 0;
let dots;

const lista = [
  { img: 1, href: "#contato" },
  { img: 2, href: "#servicos" },
  { img: 3, href: "#infos" } 
];

let botaoVoltar;
let botaoAvancar;
let banner;
let bannerLink;
let intervalo; 

function Inicio() {
  botaoVoltar = document.getElementById("btnVoltar");
  botaoAvancar = document.getElementById("btnAvancar");
  banner = document.getElementById("banner");
  bannerLink = banner.parentElement;
  dots = document.querySelectorAll(".dot");

  botaoAvancar.onclick = Avancar;
  botaoVoltar.onclick = Voltar;

  banner.addEventListener("mouseenter", PausarCarrossel);
  banner.addEventListener("mouseleave", IniciarCarrossel);

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      cont = parseInt(dot.dataset.index);
      Atualizar();
      ReiniciarCarrossel();
    });
  });
  
  Atualizar();
  IniciarCarrossel(); 
}

function Avancar() {
  cont++;
  if (cont >= lista.length) {
    cont = 0;
  }
  Atualizar();
  ReiniciarCarrossel(); 
}

function Voltar() {
  cont--;
  if (cont < 0) {
    cont = lista.length - 1;
  }
  Atualizar();
  ReiniciarCarrossel(); 
}

function Atualizar() {
  banner.src = caminho + prefix + lista[cont].img + extensao;
  bannerLink.href = lista[cont].href;
  AtualizarIndicadores();
}

function AtualizarIndicadores() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("ativo", index === cont);
  });
}

function IniciarCarrossel() {
  if (!intervalo) {
    intervalo = setInterval(Avancar, 5000); 
  }
}

function PausarCarrossel() {
  clearInterval(intervalo);
  intervalo = null;
}

function ReiniciarCarrossel() {
  PausarCarrossel();      
  IniciarCarrossel();     
}

window.addEventListener('scroll', function() {
    const servicosSection = document.getElementById('servicos');
    const articles = servicosSection.getElementsByTagName('article');
    const sectionTop = servicosSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight && sectionTop > 0) {
        Array.from(articles).forEach((article, index) => {
            article.style.animationDelay = `${index * 0.3}s`;
            article.classList.add('animated');
        });
    }
});
