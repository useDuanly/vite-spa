import api from "../helpers/wp_api.js";
import { PostCard } from "./PostCard.js";
import { Post } from "./Post.js";
import { SearchCard } from "./SearchCard.js";
import { ajax } from "../helpers/ajax.js";
import { ContactForm } from "./ContactForm.js";

export async function Router() {
  const d = document,
    w = window,
    $main = d.getElementById("main");
  let apiURL, Component;

  let { hash } = location;

  //console.log(hash);

  $main.innerHTML = null;
  //Home
  if (!hash || hash === "#/") {
    await ajax({
      url: `${api.POSTS}`,
      cbSuccess: (posts) => {
        let html = "";
        //console.log(posts);
        posts.forEach((post) => (html += PostCard(post)));
        //console.log(html);
        $main.innerHTML = html;
      },
    });
    //SearchCard
  } else if (hash.includes("#/search")) {
    //Contacto
    let query = localStorage.getItem("wpSearch");
    if (!query) {
      document.querySelector(".loader").style.display = "none";
      return false;
    }
    apiURL = `${api.SEARCH}/${query}`;
    await ajax({
      url: apiURL,
      cbSuccess: (search) => {
        //console.log(search);
        let html = "";
        if (search === null) {
          d.querySelector(".error").style.display = "none";
        }

        if (search.length === 0) {
          html = `
          <p class="error">
          No existen resultados de busqueda para el termino <mark>${query}</mark>
          </p>
          `;
        } else {
          search.forEach((post) => (html += SearchCard(post)));
        }
        //console.log(html);
        $main.innerHTML = html;
      },
    });

    //console.log(query);
  } else if (hash.includes("#/contacto")) {
    $main.appendChild(ContactForm());
    //Post pintarlo en la interfaced
  } else {
    //console.log(`${api.POST}?slug=${hash.slice(2)}`);
    // `${api.POST}/${localStorage.getItem("wpPostId")}`
    await ajax({
      url: `${api.POST}?slug=${hash.slice(2)}`,
      cbSuccess: (link) => {
        console.log(link);

        $main.appendChild(Post(link));
      },
    });
  }
  document.querySelector(".loader").style.display = "none";
}
