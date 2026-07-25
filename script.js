/* =====================================================
   CHESS.DEV STUDIO
   MODULE 1 — CONFIGURATION & OUTILS
===================================================== */

"use strict";

/* =====================================================
   CONFIGURATION
===================================================== */

const ChessDev = {

    version: "5.0",

    nom: "Chess.dev Studio",

    debug: true,

    responsive: {
        mobile: 768,
        tablette: 1200
    }

};

/* =====================================================
   ETAT GLOBAL
===================================================== */

const App = {

    largeur: window.innerWidth,

    hauteur: window.innerHeight,

    scrollY: window.scrollY,

    theme: "light",

    initialise: false

};

/* =====================================================
   RACCOURCIS DOM
===================================================== */

function $(id) {

    return document.getElementById(id);

}

function qs(selecteur) {

    return document.querySelector(selecteur);

}

function qsa(selecteur) {

    return document.querySelectorAll(selecteur);

}

/* =====================================================
   UTILITAIRES
===================================================== */

function throttle(callback, delai) {

    let attente = false;

    return function () {

        if (attente) return;

        attente = true;

        callback.apply(this, arguments);

        setTimeout(function () {

            attente = false;

        }, delai);

    };

}

function debounce(callback, delai) {

    let timer;

    return function () {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback.apply(this, arguments);

        }, delai);

    };

}

function nombre(valeur) {

    return Number(valeur).toLocaleString("fr-FR");

}

/* =====================================================
   MISE A JOUR DES DIMENSIONS
===================================================== */

function mettreAJourDimensions() {

    App.largeur = window.innerWidth;

    App.hauteur = window.innerHeight;

    App.scrollY = window.scrollY;

}

/* =====================================================
   INITIALISATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    mettreAJourDimensions();

    window.addEventListener(
        "resize",
        throttle(mettreAJourDimensions, 100)
    );

    window.addEventListener(
        "scroll",
        throttle(mettreAJourDimensions, 20)
    );

    App.initialise = true;

    console.log("✅ Module 1 chargé");

});

/* =====================================================
   FIN MODULE 1
===================================================== */
/* =====================================================
   MODULE 2 — NAVIGATION
===================================================== */

const Navigation = {

    header: null,

    liens: [],

    menu: null

};

/* =====================================================
   INITIALISATION
===================================================== */

function initialiserNavigation() {

    Navigation.header = document.querySelector("header");

    Navigation.liens = document.querySelectorAll("nav a");

    Navigation.menu = document.querySelector(".menu-toggle");

    gererHeader();

}

/* =====================================================
   HEADER AU SCROLL
===================================================== */

function gererHeader() {

    if (!Navigation.header) return;

    if (window.scrollY > 40) {

        Navigation.header.classList.add("header-scroll");

    } else {

        Navigation.header.classList.remove("header-scroll");

    }

}

/* =====================================================
   LIEN ACTIF
===================================================== */

function activerLien(id) {

    Navigation.liens.forEach(function (lien) {

        lien.classList.remove("active");

        if (lien.getAttribute("href") === "#" + id) {

            lien.classList.add("active");

        }

    });

}

/* =====================================================
   SCROLL DOUX
===================================================== */

function initialiserScrollDoux() {

    Navigation.liens.forEach(function (lien) {

        lien.addEventListener("click", function (event) {

            const cible = document.querySelector(

                lien.getAttribute("href")

            );

            if (!cible) return;

            event.preventDefault();

            cible.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

}

/* =====================================================
   OBSERVER DES SECTIONS
===================================================== */

function observerSections() {

    const sections = document.querySelectorAll("section[id]");

    if (!sections.length) return;

    const observer = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    activerLien(entry.target.id);

                }

            });

        },

        {

            threshold: 0.35

        }

    );

    sections.forEach(function (section) {

        observer.observe(section);

    });

}

/* =====================================================
   INITIALISATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    initialiserNavigation();

    initialiserScrollDoux();

    observerSections();

    window.addEventListener(

        "scroll",

        throttle(gererHeader, 20)

    );

    console.log("✅ Module 2 chargé");

});

/* =====================================================
   FIN MODULE 2
===================================================== */

/* =====================================================
   MODULE 3 — BARRE DE PROGRESSION
===================================================== */

