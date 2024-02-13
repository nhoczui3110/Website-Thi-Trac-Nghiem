function showQuestion(index,socau){
    socau = 5
    const li = document.querySelectorAll(".exam-view .question-answer")
    for(let i = 0;i<socau;i++){
        li[i].style.display = "none";
    }
    li[index].style.display = "flex";
}

function showRemainingTime(time){

}

// countdown.js

function countdownMinutes(minutes) {
    var seconds = minutes * 60;
    const showTime = document.getElementById("time")
    function updateDisplay() {  
        var displayMinutes = Math.floor(seconds / 60);
        var displaySeconds = seconds % 60;

        displayMinutes = displayMinutes < 10 ? "0" + displayMinutes : displayMinutes;
        displaySeconds = displaySeconds < 10 ? "0" + displaySeconds : displaySeconds;
        showTime.innerHTML = "<p>Thời gian:" +minutes+ ":00 phút</p> <p>Còn lại: "+displayMinutes + ":" + displaySeconds +" phút</p>"

        console.log(displayMinutes + ":" + displaySeconds);
    }

    // Cập nhật hiển thị mỗi giây
    var timer = setInterval(function () {
        updateDisplay();

        if (--seconds < 0) {
            clearInterval(timer);
            console.log("Countdown finished!"); // Thêm hành động khi hết thời gian
        }
    }, 1000);

    // Khởi tạo hiển thị ban đầu
    updateDisplay();
}
function subMit(){
    const form = document.getElementById("form");
    form.submit()
}
