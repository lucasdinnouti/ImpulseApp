function postarTexto(){
  text = document.getElementById('publi').value;
  desktop = document.getElementById('postar');
  post = document.createTextNode(text);
  desktop.appendChild(post);
}
