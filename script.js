// https://api.postalpincode.in/pincode/637102

const pincode = document.getElementById("pincodeInp");
const listContainer = document.getElementById("listContainer");
const pinDist = document.getElementById("pinDist");
const headPart = document.getElementById("headPart");

const getPosts = async (pin) => {
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const officeList = await response.json();
    displayState(
      officeList[0].PostOffice[0].Division,
      officeList[0].PostOffice[0].Region,
      officeList[0].PostOffice[0].State
    );
    listContainer.innerHTML = "";
    officeList[0].PostOffice.forEach((office) => displayPosts(office));
  } catch (error) {
    alert("Something went wrong ☹️");
  }
};

function displayState(division, region, state) {
  headPart.innerHTML = "";
  headPart.innerHTML += `
  <h5>Division: ${division}</h5>
  <h5>Region: ${region}</h5>
  <h5>State: ${state}</h5>
  `;
}

const displayPosts = (list) => {
  listContainer.innerHTML += `
  <div class="card text-center">
  <div class="card-header h5">
    ${list.Name}
  </div>
  <div class="card-body">
    Block - ${list.Block}
    <br>
    ${list.District}
  </div>
  <div class="card-footer text-muted">
    ${list.BranchType}
  </div>
  </div>
  `;
};

function checkInput() {
  var numbers = /^[0-9]+$/;
  if (pincode.value.length === 6 && pincode.value.match(numbers)) {
    getPosts(pincode.value);
  } else {
    alert("Please enter a valid Pincode");
    pincode.focus();
  }
}
