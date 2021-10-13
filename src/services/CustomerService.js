//const urlCrud = 'http://localhost:8081/customers';
const urlCrud = 'https://onesportbev1.herokuapp.com/customers';
const urlCrudHistory = 'https://onesportbev1.herokuapp.com/history/';

const getOneCustomer = async (id) => {
    const response = await fetch(`${urlCrud}/${id}`);    
    return response;
    //   data = await response.json();
}

const getDataBmi = async (id) => {
    const response = await fetch(`${urlCrud}/${id}/bmi`);
    const data = await response.json();
    return data;
}

const getDataHistory = async (id) => {
    const response = await fetch(`${urlCrudHistory}/${id}`);
    const data = await response.json();
    return data;
}

const createCustomer = async (customer) => {
    
    const resp = await fetch(urlCrud, {
        method: 'POST',
        body: JSON.stringify(customer),
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await resp.json();
}

const updateAllCustomer = async (customer) => {
    const resp = await fetch(urlCrud, {
        method: 'PUT',
        body: JSON.stringify(customer),
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await resp.json();
}



const addHistory = async (dataWeight) => {
    const resp = await fetch(urlCrudHistory, {
        method: 'POST',
        body: JSON.stringify(dataWeight),
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await resp.json();
}

const updateCustomer = async (customer) => {
    const resp = await fetch(urlCrud, {
        method: 'PATCH',
        body: JSON.stringify(customer),
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await resp.json();
}

const delteCustomer = async (id, customer) => {

    const resp = await fetch(`${urlCrud}/${id} `, {
        method: 'DELETE'
    });
    //console.log(await resp.json());
    return (resp.ok) ? 'Borrado' : 'No se puede elminar';
}

export {
    createCustomer,
    updateCustomer,
    updateAllCustomer,
    delteCustomer,
    getOneCustomer,
    getDataBmi,
    getDataHistory,
    addHistory
}