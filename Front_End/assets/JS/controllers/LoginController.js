

$("#btnLogIn").click(function (){

    let email = $("#txtUserName").val();
    let password = $("#txtPassword").val();

    $.ajax({
        url: baseURL+"login?email="+email,
        method: "get",
        dataType:"json",
        success: function (res) {
            if (res.data.password==password){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "Login Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                    $("#home").css('display','none');
                    $("#Clogin").css('display','none');
                    $("#Csign").css('display','none');
                    $("#vfeet").css('display','block');
                    $("#chO").css('display','none');
                    $("#ac").css('display','none');
                    $("#dash").css('display','none');
                    $("#dashSEM").css('display','none');
                    $("#ae").text(email);
                    $("#anic").text(res.data.nic);
                    $("#an").text(res.data.cusName);
                    $("#A").css('pointer-events','auto');
                    $("#check").css('pointer-events','auto');

            }else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Invalid email or password",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            clearCustomerLoginTextFields();
        },
        error:function(error){
            var jsObject=JSON.parse(error.responseText);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Invalid email or password",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

function clearCustomerLoginTextFields() {
    $('#txtPassword').val("");
    $('#txtUserEmail').val("");

}