let api = "https://striveschool-api.herokuapp.com/books";
let dettailsApi = "https://striveschool-api.herokuapp.com/books/";
let container = document.getElementById("container");
let buttonGo = document.getElementById("button");
let buttonDeleteCart = document.getElementById("delete")
let lista = document.getElementById("lista");
lista.classList.add("d-none")
let listaCarrello = document.getElementById("icon")
let bookDettails = document.getElementById("booksDettails")



if(window.location.search) { 
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q"); // Ottenete l'id come number/string
  //Eseguo AJAX verso l'endpoint dedicato agli artisti endpointArtistUrl (questo accetta come slug l'id dell'artista da cercare che sarebbe il valore che ho salvato in query):
    fetch(dettailsApi + query)
    .then(res => res.json()) // Promise
  //Lancio una funzione ad hoc per costruire il template del nuovo oggetto artista:
    .then(dettails => createDettails(dettails)) 
    .catch((error) => { 
        console.log("Attention! Error description: " + error);
    })
}


//questa funzione permette di svolgere la chiamata fech. Nel caso in cui vada a buon fine restituirà la funzione createDiv
function callFetch() {
    fetch(api)
        .then((response) => response.json())
        .then((data) => createDiv(data))
        .catch((err) => console.log(err))
}
//questa funzione permette di elaborare i dati ottenuti attraverso la chiamata fetch.
function createDiv(data) {

    //creazione filtraggio per ricerca con titoli superiori di tre lettere 
    let buttonSurch = document.getElementById("searchButton").value.toLowerCase();
    let filteredBook = data.filter((element)=> {return element.title.toLowerCase().includes(buttonSurch)})

    //queste sono due variabili di appoggio per il contatore degli elementi selezionati 
    let counter = document.getElementById("counter");
    let count = parseInt(counter.innerText);

    // Rimuovi i contenuti precedenti del container
    container.innerHTML = "";

    filteredBook.forEach(element => {
        console.log(element);
        //creazione variabile conteggio lista 
        let selectedTitle;
        //creazione del div card
        let card = document.createElement("div");
        card.classList.add("card", "col-sm-6", "col-md-4", "col-lg-2", "m-2", "bg-dark", "mt-4")
        //titolo
        let title = document.createElement("p");
        title.innerText = element.title;
        title.classList.add("text-light")
        //immagine
        let image = document.createElement("img");
        image.src = element.img;
        image.classList.add("img-fluid");
        //creazione div che conterrà i bottoni
        let divBotton = document.createElement("div")
        divBotton.classList.add("mt-auto", "d-flex", "justify-content-center", "flex-column")
        //bottone di aggiunta al carrello
        let buttonAdd = document.createElement("button");
        buttonAdd.type = "button";
        buttonAdd.innerText = "aggiungi al carrello";
        buttonAdd.classList.add("btn", "btn-primary", "bottoni", "m-1")
        divBotton.appendChild(buttonAdd);
        //add event listner applicato al bottone che permetterà di modificare il bordo della card per dare l'impressione che sia stato aggiunto al carrello 
        buttonAdd.addEventListener("click", function () {
            card.classList.add("border-yellow", "transition-scale",);
            card.classList.remove("border-dark", "transition-scale2");
            //definiamo il contatore impostato come p all'interno del dom 
            count += 1;
            counter.innerText = count.toString();
            //creiamo una lista che corrisponderà a tutti i libri inseriti nel carrello
            selectedTitle = element.title;
            let li = document.createElement("li");
            li.innerText = element.title;
            lista.appendChild(li);
        })
        //bottone per rimuovere dal carrello
        let buttonRemove = document.createElement("button");
        buttonRemove.type = "button";
        buttonRemove.innerText = "rimuovi dal carrello";
        buttonRemove.classList.add("btn", "btn-primary", "m-1", "mb-2")
        divBotton.appendChild(buttonRemove)
        //creazione addEventListner che permettere di rimuovere la selezione del carrello
        buttonRemove.addEventListener("click", function () {
            card.classList.add("border-dark", "transition-scale2");
                count -= 1;
                if (count<0){
                    count = 0;
                }
        counter.innerText = count.toString();
        //creazione rimozione titolo libro nella lista
        if (selectedTitle) {
            // Ricerca dell'elemento li corrispondente al titolo selezionato

            // Viene utilizzato il metodo Array.from per convertire la collezione di elementi figlio della lista in un array, 
            //quindi il metodo find viene utilizzato per cercare l'elemento li che ha un testo interno uguale al selectedTitle. 
            //Se viene trovato un elemento corrispondente, viene rimosso dalla lista utilizzando il metodo removeChild.
            let liToRemove = Array.from(lista.children).find(li => li.innerText === selectedTitle);
            if (liToRemove) {
                lista.removeChild(liToRemove);
        }}})        
        let divBottonNextDett = document.createElement("div");
        divBottonNextDett.classList.add("mt-auto", "justify-content-center");
        let buttonNext = document.createElement("button");
        buttonNext.type = "button";
        buttonNext.innerText = "Next";
        buttonNext.classList.add("btn", "btn-primary", "bottoni", "m-1")
        divBotton.appendChild(buttonNext)

        let buttonDettails = document.createElement("button");
        buttonDettails.type = "button";
        let link = document.createElement("a");
        link.href = `index.html?q=${element.asin.id}`;
        link.innerText = "Dettagli";
        link.classList.add("text-light")
        buttonDettails.appendChild(link);
        buttonDettails.classList.add("btn", "btn-primary", "bottoni", "m-1");
        divBotton.appendChild(buttonDettails)

        buttonNext.addEventListener ("click", () => { card.remove()})
        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(divBotton)
        container.appendChild(card);
        container.innerHTML

        })

        //questo addEventListner permette di eliminare la lista carrello creata
        /*In questo caso, stiamo selezionando tutti gli elementi con la classe "border-yellow" utilizzando document.getElementsByClassName("border-yellow"). 
        Quindi, convertiamo la HTMLCollection in un array utilizzando Array.from() per poter utilizzare il metodo forEach() e iterare su ciascun elemento per eliminare la classe desiderata.*/
        buttonDeleteCart.addEventListener("click", function(){
            lista.innerText = "";
            count = 0;
            counter.innerText = count.toString();
            let selectedCards = document.getElementsByClassName("border-yellow");
            Array.from(selectedCards).forEach(card => {
                card.classList.remove("border-yellow","transition-scale");
            
            });
    })
     //in questo caso stiamo implementando la possibilità di visualizzare la lista carrello allo schiacciare dell'icona carrello
     listaCarrello.addEventListener("click", function() {
        lista.classList.remove("d-none")
    })
}

function createDettails(dettails) {
    console.log(dettails);
    
        let card = document.createElement("div");
        card.classList.add("card","bg-dark", "mt-4")
        //titolo
        let title = document.createElement("p");
        title.innerText = dettails.category;
        title.classList.add("text-light")
        //immagine
        let image = document.createElement("img");
        image.src = dettails.img;
        image.classList.add("img-fluid"); 
    
}

callFetch();




