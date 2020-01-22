// Lab 1 Selecting Doggos
// It's best to start with a fresh clone of Dogo Arena at
// https://github.com/CodeCoreYVR/doggoArena for the labs.

// Implement the ability to select doggos

// Clicking a.doggo.fighter adds the selected class to it.A doggo with the selected class is considered selected.
// Only one doggo can have the selected class.
// Clicking a team's name, moves a selected doggo to that team.
// Stretch
// Clicking anywhere else on the page, unselects all selected.doggo.fighters.

// ====================

// Return the selected doggo
function getSelectedDoggo() {
  return document.querySelector(".doggo.fighter.selected");
}

// Remove selected doggos, if one exist
function removeSelected() {
  const selected = getSelectedDoggo();
  if (selected) {
    selected.classList.remove("selected");
  }
}

// clicking a .doggo.fighter adds the selected class to it.
// A doggo with the selected class is considered selected.
// Only one doggo can have the selected class.

document.querySelectorAll(".doggo.fighter").forEach(doggo => {
  doggo.addEventListener("click", event => {
    removeSelected();
    doggo.classList.add("selected");
  });
});

// clicking a team's name, moves a selected doggo to that team.
document.querySelectorAll(".team > h1").forEach(teamTitle => {
  teamTitle.addEventListener("click", event => {
    //  the 'closest' method is a query selector that queries for the closest
    // ancestor (parent, grandparent, etc) that satisfies the query
    // In this case, we are querying for an ancestor with class 'team'
    const roster = teamTitle.closest(".team").querySelector(".roster");
    let traitorDog = getSelectedDoggo();
    if (traitorDog) {
      roster.append(traitorDog);
    }
  });
});

// Stretch

document.body.addEventListener("click", event => {
  const { target } = event;
  if (!target.closest(".team")) removeSelected();
});

/*----------------------------------------------*/

// Lab2
// Update the applicant preview's h1 node contents with the applicant name as it is typed.
const name = document.querySelector("#name");
const previewName = document.querySelector("#applicant-preview h1");
name.addEventListener("input", event => {
  previewName.innerText = event.currentTarget.value;
});

// Update the applicant preview's picture once a valid picture url as it is typed. Check that the typed in field ends with .jpg, .gif or .png.

const pictureUrl = document.querySelector("#picture-url");
const blankDoggo = document.querySelector(".doggo.blank");

pictureUrl.addEventListener("input", event => {
  const { value } = event.currentTarget;
  const extension = value.slice(-4);
  const validExtensions = [".jpg", ".gif", ".png"];
  if (validExtensions.includes(extension)) {
    blankDoggo.style.backgroundImage = `url(${value})`;
  }
});

// Give a salmon or teal border to the applicant preview depending on which team is typed.

const teamName = document.querySelector("#team-name");
const applicantPreview = document.querySelector("#applicant-preview");

teamName.addEventListener("input", event => {
  const { value } = event.currentTarget;
  if (isValidTeamName(value)) {
    applicantPreview.style.border = `5px solid ${value}`;
  }
});
// When the form is submitted, reset the applicant preview and create that.doggo.fighter in the team written in the team name field.
const form = document.querySelector("#application-form");
form.addEventListener("submit", event => {
  event.preventDefault();
  const newDoggo = blankDoggo.cloneNode(true);
  if (isValidTeamName(teamName.value)) {
    document
      .querySelector(`.team.${teamName.value.toLowerCase()} .roster`)
      .append(newDoggo);
    resetForm();
  } else {
    alert("Please enter a valid team name");
  }
});

// helpers
// Check if the entered team name is valid
const isValidTeamName = name => {
  const tName = name.toLowerCase();
  const validTeamNames = ["teal", "salmon"];
  return validTeamNames.includes(tName);
};

// reset form after submission
const resetForm = () => {
  form.reset();
  applicantPreview.style.border = "";
  previewName.innerText = "Applicant Preview";
  blankDoggo.style.background = "";
};
