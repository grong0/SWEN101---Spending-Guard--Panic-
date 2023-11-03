import "../styles/Login.css";

function Login() {
    return (
        <div id="login-wrapper">
			<div id="login-container">
				<div id="logo-wrapper">
                    <div id="logo-container">
                        <img id="logo-image" src="../assets/panic_logo.png" />
                        <h1 id="logo-title">Spending Guard</h1>
                    </div>
				</div>
				<div id="input-container">
					<input class="login-field" placeholder="Username" />
					<input class="login-field" placeholder="Password" type="password" />
					<button id="input-submit" type="submit"><p>Login</p></button>
				</div>
			</div>
		    {/* <div id="login-quote-container">
				<p id="login-quote">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aperiam in sint
					suscipit recusandae corrupti excepturi, vel officia minus exercitationem! Cum nulla vitae
					alias pariatur id veritatis fuga quo et.
                    <span id="login-author">- Burger Van. Hamber</span>
				</p>
			</div> */}
		</div>
    )
}

export default Login;