<template>
    <div class="container">
        <div class="card">
            <h2>Adicionar anotacao</h2>
            <div class="botoes-importancia">
                <button class="btn-importante">Importante</button>
                <button class="btn-menos-importante">Menos importante</button>
                <button class="nao-importante">Não importante</button>
            </div>
            <h4 class="titulo-anotacao">Titulo anotação</h4>
            <textarea class="area-texto-nota" ></textarea>

            <h4 class="titulo-anotacao">Anotação</h4>
            <textarea class="area-texto-nota" ></textarea>

            <div class="botoes-cancelar-excluir">
                <button class="cancelar">Cancelar</button>
                <button class="adicionar">Adicionar</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

</script>
<style lang="scss" scoped>
@use "../components-scss/variaveis.scss";

    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        background: rgba(32, 37, 45, .48);
        backdrop-filter: blur(5px);
        .card{
            background-color: variaveis.$corSuperficie;
            min-height: 400px;
            width: min(680px, calc(100% - 32px));
            @include variaveis.padraoCard;
            text-align: left;
            padding: 28px;
            h2{
                @include variaveis.fonteTextoSite;
                margin-top: 0;
                color: variaveis.$corTexto;
            }
            .botoes-importancia{
                display: flex;
                gap: 10px;
                width: 100%;
                button{
                    width: 100%;
                    height: 38px;
                    border: 1px solid variaveis.$corBorda;
                    border-radius: 7px;
                    box-shadow: none;
                    transition: all 0.3s ease-in-out;
                    &:hover{
                        filter: brightness(.96);
                    }
                }
                .btn-importante{
                    background-color: #fff0ed;
                    color: variaveis.$corDestaqueEscuro;
                }
                .btn-menos-importante{
                    background-color: #fff8df;
                }
                .btn-nao-importante{
                    background-color: #edf0f3;
                }
            }
            .titulo-anotacao{
                @include variaveis.fonteTextoSite;
                text-align: start;
                margin-top: 22px;
                margin-bottom: 10px;
            }
            .area-texto-nota{
                width: 100%;
                min-height: 54px;
                padding: 12px;
                border: 1px solid variaveis.$corBorda;
                border-radius: 7px;
                resize: vertical;
                font: inherit;
            }
            .botoes-cancelar-excluir{
                display: flex;
                justify-content: flex-end;
                margin-top: 24px;
                gap: 10px;
                button{
                    height: 50px;
                    border: 0;
                    border-radius: 7px;
                    padding:0 variaveis.$espacamentoCabecalho;
                    color: #fff;
                }
                .adicionar{
                    background-color: variaveis.$corDestaque;
                }
                .cancelar{
                    background-color: #edf0f3;
                    color: variaveis.$corTexto;
                }
            }
        }
    }
</style>