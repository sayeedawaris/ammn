
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    const page = this.getAttribute("data-page");
    switchToPage(page);
  });
});

function switchToPage(pageName) {

 
   document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));

  document.querySelector(`[data-page="${pageName}"]`).classList.add("active");
  document
    .querySelectorAll(".page-content")
    .forEach((p) => p.classList.remove("active"));


  if (pageName === "car-details") {
    document.getElementById("car-details-page").classList.add("active");
  } else if (pageName === "insurance-details") {
    document.getElementById("insurance-details-page").classList.add("active");
  }
  else if (pageName === "insurance-details") {
    document.getElementById("insurance-details-page").classList.add("active");
  } else if (pageName === "offers") {
    document.getElementById("offers-page").classList.add("active");
    initializeOffersPage(); 
  } else if (pageName === "quotes") {
    document.getElementById("quotes-page").classList.add("active");
  } else if (pageName === "quote-modal") {
    document.getElementById("quote-modal-page").classList.add("active");
  } else if (pageName === "checkout") {
    document.getElementById("checkout-page").classList.add("active");
  }
}



function toggleYearField() {
  const checkbox = document.getElementById("customsNumber");
  const yearField = document.getElementById("yearOfManufacture");

  if (checkbox.checked) {
    yearField.classList.remove("hidden");
  } else {
    yearField.classList.add("hidden");
  }
}


function toggleAdditionalSections() {
  const checkbox = document.getElementById("additionalData");
  const sections = document.getElementById("vehicleDataSection");

  if (checkbox.checked) {
    sections.classList.remove("hidden");
  } else {
    sections.classList.add("hidden");
  }
}


function toggleSafetyFeatures() {
  const checkbox = document.getElementById("showOtherDetails");
  const section = document.getElementById("safetyFeaturesSection");

  if (checkbox.checked) {
    section.classList.remove("hidden");
  } else {
    section.classList.add("hidden");
  }
}


function selectToggle(button) {
  const group = button.parentElement;
  const buttons = group.querySelectorAll(".toggle-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
}


function increaseCounter(id) {
  const input = document.getElementById(id);
  let value = parseInt(input.value);
  input.value = value + 100;
}

function decreaseCounter(id) {
  const input = document.getElementById(id);
  let value = parseInt(input.value);
  if (value > 100) {
    input.value = value - 100;
  }
}


function goToInsuranceDetails() {

  const carData = {
    customsNumber: document.getElementById("customsNumber").checked,
    serialNumber: document.getElementById("serialNumber").value,
    yearOfManufacture: document.getElementById("yearInput").value,
    additionalData: document.getElementById("additionalData").checked,
  };

  console.log("Car Details:", carData);

  showVerificationModal();
}

function showVerificationModal() {
  document.getElementById("verifyModal").classList.add("show");
}

function hideVerificationModal() {
  document.getElementById("verifyModal").classList.remove("show");
}

document.getElementById("verifyModal").addEventListener("click", function (e) {
  if (e.target === this) {
    hideVerificationModal();
  }
});


function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let captcha = "";
  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}


function refreshCaptcha() {
  const newCaptcha = generateCaptcha();
  document.getElementById("captchaText").textContent = newCaptcha;
  document.getElementById("captchaInput").value = "";
}


function verifyIdentity() {
  const idNumber = document.getElementById("idNumber").value;
  const captchaInput = document.getElementById("captchaInput").value;
  const captchaText = document.getElementById("captchaText").textContent;

  if (!idNumber) {
    alert("Please enter your National ID or Residence Number");
    return;
  }

  if (!captchaInput) {
    alert("Please enter the captcha");
    return;
  }

  if (captchaInput !== captchaText) {
    alert("Captcha does not match. Please try again.");
    refreshCaptcha();
    return;
  }

 
  console.log("Identity verified for ID:", idNumber);
  hideVerificationModal();


  showOTPModal(idNumber);
}


