let box = document.querySelector(".box");
let searchbtn = document.querySelector(".navbar-button");
let search = document.querySelector("#search-input");
let abt = document.querySelector("#about");
let page = document.querySelector(".page");
let pagenumber = 1;
let totalpage;

let prevbtn = document.createElement("button");
let nextbtn = document.createElement("button");
let pgno = document.createElement("p");

prevbtn.innerHTML = "Previous";
nextbtn.innerHTML = "Next";
pgno.innerHTML = `Page ${pagenumber}`;

let f = async (val, pagenumber) => {
  box.innerHTML = ``;
  abt.style.display = "none";
  let res = await fetch(
    `http://www.omdbapi.com/?s=${val}&apikey=d58742b6&page=${pagenumber}`
  );
  let data = await res.json();
  if (data.Response === "True") {
    let arr = data.Search;
    arr.forEach((ele) => {
      let psdiv = document.createElement("div");
      let contdiv = document.createElement("div");
      let img = document.createElement("img");
      let h2 = document.createElement("h2");
      let type = document.createElement("p");
      let year = document.createElement("p");

      psdiv.className = "image-div";
      contdiv.className = "content-div";
      img.src = `${ele.Poster}`;
      psdiv.append(img);

      h2.innerHTML = `${ele.Title}`;
      type.innerHTML = `${ele.Type}`;
      year.innerHTML = `${ele.Year}`;

      contdiv.append(h2, type, year);
      box.append(psdiv, contdiv);
    });

    totalpage = Math.ceil(parseInt(data.totalResults) / 10);
    pgno.innerHTML = `Page ${pagenumber} of ${totalpage}`;

    prevbtn.style.display = pagenumber > 1 ? "inline" : "none";
    nextbtn.style.display = pagenumber < totalpage ? "inline" : "none";
    page.innerHTML = "";

    pgno.innerHTML = `Page ${pagenumber} of ${totalpage}`;
    page.append(prevbtn, pgno, nextbtn);
  } else {
    box.innerHTML = `<p>No results found for "${val}".</p>`;
  }
};
searchbtn.addEventListener("click", () => {
  let val = search.value;
  f(val, pagenumber);
});

prevbtn.addEventListener("click", () => {
  let val = search.value;
  if (pagenumber > 1) {
    pagenumber -= 1;
    f(val, pagenumber);
  }
});

nextbtn.addEventListener("click", () => {
  let val = search.value;
  if (pagenumber <= totalpage) {
    pagenumber += 1;
    f(val, pagenumber);
  }
});
