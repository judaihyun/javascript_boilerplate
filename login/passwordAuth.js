
(function () {

'use strict'

const min = 9;
const max = 16;

	const LoginController = {
		errors: [],
		getUser: function(id) {
			return document.getElementById(id).value;
		},
		getPassword: function(pwd) {
			return document.getElementById(pwd).value;
		},
		validateEntry: function (user, pw) {
			user = user;
			pw = pw;

			if (!(user && pw)) {
				return this.failure('ID와 비밀번호를 입력하여 주십시오!.');
			} 
			// TODO return this... id validator(id);
			return this.passwordValidator(pw);
		},
		showDialog: function(title, msg) {
			alert(`${title} , ${msg}`);
		},
		failure: function(err) {
			this.errors.push(err);
			this.showDialog('Error', err)
			return false;
		},
		passwordValidator: function(args) {
		
			const msg = '숫자와 영문자, 특수문자 조합으로 9~16자리를 사용해야 합니다.';
			const rules = new RegExp("^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{" + min + "," + max + "}$");
			if (!rules.test(args)) {
				return this.failure(msg);
			}
			return true;
		}

	};

	
	const AuthController = Object.create(LoginController);
	
	AuthController.errors = [];

	AuthController.checkAuth = function (_id, _pwd, callback) {
		const user = this.getUser(_id);
		const pw = this.getPassword(_pwd);

		if (this.validateEntry(user, pw)) {
			callback();
			//server();
		}
	};

	AuthController.server = function (url, data) {
		return $.ajax({
			url: url,
			data: data,
		});
		console.warn('sended : ' + url + ', ' + data);
	}

	AuthController.accepted = function () {
		this.showDialog('성공', '인증 성공!');
	}

	AuthController.rejected = function (err) {
		this.failure('인증 실패 : ' + err);
	}



	window.AuthController = AuthController;
})();


/*	

	const auth1 = Object.create( AuthController );
	const auth2 = Object.create( AuthController );
*/