class DataTable {
    constructor(columns = [], data = []){
        this.columns = columns;
        this.data = data;
    }

    createTable(){
        const dataCount = Math.ceil(this.data.length/3);
        this.dataCount = dataCount;
        const $table = document.createElement('table');
        this.$table = $table;
        const $dataTableContainer = document.querySelector('.data-table-container');
        $dataTableContainer.appendChild($table);

        this.createThead();
        this.createTbody();
        this.renderData(dataCount);
        this.createTfooter();   
    }

    createThead(){
        const $thead = document.createElement('thead');
        const $tr = document.createElement('tr');
        
        this.columns.forEach((column)=>{
            const $th = document.createElement('th');
            $th.innerHTML = column;
            $tr.appendChild($th);
        });

        $thead.appendChild($tr);
        this.$table.appendChild($thead);
    }

    createTbody(){
        const $tbody = document.createElement('tbody');
        this.$tbody = $tbody;
        this.$table.appendChild($tbody);
    }

    renderData(dataCount, rData){
 
        if (!rData) rData = this.data;
        rData.every((item, index) => {
            if(index === dataCount) return;
            const $tr = document.createElement('tr');

            for (const key in item){
                const $td = document.createElement('td');
                $td.innerHTML = item[key];
                $tr.appendChild($td);
            }

            this.$tbody.appendChild($tr);
            return $tr;
        });
    }

    createTfooter(){
        const $tfooter = document.createElement('tr');
        const $td = document.createElement('td');

        const $perPage = document.createElement('select');
        const $opt = document.createElement('option');
        $perPage.ap

      
      

        const attr = document.createAttribute("colspan");     
        attr.value = "3";
        $td.setAttributeNode(attr);

        for (let btnCount = 1; btnCount <= this.dataCount; btnCount++){
            
            const $btn = document.createElement('button');

            $btn.addEventListener('click', ()=>{
                this.$tbody.innerHTML = '';

                let pageNumber = $btn.innerText;
                let start = (pageNumber - 1) * this.dataCount;
                let end = start + this.dataCount;
                let forRender = this.data.slice(start, end);

                this.renderData(this.dataCount, forRender);
            });
            
            
            $td.appendChild($btn);
            $btn.innerHTML = btnCount;
            $tfooter.appendChild($td);
            $tfooter.appendChild($perPage);

        }

        this.$table.appendChild($tfooter);
    }
}
export default DataTable; 