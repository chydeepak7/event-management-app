import axios from 'axios'

export const listEvents = (keyword = "") => async (dispatch) => {
    try{
        dispatch({type:'EVENT_LIST_REQUEST'})
        const { data } = await axios.get(`/getevent/?keyword=${keyword}`);
        dispatch({type:'EVENT_LIST_SUCCESS', payload:data})
        
        } catch(error) {
        dispatch({type:'EVENT_LIST_FAIL', payload:error.message})

    }

}
// export const createEvents = () => async (dispatch) => {
//     try{
//         dispatch({type:'EVENT_CREATE_REQUEST'})
//         const { data } = await axios.get("/getevent/");
//         dispatch({type:'EVENT_CREATE_SUCCESS', payload:data})
        
//         } catch(error) {
//         dispatch({type:'EVENT_CREATE_FAIL', payload:error.message})

//     }

// }