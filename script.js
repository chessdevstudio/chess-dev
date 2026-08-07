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
    "footer-updated": "Last updated:",

    "nav-analyse": "Analysis",
    "analyse-title": "🔬 Game analysis",
    "analyse-intro": "Load a position (FEN) or a full game (PGN) to display it on the board and get an evaluation from the Stockfish engine, running directly in your browser.",
    "analyse-fen-label": "FEN position",
    "analyse-fen-placeholder": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    "analyse-fen-bouton": "Load",
    "analyse-pgn-label": "PGN game",
    "analyse-pgn-placeholder": "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 ...",
    "analyse-pgn-bouton": "Load game",
    "analyse-position-depart": "Starting position",
    "analyse-stockfish-bouton": "🧠 Analyze with Stockfish",

    "analyse-astuce": "💡 You can also play directly on the board: click a piece, then a destination square.",
    "promotion-label": "Promote to:",
    "nav-puzzles": "Puzzles",
    "puzzle-title": "♟️ Tactical puzzles",
    "puzzle-intro": "Choose a category, click a white piece, then play the requested move to solve the puzzle.",
    "puzzle-cat-mat1": "Mate in 1",
    "puzzle-cat-mat2": "Mate in 2",
    "puzzle-cat-tactique": "Tactic (Stockfish)",

    "tab-accueil": "Home",
    "tab-ouvertures": "Openings",
    "tab-analyse": "Analysis",
    "tab-puzzles": "Puzzles",
    "tab-menu": "Menu",

    "analyse-retourner": "⇅ Flip",
    "analyse-export-fen": "📋 Copy FEN",
    "analyse-export-pgn": "⬇ Export PGN",

    "nav-horloge": "Clock",
    "horloge-title": "⏱️ Chess clock",
    "horloge-intro": "To play face-to-face on a real board: set the starting time, then tap your own clock after each move to start your opponent's time.",
    "horloge-minutes-label": "Minutes per player",
    "horloge-increment-label": "Increment (seconds)",
    "horloge-appliquer": "Apply",
    "horloge-joueur1": "Player 1",
    "horloge-joueur2": "Player 2",
    "horloge-demarrer": "▶ Start",
    "horloge-pause": "⏸ Pause",
    "horloge-reset": "↺ Reset",
    "puzzle-reset": "↺ Restart",
    "puzzle-suivant": "Next ▶"
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

    if(document.getElementById("analyse-plateau") && AnalyseEtat.positions.length){

        mettreAJourAnalyse();

    }

    const themeEl = document.getElementById("puzzle-theme");

    if(themeEl && typeof ENSEMBLES_PUZZLES !== "undefined" && typeof puzzleIndex !== "undefined"){

        const ensembleActuel = ENSEMBLES_PUZZLES[puzzleCategorie];

        themeEl.textContent = langue === "en"
            ? ensembleActuel[puzzleIndex].theme_en
            : ensembleActuel[puzzleIndex].theme;

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
   MODULE 9 octies
   MOTEUR D'ÉCHECS (règles complètes)
===================================================== */

/* =====================================================
   MOTEUR D'ÉCHECS (génération de coups légaux)
   Représentation : objet {a1:"wR", ...}, cases vides absentes
===================================================== */

function frVersCase(f, r){
    if(f < 0 || f > 7 || r < 0 || r > 7) return null;
    return "abcdefgh"[f] + (r + 1);
}

function caseVersFR(sq){
    return [sq.charCodeAt(0) - 97, Number(sq[1]) - 1];
}

function copierEtat(etat){
    return {
        board: Object.assign({}, etat.board),
        turn: etat.turn,
        castling: Object.assign({}, etat.castling),
        epSquare: etat.epSquare,
        halfmove: etat.halfmove,
        fullmove: etat.fullmove
    };
}

const DIRECTIONS_FOU = [[1,1],[1,-1],[-1,1],[-1,-1]];
const DIRECTIONS_TOUR = [[1,0],[-1,0],[0,1],[0,-1]];
const DIRECTIONS_DAME = DIRECTIONS_FOU.concat(DIRECTIONS_TOUR);
const SAUTS_CAVALIER = [[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1],[-1,2]];

function estAttaquee(etat, sq, parCouleur){

    const [f, r] = caseVersFR(sq);

    // Pions
    const dr = parCouleur === "w" ? -1 : 1;
    for(const df of [-1, 1]){
        const origine = frVersCase(f + df, r + dr);
        if(origine && etat.board[origine] === parCouleur + "P") return true;
    }

    // Cavaliers
    for(const [df, dr2] of SAUTS_CAVALIER){
        const origine = frVersCase(f + df, r + dr2);
        if(origine && etat.board[origine] === parCouleur + "N") return true;
    }

    // Roi
    for(const [df, dr2] of DIRECTIONS_DAME){
        const origine = frVersCase(f + df, r + dr2);
        if(origine && etat.board[origine] === parCouleur + "K") return true;
    }

    // Glissantes : Fou/Dame (diagonales), Tour/Dame (lignes)
    for(const [df, dr2] of DIRECTIONS_FOU){
        let cf = f + df, cr = r + dr2;
        while(true){
            const c = frVersCase(cf, cr);
            if(!c) break;
            const piece = etat.board[c];
            if(piece){
                if(piece[0] === parCouleur && (piece[1] === "B" || piece[1] === "Q")) return true;
                break;
            }
            cf += df; cr += dr2;
        }
    }

    for(const [df, dr2] of DIRECTIONS_TOUR){
        let cf = f + df, cr = r + dr2;
        while(true){
            const c = frVersCase(cf, cr);
            if(!c) break;
            const piece = etat.board[c];
            if(piece){
                if(piece[0] === parCouleur && (piece[1] === "R" || piece[1] === "Q")) return true;
                break;
            }
            cf += df; cr += dr2;
        }
    }

    return false;

}

function trouverRoi(etat, couleur){
    for(const sq in etat.board){
        if(etat.board[sq] === couleur + "K") return sq;
    }
    return null;
}

function estEnEchec(etat, couleur){
    const roi = trouverRoi(etat, couleur);
    if(!roi) return false;
    return estAttaquee(etat, roi, couleur === "w" ? "b" : "w");
}

function genererPseudoCoups(etat){

    const coups = [];
    const couleur = etat.turn;
    const adverse = couleur === "w" ? "b" : "w";

    for(const sq in etat.board){

        const piece = etat.board[sq];
        if(piece[0] !== couleur) continue;

        const type = piece[1];
        const [f, r] = caseVersFR(sq);

        if(type === "P"){

            const dr = couleur === "w" ? 1 : -1;
            const rangDepart = couleur === "w" ? 1 : 6;
            const rangPromotion = couleur === "w" ? 7 : 0;

            const avance1 = frVersCase(f, r + dr);
            if(avance1 && !etat.board[avance1]){

                if(r + dr === rangPromotion){
                    for(const promo of ["Q","R","B","N"]){
                        coups.push({from:sq, to:avance1, piece, promotion:promo});
                    }
                }
                else{
                    coups.push({from:sq, to:avance1, piece});

                    if(r === rangDepart){
                        const avance2 = frVersCase(f, r + 2*dr);
                        if(avance2 && !etat.board[avance2]){
                            coups.push({from:sq, to:avance2, piece, doublePas:true});
                        }
                    }
                }

            }

            for(const df of [-1, 1]){
                const cible = frVersCase(f + df, r + dr);
                if(!cible) continue;
                const cibleEstEp = cible === etat.epSquare;
                if(etat.board[cible] && etat.board[cible][0] === adverse){
                    if(r + dr === rangPromotion){
                        for(const promo of ["Q","R","B","N"]){
                            coups.push({from:sq, to:cible, piece, capture:true, promotion:promo});
                        }
                    }
                    else{
                        coups.push({from:sq, to:cible, piece, capture:true});
                    }
                }
                else if(cibleEstEp){
                    coups.push({from:sq, to:cible, piece, capture:true, enPassant:true});
                }
            }

        }
        else if(type === "N"){

            for(const [df, dr2] of SAUTS_CAVALIER){
                const cible = frVersCase(f + df, r + dr2);
                if(!cible) continue;
                const occ = etat.board[cible];
                if(!occ || occ[0] === adverse){
                    coups.push({from:sq, to:cible, piece, capture: !!occ});
                }
            }

        }
        else if(type === "K"){

            for(const [df, dr2] of DIRECTIONS_DAME){
                const cible = frVersCase(f + df, r + dr2);
                if(!cible) continue;
                const occ = etat.board[cible];
                if(!occ || occ[0] === adverse){
                    coups.push({from:sq, to:cible, piece, capture: !!occ});
                }
            }

            // Roque
            const rangRoque = couleur === "w" ? 0 : 7;
            if(r === rangRoque && f === 4 && !estEnEchec(etat, couleur)){

                if(etat.castling[couleur + "K"]){
                    const b1 = frVersCase(5, rangRoque), b2 = frVersCase(6, rangRoque);
                    if(!etat.board[b1] && !etat.board[b2] &&
                       !estAttaquee(etat, b1, adverse) && !estAttaquee(etat, b2, adverse)){
                        coups.push({from:sq, to:b2, piece, roque:"K"});
                    }
                }

                if(etat.castling[couleur + "Q"]){
                    const b1 = frVersCase(3, rangRoque), b2 = frVersCase(2, rangRoque), b3 = frVersCase(1, rangRoque);
                    if(!etat.board[b1] && !etat.board[b2] && !etat.board[b3] &&
                       !estAttaquee(etat, b1, adverse) && !estAttaquee(etat, b2, adverse)){
                        coups.push({from:sq, to:b2, piece, roque:"Q"});
                    }
                }

            }

        }
        else{

            const directions = type === "B" ? DIRECTIONS_FOU
                : type === "R" ? DIRECTIONS_TOUR
                : DIRECTIONS_DAME;

            for(const [df, dr2] of directions){
                let cf = f + df, cr = r + dr2;
                while(true){
                    const cible = frVersCase(cf, cr);
                    if(!cible) break;
                    const occ = etat.board[cible];
                    if(!occ){
                        coups.push({from:sq, to:cible, piece});
                    }
                    else{
                        if(occ[0] === adverse){
                            coups.push({from:sq, to:cible, piece, capture:true});
                        }
                        break;
                    }
                    cf += df; cr += dr2;
                }
            }

        }

    }

    return coups;

}

function appliquerCoup(etat, coup){

    const nouvel = copierEtat(etat);
    const couleur = coup.piece[0];

    delete nouvel.board[coup.from];

    if(coup.enPassant){
        const rangCapture = couleur === "w" ? Number(coup.to[1]) - 1 : Number(coup.to[1]) + 1;
        delete nouvel.board[coup.to[0] + rangCapture];
    }

    nouvel.board[coup.to] = coup.promotion ? (couleur + coup.promotion) : coup.piece;

    if(coup.roque){
        const rang = coup.to[1];
        if(coup.roque === "K"){
            delete nouvel.board["h" + rang];
            nouvel.board["f" + rang] = couleur + "R";
        }
        else{
            delete nouvel.board["a" + rang];
            nouvel.board["d" + rang] = couleur + "R";
        }
    }

    // Mise à jour des droits de roque
    if(coup.piece[1] === "K"){
        nouvel.castling[couleur + "K"] = false;
        nouvel.castling[couleur + "Q"] = false;
    }
    if(coup.from === "a1" || coup.to === "a1") nouvel.castling.wQ = false;
    if(coup.from === "h1" || coup.to === "h1") nouvel.castling.wK = false;
    if(coup.from === "a8" || coup.to === "a8") nouvel.castling.bQ = false;
    if(coup.from === "h8" || coup.to === "h8") nouvel.castling.bK = false;

    nouvel.epSquare = coup.doublePas
        ? coup.from[0] + (couleur === "w" ? Number(coup.from[1]) + 1 : Number(coup.from[1]) - 1)
        : null;

    nouvel.halfmove = (coup.capture || coup.piece[1] === "P") ? 0 : etat.halfmove + 1;
    if(couleur === "b") nouvel.fullmove++;
    nouvel.turn = couleur === "w" ? "b" : "w";

    return nouvel;

}

function genererCoupsLegaux(etat){

    const pseudo = genererPseudoCoups(etat);
    const legaux = [];

    for(const coup of pseudo){
        const apres = appliquerCoup(etat, coup);
        if(!estEnEchec(apres, etat.turn)){
            legaux.push(coup);
        }
    }

    return legaux;

}

log("✅ Module 9 octies chargé");
/* =====================================================
   MODULE 9 nonies
   NOTATION FEN / PGN
===================================================== */

/* =====================================================
   FEN
===================================================== */

function positionInitiale(){
    return parserFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
}

function parserFEN(fen){

    const parties = fen.trim().split(/\s+/);
    const [placement, trait, roques, ep, demiCoups, coupsPleins] = parties;

    const board = {};
    const rangees = placement.split("/");

    for(let i = 0; i < 8; i++){
        const rang = 8 - i; // rangée 8 en haut du FEN
        let file = 0;
        for(const car of rangees[i]){
            if(/\d/.test(car)){
                file += Number(car);
            }
            else{
                const couleur = car === car.toUpperCase() ? "w" : "b";
                const lettresVersType = {
                    p:"P", n:"N", b:"B", r:"R", q:"Q", k:"K"
                };
                const type = lettresVersType[car.toLowerCase()];
                const sq = frVersCase(file, rang - 1);
                board[sq] = couleur + type;
                file++;
            }
        }
    }

    return {
        board,
        turn: trait === "b" ? "b" : "w",
        castling: {
            wK: roques && roques.includes("K"),
            wQ: roques && roques.includes("Q"),
            bK: roques && roques.includes("k"),
            bQ: roques && roques.includes("q")
        },
        epSquare: (ep && ep !== "-") ? ep : null,
        halfmove: demiCoups ? Number(demiCoups) : 0,
        fullmove: coupsPleins ? Number(coupsPleins) : 1
    };

}

function exporterFEN(etat){

    const typesVersLettre = {P:"p", N:"n", B:"b", R:"r", Q:"q", K:"k"};
    let placement = [];

    for(let i = 0; i < 8; i++){
        const rang = 8 - i;
        let ligne = "";
        let vides = 0;
        for(let f = 0; f < 8; f++){
            const sq = frVersCase(f, rang - 1);
            const piece = etat.board[sq];
            if(!piece){
                vides++;
            }
            else{
                if(vides > 0){ ligne += vides; vides = 0; }
                const lettre = typesVersLettre[piece[1]];
                ligne += piece[0] === "w" ? lettre.toUpperCase() : lettre;
            }
        }
        if(vides > 0) ligne += vides;
        placement.push(ligne);
    }

    const roques =
        (etat.castling.wK ? "K" : "") +
        (etat.castling.wQ ? "Q" : "") +
        (etat.castling.bK ? "k" : "") +
        (etat.castling.bQ ? "q" : "") || "-";

    return [
        placement.join("/"),
        etat.turn,
        roques,
        etat.epSquare || "-",
        etat.halfmove,
        etat.fullmove
    ].join(" ");

}

/* =====================================================
   PGN -> SAN tokens
===================================================== */

function extraireCoupsSAN(pgn){

    let texte = pgn;

    texte = texte.replace(/\{[^}]*\}/g, " ");       // commentaires
    texte = texte.replace(/;[^\n]*/g, " ");          // commentaires ; jusqu'à fin de ligne
    texte = texte.replace(/\$\d+/g, " ");            // NAG
    texte = texte.replace(/\[[^\]]*\]/g, " ");       // en-têtes PGN [Event "..."]

    // Variantes entre parenthèses (on les retire, on garde la ligne principale)
    let precedent;
    do{
        precedent = texte;
        texte = texte.replace(/\([^()]*\)/g, " ");
    } while(texte !== precedent);

    texte = texte.replace(/\d+\.(\.\.)?/g, " ");     // numéros de coup "12." ou "12..."
    texte = texte.replace(/1-0|0-1|1\/2-1\/2|\*/g, " "); // résultat

    return texte.trim().split(/\s+/).filter(Boolean);

}

