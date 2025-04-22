// 네트워크 다이어그램 초기화 및 관리를 위한 모듈

// 네트워크 구성 템플릿
const networkTemplates = {
    basic: {
        nodes: [
            { id: 1, label: 'Dev', shape: 'circularImage', image: 'images/icon_user.png', x: -200, y: 0 },
            { id: 2, label: 'Internet (-)', shape: 'image', image: 'images/icon_internet.png', x: 0, y: 0 },
            { id: 3, label: 'router (-)', shape: 'image', image: 'images/icon_router.png', x: 200, y: 0 },
            { id: 4, label: 'WEB Server / 192.168.223.2', shape: 'image', image: 'images/icon_was.png', x: 400, y: -100 },
            { id: 5, label: 'Network Firewall (-)', shape: 'image', image: 'images/icon_firewall.png', x: 400, y: 0 },
            { id: 6, label: 'DB Server / 192.168.x.30', shape: 'image', image: 'images/icon_db.png', x: 600, y: 0 }
        ],
        edges: [
            { from: 1, to: 2, color: { color: '#4CAF50' }, smooth: { type: 'curvedCW', roundness: 0.2 } },
            { from: 2, to: 3, color: { color: '#4CAF50' } },
            { from: 3, to: 4, color: { color: '#4CAF50' } },
            { from: 3, to: 5, color: { color: '#4CAF50' } },
            { from: 5, to: 6, color: { color: '#4CAF50' } }
        ]
    },
    loadBalanced: {
        nodes: [
            { id: 1, label: 'Dev', shape: 'circularImage', image: 'images/icon_user.png', x: -200, y: 0 },
            { id: 2, label: 'Internet (-)', shape: 'image', image: 'images/icon_internet.png', x: 0, y: 0 },
            { id: 3, label: 'Load Balancer', shape: 'image', image: 'images/icon_lb.png', x: 200, y: 0 },
            { id: 4, label: 'WEB Server 1', shape: 'image', image: 'images/icon_was.png', x: 400, y: -120 },
            { id: 5, label: 'WEB Server 2', shape: 'image', image: 'images/icon_was.png', x: 400, y: 80 },
            { id: 6, label: 'DB Cluster', shape: 'image', image: 'images/icon_db.png', x: 600, y: 0 }
        ],
        edges: [
            { from: 1, to: 2, color: { color: '#4CAF50' }, smooth: { type: 'curvedCW', roundness: 0.2 } },
            { from: 2, to: 3, color: { color: '#4CAF50' } },
            { from: 3, to: 4, color: { color: '#4CAF50' } },
            { from: 3, to: 5, color: { color: '#4CAF50' } },
            { from: 4, to: 6, color: { color: '#4CAF50' } },
            { from: 5, to: 6, color: { color: '#4CAF50' } }
        ]
    },
    microservices: {
        nodes: [
            { id: 1, label: 'Dev', shape: 'circularImage', image: 'images/icon_user.png', x: -200, y: 0 },
            { id: 2, label: 'API Gateway', shape: 'image', image: 'images/icon_gw.png', x: 0, y: 0 },
            { id: 3, label: 'Auth Service', shape: 'image', image: 'images/icon_service.png', x: 200, y: -100 },
            { id: 4, label: 'User Service', shape: 'image', image: 'images/icon_service.png', x: 200, y: 0 },
            { id: 5, label: 'Product Service', shape: 'image', image: 'images/icon_was.png', x: 200, y: 100 },
            { id: 6, label: 'Main DB', shape: 'image', image: 'images/icon_db.png', x: 400, y: 0 }
        ],
        edges: [
            { from: 1, to: 2, color: { color: '#4CAF50' } },
            { from: 2, to: 3, color: { color: '#4CAF50' } },
            { from: 2, to: 4, color: { color: '#4CAF50' } },
            { from: 2, to: 5, color: { color: '#4CAF50' } },
            { from: 3, to: 6, color: { color: '#4CAF50' } },
            { from: 4, to: 6, color: { color: '#4CAF50' } },
            { from: 5, to: 6, color: { color: '#4CAF50' } }
        ]
    }
};

