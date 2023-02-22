
let baseURL="http://localhost:8080/app/";

$("#btnSignL").click(function () {

    let nicFileName = $("#register-form-NIC-image")[0].files[0].name;


    let nic =  $("#txtNIC").val();
    let address = $("#txtAddress").val();
    let contactNumber =$("#txtPhone").val();
    let name= $("#txtFullName").val();
    let date= $("#txtDate").val();
    let drivingLicenceNumber= $("#txtDl").val();
    let email= $("#txtEmail").val();
    let password =$("#txtSignPassword").val();
    let user_name= $("#txtUName").val();


    var Customer = {
        nic : nic,
        address : address,
        contactNo : contactNumber,
        cusName : name,
        date : date,
        drivingLicenceNumber : drivingLicenceNumber,
        email : email,
        password : password,
        user_name:user_name,
        imageLocation : nicFileName
    }

    $.ajax({
        url: baseURL+"customer",
        method :"post",
        data : JSON.stringify(Customer),
        contentType:"application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);

            imagePath();

        },
        error: function(error) {
            let prase = JSON.parse(error.responseText);
            alert(prase.message);
        }
    });
});

function imagePath(){
    var data = new FormData();
    let nicFile = $("#register-form-NIC-image")[0].files[0];
    let nicFileName = $("#register-form-NIC-image")[0].files[0].name;

    data.append("myFile", nicFile, nicFileName);

    $.ajax({
        url: baseURL + "api/v1/upload",
        method: 'post',
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (resp) {
            alert("Successfully Uploaded");
            loadTheLastUploadedImage();
        },
        error: function (err) {
            console.log(err);
        }
    });
}