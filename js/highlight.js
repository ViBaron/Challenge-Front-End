/*HIGHLIGHT*/

//Mudar cor fundo Highlight
function selectbg() {
    document.getElementById('box-hightlight').style.backgroundColor = $("#select-color").val();
  };
  
  //Mudar linguagem Highlight
  const EditorCod = document.querySelector('.codigo-wrapper');
  const linguagem = document.querySelector('.code-lang');
  const botao = document.querySelector('.active-hightlight');
  
  function SelectLang() {
    const codigo = {'texto': EditorCod.querySelector('code').innerText}
    EditorCod.innerHTML = `<code class="preview text-hightlight hljs ${linguagem.value}" 
  contenteditable="true" aria-label="editor" spellcheck="false"></code>`
  EditorCod.firstChild.innerText = codigo.texto
  }
  linguagem.addEventListener('change', () => {
    SelectLang()
  })
  botao.addEventListener('click', () => {
    const codigo = EditorCod.querySelector('code');
    hljs.highlightElement(codigo);
  })