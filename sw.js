/* =====================================================
   SERVICE WORKER — Chess.dev Studio
   Stratégie : réseau en priorité, cache en secours (hors-ligne)
===================================================== */

const NOM_CACHE = "chessdev-cache-v1";

const RESSOURCES_ESSENTIELLES = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];

self.addEventListener("install", (evenement) => {

    evenement.waitUntil(
        caches.open(NOM_CACHE).then((cache) => cache.addAll(RESSOURCES_ESSENTIELLES))
    );

    self.skipWaiting();

});

self.addEventListener("activate", (evenement) => {

    evenement.waitUntil(
        caches.keys().then((noms) =>
            Promise.all(
                noms
                    .filter((nom) => nom !== NOM_CACHE)
                    .map((nom) => caches.delete(nom))
            )
        )
    );

    self.clients.claim();

});

self.addEventListener("fetch", (evenement) => {

    const requete = evenement.request;

    if (requete.method !== "GET") return;

    // Le moteur Stockfish (fichiers volumineux) n'est pas géré par ce cache :
    // on laisse le cache HTTP normal du navigateur s'en occuper.
    if (requete.url.includes("/stockfish/")) return;

    evenement.respondWith(
        fetch(requete)
            .then((reponse) => {

                const copie = reponse.clone();

                caches.open(NOM_CACHE).then((cache) => cache.put(requete, copie));

                return reponse;

            })
            .catch(() =>
                caches.match(requete).then((reponseCache) =>
                    reponseCache || caches.match("./index.html")
                )
            )
    );

});
