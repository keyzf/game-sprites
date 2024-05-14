export class Controles {
    constructor(container, kyo,inimigo, cenario, menu) {
        this.container = container;
        this.kyo = kyo;
        this.inimigo = inimigo
        this.menu = menu;
        this.cenario = cenario;
        this.intervaloAtual = null;
        this.intervaloAtualCenario = null;
        this.tempoBase = 200; 
        this.string = null;
        this.init();
    }

    init() {
        this.criarBotoesElementos();
        this.adicionarEventosBotoes();

        
    }
    virarDireita(){
        this.kyo.kyo.classList.add('virar')
        this.cenario.posicao=1
        this.kyo.direcaoPulo=-1
      }
     virarEsquerda(){
        this.kyo.kyo.classList.remove('virar')
        this.cenario.posicao=2
        this.kyo.direcaoPulo=1
      }
 
    criarBotoesElementos() {
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');

        this.frente = this.criarBotao('frente', 'teal', 'parado', '66px');
        this.pula = this.criarBotao('pula', 'teal', 'pular', '66px');
        this.especial = this.criarBotao('especial', 'gold', 'especial', '66px');
        this.soco = this.criarBotao('soco', 'teal', 'soco', '66px');
        this.tras = this.criarBotao('tras', 'teal', 'corre', '66px');

        div1.appendChild(this.frente);
        div1.appendChild(this.pula);

        div2.appendChild(this.especial);
        div2.appendChild(this.soco);
        div2.appendChild(this.tras);

        this.container.appendChild(div1);
        this.container.appendChild(div2);
    }

    criarBotao(id, bgColor, text, width) {
        const button = document.createElement('button');
        button.id = id;
        button.style.backgroundColor = bgColor;
        button.textContent = text;
        button.style.width = width;
        button.style.borderRadius = '20px 0 20px';
        return button;
    }

    adicionarEventosBotoes() {
        this.frente.addEventListener('click', () => this.acaoParar());
        this.soco.addEventListener('click', () => this.acaoSoco());
        this.especial.addEventListener('click', () => this.acaoEspecial());
        this.pula.addEventListener('click', () => this.acaoPular());
        this.tras.addEventListener('click', () => this.acaoCorrer());

        document.addEventListener('keypress', (event) => {
            this.limparTempo();
        
            let intervaloTempo = this.tempoBase / window.myKyo.velocidadeVertical;
            switch (event.key) {
                case 'w':
                    this.intervaloAtual = setInterval(() => this.kyo.pular(this.intervaloAtual), 200); 
                    break;
                case 'a':
                    this.intervaloAtual = setInterval(() => this.kyo.correr(), this.tempoBase);
                    this.intervaloAtualcenario = setInterval(() => this.cenario.atualizaCenario(this.kyo.posicaoX), this.tempoBase);
                    break;
                case 'd':
                    this.kyo.parar(this.intervaloAtual); 
                    this.cenario.pararCenario(this.intervaloAtualCenario);
                    break;
                case 's':
                    this.intervaloAtual = setInterval(() => this.kyo.darSoco(this.intervaloAtual), this.tempoBase); 
                    this.verificaColisao(true);
                    break;
                    case 'x':
                        this.intervaloAtual = setInterval(() => this.kyo.especialinicio(this.intervaloAtual), this.tempoBase);
                    this.verificaColisao(true);
                    break;
                default:
                    this.intervaloAtual = setInterval(() => this.kyo.correr(), this.tempoBase);
                    break;
            }
        });
         
          document.addEventListener ('keyup', (event) => {
            this.string +=event.key
            console.log(this.string)
            if(this.string.length >= 9){
              switch(this.string){
                case 'dev-Enter':
                  kyo.parar(this.intervaloAtual)
                  this.menu.init()
                break;
                case 'ArrowRight' :
                    this.virarDireita()
                break;
                case 'ArrowLeft' :
                    this.virarEsquerda()
                break;
              }
              this.string=''
            }
        });
    }

    acaoParar() {
        this.limparTempo();
        this.kyo.parar(this.intervaloAtual);
        this.cenario.pararCenario(this.intervaloAtualCenario);
    }

    acaoSoco() {
        this.limparTempo();
        this.intervaloAtual = setInterval(() => this.kyo.darSoco(this.intervaloAtual), this.tempoBase);
        this.verificaColisao(true);
    }

    acaoEspecial() {
        this.limparTempo();
        this.intervaloAtual = setInterval(() => this.kyo.especialinicio(this.intervaloAtual), this.tempoBase);
        this.verificaColisao(true);
    }

    acaoPular() {
        this.limparTempo();
        this.intervaloAtual = setInterval(() => this.kyo.pular(this.intervaloAtual), 200);
    }

    acaoCorrer() {
        this.limparTempo();
        this.intervaloAtual = setInterval(() => this.kyo.correr(), this.tempoBase);
        this.intervaloAtualCenario = setInterval(() => this.cenario.atualizaCenario(this.kyo.posicaoX), this.tempoBase);
    }

    limparTempo() {
        clearInterval(this.intervaloAtual);
        clearInterval(this.intervaloAtualCenario);
    }
    verificaColisao(soco = false) {
        const kyoElemento = document.querySelector('.kyo');
        const inimigoElemento = document.querySelector('.inimigo');
        let kyoRect = kyoElemento.getBoundingClientRect();
        let inimigoRect = inimigoElemento.getBoundingClientRect();
        // console.log(inimigoRect)
        const tolerancia = 1;
        if (kyoRect.right > inimigoRect.left + tolerancia &&
            kyoRect.left < inimigoRect.right - tolerancia &&
            kyoRect.bottom > inimigoRect.top + tolerancia &&
            kyoRect.top < inimigoRect.bottom - tolerancia) {
            if (soco) {
                console.log('Kyo acertou o soco no inimigo!');
                inimigoElemento.style.backgroundColor = 'red';
                this.inimigo.receberDano(10);
            }
        }
    }
}
