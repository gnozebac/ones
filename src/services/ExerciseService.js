//const urlCrud = 'http://localhost:8081/exercises';
const urlCrud = 'https://onesportbev1.herokuapp.com/exercises';


const getExercicesByWorkoutId = async (id) => {
    const response = await fetch(`${urlCrud}/workout/${id}`);    
    const data = await response.json();
    return data;
}



export {
    getExercicesByWorkoutId
}