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
  if(currentPage == 1){
    for (let i = 1; i <= 24; i++) {
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).
        then(
          res => {
            let pokemon = res.data;
            arr.push({...pokemon});
          });
      }    
  }
  else {
    for (let i = 24*(currentPage-1)+1; i <= 24*currentPage; i++) {
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).
        then(
          res => {
            let pokemon = res.data;
            arr.push({...pokemon});
          });
      }    
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

      // Modal
      var modal = document.createElement('div');
      modal.setAttribute('class', 'modal fade');
      modal.setAttribute('id', 'pokemon-modal');
      modal.setAttribute('tabindex', '-1');
      modal.setAttribute('aria-labelledby', 'pokemon-modal-label');
      modal.setAttribute('aria-hidden', 'true');

      var modalDialog = document.createElement('div');
      modalDialog.setAttribute('class', 'modal-dialog');

      var modalContent = document.createElement('div');
      modalContent.setAttribute('class', 'modal-content');

      var modalHeader = document.createElement('div');
      modalHeader.setAttribute('class', 'modal-header');

      var modalBody = document.createElement('div');
      modalBody.setAttribute('class', 'modal-body');
      modalBody.innerHTML = pokeNameUpper;

      var modalTitle = document.createElement('h5');
      modalTitle.setAttribute('class', 'modal-title');
      modalTitle.setAttribute('id', 'pokemon-modal-label');
      modalTitle.innerHTML = pokeNameUpper;

      var btnClose = document.createElement('btn');
      btnClose.setAttribute('class', 'btn-close');
      btnClose.setAttribute('type', 'button');
      btnClose.setAttribute('data-bs-dismiss', 'modal');
      btnClose.setAttribute('aria-label', 'Close')

      // Button
      var btn = document.createElement('button');
      btn.setAttribute('class', 'btn btn-primary');
      btn.setAttribute('data-bs-toggle', 'modal');
      btn.setAttribute('data-bs-target', '#pokemon-modal');
      btn.setAttribute('type', 'button');
      btn.innerHTML = 'Info';

      // Append
      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(btnClose);
      modalContent.appendChild(modalHeader);
      modalContent.appendChild(modalBody);
      modalDialog.appendChild(modalContent);
      modal.appendChild(modalDialog);

      // Card title
      var cardTitle = document.createElement('h5');
      cardTitle.setAttribute('class', 'card-title')
      cardTitle.appendChild(document.createTextNode(pokemon.id + ') ' + pokeNameUpper))

      // Append to card
      cardBody.appendChild(modal);
      cardBody.appendChild(btn);
      cardBody.appendChild(cardTitle)
      card.appendChild(cardBody);

      // Append them to the col
      var col = document.createElement('div');
      col.setAttribute('class', 'col');
      col.appendChild(card);
      row.appendChild(col)
    })
    document.getElementById('listing-table').appendChild(row)
  });
}

var current_page = 1;
var recordsPerPage = 24;

var objJson = getPokemon(current_page);
console.log(objJson);


function prevPage()
{
  current_page--;
  changePage(current_page);
}

function nextPage()
{ 
  current_page++;
  changePage(current_page);
}

function changePage(page)
{
  var btnPrev = document.getElementById('btn-prev');
  var btnNext = document.getElementById('btn-next');
  var listing_table = document.getElementById('listing-table');
  var page_span = document.getElementById('page');

  // Validate page
  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();

  listing_table.innerHTML = '';

  renderDisplay(page);
  page_span.innerHTML = page;

  if (page == 1) {
    btnPrev.style.visibility = 'hidden';
  } else {
    btnPrev.style.visibility = 'visible';
  }

  if (page == numPages()) {
    btnNext.style.visibility = 'hidden';
  } else {
    btnNext.style.visibility = 'visible';
  }
}

function numPages()
{
    return Math.ceil(objJson.length / recordsPerPage);
}

window.onload = function() {
    changePage(1);
};
