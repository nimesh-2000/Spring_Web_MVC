
let baseURL="http://localhost:8080/Back_End_war/";

$("#btnSignL").click(function (){
    addCustomer();
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
        url: baseURL+"customerLogin?email="+email,
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