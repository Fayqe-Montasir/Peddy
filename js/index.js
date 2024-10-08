const loadButton = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json();
    petButtonCategories(data.categories)
}
const loadAllPets = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json();
    document.getElementById("spinner").style.display ="block"
    setTimeout(function () {
        displayAllPets(data.pets)
    }, 2000);
}

const displayAllPets = (pets) => {
    const petCard = document.getElementById('pets')
    petCard.innerHTML = "";

    if (pets.length == 0) {
         document.getElementById('spinner').style.display ="none"
        petCard.classList.remove("lg:grid")
        petCard.innerHTML = `
        <div class="w-full bg-gray-200 rounded-xl py-28">
          <div class="hero-content flex-col  text-center">
            <img src="images/error.webp" alt="">
            <h2 class="text-4xl font-bold">No Information Available</h2>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br>its layout. The point of using Lorem Ipsum is that it has a.</p>
          </div>
        </div>
        `
        return;
    }
    else {
        petCard.classList.add("lg:grid")
    }

    pets.forEach(pet => {
        
        document.getElementById('spinner').style.display ="none"
        const { image, pet_name, breed, date_of_birth, gender, price, petId } = pet;
        const div = document.createElement('div');
        div.classList = "card bg-base-100 border  rounded-xl p-4  "

        div.innerHTML = `
      <figure  >
     <img
      src=${image}
      alt="Shoes"
      class="rounded-xl " />
     </figure> 
     <div class="mt-4 space-y-2 ">
     <h2 class="card-title">${pet_name}</h2>
     <p><i class="fa-solid fa-bars"></i> Breed: ${breed ? breed : "Not  Available"}</p>
     <p><i class="fa-solid fa-calendar-minus"></i> Birth: ${date_of_birth ?  date_of_birth : "Not Available"}</p>
     <p><i class="fa-solid fa-mercury"></i> Gender: ${gender ? gender : "Not  Available"}</p>
     <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price ? price : "Not  Available"}</p>
     <div class="border-b pt-4 "></div>
     <div class="card-actions justify-between pt-4">
      <button onclick="loadLike('${petId}')" class="btn text-clifford "><i class="fa-regular fa-thumbs-up"></i></button>
            <button onclick ="displayCongrates()"  class="btn  font-bold hover:bg-clifford ">Adopt</button>
            <button onclick ="loadDetails(${petId})" class="btn  font-bold hover:bg-clifford ">Details</button>
     </div>
     </div>
     `
            petCard.appendChild(div);
    })
}
const loadPets = async (name) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${name}`)
    const data = await res.json();
    buttonActive()
    const activeBtn =document.getElementById(`btn-${name}`);
    activeBtn.classList.add("active") 
    document.getElementById("spinner").style.display ="block"
    setTimeout(function () {
        displayAllPets(data.data);
    }, 2000);


}
const buttonActive = () =>{
    const button =document.getElementsByClassName('category-btn')
  for(let btn of button){
    btn.classList.remove("active")
  }
}
const loadSort = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json();
    displaySort(data.pets)
}
const displaySort = (prices) =>{
//     prices.forEach( taka =>{
//         const numbers = taka;
//         const sorted = numbers.sort((a, b) => a - b);
//         console.log(sorted)

//     })
}

// baki
const displayCongrates = () => {
   
    const btnCongrates =document.getElementById('btn-congrates')
    btnCongrates.innerHTML=`
        <i class="fa-regular fa-handshake text-5xl"></i>
        <h3 class="text-4xl font-bold">congrates</h3>
        <p class="py-4 font-bold">Adoption Process is Start For Pet</p>
    `
    document.getElementById('my_modal_2').showModal()

}
const loadDetails = async (Details) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${Details}`)
    const data = await res.json();
    displayDetails(data.petData);
}
const displayDetails = (petData) => {
    console.log(petData)
    const { image, pet_name, breed, date_of_birth, gender, price, pet_details } = petData
    const detailContainer = document.getElementById('detail-container')
    detailContainer.innerHTML = `
    <figure class="w-[460px]" >
     <img 
      src=${image}
      alt="Shoes"
      class="w-full rounded-xl " />
     </figure> 
    <div class="mt-4 space-y-2 ">
    <h2 class="card-title">${pet_name}</h2>
    <p><i class="fa-solid fa-bars"></i> Breed: ${breed ? breed : "Not Available"}</p>
    <p><i class="fa-solid fa-calendar-minus"></i> Birth: ${date_of_birth ? date_of_birth : "Not Available"}</p>
    <p><i class="fa-solid fa-mercury"></i> Gender: ${gender ? gender : "Not Available"}</p>
    <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price ? price : "Not Available"}</p>
    <div class="border-b pt-4 "></div>
    <h5 class="font-semibold">Details Information</h5>
    <p>${pet_details}</p>
    `

    document.getElementById('my_modal_1').showModal()
}

const loadLike = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    const data = await res.json();
    displayLike(data.petData);
}
const displayLike = (ids) => {
    console.log(ids)
    const likePets = document.getElementById('like-pets')
    const div = document.createElement('div')
    div.innerHTML = `
    <img class="rounded-xl" src=${ids.image} alt="">
    `
    likePets.appendChild(div)
}

const petButtonCategories = (buttons) => {
    const btnContainer = document.getElementById('btn-container')
    
    buttons.forEach(button => {
        const { category, category_icon } = button
        const div = document.createElement('div');
        div.innerHTML = `
        <button id="btn-${category}" onclick ="loadPets('${category}')" class=" w-72 h-28 btn  text-2xl font-bold  hover:rounded-full category-btn">
        <img src=${category_icon} alt="">${category}</button>
        `
       
        btnContainer.appendChild(div)
    });
}

loadButton();
loadAllPets()


// for(let pics of image) {