function initialiserBarreProgression() {

    console.log("Module 3 chargé");

    const barre = document.getElementById("progress-bar");

    if (!barre) {

        console.log("progress-bar introuvable");

        return;

    }

    console.log("progress-bar trouvée");

    function mettreAJourProgression() {

        const hauteurDocument =
            document.documentElement.scrollHeight - window.innerHeight;

        if (hauteurDocument <= 0) {
            barre.style.width = "0%";
            return;
        }

        const progression =
            (window.scrollY / hauteurDocument) * 100;

        barre.style.width = progression + "%";
    }

    mettreAJourProgression();

    window.addEventListener("scroll", mettreAJourProgression);

    window.addEventListener("resize", mettreAJourProgression);

}

document.addEventListener(
    "DOMContentLoaded",
    initialiserBarreProgression
);

/* =====================================================
   FIN MODULE 3
===================================================== */

/* =====================================================
   MODULE 4 — UTILITAIRES
===================================================== */

/* =====================================================
   SÉLECTEURS
===================================================== */

function $(id) {

    return document.getElementById(id);

}

function qs(selecteur) {

    return document.querySelector(selecteur);

}

function qsa(selecteur) {

    return document.querySelectorAll(selecteur);

}

/* =====================================================
   ATTENDRE
===================================================== */

function attendre(ms) {

    return new Promise(function(resolve){

        setTimeout(resolve, ms);

    });

}

/* =====================================================
   THROTTLE
===================================================== */

function throttle(callback, delai) {

    let attente = false;

    return function(){

        if(attente) return;

        attente = true;

        callback.apply(this, arguments);

        setTimeout(function(){

            attente = false;

        }, delai);

    };

}

/* =====================================================
   DEBOUNCE
===================================================== */

function debounce(callback, delai) {

    let timer;

    return function(){

        clearTimeout(timer);

        const contexte = this;

        const args = arguments;

        timer = setTimeout(function(){

            callback.apply(contexte, args);

        }, delai);

    };

}

/* =====================================================
   FORMAT NOMBRE
===================================================== */

function nombre(valeur){

    return Number(valeur).toLocaleString("fr-FR");

}

/* =====================================================
   ALÉATOIRE
===================================================== */

function aleatoire(min,max){

    return Math.floor(

        Math.random()*(max-min+1)

    )+min;

}

/* =====================================================
   VÉRIFICATION
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function(){

        console.log("✅ Module 4 chargé");

    }

);

/* =====================================================
   FIN MODULE 4
===================================================== */
/* =====================================================
   MODULE 5 — MODALES
===================================================== */

const Modales = {

    ouverte: null

};

/* =====================================================
   OUVRIR
===================================================== */

function ouvrirModal(id){

    const modal = $(id);

    if(!modal) return;

    modal.style.display = "flex";

    document.body.classList.add("modal-open");

    Modales.ouverte = modal;

}

/* =====================================================
   FERMER
===================================================== */

function fermerModal(id){

    const modal = $(id);

    if(!modal) return;

    modal.style.display = "none";

    document.body.classList.remove("modal-open");

    Modales.ouverte = null;

}

/* =====================================================
   CLIC À L'EXTÉRIEUR
===================================================== */

window.addEventListener("click",function(event){

    if(

        Modales.ouverte &&

        event.target===Modales.ouverte

    ){

        fermerModal(Modales.ouverte.id);

    }

});

/* =====================================================
   TOUCHE ÉCHAP
===================================================== */

document.addEventListener("keydown",function(event){

    if(

        event.key==="Escape" &&

        Modales.ouverte

    ){

        fermerModal(Modales.ouverte.id);

    }

});

/* =====================================================
   INITIALISATION
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function(){

        console.log("✅ Module 5 chargé");

    }

);

/* =====================================================
   FIN MODULE 5
===================================================== */
/* =====================================================
   MODULE 6 — ANIMATIONS
===================================================== */

const Animations = {

    observer: null

};

/* =====================================================
   INITIALISATION
===================================================== */

function initialiserAnimations() {

    if (!("IntersectionObserver" in window)) {

        return;

    }

    Animations.observer = new IntersectionObserver(

        afficherAnimations,

        {

            threshold: 0.15,

            rootMargin: "0px 0px -80px 0px"

        }

    );

    const elements = document.querySelectorAll(

        ".stat-card, .timeline-item, .nation-card, .champion-card, .carte-ouverture"

    );

    elements.forEach(function (element) {

        element.classList.add("animation-ready");

        Animations.observer.observe(element);

    });

}

