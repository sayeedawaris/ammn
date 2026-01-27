// Tab switching functionality
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    const page = this.getAttribute("data-page");
    switchToPage(page);
  });
});

function switchToPage(pageName) {
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document.querySelector(`[data-page="${pageName}"]`).classList.add("active");
  document
    .querySelectorAll(".page-content")
    .forEach((p) => p.classList.remove("active"));

  // Show selected page
  if (pageName === "car-details") {
    document.getElementById("car-details-page").classList.add("active");
  } else if (pageName === "insurance-details") {
    document.getElementById("insurance-details-page").classList.add("active");
  }
}

// Toggle Year of Manufacture field
function toggleYearField() {
  const checkbox = document.getElementById("customsNumber");
  const yearField = document.getElementById("yearOfManufacture");

  if (checkbox.checked) {
    yearField.classList.remove("hidden");
  } else {
    yearField.classList.add("hidden");
  }
}

// Toggle Additional Sections
function toggleAdditionalSections() {
  const checkbox = document.getElementById("additionalData");
  const sections = document.getElementById("vehicleDataSection");

  if (checkbox.checked) {
    sections.classList.remove("hidden");
  } else {
    sections.classList.add("hidden");
  }
}

// Toggle Safety Features Section
function toggleSafetyFeatures() {
  const checkbox = document.getElementById("showOtherDetails");
  const section = document.getElementById("safetyFeaturesSection");

  if (checkbox.checked) {
    section.classList.remove("hidden");
  } else {
    section.classList.add("hidden");
  }
}

// Toggle button selection
function selectToggle(button) {
  const group = button.parentElement;
  const buttons = group.querySelectorAll(".toggle-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
}

// Counter functions
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

// Navigate to Insurance Details page
function goToInsuranceDetails() {
  // Save car details data
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

// random captcha
function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let captcha = "";
  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

// Refresh captcha
function refreshCaptcha() {
  const newCaptcha = generateCaptcha();
  document.getElementById("captchaText").textContent = newCaptcha;
  document.getElementById("captchaInput").value = "";
}

// Verify identity
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

  // Verification successful
  console.log("Identity verified for ID:", idNumber);
  hideVerificationModal();

  // Show OTP modal
  showOTPModal(idNumber);
}

// Show OTP modal
function showOTPModal(phoneNumber) {
  // Format and display phone number (you can customize this)
  const formattedPhone = phoneNumber || "+966 4252 1232";
  document.getElementById("displayPhone").textContent = formattedPhone;

  // Clear OTP inputs
  for (let i = 1; i <= 4; i++) {
    document.getElementById("otp" + i).value = "";
  }

  // Show modal
  document.getElementById("otpModal").classList.add("show");

  // Focus first input
  document.getElementById("otp1").focus();

  // Start countdown timer
  startOTPTimer();
}

// Hide OTP modal
function hideOTPModal() {
  document.getElementById("otpModal").classList.remove("show");
}

// Close OTP modal when clicking outside
document.getElementById("otpModal").addEventListener("click", function (e) {
  if (e.target === this) {
    hideOTPModal();
  }
});

// OTP input navigation
function moveToNext(current, nextId) {
  if (current.value.length === 1 && nextId) {
    document.getElementById(nextId).focus();
  }

  // Check if all OTP boxes are filled
  checkOTPComplete();
}

function moveToPrev(current, prevId, event) {
  if (event.keyCode === 8 && current.value.length === 0 && prevId) {
    document.getElementById(prevId).focus();
  }
}

// Check if OTP is complete
function checkOTPComplete() {
  const otp1 = document.getElementById("otp1").value;
  const otp2 = document.getElementById("otp2").value;
  const otp3 = document.getElementById("otp3").value;
  const otp4 = document.getElementById("otp4").value;

  if (otp1 && otp2 && otp3 && otp4) {
    const fullOTP = otp1 + otp2 + otp3 + otp4;
    console.log("OTP Entered:", fullOTP);

    // Automatically verify after 1 second
    setTimeout(() => {
      verifyOTP(fullOTP);
    }, 1000);
  }
}

// Verify OTP
function verifyOTP(otp) {
  // In a real app, this would verify with backend
  console.log("Verifying OTP:", otp);
  alert("OTP Verified Successfully!");
  hideOTPModal();

  // Navigate to Insurance Details page
  switchToPage("insurance-details");
  window.scrollTo(0, 0);
}

// Edit phone number
function editPhoneNumber() {
  hideOTPModal();
  showVerificationModal();
}

// OTP Timer
let otpTimer;
function startOTPTimer() {
  let timeLeft = 29;
  const timerDisplay = document.getElementById("timerDisplay");

  // Clear any existing timer
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

// Resend OTP
function resendOTP() {
  alert("A new verification code has been sent!");
  startOTPTimer();
}
// Add driver function
function addDriver() {
  document.getElementById("addDriverModal").classList.add("show");
}

// Hide add driver modal
function hideAddDriverModal() {
  document.getElementById("addDriverModal").classList.remove("show");
}

// Close modal when clicking outside
document
  .getElementById("addDriverModal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      hideAddDriverModal();
    }
  });

