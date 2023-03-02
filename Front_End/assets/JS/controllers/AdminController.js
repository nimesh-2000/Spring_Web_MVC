$("#btnAddAdmin").click(function () {

    let adminId =  $("#txtAId").val();
    let adminEmail = $("#txtE").val();
    let adminUser =$("#txtU").val();
    let adminPassword= $("#txtUP").val();

    var Admin={
        adminId:adminId,
         email:adminEmail,
         userName:adminUser,
        password:adminPassword
    }

    //send ajax request to the customer servlet
    $.ajax({
        url: baseURL+"admin",
        method: "post",
        data : JSON.stringify(Admin),
        contentType:"application/json",
        success: function (resp) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Successfully Added",
                showConfirmButton: false,
                timer: 1500
            });

        },
        error: function(error) {
            let prase = JSON.parse(error.responseText);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

const AdminIDRegEx = /^(C00-)[0-9]{1,3}$/;
const AdminEmailRegEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const AdminUserNameRegEx = /^[a-z ]{5,10}$/;
const AdminPasswordRegEx = /^[0-9/A-z. ,]{3,}$/;

let AdminValidations = [];
AdminValidations.push({reg: AdminIDRegEx, field: $('#txtAId'),error:'Admin ID Pattern is Wrong' });
AdminValidations.push({reg: AdminEmailRegEx, field: $('#txtE'),error:'Admin Email Pattern is Wrong'});
AdminValidations.push({reg: AdminUserNameRegEx, field: $('#txtU'),error:'Admin User Name Pattern is Wrong'});
AdminValidations.push({reg: AdminPasswordRegEx, field: $('#txtUP'),error:'Admin Password Pattern is Wrong'});

$("#txtAId,#txtE,#txtU,#txtUP").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});


$("#txtAId,#txtE,#txtU,#txtUP").on('keyup', function (event) {
    checkAValidity();
});

$("#txtAId,#txtE,#txtU,#txtUP").on('blur', function (event) {
    checkAValidity();
});


$("#txtAId").on('keydown', function (event) {
    if (event.key == "Enter" && checkA(AdminIDRegEx, $("#txtAId"))) {
        $("#txtE").focus();
    } else {
        focusTextA($("#txtAId"));
    }
});


$("#txtE").on('keydown', function (event) {
    if (event.key == "Enter" && checkA(AdminEmailRegEx, $("#txtE"))) {
        focusTextA($("#txtU"));
    }
});


$("#txtU").on('keydown', function (event) {
    if (event.key == "Enter" && checkA(AdminUserNameRegEx, $("#txtU"))) {
        focusTextA($("#txtUP"));
    }
});
$("#txtUP").on('keydown', function (event) {
    if (event.key == "Enter" && checkA(AdminPasswordRegEx, $("#txtUP"))) {
        let res = confirm("Do you want to create.?");
        if (res) {
            clearAllTextsA();
        }
    }
});



function checkAValidity() {
    let errorCount=0;
    for (let validation of customerValidations) {
        if (check(validation.reg,validation.field)) {
            textSuccessA(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextErrorA(validation.field,validation.error);
        }
    }
    setButtonStateA(errorCount);
}

function checkA(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextErrorA(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultTextA(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccessA(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultTextA(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultTextA(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusTextA(txtField) {
    txtField.focus();
}

function setButtonStateA(value){
    if (value>0){
        $("#btnSignL").attr('disabled',true);
    }else{
        $("#btnSignL").attr('disabled',false);
    }
}

function clearAllTextsA() {
    $("#txtAId").focus();
    $("#txtAId,#txtE,#txtU,#txtUP").val("");
    checkAValidity();
}


