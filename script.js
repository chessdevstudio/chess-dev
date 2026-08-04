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

    visitTime:$("visit-time"),

    navToggle:$("nav-toggle"),

    navMenu:$("nav-menu"),

    backToTop:$("back-to-top")

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
   MODULE 9 bis
   NAVIGATION FIXE (MENU MOBILE + SURLIGNAGE)
===================================================== */

/* =====================================================
   MENU MOBILE
===================================================== */

function initialiserMenuMobile(){

    if(!App.navToggle || !App.navMenu) return;

    App.navToggle.addEventListener("click",()=>{

        const ouvert = App.navMenu.classList.toggle("open");

        App.navToggle.setAttribute(
            "aria-expanded",
            ouvert ? "true" : "false"
        );

    });

    App.navMenu.querySelectorAll(".nav-link").forEach(lien=>{

        lien.addEventListener("click",()=>{

            App.navMenu.classList.remove("open");

            App.navToggle.setAttribute("aria-expanded","false");

        });

    });

}

/* =====================================================
   SURLIGNAGE DU LIEN ACTIF (SCROLLSPY)
===================================================== */

function initialiserScrollspy(){

    const liens = $$$(".nav-link");

    if(!liens.length) return;

    const sections = Array.from(liens)
        .map(lien => document.querySelector(lien.getAttribute("href")))
        .filter(Boolean);

    if(!sections.length) return;

    const observer = new IntersectionObserver(
        (entries)=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                liens.forEach(lien=>{

                    lien.classList.toggle(
                        "active",
                        lien.getAttribute("href") === "#" + entry.target.id
                    );

                });

            });

        },
        {
            rootMargin:"-45% 0px -50% 0px",
            threshold:0
        }
    );

    sections.forEach(section => observer.observe(section));

}

log("✅ Module 9 bis chargé");
/* =====================================================
   MODULE 9 ter
   BOUTON RETOUR EN HAUT
===================================================== */

function initialiserRetourHaut(){

    if(!App.backToTop) return;

    window.addEventListener(
        "scroll",
        throttle(()=>{

            App.backToTop.classList.toggle(
                "visible",
                window.scrollY > 500
            );

        },100)
    );

    App.backToTop.addEventListener("click",()=>{

        window.scrollTo({top:0,behavior:"smooth"});

    });

}

log("✅ Module 9 ter chargé");
/* =====================================================
   MODULE 9 quinquies
   QUIZ TACTIQUE
===================================================== */

const questionsQuiz = [
    {
        question: "Combien de cases peut parcourir un fou en une seule fois, sur une diagonale libre ?",
        reponses: ["1 case", "3 cases maximum", "Autant que la diagonale le permet", "2 cases"],
        correcte: 2
    },
    {
        question: "Quel est le seul coup permettant de déplacer deux pièces en même temps ?",
        reponses: ["La promotion", "Le roque", "La prise en passant", "L'échec et mat"],
        correcte: 1
    },
    {
        question: "Combien de points vaut approximativement une Dame, en valeur matérielle standard ?",
        reponses: ["3 points", "5 points", "9 points", "12 points"],
        correcte: 2
    },
    {
        question: "Quelle pièce ne peut jamais reculer ?",
        reponses: ["Le Cavalier", "Le Pion", "La Tour", "Le Fou"],
        correcte: 1
    },
    {
        question: "Quelle ouverture commence par 1.e4 e5 2.Cf3 Cc6 3.Fb5 ?",
        reponses: ["L'Italienne", "La Sicilienne", "L'Espagnole (Ruy Lopez)", "La Française"],
        correcte: 2
    }
];

let indexQuestionActuelle = 0;

let scoreQuiz = 0;

