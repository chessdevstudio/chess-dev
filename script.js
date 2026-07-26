/* =====================================================
   CHESS.DEV STUDIO V6
   MODULE 0
   CONFIGURATION GLOBALE
===================================================== */

"use strict";

/* =====================================================
   CONFIGURATION
===================================================== */

const CONFIG = {

    version: "6.0",

    siteName: "Chess.dev Studio",

    debug: false,

    lectureMotsMinute: 200

};

/* =====================================================
   RACCOURCIS DOM
===================================================== */

const $ = (id) => document.getElementById(id);

const $$ = (selector) => document.querySelector(selector);

const $$$ = (selector) => document.querySelectorAll(selector);

/* =====================================================
   UTILITAIRES
===================================================== */

/* -------- Nombre -------- */

function formatNombre(nombre){

    return Number(nombre).toLocaleString("fr-FR");

}

/* -------- Aléatoire -------- */

function random(min,max){

    return Math.floor(

        Math.random()*(max-min+1)

    )+min;

}

/* -------- Debounce -------- */

function debounce(callback,delay){

    let timer;

    return function(){

        clearTimeout(timer);

        timer = setTimeout(

            () => callback.apply(this,arguments),

            delay

        );

    };

}

/* -------- Throttle -------- */

function throttle(callback,delay){

    let waiting=false;

    return function(){

        if(waiting) return;

        waiting=true;

        callback.apply(this,arguments);

        setTimeout(

            ()=> waiting=false,

            delay

        );

    };

}

/* =====================================================
   VARIABLES GLOBALES
===================================================== */

const App={

    body:document.body,

    html:document.documentElement,

    progressBar:$("progress-bar"),

    searchInput:$("searchInput"),

    themeButton:$("theme-toggle"),

    readingTime:$("reading-time"),

    readingProgress:$("reading-progress"),

    wordCount:$("word-count"),

    visitTime:$("visit-time")

};

/* =====================================================
   DEBUG
===================================================== */

function log(message){

    if(CONFIG.debug){

        console.log(message);

    }

}

log("✅ Module 0 chargé");
/* =====================================================
   MODULE 1
   CITATION DU JOUR
===================================================== */

const citations = [

    {
        texte : "Les échecs sont la gymnastique de l'esprit.",
        auteur : "Blaise Pascal"
    },

    {
        texte : "Aux échecs, comme dans la vie, le meilleur coup est toujours celui que l'on trouve soi-même.",
        auteur : "Savielly Tartakower"
    },

    {
        texte : "Les pions sont l'âme des échecs.",
        auteur : "François-André Philidor"
    },

    {
        texte : "Les échecs exigent une concentration absolue.",
        auteur : "Magnus Carlsen"
    },

    {
        texte : "Le roi est une pièce forte... uniquement en finale.",
        auteur : "José Raúl Capablanca"
    },

    {
        texte : "Le tacticien sait quoi faire lorsqu'il y a quelque chose à faire. Le stratège sait quoi faire lorsqu'il n'y a rien à faire.",
        auteur : "Savielly Tartakower"
    },

    {
        texte : "Les combinaisons naissent d'une position supérieure.",
        auteur : "Garry Kasparov"
    },

    {
        texte : "Chaque partie d'échecs est une aventure.",
        auteur : "David Bronstein"
    },

    {
        texte : "Même le plus long voyage commence par un premier coup.",
        auteur : "Proverbe adapté aux échecs"
    },

    {
        texte : "Aux échecs, les erreurs sont toujours là, attendant d'être découvertes.",
        auteur : "Garry Kasparov"
    }

];

/* =====================================================
   AFFICHAGE
===================================================== */

function afficherCitation(){

    const citation = $("quote");
    const auteur   = $("author");

    if(!citation || !auteur) return;

    const index = random(0, citations.length - 1);

    citation.textContent = `"${citations[index].texte}"`;

    auteur.textContent = "— " + citations[index].auteur;

}

log("✅ Module 1 chargé");
/* =====================================================
   MODULE 2
   MODE SOMBRE
===================================================== */

const THEME_KEY = "chessdev-theme";

/* =====================================================
   CHARGEMENT DU THÈME
===================================================== */

function chargerTheme(){

    const theme = localStorage.getItem(THEME_KEY);

    if(theme === "dark"){

        App.body.classList.add("dark-mode");

        if(App.themeButton){

            App.themeButton.textContent = "☀️ Mode clair";

        }

    }else{

        App.body.classList.remove("dark-mode");

        if(App.themeButton){

            App.themeButton.textContent = "🌙 Mode sombre";

        }

    }

}

