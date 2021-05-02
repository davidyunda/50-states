<template>
    <div class="state-mpa">
        <h2>The state of {{ state.name }}</h2>

        <p v-if="state.visited">You have visited this state</p>
        <p v-else>You have not visited this state yet</p>

        <!-- display leaflet map and getting info like lat, lon and zoom-->
        <div id="map-container">
            <l-map v-bind:center="mapCenter" v-bind:zoom="state.zoom">     
                <l-tile-layer
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution="&copy; OpenstreetMap contributors"
                >
                </l-tile-layer>
            </l-map>
        </div>
    </div>    
</template>

<script>

import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'

export default {
    name: 'StateMap',
    components: {
        LMap, 
        LTileLayer
    },
    data() {
        return {
            state: {}
        }
    },
    mounted() {
        this.state.name = this.$route.params.state      // get route for each state
        this.fetchStateData()
    },
    methods: {
        fetchStateData() {
            this.$stateService.getOneState(this.state.name).then( state => {
                this.state = state      // send info for state object from props
            })
        }
    }
}
</script>

<style scoped>
#map-container {
    height: 30rem;
}
</style>