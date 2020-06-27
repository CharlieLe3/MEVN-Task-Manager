import store from '../store';
import * as auth from './AuthService';

export function getAllTasks() {
    return fetch(store.state.apiUrl + '/task', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth.getToken()
        }
    });
}

export function getTaskById(id) {
    return fetch(store.state.apiUrl + `/task/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth.getToken()
        }
    });
}

export function createTask(task) {
    console.log('getting token ' + auth.getToken());
    return fetch(store.state.apiUrl + '/task', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth.getToken()
        }
    }).then(res => {
        console.log(`cool created task ${JSON.stringify(res)}`);
    });
}

export function deleteTask(id) {
    return fetch(store.state.apiUrl + `/task/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth.getToken()
        }
    });
}

export function updateTask(task) {
    return fetch(store.state.apiUrl + '/task', {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth.getToken()
        }
    });
}