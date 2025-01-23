fetch("https://striveschool-api.herokuapp.com/api/agenda/")
  .then(resp => {
    console.log(resp);

    if (resp.ok) {
      // se saremo qui vuol dire che avremo ricevuto uno status da 100 a 299 (quindi positivo e possiamo procedere)
      return resp.json();
    } else {
      // questa operazione ci fa saltare il prossimo then (evitando errori su operazioni impossibili)
      // ci farà saltare direttamente al catch
      throw new Error("Ci dispiace ma non siamo riusciti a reperire il dato");
    }
  })
  .then(appointments => {
    // isLoading(false);
    console.log(appointments);

    const row = document.getElementById("appointments-list");

    appointments.forEach(app => {
      console.log(app);

      const li = document.createElement("li");
      li.classList.add("list-group-item", "d-flex", "align-items-center");
      // alla fine di questa stringa stiamo determinando la creazione di un link DINAMICO che avrà dentro di sé l'informazione dell'id specifico da portare e rendere disponibile nella pagina dettaglio
      li.innerHTML = `<span class="me-auto">${app.name}</span> <span class="badge text-bg-dark me-2">${app.price}€</span><a href="./details.html?appId=${app._id}">VAI A DETTAGLIO</a>`;

      row.appendChild(li);
    });
  })
  .catch(err => {
    console.dir(err);
    // isLoading(false);

    generateAlert(err.message);
  })
  .finally(() => {
    // chiamare isLoading qui equivale a farlo sia in caso di esito positivo che di esito negativo,
    // perché il metodo finally si attiva in ogni caso a prescindere da tutto
    isLoading(false);
  });

const isLoading = function (loadingState) {
  const spinner = document.querySelector(".spinner-border"); // riferimento dell'elemento spinner
  // in base ad un valore booleano loadingState decidiamo se rendere o meno visibile lo spinner gestendo la presenza della classe d-none
  if (loadingState) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

// questa funzione si occupa di generare un alert nella pagina in caso di errore
const generateAlert = function (message) {
  const alertContainer = document.getElementById("alert-container");

  alertContainer.innerHTML = `<div class="alert alert-danger" role="alert">
                                ${message}
                              </div>`;
};
