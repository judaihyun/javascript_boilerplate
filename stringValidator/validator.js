
function passwordValidator(args, opt) {
	const obj = opt || {
		min: 9, max: 16,
	}

	const msg = '숫자와 영문자 조합으로 9~16자리를 사용해야 합니다.';
	const specialChar = '(?=.*[!@#$%^*+=-])';
	const rules = new RegExp("^(?=.*[a-zA-Z])"+specialChar+"(?=.*[0-9]).{" + obj.min + "," + obj.max + "}$");
	if (!rules.test(args)) {
		// alert(msg);
		return false;
	}
	return true;
}

function telValidator(args) {
	const msg = '유효하지 않는 전화번호입니다.';
	if (/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(args)) {
		return true;
	}
	// alert(msg);
	return false;
}

function emailValidator(args) {
	const msg = '유효하지 않는 이메일입니다.';
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(args)) {
		return true;
	}

	// alert(msg);
	return false;
}