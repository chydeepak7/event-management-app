import axios from 'axios'

export const listEvents = () => async (dispatch) => {
    try{
        dispatch({type:'EVENT_LIST_REQUEST'})
        const { data } = await axios.get("/getevent/");
        dispatch({type:'EVENT_LIST_SUCCESS', payload:data})
        
        } catch(error) {
        dispatch({type:'EVENT_LIST_FAIL', payload:error.message})

    }

}