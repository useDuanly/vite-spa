export function Post(props) {
  let { content, title, date } = props[0];
  //console.log(props);
  let dataFormat = new Date(date).toDateString(); //console.log(props[0]);
  const obj = (props ?? {})[0];
  console.log(obj);

  const $noSeVe = document.createElement("section"),
    $section = document.createElement("section"),
    $h2 = document.createElement("h2"),
    $article = document.createElement("article"),
    $time = document.createElement("time"),
    $articleContent = document.createElement("article"),
    $hr = document.createElement("hr"),
    $fragment = document.createDocumentFragment();

  $section.classList.add("post-page");
  $fragment.appendChild($section);
  $h2.innerHTML = `${title.rendered}`;
  $section.appendChild($h2);
  $article.appendChild($h2);
  $section.appendChild($article);
  $time.setAttribute("datetime", `${date}`);
  $section.appendChild($hr);

  $time.textContent = `${dataFormat}`;
  $article.appendChild($time);
  $section.appendChild($articleContent);

  $articleContent.innerHTML = `${content.rendered}`;

  $noSeVe.appendChild($fragment);

  return $noSeVe;

  /*  return `
  <section class="post-page>
  <h2>${title.rendered}</h2>
    <article>
    <time datetime="${date}">${dataFormat}</time>
   </article>
    <hr>
    <article>${content.rendered}</article>
  </section>
  `; */
}
