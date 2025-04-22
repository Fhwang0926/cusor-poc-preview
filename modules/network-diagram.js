// 네트워크 다이어그램 초기화 및 관리를 위한 모듈

// 기본 노드 데이터
const defaultNodes = [
    { id: 1, label: 'Dev', shape: 'circularImage', image: 'images/user-icon.png', x: -200, y: 0 },
    { id: 2, label: 'Internet (-)', shape: 'image', image: 'images/internet-icon.png', x: 0, y: 0 },
    { id: 3, label: 'router (-)', shape: 'image', image: 'images/router-icon.png', x: 200, y: 0 },
    { id: 4, label: 'WEB Server / 192.168.223.2', shape: 'image', image: 'images/webserver-icon.png', x: 400, y: -100 },
    { id: 5, label: 'Network Firewall (-)', shape: 'image', image: 'images/firewall-icon.png', x: 400, y: 0 },
    { id: 6, label: 'DB Server / 192.168.x.30', shape: 'image', image: 'images/database-icon.png', x: 600, y: 0 }
];

// 기본 엣지 데이터
const defaultEdges = [
    { from: 1, to: 2, color: { color: '#4CAF50' }, smooth: { type: 'curvedCW', roundness: 0.2 } },
    { from: 2, to: 3, color: { color: '#4CAF50' } },
    { from: 3, to: 4, color: { color: '#4CAF50' } },
    { from: 3, to: 5, color: { color: '#4CAF50' } },
    { from: 5, to: 6, color: { color: '#4CAF50' } }
];

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
            selectable: false,
            hover: false
        },
        manipulation: {
            enabled: false
        }
    };

    // 초기 데이터
    const data = {
        nodes: new vis.DataSet(defaultNodes),
        edges: new vis.DataSet(defaultEdges)
    };

    // 네트워크 생성
    const network = new vis.Network(container, data, options);
    
    return network;
}

// 서버 타입에 따라 다이어그램 업데이트
export function updateNetworkDiagram(network, serverType) {
    if (!network) return;
    
    const data = network.body.data;
    const nodes = data.nodes;
    const edges = data.edges;
    
    // 기존 노드와 엣지 유지
    // 서버 타입에 따른 아이콘만 업데이트
    if (serverType) {
        const webServer = nodes.get(4);
        webServer.image = `images/${serverType}-icon.png`;
        webServer.label = `${serverType.toUpperCase()} Server / 192.168.223.2`;
        nodes.update(webServer);
    }
}

// 새로운 서버 노드 추가
function addServerNode(nodes, edges, serverType) {
    const nodeId = nodes.length + 1;
    const lastNode = nodes.get().slice(-1)[0];
    const x = lastNode ? lastNode.x + 200 : 400;
    
    const serverTypeConfig = {
        web: {
            label: '웹 서버',
            image: 'images/webserver-icon.png'
        },
        db: {
            label: 'DB 서버',
            image: 'images/database-icon.png'
        },
        cache: {
            label: '캐시 서버',
            image: 'images/cache-icon.png'
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