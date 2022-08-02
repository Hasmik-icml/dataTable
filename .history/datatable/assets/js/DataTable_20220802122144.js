class DataTable {
    constructor(
        columns = [], 
        data = [], 
        {
            dataCount = 5,
            rowClassName = 'table-row', 
            cellClassName = 'table-cell',
            tableClassName = 'main-table',
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
            let sortMethod = true;
            const $th = document.createElement('th');
            $th.innerHTML = column + " ↓";
            $tr.appendChild($th);

            $th.addEventListener('click', (e) => {
                let columnName = e.target.innerText.split(' ')[0];
                // let sortMethod = e.target.innerHTML.split(' ')[1];
                
                let tempData = this.baseData.length == 0 ? this.data : this.baseData;

                if (sortMethod === true) {
                    sortMethod = false;
                    $th.innerHTML = column + ' ↑';

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
                   
                } else if (sortMethod === false){
                            sortMethod = true;
                            $th.innerHTML = column + ' ↓';
                    
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
        for (let i = 0; i < dataCount; i++) {
            const $tr = document.createElement('tr');
             $tr.classList.add(this.rowClassName);

            for (const key in rData[i]) {
                const $td = document.createElement('td');
                $td.classList.add(this.cellClassName);

                $td.innerHTML = rData[i][key];
                $tr.appendChild($td);
            }

            this.$tbody.appendChild($tr);
        }
    }

    createTfooter() {
        const $tfooter = document.createElement('tr');
        $tfooter.classList.add('btnList');
        this.$tfooter = $tfooter;
        const $td = document.createElement('td');
        
        const attr = document.createAttribute("colspan");     
        attr.value = "3";
        $td.setAttributeNode(attr);

        for (let btnCount = 1; btnCount <= this.pagesCount; btnCount++) {       
            const $btn = document.createElement('button');
           
            $btn.addEventListener('click', () => {


                // 
                const $prevActive = document.querySelector
                
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
        console.log('filter', this.data);
        this.renderData(this.dataCount, this.forRender);
    }
}

export default DataTable; 