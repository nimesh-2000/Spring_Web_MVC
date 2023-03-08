
let baseURL="http://localhost:8080/Back_End_war/";
customerCount();
viewAllUsers();
$("#btnSignL").click(function (){
    addCustomer();
    $("#home").css('display','none');
    $("#Clogin").css('display','block');
    $("#Csign").css('display','none');
    $("#vfeet").css('display','none');
    $("#chO").css('display','none');
    $("#ac").css('display','none');
    $("#dash").css('display','none');
    $("#dashSEM").css('display','none');

});

function addCustomer() {

    let nicNum =  $("#txtNIC").val();
    let address = $("#txtAddress").val();
    let contactNumber =$("#txtPhone").val();
    let name= $("#txtFullName").val();
    let date= $("#txtDate").val();
    let drivingLicenceNumber= $("#txtDl").val();
    let email= $("#txtEmail").val();
    let password =$("#txtSignPassword").val();
    let user_name= $("#txtUName").val();

    var customer = {
        nic : nicNum,
        address : address,
        contactNo : contactNumber,
        cusName : name,
        date : date,
        drivingLicenceNumber : drivingLicenceNumber,
        email : email,
        password : password,
        user_name:user_name,
    }

    $.ajax({
        url: baseURL + "customer",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(customer),
        success: function (resp) {
            uploadCustomerImages(nicNum);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "customer Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            clearCustomerTextFields();
        },
        error: function (error) {
            let errorReason = JSON.parse(error.responseText);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "customer Not Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
}

function uploadCustomerImages(nicNum) {

    let nicFile = $("#register-form-NIC-image")[0].files[0];

    let nicFileName = nicNum + "-imageLocation-" + $("#register-form-NIC-image")[0].files[0].name;

    var data = new FormData();

    data.append("imageLocation", nicFile, nicFileName);

    $.ajax({
        url: baseURL + "customer/uploadImg/" + nicNum,
        method: "PUT",
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (res) {
            console.log("Uploaded");
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Images Upload Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (error) {
            let errorReason = JSON.parse(error.responseText);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Images Not Upload Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

// var password;
// var user_name;
// var imageLoaction;
// function updateCustomer(){
//
//     var newDetails = {
//         nic: $("#customer-profile-nic").val(),
//         address: $("#customer-profile-address").val(),
//         contactNumber: $("#customer-profile-mobile").val(),
//         name: $("#customer-profile-name").val(),
//         email: $("#customer-profile-email").val(),
//         password: customer.password,
//         user_name: customer.user_name,
//         imageLocation: customer.imageLocation,
//     }
//
//     $.ajax({
//         url: baseURL + "customer/updateCustomer",
//         method: "PUT",
//         contentType: "application/json",
//         data: JSON.stringify(newDetails),
//         success: function (res) {
//             if (res.status === 200) {
//                 alert(res.message)
//             } else {
//                 alert("Cant update your Details in this moment")
//             }
//         },
//         error: function (ob) {
//             console.log(ob.responseJSON.message);
//         }
//     });
// }

function clearCustomerTextFields() {
    $('#txtNIC').val("");
    $('#txtAddress').val("");
    $('#txtPhone').val("");
    $('#txtFullName').val("");
    $('#txtDate').val("");
    $('#txtDl').val("");
    $('#txtEmail').val("");
    $('#txtSignPassword').val("");
    $('#txtUName').val("");
    $('#register-form-NIC-image').val("");
}



var name;
var licenceNum;
var date;
var image;
$("#editIm2").click(function (){
    let email = $("#ae").text();

    $.ajax({
        url: baseURL+"login?email="+email,
        method: "get",
        dataType:"json",
        success: function (res) {

            console.log(res.data);
            let userNic = res.data.nic;
            let userName = res.data.user_name;
            let password = res.data.password;
            let phone = res.data.contactNo;
            let address = res.data.address;
            let email = res.data.email;

            name = res.data.cusName;
            licenceNum = res.data.drivingLicenceNumber;
            date = res.data.date;
            image = res.data.imageLocation;

            $("#txtNI").val(userNic);
            $("#txtUserN").val(userName);
            $("#txtPass").val(password);
            $("#txtCustomerPhone").val(phone);
            $("#txtCustomerAddress").val(address);
            $("#txtCustomerEmail").val(email);

        },
        error:function(error){
            var jsObject=JSON.parse(error.responseText);
            alert("Invalid email or password");
        }
    });
});


// Update customer details
$("#btnUp").click(function () {

    let cusNic = $("#txtNI").val();
    let cusUserName = $("#txtUserN").val();
    let cusPassword = $("#txtPass").val();
    let cusPhone = $("#txtCustomerPhone").val();
    let cusAddress = $("#txtCustomerAddress").val();
    let cusEmail = $("#txtCustomerEmail").val();



    var customer = {
        nic:cusNic,
        user_name: cusUserName,
        password: cusPassword,
        contactNo: cusPhone,
        address: cusAddress,
        email:cusEmail,

        cusName:name,
        drivingLicenceNumber: licenceNum,
        date:date,
        imageLocation:image
    }

    $.ajax({
        url: baseURL+'customer',
        method: 'put',
        contentType:"application/json",
        data:JSON.stringify(customer),
        dataType:"json",
        success: function (res) {

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: " Successfully Updated",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error:function (error){
            let cause= JSON.parse(error.responseText).message;
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Update Failed",
                showConfirmButton: false,
                timer: 1500
            });
        }

    });
});
function customerCount(){
    $.ajax({
        url: baseURL+"customer/cusCount",
        dataType: "json",
        success: function (res) {
            $("#registerV").text(res.data);
        }
    })
}
function viewAllUsers(){
    $("#verificationTable").empty();
    $.ajax({
        url: baseURL+"customer",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
            for (let user of resp.data) {
                var row = '<tr><td>' + user.cusName + '</td><td>' + user.address + '</td><td>' + user.nic + '</td><td>' + user.email + '</td><td>' + user.contactNo + '</td><td>' + user.drivingLicenceNumber + '</td></tr>';
                $("#verificationTable").append(row);

            }

        }
    });

}





//
//
// /==================================================================================================================/


//let nicNum =  $("#txtNIC").val();
//     let address = $("#txtAddress").val();
//     let contactNumber =$("#txtPhone").val();
//     let name= $("#txtFullName").val();
//     let date= $("#txtDate").val();
//     let drivingLicenceNumber= $("#txtDl").val();
//     let email= $("#txtEmail").val();
//     let password =$("#txtSignPassword").val();
//     let user_name= $("#txtUName").val();


// ===============================Customer validation===========================================

$("#txtFullName").focus();

// customer reguler expressions
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusUserNameRegEx = /^[a-z ]{5,10}$/;
const cusnicRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusPasswordRegEx = /^[0-9/A-z. ,]{3,}$/;
const cusEmailRegEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const cusPhoneRegEx = /^07(7|6|8|1|2|5|0|4)-[0-9]{7}$/;
const cusAddressRegEx = /^[A-z0-9 ,/]{4,20}$/;
const cusDrivingLicNumdRegEx = /^[0-9]{1,}$/;

let customerValidations = [];
customerValidations.push({reg: cusNameRegEx, field: $('#txtFullName'),error:'Customer Name Pattern is Wrong' });
customerValidations.push({reg: cusUserNameRegEx, field: $('#txtUName'),error:'Customer User Name Pattern is Wrong'});
customerValidations.push({reg: cusnicRegEx, field: $('#txtNIC'),error:'Customer Nic Pattern is Wrong'});
customerValidations.push({reg: cusPasswordRegEx, field: $('#txtSignPassword'),error:'Customer Password Pattern is Wrong'});
customerValidations.push({reg: cusEmailRegEx, field: $('#txtEmail'),error:'Customer Email Pattern is Wrong'});
customerValidations.push({reg: cusPhoneRegEx, field: $('#txtPhone'),error:'Customer Phone Pattern is Wrong'});
customerValidations.push({reg: cusAddressRegEx, field: $('#txtAddress'),error:'Customer Address Pattern is Wrong'});
customerValidations.push({reg: cusDrivingLicNumdRegEx, field: $('#txtDl'),error:'Customer DriverLicenceId Pattern is Wrong'});


//disable tab key of all four text fields using grouping selector in CSS
$("#txtFullName,#txtUName,#txtSignPassword,#txtNIC,#txtDl,#txtEmail,#txtAddress,#txtPhone,#txtDate").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});


$("#txtFullName,#txtUName,#txtSignPassword,#txtNIC,#txtDl,#txtEmail,#txtAddress,#txtPhone").on('keyup', function (event) {
    checkValidity();
});

$("#txtFullName,#txtUName,#txtSignPassword,#txtNIC,#txtDl,#txtEmail,#txtAddress,#txtPhone").on('blur', function (event) {
    checkValidity();
});


$("#txtFullName").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusNameRegEx, $("#txtFullName"))) {
        $("#txtUName").focus();
    } else {
        focusText($("#txtFullName"));
    }
});


