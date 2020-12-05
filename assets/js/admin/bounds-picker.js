export default {
    data() {
        return {
            queryBounds: null
        }
    },
    mounted() {
        // Init map. DefaultBounds and tileLayer areset in osm-query-builder.html.twig
        let map = L.map('map-bounds-select', {editable: true});
        L.tileLayer(tileLayer).addTo(map);
        map.fitBounds(defaultBounds);   
        this.queryBounds = L.latLngBounds(defaultBounds); 
        // Start drawing rectangle
        map.editTools.startRectangle();
        // Init shades
        let shades = new L.LeafletShades();
        shades.addTo(map);     
        shades.on('shades:bounds-changed', (event) => { 
            console.log("new bounds", event.bounds)
            this.queryBounds = event.bounds
        });
    },
    template: `
        <div id="map-bounds-select"></div>
    `
}