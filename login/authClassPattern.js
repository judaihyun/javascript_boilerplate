
(function () {
	function Controller() {
		this.errors = [];
	}

	Controller.prototype.showDialog = function (title, msg) {
		// TODO disply to title, msg
		console.log(`${title} , ${msg}`);
	};

	Controller.prototype.success = function (msg) {
		this.showDialog('success', msg);
	};

	Controller.prototype.failure = function (err) {
		this.errors.push(err);
		this.showDialog('Error', err);
	};


	function LoginController() {
		Controller.call(this);
	}

	LoginController.prototype = Object.create(Controller.prototype);

	LoginController.prototype.getUser = function () {
		return document.getElementById('id').value;
	};

	LoginController.prototype.getPassword = function () {
		return document.getElementById('pwd').value;
	};

	LoginController.prototype.validateEntry = function (user, pw) {
		user = user || this.getUser();
		pw = pw || this.getPassword();

		if (!(user && pw)) {
			this.failure('ID와 비밀번호를 입력하여 주십시오!.');
		} else if (user.length < 5) {
			this.failure('비밀번호는 5자 이상이어야 합니다.');
		} 
		return true;
	};

	LoginController.prototype.failure = function (err) {
		// call 'super'
		Controller.prototype.failure.call(this, `로그인 실패: ${err}`);
	};


	function AuthController(login) {
		Controller.call(this);
		this.login = login;
	}

	AuthController.prototype = Object.create(Controller.prototype);
	AuthController.prototype.server = function (url, data) {
		return $.ajax({
			url,
			data,
		});
	};

	AuthController.prototype.checkAuth = function () {
		const user = this.login.getUser();
		const pw = this.login.getPassword();

		if (this.login.validateEntry(user, pw)) {
			this.server('/check-auth', {
				user,
				pw,
			})
				.then(this.success.bind(this))
				.fail(this.failure.bind(this));
		}
	};

	AuthController.prototype.success = function () {
		Controller.prototype.success.call(this, '인증 성공!');
	};

	AuthController.prototype.failure = function (err) {
		Controller.prototype.failure.call(this, `인증 실패: ${err}`);
	};

	window.AuthController = AuthController;
	window.LoginController = LoginController;
})();

document.addEventListener('DOMContentLoaded', () => {
	const auth = new AuthController(new LoginController());
	auth.checkAuth();
});
