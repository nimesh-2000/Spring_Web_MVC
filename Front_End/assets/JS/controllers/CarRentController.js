var p;
var r;

$("#btnsendReq").click(function () {
    addRental();
});

function addRental(driver) {

    let driverOption = $("#selectDriver").val();


    p = $("#txtFromDate").val();
    r = $("#txtToDate").val();


    var Rdata = new FormData();

    let paymentSlipName = $("#lossDP2")[0].files[0].name;
    let paymentSlipFile = $("#lossDP2")[0].files[0];


    let registrationId = $("#CheckReTable").children().eq(0).children(":eq(0)").text();
    let onHold = $("#CheckReTable").children().eq(0).children(":eq(4)").text();

    console.log(registrationId);

    let rentId = $("#txtRentalId").val();
    let pickupLocation = $("#txtFPickL").val();
    let returnLocation = $("#txtReturnL").val();
    let slipImgPath = paymentSlipName;
    let statusOfReq = "Pending";
    let cusId =   $("#anic").text();
    // let getDriverId = getDriverId(rentId);
// console.log(driver);

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
        driver_id: driver,
        registrationId: registrationId
    }

    Rdata.append("rImageFile", paymentSlipFile);
    Rdata.append("carRental", new Blob([JSON.stringify(rent)], {type: "application/json"}))

    $.ajax({
        url: baseURL + "rental",
        method: "POST",
        async: true,
        contentType: false,
        processData: false,
        data: Rdata,
        success: function (resp) {
            sendRentImagePath(rentId);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Rental Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });

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
    })
}


// =====================================================================

function sendRentImagePath(rentId) {
    var data = new FormData();

    // let file = $("#lossDP2")[0].files[0];
    // let fileName = rentId + "-payment_slip-" + $("#lossDP2")[0].files[0].name;
    // data.append("payment_slip", file, fileName);

    let file = $("#lossDP2")[0].files[0];
    let fileName = rentId + "-payment_slip-" +  $("#lossDP2")[0].files[0].name;

    data.append("payment_slip", file, fileName);

    $.ajax({
        url: baseURL + "rental/uploadImg" + rentId,
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

//get added driver ids and updated driver availability
// function a(id) {
//     alert(id);
//     $.ajax({
//         url: baseURL + "driver",
//         dataType: "Json",
//         method: "get",
//         async:false,
//         success: function (resp) {
//             let driver;
//             for (const d of resp.data) {
//                 if (id == d.driver_id) {
//                     driver = {
//                         driver_id:d.driver_id,
//                         nic: d.nic,
//                         name: d.name,
//                         drivingLicenceNum:d.drivingLicenceNum,
//                         availability: "Unavailable"
//                     }
//                 }
//             }
//
//
//             //update driver
//             $.ajax({
//                 url: baseURL + "driver",
//                 method: "put",
//                 data: JSON.stringify(driver),
//                 contentType: "application/json",
//                 async:false,
//                 success: function (resp) {
//                     alert(resp.message);
//                 },
//                 error: function (error) {
//                     let prase = JSON.parse(error.responseText);
//                     alert(prase.message);
//
//                 }
//
//             });
//         },
//         error: function (error) {
//             let prase = JSON.parse(error.responseText);
//             alert(prase.message);
//
//         }
//     });
// }


// =========================================================


// function getAllAvailableDriver(){
// let available="Available";
// $.ajax({
//     url: baseURL+"driver/availability/drivers",
//     dataType:"json",
//     method: "get",
//     success: function (resp) {
//         console.log(resp)
//        alert(resp);
//             driverId = resp.data.driver_id;
//             driverIds.push(driverId);
//             //set all available drivers to array
//
//     }
//
// });

// ========================================

$('#selectDriver').change(function () {
    let driverOption = $('#selectDriver').find('option:selected').text();
    console.log(driverOption);
    if (driverOption==="Driver"){
        randomDriver();
    }
    else {
        addRental("None");
    }
})

function randomDriver(){
    $.ajax({
        url: baseURL + "driver/randomDriver",
        method: "get",
        success: function (resp) {
            for (let driver of resp.data){
                console.log(driver);
                addRental(driver);
            }

        }

    });
}