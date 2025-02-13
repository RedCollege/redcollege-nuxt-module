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
const editorData = ref("")
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

console.log(props.value)

let quill: Quill | null = null
Quill.register('modules/imageUploader', ImageUploader)
Quill.register('modules/blotFormatter', BlotFormatter);

const keyBinders = {
    custom: {
        key: ['#'],
        handler: function (range, context) {
            console.log(range, context)
            // Handle shift+b
        }
    },
}

const options = ref({
    theme: 'snow',
    modules: {
        keyboard: {
            bindings: keyBinders
        },
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
    editorData.value = inputValue.value
    //model.value = quill.getText()
})


watch(editorData, (value) => {
    handleChange(value)
}, { deep: true })

watch(() => props.value, (newValue) => {
    if (newValue !== editorData.value) {
        editorData.value = newValue || ''
    }
}, { immediate: true })

</script>

<template lang="pug">
    .flex.flex-col.h-full
        pre {{value }}
        QuillyEditor(ref="editor", v-model="editorData", :options="options")
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
