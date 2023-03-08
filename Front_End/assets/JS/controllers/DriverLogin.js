$("#dB").click(function (){

    let drivingLicenceNum = $("#dE").val();
    let name = $("#dP").val();

    $.ajax({
        url: baseURL+"driver?drivingLicenceNum="+drivingLicenceNum,
        method: "get",
        dataType:"json",
        success: function (res) {
            if (res.data.name==name){
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
                $("#dash").css('display','none');
                $("#dashSEM").css('display','none');
                $("#driverShedule").css('display','block');
                $("#CDNs").text(res.data.name);
                $("#DNIs").text(res.data.nic);
                $("#DLNs").text(res.data.drivingLicenceNum);

            }else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Invalid name or id",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            clearDriverLoginTextFields();
        },
        error:function(error){
            var jsObject=JSON.parse(error.responseText);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Invalid name or id",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

function clearDriverLoginTextFields() {
    $('#dE').val("");
    $('#dP').val("");
}