/* =====================================================
   SAN -> coup
===================================================== */

function sanVersCoup(etat, san){

    const propre = san.replace(/[+#!?]+$/g, "");

    if(propre === "O-O" || propre === "0-0"){
        return genererCoupsLegaux(etat).find(c => c.roque === "K");
    }
    if(propre === "O-O-O" || propre === "0-0-0"){
        return genererCoupsLegaux(etat).find(c => c.roque === "Q");
    }

    const match = propre.match(
        /^([NBRQK])?([a-h])?([1-8])?(x)?([a-h][1-8])(=([NBRQ]))?$/
    );

    if(!match) return null;

    const [, piece, ficheDisamb, rangDisamb, capture, destination, , promotion] = match;
    const typePiece = piece || "P";

    const candidats = genererCoupsLegaux(etat).filter(c=>{
        if(c.piece[1] !== typePiece) return false;
        if(c.to !== destination) return false;
        if(promotion && c.promotion !== promotion) return false;
        if(!promotion && c.promotion) return false;
        if(ficheDisamb && c.from[0] !== ficheDisamb) return false;
        if(rangDisamb && c.from[1] !== rangDisamb) return false;
        return true;
    });

    if(candidats.length === 1) return candidats[0];

    // Ambiguïté résiduelle (rare) : on retourne le premier candidat valide
    return candidats[0] || null;

}

/* =====================================================
   COUP -> SAN (pour afficher lisiblement les coups Stockfish)
===================================================== */

const LETTRES_PIECE_FR = {N:"C", B:"F", R:"T", Q:"D", K:"R"};
const LETTRES_PIECE_EN = {N:"N", B:"B", R:"R", Q:"Q", K:"K"};

function coupVersSAN(etat, coup, enAnglais){

    if(coup.roque === "K") return "O-O";
    if(coup.roque === "Q") return "O-O-O";

    const type = coup.piece[1];
    const lettres = enAnglais ? LETTRES_PIECE_EN : LETTRES_PIECE_FR;
    const lettrePiece = type === "P" ? "" : lettres[type];

    let disambiguation = "";

    if(type !== "P"){

        const legaux = genererCoupsLegaux(etat);

        const memeArrivee = legaux.filter(c=>
            c.piece[1] === type && c.to === coup.to && c.from !== coup.from
        );

        if(memeArrivee.length > 0){

            const memeColonne = memeArrivee.some(c => c.from[0] === coup.from[0]);
            const memeLigne = memeArrivee.some(c => c.from[1] === coup.from[1]);

            if(!memeColonne){
                disambiguation = coup.from[0];
            }
            else if(!memeLigne){
                disambiguation = coup.from[1];
            }
            else{
                disambiguation = coup.from;
            }

        }

    }

    const captureTxt = coup.capture ? "x" : "";

    const prefixePion = (type === "P" && coup.capture) ? coup.from[0] : "";

    const promotionTxt = coup.promotion ? "=" + lettres[coup.promotion] : "";

    let san = lettrePiece + prefixePion + disambiguation + captureTxt + coup.to + promotionTxt;

    const apres = appliquerCoup(etat, coup);
    const adversaire = coup.piece[0] === "w" ? "b" : "w";

    if(estEnEchec(apres, adversaire)){

        san += genererCoupsLegaux(apres).length === 0 ? "#" : "+";

    }

    return san;

}

function coupUCIVersObjet(etat, coupUCI){

    const from = coupUCI.slice(0, 2);
    const to = coupUCI.slice(2, 4);
    const promotionLettre = coupUCI.length > 4 ? coupUCI[4].toUpperCase() : null;

    return genererCoupsLegaux(etat).find(c=>
        c.from === from && c.to === to &&
        (promotionLettre ? c.promotion === promotionLettre : !c.promotion)
    ) || null;

}

/* =====================================================
   RECHERCHE DE MAT FORCÉ (pour les puzzles "mat en N")
===================================================== */

function existeMatForceDansN(etat, n){

    if(n < 1) return false;

    const couleur = etat.turn;
    const adversaire = couleur === "w" ? "b" : "w";
    const legaux = genererCoupsLegaux(etat);

    for(const coup of legaux){

        const apres = appliquerCoup(etat, coup);
        const coupsAdversaire = genererCoupsLegaux(apres);

        if(coupsAdversaire.length === 0){

            if(estEnEchec(apres, adversaire)) return true;

            continue;

        }

        if(n === 1) continue;

        let toutesMenentAuMat = true;

        for(const repliqueAdverse of coupsAdversaire){

            const apresReplique = appliquerCoup(apres, repliqueAdverse);

            if(!existeMatForceDansN(apresReplique, n - 1)){

                toutesMenentAuMat = false;

                break;

            }

        }

        if(toutesMenentAuMat) return true;

    }

    return false;

}

function coupMeneAuMatForce(etat, coup, n){

    const apres = appliquerCoup(etat, coup);
    const adversaire = coup.piece[0] === "w" ? "b" : "w";
    const coupsAdversaire = genererCoupsLegaux(apres);

    if(coupsAdversaire.length === 0) return estEnEchec(apres, adversaire);

    if(n === 1) return false;

    return coupsAdversaire.every(
        repliqueAdverse => existeMatForceDansN(appliquerCoup(apres, repliqueAdverse), n - 1)
    );

}

log("✅ Module 9 nonies chargé");
/* =====================================================
   MODULE 9 decies
   INTERFACE D'ANALYSE (FEN / PGN / Stockfish)
===================================================== */

const AnalyseEtat = {
    positions: [],   // liste des {fen, san, coup} pour chaque étape (0 = position de départ)
    index: 0
};

function ouvrirSelecteurPromotion(prefixe, callback){

    const conteneur = document.getElementById(prefixe + "-promotion");

    if(!conteneur){

        callback("Q");

        return;

    }

    conteneur.hidden = false;

    conteneur.querySelectorAll("button").forEach(bouton=>{

        bouton.onclick = ()=>{

            conteneur.hidden = true;

            callback(bouton.dataset.piece);

        };

    });

}

let analyseSelection = null;

let analyseCoupsPossibles = [];

function construirePlateauAnalyseDOM(){

    const plateau = document.getElementById("analyse-plateau");

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

            caseDiv.tabIndex = 0;

            caseDiv.setAttribute("role", "button");

            caseDiv.setAttribute("aria-label", carre);

            caseDiv.addEventListener("click", ()=> gererClicAnalyse(carre));

            caseDiv.addEventListener("keydown", (e)=>{

                if(e.key === "Enter" || e.key === " "){

                    e.preventDefault();

                    gererClicAnalyse(carre);

                }

            });

            plateau.appendChild(caseDiv);

        }

    }

}

