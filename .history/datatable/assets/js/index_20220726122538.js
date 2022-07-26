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
           id: 1,
           name: 'Albert',
           age: 50,
       }, {
           id: 2,
           name: 'Gevorg',
           age: 51,
       }, {
           id: 3,
           name: 'Jor',
           age: 51,
       }, {
           id: 4,
           name: 'Anahit',
           age: 51,
       }, {
           id: 5,
           name: 'Arusyak',
           age: 51,
       }, {
           id: 6,
           name: 'Zara',
           age: 51,
       }, {
           id: 7,
           name: 'Anna',
           age: 51,
       }, {
           id: 8,
           name: 'Hasmik',
           age: 51,
       }
];

const dataTable = new DataTable(columns, data);

dataTable.createTable();

// Element.prototype.DataTable = function(){
    
// }
// const $table = document.querySelector('data-table-container')