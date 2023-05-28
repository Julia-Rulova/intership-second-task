let queryValue = document.getElementById("party");
let suggestions = document.querySelector(".suggestions");
let arrData;

suggestions.style = "display: none";

let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
const apiKey = 'a539e4b9c0a97368ba7b2af7b371fc38d6d2b05f';

let options = {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + apiKey
    }
};

function setData(el) {
    suggestions.style = "display:none";
    queryValue.value = el.value;
}

function fetchQuery(val) {
    if (val != "") {
        fetch(url, {
            ...options,
            body: JSON.stringify({ query: val })
        })
            .then((res) => res.json())
            .then((res) => {
                suggestions.innerHTML = "";
                console.log(res)
                arrData = res.suggestions;

                suggestions.style = "display: block"

                arrData.forEach((el) => {
                    let li = document.createElement("li");
                    li.classList.add("suggestions-item");
                    li.innerText = el.value;
                    suggestions.appendChild(li);
                    li.addEventListener("click", () => setData(el));
                })
            })
            .catch(error => console.log("error", error));
    }

    suggestions.style = "display: none"
}

queryValue.addEventListener("input", (evt) => fetchQuery(evt.target.value));