/* =====================================================
   OBSERVER
===================================================== */

function afficherAnimations(entries) {

    entries.forEach(function (entry) {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("animation-visible");

        Animations.observer.unobserve(entry.target);

    });

}

/* =====================================================
   REJOUER UNE ANIMATION
===================================================== */

function rejouerAnimation(element) {

    if (!element) return;

    element.classList.remove("animation-visible");

    void element.offsetWidth;

    element.classList.add("animation-visible");

}

/* =====================================================
   INITIALISATION
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        initialiserAnimations();

        console.log("✅ Module 6 chargé");

    }

);

/* =====================================================
   FIN MODULE 6
===================================================== */
/* =====================================================
   MODULE 7 — COMPTEURS
===================================================== */

function initialiserCompteurs() {

    const compteurs = document.querySelectorAll(".counter[data-counter]");

    if (!compteurs.length) {

        console.log("ℹ️ Aucun compteur trouvé.");

        return;

    }

    const observer = new IntersectionObserver(function(entries){

        entries.forEach(function(entry){

            if(!entry.isIntersecting) return;

            animerCompteur(entry.target);

            observer.unobserve(entry.target);

        });

    },{

        threshold:0.4

    });

    compteurs.forEach(function(compteur){

        observer.observe(compteur);

    });

}

function animerCompteur(compteur){

    const cible = Number(compteur.dataset.counter);

    let valeur = 0;

    const duree = 1800;

    const debut = performance.now();

    function animation(temps){

        const progression = Math.min(

            (temps-debut)/duree,

            1

        );

        valeur = Math.floor(

            cible*progression

        );

        compteur.textContent =

            nombre(valeur);

        if(progression<1){

            requestAnimationFrame(animation);

        }else{

            compteur.textContent =

                nombre(cible);

        }

    }

    requestAnimationFrame(animation);

}

document.addEventListener(

    "DOMContentLoaded",

    function(){

        initialiserCompteurs();

        console.log("✅ Module 7 chargé");

    }

);

/* =====================================================
   FIN MODULE 7
===================================================== */
/* =====================================================
   MODULE 8
   Apparition progressive des sections
===================================================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(".fade-section").forEach(section => {

    observer.observe(section);

});

console.log("Module 8 chargé");
/* =====================================================
   MODULE 9
   Citation du jour
===================================================== */

const quotes = [

{
text:"Les échecs sont le gymnase de l'esprit.",
author:"Blaise Pascal"
},

{
text:"Les échecs sont la lutte contre l'erreur.",
author:"Johannes Zukertort"
},

{
text:"La vie est comme une partie d'échecs.",
author:"Miguel de Cervantes"
},

{
text:"Aux échecs, comme dans la vie, le danger vient souvent de sa propre imprudence.",
author:"Savielly Tartakower"
},

{
text:"Les pions sont l'âme des échecs.",
author:"François-André Danican Philidor"
},

{
text:"Les combinaisons gagnantes viennent à l'esprit d'un joueur observateur.",
author:"Siegbert Tarrasch"
}

];

const randomQuote = quotes[Math.floor(Math.random()*quotes.length)];

document.getElementById("quote").textContent =
`"${randomQuote.text}"`;

document.getElementById("author").textContent =
`— ${randomQuote.author}`;

console.log("Module 9 chargé");
/* =====================================================
   MODULE 10
   Mode sombre
===================================================== */

const themeBtn = document.getElementById("theme-toggle");

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark-mode");

    themeBtn.textContent="☀️";

}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    const dark=document.body.classList.contains("dark-mode");

    themeBtn.textContent=dark ? "☀️" : "🌙";

    localStorage.setItem("theme",dark ? "dark":"light");

});

console.log("Module 10 chargé");
/* =====================================================
   MODULE 11
   RECHERCHE INSTANTANÉE
===================================================== */

const searchInput = document.getElementById("searchInput");

const searchableItems = document.querySelectorAll(".search-item");

searchInput.addEventListener("input", function(){

    const value = this.value.toLowerCase().trim();

    searchableItems.forEach(item=>{

        const text = item.textContent.toLowerCase();

        if(text.includes(value)){

            item.style.display="";

        }

        else{

            item.style.display="none";

        }

    });

});

console.log("Module 11 chargé");