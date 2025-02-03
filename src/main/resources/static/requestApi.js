export default function requestApi(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                let node = document.createElement("p");
                let successText = document.createTextNode(xhr.responseText);
                node.appendChild(successText);
                document.getElementById('webpackIsOk').appendChild(node);
            } else {
                console.error(xhr.responseText);
            }
        }
    }
    xhr.open('GET', '/api');
    xhr.send(); // 요청 전송
}