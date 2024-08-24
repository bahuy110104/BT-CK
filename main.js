document.addEventListener('DOMContentLoaded', function () {
    const slots = [document.getElementById('slot1'), document.getElementById('slot2'), document.getElementById('slot3')];
    const images = ['bau.png', 'cua.png', 'tom.png', 'ca.png', 'ga.png', 'huou.png'];
    const bets = {
        hinh1: 0,
        hinh2: 0,
        hinh3: 0,
        hinh4: 0,
        hinh5: 0,
        hinh6: 0
    };
    let totalBets = 0;
    let isSpinning = false;

    function resetBets() {
        for (let key in bets) {
            bets[key] = 0;
            document.getElementById(`counter-${key}`).textContent = 0;
        }
        totalBets = 0; // Đặt lại tổng điểm cược về 0
    }

    function resetGame() {
        isSpinning = false;
        document.getElementById('quay').disabled = false;
        document.getElementById('datlai').disabled = false;
    }

    document.getElementById('datlai').addEventListener('click', function () {
        if (!isSpinning) {
            resetBets();
            resetGame();
        }
    });

    document.getElementById('quay').addEventListener('click', function () {
        if (isSpinning) return;
        isSpinning = true;
        document.getElementById('quay').disabled = true;
        document.getElementById('datlai').disabled = true;

        let intervals = [];
        slots.forEach((slot, index) => {
            let count = 0;
            intervals[index] = setInterval(function () {
                // Chọn hình ảnh ngẫu nhiên từ mảng images
                slot.src = images[Math.floor(Math.random() * images.length)];
                count++;
                if (count >= 20) {  // Giảm số vòng lặp để thời gian quay ngắn hơn
                    clearInterval(intervals[index]);
                    if (index === slots.length - 1) {
                        resetGame();
                    }
                }
            }, 100);
        });
    });

    document.querySelectorAll('.bet').forEach(bet => {
        bet.addEventListener('click', function () {
            if (isSpinning) return;  // Ngăn đặt cược khi đang quay

            const id = this.id;
            if (totalBets < 3) {  // Tổng số điểm cược không vượt quá 3
                bets[id]++;
                totalBets++;
                document.getElementById(`counter-${id}`).textContent = bets[id];
            }
        });
    });
});