function showOTPModal(phoneNumber) {

  const formattedPhone = phoneNumber || "+966 4252 1232";
  document.getElementById("displayPhone").textContent = formattedPhone;


  for (let i = 1; i <= 4; i++) {
    document.getElementById("otp" + i).value = "";
  }


  document.getElementById("otpModal").classList.add("show");


  document.getElementById("otp1").focus();

 
  startOTPTimer();
}


function hideOTPModal() {
  document.getElementById("otpModal").classList.remove("show");
}


document.getElementById("otpModal").addEventListener("click", function (e) {
  if (e.target === this) {
    hideOTPModal();
  }
});


function moveToNext(current, nextId) {
  if (current.value.length === 1 && nextId) {
    document.getElementById(nextId).focus();
  }

 
  checkOTPComplete();
}

function moveToPrev(current, prevId, event) {
  if (event.keyCode === 8 && current.value.length === 0 && prevId) {
    document.getElementById(prevId).focus();
  }
}


function checkOTPComplete() {
  const otp1 = document.getElementById("otp1").value;
  const otp2 = document.getElementById("otp2").value;
  const otp3 = document.getElementById("otp3").value;
  const otp4 = document.getElementById("otp4").value;

  if (otp1 && otp2 && otp3 && otp4) {
    const fullOTP = otp1 + otp2 + otp3 + otp4;
    console.log("OTP Entered:", fullOTP);


    setTimeout(() => {
      verifyOTP(fullOTP);
    }, 1000);
  }
}


function verifyOTP(otp) {

  console.log("Verifying OTP:", otp);
  alert("OTP Verified Successfully!");
  hideOTPModal();

  switchToPage("insurance-details");
  window.scrollTo(0, 0);
}


function editPhoneNumber() {
  hideOTPModal();
  showVerificationModal();
}


let otpTimer;
function startOTPTimer() {
  let timeLeft = 29;
  const timerDisplay = document.getElementById("timerDisplay");


  if (otpTimer) {
    clearInterval(otpTimer);
  }

  otpTimer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (timeLeft === 0) {
      clearInterval(otpTimer);
      timerDisplay.innerHTML =
        '<span class="resend-link" onclick="resendOTP()">Send code again</span>';
    }

    timeLeft--;
  }, 1000);
}


function resendOTP() {
  alert("A new verification code has been sent!");
  startOTPTimer();
}

function addDriver() {
  document.getElementById("addDriverModal").classList.add("show");
}


function hideAddDriverModal() {
  document.getElementById("addDriverModal").classList.remove("show");
}

document
  .getElementById("addDriverModal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      hideAddDriverModal();
    }
  });


function toggleDriverAdditionalDetails() {
  const checkbox = document.getElementById("showDriverDetails");
  const details = document.getElementById("driverAdditionalDetails");

  if (checkbox.checked) {
    details.classList.remove("hidden");
  } else {
    details.classList.add("hidden");
  }
}

function increaseDriverCounter(id) {
  const input = document.getElementById(id);
  let value = parseInt(input.value);
  input.value = value + 1;
}

function decreaseDriverCounter(id) {
  const input = document.getElementById(id);
  let value = parseInt(input.value);
  if (value > 0) {
    input.value = value - 1;
  }
}


function saveDriver() {
  const driverData = {
    authorized: document.getElementById("driverAuthorized").checked,
    serialNumber: document.getElementById("driverSerial").value,
    birthMonth: document.getElementById("birthMonth").value,
    birthYear: document.getElementById("birthYear").value,
    leadershipRatio: document.getElementById("leadershipSlider").value,
  };


  if (!driverData.serialNumber) {
    alert("Please enter Serial Number");
    return;
  }

  if (document.getElementById("showDriverDetails").checked) {
    driverData.kinship = document.getElementById("kinship").value;
    driverData.education = document.getElementById("education").value;
    driverData.children = document.getElementById("childrenCount").value;
    driverData.accidents = document.getElementById("accidentsCount").value;
    driverData.healthCondition =
      document.getElementById("healthCondition").checked;
    driverData.violations = document.getElementById("driverViolations").checked;
  }

  console.log("Driver Data:", driverData);

  addDriverCard(driverData);

  hideAddDriverModal();
  resetAddDriverForm();
}


