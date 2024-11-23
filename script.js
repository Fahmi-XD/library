document.addEventListener("DOMContentLoaded", () => {
  new Typed('.typing', {
    strings: ["Romantic", "Action", "Comic", "Story"],
    typeSpeed: 50,
    backSpeed: 40,
    cursorChar: '|',
    smartBackspace: true,
    loop: true,
    backDelay: 5000,
  });

  async function googleEbook(index, query) {
    const enc_query = encodeURIComponent(query)
    const list = await fetch(`https://www.googleapis.com/books/v1/volumes?filter=ebooks&maxResult=40&startIndex=2&q=${enc_query}`)
    const load = await list.json();
    console.log(load)
  }

  async function isbndbEbook(index, query) {
    const enc_query = encodeURIComponent(query)
    const list = await axios.get(`https://isbndb.com/search/books?search_param=books&x=${enc_query}`)
    const load = await list.data;
    const parser = new DOMParser();
    const doc = parser.parseFromString(load, 'text/html');
    const title = doc.querySelectorAll(".search-result-title")
    title.forEach(v => {
      console.log(v.textContent)
    })
  }

  isbndbEbook("", "motivasi")
})