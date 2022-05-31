let [vitorias, perdas, desistencias] = [0, 0, 0];
let jogoRodando, resposta, respostaUnderline, respostasErradas;
// let vidas;
// const categories = {
//   cities: ["london", "tokyo", "porto", "roma", "berlin"],
//   countries: ["portugal", "switzerland", "poland", "liechtenstein", "germany"],
//   brands: ["samsung", "huawei", "xiaomi", "amazon", "disney"]
// };

const tituloJogo = document.querySelector('h1');

const palavras = [
  'alura','oracle','challenge','forca'
]
hideAll('#contador span')
document.querySelector('#novo-jogo').addEventListener('click', novoJogo)

function novoJogo() {
  if (jogoRodando == true) //Caso o último jogo não tenha terminado antes do click de "Novo Jogo"
    desistir()
  jogoRodando = true //Jogo inicia
  tituloJogo.innerText = 'Jogo da Forca'
  tituloJogo.setAttribute('status', 'normal') //Sem cor
  resposta = novaPalavraAleatoria()
  // mostra a resposta no console
  console.log(
    "Hey Você esta trapaceando! " +
      'Feche o console!!! A resposta é "' +
      resposta +
      '"')

  respostasErradas = 0
  limpaTeclado()
  respostaUnderline = [] //respostaUnderline é a mistura das letras com underscores
  for (var i of resposta) respostaUnderline.push('_');
  updateDisplayWord() //display the respostaUnderline
  desenhaForca() //draw graph
}

function novaPalavraAleatoria() {
  return palavras[Math.floor(Math.random() * palavras.length)]
}

function confereChute() {
  //the onclick event
  var letraChute = this.innerText.toLowerCase()
  //when it's a match:
  if (resposta.toLowerCase().includes(letraChute)) {
    //update the displayed word
    for (var i in respostaUnderline) {
      if (resposta[i] == letraChute) respostaUnderline[i] = resposta[i]
    }
    updateDisplayWord()
    if (respostaUnderline.includes('_') == false)
      //won
      escapou()
    //change color and make the mouse no-drop
    this.classList.toggle('correct-letter', true)
    this.removeEventListener('click', confereChute)
  } else {
    //when it's not a match:
    this.classList.toggle('incorrect-letter', true) //change color and make the mouse no-drop
    this.removeEventListener('click', confereChute)
    respostasErradas++
    desenhaForca()
  }
}

function updateDisplayWord() {
  var display = ''
  for (var i of respostaUnderline) display += i + ' ';
  display.slice(0, -1)
  document.querySelector('#chute').textContent = display;
}

function desistir() {
  //add 1 to the contador desistencias
  desistencias++
  document.querySelector('#desistencias').innerText = desistencias;
  unhideAll('.desistencias');
}

function desenhaForca() {
  //draw the hangman
  switch (respostasErradas) {
    case 0:
      hideAll('svg *')
      break
    case 1:
      unhideAll('.forca')
      break
    case 2:
      unhide('#cabeca')
      break
    case 3:
      unhide('#corpo')
      break
    case 4:
      unhide('#braco-esq')
      break
    case 5:
      unhide('#braco-dir')
      break
    case 6:
      unhide('#perna-esq')
      break
    case 7:
      unhide('#perna-dir')
      enforcado()
      break
    default:
      novoJogo()
  }
}
// Perdeu  a partida 
function enforcado() {
  jogoRodando = false
  tituloJogo.innerText = 'Você foi enforcado!'
  tituloJogo.setAttribute('status', 'enforcado')
  playSound("error");
  perdas++
  removeAllListeners()
  unhideAll('.perdas')
  document.querySelector('#perdas').innerText = perdas;
  // Mostra a resposta certa
  var display = ''
  for (var i of resposta) display += i + ' '
  display.slice(0, -1)
  document.querySelector('#chute').textContent = display;
}
//Venceu a Partida
function escapou() {
  jogoRodando = false
  tituloJogo.innerText = 'Você escapou!!'
  tituloJogo.setAttribute('status', 'escapou')
  playSound("success");
  vitorias++
  removeAllListeners()
  unhideAll('.vitorias')
  document.querySelector('#vitorias').innerText = vitorias;
}

function removeAllListeners() {
  
  //prevent user from continue clicking after game's over
  for (let i of document.querySelectorAll('#keypad a')) {
    i.removeEventListener('click', confereChute)
    i.classList.toggle('finished', true)
  }
  
}

function limpaTeclado() {
  for (var i of document.querySelectorAll('#keypad div')) //clear the keypad
    i.innerText = ''
  preencherLinhas(1, 'QWERTYUIOP');
  preencherLinhas(2, 'ASDFGHJKL');
  preencherLinhas(3, 'ZXCVBNM');
  
}

function preencherLinhas(linhaNum, linhaLetras) {
  //draw the keyboard and attach listeners
  for (let i of linhaLetras) {
    let key = document.createElement('a');
    key.id = i.toLowerCase();
    key.append(i);
    key.addEventListener('click', confereChute);
    document.querySelector('#keypad--row' + linhaNum).append(key);
  }
}

