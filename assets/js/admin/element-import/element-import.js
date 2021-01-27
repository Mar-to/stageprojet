import OsmQueryBuilder from './OsmQueryBuilder.vue'
import Vue from 'vue/dist/vue.esm'

document.addEventListener('DOMContentLoaded', function() {
    if ($('#element-import').length > 0) {
        new Vue({
            el: "#element-import",
            data: {
                sourceType: undefined,
                url: undefined,
                osmQueriesJson: undefined,
                formName: "",
            },
            components: { OsmQueryBuilder },
            mounted() {
                for(let key in importObject) this[key] = importObject[key]
                this.osmQueriesJson = JSON.parse(this.osmQueriesJson)
                this.formName = formName
                $(`#sonata-ba-field-container-${formName}_file`).appendTo('.file-container')
            }, watch: {
                sourceType(newVal) {
                    $('.input-is-synched').closest('.checkbox').toggle(newVal == 'osm')
                }
            }
        })
    }
})
