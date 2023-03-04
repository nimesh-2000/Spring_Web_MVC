
var p;
var r;

$("#btnsendReq").click(function () {

    addRental();
});

function addRental() {

    let driverOption = $("#selectDriver").val();

    p = $("#txtFromDate").val();
    r = $("#txtToDate").val();


    let paymentSlipName = $("#lossDP2")[0].files[0].name;

    let registrationId = $("#CheckReTable").children().eq(0).children(":eq(0)").text();
    let onHold = $("#CheckReTable").children().eq(0).children(":eq(4)").text();

    console.log(registrationId);

    let rentId = $("#txtRentalId").val();
    let pickupLocation = $("#txtFPickL").val();
    let returnLocation = $("#txtReturnL").val();
    let slipImgPath = paymentSlipName;
    let statusOfReq = "Pending";
    let cusId = $("#anic").text();
    let driverId = $("#txtDriverId").val();

    let rent = {
        rentalId: rentId,
        driverOption: driverOption,
        payment_slip: "uploads/" + slipImgPath,
        pickUpDate: p,
        returnDate: r,
        pickupLocation: pickupLocation,
        returnLocation: returnLocation,
        rental_status: statusOfReq,
        total_damage_waiver_payment: onHold,
        cusNic: cusId,
        driverId: driverId,
        registrationID: registrationId
    }
    console.log(JSON.stringify(rent))

    $.ajax({
        url: baseURL + "rental",
        method: "POST",
        async: true,
        contentType: "application/json",

        data: JSON.stringify(rent),
        success: function (resp) {
            sendRentImagePath(rentId);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Rental Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            // updateCarAvai();
        },
        error: function (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Rental Not Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}
function sendRentImagePath(rentId) {
    var data = new FormData();

    let file = $("#lossDP2")[0].files[0];
    let fileName = rentId + "-payment_slip-" +  $("#lossDP2")[0].files[0].name;

    data.append("payment_slip", file, fileName);


    $.ajax({
        url: baseURL + "rental/uploadImg/" + rentId,
        method: 'post',
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (resp) {
            console.log("Uploaded");
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Images Upload Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (err) {
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



$('#selectDriver').change(function () {
    let driverOption = $('#selectDriver').find('option:selected').text();
    // console.log(driverOption);
    if (driverOption == "Driver"){
        // randomDriver();
    }
    else {
        addRental("None");
    }
})
randomDriver();
function randomDriver(){
    $.ajax({
        url: baseURL + "driver/randomDriver",
        dataType:"json",
        success: function (resp) {
            // console.log(resp.data.driver_id)
            $("#driverID").val(resp.data.driverId);
        }

    });
}