function addDriverCard(driverData) {
  const driverCardsContainer = document.getElementById("driverCardsContainer");
  const addDriverCard = driverCardsContainer.querySelector(".add-driver-card");


  const newDriverCard = document.createElement("div");
  newDriverCard.className = "driver-card";
  newDriverCard.innerHTML = `
                <div class="driver-header">
                    <span class="driver-title">Additional Driver</span>
                    <span class="driver-id">ID-${driverData.serialNumber}</span>
                </div>
                <div class="driver-location">KINGDOM OF SAUDI ARABIA</div>
                <div class="driver-info">
                    <div class="driver-info-item">
                        <span class="driver-info-label">Birth Year</span>
                        <span class="driver-info-value">${driverData.birthYear || "N/A"}</span>
                    </div>
                    <div class="driver-info-item">
                        <span class="driver-info-label">Leadership</span>
                        <span class="driver-info-value leadership-score">${driverData.leadershipRatio}<span class="score-total">/100</span></span>
                    </div>
                </div>
            `;


  driverCardsContainer.insertBefore(newDriverCard, addDriverCard);
}

function hideAddDriverModal() {
  document.getElementById("addDriverModal").classList.remove("show");
}

function editDriver(button) {
  const card = button.closest(".driver-card");
  const driverId = card
    .querySelector(".driver-id")
    .textContent.replace("ID-", "");

  alert("Edit driver with ID: " + driverId);
}


function removeDriver(button) {
  const card = button.closest(".driver-card");
  if (confirm("Are you sure you want to remove this driver?")) {
    card.remove();
  }
}


function resetAddDriverForm() {
  document.getElementById("driverAuthorized").checked = true;
  document.getElementById("driverSerial").value = "";
  document.getElementById("birthMonth").value = "";
  document.getElementById("birthYear").value = "";
  document.getElementById("leadershipSlider").value = 20;
  document.getElementById("showDriverDetails").checked = false;
  document.getElementById("driverAdditionalDetails").classList.add("hidden");


  document.getElementById("kinship").value = "";
  document.getElementById("education").value = "";
  document.getElementById("childrenCount").value = 1;
  document.getElementById("accidentsCount").value = 0;
  document.getElementById("healthCondition").checked = false;
  document.getElementById("driverViolations").checked = false;
}


function submitInsuranceForm() {
  const insuranceData = {
    workshopRepair: document.getElementById("workshopRepair").checked,
    startDate: document.getElementById("startDate").value,
    carValue: document.getElementById("carValue").value,
    transferOwnership: document.getElementById("transferOwnership").checked,
    ownerId: document.getElementById("ownerId").value,
  };

  console.log("Insurance Details:", insuranceData);
  alert("");
}
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("info-icon")) {
    alert("");
  }
});
function initializeOffersPage() {
  generateOfferCards();
  setupOffersSearch();
  setupAddonCheckboxes();
}

function generateOfferCards() {
  const offersList = document.getElementById("offersList");
  if (!offersList) return;

  const offersData = [
    {
      id: 1,
      company: "Cooperative Insurance Company",
      price: 2562.86,
      addons: [
        { id: "replacement1", name: "Replacement Car", price: 200 },
        { id: "roadside1", name: "Roadside Assistance", price: 35 },
      ],
    },
    {
      id: 2,
      company: "Cooperative Insurance Company",
      price: 2562.86,
      addons: [
        { id: "replacement2", name: "Replacement Car", price: 200 },
        { id: "roadside2", name: "Roadside Assistance", price: 35 },
      ],
    },
    {
      id: 3,
      company: "Cooperative Insurance Company",
      price: 2562.86,
      addons: [
        { id: "replacement3", name: "Replacement Car", price: 200 },
        { id: "roadside3", name: "Roadside Assistance", price: 35 },
      ],
    },
    {
      id: 4,
      company: "Cooperative Insurance Company",
      price: 2562.86,
      addons: [
        { id: "replacement4", name: "Replacement Car", price: 200 },
        { id: "roadside4", name: "Roadside Assistance", price: 35 },
      ],
    },
  ];

  offersList.innerHTML = "";

  offersData.forEach((offer) => {
    const card = createOfferCard(offer);
    offersList.appendChild(card);
  });
}

