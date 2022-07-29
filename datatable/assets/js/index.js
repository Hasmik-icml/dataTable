import DataTable from './DataTable.js';

const columns = ['id', 'name', 'age'];

const data = [
    {
        id:1,
        name: 'Albert',
        age: 27,
    },
    {
        id:2,
        name: 'Gevorg',
        age: 27,
    },
    {
        id:3,
        name: 'Jor',
        age: 27,
    },
    {
        id:4,
        name: 'Anahit',
        age: 17,
    },
    {
        id:5,
        name: 'Arusyak',
        age: 34,
    },
    {
        id:6,
        name: 'Zara',
        age: 14,
    },
    {
        id:7,
        name: 'Anna',
        age: 11,
    },
    {
        id:8,
        name: 'Hasmik',
        age: 39,
    },
    {
        id: 9,
        name: 'Albert',
        age: 28,
    }, {
        id: 10,
        name: 'Gevorg',
        age: 25,
    }, {
        id: 11,
        name: 'Jor',
        age: 35,
    }, {
        id: 12,
        name: 'Anahit',
        age: 32,
    }, {
        id: 13,
        name: 'Arusyak',
        age: 20,
    }, {
        id: 14,
        name: 'Zara',
        age: 18,
    }, {
        id: 15,
        name: 'Anna',
        age: 19,
    }, {
        id: 16,
        name: 'Hasmik',
        age: 18,
    },
    {
        id: 17,
        name: 'Albert',
        age: 25,
    }, {
        id: 18,
        name: 'Gevorg',
        age: 22,
    }, {
        id: 19,
        name: 'Jor',
        age: 24,
    }, {
        id: 20,
        name: 'Anahit',
        age: 23,
    }, {
        id: 21,
        name: 'Arusyak',
        age: 31,
    }, {
        id: 22,
        name: 'Zara',
        age: 37,
    }, {
        id: 23,
        name: 'Anna',
        age: 36,
    }, {
        id: 24,
        name: 'Hasmik',
        age: 21,
    },
    {
        id: 25,
        name: 'Albert',
        age: 26,
    }, {
        id: 26,
        name: 'Gevorg',
        age: 29,
    }, {
        id: 27,
        name: 'Jor',
        age: 16,
    }, {
        id: 28,
        name: 'Anahit',
        age: 28,
    }, {
        id: 29,
        name: 'Arusyak',
        age: 24,
    }, {
        id: 30,
        name: 'Zara',
        age: 32,
    }, {
        id: 31,
        name: 'Anna',
        age: 20,
    }, {
        id: 32,
        name: 'Hasmik',
        age: 23,
    }
];

const options = {
    dataCount: 5,
 
};

const dataTable = new DataTable(columns, data, options);

const $dataTableContainer = document.querySelector('.data-table-container');

dataTable.createTable($dataTableContainer);

// Element.prototype.DataTable = function(){
    
// }
// const $table = document.querySelector('data-table-container')