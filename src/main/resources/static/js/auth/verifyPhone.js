const carrierButton = document.getElementById("carrierButton");
const modal = document.getElementById("carrierModal");
const modalContent = modal.querySelector(".modal-content");

const nameInput = document.getElementById("name");
const residentNumber1Input = document.getElementById("residentNumber1");
const residentNumber2Input = document.getElementById("residentNumber2");

const carrierItems = document.querySelectorAll(".carrier-item");
const checkboxes = document.querySelectorAll(".agreement-checkbox");
const certifyButton = document.getElementById("certifyButton");

document.addEventListener("DOMContentLoaded", () => {

    // 통신사 선택 버튼 클릭 시 모달 표시
    carrierButton.addEventListener("click", () => {
        modal.style.display = "flex"; // 모달 보이기
        setTimeout(() => {
            modal.classList.add("show"); // 애니메이션 시작
        }, 10);
    });

    // 통신사 리스트 클릭 시 값 설정 및 모달 닫기
    carrierItems.forEach(item => {
        item.addEventListener("click", (event) => {
            carrierButton.textContent = event.target.textContent; // 선택된 통신사 버튼에 표시
            closeModal();
        });
    });

    // 모달 외부 클릭 시 닫기
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // 모달 닫기 함수
    function closeModal() {
        modal.classList.remove("show"); // 애니메이션 종료
        setTimeout(() => {
            modal.style.display = "none"; // 모달 숨기기
        }, 300); // 애니메이션 지속 시간
    }
});

function updateCertifyButtonState() {
    const allCheckboxesChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
    const isNameFilled = nameInput.value.trim() !== "";
    const isResidentNumber1Filled = residentNumber1Input.value.trim() !== "";
    const isResidentNumber2Filled = residentNumber2Input.value.trim() !== "";

    // Enable button only when all conditions are met
    if (allCheckboxesChecked && isNameFilled && isResidentNumber1Filled && isResidentNumber2Filled) {
        certifyButton.disabled = false;
        certifyButton.classList.add("active");
    } else {
        certifyButton.disabled = true;
        certifyButton.classList.remove("active");
    }
}

// Add event listeners for checkboxes
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateCertifyButtonState);
});

// Add event listeners for input fields
[nameInput, residentNumber1Input, residentNumber2Input].forEach((input) => {
    input.addEventListener("input", updateCertifyButtonState);
});

const urlParams = new URLSearchParams(window.location.search);
const phoneNumber = urlParams.get("phoneNumber");

// Set the phone number in the input field
if (phoneNumber) {
    document.getElementById("phoneNumber").value = phoneNumber;
}