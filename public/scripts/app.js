const socket = io();

// Socket sending
const socket_form = document.querySelector("#socket_form")
const socket_channel = document.querySelector("#socket_channel")
const socket_result = document.querySelector("#socket_result")
const socket_progress = document.querySelector("#socket_progress")

socket_form.addEventListener("submit", (e) => {
    e.preventDefault()
    const unparsedJson = editor.getSession().getValue();
    const channel = socket_channel.value;
    let parsed = {};
    try {
        parsed = JSON.parse(unparsedJson)
    } catch (err) {
        alert(err)
        return
    }

    console.log(`Sending message to channel ${channel} with data`, parsed,)
    socket_result.innerHTML = "Result: pending"
    socket_progress.style.display = "block"

    socket.emit(channel, parsed, (data) => {
        console.log("Received ack for data: ", data)
        socket_result.innerHTML = "Result: " + data
        socket_progress.style.display = "none"

    })
})



// Status
const statusMap = { "offline": "danger", "slow": "warning", "online": "success", "unknown": "light" }

// const api = document.querySelector("#status_api")
// const db = document.querySelector("#status_db")

const loggedin = document.querySelector("#status_loggedin")
const socket_status = document.querySelector("#status_socket")

const setStatus = (object, label, newClass) => {
    object.innerHTML = label
    object.className = `tag is-${newClass}`
}

socket.on("disconnect", () => {
    setStatus(socket_status, "Offline", statusMap.offline)
})

socket.on("connect", () => {
    setStatus(socket_status, "Online", statusMap.online)
    setStatus(loggedin, "False", statusMap.offline)
})


socket.on('pong', (latency) => {
    setStatus(socket_status, `Online (${latency} ms)`, statusMap.online)
});

const id = "test";


async function init() {
    try {
        console.log("Initing socket")
        const result = await fetch("/api/registry/devices/" + id)
        let device = await result.json();
        if (result.status == 404) {
            device = await create();
        }
        socket.emit("init", { id: "test" }, (ack) => {
            if (ack) {
                console.log("Logged into the sockets")
                setStatus(loggedin, "True", statusMap.online)
            } else {
                setStatus(loggedin, "False", statusMap.offline)
            }
        })
    } catch (err) {
        console.error(err)
    }
}

async function create() {
    const result = await fetch("/api/registry/devices", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            label: "testing",
            gateway: "192.168.178.43",
            type: { type: "sensor", unit: "C" }
        })
    })

    console.log(result)
    if (!result.ok) throw new Error("Shit went wrong")
    return await result.json()
}
// socket.emit("data", "text")
init()
// socket.emit("data", "text")
