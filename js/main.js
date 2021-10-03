const LOGIN = "func"
const PASSWORD = "111"

document.querySelector("#formLogin > input.btn-Login").addEventListener(
    'click', login, false
);

function login(event) {
	event.preventDefault();
	let usuarioLogin = document.getElementById('loginUsuario').value;
	let senhaLogin = document.getElementById('loginSenha').value;


	if (usuarioLogin == LOGIN && senhaLogin == PASSWORD) {
		window.location.href = "home.html";
	}else{
		alert("Login ou senha incorretas");
	}
}