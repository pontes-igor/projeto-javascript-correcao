

const dropdowns = document.querySelectorAll(".dropdown");

const listOfOptions = document.querySelectorAll(".option");
const body = document.body;

// Functions
const toggleDropdown = (event) => {
  event.stopPropagation();
  let dropdown = event.currentTarget.closest(".dropdown");
  dropdown.classList.toggle("opened");
};

const selectOption = (event) => {
  const input = event.currentTarget.closest(".dropdown").querySelector("input");
  listOfOptions.forEach((option) => {
    option.classList.remove("selected");
  });

  event.currentTarget.classList.add("selected");
  input.value = event.currentTarget.textContent;
};

const closeDropdownFromOutside = () => {
  dropdowns.forEach((dropdown) => {
    if (dropdown.classList.contains("opened")) {
      dropdown.classList.remove("opened");
    }
  });
};
// Event Listeners

body.addEventListener("click", closeDropdownFromOutside);

listOfOptions.forEach((option) => {
  option.addEventListener("click", selectOption);
});

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", toggleDropdown);
});


