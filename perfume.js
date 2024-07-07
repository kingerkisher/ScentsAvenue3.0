document.addEventListener("DOMContentLoaded", () => {
    /* adver slider starts */

    let slideIndex = 1;


    let next = document.getElementById('next');
    next.addEventListener('click', () => {
        let n = 1;
        // console.log('clicked right')
        showSlides(slideIndex += n);

    });

    let prev = document.getElementById('prev');
    prev.addEventListener('click', () => {
        let n = -1;
        // console.log('clicked left')
        showSlides(slideIndex += n);
        console.log(slideIndex);

    });

    /* adver slider ends */


    // console.log(prev);

    // First we create a funtion that is going to hide all the divs for the sliding images 
    function showSlides(n) {
        const slides = document.getElementsByClassName("mySlides");
        // console.log(slides.length)

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
            console.log(slides.length)

        }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }


        slides[slideIndex - 1].style.display = "block";

        // console.log(slides);

    };

    // plusSlides();
    showSlides(slideIndex);



    // var decrement = document.getElementById("decrement");

    let product = [
        {
            Brand: "valention",
            name: "Born in Roma",
            tag: "pavlo-t-1Mhre9qvZeY-unsplash",
            price: 170000,
            inCart: 0
        },
        {
            Brand: "Lalique",
            name: "Encre Noire",
            tag: "mahbod-akhzami-ao17WB4tCTQ-unsplash",
            price: 180000,
            inCart: 0
        },
        {
            Brand: "louis vuitton",
            name: "Au hasadr",
            tag: "michael-surazhsky-xKobiRXrbLU-unsplash",
            price: 120000,
            inCart: 0
        },
        {
            Brand: "Maison Martin Margiela",
            name: "By The Fire Place",
            tag: "pavlo-t-7iRk4xTjeMc-unsplash",
            price: 200000,
            inCart: 0
        },
        {
            Brand: "Chanel",
            name: "Bleu De Chanel",
            tag: "jeroen-den-otter-2b0JeJTEclQ-unsplash",
            price: 100000,
            inCart: 0
        },
        {
            Brand: "Hugo Boss",
            name: "Boss Bottled Hugo Boss",
            tag: "pavlo-t-MfGoZ-QoJFc-unsplash",
            price: 110000,
            inCart: 0
        },
        {
            Brand: "Nautica",
            name: "Nautica Voyage",
            tag: "amrut-roul-RDndFJZbZ1M-unsplash",
            price: 70000,
            inCart: 0
        },
        {
            Brand: "Creed",
            name: "Green Irish Tweed",
            tag: "gift-habeshaw-C1qrJ9i4EPc-unsplash",
            price: 170000,
            inCart: 0
        }

    ]

    let carts = document.querySelectorAll(".add-cart");



    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener("click", () => {
            cartNumbers(product[i]);
            bootstrapAlert();
            totalCost(product[i]);

        });
    }

    // call the cart function
    onloadCartnumber();
})

// function for the cart alert
function bootstrapAlert() {
    // alert("Please");
    var added = document.getElementById("added");
    added.style.display = "block";
    console.log(added);
}
// set timer for the cart alert 
setInterval(() => {
    var added = document.getElementById('added');
    added.style.display = "none";

}, 2500);

// we create another function to stop the clearing of the html cart
function onloadCartnumber() {
    let productnumber = localStorage.getItem('cartnumbers');
    if (productnumber) {
        document.querySelector('.cart span').innerText = productnumber;
    }
}

// First we want to try to save any products that has been added to cart to the local storage creating a function;
function cartNumbers(product, action) {
    // Get the number of time the product was added
    let productnumber = localStorage.getItem('cartnumbers');
    // Convert the string to a numbers so they can be added
    productnumber = parseInt(productnumber);

    /* decrease action starts */
    // To settle the decrease action
    let cartItems = localStorage.getItem('productinCart');
    cartItems = JSON.parse(cartItems);
    // This if statement is to check when action is decreasing
    if (action == "decrease") {
        localStorage.setItem('cartnumbers', productnumber -= 1);
        document.querySelector('.cart span').innerText = productnumber;

    } else if (productnumber) {
        localStorage.setItem('cartnumbers', productnumber += 1);
        document.querySelector('.cart span').innerText = productnumber;
    } else {
        localStorage.setItem('cartnumbers', 1);
        document.querySelector('.cart span').innerText = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem("productinCart");
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        cartItems[product.name].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.name]: product
        }
    }
    localStorage.setItem("productinCart", JSON.stringify(cartItems));
}

function totalCost(product, action) {
    // console.log(product.price);
    let cartCost = localStorage.getItem("totalCost");
    console.log(cartCost);
    console.log(typeof cartCost)

    if (action == "decrease") {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost - product.price);

    } else if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }


}