function unhide(elemento) {
  document.querySelector(elemento).classList.toggle('esconder', false)
}

function hideAll(elemento) {
  for (let i of document.querySelectorAll(elemento))
    i.classList.toggle('esconder', true)
}

function unhideAll(elemento) {
  for (let i of document.querySelectorAll(elemento))
    i.classList.toggle('esconder', false)
}


function playSound(status) {
  if (status === "success") {
    const audio = new Audio(`./songs/success.mp3`);
    audio.play();
  } else {
    const audio = new Audio(`./songs/error.wav`);
    audio.play();
  }
}


function adicionarFilme(palavras) {
 
  var filmeNome = document.getElementById("filmeNome").value;
  //pega valor no campo inserido
  if (filmeNome == "") {
    mensagem.innerHTML = "Insira uma palavra!";
  } else {
    if (
      palavras.includes(filmeNome.toLowerCase())
    ) {
      mensagem.innerHTML = "Este palavra já se encontra na lista!";
    } 
      listaFilmes.push(palavras.value);
    }
    limparCampo();
  }

function limparCampo() {
  document.getElementById("filmeNome").value = "";
}


var btnAdicionar = document.querySelector('.btn-adicionar');
var  arrayDePalavrasAleatorias = ['GASOLINA', 'BANANA', 'GATO'];


function adicionaPalavras(addPalavras) {
    arrayDePalavrasAleatorias.push(addPalavras)
    return arrayDePalavrasAleatorias;

}
btnAdicionar.addEventListener('click', (event) => {
  event.preventDefault();
  divInicio.classList.add('esconde');
  divForm.classList.remove('esconde');
});


btnSalvar.addEventListener('click', (event) => {
  event.preventDefault();
  divForm.classList.add('esconde');
  divJogo.classList.remove('esconde');
  comecarJogo = true;
  //console.log(textArea.value.toUpperCase());
  aleatorio.addArray(adicionaPalavras(textArea.value.toUpperCase()));
  letra.iniciaJogo(aleatorio.palavraAleatoria());
  form.reset();
});

btnCancelar.addEventListener('click', (event) => {
  event.preventDefault();
  divInicio.classList.remove('esconde');
  divForm.classList.add('esconde');
  camecarJogo = false;
});





// function vidasContador() { 
//   // vidas-= 1;
//   if (vidas === 0) {
//     alert("Game Over! I guess you don't really know your cheeses :(");
  
//   };
//   $("#liveCount").text(vidas);
// }

// function fimDeJogo() {
//   for (var i = 0; i < pontuacaoTotal.length; pontuacaoTotal++){
//   if (pontuacaoTotal >= 10){
//     alert("fim de Jogo");
//     hideAll('#keypad div');
//   }
// }
 
// fimDeJogo()



/* <button onclick=’window.location.reload(true);’ style=’padding:0px;width:85px;border:1px solid black;’>GAME OVER</button>”; break; */