function afficherQuestionQuiz(){

    const conteneur = document.getElementById("quiz-conteneur");

    if(!conteneur) return;

    if(indexQuestionActuelle >= questionsQuiz.length){

        conteneur.innerHTML = `
            <div class="quiz-resultat">
                <h3>Résultat : ${scoreQuiz} / ${questionsQuiz.length}</h3>
                <p>${
                    scoreQuiz === questionsQuiz.length
                        ? "Score parfait, bravo !"
                        : "Continuez à vous entraîner pour progresser."
                }</p>
                <button id="quiz-recommencer" class="quiz-bouton-recommencer">
                    Recommencer le quiz
                </button>
            </div>
        `;

        const boutonRecommencer = document.getElementById(
            "quiz-recommencer"
        );

        boutonRecommencer.addEventListener("click",()=>{

            indexQuestionActuelle = 0;

            scoreQuiz = 0;

            afficherQuestionQuiz();

        });

        return;

    }

    const q = questionsQuiz[indexQuestionActuelle];

    conteneur.innerHTML = `
        <p class="quiz-progression">
            Question ${indexQuestionActuelle + 1} / ${questionsQuiz.length}
        </p>
        <h3 class="quiz-question">${q.question}</h3>
        <div class="quiz-reponses">
            ${q.reponses.map((reponse,i)=>`
                <button class="quiz-reponse-btn" data-index="${i}">
                    ${reponse}
                </button>
            `).join("")}
        </div>
    `;

    const boutonsReponses = conteneur.querySelectorAll(
        ".quiz-reponse-btn"
    );

    boutonsReponses.forEach(bouton=>{

        bouton.addEventListener("click",()=>{

            const choisi = Number(bouton.dataset.index);

            boutonsReponses.forEach(b=>{

                b.disabled = true;

                if(Number(b.dataset.index) === q.correcte){

                    b.classList.add("quiz-correcte");

                }

            });

            if(choisi === q.correcte){

                scoreQuiz++;

            }
            else{

                bouton.classList.add("quiz-incorrecte");

            }

            setTimeout(()=>{

                indexQuestionActuelle++;

                afficherQuestionQuiz();

            },1200);

        });

    });

}

function initialiserQuiz(){

    const conteneur = document.getElementById("quiz-conteneur");

    if(!conteneur) return;

    afficherQuestionQuiz();

}

log("✅ Module 9 quinquies chargé");
/* =====================================================
   MODULE 9 sexies
   ÉCHIQUIER INTERACTIF
===================================================== */

const PIECES_UNICODE = {
    wP:"♙", wN:"♘", wB:"♗", wR:"♖", wQ:"♕", wK:"♔",
    bP:"♟", bN:"♞", bB:"♝", bR:"♜", bQ:"♛", bK:"♚"
};

const positionInitialeEchecs = {
    a1:"wR", b1:"wN", c1:"wB", d1:"wQ", e1:"wK", f1:"wB", g1:"wN", h1:"wR",
    a2:"wP", b2:"wP", c2:"wP", d2:"wP", e2:"wP", f2:"wP", g2:"wP", h2:"wP",
    a7:"bP", b7:"bP", c7:"bP", d7:"bP", e7:"bP", f7:"bP", g7:"bP", h7:"bP",
    a8:"bR", b8:"bN", c8:"bB", d8:"bQ", e8:"bK", f8:"bB", g8:"bN", h8:"bR"
};

const OUVERTURES_ECHIQUIER = {

    "italienne":{
        nom:"Ouverture Italienne",
        coups:[
            {de:"e2",a:"e4",san:"1. e4"},
            {de:"e7",a:"e5",san:"1... e5"},
            {de:"g1",a:"f3",san:"2. Cf3"},
            {de:"b8",a:"c6",san:"2... Cc6"},
            {de:"f1",a:"c4",san:"3. Fc4"}
        ]
    },

    "sicilienne":{
        nom:"Défense Sicilienne",
        coups:[
            {de:"e2",a:"e4",san:"1. e4"},
            {de:"c7",a:"c5",san:"1... c5"}
        ]
    },

    "francaise":{
        nom:"Défense Française",
        coups:[
            {de:"e2",a:"e4",san:"1. e4"},
            {de:"e7",a:"e6",san:"1... e6"}
        ]
    },

    "caro-kann":{
        nom:"Défense Caro-Kann",
        coups:[
            {de:"e2",a:"e4",san:"1. e4"},
            {de:"c7",a:"c6",san:"1... c6"}
        ]
    },

    "anglaise":{
        nom:"Ouverture Anglaise",
        coups:[
            {de:"c2",a:"c4",san:"1. c4"}
        ]
    },

    "espagnole":{
        nom:"Ouverture Espagnole (Ruy López)",
        coups:[
            {de:"e2",a:"e4",san:"1. e4"},
            {de:"e7",a:"e5",san:"1... e5"},
            {de:"g1",a:"f3",san:"2. Cf3"},
            {de:"b8",a:"c6",san:"2... Cc6"},
            {de:"f1",a:"b5",san:"3. Fb5"}
        ]
    }

};

const EchiquierEtat = {
    ouvertureActuelle:"italienne",
    indexCoup:0
};

function calculerPositionEchiquier(cle, jusquA){

    const position = Object.assign({}, positionInitialeEchecs);

    const coups = OUVERTURES_ECHIQUIER[cle].coups;

    for(let i=0;i<jusquA;i++){

        const coup = coups[i];

        position[coup.a] = position[coup.de];

        delete position[coup.de];

    }

    return position;

}

