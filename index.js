//const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const base_url = "https://api.frankfurter.app/latest?from=";

const drop = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");

const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const messege = document.querySelector(".msg");

for (let select of drop) {
  for (let currcode in countryList) {
    let newop = document.createElement("option");
    newop.innerText = currcode;
    newop.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newop.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newop.selected = "selected";
    }
    select.append(newop);
  }
  select.addEventListener("change", (obj) => {
    updateflag(obj.target);
  });
}

const updateflag = (element) => {
  let currcode = element.value;

  let countrycode = countryList[currcode];
  let newsource = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let imgg = element.parentElement.querySelector("img");
  imgg.src = newsource;
};

btn.addEventListener("click", (obj) => {
  obj.preventDefault();
  updatepage();
});

const updatepage = async () => {
  let amount = document.querySelector("input");
  let amountval = amount.value;
  if (amountval === "" || amountval < 1) {
    amount.value = "1";
    amountval = 1;
  }

  const mainurl = `${base_url}${fromcurr.value.toLowerCase()}&to=${tocurr.value.toLowerCase()}`;
  //const mainurl = `${base_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
  let reponse = await fetch(mainurl);
  let originaldata = await reponse.json();
  let rate = originaldata.rates[tocurr.value];

  let finalamount = amountval * rate;
  messege.innerText = `${amountval} ${fromcurr.value}=${finalamount}${tocurr.value}`;
};

window.addEventListener("load", () => {
  updatepage();
});