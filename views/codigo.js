document.getElementById('show-register').addEventListener('click', () => {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
});
document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('Registration successful!');
            document.getElementById('register-container').style.display = 'none';
            document.getElementById('login-container').style.display = 'block';
        } else {
            document.getElementById('register-error').style.display = 'block';
        }
    } catch (error) {
        console.error('Error registering:', error);
        document.getElementById('register-error').style.display = 'block';
    }
});

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('data-container').style.display = 'flex';
            document.querySelector('.linkalienmes').style.display = 'block';
            // document.getElementById('linkalienmes').style.display = 'block';
            fetchAliens();
        } else {
            document.getElementById('login-error').style.display = 'block';
        }
    } catch (error) {
        console.error('Error logging in:', error);
        document.getElementById('login-error').style.display = 'block';
    }
});

async function fetchAliens() {
    try {
        const response = await fetch('/aliens');
        const data = await response.json();
        const container = document.getElementById('data-container');
        container.innerHTML = '';
        data.forEach(alien => {
            const alienDiv = document.createElement('div');
            alienDiv.className = 'alien';
            alienDiv.innerHTML = `
                <img src="${alien.foto_url}" onerror="this.onerror=null;this.src='default-image.png';">
                <h2>${alien.nombre}</h2>
                <p>ID: ${alien.id_alien}</p>
            `;
            container.append(alienDiv);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}