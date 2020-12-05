import OsmQueryBuilder from './osm-query-builder.js'

window.myapp = new Vue({
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