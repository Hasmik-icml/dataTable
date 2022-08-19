import DataTable from './DataTable.js';

const columnsObject = [
    {
        value: 'ID',
        dataIndex: 'id',
        type: 'number',
    },
    {
        value: 'Name',
        dataIndex: 'name',
        type: 'string',
    },
    {
        value: 'Age',
        dataIndex: 'age',
        type: 'number'
    },
    {
        value: 'Position',
        dataIndex: 'position',
        type: 'string',
    },

];

const data = [
    {
        id:1,
        name: 'Albert',
        age: 27,  
        position: 'Developer',  
    },
    {
        id:2,
        name: 'Gevorg',
        age: 27,
        position: 'Developer',
    },
    {
        id:3,
        name: 'Jor',
        age: 27,
        position: 'Developer',
    },
    {
        id:4,
        name: 'Anahit',
        age: 17,
        position: 'Developer',
    },
    {
        id:5,
        name: 'Arusyak',
        age: 34,
        position: 'Accounting',
    },
    {
        id:6,
        name: 'Zara',
        age: 14,
        position: 'Accounting',
    },
    {
        id:7,
        name: 'Anna',
        age: 11,
        position: 'Developer',
    },
    {
        id:8,
        name: 'Hasmik',
        age: 39,
        position: 'Developer',
    },
    {
        id: 9,
        name: 'Albert',
        age: 28,
        position: 'Accounting',
    }, {
        id: 10,
        name: 'Gevorg',
        age: 25,
        position: 'Developer',
    }, {
        id: 11,
        name: 'Jor',
        age: 35,
        position: 'Developer',
    }, {
        id: 12,
        name: 'Anahit',
        age: 32,
        position: 'Accounting',
    }, {
        id: 13,
        name: 'Arusyak',
        age: 20,
        position: 'Developer',
    }, {
        id: 14,
        name: 'Zara',
        age: 18,
        position: 'Developer',
    }, {
        id: 15,
        name: 'Anna',
        age: 19,
        position: 'Developer',
    }, {
        id: 16,
        name: 'Hasmik',
        age: 18,
        position: 'Developer',
    },
    {
        id: 17,
        name: 'Albert',
        age: 25,
        position: 'Developer',
    }, {
        id: 18,
        name: 'Gevorg',
        age: 22,
        position: 'Developer',
    }, {
        id: 19,
        name: 'Jor',
        age: 24,
        position: 'Developer',
    }, {
        id: 20,
        name: 'Anahit',
        age: 23,
        position: 'Developer',
    }, {
        id: 21,
        name: 'Arusyak',
        age: 31,
        position: 'Developer',
    }, {
        id: 22,
        name: 'Zara',
        age: 37,
        position: 'Developer',
    }, {
        id: 23,
        name: 'Anna',
        age: 36,
        position: 'Developer',
    }, {
        id: 24,
        name: 'Hasmik',
        age: 21,
        position: 'Developer',
    },
    {
        id: 25,
        name: 'Albert',
        age: 26,
        position: 'Developer',
    }, {
        id: 26,
        name: 'Gevorg',
        age: 29,
        position: 'Developer',
    }, {
        id: 27,
        name: 'Jor',
        age: 16,
        position: 'Developer',
    }, {
        id: 28,
        name: 'Anahit',
        age: 28,
        position: 'Developer',
    }, {
        id: 29,
        name: 'Arusyak',
        age: 24,
        position: 'Developer',
    }, {
        id: 30,
        name: 'Zara',
        age: 32,
        position: 'Developer',
    }, {
        id: 31,
        name: 'Anna',
        age: 20,
        position: 'Developer',
    }, {
        id: 32,
        name: 'Hasmik',
        age: 23,
        position: 'Developer',
    }
];

const options = {
    dataCount: 5,
    deleteClassName: 'delete__btn', 
};

const $dataTableContainer = document.querySelector('.data-table-container');

Element.prototype.dataTable = function (columnsObject, data, options) {
  const dataTable = new DataTable(columnsObject, data, options);
  dataTable.createTable(this);
}

$dataTableContainer.dataTable(columnsObject, data, options);