function construirePlateauDOM(){

    const plateau = document.getElementById("echiquier-plateau");

    if(!plateau) return;

    plateau.innerHTML = "";

    const fichiers = ["a","b","c","d","e","f","g","h"];

    for(let rangee=8; rangee>=1; rangee--){

        for(let f=0; f<8; f++){

            const caseDiv = document.createElement("div");

            const carre = fichiers[f] + rangee;

            const claire = (f + rangee) % 2 === 0;

            caseDiv.className = "echiquier-case " + (claire ? "claire" : "sombre");

            caseDiv.dataset.square = carre;

            plateau.appendChild(caseDiv);

        }

    }

}

function afficherPositionEchiquier(position, dernierCoup){

    const cases = document.querySelectorAll("#echiquier-plateau .echiquier-case");

    cases.forEach(caseDiv=>{

        const carre = caseDiv.dataset.square;

        caseDiv.classList.remove("derniere-de","derniere-a");

        const piece = position[carre];

        caseDiv.innerHTML = piece
            ? `<span class="${piece[0]==="w" ? "piece-blanche" : "piece-noire"}">${PIECES_UNICODE[piece]}</span>`
            : "";

        if(dernierCoup){

            if(carre === dernierCoup.de) caseDiv.classList.add("derniere-de");

            if(carre === dernierCoup.a) caseDiv.classList.add("derniere-a");

        }

    });

}

function mettreAJourEchiquier(){

    const cle = EchiquierEtat.ouvertureActuelle;

    const coups = OUVERTURES_ECHIQUIER[cle].coups;

    const position = calculerPositionEchiquier(cle, EchiquierEtat.indexCoup);

    const dernierCoup = EchiquierEtat.indexCoup > 0
        ? coups[EchiquierEtat.indexCoup - 1]
        : null;

    afficherPositionEchiquier(position, dernierCoup);

    const titre = document.getElementById("echiquier-titre");

    const compteur = document.getElementById("echiquier-compteur");

    const notation = document.getElementById("echiquier-notation");

    const boutonPrecedent = document.getElementById("echiquier-precedent");

    const boutonSuivant = document.getElementById("echiquier-suivant");

    if(titre) titre.textContent = OUVERTURES_ECHIQUIER[cle].nom;

    if(compteur) compteur.textContent = EchiquierEtat.indexCoup + " / " + coups.length;

    if(notation){

        notation.textContent = coups
            .slice(0, EchiquierEtat.indexCoup)
            .map(c=>c.san)
            .join("  ") || "Position de départ";

    }

    if(boutonPrecedent) boutonPrecedent.disabled = EchiquierEtat.indexCoup === 0;

    if(boutonSuivant) boutonSuivant.disabled = EchiquierEtat.indexCoup === coups.length;

}

function initialiserEchiquier(){

    const plateau = document.getElementById("echiquier-plateau");

    if(!plateau) return;

    construirePlateauDOM();

    mettreAJourEchiquier();

    const boutonSuivant = document.getElementById("echiquier-suivant");

    const boutonPrecedent = document.getElementById("echiquier-precedent");

    const boutonReset = document.getElementById("echiquier-reset");

    const onglets = document.querySelectorAll(".echiquier-onglet");

    if(boutonSuivant){

        boutonSuivant.addEventListener("click",()=>{

            const coups = OUVERTURES_ECHIQUIER[EchiquierEtat.ouvertureActuelle].coups;

            if(EchiquierEtat.indexCoup < coups.length){

                EchiquierEtat.indexCoup++;

                mettreAJourEchiquier();

            }

        });

    }

    if(boutonPrecedent){

        boutonPrecedent.addEventListener("click",()=>{

            if(EchiquierEtat.indexCoup > 0){

                EchiquierEtat.indexCoup--;

                mettreAJourEchiquier();

            }

        });

    }

    if(boutonReset){

        boutonReset.addEventListener("click",()=>{

            EchiquierEtat.indexCoup = 0;

            mettreAJourEchiquier();

        });

    }

    onglets.forEach(onglet=>{

        onglet.addEventListener("click",()=>{

            onglets.forEach(o=>o.classList.remove("active"));

            onglet.classList.add("active");

            EchiquierEtat.ouvertureActuelle = onglet.dataset.ouverture;

            EchiquierEtat.indexCoup = 0;

            mettreAJourEchiquier();

        });

    });

}

log("✅ Module 9 sexies chargé");
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
       Quiz tactique
    ========================= */

    initialiserQuiz();

    /* =========================
       Échiquier interactif
    ========================= */

    initialiserEchiquier();

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

    /* =========================
       Menu mobile & scrollspy
    ========================= */

    initialiserMenuMobile();

    initialiserScrollspy();

    /* =========================
       Retour en haut
    ========================= */

    initialiserRetourHaut();

    log("✅ Chess.dev Studio prêt.");

});