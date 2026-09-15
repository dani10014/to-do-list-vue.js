<template>
<div class="card">
    <h3 class="titulo-nota">{{ dadosNota.titulo }}</h3>
        <div class="informacoes">
            <span>{{ dadosNota.categoria }}</span>
        </div>
        <textarea disabled v-if="!edicaoAtiva" class="area-de-texto-nota">{{ dadosNota.textoNota }}</textarea>
        <textarea v-if="edicaoAtiva" v-model="novoTextoNota" class="area-de-texto-nota"></textarea>
        <div class="botoes-editar">
            <button class="editar-nota" v-if="!edicaoAtiva" @click="editarCard">Editar</button>
            <button class="editar-nota" v-if="edicaoAtiva" @click="cancelarEdicao">Cancelar</button>
            <button class="editar-nota" v-if="edicaoAtiva" @click="salvarEdicao">Salvar</button>
            <button class="remover" v-if="!edicaoAtiva" @click="deletarCard">Remover</button>
        </div>
</div>
</template>
<script setup lang="ts">
    import {ref,reactive} from "vue";

    interface nota{
        id:string,
        titulo:string,
        textoNota:string,
        categoria:string,
    }

    const novoTextoNota = ref("");

    const edicaoAtiva = ref(false);

    const emit = defineEmits(['deletarCard','editarCard'])
    
    const props = defineProps<{
        dadosNota:nota
    }>()

    const deletarCard = () =>{
        emit('deletarCard')
    }
    const editarCard = () =>{
        edicaoAtiva.value = true;
    }
    const cancelarEdicao = () =>{
        edicaoAtiva.value = false;
        novoTextoNota.value = "";
    }
    const salvarEdicao = () =>{
        emit('editarCard',novoTextoNota.value)
        edicaoAtiva.value = false;
    }
</script>
<style lang="scss" scoped>
    @use "../components-scss/variaveis.scss";

    .card{
        @include variaveis.fonteTextoSite;
        padding: variaveis.$espacamentoCabecalho;
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

</style>