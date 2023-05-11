"use strict";
//  https://api.github.com/users/USERNAME
/**
 * Déclaration des élément du DOM
 */
const form = document.querySelector('form');
const inputResearch = document.querySelector('.input-recherche');
const btnSubmit = document.querySelector('.btn-submit');
const displayer = document.querySelector('.affichage');
const themeToggle = document.querySelector('.theme-toggle');
/**
 * Déclaration des variables
 */
let theme = 'light';
start();
form.addEventListener('submit', handelSubmit);
themeToggle.addEventListener('click', handleChangeTheme);
function start() {
    if (localStorage.getItem('theme')) {
        themeToggle.setAttribute('data-theme', localStorage.getItem('theme'));
        theme = themeToggle.getAttribute('data-theme');
    }
    else {
        theme = themeToggle.getAttribute('data-theme');
        localStorage.setItem('theme', theme);
    }
    themeToggle.classList.add(theme);
    document.body.classList.add(theme);
    console.log(localStorage);
}
function handelSubmit(e) {
    e.preventDefault();
    if (inputResearch.value.length > 0)
        apiCall(inputResearch.value);
}
function handleChangeTheme() {
    if (themeToggle.getAttribute('data-theme') == 'light') {
        themeToggle.setAttribute('data-theme', 'dark');
        themeToggle.classList.remove('light');
        document.body.classList.remove('light');
        themeToggle.classList.add('dark');
        document.body.classList.add('dark');
    }
    else if (themeToggle.getAttribute('data-theme') == 'dark') {
        themeToggle.setAttribute('data-theme', 'light');
        themeToggle.classList.remove('dark');
        document.body.classList.remove('dark');
        themeToggle.classList.add('light');
        document.body.classList.add('light');
    }
    theme = themeToggle.getAttribute('data-theme');
    localStorage.setItem('theme', theme);
    themeToggle.classList.add(theme);
    console.log(localStorage.getItem('theme'), theme);
}
async function apiCall(username) {
    const url = `https://api.github.com/users/${username}`;
    const data = await fetch(url, { method: 'get' })
        .then(response => response.json())
        .then(result => createCard(result))
        .catch(err => createError(err));
}
function createCard(user) {
    displayer.innerHTML = `
        <div class='carte'>
            <img class="avatar" src="${user.avatar_url}"/>
            <h2>${user.name}</h2>
            <p><p>
            <ul class="compte-infos">
                <li>Followers: ${user.followers}</li>
                <li>Repos public: ${user.public_repos}</li>
                <li>Arrivé le: ${dateFormat(user.created_at)}</li>
                <li>${user.twitter_username}</li>
            </ul>
            <div class='reseaux'>
                ${user.twitter_username ? `<a href='https://twitter.com/${user.twitter_username}'>
                    <img src="./ressources/img/twitter-logo.svg" alt="twitter"/>
                </a>` : ''}
            </div>
        </div>`;
}
function createError(err) {
    displayer.innerHTML = `
    <div class='error'>
        <h2>Introuvable</h2>
        <p>Nous n'avons pas pu trouver un utilisateur correspondant à ce pseudo.<p>
    </div>
    `;
}
function dateFormat(date) {
    const date_array_1 = date.split('-');
    const date_array_2 = date_array_1[2].split('T');
    return `${date_array_2[0]}/${date_array_1[1]}/${date_array_1[0]} à ${date_array_2[1].replace('Z', '')}`;
}
