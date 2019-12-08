

(function(){

function Controller() {
	this.errors = [];
}

Controller.prototype.showDialog = function(title, msg) {
	// TODO disply to title, msg
	console.log(`${title} , ${msg}`);
};

Controller.prototype.success = function(msg) {
	this.showDialog('success', msg);
};

Controller.prototype.failure = function(err) {
	this.errors.push(err);
	this.showDialog('Error', err);
};


function LoginController() {
	Controller.call(this);
}

LoginController.prototype = Object.create(Controller.prototype);

LoginController.prototype.getUser = function() {
	return document.getElementById('login_username').value;
};

LoginController.prototype.getPassword = function() {
	return document.getElementById('login_password').value;
};

LoginController.prototype.validateEntry = function(user, pw) {
	user = user || this.getUser();
	pw = pw || this.getPassword();

	if(!(user && pw)) {
		return this.failure('ID와 비밀번호를 입력하여 주십시오!.');
	}else (user.length < 5) {
		return this.failure('비밀번호는 5자 이상이어야 합니다.');
	}

	return true;
}

LoginController.prototype.failure = function(err) {
	// call 'super'
	Controller.prototype.failure.call( this, '로그인 실패: ' + err);
}


function AuthController(login) {
	Controller.call(this);
	this.login = login;
}

AuthController.prototype = Object.create( Controller.prototype );
AuthController.prototype.server = function(url, data) {
	return $.ajax( {
		url: url,
		data: data,
	});
}

AuthController.prototype.checkAuth = function() {
	const user = this.login.getUser();
	const pw = this.login.getPassword();

	if(this.login.validateEntry( user, pw )) {
		this.server('/check-auth',{
			user: user,
			pw: pw,
		})
		.then( this.success.bind(this))
		.fail( this.failure.bind(this));
	}
}

AuthController.prototype.success = function() {
	Controller.prototype.success.call( this, '인증 성공!');
}

AuthController.prototype.failure = function(err) {
	Controller.prototype.failure.call( this, '인증 실패: ' + err);
}

const auth = new AuthController();
auth.checkAuth(new LoginController());


if(!window.auth)
	window.auth = auth;

})();
