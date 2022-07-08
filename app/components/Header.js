import { Title } from "./Title.js";
import { Menu } from "./Menu.js";
import { SeachForm } from "./SearchForm.js";

export function Header() {
  const $header = document.createElement("header");
  $header.classList.add("header");
  $header.appendChild(Title());
  $header.appendChild(Menu());
  $header.appendChild(SeachForm());

  return $header;
}
