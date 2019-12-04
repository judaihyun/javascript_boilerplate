

function passwordValidator(args)
{

    let msg = '숫자와 영문자 조합으로 9~16자리를 사용해야 합니다.';
    let rules = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/;
    if(!rules.test(args)) 
    {
        //alert(msg);
        return false;
    }
    return true;
}