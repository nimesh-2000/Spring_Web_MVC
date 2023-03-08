generateRentId();
customerAccount();
rentCount();
activeBookingsCount()
var p;
var r;

$("#btnsendReq").click(function () {

    addRental();
    loadPendingRentals();
});

function addRental() {

    let driverOption = $("#selectDrive").val();

    p = $("#txtFD").val();
    r = $("#txtTD").val();
    // $("#txtPickUpDate").val(p);
    // $("#txtReturnDate").val(r);


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




// function customerAccount(){
//     $("#orderTable").empty();
//     $.ajax({
//         url: baseURL+"rental",
//         dataType: "json",
//         success: function (resp) {
//
//
//             for (let acc of resp.data) {
//                 var row = '<tr><td>' + acc.rentalId + '</td><td>' + acc.registrationId + '</td><td>' + acc.driverId + '</td><td>' + acc.total_damage_waiver_payment + '</td><td>' + acc.pickUpDate + '</td><td>' + acc.returnDate + '</td><td>' + acc.pickupLocation + '</td><td>' + acc.returnLocation + '</td><td>' + acc.rental_status + '</td><td>' + acc.payment_slip + '</td></tr>';
//                 $("#orderTable").append(row);
//
//             }
//             bindRentalRowClickEvents();
//         }
//     });
// }

function customerAccount() {
    $("#orderTable").empty();
    let nic = $("#anic").text();

    $.ajax({
        url:baseURL+"rental/getCustomerRents/" + nic,
        dataType: "json",
        success: function (resp) {

            for (let acc of resp.data) {
                var row = '<tr><td>' + acc.rentalId + '</td><td>' + acc.registrationId + '</td><td>' + acc.driverId + '</td><td>' + acc.total_damage_waiver_payment + '</td><td>' + acc.pickUpDate + '</td><td>' + acc.returnDate + '</td><td>' + acc.pickupLocation + '</td><td>' + acc.returnLocation + '</td><td>' + acc.rental_status + '</td><td>' + acc.payment_slip + '</td></tr>';
                $("#orderTable").append(row);

            }
            bindRentalRowClickEvents();
        }

    });
}

function bindRentalRowClickEvents() {
    $("#orderTable>tr").click(function () {
        let rentalId = $(this).children(":eq(0)").text();
        let registrationId = $(this).children(":eq(1)").text();
         let driverId = $(this).children(":eq(2)").text();
        let pendingPayment = $(this).children(":eq(3)").text();
        let from = $(this).children(":eq(4)").text();
        let to = $(this).children(":eq(5)").text();
        let pickUpLocation = $(this).children(":eq(6)").text();
        let returnLocation = $(this).children(":eq(7)").text();
        let status = $(this).children(":eq(8)").text();


        //setting table details values to text fields
        $("#txtRental").val(rentalId);
        $("#txtPickUpDate").val(from);
        $("#txtReturnDate").val(to);
        $("#txtPickLocation").val(pickUpLocation);
        $("#txtReturnLocation").val(returnLocation);
        $("#aDOption").val(driverOption);

    });
}

function clearTextField(){
    $("#txtRental").val("");
    $("#txtPickUpDate").val("");
    $("#txtReturnDate").val("");
    $("#txtPickLocation").val("");
    $("#txtReturnLocation").val("");
}
$("#btnRentalDelete").click(function () {
    let rentalId = $("#txtRental").val();
    $.ajax({
        url: baseURL + "rental?rentalId=" + rentalId+ "",
        method: "delete",
        dataType: "json",
        success: function (resp) {
            alert(resp.message);
            // resp.data.image_1;
            customerAccount();
            clearTextField();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

$("#btnRentalUpdate").click(function (){

    let rentalId = $("#txtRental").val();
    let pickUpDate = $("#txtPickUpDate").val();
    let returnDate = $("#txtReturnDate").val();
    let driverOption = $("#aDOption").val();
    let pickUpLocation = $("#txtPickLocation").val();
    let returnLocation = $("#txtReturnLocation").val();
    let nic=$("#anic").text();

    let registration = $("#orderTable").children().eq(0).children(":eq(1)").text();
    let driver = $("#orderTable").children().eq(0).children(":eq(2)").text();
    let totalDamage = $("#orderTable").children().eq(0).children(":eq(3)").text();
    let s = $("#orderTable").children().eq(0).children(":eq(8)").text();
    let p = $("#orderTable").children().eq(0).children(":eq(9)").text();
    // let pD = $("#orderTable").children().eq(0).children(":eq(4)").text();
    // let rD = $("#orderTable").children().eq(0).children(":eq(5)").text();


    let rental={
        rentalId: rentalId,
        driverOption: driverOption,
        payment_slip:p,
        pickUpDate: pickUpDate,
        returnDate: returnDate,
        pickupLocation: pickUpLocation,
        returnLocation: returnLocation,
        rental_status: s,
        total_damage_waiver_payment: totalDamage,
        cusNic: nic,
        driverId: driver,
        registrationId: registration

    }

    $.ajax({
        url: baseURL+'rental',
        method: 'put',
        contentType:"application/json",
        data:JSON.stringify(rental),
        dataType:"json",
        success: function (res) {

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: " Successfully Updated",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error:function (error){
            let cause= JSON.parse(error.responseText).message;
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Update Failed",
                showConfirmButton: false,
                timer: 1500
            });
        }

    });
});

function rentCount(){
    $.ajax({
        url: baseURL+"rental/rentalCount",
        dataType: "json",
        success: function (res) {
            $("#bookingV").text(res.data);
        }
    })
}

function activeBookingsCount(){
    $.ajax({
        url: baseURL+"rental/rentalCount",
        dataType: "json",
        success: function (res) {

            let allRentals=res.data;
            let payCount=null;

            $.ajax({
                url: baseURL+"payment/paymentCount",
                dataType: "json",
                success: function (res) {
                    payCount=res.data;
                }
            })
            let sumTot=allRentals-payCount;
            $("#activeV").text(sumTot);

        }
    })
}