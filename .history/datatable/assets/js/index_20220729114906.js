import DataTable from './DataTable.js';

const columns = ['id', 'name', 'age'];

const data = [
    {
        id:1,
        name: 'Albert',
        age: 50,
    },
    {
        id:2,
        name: 'Gevorg',
        age: 51,
    },
    {
        id:3,
        name: 'Jor',
        age: 51,
    },
    {
        id:4,
        name: 'Anahit',
        age: 51,
    },
    {
        id:5,
        name: 'Arusyak',
        age: 51,
    },
    {
        id:6,
        name: 'Zara',
        age: 51,
    },
    {
        id:7,
        name: 'Anna',
        age: 51,
    },
    {
        id:8,
        name: 'Hasmik',
        age: 51,
    },
    {
        id: 9,
        name: 'Albert',
        age: 50,
    }, {
        id: 10,
        name: 'Gevorg',
        age: 51,
    }, {
        id: 11,
        name: 'Jor',
        age: 51,
    }, {
        id: 12,
        name: 'Anahit',
        age: 51,
    }, {
        id: 13,
        name: 'Arusyak',
        age: 51,
    }, {
        id: 14,
        name: 'Zara',
        age: 51,
    }, {
        id: 15,
        name: 'Anna',
        age: 51,
    }, {
        id: 16,
        name: 'Hasmik',
        age: 51,
    },
    {
        id: 17,
        name: 'Albert',
        age: 50,
    }, {
        id: 18,
        name: 'Gevorg',
        age: 51,
    }, {
        id: 19,
        name: 'Jor',
        age: 51,
    }, {
        id: 20,
        name: 'Anahit',
        age: 51,
    }, {
        id: 21,
        name: 'Arusyak',
        age: 51,
    }, {
        id: 22,
        name: 'Zara',
        age: 51,
    }, {
        id: 23,
        name: 'Anna',
        age: 51,
    }, {
        id: 24,
        name: 'Hasmik',
        age: 51,
    },
    {
        id: 25,
        name: 'Albert',
        age: 50,
    }, {
        id: 26,
        name: 'Gevorg',
        age: 51,
    }, {
        id: 27,
        name: 'Jor',
        age: 51,
    }, {
        id: 28,
        name: 'Anahit',
        age: 51,
    }, {
        id: 29,
        name: 'Arusyak',
        age: 51,
    }, {
        id: 30,
        name: 'Zara',
        age: 51,
    }, {
        id: 31,
        name: 'Anna',
        age: 51,
    }, {
        id: 32,
        name: 'Hasmik',
        age: 51,
    }
];

const 
const dataTable = new DataTable(columns, data);

dataTable.createTable();

// Element.prototype.DataTable = function(){
    
// }
// const $table = document.querySelector('data-table-container')