const inpSearch = document.querySelector("#inpSearch");
const contentBox = document.querySelector(".content");

let names = [];
let descriptions = [];

const fetchData = async (name) => {
  if (!name) return;

  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    names.push(name);
    descriptions.push(data.description || "No description available");

    contentBox.innerHTML = names
      .map((ind, key) => {
        return `
        <div class="data">
          <b>${ind}</b>
          <p>${descriptions[key]}</p>
        </div>
      `;
      })
      .join("");
  } catch (err) {
    console.log(err);
  }
};

inpSearch.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchData(inpSearch.value);
    inpSearch.value = "";
  }
});
