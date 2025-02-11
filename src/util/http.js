export const exercisesOptions = {
    method: 'GET',
    headers:{
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY || ''
    }
}


export const fetchData = async (url, options) =>{
    const response = await fetch(url, options);
    if(!response.ok){
        throw new Response(JSON.stringify('Failed to fetch data'), {status: 500})
    }
    const data = await response.json();

    return data;
}