//creating temporary product storages
const productId = [];
const productPicLink = [
    
];
const productLink = [
    
];
const productName = [];
const productType = [];

//getting the buttons from html

var jordButton = document.querySelector("#jordansButton")
var dunkButton = document.querySelector("#dunksButton")
var vansButton = document.querySelector("#vansButton")
var forcesButton = document.querySelector("#forcesButton")
var everythingButton = document.querySelector("#everythingButton")
var subNewShoe = document.querySelector("#submitNewShoe")
var openShoeAdder = document.getElementById("openShoeAdder")
var closeShoeAdder = document.getElementById("closeShoeAdder")
var shoeAdderWindow = document.getElementById("shoeAdd")


//retrives the place where products are located
var theProductScreen = document.querySelector("#prodScreen")

//getting the input fields

var shoeLinkInputField = document.getElementById("shoeLink")
var shoeNameInputField = document.getElementById("shoeName")
var shoePicLinkInputField = document.getElementById("shoePic")
var shoeTypeInputField = document.getElementById("shoeType")

//function for making gradient from red to black (for user satisfaction purposes)

function startGradient(target) {
    let startColor = "#ff0000"; // Change this to the starting color you want
    let endColor = "#000000"; // Change this to the ending color you want
    let duration = 2000; // Change this to the duration of the gradient in milliseconds
  
    let startTime = null;
    let step = function(timestamp) {
      if (!startTime) startTime = timestamp;
      let progress = timestamp - startTime;
      let percent = Math.min(progress / duration, 1);
      let color = interpolateColor(startColor, endColor, percent);
      target.style.borderColor = color; // Set the border color of the input element to the interpolated color
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
//creates a smooth animation for the color
  function interpolateColor(startColor, endColor, percent) {
    let r1 = parseInt(startColor.substring(1, 3), 16);
    let g1 = parseInt(startColor.substring(3, 5), 16);
    let b1 = parseInt(startColor.substring(5, 7), 16);
    let r2 = parseInt(endColor.substring(1, 3), 16);
    let g2 = parseInt(endColor.substring(3, 5), 16);
    let b2 = parseInt(endColor.substring(5, 7), 16);
    let r = Math.round(r1 + (r2 - r1) * percent);
    let g = Math.round(g1 + (g2 - g1) * percent);
    let b = Math.round(b1 + (b2 - b1) * percent);
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
  

// retrieves data from the localstorage and puts it into temporary product storage (unnecesary, might remove later)

function fillArrays(){
    for (let i  = 0; i < localStorage.length/4; i++){
        if(productName[i] !== localStorage.getItem(i+ " name")){
            productId.push(i)
            productPicLink.push(localStorage.getItem(i + " picLink"))
            productName.push(localStorage.getItem(i+" name"))
            productType.push(localStorage.getItem(i+ " type"))
            productLink.push(localStorage.getItem(i+" link"))
        }
        
    }
}




//because the add function adds stuff to the temporary storages, 
//i have to create a function which saves this info to the "permanent" storage (unnecesarry, might remove later)

function savePosts(){
    for (let i = 0; i< productId.length;i++){
        localStorage.setItem(productId[i]+" name",productName[i])
        localStorage.setItem(productId[i]+" type",productType[i])
        localStorage.setItem(productId[i]+" link",productLink[i])
        localStorage.setItem(productId[i]+" picLink",productPicLink[i])
    }
}
//this function checks if there already exists an element (value) in a provided array, and if it finds anything it returns 1
function lookFor(array, value){
    for(let i = 0; i < array.length; i++){
        if(array[i] == value){
            return 1
        }
    }
}
//this function adds new products to our temporary storage (unnecesarry, will probably rework it),
// also adds fancy effects to fields where value is missing
function addNewProduct(link, name, picLink,type){
    if(
        lookFor(productName, name)!=1 && 
        lookFor(productLink, link)!=1 && 
        lookFor(productPicLink, picLink)!=1 && 
        picLink!== null &&
        name!==null && 
        link !== null && 
        link !== "" &&
        name !== "" &&
        picLink !== "" &&
        type !== "0"
        )

    {
        
        console.log(type.value)
        productId.push(productId.length)
        productPicLink.push(picLink)
        productName.push(name)
        productLink.push(link)
        productType.push(type)
        savePosts()
        document.getElementById("shoePic").value = ''
        document.getElementById("shoeName").value=''
        document.getElementById("shoeLink").value=''
        document.getElementById("shoeType").value='0'
        
    }  
    else{
        if (picLink == ""){
            startGradient(shoePicLinkInputField)
        }
        if (name == ""){
            startGradient(shoeNameInputField)
        }
        if (link == ""){
            startGradient(shoeLinkInputField)
        }
        if (type == "0"){
            startGradient(shoeTypeInputField)
        }
    }
}
// this mess right here rigs it up so when the button is pressed it calls a function, not sure if this can be simplified
forcesButton.addEventListener("click", () => buildShoePage(1));
jordButton.addEventListener("click", () => buildShoePage(2));
vansButton.addEventListener("click", () => buildShoePage(3));
dunkButton.addEventListener("click", () => buildShoePage(4));
everythingButton.addEventListener("click", () => buildShoePage(5))
subNewShoe.addEventListener("click", () => addNewProduct(document.getElementById("shoeLink").value,document.getElementById("shoeName").value,document.getElementById("shoePic").value,document.getElementById("shoeType").value,))
openShoeAdder.addEventListener("click", () => openShoeAdderWindow())
closeShoeAdder.addEventListener("click", () => closeShoeAdderWindow())

//this function closes the window where you can add new shoes
function closeShoeAdderWindow(){
    console.log("Window should be closed")
    shoeAdderWindow.style.display = "none";
    openShoeAdder.style.display = "block"; 
}
// this function opens it
function openShoeAdderWindow(){
    console.log("Window should be opened")
    shoeAdderWindow.style.display = "block";
    openShoeAdder.style.display = "none"; 
}
//before this function existed, if i were to call 
//"buildShoePage" x times, it would display the same products x times. this function removes old product sections
// and makes it so all products are shown only once
function removePreviousElements(){
    while(theProductScreen.firstChild){
        theProductScreen.removeChild(theProductScreen.firstChild)
    }
    
}

//this goliath of a function is a function responsible for displaying stuff on my page
function buildShoePage(acceptableType){    
    removePreviousElements();
    fillArrays();
    //this for loop creates elements in my html page 
    for(let i = 0; i < productId.length; i++){
        if (productType[i] == acceptableType || acceptableType == 5 && productName!==null){
            let prodBox = document.createElement("section")
            let imageInLink = document.createElement("a")
            let image = document.createElement("img")
            let prodName = document.createElement("h3")        
            let prodLink = document.createElement("a")
            let imageContainer = document.createElement("div")
            //const _break = document.createElement("br")
    
            prodName.id = `header${i}`
    
    
            
            //this chunk puts them in the right places
            theProductScreen.appendChild(prodBox)
            prodBox.appendChild(imageInLink)
            prodBox.appendChild(prodName)
            prodBox.appendChild(prodLink)
            imageInLink.appendChild(imageContainer)
            imageContainer.appendChild(image)
            
            //this assigns them values and gives them style.
            prodBox.style.padding = "10px 10px 10px 10px"
            prodBox.id = productId[i]
            imageInLink.href = productLink[i]
            imageInLink.target="_blank"
            imageInLink.rel="noopener noreferrer"
            image.src = productPicLink[i]
            prodName.innerText = productName[i]
            prodLink.innerText = "Buy it here"
            prodLink.href = productLink[i]  
            prodLink.target="_blank"
            prodLink.rel="noopener noreferrer"
            imageContainer.style.textAlign = "center"
        }
        else{
            continue; 
        }
    }
}
