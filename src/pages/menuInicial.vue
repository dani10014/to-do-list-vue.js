<template>
    <header>
        <div class="cabecalho">
            <h1 class="cabecalho_titulo">Unlist</h1>
            <button class="cabecalho_botao-idioma" @click="abrirMenuIdioma"><i class="fi fi-br"></i></button>
        </div>
    </header>
    <main>
        <div class="hero">
            <div class="hero_container">
                <div class="texto-hero">
                    <h2>{{ idiomaCarregado.HeroNoNotesLose }}</h2>
                    <p>{{ idiomaCarregado.HeroImportantNotes }}</p>
                    <div class="texto-hero_lista-beneficios">
                        <ul>
                            <li>{{ idiomaCarregado.HeroImportantMakers}}</li>
                            <li>{{ idiomaCarregado.HeroCloudSaving }}</li>
                            <li>{{ idiomaCarregado.HeroFreeService}}</li>
                        </ul>
                    </div>
                    <button class="btn-entrar">
                        Entrar
                    </button>
                </div>
            </div>
        </div>
        <Transition name="fade">
            <div v-if="menuIdiomaAtivo" class="menu-idioma">
                <div class="cabecalho">
                    <h4>Idioma</h4>
                </div>
                <div class="container-idiomas">
                    <button v-for="btn in idiomas" @click="mudarIdioma(btn)" :class="{ativoBtnIdioma:idiomaAtivo === btn}">{{ btn }}</button>
                </div>
            </div>
        </Transition>
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
                    <TransitionGroup name="fade" tag="div" class="conteudo-categoria">
                    <card
                        v-for="item in notasFiltradas" 
                        :key="item.id"
                        :dadosNota="item"
                        @deletarCard="deletarCard(item.id)"
                        @editarCard="editarNotaCard($event,item.id)"
                        @marcarConcluido="marcarConcluido(item.id)"
                        />
                    </TransitionGroup>
                </template>
                <h2 v-else>Nenhuma nota inserida</h2>
            </div>
        </div>
        <button @click="AtivarAdicionarNota" class="adicionar-anotacao"><i class="fa-solid fa-plus"></i></button>
        <Transition name="fade">
            <cardAnotacao v-if="adicionarNotaAtivo" @novaNota="adicionarNovaNota" @cancelarAdicao="cancelarAdicao"/>
        </Transition>
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
    interface linguagem{
        HeroNoNotesLose:string
        HeroImportantNotes:string
        HeroImportantMakers:string
        HeroCloudSaving:string
        HeroFreeService:string
        linguagem:string
        login:string
        NoNotes:string
        textImportant:string
        Least:string
        NotImportant:string
        title:string
        Note:string
        btnCancel:string
        btnSave:string
        btnCategoriPendent:string
        btnFinished:string
    }
    
    const menuIdiomaAtivo = ref(false);
    const adicionarNotaAtivo = ref(false);
    
    const categoria = ["Menos importante","Importante","Nao importante","Concluida","Pendentes"]
    const categoriaQueEstaAtiva = ref("Menos importante");

    const idiomas = ["English","Portugues","Espanhol"]
    const idiomasDisponiveis = ref<any[]>([]);
    const idiomaAtivo = ref("Portugues")
    const idiomaCarregado = ref<linguagem>({} as linguagem);

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
    const cancelarAdicao = () => {
        adicionarNotaAtivo.value = false
    }
    const deletarCard = (id:string) =>{
        const novaArraySemObj = notas.value.filter(item => item.id !== id)
        notas.value = novaArraySemObj;
        localStorage.setItem("notas",JSON.stringify(notas.value))
    }
    const editarNotaCard = (texto:string,id:string) =>{
        const card = notas.value.find(card => card.id === id)

        if(card){
            card.textoNota = texto;
            localStorage.setItem("notas",JSON.stringify(notas.value))
        }
    }

    const marcarConcluido = (idCard:string) =>{
        const card = notas.value.find(card => card.id === idCard)

        if(card){
            card.categoria = "Concluida"
            localStorage.setItem("notas",JSON.stringify(notas.value))
        }
    }

    const abrirMenuIdioma = ()=>{
        menuIdiomaAtivo.value = !menuIdiomaAtivo.value;
    }
    
    onMounted (async() =>{
        try{
            const buscarIdiomas = await fetch("../src/en.json")
            
            const idiomasEncontrado = await buscarIdiomas.json();
            
            if(idiomasEncontrado){
                idiomasDisponiveis.value = idiomasEncontrado
                idiomaCarregado.value = idiomasDisponiveis.value.find(idioma => idioma.linguagem === "Portugues")
            }else{
                return
            }

        }catch(error){
            console.log("Erro ao buscar dados de linguagem",error)
        }
    })
    const mudarIdioma = async (idioma:string) => {
        idiomaAtivo.value = idioma

        idiomaCarregado.value = idiomasDisponiveis.value.find(lingua => lingua.linguagem === idioma)
    }

</script>   
<style lang="scss" scoped>
    @use "../components-scss/variaveis.scss";
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(20px);
    }

    .fade-leave-active {
        position: absolute;
    }

    .fade-move {
        transition: transform 0.5s ease;
    }

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
    .menu-idioma{
        position: fixed;
        display: flex;
        flex-direction: column;
        top: 60px;
        background-color:#e6e0e0 ;
        height: 250px;
        width: 150px;
        right: 10px;
        border-radius: 10px;
        .cabecalho{
            position: fixed;
            h4{
                margin: 0;
                padding: 5px;
                @include variaveis.fonteTextoSite;
            }
        }
        .container-idiomas{
            margin-top: 30px;
            button{
                width: 100%;
                height: 20px;
                border-radius: 0;
                border: none;
                &.ativoBtnIdioma{
                    background-color: #e6e0e0;
                    border: 1px solid variaveis.$corDestaque;
                }
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
                align-items: center;
                height: 15%;
                width: 100%;
                gap:10px;
                @media (min-width:750px){
                    flex-direction: column;
                    width: 30%;
                    height: 100%;
                }
                button{
                    height: 100%;
                    width: 100%;
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
                height: 300px;
                flex-wrap: wrap;
                gap: 10px;
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