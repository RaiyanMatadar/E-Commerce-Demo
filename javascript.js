let data = [];

// fetching APIs data 
async function fetchData() {
    try {
        // we have fentch API here
        const response = await fetch("https://fakestoreapi.com/products");
        data = await response.json()
        ShowDataFetchedData(data)

    } catch (error) {
        console.log("Sorry there is an error");
    }
}
fetchData();

// after fetch we have made product card for all the fetched data 
const parent = document.querySelector('div');

function ShowDataFetchedData(arr) {
    parent.innerHTML = ""; // CLEAR OLD CARDS

    arr.forEach((element) => {
        const div = document.createElement("div");
        let {
            id,
            image,
            category,
            description,
            price,
            rating: {
                rate,
                count
            },
            title
        } = element

        div.classList.add("box")
        div.innerHTML = `
            <img src="${image}" alt="">
            <p>${category}</p>
            <p>${price}</p>
            <span>${rate}</span>
            <p>${title}</p>
            <button class="btn btn-primary" onclick="addtolocalstorage(${id})">Add to cart</button>
            <button class="btn btn-primary" onclick="ProductsDetails(${id})">Products Details</button>
            `
        parent.appendChild(div)
            // modelOnBox()
    })
}


// this will take input then return the data based on input
const search = document.getElementById('search');
let debounceTimeout;

search.addEventListener('input', (event) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        let input = event.target.value.toLowerCase().trim()
        let filtered = data.filter((element) => {
            return element.title.toLowerCase().includes(input) ||
                element.category.toLowerCase().includes(input);
        });
        ShowDataFetchedData(filtered)
    }, 1000);
})

// it will check if the duplicate data in local storage exist 
// say its already exist if not then add the product 
function addtolocalstorage(id) {
    let arr = [];
    arr.push(id);

    let obj = {
        id: id,
        productQuantity: 0
    };

    let exitarray = JSON.parse(localStorage.getItem('mycart'));

    // .some() given true of false so thats why we used it here s oits loop 
    // trough every item's id thenif it gets the duplicate it will give false if 
    // not then true then based on it the if else will execute 
    if (exitarray && exitarray.some(item => item.id === id)) {
        alert("Product already added");
        return;
    }

    if (exitarray) {
        exitarray.push(obj);
        localStorage.setItem("mycart", JSON.stringify(exitarray));
    } else {
        localStorage.setItem("mycart", JSON.stringify([obj]));
    }
}

// Add to Cart Product feture (this will select the products then add them into local storage)
document.getElementById("viewcart").onclick = () => {
    window.location.href = 'cart.html';
}

function ProductsDetails(id) {
    window.location.href = `ProductsDetails.html?id=${id}`;
}