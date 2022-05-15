$(document).ready(() => {

    let intervalId;

    $(".btn").on('click', (event) => {

        $("#mainContainer").empty();

        let menuId = event.target.id;

        if (menuId == "liveRepots") {
            $("#search-form").hide();
            $("#mainContainer").empty();
            if (selectedCoins.length == 0) {
                $("#mainContainer").html(`<div class="noneSelectedMsg">
                        <h1 id="liveReportsMessage">Please select up 5 coins to display on the graph</h1>
                        </div>`);
            } else {
                $(".loader").show();
                let selectedCoin1 = [];
                let selectedCoin2 = [];
                let selectedCoin3 = [];
                let selectedCoin4 = [];
                let selectedCoin5 = [];
                let coinKeysArray = [];

                intervalId = setInterval(() => {
                    getData();
                }, 2000);

                function getData() {

                    let url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${selectedCoins[0]},${selectedCoins[1]},${selectedCoins[2]},${selectedCoins[3]},${selectedCoins[4]}&tsyms=USD`
                    $.get(url).then((coinsValue) => {
                        $('#mainContainer').html(` <div id="chartContainer" style="height: 500px; width: 100%;"></div>`);

                        let dateNow = new Date();
                        let coinToShowOnGraph = 1;
                        coinKeysArray = [];

                        for (let key in coinsValue) {

                            if (coinToShowOnGraph == 1) {
                                selectedCoin1.push({ x: dateNow, y: coinsValue[key].USD });
                                coinKeysArray.push(key);
                            }

                            if (coinToShowOnGraph == 2) {
                                selectedCoin2.push({ x: dateNow, y: coinsValue[key].USD });
                                coinKeysArray.push(key);
                            }

                            if (coinToShowOnGraph == 3) {
                                selectedCoin3.push({ x: dateNow, y: coinsValue[key].USD });
                                coinKeysArray.push(key);
                            }

                            if (coinToShowOnGraph == 4) {
                                selectedCoin4.push({ x: dateNow, y: coinsValue[key].USD });
                                coinKeysArray.push(key);
                            }

                            if (coinToShowOnGraph == 5) {
                                selectedCoin5.push({ x: dateNow, y: coinsValue[key].USD });
                                coinKeysArray.push(key);
                            }

                            coinToShowOnGraph++;

                        }
                        $(".loader").hide();
                        createGraph();
                    });

                    function createGraph() {

                        let chart = new CanvasJS.Chart("chartContainer", {
                            exportEnabled: true,
                            animationEnabled: false,

                            title: {
                                text: "Crypto Coins Currencies Real-Time in $USD"
                            },
                            axisX: {
                                title: "Time",
                                valueFormatString: "HH:mm:ss",
                            },
                            axisY: {
                                title: "Currency Value",
                                suffix: "$",
                                titleFontColor: "#4F81BC",
                                lineColor: "#4F81BC",
                                labelFontColor: "#4F81BC",
                                tickColor: "#4F81BC",
                                includeZero: true,
                            },

                            toolTip: {
                                shared: true
                            },
                            data: [{
                                type: "spline",
                                name: coinKeysArray[0],
                                showInLegend: true,
                                xValueFormatString: "HH:mm:ss",
                                dataPoints: selectedCoin1,
                            },
                            {
                                type: "spline",
                                name: coinKeysArray[1],
                                showInLegend: true,
                                xValueFormatString: "HH:mm:ss",
                                dataPoints: selectedCoin2,
                            },
                            {
                                type: "spline",
                                name: coinKeysArray[2],
                                showInLegend: true,
                                xValueFormatString: "HH:mm:ss",
                                dataPoints: selectedCoin3,
                            },
                            {
                                type: "spline",
                                name: coinKeysArray[3],
                                showInLegend: true,
                                xValueFormatString: "HH:mm:ss",
                                dataPoints: selectedCoin4,
                            },
                            {
                                type: "spline",
                                name: coinKeysArray[4],
                                showInLegend: true,
                                xValueFormatString: "HH:mm:ss",
                                dataPoints: selectedCoin5,
                            }]
                        });

                        chart.render();
                    }
                }
            }
        } else if (menuId == "about") {
            clearInterval(intervalId);
            $("#mainContainer").empty();
            $("#search-form").hide();
            $("#mainContainer").html(contentAbout());
        } else if(menuId == "btn-search") {
            search();
        } else {
            clearInterval(intervalId);
            $("#mainContainer").empty();
            $("#mainContainer").html(startDefault());
            $("#search-form").show();
        }
    });

    function contentAbout() {
        let about = `<div id="aboutDiv" class="container mt-5">
        <div class="row" id="wrapper">    
            <div class="col-4">
                <img id="myPhoto" src="images/photo_about.jpg">
            </div>
            <div class="col-8 about" id="aboutProjectDiv">
                <h3><u>About this project:</u></h3>
                <p id="blurb">This is my second project</p>
                <p>
                    The task of this project was to create a cryptocurrency website that includes: 
                    <br>
                    &nbsp; &nbsp;- the ability to track the value of coins; 
                    <br>
                    &nbsp; &nbsp;- the ability to track coins on the chart;
                    <br>
                    &nbsp; &nbsp;- search for coins on the site.
                    <br><br>
                    2 APIs used for information retrieval: 
                    <br>
                    &nbsp; &nbsp;1) for coin information https://api.coingecko.com/api/v3/coins 
                    <br>
                    &nbsp; &nbsp;2) to get the graph https://min-api.cryptocompare.com <br>
                    This projected was created using: HTML, CSS, JavaScript, jQuery, Ajax(RESTful API), CANVAS JS &
                    Bootstrap.
                    <br><br>
                    To get started, you can select up to 5 coins to diplay in the live report. 
                    <br>
                    If you would like to choose a sixth, you'll have to replace one of your currently selected coins
                    with a new one.
                    <br>
                </p>
                <h3>About me:</h3>
                <p>
                    Name: Anastasiia Bai
                    <br>
                    Contact: nessti.bai@gmail.com
                    <br>
                </p>
            </div>
        </div>
        </div>`

        $("#mainContainer").append(about);
    }

    let coinsArray = [];

    function startDefault() {
        $(".loader").show();
        clearInterval(intervalId);

        $.get("https://api.coingecko.com/api/v3/coins").then(coins => {
            coinsArray = coins;
            $(".loader").hide();
            showAllCoins(coins);
            doubleCheckToggle();
        })
    }
    startDefault();

    function showAllCoins(coins) {
        for (let index = 0; index < coins.length; index++) {
            showCoinInUI(coins[index]);
            onMoreInfoClicked(coins[index].id);
        }
    }

    function showCoinInUI(coins) {
        let coinCard =
            `<div class="col-sm-4" id="${coins.symbol.toUpperCase()}">
            <div class="card">
                <div class="card-body">
                    <label class="switch">
                    <input type="checkbox" onchange="toggleFunc(this, '${coins.symbol.toUpperCase()}')" id="check${coins.symbol.toUpperCase()}">
                    <span class="slider round"></span>
                    </label>
                    <h3 id="${coins.symbol.toUpperCase()}" class="card-title">${coins.symbol.toUpperCase()}</h3>
                    <p class="card-text">${coins.name}</p>
                    <button id="moreInfo${coins.id}" class="btn btn-outline-info" type="button" data-toggle="collapse" data-target="#open${coins.id}" aria-expanded="false" aria-controls="${coins.id}">More info</button>
                    <div class="collapse card" id="open${coins.id}">
                    <div class="card in card-body" id="${coins.id}">
                    </div>
                    </div>
                </div>
            </div>
        </div>`

        $("#mainContainer").append(coinCard);
    }

    function onMoreInfoClicked(coinId) {
        $(`#moreInfo${coinId}`).on('click', function () {
            let getCoinInfoFromMap = saveCoinInCacheMap.get(coinId);
            if (!getCoinInfoFromMap) {
                $.get(`https://api.coingecko.com/api/v3/coins/${coinId}`).then(function (coin) {
                    saveCoinInfoInMap(coin);
                    getCoinInfoFromMap = saveCoinInCacheMap.get(coinId);
                    showCoinInfo(coinId, getCoinInfoFromMap);
                });
            } else {
                showCoinInfo(coinId, getCoinInfoFromMap);
            }
        });
    }

    let saveCoinInCacheMap = new Map();

    function saveCoinInfoInMap(coin) {
        let id = coin.id;
        let image = coin.image.thumb;
        let usd = coin.market_data.current_price.usd;
        let eur = coin.market_data.current_price.eur;
        let ils = coin.market_data.current_price.ils;
        let infoCard = { image, usd, eur, ils };

        saveCoinInCacheMap.set(id, infoCard);

        setTimeout(() => {
            saveCoinInCacheMap.delete(id);
        }, 120000);
    }

    function showCoinInfo(coinId, coin) {
        $(`#${coinId}.card`).html(
            `<div>
                <img src=${coin.image}>
            </div>
            <br>
            <p> <i class="fas fa-dollar-sign"></i> ${coin.usd.toFixed(4)}</p>
            <p> <i class="fas fa-euro-sign"></i> ${coin.eur.toFixed(4)}</p>
            <p> <i class="fas fa-dollar-sign"></i> ${coin.ils.toFixed(4)}</p>`
        )
    }

    function search() {
        // $("#btn-search").on("click", function () {
            let value = $("#input-search").val();
            if (value != "") {
                $.get("https://api.coingecko.com/api/v3/coins/" + value).then(function (coins) {
                    showCoinInUI(coins);
                    onMoreInfoClicked(coins.id);
                });
            } else {
                startDefault();
                $("#searchmsg").html("Please enter a valid coin name to search.");
                setTimeout(function () {
                    $("#searchmsg").html("");
                }, 5000);
            }
            $("#input-search").val("");
        // });
    }


    $("#input-search").on("keyup", function () {
        $(".col-sm-4").each(function () {
            let value = $("#input-search").val().toUpperCase();
            let card = $(this).attr("id").toUpperCase();
            let symbol = $(this).attr("class").toUpperCase();

            if (card.includes(value) || symbol.includes(value)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $('#input-search').on('keypress', function (e) {
        let key = String.fromCharCode(!e.charCode ? e.which : e.charCode);

        if (!/^[A-Z0-9]+$/i.test(key)) {
            e.preventDefault();
        }
    });
});

let selectedCoins = [];
let selectedToggleIds = [];
let graphData = [];
let updater;

function toggleFunc(currenttoggle, coinname) {
    let toggleId = currenttoggle.id;
    let indexSymbolCoin = selectedCoins.indexOf(coinname);
    let indexIdToggleLive = selectedToggleIds.indexOf(toggleId);

    if (indexSymbolCoin != -1) {
        selectedCoins.splice(indexSymbolCoin, 1);
        selectedToggleIds.splice(indexIdToggleLive, 1);
    } else {
        if (selectedCoins.length < 5) {
            selectedCoins.push(coinname);
            selectedToggleIds.push(toggleId);
        } else {
            $("#modalbody").empty();
            $(`#${toggleId}`).prop('checked', false);
            $("#modalbody").html('To add the "<b>' + coinname + '</b>" coin, you must unselect one of the following: <br>');
            $("#mymodal").css("display", "block");

            $(".close").on("click", () => {
                $("#mymodal").css("display", "none");
            });

            let counterId = 1;

            for (let i = 0; i < selectedCoins.length; i++) {

                $("#modalbody").append(`<div id="modaldiv">
                  <div class="card" id="modalcard">
                      <div class="card-body" id="modalcardbody">
                          <h6 id="modalcoinname" class="card-title">${selectedCoins[i]}</h6>
                      </div>
                  </div>
                  <label class="switch" id="modalswitch">
                  <input type="checkbox" class="checkboxes" id="chosenToggle${counterId}">
                  <span class="slider round" id="modalslider"></span>
                  </label>
              </div>`
                );

                $(`#chosenToggle${counterId}`).prop('checked', true);

                $(`#chosenToggle${counterId}`).on("change", () => {
                    let indexCoinRemove = selectedCoins.indexOf(selectedCoins[i]);
                    let ToggleTofalse = selectedToggleIds[indexCoinRemove];
                    $("#keepcurrent").on("click", () => {
                        $("#mymodal").css("display", "none");
                        selectedCoins.splice(indexCoinRemove, 1);
                        selectedToggleIds.splice(indexCoinRemove, 1);

                        selectedCoins.push(coinname);
                        selectedToggleIds.push(toggleId);
                        $(`#${ToggleTofalse}`).prop('checked', false);
                    });

                    doubleCheckToggle()
                });
                counterId++;
            }
        }
    }
}

function doubleCheckToggle() {
    for (let i = 0; i < selectedToggleIds.length; i++) {
        $(`#${selectedToggleIds[i]}`).prop('checked', true);
    }
}

