$("#btnAddDriver").click(function () {

    let driverId =  $("#txtDId").val();
    let driverName = $("#txtDNa").val();
    let driverNic =$("#txtDNIC").val();
    let driverLicense= $("#txtDLN").val();
    let driverDOB= $("#txtDOB").val();
    let driverAvailability= $("#selectDriver").val();

    var Driver={
        driverId:driverId,
        name:driverName,
        nic:driverNic,
        drivingLicenceNum:driverLicense,
        dob:driverDOB,
        availability:driverAvailability
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