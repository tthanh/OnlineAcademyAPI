const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

export async function authenticate({ username, password }) {
}

export async function getById(id) {
}

export async function create(userParam) {
}