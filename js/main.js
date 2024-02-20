// Variavels
var menu_cont = 0;
var search_cont = 0;
var idProj = 1;
var idLike = 0;
const SepaInt = document.querySelector('.separador-inter');

// Events
document.getElementById('menu-icon').onclick = function(){SlideMobMenu()};
document.getElementById('busca-icon').onclick = function(){SlideSeach()};

// Methods
function SlideMobMenu() {
  if (menu_cont == 0) {
    document.getElementById('menu-icon').setAttribute('src', 'Image/x-menu-mobile.png');
    menu_cont = 1;
  }else{
    document.getElementById('menu-icon').setAttribute('src', 'Image/menu-mobile.png');
    menu_cont = 0;
  }
  $("#box-menu-mobile").stop().animate({width: 'toggle'});
};

function SlideSeach() {
  if (search_cont == 0) {
   document.getElementById('busca-icon').setAttribute('src', 'Image/x-menu-mobile.png');
    search_cont = 1;
  }else{
    document.getElementById('busca-icon').setAttribute('src', 'Image/search.png');
    search_cont = 0;
  }
  $("#busca").stop().animate({width: 'toggle'});
};

function SaveProject() {
  if (localStorage.getItem('Nome '+idProj) == null){
  const TextHighlight = {'texto': document.querySelector('code').innerText}.texto;

  localStorage.setItem('ID '+idProj, idProj);
  localStorage.setItem('Nome '+idProj, document.form.proj_name.value);
  localStorage.setItem('Descricao '+idProj, document.form.proj_descr.value);
  localStorage.setItem('Linguagem '+idProj, document.form.code_lang.value);
  localStorage.setItem('Codigo '+idProj, TextHighlight);
  localStorage.setItem('CorBG '+idProj, $("#select-color").val());
  localStorage.setItem('Liked '+idProj,'likes');
  localStorage.setItem('QtdLikes '+idProj, '0');
  idProj = idProj+1;
  alert("O projeto '"+document.form.proj_name.value+"' foi salvo!");
  document.form.reset();
  location.reload();
  }else{
    idProj = idProj+1;
    SaveProject();
  }
}

function proj_conteudo (){
  if (localStorage.getItem('Nome '+idProj) == null){
    if (localStorage.getItem('Nome 1') == null){
      SepaInt.insertAdjacentHTML('afterbegin', `Não há projetos para exibir :(`);
    }
  }else{
    SepaInt.insertAdjacentHTML('afterbegin', `<div class="details-community">
    <div class="box-hightlight" id="box-hightlight" style="background: ${localStorage.getItem('CorBG '+idProj)};">
      <div class="menu-hightlight">
        <div style="background: #FF5F56;"></div>
        <div style="background: #FFBD2E;"></div>
        <div style="background: #27C93F;"></div>
      </div>
      <code class="preview text-hightlight hljs ${localStorage.getItem('Linguagem '+idProj)}" style="height: 200px;overflow: auto;" contenteditable="false" aria-label="editor">
      ${localStorage.getItem('Codigo '+idProj).replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/(?:\r\n|\r|\n)/g, '<br>')}
      </code>
    </div>
    <h1>${localStorage.getItem('Nome '+idProj)}</h1>
    <p>${localStorage.getItem('Descricao '+idProj)}</p>
    <div class="social-community">
      <span class="comments"> 0</span>
      <span class="likes ${localStorage.getItem('Liked '+idProj)} ${localStorage.getItem('ID '+idProj)}"> ${localStorage.getItem('QtdLikes '+idProj)}</span>
      <div class="social-perfil-community"><img src="Image/Photo.png" alt="Photo"> @Victor</div>
    </div>
    </div>`);
    idProj++;
    proj_conteudo ();
  }
}

document.body.addEventListener('click', function Btn_Like (e) {
  if (e.target.classList.contains('likes')){
    if (e.target.classList.contains(idLike)){
      if (localStorage.getItem('Liked '+idLike) == 'likes'){
        localStorage.setItem('Liked '+idLike, 'likes_active');
        let qtd_likes = parseInt(e.target.innerText)+1;
        localStorage.setItem('QtdLikes '+idLike, qtd_likes);
        e.target.classList.add('likes_active');
        e.target.innerHTML = qtd_likes;
        idLike = 0;
      }else{
        localStorage.setItem('Liked '+idLike, 'likes');
        let qtd_likes = parseInt(e.target.innerText)-1;
        localStorage.setItem('QtdLikes '+idLike, qtd_likes);
        e.target.innerHTML = qtd_likes;
        e.target.classList.remove('likes_active');
        idLike = 0;
    }}else{
      idLike++;
      Btn_Like (e);
    }
  }
});