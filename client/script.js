let form = document.getElementById('chat-form')
let chat = document.getElementById('chat')
let head = `
<nav>
    <ul>
        <li><a class="link" href="">tag 1</a></li>
        <li><a class="link" href="">tag 2</a></li>
        <li><a class="link" href="">tag 3</a></li>
        <li><a class="link" href="">tag 4</a></li>
    </ul>
</nav>
`

document.body.insertAdjacentHTML('afterbegin', head)

form.onsubmit = function (event) {
    event.preventDefault()
    let username = form.username.value;
    let message = form.message.value;
    if (username && message) {
        fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: username, message })
        })
        let messageElem = document.createElement('li')
        messageElem.textContent = username + ': ' + message
        chat.append(messageElem)
        form.username.value = ''
        form.message.value = ''
    }
}

fetch('http://localhost:3000/api/chat').then((response) => {
    if (response.ok) {
        return response.json()
    }
}).then(messages => {
    // console.log(messages);
    const messagesText = messages.reduce((acc, cur) => {
        return acc + `<li>${cur.name}: ${cur.message}</li>`
    }, '')
    chat.innerHTML = messagesText
})