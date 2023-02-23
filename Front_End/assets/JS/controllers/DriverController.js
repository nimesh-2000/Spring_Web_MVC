$("#btnAddDriver").click(function () {

    let driverId =  $("#txtDId").val();
    let driverName = $("#txtDNa").val();
    let driverNic =$("#txtDNIC").val();
    let driverPassword= $("#txtDP").val();

    var Driver={
        driverId:driverId,
        name:driverName,
        nic:driverNic,
        password:driverPassword
    }

    //send ajax request to the customer servlet
    $.ajax({
        url: baseURL+"driver",
        method: "post",
        data : JSON.stringify(Driver),
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