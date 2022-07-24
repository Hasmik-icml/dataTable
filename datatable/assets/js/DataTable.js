class DataTable {
    constructor(columns = [], data = []){
        this.columns = columns;
        this.data = data;
    }

    createTable(){
        const $table = document.createElement('table');
        this.$table = $table;
        const $dataTableContainer = document.querySelector('.data-table-container');
        $dataTableContainer.appendChild($table)

        this.createThead();
        this.createTbody();
        this.renderData();
        this.createTfooter();
    }

    createThead(){
        const $thead = document.createElement('thead');
        const $tr = document.createElement('tr');
        
        this.columns.forEach((column)=>{
            const $th = document.createElement('th');
            $th.innerHTML = column;
            $tr.appendChild($th)
        });

        $thead.appendChild($tr);

        this.$table.appendChild($thead);
    }

    createTbody(){
        const $tbody = document.createElement('tbody');
        this.$tbody = $tbody;
        this.$table.appendChild($tbody);
    }

    renderData(){
        this.data.map((item) => {
            const $tr = document.createElement('tr');

            for (const key in item){
                const $td = document.createElement('td');
                $td.innerHTML = item[key];
                $tr.appendChild($td);
            }

            this.$tbody.appendChild($tr);
            return $tr;
        })
    }

    createTfooter(){
        const $tfooter = document.createElement('tr');

        this.data.forEach(item => {
            const $td = document.createElement('td');
           
            const attr = document.createAttribute("colspan").value = '3';
            $td.setAttributeNode(attr);

            const $btn = document.createElement('button');
            $btn.innerHTML = item.id;

            // $td.appendChild($btn);

            $tfooter.appendChild($btn);
            // $tfooter.appendChild($btn)
        })
        this.$table.appendChild($tfooter);
    }
}
export default DataTable; 