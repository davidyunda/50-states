<template>
    <div>
        <p>There are {{ states.length }} states and the District of Columbia</p>
        <p>You have visited {{ totalVisited }} {{ units }} </p>

        <!-- display message if all states are visited -->
        <p class="all-visited-message" v-if="areAllVisited">You have visited all the states and the District of Columbia!</p>
    </div>
</template>

<script>
export default {
    name: 'StateSummary',
    props: {
        states: Array
    },
    computed: {
        totalVisited() {
            let visitedCount = 0
            this.states.forEach( state => {     // add count for each state visited
                if (state.visited) {
                    visitedCount++
                }
            })
            return visitedCount 
        },
        units() {
            if (this.totalVisited == 1 ) {
                return 'state'
            } else {
                return 'states'
            }
        },
        areAllVisited() {
            return this.totalVisited === this.states.length     
        }
    }
}
</script>

<style scoped>
.all-visited-message {
    color: blue;
    font-weight: 600;
}
</style>