//const urlCrud = 'http://localhost:8081/history';
const urlCrud = 'https://onesportbev1.herokuapp.com/history';
//const urlCrudHistory = 'http://localhost:8081/history/';



const getHistoryByCustomerId = async (id) => {
    const response = await fetch(`${urlCrud}/${id}`);
    const data = await response.json();
    return data;
}



export {

    getHistoryByCustomerId
}