describe('login module', function(){

  describe('password validator', () => {

    let testCase = [
      '', //empty
      'qwertyuiopasdfgh', //16자리
      'qwertyuiopa@fgfh', //16자리 with 특수문자
      'qwertyu3opa@fgfh', //16자리 with 특수문자 + 숫자
      'qwertyuiopasdfgh2', //17자리
      'qwertyuiopasdfgh@', //17자리 with 특수문자
      'qwertyuiopasd3gh@', //17자리 with 특수문자
      'sdfkj3ff%', //9자리 with 특수문자, num
      'sdfkjfff%', //9자리 with 특수
      'sdfkjfff8', //9자리 with num
      'sdfkjffff', //9자리
      'sdfkj3f', //7자리
      'sjf34^f', //7자리 with 특수문자
    ];

    let testResult = [
      false, // empty
      false, //16
      false, //16 with special
      true, //16 with special, num
      false, // 17
      false, // 17 with special
      false, // 17 with special, num
      true, // 9 with special, num
      false, // 9 with special
      false, // 9 with num
      false, // 9
      false, // 7
      false, // 7 with special
    ]



    it('9자리이상 16자리이하, 특수문자, 숫자 포함이 아닐때 false를 반환', () => {
      testCase.forEach(function(args, idx){
        expect(passwordValidator(args)).toEqual(testResult[idx]);
      });
    })


  })
 
});