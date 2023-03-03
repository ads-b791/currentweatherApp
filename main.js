const apiKey = 'e9a5d3b74bf84418b11193028231901';


const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');
const header = document.querySelector('.header');

function removeCard() {
	const prevCard = document.querySelector('.card');
	if (prevCard) prevCard.remove();
}


function showError(errorMessage) {
	const html = `<div class="card">${errorMessage}</div>`
	header.insertAdjacentHTML('afterend', html);
}

function showCard(name, country, temp, icon, condition) {
	const html =
		`<div class="card">
				<h2 class="card-city">${name}<span>${country}</span></h2>
	
				<div class="card-weather">
					<div class="card-value">${temp}<sup>°c</sup></div>
					<img class="card-img" src="https:${icon}" alt="Weather">
				</div>
	
				<div class="card-description">${condition}</div>
				</div>`
	header.insertAdjacentHTML('afterend', html);
}

async function getWeather(city) {

	const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

	const response = await fetch(url);
	const data = await response.json();

	return data;
}

form.onsubmit = async function (e) {
	e.preventDefault();

	let city = input.value.trim();

	const data = await getWeather(city);

	if (data.error) {

		removeCard();

		showError(data.error.message);

	} else {

		removeCard();

		showCard(
			data.location.name,
			data.location.country,
			data.current.temp_c,
			data.current.condition.icon,
			data.current.condition.text
		);
	}


}









		//console.log(data);
		//console.log(data.location.country);
		//console.log(data.location.name);
		//console.log(data.current.temp_c);
		//console.log(data.current.condition.text);
		//console.log(data.current.condition.icon);
		//let icon = [data.current.condition.icon];
		//let img = document.querySelector('.card-img');
		//console.log(img)
		//img.src = `https:${icon}`;



			//fetch(url).then((response) => {
	//	return response.json()
	//}).then((data) => {


	//})