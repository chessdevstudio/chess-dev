/* =====================================================
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
        texte_en : "Chess is gymnastics for the mind.",
        auteur : "Blaise Pascal"
    },

    {
        texte : "Aux échecs, comme dans la vie, le meilleur coup est toujours celui que l'on trouve soi-même.",
        texte_en : "In chess, as in life, the best move is always the one you find yourself.",
        auteur : "Savielly Tartakower"
    },

    {
        texte : "Les pions sont l'âme des échecs.",
        texte_en : "Pawns are the soul of chess.",
        auteur : "François-André Philidor"
    },

    {
        texte : "Les échecs exigent une concentration absolue.",
        texte_en : "Chess demands total concentration.",
        auteur : "Magnus Carlsen"
    },

    {
        texte : "Le roi est une pièce forte... uniquement en finale.",
        texte_en : "The king is a strong piece... only in the endgame.",
        auteur : "José Raúl Capablanca"
    },

    {
        texte : "Le tacticien sait quoi faire lorsqu'il y a quelque chose à faire. Le stratège sait quoi faire lorsqu'il n'y a rien à faire.",
        texte_en : "The tactician knows what to do when there is something to do. The strategist knows what to do when there is nothing to do.",
        auteur : "Savielly Tartakower"
    },

    {
        texte : "Les combinaisons naissent d'une position supérieure.",
        texte_en : "Combinations are born from a superior position.",
        auteur : "Garry Kasparov"
    },

    {
        texte : "Chaque partie d'échecs est une aventure.",
        texte_en : "Every game of chess is an adventure.",
        auteur : "David Bronstein"
    },

    {
        texte : "Même le plus long voyage commence par un premier coup.",
        texte_en : "Even the longest journey begins with a first move.",
        auteur : "Proverbe adapté aux échecs"
    },

    {
        texte : "Aux échecs, les erreurs sont toujours là, attendant d'être découvertes.",
        texte_en : "In chess, mistakes are always there, waiting to be discovered.",
        auteur : "Garry Kasparov"
    }

];

/* =====================================================
   AFFICHAGE
===================================================== */

let indexCitationActuelle = null;

function afficherCitation(){

    const citation = $("quote");
    const auteur   = $("author");

    if(!citation || !auteur) return;

    if(indexCitationActuelle === null){

        indexCitationActuelle = random(0, citations.length - 1);

    }

    const c = citations[indexCitationActuelle];

    const texte = (typeof langueActuelle !== "undefined" && langueActuelle === "en")
        ? c.texte_en
        : c.texte;

    citation.textContent = `"${texte}"`;

    auteur.textContent = "— " + c.auteur;

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
        question_en: "How many squares can a bishop move at once, along a clear diagonal?",
        reponses: ["1 case", "3 cases maximum", "Autant que la diagonale le permet", "2 cases"],
        reponses_en: ["1 square", "3 squares maximum", "As many as the diagonal allows", "2 squares"],
        correcte: 2
    },
    {
        question: "Quel est le seul coup permettant de déplacer deux pièces en même temps ?",
        question_en: "What is the only move that allows two pieces to move at the same time?",
        reponses: ["La promotion", "Le roque", "La prise en passant", "L'échec et mat"],
        reponses_en: ["Promotion", "Castling", "En passant", "Checkmate"],
        correcte: 1
    },
    {
        question: "Combien de points vaut approximativement une Dame, en valeur matérielle standard ?",
        question_en: "Roughly how many points is a Queen worth, in standard material value?",
        reponses: ["3 points", "5 points", "9 points", "12 points"],
        reponses_en: ["3 points", "5 points", "9 points", "12 points"],
        correcte: 2
    },
    {
        question: "Quelle pièce ne peut jamais reculer ?",
        question_en: "Which piece can never move backward?",
        reponses: ["Le Cavalier", "Le Pion", "La Tour", "Le Fou"],
        reponses_en: ["The Knight", "The Pawn", "The Rook", "The Bishop"],
        correcte: 1
    },
    {
        question: "Quelle ouverture commence par 1.e4 e5 2.Cf3 Cc6 3.Fb5 ?",
        question_en: "Which opening starts with 1.e4 e5 2.Nf3 Nc6 3.Bb5?",
        reponses: ["L'Italienne", "La Sicilienne", "L'Espagnole (Ruy Lopez)", "La Française"],
        reponses_en: ["The Italian", "The Sicilian", "The Spanish (Ruy Lopez)", "The French"],
        correcte: 2
    }
];

