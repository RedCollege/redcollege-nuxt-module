<script setup lang="ts">
import { onMounted, ref, defineEmits, watch, toRef } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import { useNuxtApp, useRoute } from '#app';
import ImageUploader from "quill2-image-uploader";
import BlotFormatter from '@enzedonline/quill-blot-formatter2';
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import '@enzedonline/quill-blot-formatter2/dist/css/quill-blot-formatter2.css'
import { useNotification } from '../../composables/states';
import { useField } from 'vee-validate';

interface Props {
    value?: string;
    name: string;
}

const props = defineProps<Props>()
const name = toRef(props, 'name');
const editor = ref<InstanceType<typeof QuillyEditor>>()
const model = defineModel()
const { general } = useNuxtApp().$apis

const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
    meta,
} = useField(name, undefined, {
    initialValue: props.value,
});


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
            upload: async (file: File) => {
                try {
                    const { url } = await general.auxiliar.subirArchivo(file, `editor${Number(useRoute().params.establecimientoid) > 0 ? '/' + Number(useRoute().params.establecimientoid) : ''}`)
                    if (url) return url
                } catch (error: any) {
                    useNotification().toast({
                        title: 'Hubo un inconveniente',
                        description: 'No se pudo subir el archivo, intente nuevamente.',
                    })
                }
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
    //handleChange(model.value)
}
const onTextChange = () => { }
const onSelectionChange = () => { }
const onEditorChange = (eventName: string) => {
    handleChange(model.value)
    //handleChange(model)
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
    border: 0;
    background-color: white;
}

.ql-container.ql-snow {
    border: 0;
}

.ql-toolbar.ql-snow {
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 1px solid hsl(201.3 30% 82%);
}

.ql-toolbar {
    border-radius: .5rem .5rem 0 0;
    z-index: 2;
    position: sticky;
    top: 0;
    background-color: white;
}
</style>
