// 모달 관련 기능 초기화
export function initializeModal() {
    // 모달 열기 버튼 이벤트 리스너 등록
    document.querySelectorAll('.add-resource-btn').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });

    // 모달 닫기 버튼 이벤트 리스너 등록
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // 모달 외부 클릭 시 닫기
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // ESC 키 누를 때 모달 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

// 모달 열기 함수
function openModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
}

// 모달 닫기 함수
function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // 배경 스크롤 복원
}

// 모달 내용 초기화 함수
export function resetModal(modal) {
    const form = modal.querySelector('form');
    if (form) {
        form.reset();
    }
}

// 폼 생성 함수
function generateForm(resourceType) {
    const forms = {
        server: `
            <form class="resource-form">
                <div class="form-group">
                    <label for="serverName">서버 이름</label>
                    <input type="text" id="serverName" required>
                </div>
                <div class="form-group">
                    <label for="serverLocation">서버 위치</label>
                    <select id="serverLocation" required>
                        <option value="seoul">Seoul (KR)</option>
                        <option value="tokyo">Tokyo (JP)</option>
                        <option value="singapore">Singapore (SG)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="serverOS">운영체제</label>
                    <select id="serverOS" required>
                        <option value="ubuntu2204">Ubuntu 22.04 LTS</option>
                        <option value="ubuntu2004">Ubuntu 20.04 LTS</option>
                        <option value="centos7">CentOS 7</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel" onclick="closeModal()">취소</button>
                    <button type="submit" class="btn-submit">생성</button>
                </div>
            </form>
        `,
        domain: `
            <form class="resource-form">
                <div class="form-group">
                    <label for="domainName">도메인 이름</label>
                    <input type="text" id="domainName" placeholder="example.com" required>
                </div>
                <div class="form-group">
                    <label for="sslType">SSL 인증서</label>
                    <select id="sslType" required>
                        <option value="auto">자동 발급 (Let's Encrypt)</option>
                        <option value="custom">직접 등록</option>
                        <option value="none">사용 안함</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel" onclick="closeModal()">취소</button>
                    <button type="submit" class="btn-submit">추가</button>
                </div>
            </form>
        `,
        backup: `
            <form class="resource-form">
                <div class="form-group">
                    <label for="backupName">백업 이름</label>
                    <input type="text" id="backupName" required>
                </div>
                <div class="form-group">
                    <label for="backupType">백업 유형</label>
                    <select id="backupType" required>
                        <option value="full">전체 백업</option>
                        <option value="db">데이터베이스만</option>
                        <option value="files">파일만</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel" onclick="closeModal()">취소</button>
                    <button type="submit" class="btn-submit">생성</button>
                </div>
            </form>
        `,
        database: `
            <form class="resource-form">
                <div class="form-group">
                    <label for="dbName">데이터베이스 이름</label>
                    <input type="text" id="dbName" required pattern="[a-zA-Z0-9_]+" title="영문, 숫자, 언더스코어만 사용 가능합니다">
                </div>
                <div class="form-group">
                    <label for="dbCharset">문자셋</label>
                    <select id="dbCharset" required>
                        <option value="utf8mb4">UTF-8 (utf8mb4)</option>
                        <option value="utf8">UTF-8</option>
                        <option value="euckr">EUC-KR</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="dbUser">사용자 이름</label>
                    <input type="text" id="dbUser" required>
                </div>
                <div class="form-group">
                    <label for="dbPassword">비밀번호</label>
                    <input type="password" id="dbPassword" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel" onclick="closeModal()">취소</button>
                    <button type="submit" class="btn-submit">생성</button>
                </div>
            </form>
        `
    };

    return forms[resourceType] || '';
}

// 폼 제출 처리 함수
function handleFormSubmit(resourceType, form) {
    // 폼 데이터 수집
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 실제 구현에서는 서버로 데이터를 전송하고 응답을 처리
    console.log(`${resourceType} 생성 요청:`, data);
    
    // 성공 메시지 표시
    alert(`${resourceType} 생성이 요청되었습니다.`);
    
    // 모달 닫기
    closeModal();
} 