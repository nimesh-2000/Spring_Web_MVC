$("#btnAL").click(function (){

    let email = $("#form3Example3").val();
    let password = $("#form3Example4").val();

    $.ajax({
        url: baseURL+"admin?email="+email,
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
                $("#header").css('display','none')
                $("#Clogin").css('display','none');
                $("#Csign").css('display','none');
                $("#vfeet").css('display','none');
                $("#chO").css('display','none');
                $("#ac").css('display','none');
                $("#adminLogin").css('display','none');
                $("#dash").css('display','block');
                $("#dashSEM").css('display','block');

            }else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Invalid email or password",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            clearAdminLoginTextFields();
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

function clearAdminLoginTextFields() {
    $('#form3Example4').val("");
    $('#form3Example3').val("");
}
