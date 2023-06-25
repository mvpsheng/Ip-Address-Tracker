const button = document.querySelector(".arrowbutton");
const inputip = document.querySelector("input");
const ip = document.getElementById("ip");
const region = document.getElementById("region");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
const mapdiv = document.getElementById("map");
const icon = "/images/icon-location.svg";
let lat = 51.505;
let lng = -0.09;
// Create a custom icon
const customIcon = L.icon({
  iconUrl: icon,
});
let map;

function update(lat, lng) {
  if (map) {
    map.remove();
  }
  map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.marker([lat, lng], { icon: customIcon }).addTo(map);
}

update(lat, lng);

button.addEventListener("click", () => {
  const ipvalue = inputip.value;
  //   192.168.43.71
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_f1JnIlcR1NbcPquynUm5TpK02Joh6&ipAddress=${ipvalue}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      ip.innerHTML = data.ip;
      region.innerHTML = data.location.country + ", " + data.location.region;
      timezone.innerHTML = "UTC " + data.location.timezone;
      isp.innerHTML = data.isp;
      lat = data.location.lat;
      lng = data.location.lng;

      update(lat, lng);
    })
    .catch((error) => console.error(error));
});
