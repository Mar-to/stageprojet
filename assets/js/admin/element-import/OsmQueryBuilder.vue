<template>
     <div class="osm-query-builder">
        <osm-tag-search></osm-tag-search>
        <p class="text-center">
            <button type="button" class="btn btn-default" @click="queries.push([{key: '', operator: '=', value: ''}])">Ou ajouter une requête manuellement</button>
        </p>
        <div class="bs-callout" v-for="(query, queryIndex) in queries" :key="queryIndex">
            <button type="button" @click="queries.splice(queryIndex,1)" class="btn btn-default remove-query btn-icon">
                <i class="fa fa-trash"></i>
            </button>
            <div v-for="(condition, conditionIndex) in query" class="condition-container" :key="conditionIndex">
                <osm-condition :condition="condition" :key="'Query' + queryIndex + 'Condition' + 'Key' + condition.key"></osm-condition>
                <button type="button" @click="query.splice(conditionIndex,1)" class="btn btn-default btn-icon remove-condition">
                    <i class="fa fa-trash remove-condition"></i>
                </button>
            </div>
            <button type="button" class="btn btn-default btn-add-condition btn-sm" 
                    @click="query.push({key: '', operator: '=', value: ''})">Ajouter une condition</button>        
        </div>    
        <input type="hidden" :name="formName + '[osmQueriesJson]'" :value="JSON.stringify(queries)"/>
        <pre v-show="overpassQuery">{{ overpassQuery }}</pre>
    </div>
</template>

<script>
import OsmCondition from "./OsmQueryBuilderCondition"
import OsmTagSearch from "./OsmQueryBuilderTagSearch"

export default {
    components: { OsmCondition, OsmTagSearch },
    data() {
        return {
            queries: [],
            formName: "",
        }
    },
    computed: {
        overpassQuery() {
            let result = ''
            for(let query of this.queries) {
                let queryString = ''
                for(let condition of query) {
                    if (condition.operator == "" || condition.operator == "!") {
                        queryString += `[${condition.operator}"${condition.key}"]`
                    } else if (condition.value) {
                        let value = condition.value.replace(/,/g, '|') // transform multi input into reg expr
                        queryString += `["${condition.key}"${condition.operator}"${value}"]`
                    }
                }
                if (query != '') result += `node${queryString}\nway${queryString}\n`                  
            }
            return result
        }
    },
    mounted() {   
        // Global variable defined in ism-query-builder.html.twig for initialization
        this.queries = JSON.parse(osmQueries)
        this.formName = formName             
    }
}
</script>

<style lang="scss" scoped>
    .condition-container {
        display: flex;
        align-items: center;
    }
    .condition {
        display: flex;
        align-items: center;
    }
    .btn.btn-icon i {
        margin: 0;
    }
    .remove-query {
        position: absolute;
        top: -10px;
        left: -10px;
        padding: 2px 5px;
    }
    .btn-add-condition {
        margin-top: 15px;
    }
</style>