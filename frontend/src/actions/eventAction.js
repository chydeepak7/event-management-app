import axios from 'axios'


export const listEvents = (keyword = "", date = "") => async (dispatch) => {
    try {
        dispatch({ type: 'EVENT_LIST_REQUEST' });

        // Construct the URL with query parameters
        let url = `/getevent/?`;
        if (keyword) {
            url += `keyword=${encodeURIComponent(keyword)}&`;
        }
        if (date) {
            url += `date=${encodeURIComponent(date)}`;
        }

        const { data } = await axios.get(url);
        dispatch({ type: 'EVENT_LIST_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'EVENT_LIST_FAIL', payload: error.message });
    }
};
// export const createEvents = () => async (dispatch) => {
//     try{
//         dispatch({type:'EVENT_CREATE_REQUEST'})
//         const { data } = await axios.get("/getevent/");
//         dispatch({type:'EVENT_CREATE_SUCCESS', payload:data})
        
//         } catch(error) {
//         dispatch({type:'EVENT_CREATE_FAIL', payload:error.message})

//     }

// }