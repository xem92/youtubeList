//Objeto Videos
var Videos = function(buscar){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", buscar, false);
	xhr.send();

	var json_response = xhr.responseText;
	var response = JSON.parse(json_response);

	//Cargamos las imagenes de los videos, cada fila ocuparan 4 imagenes.
	for(var i=0; i<response.data.totalItems; i++){
		//División principal(fila de videos), cada 4 videos salta a una nueva fila.
		if((i%4)==0){
			var bigDiv = document.createElement('div');
			bigDiv.className = 'bigDivVideo';
			document.body.childNodes[2].appendChild(bigDiv);
		}
		//Divisiones por video. En cada división encontraremos una imagen del video y el título del video.
		var div = document.createElement('div');
		div.className = 'litDiv';
		div.id = 'vid'+i;
		div.style.backgroundImage = "url("+response.data.items[i].thumbnail.hqDefault+")";
		bigDiv.appendChild(div);

		var myPlay = document.createElement('img');
		myPlay.src = "icons/play.png";
		myPlay.className = 'playIcon';
		myPlay.id = i;
		myPlay.align = 'center';
		//Evento onClick.
		myPlay.addEventListener("click", doClick, false);
		var myP = document.createElement('p');
		myP.innerHTML = response.data.items[i].title;
		myP.align = 'center';
		div.appendChild(myPlay);
		div.appendChild(myP);
	}

	//Funcion del evento onClick: aquí si nos clican la imagen de play, se eliminará la imagen y se colocará el video de youtube en su lugar.
	function doClick(){
		var myEmbed = document.createElement('embed');
		myEmbed.src = response.data.items[this.id].content[5];
		this.parentElement.insertBefore(myEmbed, this.parentElement.firstChild);
		this.parentElement.removeChild(this);
	}
}

//Bonus Track: SearchEngine
//Objeto footer
var Footer = function(){
	var footer = document.createElement('footer');
	footer.id = 'footer';
	document.body.appendChild(footer);
	var myFooter = document.getElementById("footer");

	var myInput = document.createElement('input');
	myInput.type = 'text';
	myInput.id = 'input';
	myInput.placeholder = 'search...'
	myFooter.appendChild(myInput);

	var myButton = document.createElement('input');
	myButton.type = 'submit';
	myButton.id = 'button';
	myButton.value = 'SEARCH'
	myFooter.appendChild(myButton);

	//Creamos el evento onCLick: aqui primero borramos todos los elementos de daDiv y luego hacemos la busqueda.
	myButton.addEventListener("click", doClick, false);
	function doClick(){
		console.log(this.parentElement.firstChild.value);
		while (daDiv.hasChildNodes()) {
			daDiv.removeChild(daDiv.lastChild);
		}
		var search = Videos("https://gdata.youtube.com/feeds/api/videos?v=2&alt=jsonc&max-results=20&q="+this.parentElement.firstChild.value);
	}
}

//Division padre, donde se colocaran los videos.
var daDiv = document.createElement('div');
daDiv.className = 'daDiv';
document.body.appendChild(daDiv);

//Cargamos los videos más populares.
var videos = Videos("https://gdata.youtube.com/feeds/api/standardfeeds/most_popular?v=2&alt=jsonc");
var footer = Footer();
	
