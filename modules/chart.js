// 차트 초기화 및 데이터 관리
let performanceChart;
const timeRangeData = {
    '1h': {
        labels: Array.from({length: 60}, (_, i) => `${59-i}분 전`),
        traffic: generateRandomData(60, 100, 500),
        cpu: generateRandomData(60, 20, 80),
        memory: generateRandomData(60, 30, 90)
    },
    '6h': {
        labels: Array.from({length: 72}, (_, i) => `${71-i}*5분 전`),
        traffic: generateRandomData(72, 100, 500),
        cpu: generateRandomData(72, 20, 80),
        memory: generateRandomData(72, 30, 90)
    },
    '24h': {
        labels: Array.from({length: 48}, (_, i) => `${47-i}*30분 전`),
        traffic: generateRandomData(48, 100, 500),
        cpu: generateRandomData(72, 20, 80),
        memory: generateRandomData(72, 30, 90)
    }
};

// 랜덤 데이터 생성 함수
function generateRandomData(length, min, max) {
    return Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// 차트 초기화 함수
export function initializeChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeRangeData['1h'].labels,
            datasets: [{
                label: '트래픽 (RPS)',
                data: timeRangeData['1h'].traffic,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: '실시간 성능 모니터링'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'RPS'
                    }
                }
            }
        }
    });

    // 시간 범위 버튼 이벤트 리스너
    const timeButtons = document.querySelectorAll('.time-button');
    timeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 활성 버튼 스타일 변경
            timeButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // 차트 데이터 업데이트
            const timeRange = e.target.dataset.range;
            const metricType = document.getElementById('metricSelect').value;
            updateChartData(timeRange, metricType);
        });
    });

    // 지표 선택 이벤트 리스너
    const metricSelect = document.getElementById('metricSelect');
    metricSelect.addEventListener('change', (e) => {
        const activeTimeRange = document.querySelector('.time-button.active').dataset.range;
        updateChartData(activeTimeRange, e.target.value);
    });
}

// 차트 데이터 업데이트 함수
function updateChartData(timeRange, metricType = 'traffic') {
    const data = timeRangeData[timeRange];
    const metricLabels = {
        'traffic': '트래픽 (RPS)',
        'cpu': 'CPU 사용률 (%)',
        'memory': '메모리 사용률 (%)'
    };

    performanceChart.data.labels = data.labels;
    performanceChart.data.datasets[0].label = metricLabels[metricType];
    performanceChart.data.datasets[0].data = data[metricType];
    
    // Y축 제목 업데이트
    performanceChart.options.scales.y.title.text = metricType === 'traffic' ? 'RPS' : '%';
    
    performanceChart.update();
}

// 현재 통계 업데이트 함수
function updateCurrentStats(value, metric) {
    switch(metric) {
        case 'traffic':
            document.getElementById('currentRps').textContent = value;
            break;
        case 'cpu':
            document.getElementById('currentCpu').textContent = value + '%';
            break;
        case 'memory':
            document.getElementById('currentMemory').textContent = value + '%';
            break;
    }
}

// 현재 시간 업데이트 함수
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    const timeElements = document.querySelectorAll('.current-time');
    timeElements.forEach(el => {
        el.textContent = timeString;
    });
} 