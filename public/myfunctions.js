function haeKaikkiVaraukset(TUNNUS) {
    $.ajax(
        {
            url: 'http://localhost:3001/myreservations_all',
            method: 'GET',
            data: { TUNNUS: TUNNUS },
            dataType: 'json',
            success: (data) => {
                console.log(data);
                var varaukset = JSON.parse(JSON.stringify(data));
                for (let i = 0; i < varaukset.length; i++) {
                    $("#table_varaukset").append(
                        "<tr>" +
                        "<td>" + varaukset[i]["NIMI"] + "</td>" +
                        "<td>" + varaukset[i]["MERKKI"] + "</td>" +
                        "<td>" + varaukset[i]["MALLI"] + "</td>" +
                        "<td>" + varaukset[i]["SARJANUMERO"] + "</td>" +
                        "<td>" + varaukset[i]["SIJAINTI"] + "</td>" +
                        "<td>" + varaukset[i]["OMISTAJA"] + "</td>" +
                        "<td>" + varaukset[i]["KATEGORIA"] + "</td>" +
                        "<td>" + varaukset[i]["ALKUPVM"] + "</td>" +
                        "<td>" + varaukset[i]["LOPPUPVM"] + "</td>" +
                        "<td>" + varaukset[i]["STATUS"] + "</td>" +
                        "</tr>"
                    );
                }
            }
        }
    ).fail((textStatus) => {
        console.log(textStatus);
    });
}
function haeVarauksetAjalta(TUNNUS, ALKUPVM, LOPPUPVM) {
    $.ajax(
        {
            url: 'http://localhost:3001/myreservations_fromto',
            method: 'GET',
            data: {
                TUNNUS: TUNNUS,
                ALKUPVM: ALKUPVM,
                LOPPUPVM: LOPPUPVM
            },
            dataType: 'json',
            success: (data) => {
                console.log(data);
                var varaukset = JSON.parse(JSON.stringify(data));
                for (let i = 0; i < varaukset.length; i++) {
                    $("#table_varaukset").append(
                        "<tr>" +
                        "<td>" + varaukset[i]["NIMI"] + "</td>" +
                        "<td>" + varaukset[i]["MERKKI"] + "</td>" +
                        "<td>" + varaukset[i]["MALLI"] + "</td>" +
                        "<td>" + varaukset[i]["SARJANUMERO"] + "</td>" +
                        "<td>" + varaukset[i]["SIJAINTI"] + "</td>" +
                        "<td>" + varaukset[i]["OMISTAJA"] + "</td>" +
                        "<td>" + varaukset[i]["KATEGORIA"] + "</td>" +
                        "<td>" + varaukset[i]["ALKUPVM"] + "</td>" +
                        "<td>" + varaukset[i]["LOPPUPVM"] + "</td>" +
                        "<td>" + varaukset[i]["STATUS"] + "</td>" +
                        "</tr>"
                    );
                }
            }
        }
    ).fail((textStatus) => {
        console.log(textStatus);
    });
}
function haeOmistajatJaKategoriat() {
    var omistajat = [];
    var kategoriat = [];
    $.ajax(
        {
            url: "http://localhost:3001/fetch_owners",
            method: 'GET',
            success: function (data) {
                omistajat = JSON.parse(JSON.stringify(data));
                console.log(omistajat);
                for (let i = 0; i < omistajat.length; i++) {
                    $("#select_omistaja option:last").after('<option value="' + omistajat[i]["OMISTAJA_ID"] + '">' + omistajat[i]["NIMI"] + '</option>');
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
                console.log(kategoriat);
                for (let i = 0; i < kategoriat.length; i++) {
                    $("#select_kategoria option:last").after('<option value="' + kategoriat[i]["KATEGORIA_ID"] + '">' + kategoriat[i]["SELITE"] + '</option>');
                }
            }
        }
    )
}

// admin-näytössä varausten näyttäminen tietyltä aikaväliltä
$(() => {
    alkaen = $("#alkupvm").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true
    })
        .on("change", () => {
            paattyen.datepicker("option", "minDate", getDate(this));
        }),
        paattyen = $("#loppupvm").datepicker({
            dateFormat: "dd/mm/yy",
            changeMonth: true
        })
            .on("change", () => {
                alkaen.datepicker("option", "maxDate", getDate(this));
            });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }
        return date;
    }
});