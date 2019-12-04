describe('stringValidator', function(){

  describe('password validator', () => {

    let testCase = {
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


    it('9자리이상 16자리이하, 특수문자, 숫자 포함이 아닐때 false를 반환', () => {
      for(let prop in testCase)
      {
        expect(passwordValidator(prop)).toEqual(testCase[prop]);
      }
    })


  });

  
 
});