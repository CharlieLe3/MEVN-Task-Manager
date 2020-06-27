import store from '../store'
import jwt from 'jsonwebtoken';

export function isLoggedIn() {
    const token = localStorage.getItem('token');
    return token != null;
}

export function login(user) {

    console.log('This is the user ' + JSON.stringify(user));
    return fetch(store.state.apiUrl + '/auth', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    })
    .then((res) => {
        if (res) {
            res.json().then((rez) => setToken(rez.token));            
        }
    });
}

export function logout() {
    localStorage.clear();
    store.dispatch('authenticate');
}

export function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
    store.dispatch('authenticate');
}

export function getUsername() {
    const token = decodeToken();
    if (!token) {
        return null;
    }
    return token.user.username;
}

export function getUserId() {
    const token = decodeToken();
    if (!token) {
        return null;
    }
    return token.user.id;
}

export function registerUser(user) {
    return fetch(store.state.apiUrl + '/register', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    });
}

function decodeToken() {
    const token = getToken();
    if (!token) {
        return null;
    }

    return jwt.decode(token);
}