function gererClicAnalyse(carre){

    const etatActuel = AnalyseEtat.positions[AnalyseEtat.index].etat;

    if(analyseSelection){

        const candidats = analyseCoupsPossibles.filter(c => c.to === carre);

        if(candidats.length > 0){

            if(candidats.length > 1){

                ouvrirSelecteurPromotion("analyse", (typeChoisi)=>{

                    const coupFinal = candidats.find(c => c.promotion === typeChoisi) || candidats[0];

                    jouerCoupAnalyse(coupFinal);

                });

            }
            else{

                jouerCoupAnalyse(candidats[0]);

            }

            return;

        }

    }

    const piece = etatActuel.board[carre];

    if(piece && piece[0] === etatActuel.turn){

        analyseSelection = carre;

        analyseCoupsPossibles = genererCoupsLegaux(etatActuel).filter(c => c.from === carre);

    }
    else{

        analyseSelection = null;

        analyseCoupsPossibles = [];

    }

    rafraichirSurbrillanceAnalyse();

}

function jouerCoupAnalyse(coup){

    const etatActuel = AnalyseEtat.positions[AnalyseEtat.index].etat;

    const estAnglais = (typeof langueActuelle !== "undefined") && langueActuelle === "en";

    const san = coupVersSAN(etatActuel, coup, estAnglais);

    const nouvelEtat = appliquerCoup(etatActuel, coup);

    AnalyseEtat.positions = AnalyseEtat.positions.slice(0, AnalyseEtat.index + 1);

    AnalyseEtat.positions.push({fen: exporterFEN(nouvelEtat), san, coup, etat: nouvelEtat});

    AnalyseEtat.index = AnalyseEtat.positions.length - 1;

    analyseSelection = null;

    analyseCoupsPossibles = [];

    mettreAJourAnalyse();

}

