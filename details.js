const params = new URLSearchParams(window.location.search);
const appointmentId = params.get("appId");

console.log("RESOURCE ID", appointmentId);

fetch("https://striveschool-api.herokuapp.com/api/agenda/" + appointmentId)
  .then(resp => {
    if (resp.ok) {
      return resp.json();
    }
  })
  .then(appointment => {
    const container = document.getElementById("details-container");

    container.innerHTML = `
                    <h2>${appointment.name}</h2>
                    <p>${appointment.description}</p>
                    <p class="font-monospace">${new Date(appointment.time).toLocaleString()}</p>

                    <p class="display-6 text-primary">${appointment.price}€</p>
                    <a href="./backoffice.html?appId=${appointmentId}" class="btn btn-success">MODIFICA</a>`;
  })
  .catch(err => console.log(err));
