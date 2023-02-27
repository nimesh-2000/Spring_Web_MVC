$("#btnAddDriver").click(function () {

    let driverId =  $("#txtDId").val();
    let driverName = $("#txtDNa").val();
    let driverNic =$("#txtDNIC").val();
    let driverLicense= $("#txtDLN").val();
    let driverDOB= $("#txtDOB").val();
    let driverAvailability= $("#selectDriver").val();

    var Driver={
        driver_id:driverId,
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