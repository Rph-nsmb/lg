function insertSpecialCard(data) {
  document.getElementById("specialcards").innerHTML += `
            
				<div id="${data.file}" class="char">

        <div class="charicon"><img src="/lg/assets/personnages/svg/${data.file}.svg"></div>

        <div class="chartext">
				<div class="chartitle">${data.name}</div>
				
        <div class="chardesc">${data.description}</div>

        <div class="charsub">${data.note}</div>
        </div>

				</div>
          `;
}

function insertChar(data) {
  document.getElementById("charlist").innerHTML += `
            
				<div id="${data.file}" class="char camp-${data.camp} apparence-${data.apparence}">

        <div class="charicon"><img src="/lg/assets/personnages/svg/${data.file}.svg"></div>

        <div class="chartext">
				<div class="chartitle">${data.name}</div>
				
        <div class="chardesc">${data.description}</div>

        <div class="charsub">${data.note}</div>
        </div>

				</div>
          `;
}

function filterChars(button) {
  if (button.getAttribute("aria-pressed") === "false") {
    button.setAttribute("aria-pressed", "true");
  } else {
    button.setAttribute("aria-pressed", "false");
  }

  updateChars(document.querySelectorAll(".char"));
}

function updateChars(charlist) {
  const filters = [
    "camp-village",
    "camp-lg",
    "camp-solo",
    "camp-inconnu",
    "apparence-humain",
    "apparence-lg",
    "apparence-animal",
    "apparence-inconnue",
  ];

  charlist.forEach((char) => {
    let show = true;
    filters.forEach((element) => {
      if (char.classList.contains(element) === true) {
        if (
          document.getElementById(element).getAttribute("aria-pressed") ===
          "false"
        ) {
          show = false;
        }
      }
    });

    if (show === true) {
      char.style.display = "flex";
    } else {
      char.style.display = "none";
    }
  });
}

//DOM

document.addEventListener("DOMContentLoaded", () => {
  //JSON fetch

  fetch("/lg/assets/personnages/personnages.json")
    .then((res) => res.json())
    .then((personnages) => {
      personnages.forEach((personnage) => {
        insertChar(personnage);
      });

      //Init variables

      const campVillageButton = document.getElementById("camp-village");
      const campLgButton = document.getElementById("camp-lg");
      const campSoloButton = document.getElementById("camp-solo");
      const campInconnuButton = document.getElementById("camp-inconnu");

      const apparenceHumainButton = document.getElementById("apparence-humain");
      const apparenceLgButton = document.getElementById("apparence-lg");
      const apparenceAnimalButton = document.getElementById("apparence-animal");
      const apparenceInconnueButton =
        document.getElementById("apparence-inconnue");

      //Test

      //console.log(apparenceHumainClass);
      //apparenceHumainClass.forEach((element) => {
      //  element.style.display = "none";
      //});

      campVillageButton.setAttribute("aria-pressed", "true");
      campLgButton.setAttribute("aria-pressed", "true");
      campSoloButton.setAttribute("aria-pressed", "true");
      campInconnuButton.setAttribute("aria-pressed", "true");

      apparenceHumainButton.setAttribute("aria-pressed", "true");
      apparenceLgButton.setAttribute("aria-pressed", "true");
      apparenceAnimalButton.setAttribute("aria-pressed", "true");
      apparenceInconnueButton.setAttribute("aria-pressed", "true");

      //Boutons de camp
      campVillageButton.addEventListener("click", function () {
        filterChars(campVillageButton);
      });

      campLgButton.addEventListener("click", function () {
        filterChars(campLgButton);
      });

      campSoloButton.addEventListener("click", function () {
        filterChars(campSoloButton);
      });

      campInconnuButton.addEventListener("click", function () {
        filterChars(campInconnuButton);
      });

      //Boutons d'apparence
      apparenceHumainButton.addEventListener("click", function () {
        filterChars(apparenceHumainButton);
      });

      apparenceLgButton.addEventListener("click", function () {
        filterChars(apparenceLgButton);
      });

      apparenceAnimalButton.addEventListener("click", function () {
        filterChars(apparenceAnimalButton);
      });

      apparenceInconnueButton.addEventListener("click", function () {
        filterChars(apparenceInconnueButton);
      });
    })

    .catch((err) => {
      console.error(err);
      document.getElementById("charlist").textContent =
        "Could not load characters.";
    });

  fetch("/lg/assets/personnages/special.json")
    .then((res) => res.json())
    .then((personnages) => {
      personnages.forEach((special) => {
        insertSpecialCard(special);
      });
    })

    .catch((err) => {
      console.error(err);
      document.getElementById("special").textContent =
        "Could not load special cards.";
    });
});
