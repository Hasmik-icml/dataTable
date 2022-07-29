class DataTable {
    constructor(
        columns = [], 
        data = [], 
        {
            dataCount = 5,
            rowClassName = '', 
            cellClassName = '',
            tableClassName = ''
        }
    ) {
        this.columns = columns;
        this.data = data;
        this.dataCount = dataCount;
        this.rowClassName = rowClassName;
        this.
    }

    createTable($dataTableContainer) {
        this.$dataTableContainer = $dataTableContainer;

        const $table = document.createElement('table');
        $table.classList.add(this.tableClassName);
        this.$table = $table;

        $dataTableContainer.appendChild($table);

        this.createThead();
        this.createTbody();
        this.createSelect();
        
        this.renderData(this.dataCount, this.data);
        this.createTfooter();   
    }

    createThead() {
        const $thead = document.createElement('thead');
        const $tr = document.createElement('tr');
        $tr.classList.add(this.rowClassName);
        
        this.columns.forEach((column) => {
            const $th = document.createElement('th');
            $th.innerHTML = column;
            $tr.appendChild($th);
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

        let pegesCount = Math.ceil(this.data.length / this.dataCount);

        for (let btnCount = 1; btnCount <= pegesCount; btnCount++) {       
            const $btn = document.createElement('button');

            $btn.addEventListener('click', () => {
                this.$tbody.innerHTML = '';
                
                let pageNumber = $btn.innerText;
                this.pagination(pageNumber);
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
        
        for (let val = 1; val <= 5; val++) {
            const $opt = document.createElement('option');
            
            $perPage.appendChild($opt);
            $opt.value = val * 5;
            $opt.innerHTML = val * 5;
        }
       
        this.$dataTableContainer.appendChild($perPage);

        $perPage.addEventListener('change', (e) => {
            this.dataCount = e.target.value;
            
            console.log(this.dataCount, this.forRender);

            this.$tbody.innerHTML = '';

            let pageNumber = 1;
            this.$tfooter.remove();
            this.createTfooter();
            this.pagination(pageNumber);
        });
    }

    pagination(pageNumber) {
        let start = (pageNumber - 1) * this.dataCount;
        let end = start + this.dataCount;
        let forRender = this.data.slice(start, end);
        this.forRender = forRender;
        this.renderData(this.dataCount, this.forRender);
    }
}

export default DataTable; 