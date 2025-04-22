// 네비게이션 초기화
export function initializeNavigation() {
    // 메뉴 활성화 (상단 네비게이션)
    const mainNavLinks = document.querySelector('header nav');
    if (mainNavLinks) {
        mainNavLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                mainNavLinks.querySelectorAll('a').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // 스무스 스크롤 구현
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
} 