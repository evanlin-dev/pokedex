/*
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
*/
// Create an array for the pokemon
const getPokemon = async (currentPage) => {
  let arr = [];
  for (let i = 1*currentPage; i <= 24*currentPage; i++) {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).
      then(
        res => {
          let pokemon = res.data;
          arr.push({...pokemon});
        });
    }    
  return arr;
}

// Render the display
const renderDisplay = async (currentPage) => {
  getPokemon(currentPage).then(pokeArr => {
    // Create row
    var row = document.createElement('div');
    row.setAttribute('class', 'row row-cols-1 row-cols-sm-3 row-cols-md-6 g-0 pokemon-container')
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
      row.appendChild(col)
    })
    document.getElementById('listingTable').appendChild(row)
  });
}


var current_page = 1;
var records_per_page = 12;

var objJson = getPokemon(current_page);

function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";

    renderDisplay(current_page);
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
    return Math.ceil(objJson.length / records_per_page);
}

window.onload = function() {
    changePage(1);
};