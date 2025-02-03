let timer = null;
let isRunning = false;
let clearBtn;

document.addEventListener("DOMContentLoaded", () => {
    const phoneNumberInput = document.getElementById("phoneNumber");
    const nextButton = document.getElementById("nextButton");
    const display = document.getElementById('time');
    let leftSec = 30;
    clearBtn = document.getElementById('clearBtn');
    phoneNumberInput.addEventListener("input", (event) => {

        // 숫자만 입력되도록 필터링
        const rawValue = event.target.value.replace(/[^0-9]/g, "");

        // 형식 적용
        let formattedNumber = rawValue;
        if (rawValue.length > 3 && rawValue.length <= 7) {
            formattedNumber = `${rawValue.slice(0, 3)} ${rawValue.slice(3)}`;
        } else if (rawValue.length > 7) {
            formattedNumber = `${rawValue.slice(0, 3)} ${rawValue.slice(3, 7)} ${rawValue.slice(7)}`;
        }

        phoneNumberInput.value = formattedNumber;

        if (phoneNumberInput.value.length == 13) {
            nextButton.disabled = false;
            nextButton.classList.add("active");
        } else {
            nextButton.disabled = true;
            nextButton.classList.remove("active");
        }
    });

    //타이머 호출(본인인증)

    clearBtn.addEventListener('click', () => {

        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
        }

        display.innerHTML = "00 : " + leftSec+ "";
        startTimer(leftSec, display);
    });

    dps.Ajax.fnIsLoading();
    startTimer(leftSec, display);
});

function startTimer(count, display) {
    let minutes, seconds;
    timer = setInterval(function () {
        minutes = parseInt(count / 60, 10);
        seconds = parseInt(count % 60, 10);
        //0~9 앞에 0 붙이기
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = minutes + " : " + seconds;

        //타이머 끝
        if (--count < 0) {
            dps.Ajax.hideLoadingBar();
            clearInterval(timer);
            display.innerHTML="time out";
            clearBtn.setAttribute("disabled", true);
            isRunning = false;
        }
    }, 1000);
    isRunning = true;
}
