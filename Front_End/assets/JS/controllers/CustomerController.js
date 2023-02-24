
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
                position: 'top-end',
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
                position: 'top-end',
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
                position: 'top-end',
                icon: 'success',
                title: "Images Upload Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (error) {
            let errorReason = JSON.parse(error.responseText);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Images Not Upload Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

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