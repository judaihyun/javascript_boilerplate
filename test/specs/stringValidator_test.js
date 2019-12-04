describe('stringValidator', function(){

  describe('password validator',() => {

    const testCase = {
      '': false, //empty
      'qwertyuiopasdfgh':false, //16자리
      'qwertyuiopa@fgfh':false, //16자리 with 특수문자
      'qwertyu3opa@fgfh':true, //16자리 with 특수문자 + 숫자
      'qwertyuiopasdfgh2':false, //17자리
      'qwertyuiopasdfgh@':false, //17자리 with 특수문자
      'qwertyuiopasd3gh@':false, //17자리 with 특수문자
      'sdfkj3ff%':true, //9자리 with 특수문자, num
      'sdfkjfff%':false, //9자리 with 특수
      'sdfkjfff8':false, //9자리 with num
      'sdfkjffff':false, //9자리
      'sdfkj3f':false, //7자리
      'sjf34^f':false //7자리 with 특수문자
    };


    it('9자리이상 16자리이하, 특수문자, 숫자 포함이 아닐때 false를 반환',() => {
      for(const prop in testCase)
      {
        console.log(`${prop} : ${testCase[prop]} => ` + passwordValidator(prop));
        expect(passwordValidator(prop)).toEqual(testCase[prop]);
      }
    });


  });


  describe('email validator',() =>{

    const testCase = {
      'mysite@ourearth.com':true,
      'my.ownsite@ourearth.org':true,
      'mysite@you.me.net':true,
      'mysite.ourearth.com':false,  // [@ is not present]
      'mysite@.com.my':false,  // [ tld (Top Level domain) can not start with dot "." ]
      '@you.me.net':false,  // [ No character before @ ]
      'mysite123@gmail.b':false,  // [ ".b" is not a valid tld ]
      'mysite@.org.org':false,  // [ tld can not start with dot "." ]
      '.mysite@mysite.org':false,  // [ an email should not be start with "." ]
      'mysite()*@gmail.com':false,  // [ here the regular expression only allows character, digit, underscore, and dash ]
      'mysite..1234@yahoo.com':false,  // [double dots are not allowed]
    }

    it('email validation',() =>{
      for(const prop in testCase)
      {
        console.log(`${prop} : ${testCase[prop]} => ` + emailValidator(prop));
        expect(emailValidator(prop)).toEqual(testCase[prop]);
      }
    });

  });
 
});