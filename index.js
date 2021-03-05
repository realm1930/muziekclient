"use strict";
const albumsUrl = "http://localhost:8080/albums";
document.getElementById("zoeken").onclick = zoekAlbum;

async function zoekAlbum() {
    verbergFouten();
    const albumResponse = await fetch(`${albumsUrl}/${document.getElementById("nummer").value}`);
    if (albumResponse.ok) {
        const album = await albumResponse.json();
        document.getElementById("album").innerText = `${album.album} - ${album.artiest}`;
        zoekTracks(album);
    } else {
        if (albumResponse.status === 404) {
            document.getElementById("albumNietGevondenFout").hidden = false;
        } else {
            document.getElementById("technischeFout").hidden = false;
        }
    }
}

async function zoekTracks(album) {
    const ul = document.getElementById("tracks");
    verwijderAllChildElementenIn(ul);
    const tracksResponse = await fetch(album._links.tracks.href);
    if (tracksResponse.ok) {
        const tracks = await tracksResponse.json();
        for (const track of tracks._embedded.trackList) {
            const li = document.createElement("li");
            li.innerText = `${track.naam} ${track.tijd}`;
            ul.appendChild(li);
        }
    } else {
        document.getElementById("technischeFout").hidden = false;
    }
}

function verwijderAllChildElementenIn(element) {
    while (element.lastChild !== null) {
        element.lastChild.remove();
    }
}

function verbergFouten() {
    for (const div of document.querySelectorAll(".fout")) {
        div.hidden = true;
    }
}