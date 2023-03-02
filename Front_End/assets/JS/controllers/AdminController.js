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