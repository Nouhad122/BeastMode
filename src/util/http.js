export const exercisesOptions = {
    method: 'GET',
    headers:{
        "X-Rapidapi-Host": "exercisedb.p.rapidapi.com",
        "X-Rapidapi-Key": import.meta.env.VITE_RAPID_API_KEY || ''
    }
}

export const youtubeOptions = {
    method: 'GET',
    headers: {
        "X-Rapidapi-Host": "youtube-search-and-download.p.rapidapi.com",
        "X-Rapidapi-Key": import.meta.env.VITE_RAPID_API_KEY || ''
    }
}


export const fetchData = async ({ url, options, signal }) =>{
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

export const fetchExerciseDetail = async ({id, options, signal}) =>{
    try{
        const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,{...options, signal});
        if(!response.ok){
            throw new Error('An error occurred while fetching the exercise detail');
        }
        const data = await response.json();
        return data;
    }

    catch(error){
        throw error;
    }
}