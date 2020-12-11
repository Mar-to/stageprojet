import OsmQueryBuilder from './OsmQueryBuilder.vue'
import Vue from 'vue/dist/vue.esm'

$(document).on('ready', function() {
    if ($('#element-import').length > 0) {
        new Vue({
            el: "#element-import",
            data: {
                sourceType: undefined,
                url: undefined,
                formName: "",
            },
            components: { OsmQueryBuilder },
            mounted() {
                for(let key in importObject) this[key] = importObject[key]
                this.formName = formName
                $(`#sonata-ba-field-container-${formName}_file`).appendTo('.file-container')
            }
        })
    }
})