function displayCart() {
    let cartItems = localStorage.getItem("productinCart");
    let cartCost = localStorage.getItem("totalCost");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".product-container");
    // console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = "";
        Object.values(cartItems).map(item => {
            productContainer.innerHTML +=
                `                    <div class="product row mb-3">
                        <div class="col-md-6  d-flex ">
                            <div class="">
                                <a href="#"> <img src="./image/${item.tag}.jpg" alt=""
                                        height="170px" width="130px"></a>

                            </div>
                            <p class=" ms-5 my-4 ">${item.name}</p>
                        </div>

                        <div class="col-sm-12 col-md-6 mt-4">
                            <div class="row mb-3">
                                <div class="chev col-4 col-sm-4 col-md-4  text-center">
                                    <div>
                                        <p class="fw-bold ">Price:</p>
                                        <p>NGN ${item.price}</p>
                                    </div>
                                </div>
                                <div class="chev col-4  col-sm-4 col-md-4   text-center">
                                    <div>
                                        <p class="fw-bold ">Quantity:</p>
                                        <div class=" numerical">
                                            <div class="minus ">
                                                <span class="decrease">
                                                <script src="https://cdn.lordicon.com/lordicon.js"></script>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/uwibpbyg.json"
                                                        trigger="hover"
                                                        style="width:25px;height:25px">
                                                    </lord-icon>
                                                </span>
                                            </div>
                                            <div class="number">
                                                <span class="">${item.inCart}</span>
                                            </div>
                                            <div class="add">
                                                    <span class="increase">
                                                        <script src="https://cdn.lordicon.com/lordicon.js"></script>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/pdsourfn.json"
                                                        trigger="hover"
                                                        style="width:25px;height:25px">
                                                    </lord-icon>
                                                    </span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="chev col-4  col-sm-4 col-md-4  ">
                                    <div>
                                        <p class="fw-bold ">Sub Total:</p>
                                        <p class="">NGN ${item.inCart * item.price}</p>
                                        <div class=" text-center mt-5">

                                            <button class="lolo rounded-circle p-1"><i class="bi bi-trash"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>`
        })

        let total = document.getElementById('total').value = cartCost;

    }
    manageQuantity();
    deleteButton();
}

function deleteButton() {
    let deleteButton = document.querySelectorAll('.bi-trash');
    let productname;
    let productNumber = localStorage.getItem('cartnumbers');
    let cartItems = localStorage.getItem('productinCart');
    cartItems = JSON.parse(cartItems);
    // console.log(cartItems);
    let cartCost = localStorage.getItem('totalCost');


    for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', () => {
            productname = deleteButton[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.textContent.trim();
            localStorage.setItem('cartnumbers', productNumber - cartItems[productname].inCart);

            localStorage.setItem('totalCost', cartCost - (cartItems[productname].price * cartItems[productname].inCart));

            delete cartItems[productname];
            localStorage.setItem('productinCart', JSON.stringify(cartItems));

            displayCart();
            onloadCartnumber();
        });
    }
}

// increase and decrease function
function manageQuantity() {
    let decreasebtn = document.querySelectorAll('.decrease');
    let increasebtn = document.querySelectorAll('.increase');
    // Grab from the localStorage product in cart items
    let cartitems = localStorage.getItem('productinCart');
    // convert to javascript object format because the data will be coming in JSON format
    let currentQuantity;
    let currentProduct;

    cartitems = JSON.parse(cartitems);
    // console.log(cartitems);

    for (let i = 0; i < decreasebtn.length; i++) {
        decreasebtn[i].addEventListener('click', () => {
            // get the current quantity of the this particular product
            currentQuantity = decreasebtn[i].parentElement.parentElement.querySelector('.number').textContent.trim();
            // console.log(currentQuantity);
            // we try to grab the name of the current product we clicked on 
            currentProduct = decreasebtn[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.querySelector('p').textContent.trim();
            console.log(currentProduct);
            if (cartitems[currentProduct].inCart > 1) {
                // The is going to show the name of the current product and the quantity
                cartitems[currentProduct].inCart;

                // Then we do what is in cart - 1
                cartitems[currentProduct].inCart -= 1;

                cartNumbers(cartitems[currentProduct], "decrease");

                totalCost(cartitems[currentProduct], "decrease");

                // update cart in the local storage 
                localStorage.setItem('productinCart', JSON.stringify(cartitems));

                // Then we use the display function to display the current cart quantity
                displayCart();
            }



            console.log(cartitems[currentProduct].inCart);
        })
    }

    for (let i = 0; i < increasebtn.length; i++) {
        increasebtn[i].addEventListener('click', () => {
            // get the current quantity of the this particular product
            currentQuantity = increasebtn[i].parentElement.parentElement.querySelector('.number').textContent.trim();
            // console.log(currentQuantity);
            // console.log(currentQuantity);
            // we try to grab the name of the current product we clicked on 
            currentProduct = increasebtn[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.querySelector('p').textContent.trim();
            console.log(currentProduct);
            // The is going to show the name of the current product and the quantity
            cartitems[currentProduct].inCart;

            // Then we do what is in cart - 1
            cartitems[currentProduct].inCart += 1;

            cartNumbers(cartitems[currentProduct]);

            totalCost(cartitems[currentProduct]);

            // update cart in the local storage 
            localStorage.setItem('productinCart', JSON.stringify(cartitems));

            // Then we use the display function to display the current cart quantity
            displayCart();
        })
    }
}

displayCart();
onloadCartnumber();
