let PCards = document.querySelector(".products-container");
let total = document.querySelector(".total");
function getData(url) {
  let r = new XMLHttpRequest();
  r.onload = function () {
    if (r.readyState == 4 && r.status == 200) {
      let D = JSON.parse(r.responseText);
      total.innerHTML = D.total;
      let datatProducts = D.products;
      PCards.innerHTML = " ";
      datatProducts.map(function (e) {
        PCards.innerHTML += `
    <div class="product-card">
        <img
          class="product-img"
          src="${e.thumbnail}"
          alt=""
          max-width="300px"
          height="300px"
        />
        <div class="data">
          <h3 class="title">${e.title}</h3>

          <p class="description">
            ${e.description}
          </p>

          <p class="price">price : <span class="value">${e.price}</span> $</p>

          <div class="btns">
            <button class="add-btn">
              <i class="fa-solid fa-cart-shopping"></i> add to cart
            </button>
            <button class="view-btn">
              <i class="fa-solid fa-eye"></i> view
            </button>
          </div>
        </div>
      </div>
    
    `;
      });
    }
  };
  r.open("GET", url, true);
  r.send();
}
let select = document.querySelector("select");
let res = new XMLHttpRequest();
res.onload = function () {
  if (res.readyState == 4 && res.status == 200) {
    let D = JSON.parse(res.responseText);
    console.log(D);
    D.map(function (e) {
      select.innerHTML += `
            <option value="${e.url}">${e.name}</option>
    `;
    });
  }
};
res.open("GET", "https://dummyjson.com/products/categories", true);
res.send();
getData("https://dummyjson.com/products");
select.addEventListener("change", (e) => {
  if (e.target.value == "All") getData("https://dummyjson.com/products");
  else getData(e.target.value);
});

let input = document.querySelector("#inp");
input.addEventListener("input", (e) => {
  getData(`https://dummyjson.com/products/search?q=${e.target.value}`);
});
