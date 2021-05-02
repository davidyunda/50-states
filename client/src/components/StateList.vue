<template>
    <div class="state-list-container">

        <!--display each state and chech if visited or not -->
        <div class="state-list" v-for="state in states" v-bind:key="state.name">
            <state-detail 
            v-bind:state="state"
            v-on:update-visited="updateVisited"
            ></state-detail>
        </div>
    
    </div>
</template>

<script>
import StateDetail from './StateDetail.vue'
export default {
    components: { StateDetail},
    name: 'StateList',
    data() {
        return {
            states: []
        }
    },
    mounted() {
        this.fetchAllStates()
    },
    methods: {
        fetchAllStates() {
            this.$stateService.getAllStates().then ( states => {        // get all the states
                this.states = states
            })
        },
        updateVisited(stateName, visited) {
            this.$stateService.setVisited(stateName, visited).then( () => {     // get path and then update visited
                this.fetchAllStates()
            })
        }
    }
}
</script>

<style scoped>
.state-list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly
}
.state-list {
    margin: 1rem
}
</style>