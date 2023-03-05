generateRentId();
var p;
var r;

$("#btnsendReq").click(function () {

    addRental();
});

function addRental() {

    let driverOption = $("#selectDrive").val();

    p = $("#txtFD").val();
    r = $("#txtTD").val();


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
        registrationId: registrationId
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



$('#selectDrive').change(function () {
    let driverOption = $('#selectDrive').find('option:selected').text();
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
            $("#txtDriverId").val(resp.data.driverId);
        }

    });
}
function generateRentId() {
    $.ajax({
        url: baseURL + "rental/generateRentalId",
        dataType: "json",
        success: function (res) {
            for (let rent of res.data) {
                $('#txtRentalId').val(res.data);
            }

        }
    })
}

// =================================================================

function bindRentalRowClickEvents() {
    $("#orderTable>tr").click(function () {
        let rentId = $(this).children(":eq(0)").text();
        let registrationId = $(this).children(":eq(1)").text();
        let driverOption = $(this).children(":eq(2)").text();
        let pendingPayment = $(this).children(":eq(3)").text();
        let from = $(this).children(":eq(4)").text();
        let to = $(this).children(":eq(5)").text();
        let pickUpLocation = $(this).children(":eq(6)").text();
        let returnLocation = $(this).children(":eq(7)").text();
        let status = $(this).children(":eq(8)").text();


        //setting table details values to text fields
        $("#txtPickUpDate").val(from);
        $("#txtReturnDate").val(to);
        $("#txtPickLocation").val(pickUpLocation);
        $("#txtReturnLocation").val(returnLocation);
        $("#aDOption").val(driverOption);

    });
}