describe('stringValidator', () => {
	describe('password validator', () => {
		const testCase = {
			'': false, // empty
			'qwertyuiopasdfgh': false, // 16자리
			'qwertyuiopa@fgfh': false, // 16자리 with 특수문자
			'qwertyu3opa@fgfh': true, // 16자리 with 특수문자 + 숫자
			'qwertyuiopasdfgh2': false, // 17자리
			'qwertyuiopasdfgh@': false, // 17자리 with 특수문자
			'qwertyuiopasd3gh@': false, // 17자리 with 특수문자
			'sdfkj3ff%': true, // 9자리 with 특수문자, num
			'sdfkjfff%': false, // 9자리 with 특수
			'sdfkjfff8': false, // 9자리 with num
			'sdfkjffff': false, // 9자리
			'sdfkj3f': false, // 7자리
			'sjf34^f': false, //7 자리 with 특수문자
			'askdjf#sffff': false, // 동일 문자
			'askdj1234f#s': true, // 연속된 숫자 
			'tsd444l#pdf': true, // 동일 숫자 
			'tsd5555l#pdf': true, // 동일 숫자 
		};


		it('9자리이상 16자리이하, 특수문자, 숫자 포함이 아닐때와 4자리 연속숫자, 동일 숫자/문자 포함시 false를 반환', () => {
			let options = {
				min:9,
				max:16,
				conseq:5,
				special: true,
				msg: 'test message',
			}
			for (const prop in testCase) {
				//console.log(`${prop} : ${testCase[prop]} => ` + passwordValidator(prop, options));
				expect(passwordValidator(prop, options)).toEqual(testCase[prop]);
			}
		});

		const testCase2 = {
			'qwerty2D%ds': false,
			'asdqwertyD2%': true,
			'asdqwertD2%': true,
			'qwertyuiopasdfgh': false, // 16자리
			'qwertyuiopa@fgfh': false, // 16자리 with 특수문자
			'qwertyu3opa@fgfh': false, // 16자리 with 특수문자 + 숫자(qwerty)
			'qsrtyu3opa@fg22h': true, // 16자리 with 특수문자 + 숫자
			'asdfhpja@fg22ss': true, // 16자리 with 특수문자 + 숫자(asdf)
			'asdkghopa@fg22ss': true, // 16자리 with 특수문자 + 숫자
			'sdfghjkl@fg22h': false, // 16자리 with 특수문자 + 숫자
			'goflvhxj1@': true,
		};


		it('키보드 연속된 문자 qwerty,  asdfgh등으로 시작하면 실패', () => {
			const obj = {
				min: 9, max: 16, conseq: 5, qwerty: true, 
			};
			for (const prop in testCase2) {
				console.log(`${prop} : ${testCase2[prop]} => ` + passwordValidator(prop, obj));
				expect(passwordValidator(prop, obj)).toEqual(testCase2[prop]);
			}
		});

		
		const testCase3 = {
			'sdfkjffff': false, // 9자리
			'sdfkj3f': false, // 7자리
			'sjf34^f': false, //7 자리 with 특수문자
			'askdjf#sfffff': false, // 동일 문자
			'tsd5555l#pdf': true, // 동일 숫자 
			'tsd55555l#pdf': false, // 동일 숫자 
			'askdj12345f#s': false, // 연속된 숫자 
			'askdj1234f#s': true, // 연속된 숫자 
			'qwerty123f#s': false, // qwerty로 시작
			'12qwerty34f#s': true, // qwerty로 포함
		};

		it('실패 시 해당하는 Msg 출력 함수 수행 여부(성공시 true)', () => {
			const obj = {
				min: 9, max: 16, conseq: 5, qwerty: true, special: true, 
				msg: '숫자와 영문자,특수문자 조합으로 9~16자리를 사용해야 합니다.',
				msgChar: '비밀번호에 동일한 문자/숫자사용(5자리 이상이 불가합니다.)',
				msgNumber: '비밀번호에 연속된 숫자사용(5자리 이상이 불가합니다.)',
				msgQwerty: '비밀번호에 키보드 연속문자(qwert등) 사용이 불가합니다.)',
			};
			for (const prop in testCase3) {
				//console.log(`${prop} : ${testCase3[prop]} => ` + passwordValidator(prop, obj));
				expect(passwordValidator(prop, obj)).toEqual(testCase3[prop]);
			}
		});


	});


	describe('email validator', () => {

		const testCase = {
			'mysite@ourearth.com': true,
			'my.ownsite@ourearth.org': true,
			'mysite@you.me.net': true,
			'mysite.ourearth.com': false,  // [@ is not present]
			'mysite@.com.my': false,  // [ tld (Top Level domain) can not start with dot "." ]
			'@you.me.net': false,  // [ No character before @ ]
			'mysite123@gmail.b': false,  // [ ".b" is not a valid tld ]
			'mysite@.org.org': false,  // [ tld can not start with dot "." ]
			'.mysite@mysite.org': false,  // [ an email should not be start with "." ]
			'mysite()*@gmail.com': false,  // [ here the regular expression only allows character, digit, underscore, and dash ]
			'mysite..1234@yahoo.com': false,  // [double dots are not allowed]
		}

		it('email validation', () => {
			for (const prop in testCase) {
				console.log(`${prop} : ${testCase[prop]} => ` + emailValidator(prop));
				expect(emailValidator(prop)).toEqual(testCase[prop]);
			}
		});

	});

	describe('tel validator', () => {
		const testCase = {
			'010-1234-1234': true,
			'010-123-4234': true,
			'02-1234-1234': true,
			'02-123-1234': true,
			'0-1234-1234': false,
			'0-123-1234': false,
			'0101-123-1234': false,
			'010-12-1234': false,
			'010-12455-1234': false,
			'01012551234': false,
		}

		it('tel validator', () => {
			for (const prop in testCase) {
				console.log(`${prop} : ${testCase[prop]} => ` + telValidator(prop));
				expect(telValidator(prop)).toEqual(testCase[prop]);
			}
		})
	})

});