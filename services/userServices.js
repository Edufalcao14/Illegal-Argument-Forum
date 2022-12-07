module.exports.VerifyRegexEmail =(e_mail) =>{

    var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(e_mail.match(emailformat))
    {
        console.log("You have entered an valid email address!");
    return true;
    }
    else
    {
    console.log("You have entered an invalid email address!");
    return false;
    }
    }

    module.exports.verifytextArea =(description) =>{
     if (description.value.length == 0)
      { 
         alert("message");  	
         return false; 
      }  	
      return true; 
    } 