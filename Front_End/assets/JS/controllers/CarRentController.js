
// =============================rental ekak add krnna meka===============================

var p;
var r;
var dailR;
function addRental() {

    // for(let sd of array){
    //     p=sd.pickUpDate;
    //     r=sd.returnDate;
    //     dailR=sd.dailyRate;
    // }
    // alert(p);

    p=$("#txtFromDate").val();
    r=$("#txtToDate").val();

    // var Rdata = new FormData();
    //
    // let paymentSlipName =$("#lossDP2")[0].files[0].name;
    // let paymentSlipFile = $("#lossDP2")[0].files[0];

    var pick = new Date(p);
    var ret = new Date(r);
    // var rentAmount = (ret.getDate() - pick.getDate())*dailR;
    // alert(diffDays)

    let rentalId =  $("#txtRentalId").val();
    let totalRent = $("#txtTotalRent").val();
    // let paymentSlipImage = paymentSlipName;
    let pickupD=p;
    let returnD=r;
    let pickUpLocation= $("#txtFPickL").val();
    let returnLocation= $("#txtReturnL").val();
    let rentStat=$("#txtRentalStatus").val();
    let totalDamageWaiverAmount= $("#txtLossDwa").val();
    // let rentAmount= $("#txtTotalRent").val();
    let rentD = getRentDetails(rentalId);


    var rent = {
        rentalId : rentalId,
        amount : totalRent,
        pickupLocation : pickUpLocation,
        returnLocation : returnLocation,
        total_damage_waiver_payment : totalDamageWaiverAmount,
        pickUpDate : pickupD,
        returnDate : returnD,
        rental_status:rentStat,
        cusNic:cNic,
        // payment_slip:"uploads/"+ paymentSlipImage,
        rentDetails:rentD

    }

    // Rdata.append("rImageFile" , paymentSlipFile)
    // Rdata.append("rental", new Blob([JSON.stringify(rent)], {type: "application/json"}))

    $.ajax({
        url: baseURL + "rental",
        method: "post",
        // async: true,
        // contentType: false,
        // processData: false,
        // data: Rdata,
        dataType: "json",
        data:JSON.stringify(rent),
        contentType:"application/json",

        success: function (resp) {
            // updateDriverStatus();
            // uploadPaymentSlipImages(rentalId);
            // getCarDet();
            // getDriDet();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Rental Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (error) {
            // alert(JSON.parse(error.responseText).message);
            // let errorReason = JSON.parse(error.responseText);
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


// ==============================================================


getCusNic();

// =====================meka rental eke nic ekata yawanna ==========================
var cNic;
function getCusNic(){
    let email =  $("#ae").text();

    $.ajax({
        url: baseURL+"login?email="+email,
        method: "get",
        dataType:"json",
        success: function (res) {

            console.log(res.data);
            // let userNic = res.data.nic;

            cNic=res.data.nic;
        },
        error:function(error){
            var jsObject=JSON.parse(error.responseText);
            // alert("Invalid email or password");
        }
    });
}

$("#btnsendReq").click(function (){
    addRental();
});

// var lossDamage="";
var driverId="";
var array = [];
// var carDetailArray=[];
var carRegiId="";
// getDamageWeiverTot();
// let onHoldAmount = 0;

// function getDamageWeiverTot(){
//     for (let i=0; i<carDetailArray.length; i++){
//         onHoldAmount+=  carDetailArray[i].onHold;
//         console.log(JSON.stringify(onHoldAmount));
//     }
//     //
//     return onHoldAmount;
// }

// ==========================meka rental details ekata adala data tika yawanna=================================

function getRentDetails(rentalId) {
    let rows = $("#CheckReTable").children().length;
    // let rentalId =  $("#txtRe").val();
    for (let i = 0; i < rows; i++) {
        let carNum = $("#CheckReTable").children().eq(i).children(":eq(0)").text();
        let carBrand = $("#CheckReTable").children().eq(i).children(":eq(1)").text();
        let dailyRate= $("#CheckReTable").children().eq(i).children(":eq(2)").text();
        let monthlyRate = $("#CheckReTable").children().eq(i).children(":eq(3)").text();
        let onHold= $("#CheckReTable").children().eq(i).children(":eq(4)").text();
        let from = $("#CheckReTable").children().eq(i).children(":eq(5)").text();
        let to= $("#CheckReTable").children().eq(i).children(":eq(6)").text();
        let driver = $("#CheckReTable").children().eq(i).children(":eq(7)").text();
        let carStatus = $("#CheckReTable").children().eq(i).children(":eq(8)").text();
        array.push({rentalId:rentalId,registrationId:carNum,pickUpDate: from,returnDate: to,
            driverOption:driver,driverId:driverId});

        // carDetailArray.push({rentalId: rentalId,registrationId:carNum,pickUpDate:from,returnDate:to,
        //    driverOption:driver,registrationId:carBrand,dailyRate: dailyRate,monthlyRate:monthlyRate,
        // rental_status:carStatus,onHold});
        //      alert(driverId);
        // console.log(driverId);
        alert(carNum);
    }
    return array;
}

loadAllDrivers();
//========================meka driver id eka ganna==========================
//Load all drivers
function loadAllDrivers() {
    $.ajax({
        url: baseURL+"driver",
        method:"Get",
        dataType: "json",
        success: function (resp) {
            console.log(resp.data );
            for (let dri of resp.data){
                if (dri.availability=="Available"){
                    driverId=dri.driver_id;
                    // availability="Unvailable";
                    alert(driverId);
                }
            }
        }
    });

}