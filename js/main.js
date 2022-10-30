// Mobile Navigation
const mobileNavMenu = document.querySelector(".header__nav");
const mobileNavBtn = document.querySelector(".header__menu--btn");

mobileNavBtn.addEventListener("click", () => {
    mobileNavMenu.classList.toggle("active");
});

// Fetch API & Managing the DOM Output
const shortenInput = document.querySelector(".shorten-link__input");
const shortenBtn = document.querySelector(".shorten-link__btn");
const emptyMessage = document.querySelector(".shorten-link__empty");
const outputContainer = document.querySelector(".output__container");

const URL_API = "https://api.shrtco.de/v2/shorten";

async function shortenLink(url_api, link) {
    if (link == "" || link === null) {
        shortenInput.classList.add("empty");
        emptyMessage.classList.remove("hidden");
        return
    }

    shortenInput.classList.remove("empty");
    emptyMessage.classList.add("hidden");

    const request = await fetch(`${url_api}?url=${link}`)
        .then(response => response.json())
        .then(data => data.result)
        .catch(error => console.log(error));

    const shortenLink = await request.full_short_link;

    // DOM Output =>    
    const outputCode = 
    `<p class="output__original-url">${link}</p>

    <div class="wrapper">
        <a href="${shortenLink}" class="output__shortened-url">${shortenLink}</a>
        <button type="button" class="output__btn">Copy</button>
    </div>`;

    const outputDiv = document.createElement("div");
    outputDiv.classList.add("output");
    outputDiv.innerHTML = outputCode;
    outputContainer.appendChild(outputDiv);

    const copyBtn = document.querySelector(".output__btn");
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(shortenLink);
        copyBtn.innerText = "Copied!";
        copyBtn.classList.add("copied");
    }

    sessionStorage.setItem(`${counter}`, outputCode);
}

// Keeping the url shortened in the page after reloading with sessionStorage
let counter = sessionStorage.length;

shortenBtn.onclick = () => {
    shortenLink(URL_API, shortenInput.value);
    counter++;
}

window.onload = () => {
    sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer");

    if (sessionStorage.length >= 1) {
        for (prop of Object.keys(sessionStorage)) {
            const cachedDiv = document.createElement("div");
            cachedDiv.classList.add("output");
            cachedDiv.innerHTML = sessionStorage.getItem(prop);
            outputContainer.appendChild(cachedDiv);
        }
    }
}