let indexQuestionActuelle = 0;

let scoreQuiz = 0;

function afficherQuestionQuiz(){

    const conteneur = document.getElementById("quiz-conteneur");

    if(!conteneur) return;

    const estAnglais = (typeof langueActuelle !== "undefined") && langueActuelle === "en";

    if(indexQuestionActuelle >= questionsQuiz.length){

        const titreResultat = estAnglais
            ? `Result: ${scoreQuiz} / ${questionsQuiz.length}`
            : `Résultat : ${scoreQuiz} / ${questionsQuiz.length}`;

        const messageResultat = scoreQuiz === questionsQuiz.length
            ? (estAnglais ? "Perfect score, well done!" : "Score parfait, bravo !")
            : (estAnglais ? "Keep practicing to improve." : "Continuez à vous entraîner pour progresser.");

        const texteBouton = estAnglais ? "Restart the quiz" : "Recommencer le quiz";

        conteneur.innerHTML = `
            <div class="quiz-resultat">
                <h3>${titreResultat}</h3>
                <p>${messageResultat}</p>
                <button id="quiz-recommencer" class="quiz-bouton-recommencer">
                    ${texteBouton}
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

    const texteQuestion = estAnglais ? q.question_en : q.question;

    const reponsesAffichees = estAnglais ? q.reponses_en : q.reponses;

    const labelQuestion = estAnglais ? "Question" : "Question";

    conteneur.innerHTML = `
        <p class="quiz-progression">
            ${labelQuestion} ${indexQuestionActuelle + 1} / ${questionsQuiz.length}
        </p>
        <h3 class="quiz-question">${texteQuestion}</h3>
        <div class="quiz-reponses">
            ${reponsesAffichees.map((reponse,i)=>`
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
        nom_en:"Italian Opening",
        coups:[
            {de:"e2",a:"e4",san:"1. e4",san_en:"1. e4"},
            {de:"e7",a:"e5",san:"1... e5",san_en:"1... e5"},
            {de:"g1",a:"f3",san:"2. Cf3",san_en:"2. Nf3"},
            {de:"b8",a:"c6",san:"2... Cc6",san_en:"2... Nc6"},
            {de:"f1",a:"c4",san:"3. Fc4",san_en:"3. Bc4"}
        ]
    },

    "sicilienne":{
        nom:"Défense Sicilienne",
        nom_en:"Sicilian Defense",
        coups:[
            {de:"e2",a:"e4",san:"1. e4",san_en:"1. e4"},
            {de:"c7",a:"c5",san:"1... c5",san_en:"1... c5"}
        ]
    },

    "francaise":{
        nom:"Défense Française",
        nom_en:"French Defense",
        coups:[
            {de:"e2",a:"e4",san:"1. e4",san_en:"1. e4"},
            {de:"e7",a:"e6",san:"1... e6",san_en:"1... e6"}
        ]
    },

    "caro-kann":{
        nom:"Défense Caro-Kann",
        nom_en:"Caro-Kann Defense",
        coups:[
            {de:"e2",a:"e4",san:"1. e4",san_en:"1. e4"},
            {de:"c7",a:"c6",san:"1... c6",san_en:"1... c6"}
        ]
    },

    "anglaise":{
        nom:"Ouverture Anglaise",
        nom_en:"English Opening",
        coups:[
            {de:"c2",a:"c4",san:"1. c4",san_en:"1. c4"}
        ]
    },

    "espagnole":{
        nom:"Ouverture Espagnole (Ruy López)",
        nom_en:"Spanish Opening (Ruy López)",
        coups:[
            {de:"e2",a:"e4",san:"1. e4",san_en:"1. e4"},
            {de:"e7",a:"e5",san:"1... e5",san_en:"1... e5"},
            {de:"g1",a:"f3",san:"2. Cf3",san_en:"2. Nf3"},
            {de:"b8",a:"c6",san:"2... Cc6",san_en:"2... Nc6"},
            {de:"f1",a:"b5",san:"3. Fb5",san_en:"3. Bb5"}
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

    const estAnglais = (typeof langueActuelle !== "undefined") && langueActuelle === "en";

    if(titre) titre.textContent = estAnglais
        ? OUVERTURES_ECHIQUIER[cle].nom_en
        : OUVERTURES_ECHIQUIER[cle].nom;

    if(compteur) compteur.textContent = EchiquierEtat.indexCoup + " / " + coups.length;

    if(notation){

        const texteVide = estAnglais ? "Starting position" : "Position de départ";

        notation.textContent = coups
            .slice(0, EchiquierEtat.indexCoup)
            .map(c=> estAnglais ? c.san_en : c.san)
            .join("  ") || texteVide;

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
   MODULE 9 septies
   INTERNATIONALISATION (FR/EN)
===================================================== */

let langueActuelle = localStorage.getItem("langue") || "fr";

const traductionsEN = {
    "nav-histoire": "History",
    "nav-regles": "Rules",
    "nav-ouvertures": "Openings",
    "nav-champions": "Champions",
    "nav-ressources": "Resources",
    "search-placeholder": "🔍 Search the site...",
    "panel-temps": "📖 Reading time",
    "panel-progression": "📊 Progress",
    "panel-mots": "📝 Words",
    "panel-temps-passe": "⏱ Time on page",
    "hero-desc": "Discover the world of chess through its history, its champions, its openings, its strategies, its records and new technologies.",
    "stats-title": "📊 Chess in numbers",
    "stats-intro": "Behind a simple chessboard lies one of the most widely played games in the world, with an ever-growing international community.",
    "stats-joueurs": "Million players",
    "stats-gm": "Grandmasters",
    "stats-federations": "Federations affiliated with FIDE",
    "stats-positions": "Possible theoretical positions",
    "sommaire-title": "📚 Table of contents",
    "som-histoire": "History",
    "som-origines": "Origins",
    "som-regles": "Rules",
    "som-ouvertures": "Openings",
    "som-champions": "Champions",
    "som-bienfaits": "Benefits",
    "som-ia": "Artificial intelligence",
    "som-biblio": "Bibliography",
    "welcome-title": "♟️ Welcome to the world of chess",
    "welcome-p1": "Chess is one of the oldest strategy games still played today. For over fifteen centuries, it has fascinated beginners and world champions alike thanks to its tactical and strategic depth.",
    "welcome-p2": "A game pits two players against each other, each with <strong>16 pieces</strong> on a board of <strong>64 squares</strong>. The goal is to place the <strong>opponent's king in checkmate</strong>, meaning a position from which no legal defense is possible.",
    "welcome-p3": "Far more than a simple game, chess develops reasoning, memory, analysis, creativity and decision-making. It is now taught in many schools, present in the biggest international competitions, and accessible to everyone through online platforms.",
    "hist-title": "📜 The great history of chess",
    "hist-intro": "From ancient India to modern world championships, chess has crossed civilizations, followed cultural shifts and inspired generations of players. This timeline traces the main stages of its history.",
    "hist-t1-date": "6th century",
    "hist-t1-titre": "🇮🇳 The Chaturanga",
    "hist-t1-texte": "Chaturanga appears in India, considered the direct ancestor of modern chess.",
    "hist-t2-date": "7th century",
    "hist-t2-titre": "🇮🇷 The Chatrang",
    "hist-t2-texte": "The game reaches Persia, where the rules gradually begin to evolve.",
    "hist-t3-date": "9th century",
    "hist-t3-titre": "☪️ The Shatranj",
    "hist-t3-texte": "Scholars of the Arab world develop chess theory and spread the game widely.",
    "hist-t4-date": "1475",
    "hist-t4-titre": "👑 Modern rules",
    "hist-t4-texte": "The Queen gains her current power, giving rise to modern chess.",
    "hist-t5-date": "1886",
    "hist-t5-titre": "🏆 First World Championship",
    "hist-t5-texte": "Wilhelm Steinitz becomes the first official World Champion.",
    "hist-t6-date": "1972",
    "hist-t6-titre": "🇺🇸 Fischer vs Spassky",
    "hist-t6-texte": "The “Match of the Century” goes beyond sport and becomes a symbol of the Cold War.",
    "hist-t7-date": "1997",
    "hist-t7-titre": "🤖 Deep Blue",
    "hist-t7-texte": "IBM's computer beats Garry Kasparov, marking a major milestone in the history of artificial intelligence.",
    "hist-t8-date": "2013",
    "hist-t8-titre": "♞ Magnus Carlsen",
    "hist-t8-texte": "At age 22, Magnus Carlsen becomes World Champion and dominates chess for over a decade.",
    "hist-t9-date": "2024",
    "hist-t9-titre": "🌟 Gukesh Dommaraju",
    "hist-t9-texte": "At just 18 years old, Gukesh becomes the youngest World Champion in chess history.",
    "orig-title": "🌍 The origins of chess",
    "orig-p1": "The history of chess begins in India around the 6th century with <strong>Chaturanga</strong>, a game inspired by the organization of the Indian army. Each type of piece represented a military unit: infantry, cavalry, elephants and chariots.",
    "orig-p2": "The game then spread to Persia, where it took the name <strong>Chatrang</strong>, before being adopted by the Arab world under the name <strong>Shatranj</strong>. During this period, the first strategic analyses appeared and the rules continued to evolve.",
    "orig-p3": "From the Middle Ages onward, chess gradually gained ground across Europe. The pieces changed names, movements became more dynamic and, toward the end of the 15th century, the Queen gained her current power, giving rise to the modern rules.",
    "orig-p4": "Today, chess is played on every continent. It brings together millions of players, prestigious international competitions and a huge online community.",
    "orig-sources": "General sources: Fédération Internationale des Échecs (<a href=\"https://www.fide.com\" target=\"_blank\" rel=\"noopener noreferrer\">FIDE</a>), <a href=\"https://www.britannica.com/topic/chess\" target=\"_blank\" rel=\"noopener noreferrer\">Encyclopædia Britannica — Chess</a>.",
    "regles-title": "♔ The rules of the game",
    "regles-intro": "A game of chess pits two players against each other, taking turns, with White always moving first. Each player has <strong>16 pieces</strong>, and the shared goal is to place the <strong>opponent's king in checkmate</strong>.",
    "regles-h3-pieces": "Pieces and their movements",
    "regles-th-piece": "Piece",
    "regles-th-valeur": "Value",
    "regles-th-deplacement": "Movement",
    "regles-roi-nom": "👑 King",
    "regles-roi-dep": "One square in any direction.",
    "regles-dame-nom": "👸 Queen",
    "regles-dame-dep": "Horizontally, vertically and diagonally.",
    "regles-tour-nom": "🏰 Rook",
    "regles-tour-dep": "Horizontally and vertically.",
    "regles-fou-nom": "⛪ Bishop",
    "regles-fou-dep": "Diagonally.",
    "regles-cavalier-nom": "🐴 Knight",
    "regles-cavalier-dep": "In an “L” shape, jumping over other pieces.",
    "regles-pion-nom": "♟️ Pawn",
    "regles-pion-dep": "Advances one square and captures diagonally.",
    "regles-h3-particulieres": "Special rules",
    "regles-roque": "<strong>Castling:</strong> a simultaneous move of the king and a rook to bring the king to safety.",
    "regles-passant": "<strong>En passant:</strong> an exceptional capture between two pawns in a specific situation.",
    "regles-promotion": "<strong>Promotion:</strong> when a pawn reaches the last rank, it can become a queen, rook, bishop or knight.",
    "regles-h3-fin": "End of a game",
    "regles-fin1": "✔️ Checkmate.",
    "regles-fin2": "✔️ Resignation by a player.",
    "regles-fin3": "✔️ Draw.",
    "regles-fin4": "✔️ Stalemate.",
    "regles-fin5": "✔️ Insufficient material to checkmate.",
    "regles-h3-competitions": "Official competitions",
    "regles-competitions": "Competitions are organized by <strong>FIDE</strong> (the International Chess Federation). The best players earn the prestigious title of <strong>International Grandmaster</strong> and are ranked using the <strong>Elo</strong> system, which measures their level.",
    "ouv-title": "♞ The main openings",
    "ouv-intro": "The opening covers the first moves of a game. It often shapes piece development, control of the center and the strategic plans that follow. Each system has its own philosophy, whether aggressive, positional or defensive.",
    "ouv-italienne-titre": "Italian Opening",
    "ouv-italienne-texte": "Rapid piece development and an attack on the f7 pawn. An ideal opening for learning fundamental principles.",
    "ouv-sicilienne-titre": "Sicilian Defense",
    "ouv-sicilienne-texte": "A dynamic reply to 1.e4 offering complex positions and strong counterattacking potential.",
    "ouv-francaise-titre": "French Defense",
    "ouv-francaise-texte": "A solid defense that favors pawn structure and positional maneuvering.",
    "ouv-caro-kann-titre": "Caro-Kann Defense",
    "ouv-caro-kann-texte": "Highly regarded for its solidity, it generally leads to balanced positions.",
    "ouv-anglaise-titre": "English Opening",
    "ouv-anglaise-texte": "A flexible opening starting with 1.c4, delaying the central clash to control it from a distance instead.",
    "ouv-espagnole-titre": "Spanish Opening",
    "ouv-espagnole-texte": "Also known as the Ruy López, it remains one of the most studied openings in history.",
    "ouv-echiquier-titre": "🎮 Interactive chessboard",
    "ouv-echiquier-desc": "Choose an opening and step through the moves to see how the position builds up on the board.",
    "tab-italienne": "Italian",
    "tab-sicilienne": "Sicilian",
    "tab-francaise": "French",
    "tab-caro-kann": "Caro-Kann",
    "tab-anglaise": "English",
    "tab-espagnole": "Spanish",
    "echiquier-precedent": "◀ Previous",
    "echiquier-suivant": "Next ▶",
    "echiquier-reset": "↺ Reset",
    "ouv-choisir-titre": "How to choose your opening?",
    "ouv-choisir-texte": "There is no universal best opening. The choice mainly depends on the style of play you're after. Aggressive players will generally prefer the Italian or the Sicilian, while those who favor solidity will lean toward the Caro-Kann, the French Defense or the English Opening.",
    "ouv-internal-links": "See also: discover how <a href=\"#champions\">Garry Kasparov</a> and <a href=\"#champions\">Magnus Carlsen</a> used these openings at the highest level, or explore the role of <a href=\"#ia\">artificial intelligence</a> in modern opening analysis.",
    "champ-title": "🏆 The greatest world champions",
    "champ-intro": "Since 1886, several generations of champions have shaped the history of chess. Their creativity, preparation and strategic innovations continue to inspire players around the world.",
    "champ-norvege": "🇳🇴 Norway",
    "champ-russie": "🇷🇺 Russia",
    "champ-etatsunis": "🇺🇸 United States",
    "champ-carlsen-p": "World Champion from 2013 to 2023 and holder of the all-time Elo record with 2882 points.",
    "champ-kasparov-p": "Considered one of the greatest players of all time thanks to his aggressive style and preparation.",
    "champ-fischer-p": "Winner of the legendary 1972 World Championship, he popularized chess in the Western world.",
    "champ-legendes-titre": "Other chess legends",
    "champ-l1": "<strong>Wilhelm Steinitz</strong> — first official World Champion.",
    "champ-l2": "<strong>Emanuel Lasker</strong> — champion for twenty-seven years.",
    "champ-l3": "<strong>José Raúl Capablanca</strong> — undisputed master of the endgame.",
    "champ-l4": "<strong>Alexander Alekhine</strong> — famous for his tactical imagination.",
    "champ-l5": "<strong>Mikhail Botvinnik</strong> — founder of the modern Soviet school.",
    "champ-l6": "<strong>Anatoly Karpov</strong> — virtuoso of positional play.",
    "champ-l7": "<strong>Viswanathan Anand</strong> — first Indian World Champion.",
    "champ-l8": "<strong>Vladimir Kramnik</strong> — defeated Kasparov in 2000.",
    "champ-l9": "<strong>Magnus Carlsen</strong> — dominant champion of the 21st century.",
    "champ-l10": "<strong>Gukesh Dommaraju</strong> — youngest World Champion in history.",
    "champ-conclusion": "Each generation brings new ideas, constantly enriching the theory and understanding of the game. The history of chess continues today with the rise of ever younger talents.",
    "bienf-title": "🧠 The benefits of chess",
    "bienf-intro": "Far more than a strategy game, chess is an excellent mental workout. Regular practice builds many skills useful in everyday life as well as in school or work.",
    "bienf-c1-titre": "Concentration",
    "bienf-c1-texte": "Every move requires sustained attention and precise analysis of the position.",
    "bienf-c2-titre": "Logic",
    "bienf-c2-texte": "Chess teaches problem-solving by weighing several solutions before making a decision.",
    "bienf-c3-titre": "Memory",
    "bienf-c3-texte": "Studying openings, endgames and tactical patterns strengthens long-term memory.",
    "bienf-c4-titre": "Decision-making",
    "bienf-c4-texte": "Every game builds the ability to choose quickly under time pressure.",
    "bienf-outil-titre": "An educational tool",
    "bienf-outil-texte": "Many schools now use chess as a teaching tool. It fosters patience, perseverance, self-confidence and respect for rules, while stimulating creativity and critical thinking.",
    "ia-title": "🤖 Chess and artificial intelligence",
    "ia-intro": "Chess has played a major role in the development of artificial intelligence. From the earliest computer programs to modern neural networks, it serves as a testing ground for new approaches to decision-making.",
    "ia-t1-date": "1997",
    "ia-t1-titre": "💻 Deep Blue",
    "ia-t1-texte": "IBM's supercomputer beats Garry Kasparov in an official match, demonstrating the power of computing.",
    "ia-t2-date": "2017",
    "ia-t2-titre": "♟️ AlphaZero",
    "ia-t2-texte": "By learning only the rules of the game, AlphaZero develops an original style capable of surpassing the best traditional engines.",
    "ia-t3-date": "Today",
    "ia-t3-titre": "🚀 Stockfish & modern AI",
    "ia-t3-texte": "Analysis engines now assist players, coaches and arbiters. They make it possible to study games with unmatched precision.",
    "ia-revolution-titre": "A revolution for players",
    "ia-p1": "Artificial intelligence has profoundly transformed how chess is learned. It can analyze a game, detect mistakes, suggest the best moves and explore variations that were previously impossible to calculate by hand.",
    "ia-p2": "Despite these advances, creativity, intuition and the enjoyment of playing remain at the heart of chess. Engines have become training partners rather than replacements for players.",
    "quiz-title": "🧩 Test your knowledge",
    "quiz-intro": "A short quiz to check your chess fundamentals.",
    "biblio-title": "📚 Going further",
    "biblio-intro": "Chess has an exceptional body of literature. From historical works to strategy manuals, these references let you dig deeper into every aspect of the game, whatever your level.",
    "biblio-livres-titre": "📖 Essential books",
    "biblio-plateformes-titre": "🌐 Reference platforms",
    "biblio-progresser-titre": "🎓 How to improve",
    "biblio-progresser-texte": "Progress is built above all on regular practice. Playing, analyzing your games, solving tactical exercises and studying endgames remain the most effective ways to steadily raise your level.",
    "concl-p1": "For more than fifteen centuries, chess has crossed civilizations without losing its power to fascinate. Its strategic richness, cultural dimension and universality make it far more than just a game.",
    "concl-p2": "From the first Chaturanga players to today's world champions, from historic clashes to artificial intelligence engines, chess has never stopped evolving while keeping its essence: learning, thinking and creating.",
    "concl-p3": "Whether you're a beginner, a club player or a competitor, every game is a new chance to improve. Every position is a puzzle, every mistake a lesson, every win a reward.",
    "concl-citation": "“Chess is the gymnasium of the mind.”",
    "concl-citation-note": "— Quote traditionally attributed to Blaise Pascal, though its exact origin is not confirmed by historical sources.",
    "footer-p": "© 2026 • Made with passion to share the history, strategy and culture of chess.",
    "footer-updated": "Last updated:"
};

function appliquerLangue(langue){

    langueActuelle = langue;

    document.documentElement.lang = langue;

    localStorage.setItem("langue", langue);

    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach(el=>{

        if(el.dataset.i18nFr === undefined){

            el.dataset.i18nFr = el.innerHTML;

        }

        const cle = el.dataset.i18n;

        if(langue === "en" && traductionsEN[cle] !== undefined){

            el.innerHTML = traductionsEN[cle];

        }
        else{

            el.innerHTML = el.dataset.i18nFr;

        }

    });

    const elementsPlaceholder = document.querySelectorAll(
        "[data-i18n-placeholder]"
    );

    elementsPlaceholder.forEach(el=>{

        if(el.dataset.i18nPlaceholderFr === undefined){

            el.dataset.i18nPlaceholderFr = el.getAttribute("placeholder");

        }

        const cle = el.dataset.i18nPlaceholder;

        el.setAttribute(
            "placeholder",
            langue === "en" && traductionsEN[cle] !== undefined
                ? traductionsEN[cle]
                : el.dataset.i18nPlaceholderFr
        );

    });

    const boutonLangue = document.getElementById("lang-toggle");

    if(boutonLangue){

        boutonLangue.textContent = langue === "fr" ? "🇬🇧 EN" : "🇫🇷 FR";

        boutonLangue.setAttribute(
            "aria-label",
            langue === "fr" ? "Switch to English" : "Passer en français"
        );

    }

    if(document.getElementById("quiz-conteneur")){

        afficherQuestionQuiz();

    }

    if(document.getElementById("echiquier-plateau")){

        mettreAJourEchiquier();

    }

    if($("quote")){

        afficherCitation();

    }

}

function initialiserI18n(){

    const boutonLangue = document.getElementById("lang-toggle");

    appliquerLangue(langueActuelle);

    if(boutonLangue){

        boutonLangue.addEventListener("click",()=>{

            appliquerLangue(langueActuelle === "fr" ? "en" : "fr");

        });

    }

}

log("✅ Module 9 septies chargé");
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
       Internationalisation
    ========================= */

    initialiserI18n();

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