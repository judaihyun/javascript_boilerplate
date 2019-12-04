

function passwordValidator(args, opt)
{
    let obj = opt || {
        min: 9, max: 16
    }
    
    let msg = '숫자와 영문자 조합으로 9~16자리를 사용해야 합니다.';
    let rules = new RegExp("^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{"+obj.min+","+obj.max+"}$");
    
    if(!rules.test(args)) 
    {
        //alert(msg);
        return false;
    }
    return true;
}