export function PostCard(props) {
  // console.log(props);
  const { date, id, title, slug, _embedded } = props;
  //console.log(props);

  let dataFormat = new Date(date).toDateString(),
    urlPoster = _embedded["wp:featuredmedia"]
      ? _embedded["wp:featuredmedia"][0].source_url
      : "app/assets/leo.jpg";

  return `
    <acticle class="post-card">
     <img src="${urlPoster}" alt="${title.rendered}" />
     <h2>${title.rendered} </h2>
     <p>
      <time datetime="${date}">${dataFormat}</time>
      <a href="#/${slug}" data-id="${id}">Ver Publicacion</a>
     </p>
    </acticle>
  `;
}