// 네트워크 다이어그램 초기화
export function initializeNetworkDiagram() {
    const container = document.getElementById('networkDiagram');
    if (!container) return null;
    
    // 다이어그램 옵션 설정
    const options = {
        nodes: {
            size: 30,
            font: {
                size: 12,
                color: '#333333'
            },
            fixed: true
        },
        edges: {
            width: 2,
            color: '#4CAF50',
            smooth: {
                type: 'continuous'
            }
        },
        physics: {
            enabled: false
        },
        interaction: {
            dragNodes: false,
            dragView: false,
            zoomView: false,
            selectable: true,
            selectConnectedEdges: false,
            hover: true
        },
        manipulation: {
            enabled: false
        }
    };

    // 초기 데이터
    const data = {
        nodes: new vis.DataSet(networkTemplates.basic.nodes),
        edges: new vis.DataSet(networkTemplates.basic.edges)
    };

    // 네트워크 생성
    const network = new vis.Network(container, data, options);
    
    // 노드 선택 이벤트 핸들러
    network.on('select', function(params) {
        const nodeId = params.nodes[0];
        const resourceForm = document.getElementById('resourceForm');
        const resourceInputs = ['ram', 'storage'].map(id => document.getElementById(id));
        const selectedNodeLabel = document.getElementById('selectedNodeLabel');
        
        if (nodeId) {
            const node = data.nodes.get(nodeId);
            const label = node.label.toLowerCase();
            
            // 폼 표시
            resourceForm.style.display = 'block';
            selectedNodeLabel.textContent = node.label;
            
            // 서버 타입에 따른 입력 필드 활성화/비활성화
            if (label.includes('web') || label.includes('db')) {
                resourceInputs.forEach(input => {
                    input.disabled = false;
                    input.parentElement.classList.remove('disabled');
                });
                
                // DB 서버인 경우 스토리지 범위 조정
                if (label.includes('db')) {
                    const storage = document.getElementById('storage');
                    storage.min = '100';
                    storage.max = '1000';
                    storage.value = '500';
                    document.getElementById('storageValue').textContent = '500';
                } else {
                    const storage = document.getElementById('storage');
                    storage.min = '50';
                    storage.max = '500';
                    storage.value = '100';
                    document.getElementById('storageValue').textContent = '100';
                }
                
                // 리소스 값 업데이트
                updateResourceValues();
            } else {
                // 리소스 설정이 불가능한 노드 선택 시
                resourceInputs.forEach(input => {
                    input.disabled = true;
                    input.parentElement.classList.add('disabled');
                });
            }
        } else {
            // 노드 선택 해제 시 모든 입력 필드 비활성화
            resourceInputs.forEach(input => {
                input.disabled = true;
                input.parentElement.classList.add('disabled');
            });
            selectedNodeLabel.textContent = '노드를 선택하세요';
        }
    });
    
    return network;
}

// 네트워크 템플릿 변경
export function updateNetworkTemplate(network, templateName) {
    if (!network || !networkTemplates[templateName]) return;
    
    const template = networkTemplates[templateName];
    const data = network.body.data;
    
    // 노드와 엣지 업데이트
    data.nodes.clear();
    data.edges.clear();
    data.nodes.add(template.nodes);
    data.edges.add(template.edges);
}


// 새로운 서버 노드 추가
function addServerNode(nodes, edges, serverType) {
    const nodeId = nodes.length + 1;
    const lastNode = nodes.get().slice(-1)[0];
    const x = lastNode ? lastNode.x + 200 : 400;
    
    const serverTypeConfig = {
        web: {
            label: '웹 서버',
            image: 'images/icon_was.png'
        },
        db: {
            label: 'DB 서버',
            image: 'images/icon_db.png'
        },
        cache: {
            label: '캐시 서버',
            image: 'images/icon_cache.png'
        }
    };

    const config = serverTypeConfig[serverType] || serverTypeConfig.web;

    nodes.add({
        id: nodeId,
        label: config.label,
        shape: 'image',
        image: config.image,
        x: x,
        y: 0
    });

    edges.add({
        from: 3,  // 방화벽에서 연결
        to: nodeId,
        color: { color: '#4CAF50' }
    });

    return nodeId;
}

// 서버 생성 폼 이벤트 리스너 설정
export function initializeServerForm(networkDiagram) {
    const form = document.getElementById('serverForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const serverType = document.getElementById('serverType').value;
        const serverName = document.getElementById('serverName').value;
        
        if (serverType && serverName) {
            networkDiagram.addServer(serverType);
            alert('서버가 생성되었습니다.');
        }
    });
}

function updateResourceValues() {
    // const cpu = document.getElementById('cpu').value;
    const ram = document.getElementById('ram').value;
    const storage = document.getElementById('storage').value;
    
    // 리소스 값 표시 업데이트
    // document.getElementById('cpuValue').textContent = cpu;
    document.getElementById('ramValue').textContent = ram;
    document.getElementById('storageValue').textContent = storage;
} 