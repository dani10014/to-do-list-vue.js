<template>
    <header>
        <div class="cabecalho">
            <h1 class="cabecalho_titulo">Unlist</h1>
            <button class="cabecalho_botao-idioma">Idioma</button>
        </div>
    </header>
    <main>
        <div class="hero">
            <div class="hero_container">
                <div class=texto-hero>
                    <h2>Não perca anotações</h2>
                    <p>Anote tudo de importante</p>
                    <div class="texto-hero_lista-beneficios">
                        <ul>
                            <li>Marcadores de importancia</li>
                            <li>Salvamento em nuvem</li>
                            <li>Totalmente grátis</li>
                        </ul>
                    </div>
                    <button class="btn-entrar">
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
    @use "../components-scss/variaveis.scss";

    header{
        background-color:inherit;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 10;
        .cabecalho{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding:variaveis.$espacamentoCabecalho;
            color: #fff;
            backdrop-filter: blur(10px);
            background-color: #ffffff0c;
            height: 32px;
            &_botao-idioma{
                height: 100%;
                @include variaveis.padraoBotao;
            }
            &_titulo{
                @include variaveis.fonteMedia;
                font-size: variaveis.$font-titulosCard;
            }
        }
    }
    main{
        .hero{
            &_container{
                width: 100%;
                height: 350px;
                background-image: url("../../src/assets/imagem-anotacoes.avif");
                background-repeat: no-repeat;
                background-size: cover;
                .texto-hero{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    height: 100%;
                    backdrop-filter: brightness(0.3);
                    color: #fff;
                    @include variaveis.fonteTextoSite;
                    h2{
                        margin: 0;
                        margin-top: 32px;
                    }
                    p{
                        margin: 0;
                        margin-bottom: 10px;
                    }
                    &_lista-beneficios{
                        ul{
                            display: flex;
                            gap: 30px;
                            padding:0;
                            font-size: variaveis.$font-informacoes;
                            margin-bottom: 32px;
                        }
                    }
                    .btn-entrar{
                        padding: 10px;
                        width: 20%;
                        height: 50px;
                        border-radius: 10px;
                        @include variaveis.fonteTextoSite;
                        @include variaveis.padraoBotao;
                    }
                }
            }
        }
    }
</style>