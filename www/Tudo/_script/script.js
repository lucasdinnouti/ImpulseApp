////////// Por favor, funções em letra maiúscula e ordem alfabética ///////////

// http://bookshelf.impulse-157223.appspot.com
// class XMLHttpRequest()
function Atualizar(tipoDePostagem) {
	var div_debug = document.createElement("div");
	div_debug.innerHTML = "<br>" +tipoDePostagem ;
	document.getElementById("public_page").appendChild(div_debug);
	var http = new XMLHttpRequest();
	var url = "http://bookshelf.impulse-157223.appspot.com/request?postType="+tipoDePostagem;
	//var url = "http://localhost:8080/request?postType="+tipoDePostagem;
	var response_data;

	//Abre a url no obrjeto http
	http.open("GET", url, true);
	//http.responseType = "json";
	//Recebe a resposta;
	//http.setRequestHeader("Content-type", url);
	http.onreadystatechange = function() {
		div_debug.innerHTML += "<br> http readystate:" + http.readyState;
		div_debug.innerHTML += "<br> http status:" + http.status;
		if ((http.readyState == 4) && ((http.status == 200)||(http.status == 0))) {
			response_data = http.responseText;

			var json = JSON.parse(response_data);
			console.log(json.length);

			for (var i = 0; i < json.length; i++) {
				var title_data = json[i].title;
				var author_data = json[i].author;
				var date_data = json[i].publishedDate;
				var content_data = json[i].description;


				document.getElementById("public_page").innerHTML +=
				" <div class='div-publicacao'> " +
				"   <div class='div-publicacao-cabecalho'> " +
				" 	<h3 class='h3-publicacao-titulo'>" + title_data + " | " + author_data + "</h3>" +
				"   </div> " +
				"   <div class='div-publicacao-corpo'><p id='conteudo'>" +
				" 	" + content_data +
				" 	</p><p id='data'>Publicado em " + date_data + "</p>"
				"   </div> " +
				" </div> ";

//				//Cria  a publicação na página
//				var div_principal = document.getElementById("public_page");
//				var div_publicacao = document.createElement("div");
//				var title_element = document.createElement("h1");
//				var title_text = document.createTextNode(title_data);
//				var author_element = document.createElement("h2");
//				var author_text = document.createTextNode(author_data);
//				var date_element = document.createElement("h3");
//				var date_text = document.createTextNode(date_data);
//				var content_element = document.createElement("p");
//				var content_text = document.createTextNode(content_data);

//				div_publicacao.id = "public";
//				title_element.id = "public_title";
//				author_element.id = "public_author";
//				date_element.id = "public_date";
//				content_element.id = "public_content";
//
//				title_element.appendChild(title_text);
//				author_element.appendChild(author_text);
//				date_element.appendChild(date_text);
//				content_element.appendChild(content_text);
//				div_publicacao.appendChild(title_element);
//				div_publicacao.appendChild(author_element);
//				div_publicacao.appendChild(date_element);
//				div_publicacao.appendChild(content_element);
//				div_principal.appendChild(div_publicacao);
			}
		}

	}
	//Envia o Pedido
	http.send();
}

function EnviarPost()
{
	var title = document.getElementById("title").value;
	var author = document.getElementById("author").value;
	var publishedDate = document.getElementById("publishedDate").value;
	var description = document.getElementById("description").value;

	if ((title == "")||(author == "")||(publishedDate == "")||(description == "")) {
		alert("Preencha todos os campos");
	}

	var data = JSON.stringify({
	"title": title,
	"author": author,
	"publishedDate": publishedDate,
	"description": description});

//	encodeURI(
//	"title="+ title +
//	"&author="+ author +
//	"&publishedDate="+ publishedDate +
//	"&description="+ description +
//	"&file="+
//	"&id="+
//	"&imageUrl=");

//	new FormData();
//	data.append("title", title);
//	data.append("author", author);
//	data.append("publishedDate", publishedDate);
//	data.append("description", description);
//


	var kinds = document.getElementById("kind");
	var kindSelected = kinds.options[kinds.selectedIndex].value;

	var http = new XMLHttpRequest();
 	var url = "http://bookshelf.impulse-157223.appspot.com/";
	//var url = "http://localhost:8080/";

	switch (kindSelected){
		case "Default":
			url += "createBook";
			break;
		case "Schedule":
			url += "createSchedule";
			break;
		case "Survey":
			url += "posts" // Tem que ser criado um servlet
			break;
		case "Video":
			url += "posts" // Tem que ser criado um servlet
			break;
		default:
			url += "posts"
			break;
	}

	console.log(kindSelected);
	console.log(url);
	console.log(data);

	var response_data;
	//Abre a url no obrjeto http
	http.open("POST", url, true);
	//http.responseType = "json";
	//Recebe a resposta;
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {
		if ((http.readyState == 4) && (http.status == 200)) {
			response_data = http.responseText;
			if (response_data == "NOTOK")
				alert("Houve um erro na postagem, tente novamente mais tarde.")
			console.log(response_data);
			alert("Postagem executada com sucesso.");
		}
		else
		if (http.readyState == 4) {

			switch (http.status) {
				case 404:
					break;
				case 405:
					break;
				default:
					break;
			}
		}
	}
	http.send(data);
}