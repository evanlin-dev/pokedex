
const getPokemon = async () => {
  let arr = [];
  for (let i = 1; i <= 24 ; i++) {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).
      then(
        res => {
          let pokemon = res.data;
          arr.push({...pokemon});
        });
    }    
  return arr;
}


var currentPage = 1;
var recordsPerPage = 2;

const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    changePage(currentPage);
  }
}

const nextPage = () => {
  if (currentPage < numPages()) {
    currentPage++;
    changePage(currentPage);
  }
}

const changePage = (page) => {
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  var listing_table = document.getElementById("listingTable");
  var page_span = document.getElementById("page");

  // Validate page
  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();

  listing_table.innerHTML = "";

  for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
    listing_table.innerHTML += objJson[i].adName + "<br>";
  }
  page_span.innerHTML = page;

  if (page == 1) {
    btn_prev.style.visibility = "hidden";
  } else {
    btn_prev.style.visibility = "visible";
  }

  if (page == numPages()) {
    btn_next.style.visibility = "hidden";
  } else {
    btn_next.style.visibility = "visible";
  }
}

function numPages()
{
  return Math.ceil(objJson.length / recordsPerPage);
}

/*
window.onload = function() {
  changePage(1);
};
*/

getPokemon().then(pokeArr => {
  pokeArr.forEach((pokemon) => {
    // Create card and sprite
    var card = document.createElement('div');
    var sprite = document.createElement('img');

    // Capitalize first letter
    const pokeNameUpper = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);

    // Set values of card and sprite
    sprite.setAttribute('src', pokemon.sprites.front_default);
    sprite.setAttribute('class', 'card-img-top');
    card.appendChild(sprite)

    // Set class and style of the card
    card.setAttribute('class', 'card')
    card.setAttribute('style', 'width: 15rem;')

    // Card body
    var cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');

    // Card title
    var cardTitle = document.createElement('h5');
    cardTitle.setAttribute('class', 'card-title')
    cardTitle.appendChild(document.createTextNode(pokemon.id + ') ' + pokeNameUpper))

    // Append to card
    cardBody.appendChild(cardTitle)
    card.appendChild(cardBody);

    // Append them to the col
    var col = document.createElement('div');
    col.setAttribute('class', 'col');
    col.appendChild(card);
    document.getElementById('pokemon-container').appendChild(col)
  })
});
