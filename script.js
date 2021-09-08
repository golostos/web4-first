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

form.onsubmit = function(event) {
    event.preventDefault()
    let username = form.username.value;
    let message = form.message.value;
    if (username && message) {
        let messageElem = document.createElement('li')
        messageElem.textContent = username + ': ' + message
        chat.append(messageElem)
        form.username.value = ''
        form.message.value = ''
    }
}