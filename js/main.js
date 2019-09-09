const btn = document.getElementById("ip-search-btn");

btn.addEventListener("click", async function () {
    const ipResponse = await fetch("https://api.ipify.org/?format=json");

    const ip = await ipResponse.json();

    const geoResponse = await fetch(`http://ip-api.com/json/${ip.ip}?lang=ru&fields=continent,country,region,city,district`);

    const geoLocation = await geoResponse.json();

    const infoList = document.createElement("ul");
    infoList.setAttribute("id", "info-list");

    for (let [key, value] of Object.entries(geoLocation)) {
        infoList.innerHTML += `<li>${key} : ${value}</li>`;
    }

    if (!document.getElementById("info-list")) {
        btn.after(infoList);
    } else {
        document.body.replaceChild(infoList, document.getElementById("info-list"))
    }
});