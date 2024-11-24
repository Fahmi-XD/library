document.addEventListener("DOMContentLoaded", () => {
  const books = document.querySelector(".main .sections.home");
  const form = document.querySelector(".form");
  const btn_search = document.querySelector(".btn-search");
  const btn_menu = document.querySelectorAll(".slide button");
  const input_search = document.querySelector(".form .search");
  const random_search = ["Anime", "Motivation", "Action", "Romantic", "Sad", "How to cook", "Comic"]
  const rnd = random_search[Math.floor(Math.random() * random_search.length) - 1]

  let current_page = 1;
  let current_search = rnd;
  let splide;
  
  setBooks("0", rnd)
  new Typed('.typing', {
    strings: ["Action", "Comic", "Story"],
    typeSpeed: 50,
    backSpeed: 40,
    cursorChar: '|',
    smartBackspace: true,
    loop: true,
    backDelay: 5000,
  });

  splide = new Splide( '.splide', {
    type: 'slide',
    arrows: false,
    pagination: false,
    updateOnMove: true,
    speed: 1000,
    autoScroll: false,
  } );
  
  splide.mount( window.splide.Extensions );

  btn_menu.forEach(v => {
    v.addEventListener("click", () => {
      const menu = v.getAttribute("data-section")
      console.log(menu)
      changeMenu(menu)
    })
  })

  async function getBooks(index, query) {
    try {
      const enc_query = encodeURIComponent(query)
      const list = await fetch(`http://localhost:3000/search?query=${enc_query}&page=${index}`)
      const load = await list.json();
      // console.log(load.result)
      let html_tmp = ""
      load.result.forEach(v => {
        html_tmp += `<a href="${v.link}"><div class="book">
<img class="cover" src="${v.thumbnail}" alt="Cover" />
  <div class="sub">
    <h4 class="judul">${v.title.substring(0, 8) + "..."}</h4>
    <p class="author">${v.author?.substring(0, 7) + "..."}</p>
  </div>
</div></a>`
      })

      if (index == "0") {
        books.innerHTML = html_tmp
      } else {
        books.innerHTML += html_tmp
      }
      console.log(books.clientHeight)
      // startObserver()
    } catch (e) {
      console.log(e)
    }
  }

  async function setBooks(index, query) {
    await getBooks(index, query)
    if (index == "0") {
      startObserver(false)
    } else {
      startObserver(true)
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const val = input_search.value
    input_search.value = ""
    current_search = val
    setBooks("0", val)
  })
  
  btn_search.addEventListener("click", () => {
    const val = input_search.value
    input_search.value = ""
    current_search = val
    setBooks("0", val)
  })

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  function useDebounce(func) {
    let time_out;

    return (...args) => {
      clearTimeout(time_out)

      time_out = setTimeout(() => {
        func(...args)
      }, 500)
    }
  }

  const deb = useDebounce(async () => {
    console.log(true);
    current_page++
    setBooks((current_page).toString(), current_search)
  })

  function handleIntersect(entries, _) {
    // console.log(entries[0].intersectionRatio)
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.0) {
        // console.log(true)
        deb()
      }
      // if (entry.intersectionRatio > prevRatio) {
      //   entry.target.style.backgroundColor = increasingColor.replace(
      //     "ratio",
      //     entry.intersectionRatio,
      //   );
      // } else {
      //   entry.target.style.backgroundColor = decreasingColor.replace(
      //     "ratio",
      //     entry.intersectionRatio,
      //   );
      // }
  
      // prevRatio = entry.intersectionRatio;
    });
  }  
  
  let observer;
  function startObserver(continues = false) {
    if (!continues) {
      observer = new IntersectionObserver(handleIntersect, options);
    }
    
    observer.observe(document.querySelectorAll(".book")[document.querySelectorAll(".book").length - 1])
  }

  function changeMenu(menu) {
    switch (menu) {
      case "library":
        splide.go(0)
        break
      case "manga":
        splide.go(1);
        break
      case "comic":
        splide.go(2)
        break
      case "trending":
        splide.go(3)
        break
      case "other":
        splide.go(4)
        break
    }
  }
})