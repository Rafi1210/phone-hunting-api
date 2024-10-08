const loadPhone = async (searchText = "sam", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  console.log(phones);

  //1. Find the div where we want to set the data to show
  const phoneContainer = document.getElementById("phone-container");
  //clear phone container cards before adding new cards
  phoneContainer.textContent = "";
  //display show all button if there are more than n numbers of phone
  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12 && !isShowAll) { //is not show all => !isShowAll means
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  console.log("is Show ALl ", isShowAll);
  //display only first n numbers of phones if not showAll
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    //2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-white p-6 m-6 shadow-lg`;
    //3. set inner html
    phoneCard.innerHTML = `
        <figure class="m-6">
            <img
            src= "${phone.image}"
            alt="phones" />
            </figure>
            <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
    //4.append child
    phoneContainer.appendChild(phoneCard);
  });

  //hide loading spinner
  toggleLoadingSpinner(false);
};

//Show Details Button
const handleShowDetails = async (id) => {
  // console.log("CLicked Button", id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
    <div class="flex justify-center">
      <img src="${phone.image}" alt="Phone Image"/>
    </div>
    <h2 class="text-xl font-bold text-sky-800 flex justify-center p-4">Main Features</h2>
    <p class="pt-1 text-sky-900"><span class="font-bold text-indigo-950">Display Size : </span> ${phone?.mainFeatures?.displaySize}</p>
    <p class="pt-1 text-sky-900"><span class="font-bold text-indigo-950">Chipset : </span> ${phone?.mainFeatures?.chipSet}</p>
    <p class="pt-1 text-sky-900"><span class="font-bold text-indigo-950">Storage : </span> ${phone?.mainFeatures?.storage}</p>
    <p class="pt-1 text-sky-900"><span class="font-bold text-indigo-950">Memory : </span> ${phone?.mainFeatures?.memory}</p>
    <p class="pt-1 text-sky-900"><span class="font-bold text-indigo-950">Sensors : </span> ${phone?.mainFeatures?.sensors}</p>
    <h2 class="text-xl font-bold text-sky-800 flex justify-center p-4">Others</h2>
    <p class="pt-1 text-sky-900"><span class="font-bold text-indigo-950">Bluetooth: </span> ${phone?.others?.Bluetooth}</p>
    <p class="pt-1 text-sky-900"><span class="font-bold text-indigo-950">GPS : </span> ${phone?.others?.GPS}</p>
    <p class="pt-1 text-sky-900"><span class="font-bold text-indigo-950">NFC : </span> ${phone?.others?.NFC}</p>
    <p class="pt-1 text-sky-900"><span class="font-bold text-indigo-950">Radio : </span> ${phone?.others?.Radio}</p>
    <p class="pt-1 text-sky-900"><span class="font-bold text-indigo-950">USB : </span> ${phone?.others?.USB}</p>
    <p class="pt-1 text-sky-900"><span class="font-bold text-indigo-950">WLAN : </span> ${phone?.others?.WLAN}</p>
    <p class="pt-1 text-sky-900"><span class="font-bold text-indigo-950">Release Date : </span> ${phone?.releaseDate}</p>
    <p class="pt-1 text-sky-900"><span class="font-bold text-indigo-950">SLUG : </span> ${phone?.slug}</p>
  `;

  // Apply blur effect to the background
  document.getElementById("blur-bg").classList.add("blur-background");

  // Show the modal
  show_details_modal.showModal();
};


// Remove blur effect when modal is closed
const removeBlur = () => {
  document.getElementById("blur-bg").classList.remove("blur-background");
};

// Add event listener to close modal when clicking outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById("show_details_modal");
  const modalContent = document.getElementById("modal-content");

  // If the modal is open and the click is outside of the modal content
  if (modal.open && !modalContent.contains(event.target)) {
    // Close the modal
    modal.close();
    // Remove the blur effect
    removeBlur();
  }
});

// Add event listener for keydown events (e.g., when Esc is pressed)
window.addEventListener('keydown', function(event) {
  const modal = document.getElementById("show_details_modal");
  
  // Check if the Esc key was pressed (keyCode 27) and the modal is open
  if (event.key === 'Escape' && modal.open) {
    // Modal automatically closes on Esc, just remove the blur effect
    modal.close(); // Optional: Ensures modal is closed
    removeBlur();  // Remove the blur
  }
});



//handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  // console.log("handle search");
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

//handle show all
const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();