function rafraichirSurbrillanceAnalyse(){

    const cases = document.querySelectorAll("#analyse-plateau .echiquier-case");

    cases.forEach(caseDiv=>{

        const carre = caseDiv.dataset.square;

        caseDiv.classList.remove("case-selectionnee", "coup-possible", "coup-capture");

        if(analyseSelection === carre){

            caseDiv.classList.add("case-selectionnee");

        }

        const coup = analyseCoupsPossibles.find(c => c.to === carre);

        if(coup){

            caseDiv.classList.add("coup-possible");

            if(coup.capture) caseDiv.classList.add("coup-capture");

        }

    });

}

function afficherPositionAnalyse(etat, dernierCoup){

    const cases = document.querySelectorAll("#analyse-plateau .echiquier-case");

    cases.forEach(caseDiv=>{

        const carre = caseDiv.dataset.square;

        caseDiv.classList.remove("derniere-de","derniere-a");

        const piece = etat.board[carre];

        caseDiv.innerHTML = piece
            ? `<span class="${piece[0]==="w" ? "piece-blanche" : "piece-noire"}">${PIECES_UNICODE[piece]}</span>`
            : "";

        if(dernierCoup){

            if(carre === dernierCoup.from) caseDiv.classList.add("derniere-de");

            if(carre === dernierCoup.to) caseDiv.classList.add("derniere-a");

        }

    });

}

function reinitialiserAnalyse(etatDepart){

    AnalyseEtat.positions = [{fen: exporterFEN(etatDepart), san: null, coup: null, etat: etatDepart}];

    AnalyseEtat.index = 0;

    mettreAJourAnalyse();

}

function chargerPGNDansAnalyse(texte){

    const erreurEl = document.getElementById("analyse-erreur");

    const sanListe = extraireCoupsSAN(texte);

    if(sanListe.length === 0){

        afficherErreurAnalyse("Aucun coup détecté dans ce PGN.");

        return;

    }

    let etat = positionInitiale();

    const positions = [{fen: exporterFEN(etat), san: null, coup: null, etat}];

    for(let i = 0; i < sanListe.length; i++){

        const san = sanListe[i];

        const coup = sanVersCoup(etat, san);

        if(!coup){

            afficherErreurAnalyse(
                `Coup illisible ou illégal : "${san}" (coup n°${i + 1}). ` +
                `Lecture arrêtée à ce stade, ${i} coup(s) chargé(s).`
            );

            break;

        }

        etat = appliquerCoup(etat, coup);

        positions.push({fen: exporterFEN(etat), san, coup, etat});

    }

    if(positions.length > 1 && erreurEl) erreurEl.hidden = true;

    AnalyseEtat.positions = positions;

    AnalyseEtat.index = positions.length - 1;

    mettreAJourAnalyse();

}

function afficherErreurAnalyse(message){

    const erreurEl = document.getElementById("analyse-erreur");

    if(!erreurEl) return;

    erreurEl.textContent = "⚠️ " + message;

    erreurEl.hidden = false;

}

function mettreAJourAnalyse(){

    const positions = AnalyseEtat.positions;

    if(!positions.length) return;

    const actuelle = positions[AnalyseEtat.index];

    afficherPositionAnalyse(actuelle.etat, actuelle.coup);

    const titre = document.getElementById("analyse-fen-affichee");

    const coupActuel = document.getElementById("analyse-coup-actuel");

    const compteur = document.getElementById("analyse-compteur");

    const boutonPrecedent = document.getElementById("analyse-precedent");

    const boutonSuivant = document.getElementById("analyse-suivant");

    if(titre) titre.textContent = actuelle.fen;

    if(coupActuel){

        coupActuel.textContent = positions
            .slice(1, AnalyseEtat.index + 1)
            .map((p,i)=> (i % 2 === 0 ? Math.floor(i/2) + 1 + ". " : "") + p.san)
            .join("  ") || ((typeof langueActuelle !== "undefined" && langueActuelle === "en") ? "Starting position" : "Position de départ");

    }

    if(compteur) compteur.textContent = AnalyseEtat.index + " / " + (positions.length - 1);

    if(boutonPrecedent) boutonPrecedent.disabled = AnalyseEtat.index === 0;

    if(boutonSuivant) boutonSuivant.disabled = AnalyseEtat.index === positions.length - 1;

    const resultatStockfish = document.getElementById("analyse-stockfish-resultat");

    if(resultatStockfish) resultatStockfish.textContent = "";

    analyseSelection = null;

    analyseCoupsPossibles = [];

    rafraichirSurbrillanceAnalyse();

}

/* =====================================================
   STOCKFISH (Web Worker, protocole UCI)
===================================================== */

let stockfishWorker = null;

let stockfishPret = false;

function initialiserStockfishWorker(){

    return new Promise((resolve, reject)=>{

        if(stockfishWorker && stockfishPret){

            resolve(stockfishWorker);

            return;

        }

        try{

            stockfishWorker = new Worker("stockfish/stockfish.js");

        }
        catch(erreur){

            reject(erreur);

            return;

        }

        const surErreur = (erreur)=>{

            stockfishWorker = null;

            reject(erreur);

        };

        stockfishWorker.addEventListener("error", surErreur, {once:true});

        const surMessage = (evenement)=>{

            const ligne = evenement.data;

            if(typeof ligne === "string" && ligne.includes("uciok")){

                stockfishWorker.removeEventListener("error", surErreur);

                stockfishPret = true;

                resolve(stockfishWorker);

            }

        };

        stockfishWorker.addEventListener("message", surMessage);

        stockfishWorker.postMessage("uci");

        setTimeout(()=>{

            if(!stockfishPret){

                surErreur(new Error("Le moteur Stockfish n'a pas répondu à temps."));

            }

        }, 4000);

    });

}

