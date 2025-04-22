// 차트 객체를 모듈 스코프로 제한
let performanceChart;

// 차트 초기화
export function initializeChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    const performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '트래픽',
                data: [],
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // 초기 데이터 업데이트
    updateChartData('traffic', '1h');
}

// 차트 데이터 업데이트 함수
function updateChartData(metric, timeRange = '1h') {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    // 시간 범위에 따른 데이터 포인트 수 설정
    const pointsCount = timeRange === '1h' ? 60 : timeRange === '6h' ? 72 : 96;
    
    // 현재 시간부터 역순으로 라벨 생성
    const labels = [];
    const now = new Date();
    for (let i = pointsCount - 1; i >= 0; i--) {
        const time = new Date(now - i * (timeRange === '1h' ? 60000 : timeRange === '6h' ? 300000 : 900000));
        labels.unshift(time.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }));
    }

    // 메트릭에 따른 데이터 생성
    const data = [];
    let color, label;
    switch(metric) {
        case 'traffic':
            color = '#007bff';
            label = '트래픽 (RPS)';
            for (let i = 0; i < pointsCount; i++) {
                data.push(Math.floor(Math.random() * 300 + 100));
            }
            break;
        case 'cpu':
            color = '#28a745';
            label = 'CPU 사용률 (%)';
            for (let i = 0; i < pointsCount; i++) {
                data.push(Math.floor(Math.random() * 50 + 30));
            }
            break;
        case 'memory':
            color = '#dc3545';
            label = '메모리 사용률 (%)';
            for (let i = 0; i < pointsCount; i++) {
                data.push(Math.floor(Math.random() * 40 + 40));
            }
            break;
    }

    // 차트 업데이트
    const chart = Chart.getChart(ctx);
    if (chart) {
        chart.data.labels = labels;
        chart.data.datasets[0].label = label;
        chart.data.datasets[0].data = data;
        chart.data.datasets[0].borderColor = color;
        chart.data.datasets[0].backgroundColor = `${color}1a`;
        chart.update();
    }

    // 현재 값 업데이트
    updateCurrentStats(data[data.length - 1], metric);
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