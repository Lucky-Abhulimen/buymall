let carts = document.querySelectorAll('.add-cart');

let products = [
  {
   name:'grey Tshirt',
   tag: 'greytshirt',
   price: 15,
   inCart: 0
  },
  {
    name: 'Grey Hoddie',
    tag: 'greyhoddie',
    price: 20,
    inCart: 0
   },

    {
        name: 'Black Tshirt',
        tag: 'blacktshirt',
        price: 10,
        inCart: 0
    },
    {
        name: 'Black Hoddie',
        tag: 'blackhoddie',
        price: 25,
        inCart: 0
    }

]

for( let i = 0; i < carts.length; i++){

carts[i].addEventListener('click', (e) => {
     cartNumbers(products[i]);
     totalCost(products[i]);
});

}

function onLoadCartNumbers(){
 let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }

}

function cartNumbers(product, quantity){
 let productNumbers = localStorage.getItem('cartNumbers');

 productNumbers = parseInt(productNumbers);
if(product === 'decrement'){
  localStorage.setItem('cartNumbers', productNumbers - (1 * quantity));
     document.querySelector('.cart span').textContent = productNumbers - (1 * quantity);
 return 
}
 if(productNumbers){
     localStorage.setItem('cartNumbers', productNumbers + 1);
     document.querySelector('.cart span').textContent = productNumbers + 1;
 }else{
     localStorage.setItem('cartNumbers', 1);
     document.querySelector('.cart span').textContent =1;
 }
  setItems(product);


}
//----------------------------------------------------------
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){

            cartItems = {
                ...cartItems, 
                [product.tag]: product
            }
        }
      cartItems[product.tag].inCart += 1;
    }else{
            product.inCart = 1;
            cartItems = {
            [product.tag]: product
        }
    }
localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}
//----------------------------------------------------------
function totalCost(product){
let cartCost = localStorage.getItem('totalCost');
if(cartCost != null){
    cartCost = parseInt(cartCost);
localStorage.setItem('totalCost', cartCost + product.price);
}else{
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', product.price);
}}

 function displayCart(){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
     let productContainer = document.querySelector(".products");
     let cartCost = localStorage.getItem('totalCost');
  if(cartItems && productContainer ){
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item =>{
            
          productContainer.innerHTML += `
          <div class="container">
          <div class="product">
          <ion-icon name ="close-circle" class="ion-button" data-targ=${item.tag} data-quantity=${item.inCart}></ion-icon>
          <img src='./images/${item.tag}.jpg' width="115">
          <span class="name">${item.name}</span>
          </div>
          <div class="price">$${item.price},00</div>
          <div class="quantity">
             <ion-icon name="remove-circle" id="subtract"></ion-icon>
             <span id="quantitty">${item.inCart}</span>
             <ion-icon name="add-circle" id="add"></ion-icon>
          </div>
          <div class="total">
          $${item.inCart * item.price},00
          </div>
         <div class="basketTotalContainer">
             <h4 class="basketTotalTitle">Basket Total</h4>
             <h4 class="basketTotal">$${cartCost},00</h4>
         </div>
          </div>

          `;
         });
         
         
  }
  
 }

//-------------------EFOSA I also tried to increase my cart quantity by clicking on the plus sign
 /*function decreament(){
let minus = document.querySelector('#subtract');
let plus  = document.querySelector('#add');
let itemValue =document.querySelector('#quantitty')
console.log(itemValue);
minus.addEventListener('click', (e)=>{

   itemValue = parseInt(itemValue.value) - 1; 
   
})

 }*/
//-------------- EFOSA THIS IS WHERE THE ISSUE IS-----------

 

     let removeButton = document.querySelector('.products');
     removeButton.addEventListener('click', (e)=>{
         if(e.target.name === 'close-circle'){
           
         let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
        console.log(cartItems);
        let item = e.target.getAttribute('data-targ');
        console.log(item);
         delete cartItems[item];
         localStorage.setItem('productsInCart', JSON.stringify(cartItems));
         console.log(cartItems);
         let itemQuantity = e.target.getAttribute('data-quantity');
         console.log(itemQuantity);
         cartNumbers('decrement', itemQuantity);
         //removeButton.parentElement.parentElement.remove();
         e.target.parentNode.parentNode.remove();

         }

     })



 function deleteitems(){
     
 }
onLoadCartNumbers();
displayCart();

//let productContainer = document.querySelector(".products");
//productContainer.addEventListener('click', removeItem);
