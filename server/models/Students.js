const database = require('../database');
const {
    findPersonByPid,
    findPersonByUsername,
    findPersonByEmail,
    addPerson,
    deletePerson,
    findPersonByUsernameAccess
} = require('../models/Person')
const {
    findUniByUid,
    findUniNameList,
    findUniBySpid,
    addUni,
    findUniByName
} = require('../models/Universities')

const {
    comparePassword,
    hashPassword
} = require('../controllers/encrypt')

async function findStudentByPid(pid) {
    return database.query("SELECT p.pid, p.uid, username, first_name, last_name, email, phone, access FROM Students s INNER JOIN Person p ON s.pid = p.pid WHERE s.pid = ?", [pid])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function addStudent(student) {
    const {
        username,
        password,
        first_name,
        last_name,
        phone,
        email,
        university
    } = student;

    const uid = await findUniByName(university)
    .then((data) => data.uid)
    .catch((err) => console.log(err));

    const pid = await addPerson({
        username,
        password,
        first_name,
        last_name,
        phone,
        email,
        uid,
        access: 'student'
    });

    database.query("INSERT INTO Students (pid, uid) VALUES (?, ?)", [pid, uid])
    .catch(err => {
        console.log(err);
        throw err;
    });
}

async function findStudentByUsername(username) {
    const person = await findPersonByUsernameAccess(username, 'Student');
    if (!person)
        {
        return null;
        }
    const student = await database.query("SELECT * FROM Students WHERE pid = ?", [person.pid])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    })

    return {
        ...person,
        ...student
    };
}

module.exports = {
    findStudentByPid,
    addStudent,
    findStudentByUsername
}