// Toggle driver additional details
function toggleDriverAdditionalDetails() {
  const checkbox = document.getElementById("showDriverDetails");
  const details = document.getElementById("driverAdditionalDetails");

  if (checkbox.checked) {
    details.classList.remove("hidden");
  } else {
    details.classList.add("hidden");
  }
}

// Driver counter functions
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

// Save driver
function saveDriver() {
  const driverData = {
    authorized: document.getElementById("driverAuthorized").checked,
    serialNumber: document.getElementById("driverSerial").value,
    birthMonth: document.getElementById("birthMonth").value,
    birthYear: document.getElementById("birthYear").value,
    leadershipRatio: document.getElementById("leadershipSlider").value,
  };

  // Validate required fields
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

// Add driver card to Insurance Details page
function addDriverCard(driverData) {
  const driverCardsContainer = document.getElementById("driverCardsContainer");
  const addDriverCard = driverCardsContainer.querySelector(".add-driver-card");

  // Create new driver card
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

  // Insert before the "Add Driver" card
  driverCardsContainer.insertBefore(newDriverCard, addDriverCard);
}
// Hide add driver modal
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

// Remove driver function (optional)
function removeDriver(button) {
  const card = button.closest(".driver-card");
  if (confirm("Are you sure you want to remove this driver?")) {
    card.remove();
  }
}

// Reset Add Driver form
function resetAddDriverForm() {
  document.getElementById("driverAuthorized").checked = true;
  document.getElementById("driverSerial").value = "";
  document.getElementById("birthMonth").value = "";
  document.getElementById("birthYear").value = "";
  document.getElementById("leadershipSlider").value = 20;
  document.getElementById("showDriverDetails").checked = false;
  document.getElementById("driverAdditionalDetails").classList.add("hidden");

  // Reset additional fields
  document.getElementById("kinship").value = "";
  document.getElementById("education").value = "";
  document.getElementById("childrenCount").value = 1;
  document.getElementById("accidentsCount").value = 0;
  document.getElementById("healthCondition").checked = false;
  document.getElementById("driverViolations").checked = false;
}

// Submit Insurance form
function submitInsuranceForm() {
  const insuranceData = {
    workshopRepair: document.getElementById("workshopRepair").checked,
    startDate: document.getElementById("startDate").value,
    carValue: document.getElementById("carValue").value,
    transferOwnership: document.getElementById("transferOwnership").checked,
    ownerId: document.getElementById("ownerId").value,
  };

  console.log("Insurance Details:", insuranceData);
  alert("Insurance form submitted! Check console for details.");
}

// Info icon tooltip
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("info-icon")) {
    alert("Additional information about this field.");
  }
});
