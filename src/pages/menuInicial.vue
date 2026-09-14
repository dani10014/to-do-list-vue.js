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
                <button 
                    v-for = "item in categoria"
                    @click = "categoriaQueEstaAtiva = item"
                    :class="{ ativoCategoria: categoriaQueEstaAtiva === item }"
                    >{{ item }}
                </button>
            </div>
            <div class="conteudo-categoria">
                <template v-if ="notasFiltradas.length > 0" >
                    <card
                        v-for="item in notasFiltradas" 
                        :key="item.id"
                        :dadosNota="item"
                    />
                    
                </template>
                <h2 v-else>Nenhuma nota inserida</h2>
            </div>
        </div>
        <button @click="AtivarAdicionarNota" class="adicionar-anotacao"><i class="fa-solid fa-plus"></i></button>
        <cardAnotacao v-if="adicionarNotaAtivo" @novaNota="adicionarNovaNota"/>
    </main>
</template>
<script setup lang="ts">
    import { onMounted,ref,computed } from "vue";
    import card from "../component/card.vue";
    import cardAnotacao from "../component/cardAdicionarAnotacao.vue";
    
    interface nota{
        id:string,
        categoria:string,
        titulo:string,
        textoNota:string,
    }

    const adicionarNotaAtivo = ref(false);
    
    const categoria = ["Menos importante","Importante","Nao importante","concluidas","Pendentes"]
    const categoriaQueEstaAtiva = ref("Menos importante");
    const notas = ref<nota[]>([]);
    
    const AtivarAdicionarNota = () =>{
        if(adicionarNotaAtivo.value === true){
            adicionarNotaAtivo.value = false;
        }else{
            adicionarNotaAtivo.value = true;
        }
    }
    onMounted(() => {
        let nota = localStorage.getItem("notas")

        if(nota){
            notas.value = JSON.parse(nota)
        }
    })

    const notasFiltradas = computed(() => {
        return notas.value.filter(n => n.categoria === categoriaQueEstaAtiva.value);
    });

    const adicionarNovaNota = (dados:any) => {
        if(dados){
            notas.value.push(dados)
            localStorage.setItem("notas",JSON.stringify(notas.value))
            adicionarNotaAtivo.value = false;
        }else{
            return
        }
    }
    
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
            height: 50px;
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
                    &.ativoCategoria{
                        background-color: grey;
                        color: #fff;
                    }
                }
            }
            .conteudo-categoria{
                width: 100%;
                display: flex;
                height: 250px;
                flex-wrap: wrap;
                gap: 10px;
                @media (min-width:750px){
                    width: 100%;
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
            z-index: 300;
            &:hover{
                background-color:darken($color: #e6e0e0, $amount: 20%);
            }
        }
</style>