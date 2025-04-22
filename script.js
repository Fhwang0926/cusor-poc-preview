// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 현재 시간 업데이트
    updateCurrentTime();
    
    // 결제 상세 버튼 이벤트
    const billingDetailsBtn = document.querySelector('.billing-details');
    if (billingDetailsBtn) {
        billingDetailsBtn.addEventListener('click', () => {
            alert('결제 상세 내역 페이지로 이동합니다.');
        });
    }

    // 메뉴 활성화
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 예시 차트 데이터 (실제로는 서버에서 받아올 데이터)
    const chartData = {
        labels: ['10:00', '10:15', '10:30', '10:45', '11:00'],
        values: [65, 59, 80, 81, 56]
    };

    // 차트 플레이스홀더 업데이트
    updateChartPlaceholder(chartData);
});

// 현재 시간 업데이트 함수
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // 시간 표시 요소가 있다면 업데이트
    const timeElements = document.querySelectorAll('.current-time');
    timeElements.forEach(el => {
        el.textContent = timeString;
    });
}

// 차트 플레이스홀더 업데이트 함수
function updateChartPlaceholder(data) {
    const placeholder = document.querySelector('.chart-placeholder');
    if (placeholder) {
        // 실제 프로젝트에서는 Chart.js 등의 라이브러리를 사용하여 
        // 실제 차트를 그리는 것이 좋습니다.
        placeholder.textContent = `[트래픽/성능 그래프 데이터]\n` +
            `최근 데이터: ${data.values[data.values.length - 1]}%`;
    }
}

// 보안 이벤트 추가 함수
function addSecurityEvent(time, type, ip, blocked) {
    const table = document.querySelector('.security-table tbody');
    if (table) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${time}</td>
            <td>${type}</td>
            <td>${ip}</td>
            <td>${blocked}</td>
        `;
        table.insertBefore(row, table.firstChild);
    }
}

// 알림/이벤트 추가 함수
function addNotification(message) {
    const list = document.querySelector('.event-list');
    if (list) {
        const item = document.createElement('li');
        const now = new Date();
        const time = now.toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        item.textContent = `${time} - ${message}`;
        list.insertBefore(item, list.firstChild);
    }
}

// 요금제 선택 처리
document.querySelectorAll('.select-plan').forEach(button => {
    button.addEventListener('click', () => {
        const plan = button.getAttribute('data-plan');
        // 실제 구현에서는 서버로 요청을 보내거나 결제 페이지로 이동
        alert(`${plan} 요금제를 선택하셨습니다. 결제 페이지로 이동합니다.`);
        window.location.href = 'billing.html';
    });
});

// 연간/월간 요금제 토글
const billingToggle = document.getElementById('billingToggle');
if (billingToggle) {
    billingToggle.addEventListener('change', () => {
        const isAnnual = billingToggle.checked;
        const amounts = document.querySelectorAll('.amount');
        const currencies = document.querySelectorAll('.currency');
        
        amounts.forEach(amount => {
            const monthlyPrice = parseInt(amount.textContent.replace(/,/g, ''));
            if (isAnnual) {
                // 연간 결제 시 20% 할인
                const annualPrice = Math.floor((monthlyPrice * 12 * 0.8) / 12);
                amount.textContent = annualPrice.toLocaleString();
            } else {
                // 월간 결제로 복원
                const originalPrice = monthlyPrice * 1.25; // 할인 제거
                amount.textContent = originalPrice.toLocaleString();
            }
        });

        currencies.forEach(currency => {
            currency.textContent = isAnnual ? '원/월 (연간 결제)' : '원/월';
        });
    });
} 