/* =====================================================
   CHANGEMENT DE THÈME
===================================================== */

function changerTheme(){

    App.body.classList.toggle("dark-mode");

    const sombre = App.body.classList.contains("dark-mode");

    localStorage.setItem(

        THEME_KEY,

        sombre ? "dark" : "light"

    );

    if(App.themeButton){

        App.themeButton.textContent =

            sombre
                ? "☀️ Mode clair"
                : "🌙 Mode sombre";

    }

}

/* =====================================================
   INITIALISATION
===================================================== */

function initialiserTheme(){

    chargerTheme();

    if(App.themeButton){

        App.themeButton.addEventListener(

            "click",

            changerTheme

        );

    }

}

log("✅ Module 2 chargé");
/* =====================================================
   MODULE 3
   BARRE DE PROGRESSION
===================================================== */

/* =====================================================
   CALCUL DE LA PROGRESSION
===================================================== */

function mettreAJourProgression(){

    if(!App.progressBar) return;

    const hauteurPage =

        document.documentElement.scrollHeight -
        window.innerHeight;

    if(hauteurPage <= 0){

        App.progressBar.style.width = "0%";

        return;

    }

    const progression =

        (window.scrollY / hauteurPage) * 100;

    App.progressBar.style.width =

        Math.min(progression,100) + "%";

}

/* =====================================================
   INITIALISATION
===================================================== */

function initialiserBarreProgression(){

    mettreAJourProgression();

    window.addEventListener(

        "scroll",

        throttle(

            mettreAJourProgression,

            15

        )

    );

    window.addEventListener(

        "resize",

        mettreAJourProgression

    );

}

log("✅ Module 3 chargé");
/* =====================================================
   MODULE 4
   RECHERCHE INSTANTANÉE
===================================================== */

/* =====================================================
   NORMALISATION DU TEXTE
===================================================== */

function normaliserTexte(texte){

    return texte
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"");

}

/* =====================================================
   RECHERCHE
===================================================== */

function rechercherContenu(){

    if(!App.searchInput) return;

    const recherche = normaliserTexte(

        App.searchInput.value.trim()

    );

    const sections = $$$(".search-item");

    sections.forEach(section=>{

        const contenu = normaliserTexte(

            section.textContent

        );

        if(

            recherche === "" ||

            contenu.includes(recherche)

        ){

            section.style.display="block";

        }

        else{

            section.style.display="none";

        }

    });

}

/* =====================================================
   INITIALISATION
===================================================== */

function initialiserRecherche(){

    if(!App.searchInput) return;

    App.searchInput.addEventListener(

        "input",

        debounce(

            rechercherContenu,

            200

        )

    );

}

log("✅ Module 4 chargé");
/* =====================================================
   MODULE 5
   ANIMATIONS D'APPARITION
===================================================== */

/* =====================================================
   OBSERVER
===================================================== */

const observerAnimations = new IntersectionObserver(

    (entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("visible");

            }

        });

    },

    {

        threshold:0.15,

        rootMargin:"0px 0px -50px 0px"

    }

);

/* =====================================================
   INITIALISATION
===================================================== */

function initialiserAnimations(){

    const elements = document.querySelectorAll(

        ".fade-section, .fade-up"

    );

    elements.forEach(element=>{

        observerAnimations.observe(element);

    });

}

log("✅ Module 5 chargé");
/* =====================================================
   MODULE 6
   COMPTEURS ANIMÉS
===================================================== */

/* =====================================================
   ANIMATION D'UN COMPTEUR
===================================================== */

function animerCompteur(compteur){

    const objectif = Number(

        compteur.dataset.counter

    );

    if(!objectif) return;

    let valeur = 0;

    const duree = 1800;

    const pas = Math.max(

        1,

        Math.ceil(

            objectif / (duree / 16)

        )

    );

    function animation(){

        valeur += pas;

        if(valeur >= objectif){

            compteur.textContent =

                formatNombre(objectif);

            return;

        }

        compteur.textContent =

            formatNombre(valeur);

        requestAnimationFrame(animation);

    }

    animation();

}

/* =====================================================
   OBSERVER
===================================================== */

const observerCompteurs = new IntersectionObserver(

    (entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                animerCompteur(entry.target);

                observerCompteurs.unobserve(

                    entry.target

                );

            }

        });

    },

    {

        threshold:0.4

    }

);

/* =====================================================
   INITIALISATION
===================================================== */

function initialiserCompteurs(){

    $$$(".counter").forEach(compteur=>{

        observerCompteurs.observe(compteur);

    });

}