function analyserPositionActuelle(){

    const resultatEl = document.getElementById("analyse-stockfish-resultat");

    const bouton = document.getElementById("analyse-stockfish-bouton");

    if(!resultatEl) return;

    const estAnglais = (typeof langueActuelle !== "undefined") && langueActuelle === "en";

    const positions = AnalyseEtat.positions;

    if(!positions.length) return;

    const fen = positions[AnalyseEtat.index].fen;

    resultatEl.textContent = estAnglais ? "⏳ Analyzing…" : "⏳ Analyse en cours…";

    if(bouton) bouton.disabled = true;

    initialiserStockfishWorker()
        .then(worker=>{

            let meilleureEvaluation = "";

            let meilleurCoup = "";

            const surMessage = (evenement)=>{

                const ligne = evenement.data;

                if(typeof ligne !== "string") return;

                const matchScore = ligne.match(/score (cp|mate) (-?\d+)/);

                if(matchScore){

                    if(matchScore[1] === "cp"){

                        meilleureEvaluation = (Number(matchScore[2]) / 100).toFixed(2);

                    }
                    else{

                        meilleureEvaluation = (estAnglais ? "Mate in " : "Mat en ") + Math.abs(Number(matchScore[2]));

                    }

                }

                if(ligne.startsWith("bestmove")){

                    const partieBestmove = ligne.split(" ");

                    const coupUCI = partieBestmove[1] || "";

                    meilleurCoup = coupUCI;

                    try{

                        const etatActuel = positions[AnalyseEtat.index].etat;

                        const coupObjet = coupUCIVersObjet(etatActuel, coupUCI);

                        if(coupObjet){

                            meilleurCoup = coupVersSAN(etatActuel, coupObjet, estAnglais);

                        }

                    }
                    catch(erreurConversion){

                        // en cas d'échec de conversion, on garde la notation UCI brute

                    }

                    worker.removeEventListener("message", surMessage);

                    if(bouton) bouton.disabled = false;

                    const estMat = typeof meilleureEvaluation === "string" && meilleureEvaluation.includes("Mat");

                    const classeEval = estMat
                        ? ""
                        : (Number(meilleureEvaluation) >= 0 ? "eval-positive" : "eval-negative");

                    resultatEl.innerHTML = estAnglais
                        ? `Evaluation: <span class="${classeEval}">${meilleureEvaluation}</span><br>Best move: <strong>${meilleurCoup}</strong>`
                        : `Évaluation : <span class="${classeEval}">${meilleureEvaluation}</span><br>Meilleur coup : <strong>${meilleurCoup}</strong>`;

                }

            };

            worker.addEventListener("message", surMessage);

            worker.postMessage("position fen " + fen);

            worker.postMessage("go depth 15");

        })
        .catch(()=>{

            if(bouton) bouton.disabled = false;

            resultatEl.innerHTML = estAnglais
                ? "⚠️ Stockfish engine not found. Add <code>stockfish.js</code> (WASM build) inside a <code>/stockfish/</code> folder next to your site files."
                : "⚠️ Moteur Stockfish introuvable. Ajoutez le fichier <code>stockfish.js</code> (version WASM) dans un dossier <code>/stockfish/</code> à côté de vos fichiers du site.";

        });

}

function initialiserAnalyse(){

    const plateau = document.getElementById("analyse-plateau");

    if(!plateau) return;

    construirePlateauAnalyseDOM();

    reinitialiserAnalyse(positionInitiale());

    const boutonFen = document.getElementById("analyse-fen-charger");

    const champFen = document.getElementById("analyse-fen-input");

    const boutonPgn = document.getElementById("analyse-pgn-charger");

    const champPgn = document.getElementById("analyse-pgn-input");

    const champFichier = document.getElementById("analyse-pgn-fichier");

    const boutonPrecedent = document.getElementById("analyse-precedent");

    const boutonSuivant = document.getElementById("analyse-suivant");

    const boutonStockfish = document.getElementById("analyse-stockfish-bouton");

    if(boutonFen){

        boutonFen.addEventListener("click",()=>{

            const valeur = champFen.value.trim();

            if(!valeur){

                afficherErreurAnalyse("Veuillez saisir une position FEN.");

                return;

            }

            try{

                const etat = parserFEN(valeur);

                if(!trouverRoi(etat, "w") || !trouverRoi(etat, "b")){

                    throw new Error("FEN invalide : roi manquant.");

                }

                document.getElementById("analyse-erreur").hidden = true;

                reinitialiserAnalyse(etat);

            }
            catch(erreur){

                afficherErreurAnalyse("FEN invalide, vérifiez le format saisi.");

            }

        });

    }

    if(boutonPgn){

        boutonPgn.addEventListener("click",()=>{

            const texte = champPgn.value.trim();

            if(!texte){

                afficherErreurAnalyse("Veuillez coller un PGN ou choisir un fichier.");

                return;

            }

            chargerPGNDansAnalyse(texte);

        });

    }

    if(champFichier){

        champFichier.addEventListener("change",(e)=>{

            const fichier = e.target.files[0];

            if(!fichier) return;

            const lecteur = new FileReader();

            lecteur.onload = ()=>{

                champPgn.value = lecteur.result;

                chargerPGNDansAnalyse(lecteur.result);

            };

            lecteur.readAsText(fichier);

        });

    }

    if(boutonPrecedent){

        boutonPrecedent.addEventListener("click",()=>{

            if(AnalyseEtat.index > 0){

                AnalyseEtat.index--;

                mettreAJourAnalyse();

            }

        });

    }

    if(boutonSuivant){

        boutonSuivant.addEventListener("click",()=>{

            if(AnalyseEtat.index < AnalyseEtat.positions.length - 1){

                AnalyseEtat.index++;

                mettreAJourAnalyse();

            }

        });

    }

    if(boutonStockfish){

        boutonStockfish.addEventListener("click", analyserPositionActuelle);

    }

    const boutonRetourner = document.getElementById("analyse-retourner");

    const boutonExportFen = document.getElementById("analyse-export-fen");

    const boutonExportPgn = document.getElementById("analyse-export-pgn");

    if(boutonRetourner){

        boutonRetourner.addEventListener("click", basculerRetournementAnalyse);

    }

    if(boutonExportFen){

        boutonExportFen.addEventListener("click", copierFenAnalyse);

    }

    if(boutonExportPgn){

        boutonExportPgn.addEventListener("click", exporterPgnAnalyse);

    }

}

let analyseRetournee = false;

function basculerRetournementAnalyse(){

    analyseRetournee = !analyseRetournee;

    const plateau = document.getElementById("analyse-plateau");

    if(plateau) plateau.classList.toggle("retourne", analyseRetournee);

}

function copierFenAnalyse(){

    const positions = AnalyseEtat.positions;

    if(!positions.length) return;

    const fen = positions[AnalyseEtat.index].fen;

    const confirmation = document.getElementById("analyse-copie-confirmation");

    const estAnglais = (typeof langueActuelle !== "undefined") && langueActuelle === "en";

    const afficherConfirmation = (texte)=>{

        if(!confirmation) return;

        confirmation.textContent = texte;

        confirmation.hidden = false;

        setTimeout(()=>{ confirmation.hidden = true; }, 2500);

    };

    if(navigator.clipboard && navigator.clipboard.writeText){

        navigator.clipboard.writeText(fen)
            .then(()=> afficherConfirmation(estAnglais ? "✅ FEN copied!" : "✅ FEN copiée !"))
            .catch(()=> afficherConfirmation(
                (estAnglais ? "⚠️ Could not copy automatically — " : "⚠️ Copie automatique impossible — ") + fen
            ));

    }
    else{

        afficherConfirmation(
            (estAnglais ? "⚠️ Clipboard unavailable — " : "⚠️ Presse-papiers indisponible — ") + fen
        );

    }

}

function exporterPgnAnalyse(){

    const positions = AnalyseEtat.positions;

    const estAnglais = (typeof langueActuelle !== "undefined") && langueActuelle === "en";

    const confirmation = document.getElementById("analyse-copie-confirmation");

    if(positions.length <= 1){

        if(confirmation){

            confirmation.textContent = estAnglais
                ? "⚠️ No moves to export yet."
                : "⚠️ Aucun coup à exporter pour le moment.";

            confirmation.hidden = false;

            setTimeout(()=>{ confirmation.hidden = true; }, 2500);

        }

        return;

    }

    let pgn = "";

    for(let i = 1; i < positions.length; i++){

        const numeroCoup = Math.ceil(i / 2);

        if(i % 2 === 1) pgn += numeroCoup + ". ";

        pgn += positions[i].san + " ";

    }

    pgn = "[Event \"Chess.dev Studio\"]\n\n" + pgn.trim() + " *";

    const blob = new Blob([pgn], { type:"text/plain" });

    const url = URL.createObjectURL(blob);

    const lien = document.createElement("a");

    lien.href = url;

    lien.download = "partie.pgn";

    document.body.appendChild(lien);

    lien.click();

    document.body.removeChild(lien);

    URL.revokeObjectURL(url);

}

