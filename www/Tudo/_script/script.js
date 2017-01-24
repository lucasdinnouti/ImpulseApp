// http://www.impulse-156418.appspot.com
// class XMLHttpRequest()

function atualizar(){
  var http = new XMLHttpRequest();
  var url = "http://impulse-156418.appspot.com/lists/";
  var resposta;

  //Abre a url no obrjeto http
  http.open("POST", url, true);
  //http.responseType = "json";
  //Recebe a resposta;
  //http.setRequestHeader("Content-type", url);
  http.onreadystatechange = function() {
    if((http.readyState == 4) && (http.status == 200)) {
      alert ("entrou");
      resposta = http.responseText;
    }

      var json = JSON.parse(resposta);
      console.log(json.posts.length);

      for (var i = 0; i < json.posts.length; i++) {
        var title = json.posts[i].title;
        var author = json.posts[i].author;
        var date = json.posts[i].date;
        var content = json.posts[i].content;

        var desk = document.getElementById("postar");
        var prin = document.createElement("div");
        var titl = document.createTextNode(title);
        var auto = document.createTextNode(author);
        var data = document.createTextNode(date);
        var cont = document.createTextNode(content);

        prin.id = "postar" + i;
        titl.id = "titulo";
        auto.id = "autor";
        data.id = "data";
        cont.id = "conteudo";

        prin.appendChild(titl);
        prin.appendChild(auto);
        prin.appendChild(data);
        prin.appendChild(cont);
        desk.appendChild(prin);
      }

    }

    //Envia o Pedido
    http.send();
  }
