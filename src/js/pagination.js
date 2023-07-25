import Pagination from 'tui-pagination';


function fetchJson() {
    fetch('https://tasty-treats-backend.p.goit.global/api/recipes').then(response => response.json()).then(data => {
        console.log(data);
        const options = {
            totalItems: data.perPage * data.totalPages,
        itemsPerPage: data.perPage,
        visiblePages: 2
        }
        console.log(options);
        return options
    });
};


const container = document.getElementById('tui-pagination-container');
const instance = new Pagination(container, fetchJson());

instance.getCurrentPage();