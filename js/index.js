const loadButton = async () => {
    document.getElementById('spinner').style.spinner = "none"
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json();
    petButtonCategories(data.categories)
}
const loadAllPets = async () => {
    document.getElementById('spinner').style.spinner = "none"
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json();
    displayAllPets(data.pets)
}

const displayAllPets = (pets) => {
    const petCard = document.getElementById('pets')
    petCard.innerHTML = "";
    if(pets.length == 0){
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
    else{
        petCard.classList.add("lg:grid")
    }
    pets.forEach(pet => {
        const { image, pet_name, breed, date_of_birth, gender, price,petId } = pet;
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
    <p><i class="fa-solid fa-bars"></i> Breed: ${breed? breed: "Not Available"}</p>
    <p><i class="fa-solid fa-calendar-minus"></i> Birth: ${date_of_birth? date_of_birth : "Not Available" }</p>
    <p><i class="fa-solid fa-mercury"></i> Gender: ${gender? gender: "Not Available"}</p>
    <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price? price: "Not Available"}</p>
    <div class="border-b pt-4 "></div>
    <div class="card-actions justify-between pt-4">
      <button class="btn text-clifford "><i class="fa-regular fa-thumbs-up"></i></button>
            <button class="btn  font-bold hover:bg-clifford  ">Adopt</button>
            <button onclick ="loadDetails(${petId})" class="btn  font-bold hover:bg-clifford ">Details</button>
    </div>
  </div>
`
        petCard.appendChild(div);

    })
}

// displayAllBtn = (categories)=>{
//     document.getElementById('spinner').style.spinner = "block"
//     setTimeout(function () {
//         btnAll()
//     }, 2000)
//     categories.forEach(categorie => {
//         console.log(categorie)
//     });
// }
const loadPets = async(name) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${name}`)
    const data = await res.json();
    displayAllPets(data.data);
}
const loadDetails = async(Details) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${Details}`)
    const data = await res.json();
    displayDetails(data.petData);
}
const displayDetails=(petData)=>{
    console.log(petData)
    const { image, pet_name, breed, date_of_birth, gender, price, pet_details } = petData
    const detailContainer =document.getElementById('detail-container')
    detailContainer.innerHTML=`
    <figure class="w-[460px]" >
     <img 
      src=${image}
      alt="Shoes"
      class="w-full rounded-xl " />
     </figure> 
    <div class="mt-4 space-y-2 ">
    <h2 class="card-title">${pet_name}</h2>
    <p><i class="fa-solid fa-bars"></i> Breed: ${breed? breed: "Not Available"}</p>
    <p><i class="fa-solid fa-calendar-minus"></i> Birth: ${date_of_birth? date_of_birth : "Not Available" }</p>
    <p><i class="fa-solid fa-mercury"></i> Gender: ${gender? gender: "Not Available"}</p>
    <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price? price: "Not Available"}</p>
    <div class="border-b pt-4 "></div>
    <h5 class="font-semibold">Details Information</h5>
    <p>${pet_details}</p>
    `

    document.getElementById('my_modal_1').showModal()
}


const petButtonCategories = (buttons) => {
    const btnContainer = document.getElementById('btn-container')
    buttons.forEach(button => {
        const { category, category_icon } = button
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick ="loadPets('${category}')" class=" w-72 h-28 btn  bg-white text-2xl font-bold  hover:rounded-full ">
        <img src=${category_icon} alt="">${category}</button>
        `
        btnContainer.appendChild(div)
    });
}

loadButton();
loadAllPets()


