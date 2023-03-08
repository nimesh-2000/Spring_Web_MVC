generatePaymentId();
loadAllRentalsId();
// selectReservation();
// paymentsCount();

function generatePaymentId() {
    $.ajax({
        url: baseURL + "payment/generatePaymentId",
        dataType: "json",
        success: function (res) {
            for (let rent of res.data) {
                $('#paymentId').val(res.data);
            }
        }
    })
}


function loadAllRentalsId() {
    $("#selectReservation").empty();
    $("#selectReservation").prepend(`<option>---Select Id---</option>`)
    $.ajax({
        url: baseURL + "rental",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
            for (let rent of resp.data) {
                if(rent.rental_status=="Accepted") {
                    $("#selectReservation").append(`<option value="${rent.rentalId}">${rent.rentalId}</option>`);
                }
            }

        }
    });
}

function searchRental(rentalId) {
    let response = "";
    $.ajax({
        url: baseURL + "rental",
        dataType: "json",
        async: false,
        success: function (resp) {
            response = resp.data.filter((i) => {
                return i.rentalId == rentalId;

            });
            console.log(resp.data);
        }

    });

    return response;
}


$("#selectReservation").change(function () {
    let rentalId = $("#selectReservation").val();
    $("#txtRent").val(rentalId);
    let res = searchRental(rentalId);

    console.log(res);
    if (res.length > 0) {
        let cusN=res[0].cusNic;
        let pickUpDate=res[0].pickUpDate;
        let returnDate=res[0].returnDate;
        console.log(cusN);
        $("#CDN").text(cusN);
        $("#CPDd").text(pickUpDate);
        $("#CRDd").text(returnDate);

    }

});


$("#btnPay").click(function () {

    makePayment();
});

function makePayment(){
    let rentalId= $("#txtRent").val();

    $.ajax({
        url: baseURL + "rental",
        dataType: "json",
        success: function (resp) {

            let totalDamageWaiwerAmount = null;
            let registrationId = null;

            for (let rent of resp.data) {
                if(rent.rentalId==rentalId) {
                    let pickUpDate= new Date($("#CPDd").text());
                    let returnDate= new Date($("#CRDd").text());

                    totalDamageWaiwerAmount=rent.total_damage_waiver_payment;
                    registrationId=rent.registrationId;

                    var differenceInTime = pickUpDate.getTime() - returnDate.getTime();
                    var differenceIndays = differenceInTime / (1000 * 3600 * 24);


                    let paymentId=$('#paymentId').val();
                    let damageCost= $("#txtDmCost").val();
                    let extraKmCost= parseFloat($("#txtExtraKC").val()) || 0;
                    let damageDes= $("#txtDaDes").val();
                    let paymentStatus="Paid";
                    let date=$("#txtDat").val();

                    $.ajax({
                        url: baseURL + "car",
                        dataType: "json",
                        success: function (resp) {
                            let dailyRate=0;

                            for (let car of resp.data) {
                                if(car.registrationId==registrationId) {
                                    dailyRate=car.dailyRate;

                                }
                            }

                            var rentAmount = (differenceIndays*dailyRate);
                            console.log(rentAmount)

                            let total=rentAmount+(totalDamageWaiwerAmount-damageCost)+extraKmCost;
                            // let allTot=total;

                            $('#txtRetDamA').val(rentAmount);
                            $('#txtPTot').val(total);
                            console.log(extraKmCost);
                            var payment = {
                                paymentId: paymentId,
                                date: date,
                                rent_amount: rentAmount,
                                extra_mileage: extraKmCost,
                                total: total,
                                damage_cost: damageCost,
                                damageDescription: damageDes,
                                payment_status: paymentStatus,
                                rentalId: rentalId,
                            }


                            $.ajax({
                                url: baseURL+"payment",
                                method: "post",
                                data : JSON.stringify(payment),
                                contentType:"application/json",
                                success: function (resp) {
                                    console.log(resp);
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: "Payment Added Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    // clearDriverTextFields();
                                },
                                error: function(error) {
                                    let prase = JSON.parse(error.responseText);
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'error',
                                        title: "Payment Not Added Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                            });

                        }
                    });


                }
            }

        }
    });

}

//======================================================
//
function paymentsCount(){
    $.ajax({
        url: baseURL+"payment/paymentCount",
        dataType: "json",
        success: function (res) {
            $("#lblTotalPayments").text(res.data);
        }
    })
}


//Daily
$("#btnChooseD").click(function () {
    $("#dailyIncomeViewTable").empty();
    let incomeDate = $("#dailyDate").val();
    $.ajax({
        url: baseURL + "payment?date=" + incomeDate,
        dataType: "json",
        success: function (resp) {
            let total = resp.data;
            var row = '<tr><td> ' + total + '.00</td></tr>';
            $("#dailyIncomeViewTable").append(row);
        }
    });
});

//Monthly
function monthlyIncome() {
    $("#monthlyIncomeViewTable").empty();
    $.ajax({
        url: baseURL + "payment/monthlyIncome",
        dataType: "json",
        success: function (resp) {
            let year1 = null;
            let month1 = null;
            let total1 = null;

            let data = resp.data;
            let split = data.split(",", 3);
            for (var i = 0; i < split.length; i++) {
                let year = split[i, 0];
                let month = split[i, 1];
                let total = split[i, 2];
                year1 = year;
                month1 = month;
                total1 = total;
            }
            var row = '<tr><td>' + year1 + '</td><td>' + month1 + '</td><td> ' + total1 + '0</td></tr>';
            $("#monthlyIncomeViewTable").append(row);


        }
    });
}

//Annually
function annuallyIncome() {
    $("#annuallyIncomeViewTable").empty();
    $.ajax({
        url: baseURL + "payment/annuallyIncome",
        dataType: "json",
        success: function (resp) {
            let year2 = null;
            let total2 = null;

            let data = resp.data;
            let split = data.split(",", 2);
            for (var i = 0; i < split.length; i++) {
                let year = split[i, 0];
                let total = split[i, 1];
                year2 = year;
                total2 = total;
            }
            var row = '<tr><td>' + year2 + '</td><td>' + total2 + '0</td></tr>';
            $("#annuallyIncomeViewTable").append(row);
        }

    });
}