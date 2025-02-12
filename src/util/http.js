export const exercisesOptions = {
    method: 'GET',
    headers:{
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY || ''
    }
}


export const fetchExercises = async ({ url, options, signal }) =>{
    try{
        const response = await fetch(url, {...options, signal });
        if(!response.ok){
            throw new Error('An error occurred while fetching the exercises');
        }
        const data = await response.json();
        return data;
    }
    
    catch(error){
        throw error;
    }
}