log("✅ Module 6 chargé");
/* =====================================================
   MODULE 7
   STATISTIQUES DE LECTURE
===================================================== */

/* =====================================================
   CALCUL DES STATISTIQUES
===================================================== */

function calculerStatistiquesLecture(){

    const texte = document.body.innerText;

    const mots = texte
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    const temps = Math.max(

        1,

        Math.ceil(

            mots / CONFIG.lectureMotsMinute

        )

    );

    if(App.wordCount){

        App.wordCount.textContent =

            formatNombre(mots);

    }

    if(App.readingTime){

        App.readingTime.textContent =

            temps + " min";

    }

}

/* =====================================================
   PROGRESSION DE LECTURE
===================================================== */

function mettreAJourLecture(){

    if(!App.readingProgress) return;

    const hauteur =

        document.documentElement.scrollHeight -
        window.innerHeight;

    if(hauteur <= 0){

        App.readingProgress.textContent = "100%";

        return;

    }

    const progression = Math.min(

        100,

        Math.round(

            window.scrollY / hauteur * 100

        )

    );

    App.readingProgress.textContent =

        progression + "%";

}

/* =====================================================
   INITIALISATION
===================================================== */

function initialiserLecture(){

    calculerStatistiquesLecture();

    mettreAJourLecture();

    window.addEventListener(

        "scroll",

        throttle(

            mettreAJourLecture,

            20

        )

    );

    window.addEventListener(

        "resize",

        mettreAJourLecture

    );

}

log("✅ Module 7 chargé");
/* =====================================================
   MODULE 8
   TEMPS DE VISITE
===================================================== */

let debutVisite = Date.now();

/* =====================================================
   MISE À JOUR DU CHRONOMÈTRE
===================================================== */

function mettreAJourTempsVisite(){

    if(!App.visitTime) return;

    const secondes = Math.floor(

        (Date.now() - debutVisite) / 1000

    );

    const minutes = Math.floor(

        secondes / 60

    );

    const reste = secondes % 60;

    App.visitTime.textContent =

        String(minutes).padStart(2,"0") +

        ":" +

        String(reste).padStart(2,"0");

}

/* =====================================================
   INITIALISATION
===================================================== */

function initialiserTempsVisite(){

    mettreAJourTempsVisite();

    setInterval(

        mettreAJourTempsVisite,

        1000

    );

}

log("✅ Module 8 chargé");
/* =====================================================
   MODULE 9
   GESTION DES MODALES
===================================================== */

/* =====================================================
   OUVRIR UNE MODALE
===================================================== */

function ouvrirModal(id){

    const modal = $(id);

    if(!modal) return;

    modal.style.display = "flex";

    document.body.style.overflow = "hidden";

}

/* =====================================================
   FERMER UNE MODALE
===================================================== */

function fermerModal(id){

    const modal = $(id);

    if(!modal) return;

    modal.style.display = "none";

    document.body.style.overflow = "";

}

/* =====================================================
   FERMETURE AU CLIC EXTÉRIEUR
===================================================== */

function fermerSiExterieur(event){

    if(event.target.classList.contains("modal")){

        event.target.style.display = "none";

        document.body.style.overflow = "";

    }

}

/* =====================================================
   INITIALISATION
===================================================== */

function initialiserModales(){

    $$$(".modal").forEach(modal=>{

        modal.addEventListener(

            "click",

            fermerSiExterieur

        );

    });

    document.addEventListener(

        "keydown",

        event=>{

            if(event.key!=="Escape") return;

            $$$(".modal").forEach(modal=>{

                modal.style.display="none";

            });

            document.body.style.overflow="";

        }

    );

}

log("✅ Module 9 chargé");
/* =====================================================
   MODULE 10
   INITIALISATION GÉNÉRALE
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    log("🚀 Initialisation de Chess.dev Studio V6");

    /* =========================
       Citation du jour
    ========================= */

    afficherCitation();

    /* =========================
       Mode sombre
    ========================= */

    initialiserTheme();

    /* =========================
       Barre de progression
    ========================= */

    initialiserBarreProgression();

    /* =========================
       Recherche
    ========================= */

    initialiserRecherche();

    /* =========================
       Animations
    ========================= */

    initialiserAnimations();

    /* =========================
       Compteurs
    ========================= */

    initialiserCompteurs();

    /* =========================
       Statistiques de lecture
    ========================= */

    initialiserLecture();

    /* =========================
       Temps de visite
    ========================= */

    initialiserTempsVisite();

    /* =========================
       Modales
    ========================= */

    initialiserModales();

    log("✅ Chess.dev Studio prêt.");

});