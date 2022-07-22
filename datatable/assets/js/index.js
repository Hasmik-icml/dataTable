import DataTable from './DataTable.js';

const columns = ['id', 'name', 'age'];

const data = [
    {
        id:1,
        name: 'Albert',
        age: 50,
    },
    {
        id:1,
        name: 'Gevorg',
        age: 51,
    }
]

const dataTable = new DataTable(columns, data);

dataTable.createTable();

Element.prototype.DataTable = function(){
    
}
const $table = document.querySelector('data-table-container')