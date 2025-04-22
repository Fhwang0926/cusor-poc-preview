// 네트워크 다이어그램 초기화 및 관리를 위한 모듈
export function initializeNetworkDiagram() {
    const container = document.getElementById('networkDiagram');
    if (!container) return;

    // 노드 데이터 설정
    const nodes = new vis.DataSet([
        { id: 1, label: '인터넷', shape: 'image', image: 'images/internet-icon.png', x: -200, y: 0 },
        { id: 2, label: '라우터', shape: 'image', image: 'images/router-icon.png', x: 0, y: 0 },
        { id: 3, label: '방화벽', shape: 'image', image: 'images/firewall-icon.png', x: 200, y: 0 }
    ]);

    // 엣지 데이터 설정
    const edges = new vis.DataSet([
        { from: 1, to: 2, color: { color: '#4CAF50' } },
        { from: 2, to: 3, color: { color: '#4CAF50' } }
    ]);

    // 네트워크 옵션 설정
    const options = {
        nodes: {
            size: 30,
            font: {
                size: 14,
                face: 'arial'
            }
        },
        edges: {
            width: 2,
            smooth: {
                type: 'continuous'
            }
        },
        physics: {
            enabled: true,
            barnesHut: {
                gravitationalConstant: -2000,
                centralGravity: 0.3,
                springLength: 200
            }
        },
        interaction: {
            dragNodes: true,
            dragView: true,
            zoomView: true
        }
    };

    // 네트워크 인스턴스 생성
    const network = new vis.Network(container, { nodes, edges }, options);

    // 컨트롤 버튼 이벤트 리스너 설정
    setupControlButtons(network);

    return {
        network,
        nodes,
        edges,
        addServer: (serverType) => addServerNode(nodes, edges, serverType)
    };
}

// 컨트롤 버튼 이벤트 리스너 설정
function setupControlButtons(network) {
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const resetView = document.getElementById('resetView');

    if (zoomIn) {
        zoomIn.addEventListener('click', () => {
            network.moveTo({
                scale: network.getScale() * 1.2
            });
        });
    }

    if (zoomOut) {
        zoomOut.addEventListener('click', () => {
            network.moveTo({
                scale: network.getScale() * 0.8
            });
        });
    }

    if (resetView) {
        resetView.addEventListener('click', () => {
            network.fit();
        });
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