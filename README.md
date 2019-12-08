
# javascript utility
pure javascript utility!


/stringValidator : 문자열 유효성 체크 관련
 - /stringValidator/passwordValidator.js : 패스워드 유효성 검사 ( 특수문자, 숫자, 9~16자리 모두 포함)
 
/login : 로그인 관련
 - /login/passwordAuth.js : 패스워드 유효성 검사 후 callback실행
 
   #### example
 ```javascript
btn.addEventListener('click', function(){
		 AuthController.checkAuth('id', 'pwd', originFuc);  // checkAuth(id의 element, pwd의 element, callback함수);
});

  // 기존 제출 버튼에 대한 function
function originFuc() {
     let form = document.getElementById('frm');
     let idStr = form.id.value;
     let pwdStr = form.pwd.value;
}
```