/* 'their','would','about','stuff'

'there',
'think',
'which',
'people',
'could',
'other',
'these',
'first',
'because',
'thing',
'those',
'woman',
'through',
'child',
'there',
'after',
'should',
'world',
'school',
'still',
'three',
'state',
'never',
'become',
'between',
'really',
'something',
'another',
'family',
'leave',
'while',
'student',
'great',
'group',
'begin',
'country',
'where',
'problem',
'every',
'start',
'might',
'about',
'against',
'place',
'again',
'company',
'where',
'system',
'right',
'program',
'question',
'during',
'government',
'small',
'number',
'always',
'night',
'point',
'believe',
'today',
'bring',
'happen',
'without',
'before',
'large',
'million',
'under',
'water',
'write',
'mother',
'national',
'money',
'story',
'young',
'month',
'different',
'right',
'study',
'though',
'business',
'issue',
'black',
'little',
'house',
'after',
'since',
'provide',
'service',
'around',
'friend',
'important',
'father',
'until',
'power',
'often',
'political',
'among',
'stand',
'however',
'member',
'almost',
'include',
'continue',
'later',
'community',
'white',
'least',
'president',
'learn',
'change',
'minute',
'several',
'information',
'nothing',
'right',
'social',
'understand',
'whether',
'watch',
'together',
'follow',
'around',
'parent',
'anything',
'create',
'public',
'already',
'speak',
'others',
'level',
'allow',
'office',
'spend',
'health',
'person',
'history',
'party',
'within',
'result',
'change',
'morning',
'reason',
'research',
'early',
'before',
'moment',
'himself',
'teacher',
'force',
'offer',
'enough',
'education',
'across',
'although',
'remember',
'second',
'maybe',
'toward',
'policy',
'everything',
'process',
'music',
'including',
'consider',
'appear',
'actually',
'probably',
'human',
'serve',
'market',
'expect',
'sense',
'build',
'nation',
'college',
'interest',
'death',
'course',
'someone',
'experience',
'behind',
'reach',
'local',
'remain',
'effect',
'suggest',
'class',
'control',
'raise',
'perhaps',
'little',
'field',
'former',
'major',
'sometimes',
'require',
'along',
'development',
'themselves',
'report',
'better',
'economic',
'effort',
'decide',
'strong',
'possible',
'heart',
'leader',
'light',
'voice',
'whole',
'police',
'finally',
'return',
'military',
'price',
'report',
'according',
'decision',
'explain',
'develop',
'relationship',
'carry',
'drive',
'federal',
'break',
'better',
'difference',
'thank',
'receive',
'value',
'international',
'building',
'action',
'model',
'season',
'society',
'because',
'director',
'early',
'position',
'player',
'agree',
'especially',
'record',
'paper',
'special',
'space',
'ground',
'support',
'event',
'official',
'whose',
'matter',
'everyone',
'center',
'couple',
'project',
'activity',
'table',
'court',
'produce',
'teach',
'situation',
'industry',
'figure',
'street',
'image',
'itself',
'phone',
'either',
'cover',
'quite',
'picture',
'clear',
'practice',
'piece',
'recent',
'describe',
'product',
'doctor',
'patient',
'worker',
'movie',
'certain',
'north',
'personal',
'support',
'simply',
'third',
'technology',
'catch',
'computer',
'attention',
'source',
'nearly',
'organization',
'choose',
'cause',
'point',
'century',
'evidence',
'window',
'difficult',
'listen',
'culture',
'billion',
'chance',
'brother',
'energy',
'period',
'course',
'summer',
'realize',
'hundred',
'available',
'plant',
'likely',
'opportunity',
'short',
'letter',
'condition',
'choice',
'place',
'single',
'daughter',
'administration',
'south',
'husband',
'floor',
'campaign',
'material',
'population',
'economy',
'medical',
'hospital',
'church',
'close',
'thousand',
'current',
'future',
'wrong',
'involve',
'defense',
'anyone',
'increase',
'security',
'myself',
'certainly',
'sport',
'board',
'subject',
'officer',
'private',
'behavior',
'performance',
'fight',
'throw',
'quickly',
'second',
'order',
'author',
'represent',
'focus',
'foreign',
'blood',
'agency',
'nature',
'color',
'recently',
'store',
'reduce',
'sound',
'before',
'movement',
'enter',
'share',
'common',
'other',
'natural',
'concern',
'series',
'significant',
'similar',
'language',
'usually',
'response',
'animal',
'factor',
'decade',
'article',
'shoot',
'seven',
'artist',
'scene',
'stock',
'career',
'despite',
'central',
'eight',
'treatment',
'beyond',
'happy',
'exactly',
'protect',
'approach',
'serious',
'occur',
'media',
'ready',
'thought',
'individual',
'simple',
'quality',
'pressure',
'accept',
'answer',
'resource',
'identify',
'meeting',
'determine',
'prepare',
'disease',
'whatever',
'success',
'argue',
'particularly',
'amount',
'ability',
'staff',
'recognize',
'indicate',
'character',
'growth',
'degree',
'wonder',
'attack',
'herself',
'region',
'television',
'training',
'pretty',
'trade',
'election',
'everybody',
'physical',
'general',
'feeling',
'standard',
'message',
'outside',
'arrive',
'analysis',
'benefit',
'forward',
'lawyer',
'present',
'section',
'environmental',
'glass',
'answer',
'skill',
'sister',
'professor',
'operation',
'financial',
'crime',
'stage',
'compare',
'authority',
'design',
'knowledge',
'station',
'state',
'strategy',
'little',
'clearly',
'discuss',
'indeed',
'force',
'truth',
'example',
'democratic',
'check',
'environment',
'public',
'various',
'rather',
'laugh',
'guess',
'executive',
'study',
'prove',
'entire',
'design',
'enough',
'forget',
'since',
'claim',
'remove',
'manager',
'close',
'sound',
'enjoy',
'network',
'legal',
'religious',
'final',
'science',
'green',
'memory',
'above',
'establish',
'trial',
'expert',
'spring',
'radio',
'visit',
'management',
'avoid',
'imagine',
'tonight',
'close',
'finish',
'yourself',
'theory',
'impact',
'respond',
'statement',
'maintain',
'charge',
'popular',
'traditional',
'reveal',
'direction',
'weapon',
'employee',
'cultural',
'contain',
'peace',
'control',
'apply',
'measure',
'shake',
'interview',
'manage',
'chair',
'particular',
'camera',
'structure',
'politics',
'perform',
'weight',
'suddenly',
'discover',
'candidate',
'production',
'treat',
'evening',
'affect',
'inside',
'conference',
'style',
'adult',
'worry',
'range',
'mention',
'rather',
'individual',
'specific',
'writer',
'trouble',
'necessary',
'throughout',
'challenge',
'shoulder',
'institution',
'middle',
'dream',
'beautiful',
'property',
'instead',
'improve', */