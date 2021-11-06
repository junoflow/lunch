window.addEventListener('DOMContentLoaded', main);

async function main(){
	const TARGET={
		restaurant : document.getElementsByClassName('restaurant'),
		menu : document.getElementsByClassName('menu'),
		cost : document.getElementsByClassName('cost'),
        address : document.getElementsByClassName('address')

	};
	const SOURCE = 'https://script.googleusercontent.com/a/macros/u.sogang.ac.kr/echo?user_content_key=2ombfz9B3lKWlxrLHpEfNdLaGzxaxWfBx-6xU98KYjEPMVjwtSftDYjRHsZOdEaeRd4iX1YNJLC2Jm3SocJRKStjFGGjMNnjm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_s1kf6F6adatvLVq4BVF0FZ0H5-y9S4NyS4chwneYR2tuFk-Y8sAD23PpSS3gZwrWa-g745murIQypmlEYnpJQzTATQUKdnzzmf5HCq_tVdU&lib=MtAHZWav1ZHBanmMZbFTuQfp6K4dVRFHJ';
	const COLUMNS = ['식당', '음식', '금액', '주소'];
	
	const DATA = await separateRowFromJson(SOURCE, COLUMNS);

	for(let i=0; i<DATA.length; i++){
		TARGET['restaurant'][i].textContent = DATA[i]['식당'];
		TARGET['menu'][i].textContent = DATA[i]['음식'];
		TARGET['cost'][i].textContent = DATA[i]['금액'];
        TARGET['address'][i].textContent = DATA[i]['주소'];

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
			_DATA[i][COLUMNS[k]] = temp[i][COLUMNS[k]];
		}
	}
	
	return _DATA;
}