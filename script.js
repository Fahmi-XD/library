document.addEventListener("DOMContentLoaded", () => {
  const books = document.querySelector(".main .books");
  
  new Typed('.typing', {
    strings: ["Action", "Comic", "Story"],
    typeSpeed: 50,
    backSpeed: 40,
    cursorChar: '|',
    smartBackspace: true,
    loop: true,
    backDelay: 5000,
  });

  async function getBooks(index, query) {
    try {
      const enc_query = encodeURIComponent(query)
      const list = await fetch(`http://localhost:3000/search?query=${enc_query}`)
      const load = await list.json();
      console.log(load.result)
      load.result.forEach(v => {
        books.innerHTML += `<div class="book">
<img class="cover" src="${v.thumbnail}" alt="Cover" />
  <div class="sub">
    <h4 class="judul">${v.title.substring(0, 8) + "..."}</h4>
    <p class="author">${v.author.join(", ").substring(0, 15) + "..."}</p>
  </div>
</div>`
      })
    } catch (e) {
      console.log(e)
    }
  }

  getBooks("", "coding")
})