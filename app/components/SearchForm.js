export function SeachForm() {
  const d = document,
    $form = d.createElement("form"),
    $input = d.createElement("input"),
    $fragment = d.createDocumentFragment();
  $form.classList.add("search-form");
  $input.name = "search";
  $input.type = "search";
  $input.placeholder = "Buscar...";
  $fragment.appendChild($input);
  $form.appendChild($fragment);
  $input.autocomplete = "on";

  if (location.hash.includes("#/search")) {
    $input.value = localStorage.getItem("wpSearch");
  }
  d.addEventListener("keyup", (e) => {
    if (!e.target === $input) return false;

    if (e.target === $input) {
      console.log($input.value);
      if ($input.value.length === 0) {
        document.querySelector(".error").style.display = "none";
      }
    }
  });

  d.addEventListener("search", (e) => {
    if (!e.target.matches("input[type='search']")) return false;
    console.log(e);

    //Elimina el lo que esta en el search elimino de localStorage
    if (!e.target.value) localStorage.removeItem("wpSearch");
    if (!e.target.value)
      document.querySelector(".error").style.display = "none";
  });

  d.addEventListener("submit", (e) => {
    if (!e.target.matches(".search-form")) return false;
    e.preventDefault();
    //console.log(e);
    //console.log(e.target.search.value);
    localStorage.setItem("wpSearch", e.target.search.value);
    location.hash = `#/search?search=${e.target.search.value}`;
    //console.log(location.hash);
  });

  return $form;
}
