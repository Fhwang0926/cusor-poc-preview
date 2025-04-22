// 요금제 관련 기능 초기화
export function handleBilling() {
    // 요금제 선택 처리
    document.querySelectorAll('.select-plan').forEach(button => {
        button.addEventListener('click', () => {
            const plan = button.getAttribute('data-plan');
            alert(`${plan} 요금제를 선택하셨습니다. 결제 페이지로 이동합니다.`);
            window.location.href = 'billing.html';
        });
    });

    // 연간/월간 요금제 토글
    const billingToggle = document.getElementById('billingToggle');
    const amounts = document.querySelectorAll('.amount');
    const originalAmounts = Array.from(amounts).map(amount => amount.textContent);

    if (billingToggle) {
        billingToggle.addEventListener('change', () => {
            amounts.forEach((amount, index) => {
                if (amount.textContent !== '문의' && amount.textContent !== '인프라 1회 구매') {
                    const price = parseInt(originalAmounts[index].replace(/[^0-9]/g, ''));
                    if (billingToggle.checked) {
                        // 연간 요금제 (20% 할인)
                        const annualPrice = Math.floor(price * 0.8);
                        amount.textContent = `₩${annualPrice.toLocaleString()}`;
                    } else {
                        // 월간 요금제
                        amount.textContent = originalAmounts[index];
                    }
                }
            });
        });
    }
}

// 빌링 초기화 함수
export function initializeBilling() {
    handleBilling();
    updateDailyStats();
    updateMonthlyStats();
    setInterval(updateDailyStats, 60000); // 1분마다 업데이트
    setInterval(updateMonthlyStats, 3600000); // 1시간마다 업데이트
}

// 일일 통계 업데이트 함수
function updateDailyStats() {
    const dailyTraffic = document.getElementById('dailyTraffic');
    const dailyRequests = document.getElementById('dailyRequests');
    const dailyStorage = document.getElementById('dailyStorage');

    if (dailyTraffic) dailyTraffic.textContent = formatBytes(Math.random() * 100);
    if (dailyRequests) dailyRequests.textContent = Math.floor(Math.random() * 10000).toLocaleString();
    if (dailyStorage) dailyStorage.textContent = formatBytes(Math.random() * 50);
}

// 월별 통계 업데이트 함수
function updateMonthlyStats() {
    const monthlyTraffic = document.getElementById('monthlyTraffic');
    const monthlyRequests = document.getElementById('monthlyRequests');
    const monthlyStorage = document.getElementById('monthlyStorage');

    if (monthlyTraffic) monthlyTraffic.textContent = formatBytes(Math.random() * 1000);
    if (monthlyRequests) monthlyRequests.textContent = Math.floor(Math.random() * 100000).toLocaleString();
    if (monthlyStorage) monthlyStorage.textContent = formatBytes(Math.random() * 500);
}

// 바이트 단위 포맷팅 함수
function formatBytes(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
} 