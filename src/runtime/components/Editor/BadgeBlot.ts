import { Quill } from "@vueup/vue-quill";
const Inline = Quill.import("blots/inline");

class BadgeBlot extends Inline {
    static create(){
        const node = super.create();
        node.classList.add('badge')
        return node;
    }

    static formats(){
        return true
    }
}

BadgeBlot.blotName = 'badge'
BadgeBlot.tagName = 'span'

export default BadgeBlot
