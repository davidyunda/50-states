import axios from 'axios'

export default {
    getAllStates() {        // api for states
        return axios.get('/api/states').then( response => {
            return response.data
        })
    },
    setVisited(stateName, visited) {        // api for state visited
        // example api/states/Wisconsin
        let data = { visited: visited }
        return axios.patch('/api/states/' + stateName, data).then( response => {
            return response.data
        }) 
    },
    getOneState(stateName) {        // api for each state
        return axios.get('/api/state/' + stateName).then( response => {
            return response.data
        })
    },
    // visitedStates(stateName, visited) {
    //     let stateVisit = {visited: visited}
    //     return axios.get('/api/states/' + stateName, stateVisit).then( response => {
    //         return response.data
    //     })
    // }
}