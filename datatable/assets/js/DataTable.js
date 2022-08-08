class DataTable {
    constructor(
        columns = [], 
        data = [], 
        {
            dataCount = 5,
            rowClassName = 'table-row', 
            cellClassName = 'table-cell',
            tableClassName = 'main-table',
            tableHeadClassName = 'table-head-data',
            deleteClassName = 'delete',
            inputClassName = 'search-input'
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
    }

    createTable($dataTableContainer) {
        this.$dataTableContainer = $dataTableContainer;

        let pagesCount = Math.ceil(this.data.length / this.dataCount);
        this.pagesCount = pagesCount;

        let baseData = this.data;
        this.baseData = baseData;

        const $label = document.createElement('label');
        $label.innerHTML = 'SEARCH';
        this.$dataTableContainer.appendChild($label);
        
        const $searchInput = document.createElement('input');
        this.$searchInput = $searchInput;
        $searchInput.classList.add(this.inputClassName);
        this.$dataTableContainer.appendChild($searchInput);

        const $table = document.createElement('table');
        $table.classList.add(this.tableClassName);
        this.$table = $table;

        $dataTableContainer.appendChild($table);

        this.createThead();
        this.createTbody();
        this.createSelect();
        this.renderData(this.dataCount, this.data);
        this.createTfooter(); 
        this.createSearch();
    }

    createThead() {
        const $thead = document.createElement('thead');
        const $tr = document.createElement('tr');
        $tr.classList.add(this.rowClassName);
        
        this.columns.forEach((column) => {
            const $th = document.createElement('th');
            $th.classList.add(this.tableHeadClassName);
            $th.innerHTML = column.value;
            column.dataIndex === 'delete' ? $th.setAttribute('data-delete', column.dataIndex): $th.setAttribute('data-sort', column.dataIndex);
            column.dataIndex === 'delete' ? "" : $th.setAttribute('data-sort-order', 'asc');
            $tr.appendChild($th);

            $th.addEventListener('click', (e) => {
                let sortMethod = $th.getAttribute('data-sort-order');
                let columnName = $th.getAttribute('data-sort');

                let tempData = this.baseData.length == 0 ? this.data : this.baseData;                

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
                   
                } else if (sortMethod === 'des'){
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
                this.renderData(this.dataCount, tempData);
            });
        });

        $thead.appendChild($tr); 
        this.$table.appendChild($thead);
    }

    createTbody() {
        const $tbody = document.createElement('tbody');
        this.$tbody = $tbody;
        this.$table.appendChild($tbody);
    }

    renderData(dataCount, rData) { 
        console.log(dataCount, rData);
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
            }
            
            this.$tdDelete.addEventListener('click', (e) => {
                let del = e.target.dataset.id;
                console.log(del);

                rData = rData.filter((dt) => {
                    return dt.id != del;
                })
                console.log(rData);
                
            })
            this.$tbody.appendChild($tr);
        }
    }

    createTfooter() {
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

                this.$tbody.innerHTML = '';
                this.pagination(pageNumber, this.baseData.length == 0 ?  this.data : this.baseData);
            }); 
            
            $td.appendChild($btn);
            $btn.innerHTML = btnCount;
            $tfooter.appendChild($td);
        }

        this.$table.appendChild($tfooter);
    }

    createSelect() {
        const $perPage = document.createElement('select');
        $perPage.classList.add("selectDataCount");
        
        for (let val = 1; val <= 5; val++) 
        {
            const $opt = document.createElement('option');
            
            $perPage.appendChild($opt);
            $opt.value = val * 5;
            $opt.innerHTML = val * 5;
        }
       
        this.$dataTableContainer.appendChild($perPage);

        $perPage.addEventListener('change', (e) => {
            this.dataCount = e.target.value;
            this.$tbody.innerHTML = '';

            this.pagesCount = Math.ceil(this.baseData.length == 0 ?  this.data.lrngth: this.baseData.length / this.dataCount);
            let pageNumber = 1;
            this.$tfooter.remove();
            this.createTfooter();
            this.pagination(pageNumber, this.baseData.length == 0 ?  this.data : this.baseData);
        });
    }

    createSearch() {
        let searchText = '';
        this.$searchInput.addEventListener('input', (e) => {
            searchText = e.target.value;

            if (searchText == '') {
               this.baseData = this.data;
            }

            this.baseData = this.data.filter((value) => {
                return value.name.includes(searchText) || value.id === +searchText || value.age === +searchText;
            });
            
            this.pagesCount = Math.ceil(this.baseData.length / this.dataCount);
            this.$tfooter.remove();
            this.$tbody.innerHTML = '';
            this.createTfooter();
            this.renderData(this.dataCount, this.baseData);
        });
    }

    pagination(pageNumber, currentData) {
        let start = (pageNumber - 1) * this.dataCount;
        let end = start + this.dataCount;
        let forRender = currentData.slice(start, end);
        this.forRender = forRender;
        this.renderData(this.dataCount, this.forRender);
    }
}

export default DataTable; 