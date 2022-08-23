class DataTable {
    constructor(
        columns = [],
        data = [], {
            dataCount = 5,
            rowClassName = '',
            cellClassName = '',
            tableClassName = '',
            tableHeadClassName = '',
            deleteClassName  = '',
            inputClassName  = '',
            buttonClassName  = '',
            headerDiv  = '',
            editClassName  = '',
        }
    ) {
        this.columns = columns;
        this.data = data;
        this.dataCount = dataCount;
        this.rowClassName = `table-row ${rowClassName}`;
        this.cellClassName = `table-cell ${cellClassName}`;
        this.tableClassName = `main-table ${tableClassName}`;
        this.inputClassName = `search-input ${inputClassName}`;
        this.deleteClassName = `delete ${deleteClassName}`;
        this.tableHeadClassName = `table-head-data ${tableHeadClassName}`;
        this.buttonClassName = `button-add ${buttonClassName}`;
        this.headerDiv = `header-div ${headerDiv}`;
        this.editClassName = `edit-data ${editClassName}`;
    }

    createTable($dataTableContainer) {
        this.$dataTableContainer = $dataTableContainer;

        let pagesCount = Math.ceil(this.data.length / this.dataCount);
        this.pagesCount = pagesCount;
        console.log('pagesCount', pagesCount);

        this.baseData = null;
        this.selectedData = [];

        const $headerDiv = document.createElement('div');
        $headerDiv.setAttribute('class', this.headerDiv)
        this.$dataTableContainer.appendChild($headerDiv);

        const $label = document.createElement('label');
        $label.innerHTML = 'SEARCH';
        $headerDiv.appendChild($label);

        const $searchInput = document.createElement('input');
        this.$searchInput = $searchInput;
        
        $searchInput.setAttribute('class',this.inputClassName);
        $label.appendChild($searchInput);

        const $addNewData = document.createElement('button');
        $addNewData.setAttribute('class', this.buttonClassName);
        $addNewData.innerHTML = 'Add new data';
        $addNewData.addEventListener('click', () => {
            if (document.querySelector('form')) {
                return;
            }
            this.#addNewData();
        })
        $headerDiv.appendChild($addNewData);

        const $table = document.createElement('table');
        $table.setAttribute('class', this.tableClassName);
        this.$table = $table;

        $dataTableContainer.appendChild($table);

        this.#createThead();
        this.#createTbody();
        this.#createSelect();
        this.#pagination(1, this.data);
        this.#createTfooter();
        this.#createSearch();

        const $buttons = document.querySelectorAll('button');
        for (let i = 0; i < $buttons.length; i++){

            if ($buttons[i].innerHTML === '1') {
                $buttons[i].classList.add('activePage');
            }

        }
        this.pageNumber = 1;
    }

    #createThead() {
        const $thead = document.createElement('thead');
        const $tr = document.createElement('tr');
        $tr.setAttribute('class', this.rowClassName);

        const $checkB = document.createElement('input');
        this.$checkB = $checkB;
        $checkB.setAttribute('type', 'checkbox');
        $tr.appendChild($checkB);

        $checkB.addEventListener('change', (e) => {
            const $allCheckbox = document.querySelectorAll('input[type=checkbox]');
            this.$allCheckbox = $allCheckbox;
    
            $allCheckbox.forEach(ch => {

                    if ($checkB.checked) {

                        if (ch.dataset.id) {
                            console.log(ch.dataset.id);
                            ch.checked = true;

                            if (!this.selectedData.includes(ch.dataset.id)) {
                                this.selectedData.push(ch.dataset.id);
                            }

                        }
                    } else {
                        ch.checked = false;
                        this.selectedData = this.selectedData.filter(dt => {
                            return dt !== ch.dataset.id;
                        });
                        this.$selectedDataButton && this.$selectedDataButton.remove();
                        this.#selectedDatas();
                    }  
                    
                });

                if (this.selectedData.length) {
                    this.$selectedDataButton && this.$selectedDataButton.remove();
                    this.#selectedDatas();
                }

        })
    

        const $thDelete = document.createElement('th');
        $thDelete.innerHTML = 'Delete';
        $thDelete.setAttribute('data-delete', 'delete');

        const $thEdit = document.createElement('th');
        $thEdit.innerHTML = 'Edit';
        $thEdit.setAttribute('data-delete', 'edit');

        this.columns.forEach((column) => {
            const $th = document.createElement('th');
            $th.setAttribute('class', this.tableHeadClassName);
            $th.innerHTML = column.value;

            $th.setAttribute('data-sort', column.dataIndex);
            $th.setAttribute('data-sort-order', 'asc');

            $tr.appendChild($th);
            $tr.appendChild($thDelete);
            $tr.appendChild($thEdit);

            $th.addEventListener('click', (e) => {
                let sortMethod = $th.getAttribute('data-sort-order');
                let columnName = $th.getAttribute('data-sort');
                console.log(columnName);
                let tempData = this.baseData == null || this.baseData.length == 0 ? this.data : this.baseData;

                if (sortMethod === 'asc') {
                    $th.setAttribute('data-sort-order', 'des');
                    $th.innerHTML = column.value;

                    // if (columnName === 'id') {
                    //     tempData.sort((dataA, dataB) => dataA.id - dataB.id);
                    // } else if (columnName === 'name') {
                        tempData.sort((dataA, dataB) => {

                            let a = dataA[columnName].toString().toLowerCase();
                            let b = dataB[columnName].toString().toLowerCase();

                            if (a < b) return -1;

                            if (a > b) return 1;

                            return 0;
                        })
                        tempData.sort((dataA, dataB) => dataA[columnName] - dataB[columnName]);

                    // } else if (columnName === 'age') {
                    //     tempData.sort((dataA, dataB) => dataA.age - dataB.age);
                    // }

                } else if (sortMethod === 'des') {
                    $th.setAttribute('data-sort-order', 'asc');
                    $th.innerHTML = column.value;

                    // if (columnName === 'id') {
                    //     tempData.sort((dataA, dataB) => dataB.id - dataA.id);
                    // } else if (columnName === 'name') {
                        tempData.sort((dataA, dataB) => {
                            let a = dataA[columnName].toString().toLowerCase();
                            let b = dataB[columnName].toString().toLowerCase();

                            if (b < a) return -1;

                            if (b > a) return 1;

                            return 0;
                        })
                        tempData.sort((dataA, dataB) => dataB[columnName] - dataA[columnName]);

                    // } else if (columnName === 'age') {
                    //     tempData.sort((dataA, dataB) => dataB.age - dataA.age);
                    // }
                }

                this.$tbody.innerHTML = '';
                this.#pagination(!this.pageNumber ? 1 : this.pageNumber, tempData);
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
            $tr.setAttribute('class', this.rowClassName);

            if (!(i >= rData.length)) {
                const $tdCheckBox = document.createElement('input');
                $tdCheckBox.setAttribute('type', 'checkbox');
                $tdCheckBox.setAttribute('data-id', rData[i].id);
                $tr.appendChild($tdCheckBox);
                
                $tdCheckBox.addEventListener('change', (e) => {
                    console.log(e.target.dataset.id);

                    if ($tdCheckBox.checked) {
                        if (!this.selectedData.includes(e.target.dataset.id)) {
                            this.selectedData.push(e.target.dataset.id);
                        }
                    } else {
                        this.selectedData = this.selectedData.filter(dt => {
                            return dt !== e.target.dataset.id;
                        });
                    }

                    this.$selectedDataButton && this.$selectedDataButton.remove();
                    this.#selectedDatas();
                    console.log(this.selectedData);
                })
            }

            for (const key in rData[i]) {
                const $td = document.createElement('td');
                $td.setAttribute('class', this.cellClassName);
                $td.innerHTML = rData[i][key];
                $tr.appendChild($td);

            }

            if (!(i >= rData.length)) {
                const $tdDelete = document.createElement('td');
                this.$tdDelete = $tdDelete;
                this.$tdDelete.innerHTML = 'X';
                this.$tdDelete.setAttribute('class', this.deleteClassName);
                this.$tdDelete.setAttribute('data-id', rData[i].id);
                $tr.appendChild(this.$tdDelete);

                const $tdEdit = document.createElement('td');
                this.$tdEdit = $tdEdit;
                this.$tdEdit.innerHTML = '✎';
                this.$tdEdit.setAttribute('class', this.editClassName);
                this.$tdEdit.setAttribute('data-id', rData[i].id);
                $tr.appendChild(this.$tdEdit);

            }


            this.$tdDelete.addEventListener('click', (e) => {
                let del = e.target.dataset.id;

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
               
                this.$tbody.innerHTML = '';
                this.$tfooter.remove();
                this.#createTfooter();
                this.#pagination(!this.pageNumber ? 1 : this.pageNumber, this.baseData == null || this.baseData.length == 0 ? this.data : this.baseData);
            })

             const $currentActive = document.querySelectorAll('button');
             for (let i = 0; i < $currentActive.length; i++) {

                 if ($currentActive[i].innerHTML == this.pageNumber) {
                     $currentActive[i].classList.add('activePage');
                     break;
                 }

             }

            this.$tdEdit.addEventListener('click', (e) => {
                let editDataId = e.target.dataset.id;
                let editName = '';
                let editAge = '';
                this.data.forEach((dt) => {
                    console.log(editDataId);
                    if (dt.id == editDataId) {
                        editName = dt.name;
                        editAge = dt.age;
                    }
                })

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

        let columnCount = this.$dataTableContainer.querySelectorAll('th');
        const attr = document.createAttribute("colspan");
        attr.value = columnCount.length + 1; //1 for checkbox th
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
            this.$tfooter.remove();
            this.#createTfooter();
            this.#pagination(!this.pagesCount ? 1 : this.pagesCount, this.baseData == null || this.baseData.length == 0 ? this.data : this.baseData);

            const $currentActive = document.querySelectorAll('button');
            for (let i = 0; i < $currentActive.length; i++) {

                if ($currentActive[i].innerHTML == this.pageNumber) {
                    const $prevActive = document.querySelector('.activePage');
                    if ($prevActive) {
                        $prevActive.classList.remove('activePage');
                    }
                    $currentActive[i].classList.add('activePage');
                    break;
                } else {         
                    $currentActive[this.pagesCount].classList.add('activePage');
                    this.pageNumber = this.pagesCount;
                }

            }
        });    
    }

    #createSearch() {
        let searchText = '';
        this.$searchInput.addEventListener('input', (e) => {
            searchText = e.target.value;

            if (searchText == '') {
                this.#pagination(1, this.data);
            }

            this.baseData = this.data.filter((value) => {
                return value.name.includes(searchText) || value.position.includes(searchText) || value.id === +searchText || value.age === +searchText;
            });

            this.pagesCount = Math.ceil(this.baseData.length == 0 ? this.data.length / this.dataCount : this.baseData.length / this.dataCount);
            this.$tfooter.remove();
            this.$tbody.innerHTML = '';
            this.#createTfooter();
            this.#pagination(!this.pageNumber ? 1 : this.pageNumber, this.baseData == null || this.baseData.length == 0 ? this.data : this.baseData);
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
            closeForm();
        })
        $cancelButton.innerHTML = 'Cancel';

        $newDataForm.appendChild($newNameLabel);
        $newDataForm.appendChild($newAgeLabel);
        $newDataForm.appendChild($saveButton);
        $newDataForm.appendChild($cancelButton);

        this.$dataTableContainer.appendChild($empatyDiv);
        this.$dataTableContainer.appendChild($newDataForm);

        const closeForm = function(){
            const form = document.querySelector('form');
            form.remove();
            const backdrop = document.querySelector('.backdrop');
            backdrop.remove();
        }

        $newDataForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let lastId = this.data[this.data.length - 1].id;
            
            if (!$newName.value || !$newAge.value) {
                alert(`The field must not be empty.`);
                return;
            }

            if (id) {
                this.data.forEach((dt) => {
                    if (dt.id == id) {
                        dt.name = $newName.value;
                        dt.age = $newAge.value;
                    }
                })
            
            this.$tbody.innerHTML = '';
            this.$tfooter.remove();
            this.#createTfooter();
            this.#pagination(!this.pageNumber ? 1 : this.pageNumber, this.data);
            
            } else {
                let newData = {
                    id: lastId + 1,
                    name: $newName.value,
                    age: $newAge.value,
                }
                this.data.push(newData);
                this.pagesCount = Math.ceil(this.baseData == null || this.baseData.length == 0 ? this.data.length / this.dataCount : this.baseData.length / this.dataCount);
    
                this.pageNumber = this.pagesCount;//for fixing active page
                this.$tbody.innerHTML = '';
                this.$tfooter.remove();
                this.#createTfooter();
                this.#pagination(this.pagesCount, this.data);
                console.log(this.data);
            }
            closeForm();
        })
    }

    #selectedDatas() {
        const $selectedDataButton = document.createElement('button');
        this.$selectedDataButton = $selectedDataButton;
        $selectedDataButton.classList.add('selected-data');
        $selectedDataButton.innerHTML = `${this.selectedData.length} data are selected`;
        this.$dataTableContainer.appendChild($selectedDataButton);

        $selectedDataButton.addEventListener('click', () => {
            this.data = this.data.filter(dt => {
                dt.id = (dt.id).toString();
                return !this.selectedData.includes(dt.id);
            })
            this.selectedData.length = 0;

            this.pagesCount = Math.ceil(this.baseData == null || this.baseData.length == 0 ? this.data.length / this.dataCount : this.baseData.length / this.dataCount);
               
            this.$tbody.innerHTML = '';
            this.$tfooter.remove();
            this.#createTfooter();
            this.#pagination(!this.pageNumber ? 1 : this.pageNumber, this.baseData == null || this.baseData.length == 0 ? this.data : this.baseData);

            this.$selectedDataButton && this.$selectedDataButton.remove();
            this.#selectedDatas();
        })
    }

    #pagination(pageNumber, currentData) {
        this.$checkB.checked = false;

        let start = (pageNumber - 1) * this.dataCount;
        let end = start + this.dataCount;
        let forRender = currentData.slice(start, end);
        this.forRender = forRender;
   
        if (this.forRender.length === 0) {
            this.pageNumber = pageNumber - 1;
            const $currentActive = document.querySelectorAll('button');
            $currentActive[$currentActive.length - 1].classList.add('activePage');
        }
        
        this.#renderData(this.dataCount, this.forRender);
        const $allChbox = document.querySelectorAll('input[type=checkbox]');

        $allChbox.forEach(ch => {
            console.log(ch);
            if (this.selectedData.includes(ch.dataset.id)) {
                ch.checked = true;
            }
        });
    }
}

export default DataTable;