log("✅ Module 9 decies chargé");
/* =====================================================
   MODULE 9 undecies
   PUZZLES TACTIQUES (mat en 1, mat en 2, tactique Stockfish)
===================================================== */

const PUZZLES_MAT1 = [

    { fen:"6k1/5ppp/8/8/8/8/8/4R2K w - - 0 1", theme:"Mat en 1 — Mat du couloir", theme_en:"Mate in 1 — Back-rank mate" },
    { fen:"4k3/8/4K3/8/8/8/8/6R1 w - - 0 1", theme:"Mat en 1 — Tour, roi acculé", theme_en:"Mate in 1 — Rook mate, cornered king" },
    { fen:"7k/5Q2/6K1/8/8/8/8/8 w - - 0 1", theme:"Mat en 1 — Dame collée", theme_en:"Mate in 1 — Queen mate, king pinned to edge" },
    { fen:"3r2k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1", theme:"Mat en 1 — Couloir (tours)", theme_en:"Mate in 1 — Back-rank mate (rooks)" },
    { fen:"6k1/8/6K1/8/8/8/8/7Q w - - 0 1", theme:"Mat en 1 — Dame, roi acculé", theme_en:"Mate in 1 — Queen mate, cornered king" },
    { fen:"7k/R7/1R6/8/8/8/8/6K1 w - - 0 1", theme:"Mat en 1 — Escalier", theme_en:"Mate in 1 — Ladder mate" },
    { fen:"6k1/8/6K1/8/8/8/8/2Q5 w - - 0 1", theme:"Mat en 1 — Dame soutenue par le roi", theme_en:"Mate in 1 — King-supported queen mate" },
    { fen:"k7/2K5/8/8/8/8/8/1Q6 w - - 0 1", theme:"Mat en 1 — Dame, roi au coin", theme_en:"Mate in 1 — Queen mate, king in the corner" }

];

const PUZZLES_MAT2 = [

    { fen:"k7/8/8/K7/8/8/Q7/8 w - - 0 1", theme:"Mat en 2 — Technique dame + roi", theme_en:"Mate in 2 — King & queen technique" },
    { fen:"k7/4Q3/8/K7/8/8/8/8 w - - 0 1", theme:"Mat en 2 — Dame proche du roi noir", theme_en:"Mate in 2 — Queen near the black king" },
    { fen:"k7/8/8/K2R4/8/8/8/8 w - - 0 1", theme:"Mat en 2 — Technique tour + roi", theme_en:"Mate in 2 — King & rook technique" },
    { fen:"7k/1Q6/8/4K3/8/8/8/8 w - - 0 1", theme:"Mat en 2 — Roi noir dans le coin h8", theme_en:"Mate in 2 — Black king in the h8 corner" },
    { fen:"7k/8/4K3/8/8/8/Q7/8 w - - 0 1", theme:"Mat en 2 — Dame à distance", theme_en:"Mate in 2 — Queen from afar" },
    { fen:"k7/3R4/8/1K6/8/8/8/8 w - - 0 1", theme:"Mat en 2 — Tour déjà avancée", theme_en:"Mate in 2 — Rook already advanced" }

];

const PUZZLES_TACTIQUE = [

    { fen:"4k3/8/8/7q/6N1/8/8/6K1 w - - 0 1", theme:"Tactique — Fourchette de cavalier", theme_en:"Tactic — Knight fork" },
    { fen:"6k1/8/8/q7/8/8/8/R5K1 w - - 0 1", theme:"Tactique — Pièce non défendue", theme_en:"Tactic — Undefended piece" },
    { fen:"6k1/5p2/8/3b4/8/1B6/6PP/6K1 w - - 0 1", theme:"Tactique — Gagner une pièce", theme_en:"Tactic — Win a piece" }

];

const ENSEMBLES_PUZZLES = {
    mat1: PUZZLES_MAT1,
    mat2: PUZZLES_MAT2,
    tactique: PUZZLES_TACTIQUE
};

let puzzleCategorie = "mat1";

let puzzleIndex = 0;

let puzzleEtatActuel = null;

let puzzleSelection = null;

let puzzleCoupsPossibles = [];

let puzzleResolu = false;

let puzzleEtape = 1; // pour mat2 : 1 = premier coup, 2 = coup final

let puzzleEnVerification = false;

function construirePlateauPuzzleDOM(){

    const plateau = document.getElementById("puzzle-plateau");

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

            caseDiv.tabIndex = 0;

            caseDiv.setAttribute("role", "button");

            caseDiv.setAttribute("aria-label", carre);

            caseDiv.addEventListener("click", ()=> gererClicPuzzle(carre));

            caseDiv.addEventListener("keydown", (e)=>{

                if(e.key === "Enter" || e.key === " "){

                    e.preventDefault();

                    gererClicPuzzle(carre);

                }

            });

            plateau.appendChild(caseDiv);

        }

    }

}

function afficherPositionPuzzle(){

    const cases = document.querySelectorAll("#puzzle-plateau .echiquier-case");

    cases.forEach(caseDiv=>{

        const carre = caseDiv.dataset.square;

        caseDiv.classList.remove(
            "case-selectionnee", "coup-possible", "coup-capture"
        );

        const piece = puzzleEtatActuel.board[carre];

        caseDiv.innerHTML = piece
            ? `<span class="${piece[0]==="w" ? "piece-blanche" : "piece-noire"}">${PIECES_UNICODE[piece]}</span>`
            : "";

        if(puzzleSelection === carre){

            caseDiv.classList.add("case-selectionnee");

        }

        const coup = puzzleCoupsPossibles.find(c => c.to === carre);

        if(coup){

            caseDiv.classList.add("coup-possible");

            if(coup.capture) caseDiv.classList.add("coup-capture");

        }

    });

}

function chargerPuzzle(index){

    const ensemble = ENSEMBLES_PUZZLES[puzzleCategorie];

    puzzleIndex = ((index % ensemble.length) + ensemble.length) % ensemble.length;

    puzzleEtatActuel = parserFEN(ensemble[puzzleIndex].fen);

    puzzleSelection = null;

    puzzleCoupsPossibles = [];

    puzzleResolu = false;

    puzzleEtape = 1;

    puzzleEnVerification = false;

    afficherPositionPuzzle();

    const estAnglais = (typeof langueActuelle !== "undefined") && langueActuelle === "en";

    const themeEl = document.getElementById("puzzle-theme");

    const compteurEl = document.getElementById("puzzle-compteur");

    const messageEl = document.getElementById("puzzle-message");

    const boutonPrecedent = document.getElementById("puzzle-precedent");

    if(themeEl){

        themeEl.textContent = estAnglais
            ? ensemble[puzzleIndex].theme_en
            : ensemble[puzzleIndex].theme;

    }

    if(compteurEl){

        compteurEl.textContent = (puzzleIndex + 1) + " / " + ensemble.length;

    }

    if(messageEl){

        messageEl.textContent = "";

        messageEl.className = "puzzle-message";

    }

    if(boutonPrecedent){

        boutonPrecedent.disabled = puzzleIndex === 0;

    }

}

function changerCategoriePuzzle(categorie){

    puzzleCategorie = categorie;

    document.querySelectorAll(".puzzle-onglet").forEach(onglet=>{

        onglet.classList.toggle("active", onglet.dataset.categorie === categorie);

    });

    chargerPuzzle(0);

}

