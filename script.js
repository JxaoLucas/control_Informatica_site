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

const listaMobile = [
  { img: 4, href: "#contato" },
  { img: 5, href: "#servicos" },
  { img: 6, href: "#infos" }
];

let botaoVoltar;
let botaoAvancar;
let banner;
let bannerLink;
let intervalo; 
let listaAtiva = lista;

function VerificarTamanhoTela() {
  if (window.innerWidth <= 425) {
    listaAtiva = listaMobile;
  } else {
    listaAtiva = lista; 
  }
  Atualizar();
}

window.addEventListener('resize', VerificarTamanhoTela);

VerificarTamanhoTela();

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
  if (cont >= listaAtiva.length) {
    cont = 0;
  }
  Atualizar();
  ReiniciarCarrossel(); 
}

function Voltar() {
  cont--;
  if (cont < 0) {
    cont = listaAtiva.length - 1;
  }
  Atualizar();
  ReiniciarCarrossel(); 
}

function Atualizar() {
  banner.src = caminho + prefix + listaAtiva[cont].img + extensao;
  bannerLink.href = listaAtiva[cont].href;
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
