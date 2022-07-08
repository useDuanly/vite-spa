import { PostCard } from "../components/PostCard.js";
import { SearchCard } from "../components/SearchCard.js";
import { ajax } from "./ajax.js";
import api from "./wp_api.js";

export async function infiniteScrollY() {
  // optengo el valor
  let query = localStorage.getItem("wpSearch"),
    apiUL,
    Component; //High Ordr Component

  window.addEventListener("scroll", async () => {
    let { scrollTop, clientHeight, scrollHeight } = document.documentElement,
      { hash } = window.location;
    let scrollTopCeil = Math.ceil(scrollTop);
    /*  console.log(scrollTopCeil);
    console.log(clientHeight);
    console.log(scrollHeight); */

    if (scrollTopCeil + clientHeight >= scrollHeight) {
      api.page++;
      //PostCard
      if (!hash || hash === "#/") {
        apiUL = `${api.POSTS}&page=${api.page}`;
        Component = PostCard;
      } else if (hash.includes("#/search")) {
        //SearchCard
        apiUL = `${api.SEARCH}${query}&page=${api.page}`;
        Component = SearchCard;
      } else {
        return false;
      }
      document.querySelector(".loader").style.display = "block";
      await ajax({
        url: apiUL,
        cbSuccess: (posts) => {
          //console.log(posts);
          let html = "";
          posts.forEach((post) => (html += Component(post)));

          // let cologo insertAdjacentHTML papra que iiserter despures de su otro contedindo
          document.getElementById("main").insertAdjacentHTML("beforeend", html);
          console.log(html.length);
        },
      });
    }
  });
}
