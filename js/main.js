// lab 1 Selecting Doggos
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
