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
            console.log(resp);
            alert(resp.message);

        },
        error: function(error) {
            let prase = JSON.parse(error.responseText);
            alert(prase.message);
        }
    });
});