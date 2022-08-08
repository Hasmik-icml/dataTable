class DataTable {
    constructor(
        columns = [],
        data = [], {
            dataCount = 5,
            rowClassName = 'table-row',
            cellClassName = 'table-cell',
            tableClassName = 'main-table',
            tableHeadClassName = 'table-head-data',
            deleteClassName = 'delete',
            inputClassName = 'search-input',
            buttonClassName = 'button-add',
            headerDiv = 'header-div',
            editClassName = 'edit-data',
        }
    ) {
        this.columns = columns;
        this.data = data;
        this.dataCount = dataCount;
        this.rowClassName = rowClassName;
        this.cellClassName = cellClassName;
        this.tableClassName = tableClassName;
        this.inputClassName = inputClassName;
        this.deleteClassName = deleteClassName;
        this.tableHeadClassName = tableHeadClassName;
        this.buttonClassName = buttonClassName;
        this.headerDiv = headerDiv;
        this.editClassName = editClassName;
    }

    createTable($dataTableContainer) {
        this.$dataTableContainer = $dataTableContainer;

        let pagesCount = Math.ceil(this.data.length / this.dataCount);
        this.pagesCount = pagesCount;
        console.log('pagesCount', pagesCount);

        let baseData = null;
        this.baseData = baseData;

        const $headerDiv = document.createElement('div');
        $headerDiv.classList.add(this.headerDiv);
        this.$dataTableContainer.appendChild($headerDiv);

        const $label = document.createElement('label');
        $label.innerHTML = 'SEARCH';
        $headerDiv.appendChild($label);

        const $searchInput = document.createElement('input');
        this.$searchInput = $searchInput;
        $searchInput.classList.add(this.inputClassName);
        $label.appendChild($searchInput);

        const $addNewData = document.createElement('button');
        $addNewData.classList.add(this.buttonClassName);
        $addNewData.innerHTML = 'Add new data';
        $addNewData.addEventListener('click', () => {
            if (document.querySelector('form')) {
                return;
            }
            this.#addNewData();
        })
        $headerDiv.appendChild($addNewData);

        const $table = document.createElement('table');
        $table.classList.add(this.tableClassName);
        this.$table = $table;

        $dataTableContainer.appendChild($table);

        this.#createThead();
        this.#createTbody();
        this.#createSelect();
        this.#renderData(this.dataCount, this.data);
        this.#createTfooter();
        this.#createSearch();
    }

    #createThead() {
        const $thead = document.createElement('thead');
        const $tr = document.createElement('tr');
        $tr.classList.add(this.rowClassName);

        this.columns.forEach((column) => {
            const $th = document.createElement('th');
            $th.classList.add(this.tableHeadClassName);
            $th.innerHTML = column.value;

            if (column.dataIndex === 'edit') {
                $th.setAttribute('data-edit', column.dataIndex);
            } else if (column.dataIndex === 'delete') {
                $th.setAttribute('data-delete', column.dataIndex);
            } else {
                $th.setAttribute('data-sort', column.dataIndex);
                $th.setAttribute('data-sort-order', 'asc');
            }

            $tr.appendChild($th);

            $th.addEventListener('click', (e) => {
                let sortMethod = $th.getAttribute('data-sort-order');
                let columnName = $th.getAttribute('data-sort');

                let tempData = this.baseData == null || this.baseData.length == 0 ? this.data : this.baseData;

                if (sortMethod === 'asc') {
                    $th.setAttribute('data-sort-order', 'des');
                    $th.innerHTML = column.value;

                    if (columnName === 'id') {
                        tempData.sort((dataA, dataB) => dataA.id - dataB.id);
                    } else if (columnName === 'name') {
                        tempData.sort((dataA, dataB) => {
                            let a = dataA.name.toLowerCase();
                            let b = dataB.name.toLowerCase();

                            if (a < b) return -1;

                            if (a > b) return 1;

                            return 0;
                        })

                    } else if (columnName === 'age') {
                        tempData.sort((dataA, dataB) => dataA.age - dataB.age);
                    }

                } else if (sortMethod === 'des') {
                    $th.setAttribute('data-sort-order', 'asc');
                    $th.innerHTML = column.value;

                    if (columnName === 'id') {
                        tempData.sort((dataA, dataB) => dataB.id - dataA.id);
                    } else if (columnName === 'name') {

                        tempData.sort((dataA, dataB) => {
                            let a = dataA.name.toLowerCase();
                            let b = dataB.name.toLowerCase();

                            if (b < a) return -1;

                            if (b > a) return 1;

                            return 0;
                        })

                    } else if (columnName === 'age') {
                        tempData.sort((dataA, dataB) => dataB.age - dataA.age);
                    }
                }

                this.$tbody.innerHTML = '';
                this.#renderData(this.dataCount, tempData);
            });
        });

        $thead.appendChild($tr);
        this.$table.appendChild($thead);
    }

    #createTbody() {
        const $tbody = document.createElement('tbody');
        this.$tbody = $tbody;
        this.$table.appendChild($tbody);
    }

    #renderData(dataCount, rData) {
        console.log(dataCount, this.data);
        for (let i = 0; i < dataCount; i++) {
            const $tr = document.createElement('tr');
            $tr.classList.add(this.rowClassName);


            for (const key in rData[i]) {
                const $td = document.createElement('td');
                $td.classList.add(this.cellClassName);
                $td.innerHTML = rData[i][key];
                $tr.appendChild($td);

            }

            if (!(i >= rData.length)) {
                const $tdDelete = document.createElement('td');
                this.$tdDelete = $tdDelete;
                this.$tdDelete.innerHTML = 'X';
                this.$tdDelete.classList.add(this.deleteClassName);
                this.$tdDelete.setAttribute('data-id', rData[i].id);
                $tr.appendChild(this.$tdDelete);

                const $tdEdit = document.createElement('td');
                this.$tdEdit = $tdEdit;
                this.$tdEdit.innerHTML = '✎';
                this.$tdEdit.classList.add(this.editClassName);
                this.$tdEdit.setAttribute('data-id', rData[i].id);
                $tr.appendChild(this.$tdEdit);
            }

            this.$tdDelete.addEventListener('click', (e) => {
                let del = e.target.dataset.id;
                console.log(del);

                if (this.baseData == null || this.baseData.length == 0) {
                    this.data = this.data.filter((dt) => {
                        return dt.id != del;
                    })
                } else {
                    this.data = this.data.filter((dt) => {
                        return dt.id != del;
                    })
                    this.baseData = this.baseData.filter((dt) => {
                        return dt.id != del;
                    })
                }

                this.pagesCount = Math.ceil(this.baseData == null || this.baseData.length == 0 ? this.data.length / this.dataCount : this.baseData.length / this.dataCount);
                console.log('data', this.baseData);
                console.log('pageCount-', dataCount);
                this.$tfooter.remove();
                this.$tbody.innerHTML = '';
                this.#createTfooter();
                this.#renderData(this.dataCount, this.baseData == null || this.baseData.length == 0 ? this.data : this.baseData);
            })

            this.$tdEdit.addEventListener('click', (e) => {
                let editDataId = e.target.dataset.id;
                console.log(editDataId);
                let editName = '';
                let editAge = '';
                this.data.forEach((dt) => {
                    console.log(editDataId);
                    if (dt.id == editDataId) {
                        editName = dt.name;
                        editAge = dt.age;
                    }
                })
                console.log(editName, editAge);
                if (document.querySelector('form')) {
                    return;
                }
                this.#addNewData(editName, editAge, editDataId);
            })

            this.$tbody.appendChild($tr);
        }
    }

    #createTfooter() {
        const $tfooter = document.createElement('tr');
        $tfooter.classList.add('btnList');
        this.$tfooter = $tfooter;
        const $td = document.createElement('td');

        const attr = document.createAttribute("colspan");
        attr.value = "4";
        $td.setAttributeNode(attr);

        for (let btnCount = 1; btnCount <= this.pagesCount; btnCount++) {
            const $btn = document.createElement('button');

            $btn.addEventListener('click', () => {
                const $prevActive = document.querySelector('.activePage');
                if ($prevActive) {
                    $prevActive.classList.remove('activePage');
                }

                $btn.classList.add('activePage');
                let pageNumber = $btn.innerText;
                this.pageNumber = pageNumber;

                this.$tbody.innerHTML = '';
                this.#pagination(this.pageNumber, this.baseData == null || this.baseData.length == 0 ? this.data : this.baseData);
            });

            $td.appendChild($btn);
            $btn.innerHTML = btnCount;
            $tfooter.appendChild($td);
        }

        this.$table.appendChild($tfooter);
    }

    #createSelect() {
        const $perPage = document.createElement('select');
        $perPage.classList.add("selectDataCount");

        for (let val = 1; val <= 5; val++) {
            const $opt = document.createElement('option');

            $perPage.appendChild($opt);
            $opt.value = val * 5;
            $opt.innerHTML = val * 5;
        }

        this.$dataTableContainer.appendChild($perPage);

        $perPage.addEventListener('change', (e) => {
            this.dataCount = e.target.value;
            this.$tbody.innerHTML = '';

            this.pagesCount = Math.ceil(this.baseData == null || this.baseData.length == 0 ? this.data.length / this.dataCount : this.baseData.length / this.dataCount);
            let pageNumber = 1;
            this.$tfooter.remove();
            this.#createTfooter();
            this.#pagination(pageNumber, this.baseData == null || this.baseData.length == 0 ? this.data : this.baseData);
        });
    }

    #createSearch() {
        let searchText = '';
        this.$searchInput.addEventListener('input', (e) => {
            searchText = e.target.value;

            console.log(this.baseData == null || this.baseData.length == 0 ? this.data : this.baseData);
            if (searchText == '') {
                this.#pagination(1, this.data);
            }

            this.baseData = this.data.filter((value) => {
                return value.name.includes(searchText) || value.id === +searchText || value.age === +searchText;
            });

            this.pagesCount = Math.ceil(this.baseData.length == 0 ? this.data.length / this.dataCount : this.baseData.length / this.dataCount);
            this.$tfooter.remove();
            this.$tbody.innerHTML = '';
            this.#createTfooter();
            console.log(this.baseData == null || this.baseData.length == 0 ? this.data : this.baseData);
            this.#renderData(this.dataCount, this.baseData == null || this.baseData.length == 0 ? this.data : this.baseData);
        });
    }

    #addNewData(name, age, id) {
        const $empatyDiv = document.createElement('div');
        $empatyDiv.classList.add('backdrop');

        const $newDataForm = document.createElement('form');

        const $newNameLabel = document.createElement('label');
        $newNameLabel.innerHTML = 'Name';
        const $newName = document.createElement('input');
        name ? $newName.value = name : "";
        $newNameLabel.appendChild($newName);

        const $newAgeLabel = document.createElement('label');
        $newAgeLabel.innerHTML = 'Age';
        const $newAge = document.createElement('input');
        age ? $newAge.value = age : "";
        $newAgeLabel.appendChild($newAge);

        const $saveButton = document.createElement('button');
        $saveButton.setAttribute('type', 'submit');
        $saveButton.setAttribute('value', 'Submit');
        $saveButton.innerHTML = 'Save';

        const $cancelButton = document.createElement('button');
        $cancelButton.setAttribute('type', 'cancel');
        $cancelButton.addEventListener('click', () => {
            const form = document.querySelector('form');
            form.remove();
            const backdrop = document.querySelector('.backdrop');
            backdrop.remove();
        })
        $cancelButton.innerHTML = 'Cancel';

        $newDataForm.appendChild($newNameLabel);
        $newDataForm.appendChild($newAgeLabel);
        $newDataForm.appendChild($saveButton);
        $newDataForm.appendChild($cancelButton);

        this.$dataTableContainer.appendChild($empatyDiv);
        this.$dataTableContainer.appendChild($newDataForm);

        $newDataForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let lastId = this.data[this.data.length - 1].id;
            if (!$newName.value || !$newAge.value) {
                alert(`The field must not be empty.`);
                return;
            }
            if (id) {
                console.log(id);
                this.data.forEach((dt) => {
                    if (dt.id == id) {
                        dt.name = $newName.value;
                        dt.age = $newAge.value;
                    }
                })
                
            this.$tbody.innerHTML = '';
            this.$tfooter.remove();
            this.#createTfooter();
            this.#pagination(this.pageNumber, this.data);
                
            } else {
                let newData = {
                    id: lastId + 1,
                    name: $newName.value,
                    age: $newAge.value,
                }
                this.data.push(newData);
                this.pagesCount = Math.ceil(this.baseData == null || this.baseData.length == 0 ? this.data.length / this.dataCount : this.baseData.length / this.dataCount);
    
                this.$tbody.innerHTML = '';
                this.$tfooter.remove();
                this.#createTfooter();
                this.#pagination(this.pagesCount, this.data);
                console.log(this.data);
            }


        })
    }

    #pagination(pageNumber, currentData) {
        console.log('pageNumber', pageNumber);
        console.log('currentData', currentData);
        let start = (pageNumber - 1) * this.dataCount;
        let end = start + this.dataCount;
        let forRender = currentData.slice(start, end);
        this.forRender = forRender;
        this.#renderData(this.dataCount, this.forRender);
    }
}

export default DataTable;