import { Personagem } from '../factory/Personagem.js';

export class Kyo extends Personagem {
    constructor(elemento) {
        super(elemento);
        this.posicaoX = 0;
        this.estaPulando = false;
        this.velocidadeVertical = 200;
        this.alturaMaxima = 150;
        this.direcaoPulo = 1;
        this.gravidade = 2;
        this.vidaMaxima = 100;
    }

    perderFolego(origem, intervaloAtual) {
        this.vida -= origem === 1 ? 30 : 2;
        const vidaPercent = (this.vida / this.vidaMaxima) * 100;
        const barraVida = document.getElementById('vidakyo');
        barraVida.style.width = vidaPercent + '%';
        if (this.vida <= 0) {
            alert('sem fôlego');
            this.parar(intervaloAtual);
            return true;
        }
    }

    ganharVida() {
        this.vida = Math.min(this.vida + 2, this.vidaMaxima); 
        const vidaPercent = (this.vida / this.vidaMaxima) * 100;
        const barraVida = document.getElementById('vidakyo');
        barraVida.style.width = vidaPercent + '%';
    }

    pular(intervaloAtual) {
        if (!this.estaPulando) {
            this.estaPulando = true;
            this.velocidadeVertical = 20;
            this.direcaoPulo *= -1;
        }
        this.parar(intervaloAtual);
    }

    atualizaPosicao() {
        if (this.estaPulando) {
            let posicaoAtual = parseInt(this.elemento.style.bottom || '0px', 10);
            let posicaoHorizontal = parseInt(this.elemento.style.left || '0px', 10) + (10 * this.direcaoPulo);
            this.velocidadeVertical -= this.gravidade;
            posicaoAtual += this.velocidadeVertical;
            this.elemento.style.background = `url(./img/kyo.png) -120px -100px`;
            this.elemento.style.bottom = `${posicaoAtual}px`;
            this.elemento.style.left = `${posicaoHorizontal}px`;
            if (posicaoAtual <= 0) {
                this.elemento.style.bottom = '0px';
                this.estaPulando = false;
                this.parar(10);
            }
        }
    }

    parar(intervaloAtual) {
        this.posicaoX = 0;
        this.elemento.style.background = 'url(./img/kyo.png) -30px 0px';
        this.ganharVida();
        clearInterval(intervaloAtual);
    }

    correr(intervaloAtual) {
        this.posicaoX -= 100;
        this.perderFolego(2, intervaloAtual);
        this.elemento.style.background = `url(./img/kyo.png) ${this.posicaoX}px -200px`;
        if (this.posicaoX <= -500) {
            this.posicaoX = 0;
        }
        if (this.vida <= 0) {
            this.parar(intervaloAtual);
        }
    }

    darSoco(intervaloAtual) {
        this.posicaoX += -99;
        this.elemento.style.background = `url(./img/kyo.png) ${this.posicaoX}px -300px`;
        if (this.posicaoX <= -450) {
            this.parar(intervaloAtual);
        }
    }

    especialinicio(intervaloAtual) {
        if (this.vida <= 30) {
            alert('sem fôlego');
            this.parar(intervaloAtual);
            return true;
        }
        this.posicaoX += -104;
        this.elemento.style.background = `url(./img/kyo.png) ${this.posicaoX}px -440px`;
        if (this.posicaoX <= -550) {
            this.perderFolego(1, intervaloAtual);
            this.parar(intervaloAtual);
        }
    }

    atualizarBarraDeVida() {
        const vidaPercent = (this.vida / this.vidaMaxima) * 100;
        const barraVida = document.getElementById('vidakyo');
        barraVida.style.width = vidaPercent + '%';
    }

    morrer() {
        alert('sem fôlego');
        this.parar(intervaloAtual);
    }
}
