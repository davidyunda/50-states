<template>
    <div class="state-mpa">
        <h2>The state of {{ state.name }}</h2>

        <p v-if="state.visited">You have visited this state</p>
        <p v-else>You have not visited this state yet</p>

        <!-- display leaflet map and getting info like lat, lon and zoom-->
        <div id="map-container" v-if="dataReady">
            <l-map ref="map" v-on:ready="onMapReady" v-bind:center="mapCenter" v-bind:zoom="state.zoom">     
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
            state: {},
            dataReady: false,
            mapReady: false
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
                this.dataReady = true
            }).catch( err => {
                //404 not found
                if ( err.response && err.response.status === 404 ) {
                    // this.state.name = '?'

                    // Programatically navigate to the Not Found page
                    this.$router.push({ name: 'NotFound'})
                }else {
                    // 500 server error
                    alert('Sorry, error fetching data about this state')        // general message for the user
                    console.error(err)        // for the developer
                }
            })
        },
        onMapReady() {
            this.mapReady = true
        },
        setMapView() {
            if (this.mapReady && this.dataReady) {
                this.$refs.map.leafletObject.setMapView(this.mapCenter, this.mapZoom)        // check if the map and data is ready
            }
        }
    },
    computed: {
        mapCenter() {
            return [this.state.lat, this.state.lon ]
        }    
    }
}
</script>

<style scoped>
#map-container {
    height: 30rem;
}
</style>