
(function () {

	const LoginController = {
		errors: [],
		getUser: () => {
			return document.getElementById('login').value;
		},
		getPassword: () => {
			return document.getElementById('pwd').value;
		},
		validateEntry: (user, pw) => {
			user = user || this.getUser();
			pw = pw || this.getPassword();

			if (!(user && pw)) {
				return this.failure('ID와 비밀번호를 입력하여 주십시오!.');
			} else (user.length < 5) {
				return this.failure('비밀번호는 5자 이상이어야 합니다.');
			}

			return true;
		},
		showDialog: (title, msg) => {
			console.log(`${title} , ${msg}`);
		},
		failure: (err) => {
			this.errors.push(err);
			this.showDialog('Error', err)
		}
	};


	const AuthController = Object.create(LoginController);

	AuthController.errors = [];
	AuthController.checkAuth = function () {
		const user = this.login.getUser();
		const pw = this.login.getPassword();

		if (this.login.validateEntry(user, pw)) {
			this.server('/check-auth', {
				user: user,
				pw: pw,
			})
				.then(this.accepted.bind(this))
				.fail(this.rejected.bind(this));
		}
	};

	AuthController.server = function (url, data) {
		return $.ajax({
			url: url,
			data: data,
		});
	}

	AuthController.accepted = function () {
		this.showDialog('성공', '인증 성공!');
	}

	AuthController.rejected = function (err) {
		this.failure('인증 실패 : ' + err);
	}

	AuthController.checkAuth();

	const auth = Object.create( AuthController );

	if(!window.auth)
		window.auth = auth;

})();