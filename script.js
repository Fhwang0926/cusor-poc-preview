// 모듈 import
import { initializeNavigation } from './modules/navigation.js';
import { initializeChart } from './modules/chart.js';
import { initializeBilling } from './modules/billing.js';
import { initializeModal } from './modules/modal.js';

// 페이지 로드 시 모든 모듈 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 현재 페이지 URL에서 파일명 추출
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // 모든 페이지에서 공통으로 사용되는 모듈 초기화
    initializeNavigation();

    // 페이지별 모듈 초기화
    switch (currentPage) {
        case 'dashboard.html':
            initializeChart();
            initializeModal();
            break;
        case 'billing.html':
            initializeBilling();
            break;
        case 'index.html':
            // 랜딩 페이지에서는 handleBilling만 필요
            import('./modules/billing.js').then(module => {
                module.handleBilling();
            });
            break;
    }
}); 