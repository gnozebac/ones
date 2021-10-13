const urlCrud = 'https://onesportbev1.herokuapp.com/measures';
//const urlCrud = 'https://onesportbev1.herokuapp.com/customers';
//const urlCrudHistory = 'http://localhost:8081/history/';



const createMeasure = async (measure) => {
    const resp = await fetch(urlCrud, {
        method: 'POST',
        body: JSON.stringify(measure),
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await resp.json();
}
const getMeasureByCustomerId = async (id) => {
    const response = await fetch(`${urlCrud}/${id}`);
    const data = await response.json();
    return data;
}



export {
    createMeasure,
    getMeasureByCustomerId
}