function marquerReussitePuzzle(){

    puzzleResolu = true;

    const estAnglais = (typeof langueActuelle !== "undefined") && langueActuelle === "en";

    const messageEl = document.getElementById("puzzle-message");

    if(messageEl){

        messageEl.textContent = estAnglais
            ? "✅ Well played!"
            : "✅ Bien joué !";

        messageEl.className = "puzzle-message succes";

    }

}

function marquerEchecPuzzleEtRecharger(messagePersonnalise){

    const estAnglais = (typeof langueActuelle !== "undefined") && langueActuelle === "en";

    const messageEl = document.getElementById("puzzle-message");

    if(messageEl){

        messageEl.textContent = messagePersonnalise || (estAnglais
            ? "Not quite — try again."
            : "Pas tout à fait — réessayez.");

        messageEl.className = "puzzle-message erreur";

    }

    setTimeout(()=>{

        chargerPuzzle(puzzleIndex);

    }, 900);

}

function gererClicPuzzle(carre){

    if(puzzleResolu || puzzleEnVerification) return;

    if(puzzleSelection){

        const candidats = puzzleCoupsPossibles.filter(c => c.to === carre);

        if(candidats.length > 0){

            if(candidats.length > 1){

                ouvrirSelecteurPromotion("puzzle", (typeChoisi)=>{

                    const coupFinal = candidats.find(c => c.promotion === typeChoisi) || candidats[0];

                    jouerCoupPuzzle(coupFinal);

                });

            }
            else{

                jouerCoupPuzzle(candidats[0]);

            }

            return;

        }

    }

    const piece = puzzleEtatActuel.board[carre];

    if(piece && piece[0] === puzzleEtatActuel.turn){

        puzzleSelection = carre;

        puzzleCoupsPossibles = genererCoupsLegaux(puzzleEtatActuel).filter(c => c.from === carre);

    }
    else{

        puzzleSelection = null;

        puzzleCoupsPossibles = [];

    }

    afficherPositionPuzzle();

}

function jouerCoupPuzzle(coup){

    if(puzzleCategorie === "tactique"){

        jouerCoupPuzzleTactique(coup);

        return;

    }

    const nCible = puzzleCategorie === "mat2" ? 2 : 1;

    // Étape 1 d'un mat en 2 : le coup doit garantir un mat forcé, pas forcément immédiat
    if(puzzleCategorie === "mat2" && puzzleEtape === 1){

        const valide = coupMeneAuMatForce(puzzleEtatActuel, coup, 2);

        puzzleSelection = null;

        puzzleCoupsPossibles = [];

        if(!valide){

            afficherPositionPuzzle();

            marquerEchecPuzzleEtRecharger();

            return;

        }

        const apres = appliquerCoup(puzzleEtatActuel, coup);

        const adversaire = coup.piece[0] === "w" ? "b" : "w";
        const coupsAdversaire = genererCoupsLegaux(apres);

        puzzleEtatActuel = apres;

        afficherPositionPuzzle();

        if(coupsAdversaire.length === 0 && estEnEchec(apres, adversaire)){

            // mat trouvé dès le premier coup : réussite immédiate
            marquerReussitePuzzle();

            return;

        }

        puzzleEtape = 2;

        const estAnglais = (typeof langueActuelle !== "undefined") && langueActuelle === "en";
        const messageEl = document.getElementById("puzzle-message");

        if(messageEl){

            messageEl.textContent = estAnglais
                ? "Black replies… find the mate!"
                : "Les noirs répondent… trouvez le mat !";

            messageEl.className = "puzzle-message";

        }

        setTimeout(()=>{

            const repliqueChoisie = coupsAdversaire[Math.floor(Math.random() * coupsAdversaire.length)];

            puzzleEtatActuel = appliquerCoup(puzzleEtatActuel, repliqueChoisie);

            afficherPositionPuzzle();

        }, 700);

        return;

    }

    // Coup final (mat en 1, ou 2e coup d'un mat en 2) : doit être un mat immédiat
    const apres = appliquerCoup(puzzleEtatActuel, coup);

    const adversaire = coup.piece[0] === "w" ? "b" : "w";
    const estMat = estEnEchec(apres, adversaire) && genererCoupsLegaux(apres).length === 0;

    puzzleEtatActuel = apres;

    puzzleSelection = null;

    puzzleCoupsPossibles = [];

    afficherPositionPuzzle();

    if(estMat){

        marquerReussitePuzzle();

    }
    else{

        marquerEchecPuzzleEtRecharger();

    }

}

function jouerCoupPuzzleTactique(coup){

    const etatAvant = puzzleEtatActuel;

    const estAnglais = (typeof langueActuelle !== "undefined") && langueActuelle === "en";

    const uciJoue = coup.from + coup.to + (coup.promotion ? coup.promotion.toLowerCase() : "");

    puzzleSelection = null;

    puzzleCoupsPossibles = [];

    puzzleEnVerification = true;

    const messageEl = document.getElementById("puzzle-message");

    if(messageEl){

        messageEl.textContent = estAnglais ? "⏳ Checking with Stockfish…" : "⏳ Vérification avec Stockfish…";

        messageEl.className = "puzzle-message";

    }

    initialiserStockfishWorker()
        .then(worker=>{

            const surMessage = (evenement)=>{

                const ligne = evenement.data;

                if(typeof ligne !== "string") return;

                if(ligne.startsWith("bestmove")){

                    worker.removeEventListener("message", surMessage);

                    puzzleEnVerification = false;

                    const meilleurUCI = ligne.split(" ")[1] || "";

                    puzzleEtatActuel = appliquerCoup(etatAvant, coup);

                    afficherPositionPuzzle();

                    if(meilleurUCI === uciJoue){

                        marquerReussitePuzzle();

                    }
                    else{

                        marquerEchecPuzzleEtRecharger(
                            estAnglais
                                ? "Not the best move — try again."
                                : "Ce n'est pas le meilleur coup — réessayez."
                        );

                    }

                }

            };

            worker.addEventListener("message", surMessage);

            worker.postMessage("position fen " + exporterFEN(etatAvant));

            worker.postMessage("go depth 15");

        })
        .catch(()=>{

            puzzleEnVerification = false;

            if(messageEl){

                messageEl.innerHTML = estAnglais
                    ? "⚠️ Stockfish engine not found. This puzzle type needs it (see the Analysis section)."
                    : "⚠️ Moteur Stockfish introuvable. Ce type de puzzle en a besoin (voir la section Analyse).";

                messageEl.className = "puzzle-message erreur";

            }

        });

}

function initialiserPuzzles(){

    const plateau = document.getElementById("puzzle-plateau");

    if(!plateau) return;

    construirePlateauPuzzleDOM();

    chargerPuzzle(0);

    const boutonPrecedent = document.getElementById("puzzle-precedent");

    const boutonSuivant = document.getElementById("puzzle-suivant");

    const boutonReset = document.getElementById("puzzle-reset");

    const onglets = document.querySelectorAll(".puzzle-onglet");

    if(boutonPrecedent){

        boutonPrecedent.addEventListener("click", ()=> chargerPuzzle(puzzleIndex - 1));

    }

    if(boutonSuivant){

        boutonSuivant.addEventListener("click", ()=> chargerPuzzle(puzzleIndex + 1));

    }

    if(boutonReset){

        boutonReset.addEventListener("click", ()=> chargerPuzzle(puzzleIndex));

    }

    onglets.forEach(onglet=>{

        onglet.addEventListener("click", ()=> changerCategoriePuzzle(onglet.dataset.categorie));

    });

}

log("✅ Module 9 undecies chargé");
/* =====================================================
   MODULE 9 duodecies
   PWA — ENREGISTREMENT DU SERVICE WORKER
===================================================== */

function initialiserPWA(){

    if(!("serviceWorker" in navigator)) return;

    window.addEventListener("load", ()=>{

        navigator.serviceWorker.register("sw.js").catch(()=>{

            // Échec silencieux : le site continue de fonctionner normalement,
            // simplement sans installation ni mode hors-ligne.

        });

    });

}