function createOfferCard(offer) {
  const card = document.createElement("div");
  card.className = "offer-card";
  card.dataset.basePrice = offer.price;

  const addonsHTML = offer.addons
    .map(
      (addon) => `
        <div class="addon-item">
            <input type="checkbox" id="${addon.id}" data-price="${addon.price}" onchange="updateOfferPrice(this)">
            <label for="${addon.id}" class="addon-label">${addon.name}</label>
            <span class="addon-price">₪ ${addon.price}</span>
        </div>
    `
    )
    .join("");

  card.innerHTML = `
        <div class="company-logo">
            مربى<br>nomi
        </div>
        <div class="offer-content">
            <div class="company-name">${offer.company}</div>
            <a href="#" class="terms-link">Terms & Conditions</a>
            
            <div class="coverage-badge">
                <span class="check-icon">✓</span>
                <span>Insurance covers free of charge</span>
            </div>
            
            <div class="coverage-text">
                The largest workshop network in the Kingdom, speed in settling claims, and international coverage
            </div>
            
            <div class="addons-section">
                <div class="addons-title">
                    ⊕ Paid Add-ons
                </div>
                ${addonsHTML}
            </div>
        </div>
        <div class="offer-pricing">
            <div class="pricing-header">
                <span class="pricing-label">Payable Amount</span>
                <a href="#" class="pricing-details">Pricing Details <img src=""</a>
            </div>
            <div class="price-amount">
                <span class="currency">₪</span> <span class="price-value">${offer.price.toFixed(2)}</span>
            </div>
            <div class="endurance-section">
                <div class="endurance-label">Endurance Value</div>
                <select class="endurance-select">
                    <option>Select Value</option>
                    <option>1000</option>
                    <option>2000</option>
                    <option>3000</option>
                </select>
            </div>
            <button class="buy-btn" onclick="buyOffer(this)">
                Buy Now →
            </button>
        </div>
    `;

  return card;
}

function updateOfferPrice(checkbox) {
  const card = checkbox.closest(".offer-card");
  const basePrice = parseFloat(card.dataset.basePrice);
  const priceValueElement = card.querySelector(".price-value");

  let totalPrice = basePrice;

  const checkedAddons = card.querySelectorAll(
    '.addon-item input[type="checkbox"]:checked'
  );
  checkedAddons.forEach((addon) => {
    const addonPrice = parseFloat(addon.dataset.price);
    totalPrice += addonPrice;
  });

  priceValueElement.textContent = totalPrice.toFixed(2);
}

function setupOffersSearch() {
  const searchInput = document.getElementById("offerSearch");
  if (!searchInput) return;

  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const offers = document.querySelectorAll(".offer-card");

    offers.forEach((offer) => {
      const companyName = offer
        .querySelector(".company-name")
        .textContent.toLowerCase();
      if (companyName.includes(searchTerm)) {
        offer.style.display = "flex";
      } else {
        offer.style.display = "none";
      }
    });
  });
}

function setupAddonCheckboxes() {
}

function buyOffer(button) {
  const card = button.closest(".offer-card");
  const company = card.querySelector(".company-name").textContent;
  const price = card.querySelector(".price-value").textContent;
  const endurance = card.querySelector(".endurance-select").value;

  if (endurance === "Select Value") {
    alert("Please select an endurance value before proceeding.");
    return;
  }

  alert(`Proceeding to checkout for ${company}\nTotal: ₪ ${price}\nEndurance: ${endurance}`);
}

function goToNextPage() {
  alert("Proceeding to quotes list...");

}

