

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


function emailValidator(args)
{
    /*   https://www.w3resource.com/javascript/form/email-validation.php   */
    let msg = '유효하지 않은 이메일 주소입니다.';
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(args))
    {
        return true;
    }

    //alert(msg);
    return false;
}