log("✅ Module 9 duodecies chargé");
/* =====================================================
   MODULE 9 terdecies
   BARRE DE NAVIGATION MOBILE
===================================================== */

function initialiserBarreMobile(){

    const barre = document.getElementById("mobile-tabbar");

    if(!barre) return;

    const onglets = barre.querySelectorAll(".mobile-tab[data-cible]");

    const boutonMenu = document.getElementById("mobile-tab-menu");

    if(boutonMenu){

        boutonMenu.addEventListener("click", ()=>{

            const toggleNav = document.getElementById("nav-toggle");

            if(toggleNav) toggleNav.click();

        });

    }

    if(!onglets.length) return;

    const sections = Array.from(onglets)
        .map(onglet => document.getElementById(onglet.dataset.cible))
        .filter(Boolean);

    if(!sections.length) return;

    const observateur = new IntersectionObserver(
        (entrees)=>{

            entrees.forEach(entree=>{

                if(!entree.isIntersecting) return;

                const cibleId = entree.target.id;

                onglets.forEach(onglet=>{

                    onglet.classList.toggle(
                        "active", onglet.dataset.cible === cibleId
                    );

                });

            });

        },
        { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach(section => observateur.observe(section));

}

log("✅ Module 9 terdecies chargé");
/* =====================================================
   MODULE 9 quaterdecies
   HORLOGE D'ÉCHECS
===================================================== */

let horlogeMinutes = 5;

let horlogeIncrement = 0;

let horlogeTemps1 = 300;

let horlogeTemps2 = 300;

let horlogeActif = null; // 1, 2, ou null

let horlogeEnCours = false;

let horlogeTermine = false;

let horlogeIntervalId = null;

function formaterTempsHorloge(secondes){

    const s = Math.max(0, Math.round(secondes));

    const m = Math.floor(s / 60);

    const reste = s % 60;

    return String(m).padStart(2, "0") + ":" + String(reste).padStart(2, "0");

}

function mettreAJourAffichageHorloge(){

    const el1 = document.getElementById("horloge-temps1");

    const el2 = document.getElementById("horloge-temps2");

    const pendule1 = document.getElementById("horloge-joueur1");

    const pendule2 = document.getElementById("horloge-joueur2");

    if(el1) el1.textContent = formaterTempsHorloge(horlogeTemps1);

    if(el2) el2.textContent = formaterTempsHorloge(horlogeTemps2);

    if(pendule1){

        pendule1.classList.toggle("actif", horlogeActif === 1 && horlogeEnCours);

        pendule1.classList.toggle("expire", horlogeTemps1 <= 0);

    }

    if(pendule2){

        pendule2.classList.toggle("actif", horlogeActif === 2 && horlogeEnCours);

        pendule2.classList.toggle("expire", horlogeTemps2 <= 0);

    }

}

function appliquerReglagesHorloge(){

    arreterIntervalHorloge();

    const selectMinutes = document.getElementById("horloge-minutes");

    const selectIncrement = document.getElementById("horloge-increment");

    horlogeMinutes = selectMinutes ? Number(selectMinutes.value) : 5;

    horlogeIncrement = selectIncrement ? Number(selectIncrement.value) : 0;

    horlogeTemps1 = horlogeMinutes * 60;

    horlogeTemps2 = horlogeMinutes * 60;

    horlogeActif = null;

    horlogeEnCours = false;

    horlogeTermine = false;

    const pendule1 = document.getElementById("horloge-joueur1");

    const pendule2 = document.getElementById("horloge-joueur2");

    if(pendule1) pendule1.disabled = true;

    if(pendule2) pendule2.disabled = true;

    const messageEl = document.getElementById("horloge-message");

    if(messageEl) messageEl.textContent = "";

    mettreAJourAffichageHorloge();

}

function arreterIntervalHorloge(){

    if(horlogeIntervalId !== null){

        clearInterval(horlogeIntervalId);

        horlogeIntervalId = null;

    }

}

function tickHorloge(){

    if(horlogeActif === 1){

        horlogeTemps1--;

        if(horlogeTemps1 <= 0){

            horlogeTemps1 = 0;

            finDeTempsHorloge(1);

        }

    }
    else if(horlogeActif === 2){

        horlogeTemps2--;

        if(horlogeTemps2 <= 0){

            horlogeTemps2 = 0;

            finDeTempsHorloge(2);

        }

    }

    mettreAJourAffichageHorloge();

}

function finDeTempsHorloge(joueur){

    arreterIntervalHorloge();

    horlogeEnCours = false;

    horlogeTermine = true;

    const pendule1 = document.getElementById("horloge-joueur1");

    const pendule2 = document.getElementById("horloge-joueur2");

    if(pendule1) pendule1.disabled = true;

    if(pendule2) pendule2.disabled = true;

    const estAnglais = (typeof langueActuelle !== "undefined") && langueActuelle === "en";

    const messageEl = document.getElementById("horloge-message");

    if(messageEl){

        messageEl.textContent = estAnglais
            ? `⏱️ Time's up for Player ${joueur}!`
            : `⏱️ Temps écoulé pour le Joueur ${joueur} !`;

        messageEl.className = "puzzle-message erreur";

    }

}

function demarrerHorloge(){

    if(horlogeTermine) return;

    if(horlogeActif === null) horlogeActif = 1;

    horlogeEnCours = true;

    const pendule1 = document.getElementById("horloge-joueur1");

    const pendule2 = document.getElementById("horloge-joueur2");

    if(pendule1) pendule1.disabled = false;

    if(pendule2) pendule2.disabled = false;

    arreterIntervalHorloge();

    horlogeIntervalId = setInterval(tickHorloge, 1000);

    mettreAJourAffichageHorloge();

}

function pauseHorloge(){

    arreterIntervalHorloge();

    horlogeEnCours = false;

    mettreAJourAffichageHorloge();

}

function clicPenduleHorloge(joueur){

    if(!horlogeEnCours || horlogeTermine) return;

    if(horlogeActif !== joueur) return;

    if(joueur === 1) horlogeTemps1 += horlogeIncrement;

    if(joueur === 2) horlogeTemps2 += horlogeIncrement;

    horlogeActif = joueur === 1 ? 2 : 1;

    mettreAJourAffichageHorloge();

}

function initialiserHorloge(){

    const widget = document.querySelector(".horloge-widget");

    if(!widget) return;

    appliquerReglagesHorloge();

    const boutonAppliquer = document.getElementById("horloge-appliquer");

    const boutonDemarrer = document.getElementById("horloge-demarrer");

    const boutonPause = document.getElementById("horloge-pause");

    const boutonReset = document.getElementById("horloge-reset");

    const pendule1 = document.getElementById("horloge-joueur1");

    const pendule2 = document.getElementById("horloge-joueur2");

    if(boutonAppliquer) boutonAppliquer.addEventListener("click", appliquerReglagesHorloge);

    if(boutonDemarrer) boutonDemarrer.addEventListener("click", demarrerHorloge);

    if(boutonPause) boutonPause.addEventListener("click", pauseHorloge);

    if(boutonReset) boutonReset.addEventListener("click", appliquerReglagesHorloge);

    if(pendule1) pendule1.addEventListener("click", ()=> clicPenduleHorloge(1));

    if(pendule2) pendule2.addEventListener("click", ()=> clicPenduleHorloge(2));

}

log("✅ Module 9 quaterdecies chargé");
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
       Analyse de partie
    ========================= */

    initialiserAnalyse();

    /* =========================
       Puzzles tactiques
    ========================= */

    initialiserPuzzles();

    /* =========================
       PWA
    ========================= */

    initialiserPWA();

    /* =========================
       Barre de navigation mobile
    ========================= */

    initialiserBarreMobile();

    /* =========================
       Horloge d'échecs
    ========================= */

    initialiserHorloge();

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