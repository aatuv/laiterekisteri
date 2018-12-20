$(document).ready(() => {

    // /myfunctions.js
    haeOmistajatJaKategoriat();

    $("#table_adminlai").ready(() => {
        $("#admin_hae_laitteet").click();
    });
    $("#table_varaukset").ready(() => {
        var TUNNUS;
        $.getJSON("http://localhost:3001/current_user", (data) => {
            if (data.hasOwnProperty('username')) {
                $("#kayttajatunnus").val(data.username);
                $("#nayta_varaukset").click();
            }
        });
        $("#nayta_varaukset").click();
    });

    $("#nayta_varaukset").click(() => {
        $("#table_varaukset").empty();
        let TUNNUS = $("#kayttajatunnus").val();
        let ALKUPVM = $("#alkupvm").val();
        let LOPPUPVM = $("#loppupvm").val();
        $.ajax(
            {
                url: 'http://localhost:3001/myreservations',
                method: 'GET',
                data: {
                    TUNNUS: TUNNUS,
                    ALKUPVM: ALKUPVM,
                    LOPPUPVM: LOPPUPVM
                },
                dataType: 'json',
                success: (data) => {
                    var varaukset = JSON.parse(JSON.stringify(data));
                    for (let i = 0; i < varaukset.length; i++) {
                        $("#table_varaukset").append(
                            "<tr>" +
                            "<td>" + varaukset[i]["NIMI"] + "</td>" +
                            "<td>" + varaukset[i]["MERKKI"] + "</td>" +
                            "<td>" + varaukset[i]["MALLI"] + "</td>" +
                            "<td>" + varaukset[i]["SARJANRO"] + "</td>" +
                            "<td>" + varaukset[i]["SIJAINTI"] + "</td>" +
                            "<td>" + varaukset[i]["OMISTAJA"] + "</td>" +
                            "<td>" + varaukset[i]["KATEGORIA"] + "</td>" +
                            "<td>" + varaukset[i]["ALKUPVM"] + "</td>" +
                            "<td>" + varaukset[i]["LOPPUPVM"] + "</td>" +
                            "<td>" + varaukset[i]["STATUS"] + "</td>" +
                            '<td><button id="muokkaa_varaus" class="button-green" value="' + varaukset[i]["VARAUS_ID"] + '">Muokkaa</button></td>' +
                            '<td><button id="poista_varaus" class="button-cancel" value="' + varaukset[i]["VARAUS_ID"] + '">Poista</button></td>' +
                            "</tr>"
                        );
                    }
                }
            }
        )
    })

    $("#peruuta_rek").click(() => {
        $("#dialog_rek").dialog("close");
        return false;
    });

    $("#register-link").click(() => {
        $("#dialog_rek").dialog("open");
    });

    $("#a_logout").click(() => {
        alert("Olet nyt kirjautunut ulos.");
    });

    $("#a_muuta").click(() => {
        $("#dialog_muuta").dialog("open");
        $.getJSON("http://localhost:3001/current_user", (data) => {
            if (data.hasOwnProperty('username')) {
                $("#nimi").val(data.name);
                $("#osoite").val(data.address);
                $("#puh").val(data.telephone);
                $("#tunnus").val(data.username);
            }
        });
    });

    $("#peruuta_muuta").click(() => {
        $("#dialog_muuta").dialog("close");
        return false;
    });

    $(() => {
        alku = $("#alkupvm").datepicker({
            dateFormat: "yy-mm-dd",
            changeMonth: true,
            minDate: 0
        })
            .change(() => {
                loppu.datepicker("option", "minDate", getDate(this));
            })
        loppu = $("#loppupvm").datepicker({
            dateFormat: "yy-mm-dd",
            changeMonth: true
        })
            .change(() => {
                alku.datepicker("option", "maxDate", getDate(this));
            });

        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(element.dateFormat, element.value);
            } catch (error) {
                date = null;
            }
            return date;
        }
    });

    $("#admin_hae_laitteet").click(() => {
        $("#table_adminlai td").parent().remove();
        $.ajax(
            {
                url: 'http://localhost:3001/admin_gadgets',
                method: 'GET',
                data: {
                    NIMI: $("#NIMI").val(),
                    MERKKI: $("#MERKKI").val(),
                    MALLI: $("#MALLI").val(),
                    SARJANRO: $("#SARJANRO").val(),
                    SIJAINTI: $("#SIJAINTI").val(),
                    OMISTAJA_ID: $("#select_omistaja").val(),
                    KATEGORIA_ID: $("#select_kategoria").val()
                },
                dataType: 'json',
                success: (data) => {
                    var laitteet = JSON.parse(JSON.stringify(data));
                    for (let i = 0; i < laitteet.length; i++) {
                        $("#table_adminlai").append(
                            "<tr>" +
                            "<td>" + laitteet[i]["NIMI"] + "</td>" +
                            "<td>" + laitteet[i]["MERKKI"] + "</td>" +
                            "<td>" + laitteet[i]["MALLI"] + "</td>" +
                            "<td>" + laitteet[i]["SARJANRO"] + "</td>" +
                            "<td>" + laitteet[i]["SIJAINTI"] + "</td>" +
                            "<td>" + laitteet[i]["OMISTAJA"] + "</td>" +
                            "<td>" + laitteet[i]["KATEGORIA"] + "</td>" +
                            '<td><button id="muokkaa_laite" class="button-green" value="' + laitteet[i]["LAITE_ID"] + '">Muokkaa</button>' +
                            '<td><button id="poista_laite" class="button-cancel" value="' + laitteet[i]["LAITE_ID"] + '">Poista</button>' +
                            "</tr>"
                        );
                    }
                }
            }
        ).fail((textStatus) => {
            console.log(textStatus);
        });
    })

    $("#lisaa_laite").click(() => {

        // nollataan dialogin kenttien arvot
        $("#lisaanimi").val("");
        $("#lisaamerkki").val("");
        $("#lisaamalli").val("");
        $("#lisaasarjanro").val("");
        $("#lisaasijainti").val("");
        // avataan dialogi
        $("#dialog_lisaaLaite").dialog("open");
        var omistajat = [];
        var kategoriat = [];
        $.ajax(
            {
                url: "http://localhost:3001/fetch_owners",
                method: 'GET',
                cache: false,
                success: function (data) {
                    omistajat = JSON.parse(JSON.stringify(data));
                    for (let i = 0; i < omistajat.length; i++) {
                        $("#dselect_omistaja option:last").after('<option value="' + omistajat[i]["OMISTAJA_ID"] + '">' + omistajat[i]["NIMI"] + '</option>');
                    }
                }
            }
        )
        $.ajax(
            {
                url: "http://localhost:3001/fetch_categories",
                method: 'GET',
                cache: false,
                success: function (data) {
                    kategoriat = JSON.parse(JSON.stringify(data));
                    for (let i = 0; i < kategoriat.length; i++) {
                        $("#dselect_kategoria option:last").after('<option value="' + kategoriat[i]["KATEGORIA_ID"] + '">' + kategoriat[i]["SELITE"] + '</option>');
                    }
                }
            }
        )
    });

    $("#peruuta_lisaaLaite").click(() => {
        $("#dialog_lisaaLaite").dialog("close");
        $("#dselect_omistaja").empty();
        $("#dselect_kategoria").empty();
        return false;
    });

    $(document).on("click", "[id^='muokkaa_laite']", (event) => {
        let laiteid = event.target.value;
        let laite = [];
        $.ajax(
            {
                url: "http://localhost:3001/thisgadget",
                method: 'GET',
                data: { LAITE_ID: laiteid },
                success: (data) => {
                    laite = JSON.parse(JSON.stringify(data));
                    $("#muokkaanimi").val(laite[0]["NIMI"]);
                    $("#muokkaamerkki").val(laite[0]["MERKKI"]);
                    $("#muokkaamalli").val(laite[0]["MALLI"]);
                    $("#muokkaasarjanro").val(laite[0]["SARJANRO"]);
                    $("#muokkaasijainti").val(laite[0]["SIJAINTI"]);
                    $("#dmselect_omistaja").val(laite[0]["OMISTAJA_ID"]);
                    $("#dmselect_kategoria").val(laite[0]["KATEGORIA_ID"]);

                }
            }
        )
        $.ajax(
            {
                url: "http://localhost:3001/fetch_owners",
                method: 'GET',
                success: function (data) {
                    omistajat = JSON.parse(JSON.stringify(data));
                    for (let i = 0; i < omistajat.length; i++) {
                        $("#dmselect_omistaja option:last").after('<option value="' + omistajat[i]["OMISTAJA_ID"] + '">' + omistajat[i]["NIMI"] + '</option>');
                    }
                }
            }
        )
        $.ajax(
            {
                url: "http://localhost:3001/fetch_categories",
                method: 'GET',
                success: function (data) {
                    kategoriat = JSON.parse(JSON.stringify(data));
                    for (let i = 0; i < kategoriat.length; i++) {
                        $("#dmselect_kategoria option:last").after('<option value="' + kategoriat[i]["KATEGORIA_ID"] + '">' + kategoriat[i]["SELITE"] + '</option>');
                    }
                }
            }
        )
        $("#dialog_muokkaaLaite").dialog("open");
    });

    $(document).on("click", "[id^='poista_laite']", (event) => {
        let LAITE_ID = event.target.value;
        $.ajax(
            {
                url: "http://localhost:3001/delete_gadget/" + LAITE_ID,
                method: 'DELETE',
                success: function (data) {
                },
                error: function (err) {
                }
            }
        )
        $("#admin_hae_laitteet").click();
    });
    $("#peruuta_muokkaaLaite").click(() => {
        $("#dialog_muokkaaLaite").dialog("close");
        return false;
    });

    $("#table_laitteet").ready(() => {
        $("#hae_laitteet").click();
    });
    $("#hae_laitteet").click(() => {
        $("#table_laitteet td").parent().remove();
        $.ajax(
            {
                url: 'http://localhost:3001/gadgets',
                method: 'GET',
                data: {
                    NIMI: $("#NIMI").val(),
                    MERKKI: $("#MERKKI").val(),
                    MALLI: $("#MALLI").val(),
                    SARJANRO: $("#SARJANRO").val(),
                    SIJAINTI: $("#SIJAINTI").val(),
                    OMISTAJA_ID: $("#select_omistaja").val(),
                    KATEGORIA_ID: $("#select_kategoria").val()
                },
                dataType: 'json',
                success: (data) => {
                    var laitteet = JSON.parse(JSON.stringify(data));
                    for (let i = 0; i < laitteet.length; i++) {
                        $("#table_laitteet").append(
                            "<tr>" +
                            "<td>" + laitteet[i]["NIMI"] + "</td>" +
                            "<td>" + laitteet[i]["MERKKI"] + "</td>" +
                            "<td>" + laitteet[i]["MALLI"] + "</td>" +
                            "<td>" + laitteet[i]["SARJANRO"] + "</td>" +
                            "<td>" + laitteet[i]["SIJAINTI"] + "</td>" +
                            "<td>" + laitteet[i]["OMISTAJA"] + "</td>" +
                            "<td>" + laitteet[i]["KATEGORIA"] + "</td>" +
                            '<td><button id="varaa_laite" class="button-green" value="' + laitteet[i]["LAITE_ID"] + '">Varaa</button>' +
                            "</tr>"
                        );
                    }
                }
            }
        ).fail((textStatus) => {
            console.log(textStatus);
        });
    })

    $(document).on("click", "[id^='varaa_laite']", (event) => {
        $("#dialog_varaa").dialog("open");
        $("#admin_hae_laitteet").click();
        $("#laite_id").val(event.target.value);
        $.getJSON("http://localhost:3001/current_user", (data) => {
            if (data.hasOwnProperty('username')) {
                var tunnus = data.username;
                $.ajax(
                    {
                        url: "http://localhost:3001/user",
                        method: "GET",
                        data: { TUNNUS: tunnus },
                        success: (data) => {
                            var kayttaja = JSON.parse(JSON.stringify(data));
                            $("#kayttaja_id").val(kayttaja[0]["KAYTTAJA_ID"]);
                        }
                    }
                )
            }
        });
    });

    $("#peruuta_varaa").click(() => {
        $("#dialog_varaa").dialog("close");
        return false;
    })
    $(() => {
        alkaen = $("#v_alkupvm").datepicker({
            dateFormat: "yy-mm-dd",
            changeMonth: true,
            minDate: 0,
            onSelect: () => {
                $("#v_loppupvm").datepicker("option", "minDate", $("#v_alkupvm").datepicker("getDate"));
            }
        })
        paattyen = $("#v_loppupvm").datepicker({
            dateFormat: "yy-mm-dd",
            changeMonth: true,
            mindate: alkaen.datepicker("getDate"),
            onSelect: () => {
                $("#v_alkupvm").datepicker("option", "maxDate", $("#v_loppupvm").datepicker("getDate"));
            }
        })
    });

    $(document).on("click", "[id^='poista_varaus']", (event) => {
        let VARAUS_ID = event.target.value;

        $.ajax(
            {
                url: "http://localhost:3001/delete_reservation/" + VARAUS_ID,
                method: "DELETE",
                success: function (data) {
                },
                error: function (err) {
                }
            }
        )
        $("#nayta_varaukset").click();
    });
});