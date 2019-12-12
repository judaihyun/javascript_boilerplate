function passwordValidator(args, opt) {
	const obj = opt || {
		min: 9, max: 16, conseq: 5, special: true,
		msg: '숫자와 영문자,특수문자 조합으로 9~16자리를 사용해야 합니다.',
	};
	

	const specialChar = opt.special ? '(?=.*[!@#$%^*+=-])' : '';
	const rules = new RegExp("^(?=.*[a-zA-Z])"+specialChar+"(?=.*[0-9]).{" + obj.min + "," + obj.max + "}$");
	if (!rules.test(args)) {
		console.warn(obj.msg);
		return false;
	}

	let ret = checkSequential(args, obj);
	if(typeof ret === 'string') {
		console.warn(ret);
		return false;
	}

	if(!checkQwerty(args, obj)) {
		console.warn(obj.msgQwerty || obj.msg);
		return false;
	}
	console.warn(true);
	return true;
}

function checkSequential(s, obj) {
	let count = 1;
	// Check for sequential numerical characters
	for (let i in s)
		if (+s[+i + 1] == +s[i] + 1 &&
			+s[+i + 2] == +s[i] + 2)
		{
			count += 1;
			if(count > 3)
				return obj.msgNumber;
		}
	// Check for sequential alphabetical characters
	for (let i in s)
		if (String.fromCharCode(s.charCodeAt(i) + 1) == s[+i + 1] &&
			String.fromCharCode(s.charCodeAt(i) + 2) == s[+i + 2]) return false;
	// check for consecutive numbers
	count = 0;
	for (let i = 0; i < s.length; i += 1) {
		if (s[i] === s[i + 1]) {
			//console.log(count);
			count += 1;
		} else count = 1;
		if (count > obj.conseq - 1) return obj.msgChar || obj.msg;
	}

	return true;
}

function checkQwerty(str, obj) {
	if(!obj.qwerty) return true;
	var qwerty = "qwertyuiopasdfghjklzxcvbnm";
	str = str.toLowerCase();
	var result = '';
	for (var qi = 0, pi = 0; pi < str.length && qi < qwerty.length; qi++) {
		if (str.charAt(pi) === qwerty.charAt(qi)) {
			result += str.charAt(pi);
			pi++;
		}
	}
	if (pi > obj.conseq){
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