import {
    Notification
} from "element-ui";
const Websocket_URL = 'ws://127.0.0.1:9527'
export function orderSocket(Admindata) {
    const socket = new WebSocket(Websocket_URL)
    // 向服务器发送管理员数据
    socket.onopen = () => {
        console.log('WebSocket connected');
        socket.send(JSON.stringify(Admindata))
    }

    // 接收服务器响应
    socket.onmessage = (event) => {
        console.log("WebSocket onmessage")
        const response = JSON.parse(event.data);
        console.log('Server Response:', response);
        // 根据服务器响应进行相应处理
        if (response.status) {
            Notification.success({
                title: "新订单达到",
                message: response.message
            })
        }
        // 关闭socket
        socket.close()
    }
    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
    socket.onclose = () => {
        console.log('WebSocket closed');
    };
}