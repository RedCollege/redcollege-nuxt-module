<script setup lang="ts">
import { onMounted, ref, defineEmits, watch } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import { Delta, Range } from 'quill/core'
import { useNuxtApp, useRoute } from '#app';
import ImageUploader from 'quill-image-uploader';
import BlotFormatter from 'quill-blot-formatter';
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { useNotification } from '../../composables/states';

const editor = ref<InstanceType<typeof QuillyEditor>>()
const model = defineModel()
const editorDelta = ref<Delta>()
const editorRange = ref<Range>()
const { general } = useNuxtApp().$apis

let quill: Quill | null = null
Quill.register('modules/imageUploader', ImageUploader)
Quill.register('modules/blotFormatter', BlotFormatter);

const options = ref({
    theme: 'snow',
    modules: {
        toolbar: [
            [{ font: [] }, { size: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            //[{ script: 'super' }, { script: 'sub' }],
            [{ header: '1' }, { header: '2' }, 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['direction', { align: [] }],
            ['link', 'image'],
            ['clean']
        ],
        blotFormatter: {

        },
        imageUploader: {
            upload: (file: any) => {
                return new Promise((resolve, reject) => {
                    general.auxiliar.subirArchivo(file, `editor${Number(useRoute().params.establecimientoid) > 0 ? '/' + Number(useRoute().params.establecimientoid) : ''}`)
                    .then((data: any) => {
                        const { url } = data?.archivo
                        if(url){
                            resolve(url)
                        }
                    })
                    .catch((error: any) => {
                        useNotification().toast({
                            title: 'Hubo un inconveniente',
                            description: 'No se pudo subir el archivo, intente nuevamente.',
                        })
                    })
                });
            }
        }
    },
    placeholder: 'Escribir aquí ...',
    readOnly: false
})
let isProcessing = false;
onMounted(() => {
    quill = editor.value?.initialize(Quill)!
    //model.value = quill.getText()
})

const emit = defineEmits(['update:modelValue'])

const onModelValueChange = (value: string) => {

}
const onTextChange = (({ delta }: { delta: Delta }) => {
})
const onSelectionChange = ({ range }: { range: Range }) => (editorRange.value = range)
const onEditorChange = (eventName: string) => {
}

</script>

<template lang="pug">
    .flex.flex-col.h-full
        QuillyEditor(ref="editor", v-model="model", :options="options" @update:model-value="onModelValueChange"
        @text-change="onTextChange" @selection-change="onSelectionChange" @editor-change="onEditorChange")
</template>

<style lang="css">
.ql-container {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    border-radius: 0 0 .5rem .5rem;
}

.ql-toolbar{
    border-radius: .5rem .5rem 0 0;
}

</style>
