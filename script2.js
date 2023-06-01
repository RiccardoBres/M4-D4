/*
Da finalizzare. 
Necessario impostare un organizzazione dei button. 
All'interno della modale è necessario avere un bottone per rimuovere dal carrello
La struttura della modale impostata correttamente
Lo stile della pagina va rivisto

*/ 



let BooksEnpoint = "https://striveschool-api.herokuapp.com/books"
let allBooks = [];
let myCards = document.getElementById("container");
let modalContent = document.getElementById("contentCard");
let dettagli = document.getElementById("booksDettails");
let searchButton = document.getElementById("button");
let counter = document.getElementById("counter");
let count = parseInt(counter.innerText);


if (window.location.search) {
    const params = new URLSearchParams(window.location.search);
    if (params.has("q")) {
      const id = params.get("q");
      fetch(BooksEnpoint + `/${id}`)
        .then(res => res.json())
        .then(detailsBook => createBooksDetails(detailsBook) )
        .catch(error => {
          console.log("Attention! Error description: " + error);
        });
    } else {
      console.log("Missing 'q' parameter in the query string");
    }
  }


function callFetch() {
  fetch(BooksEnpoint)
    .then((response) => response.json())
    .then((json) => {
      allBooks = json;
      cycle(allBooks);
    })
    .catch((err) => console.log(err));
}



function cycle(json) {
  //creazione filtraggio per ricerca con titoli superiori di tre lettere 
  json.forEach(books => {
        createCard(books)
    });  
}


//creazione card 
function createCard(json) {
    
    

    /////CREAZIONE STRUTTURA CARD///////
    console.log(json);
    let book = document.createElement("div");
    book.classList.add("card", "col-sm-6", "col-md-4", "col-lg-2", "m-2", "bg-dark", "mt-4")
    let title = document.createElement("h5");
    title.innerText = json.title;
    title.classList.add("text-light")
    let img = document.createElement("img");
    img.classList.add("img-fluid")
    img.src = json.img

    let dettails = document.createElement("a");
    dettails.href = `index.html?q=${json.asin}`;
    dettails.innerText = "Dettagli";
    
    ////CREAZIONE BOTTONI CARD//////

    //bottone di aggiunta al carrello
    let buttonAdd = document.createElement("button");
    buttonAdd.type = "button";
    buttonAdd.innerText = "aggiungi al carrello";
    buttonAdd.classList.add("btn", "btn-primary", "bottoni", "m-1")
    buttonAdd.addEventListener("click", function () {
        book.classList.add("border-yellow", "transition-scale",);
        book.classList.remove("border-dark", "transition-scale2");
        let selectedCard = this.parentNode;
        let cardCopy = selectedCard.cloneNode(true); // Crea una copia della card selezionata
        cardCopy.classList.remove("transition-scale", "border-yellow");
        cardCopy.classList.add("modalCards", "col-sm-6", "col-md-4", "col-lg-2", "d-flex");
        modalContent.appendChild(cardCopy); // Aggiungi la copia della card al contenuto della modale
        count += 1;
        counter.innerText = count;
    })

    //bottone per rimuovere dal carrello
    let buttonRemove = document.createElement("button");
    buttonRemove.type = "button";
    buttonRemove.innerText = "Prossimo";
    buttonRemove.classList.add("btn", "btn-primary", "m-1", "mb-2")
    buttonRemove.addEventListener ("click", function () {
        book.classList.add("border-dark", "transition-scale2")
        book.remove();
        count -= 1;
        if (count = 0 ) {
          count = 0;

        }
        counter.innerText = count;
       
    })




    book.appendChild(title);
    book.appendChild(img);
    book.appendChild(buttonAdd);
    book.appendChild(buttonRemove);
    book.appendChild(dettails);
    myCards.appendChild(book);
    
}





// Collega il gestore di eventi al clic sull'icona del carrello
document.getElementById("icon").addEventListener("click", function() {
    // Mostra la modale del carrello
    $('#myCartModal').modal('show');
}) 


function createBooksDetails(detailsBook) {

    myCards.classList.add("d-none")
    let div = document.createElement("div");
    div.classList.add("card","bg-dark", "mt-4", "w-25","text-center");

    let title = document.createElement("p");
    title.innerText = detailsBook.title;
    title.classList.add("text-light", "mt-3")

    let categoria = document.createElement("p")
    categoria.innerText= "CATEGORIA:"+ " " + detailsBook.category
    categoria.classList.add("text-light",)
  
    let price = document.createElement("p");
    price.textContent = "PREZZO:" + " " + detailsBook.price;
    price.classList.add("text-light")
  
    let image = document.createElement("img");
    image.src = detailsBook.img;
    image.classList.add("img-fluid" ,"w-15")
  
    div.appendChild(image);
    div.appendChild(title);
    div.appendChild(categoria);
    div.appendChild(price);
    dettagli.appendChild(div);
    
  }

  searchButton.addEventListener("click", () => {
   
    let buttonValue = document.getElementById("searchInput").value.toLowerCase();
    let filteredBooks = allBooks.filter((element) => {
      return element.title.toLowerCase().includes(buttonValue);
    });
  
    // Rimuovi le card esistenti prima di creare le nuove card filtrate
    myCards.innerHTML = "";
  
    // Crea le card solo per i libri filtrati
    filteredBooks.forEach((book) => {
      createCard(book);
    });
  }); 

 

  



callFetch();



