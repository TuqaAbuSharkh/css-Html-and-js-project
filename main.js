let modeBtn= document.querySelector(".changemode");
let body = document.querySelector("body");

function ChangeMode(){
body.classList.toggle("dark");
}

modeBtn.onclick = ChangeMode;


window.onscroll = function(){

    const nav = document.querySelector(".navBa");
    const modern = document.querySelector(".Modern");
    if(window.scrollY > modern.offsetTop){
    nav.classList.add('changeNav');
    }else{
        nav.classList.remove('changeNav');
    }
}




    const spinner = document.querySelector('.spinner-container');

    const getProducts = async (page) => {
        const limit = 6;
        const skip = (page - 1) * limit;

        spinner.style.display = 'block'; 
        try {
            const { data } = await axios.get(`https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${skip}`);
            return data;
        } finally {
            spinner.style.display = 'none'; 
        }
    }

   
    const openModal = (imageUrl) => {
        const modalImage = document.getElementById("modalImage");
        const modal = new bootstrap.Modal(document.getElementById('photoModal'));
    
        if (modalImage) {
            modalImage.src = imageUrl;
            modal.show();
        }
    }
    
    const displayProducts = async (page = 1) => {
        try {
            const products = await getProducts(page);
            const totalProducts = 24; 
            const numOfPages = Math.ceil(totalProducts / 6);

            const result = products.map((product) => {
                if (product.id > 51 || product.id < 18) return '';

                return `
                    <div class="product" style="cursor:pointer;" onclick='openModal("${product.images[0]}")'>
                        <h2>${product.title}</h2>
                        <img src="${product.images[0]}" alt="${product.title}"/>
                        <p>${product.description}</p>
                        <span>${product.price}</span>
                    </div>
                `;
            }).join('');

            document.querySelector(".products").innerHTML = result;


        
            let paginationLinks = ``;

            if (page > 1) {
                paginationLinks += `<li class="page-item"><button onclick="displayProducts(${page - 1})" class="page-link">&laquo;</button></li>`;
            } else {
                paginationLinks += `<li class="page-item"><button class="page-link" disabled>&laquo;</button></li>`;
            }

            for (let i = 1; i <= numOfPages; i++) {
                paginationLinks += `<li class="page-item"><button onclick="displayProducts(${i})" class="page-link">${i}</button></li>`;
            }

            if (page < numOfPages) {
                paginationLinks += `<li class="page-item"><button onclick="displayProducts(${page + 1})" class="page-link">&raquo;</button></li>`;
            } else {
                paginationLinks += `<li class="page-item"><button class="page-link" disabled>&raquo;</button></li>`;
            }

            document.querySelector(".pagination").innerHTML = paginationLinks;

        } catch (error) {
            const result = `
                <h2>Error</h2>
                <p>${error.message}</p>
            `;
            document.querySelector(".products").innerHTML = result;
        }
    }

    displayProducts();
