// http://bookshelf.impulse-157223.appspot.com
// class XMLHttpRequest()

function atualizar(){
  var http = new XMLHttpRequest();
  var url = "http://bookshelf.impulse-157223.appspot.com/lists/";
  var response_data;

  //Abre a url no obrjeto http
  http.open("POST", url, true);
  //http.responseType = "json";
  //Recebe a resposta;
  //http.setRequestHeader("Content-type", url);
  http.onreadystatechange = function() {
    if((http.readyState == 4) && (http.status == 200)) {
      response_data = http.responseText;
    }

      var json = JSON.parse(response_data);
      console.log(json.posts.length);

      for (var i = 0; i < json.posts.length; i++) {
        var title_data = json.posts[i].title;
        var author_data = json.posts[i].author;
        var date_data = json.posts[i].date;
        var content_data = json.posts[i].content;

        //Cria  a publicação na página
        var div_principal = document.getElementById("post_page");
        var div_publicacao = document.createElement("div");
        var title_element = document.createElement("h1");
        var title_text = document.createTextNode(title_data);
        var author_element = document.createElement("h2");
        var author_text = document.createTextNode(author_data);
        var date_element = document.createElement("h3");
        var date_text = document.createTextNode(date_data);
        var content_element = document.createElement("p");
        var content_text = document.createTextNode(content_data);

        div_publicacao.id = "public";
        title_element.id = "public_title";
        author_element.id = "public_author";
        date_element.id = "public_date";
        content_element.id = "public_content";

        title_element.appendChild(title_text);
        author_element.appendChild(author_text);
        date_element.appendChild(date_text);
        content_element.appendChild(content_text);
        div_publicacao.appendChild(title_element);
        div_publicacao.appendChild(author_element);
        div_publicacao.appendChild(date_element);
        div_publicacao.appendChild(content_element);
        div_principal.appendChild(div_publicacao);
      }

    }

    //Envia o Pedido
    http.send();
  }
