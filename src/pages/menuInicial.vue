<template>
    <header>
        <div class="cabecalho">
            <h1 class="cabecalho_titulo">Unlist</h1>
            <button class="cabecalho_botao-idioma"><i class="fi fi-br"></i></button>
        </div>
    </header>
    <main>
        <div class="hero">
            <div class="hero_container">
                <div class="texto-hero">
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
        <div class="main-anotacoes">
            <div class="botoes-categoria">
                <button>Menos importante</button>
                <button>Mais importante</button>
                <button>Concluidos</button>
                <button>Pendente</button>
            </div>
            <div class="conteudo-categoria">
                <div class="card">
                    <h3 class="titulo-nota">Titulo</h3>
                    <div class="informacoes">
                        <span>Importante</span>
                        <span>Pendente</span>
                    </div>
                    <textarea disabled class="area-de-texto-nota">lalala</textarea>
                    <div class="botoes-editar">
                        <button class="editar-nota">Editar</button>
                        <button class="remover">Remover</button>
                    </div>
                </div>
            </div>
        </div>
        <button class="adicionar-anotacao"><i class="fa-solid fa-plus"></i></button>
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
                width: 32px;
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
                    padding: 0 variaveis.$espacamentoRegular;
                    h2{
                        margin: 0;
                        margin-top: 32px;
                    }
                    p{
                        margin: 0;
                    }
                    &_lista-beneficios{
                        ul{
                            display: flex;
                            list-style: none;
                            padding:0;
                            font-size: variaveis.$font-informacoes;
                            margin:32px;
                            text-align: center;
                            @media (min-width:750px){
                                gap: 30px;
                                margin-bottom: 32px;
                            }
                        }
                    }
                    .btn-entrar{
                        padding: 10px;
                        width: 40%;
                        height: 50px;
                        border-radius: 10px;
                        @include variaveis.fonteTextoSite;
                        @include variaveis.padraoBotao;
                        @media (min-width:750px){
                            width: 20%;
                        }
                    }
                }
            }
        }
        .main-anotacoes{
            display: flex;
            flex-direction: column;
            margin: 0 variaveis.$espacamentoRegular;
            margin-top: variaveis.$espacamentoRegular;
            height: 350px;
            gap: 20px;
            @media (min-width:750px){
                flex-direction: row;
            }
            .botoes-categoria{
                display: flex;
                justify-content: center;
                flex-direction: row;
                height: 15%;
                width: 100%;
                gap:10px;
                @media (min-width:750px){
                    flex-direction: column;
                    width: 30%;
                    height: 100%;
                }
                button{
                    width: 100%;
                    height: 100%;
                    @include variaveis.padraoBotao;
                }
            }
            .conteudo-categoria{
                width: 100%;
                display: flex;
                height: 250px;
                overflow-y: scroll;
                @media (min-width:750px){
                    width: 50%;
                }
            }
            .card{
                @include variaveis.fonteTextoSite;
                padding: variaveis.$espacamentoCabecalho;
                overflow-y: scroll;
                @include variaveis.padraoCard;
                .titulo-nota{
                    text-align: center;
                }
                .informacoes{
                    display: flex;
                    justify-content: center;
                    margin-bottom: 2rem;
                    gap: 10px;
                    span{
                        font-size: variaveis.$font-informacoes;
                        background-color: red;
                        padding: 0.3rem;
                        border-radius: 5px;
                        color: #fff;
                    }
                }
                .area-de-texto-nota{
                    margin-bottom:10px;
                }
                .botoes-editar{
                    display: flex;
                    gap: 10px;
                    margin-top: 1rem;
                    button{
                        width: 100%;
                        height:30px
                    }
                }
            }
        }
        .adicionar-anotacao{
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            right: 40px;
            bottom: 40px;
            height: 50px;
            width: 50px;
            border-radius: 50%;
            border: none;
            background-color: #e6e0e0;
            transition: all 0.3s ease-in-out;
            &:hover{
                background-color:darken($color: #e6e0e0, $amount: 20%);
            }
        }
    }
</style>