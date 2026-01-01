//products stored as objects inside an array
const products =[
    {id : 1,name:"Laptop",price:50000},
    {id : 2,name:"Headphones",price:2000},
    {id : 3,name:"Mobile",price:30000}
];
//display products on ui(user inrerface)
const productContainer =   //store in a variable so we dont search again and again -improves performance
document.getElementById("products");//document-html page ,getelementById-find the html element with id=products
function displayProducts(){
    products.forEach(product=>{  //array methof,arrow function(lexical this)
        const div=document.createElement("div");//create new html element
        div.className="card";//assigning class name,class add-separate css styling
    div.innerHTML=`
    <h4>${product.name}</h4>
    <p>Price:rs${product.price}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productContainer.appendChild(div);
    });
}
displayProducts();
let cart= JSON.parse(localStorage.getItem("cart")) || [];//JSON.parse-converts string intop JS objects,localStorage-retain the content even after refresh
//ADD TO CART
function addToCart(id){
    const item = cart.find(product=>product.id===id);
    if(item){
        item.quantity+=1;
    }
    else{
        const product=products.find(p=>p.id===id);
        cart.push({...product,quantity:1});
    }
    updateCart();
}
//INCREASE AND DECREASE QUANTITY

//DISPLAY CART ITEMS
const cartContainer = document.getElementById("cart");
function updateCart(){ // update cart ui as it involes add remove 
    cartContainer.innerHTML=""; // clear existing cart ui
    cart.forEach(item=>{ //item - each object inside cart array
        const div=document.createElement("div");
       div.innerHTML =`
       ${item.name} - rs${item.price* item.quantity}
       <button onclick="removeFromCart(${item.id})">Remove</button>
       `;
    cartContainer.appendChild(div);
});
updateTotal();
localStorage.setItem("cart",JSON.stringify(cart));
}
//REMOVE FROPM  CART
function removeFromCart(id){
    cart=cart.filter(item=>item.id!==id);
    updateCart();
}
//TOTAL PRICE CALCULATION
function updateTotal(){
  const total= cart.reduce((sum,item)=>{ //reduce - accumulates total price  ,starts from 0
    return sum + item.price * item.quantity;
  },0);
  document.getElementById("total").innerText=total;
}
updateCart();