$("#txtUName").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusUserNameRegEx, $("#txtUName"))) {
        focusText($("#txtPassword"));
    }
});


$("#txtSignPassword").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusPasswordRegEx, $("#txtSignPassword"))) {
        focusText($("#txtNIC"));
    }
});

$("#txtNIC").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusnicRegEx, $("#txtNIC"))) {
        focusText($("#txtDl"));
    }
});

// $("#txtDate").on('keydown', function (event) {
//     if (event.key == "Enter" && check(cusAddressRegEx, $("#txtDate"))) {
//         focusText($("#txtUserName"));
//     }
// });

$("#txtDl").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusDrivingLicNumdRegEx, $("#txtDl"))) {
        focusText($("#txtEmail"));
    }
});

$("#txtEmail").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusEmailRegEx, $("#txtEmail"))) {
        focusText($("#txtAddress"));
    }
});

$("#txtAddress").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusAddressRegEx, $("#txtAddress"))) {
        focusText($("#txtPhone"));
    }
});


$("#txtPhone").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusPhoneRegEx, $("#txtPhone"))) {
        let res = confirm("Do you want to create.?");
        if (res) {
            clearAllTexts();
        }
    }
});

function checkValidity() {
    let errorCount=0;
    for (let validation of customerValidations) {
        if (check(validation.reg,validation.field)) {
            textSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextError(validation.field,validation.error);
        }
    }
    setButtonState(errorCount);
}

function check(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusText(txtField) {
    txtField.focus();
}

function setButtonState(value){
    if (value>0){
        $("#btnSignL").attr('disabled',true);
    }else{
        $("#btnSignL").attr('disabled',false);
    }
}

function clearAllTexts() {
    $("#txtFullName").focus();
    $("#txtFullName,#txtUrName,#txtNIC,#txtSignPassword,#txtEmail,#txtPhone,#txtAddress,#txtDl").val("");
    checkValidity();
}












