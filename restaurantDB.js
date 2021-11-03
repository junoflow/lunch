window.addEventListener('DOMContentLoaded', main);

async function main(){
	const TARGET={
		food : document.getElementsByClassName('food'),
		address : document.getElementsByClassName('address'),
		cost : document.getElementsByClassName('cost')
	};
	const SOURCE = 'https://spreadsheets.google.com/feeds/list/1-346jj9T5829HKmxcSDv0BKDDYabvfzNYgRb4LkaunQ/1/public/full?alt=json';
	const COLUMNS = ['음식', '지도', '금액'];
	
	const DATA = await separateRowFromJson(SOURCE, COLUMNS);

	for(let i=0; i<DATA.length; i++){
		TARGET['food'][i].textContent = DATA[i]['음식'];
		TARGET['address'][i].textContent = DATA[i]['주소'];
		TARGET['cost'][i].textContent = DATA[i]['금액'];
	}
}

async function separateRowFromJson(SOURCE, COLUMNS){
	const FETCHED_SOURCE = await fetch(SOURCE);
  	let temp = await FETCHED_SOURCE.json();
 	temp = temp['feed']['entry'];

	let _DATA = [];
	for(var i=0; i<Object.keys(temp).length; i++){
		_DATA[i]={};
		for(var k=0; k<Object.keys(COLUMNS).length; k++){;
			_DATA[i][COLUMNS[k]] = temp[i]['gsx$'+COLUMNS[k]]['$t'];
		}
	}
	
	return _DATA;
}