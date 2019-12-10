
# javascript utility
pure javascript utility! 각종 boilerplate, 자주 사용되어지는 것들





/stringValidator : 문자열 유효성 체크 관련
-------------------------------------------



 - /stringValidator/passwordValidator.js : 패스워드 유효성 검사 ( 특수문자, 숫자, 9~16자리 모두 포함)
 
  #### example
 ```javascript
let options = {
	min:9, max:16,   // 9~16자리의 범위
	conseq:5,	// 연속된 숫자의 한계 범위( ex: df55555d, 4df22222#$ ) 
	special: true,  // 특수문자 포함여부
	msg: 'test message',  // invalid할경우의 메시지
}

passwordValidator([String:검사할 문자열],[Object:위의 옵션]);

```
<hr/>

/login : 로그인 관련
--------------------


 - /login/passwordAuth.js : 패스워드 유효성 검사 후 callback실행
 
   #### example
 ```javascript
btn.addEventListener('click', function(){
		 AuthController.checkAuth('id', 'pwd', originFuc);  
		 // checkAuth(id의 element, pwd의 element, callback함수);
});

  // 기존 제출 버튼에 대한 function
function originFuc() {
     let form = document.getElementById('frm');
     let idStr = form.id.value;
     let pwdStr = form.pwd.value;
}
```

