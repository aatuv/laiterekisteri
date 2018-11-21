$(document).ready(function () {


    $("#form_rek").validate({
        rules:
        {
            NIMI: {
                required: true,
                minlength: 4,
                maxlength: 40
            },
            OSOITE: {
                required: true,
                minlength: 4,
                maxlength: 40
            },
            TUNNUS: {
                required: true,
                minlength: 3,
                maxlength: 15,
                remote: 'http://localhost:3001/checkuser'

            },
            PUHNRO: {
                required: true,
                digits: true,
                minlength: 6,
                maxlength: 20
            },
            SALASANA: {
                required: true,
                minlength: 4
            },
            SALASANA2: {
                required: true,
                equalTo: "#idsalasana"
            }
        },

        messages:
        {
            NIMI: {
                required: "Syötä nimi.",
                minlength: "Nimen tulee olla vähintään 4 merkkiä pitkä.",
                maxlength: "Nimi saa olla enintään 40 merkkiä pitkä."
            },
            OSOITE: {
                required: "Syötä osoite.",
                minlength: "Osoitteen tulee olla vähintään 4 merkkiä pitkä.",
                maxlength: "Osoitteen saa olla enintään 40 merkkiä pitkä."
            },
            TUNNUS: {
                required: "Syötä tunnus.",
                minlength: "Tunnuksen tulee olla vähintään 3 merkkiä pitkä.",
                maxlength: "Tunnus saa olla enintään 20 merkkiä pitkä.",
                remote: "Syöttämäsi tunnus on jo käytössä!"
            },
            PUHNRO: {
                required: "Syötä puhelinnumero.",
                digits: "Puhelinnumero saa sisältää vain numeroita.",
                minlength: "Puhelinnumeron tulee olla vähintään 6 merkkiä pitkä.",
                maxlength: "Puhelinnumeron saa olla enintään 15 merkkiä pitkä."
            },
            SALASANA: {
                required: "Syötä salasana.",
                minlength: "Salasanan tulee olla vähintään 4 merkkiä pitkä."
            },
            SALASANA2: {
                required: "Vahvista syöttämäsi salasana.",
                equalTo: "Salasanat eivät ole yhteneviä."
            }
        },

        submitHandler: function (form) {
            var str = $("#form_rek").serialize();
            $.ajax(
                {
                    url: "http://localhost:3001/signup",
                    method: 'POST',
                    data: str,
                    success: (data) => {
                        console.log("Lisäys onnistui, data: " + str);
                    }
                }
            ).fail((textStatus) => {
                console.log(textStatus);
            });

            $("#dialog_rek").dialog("close");
            $("#dialog_success").dialog("open");
        }
    });

    $("#form_muuta").validate({
        rules:
        {
            NIMI: {
                required: true,
                minlength: 4,
                maxlength: 40
            },
            OSOITE: {
                required: true,
                minlength: 4,
                maxlength: 40
            },
            TUNNUS: {
                required: true,
                minlength: 3,
                maxlength: 15,
                remote: 'http://localhost:3001/checkuser'

            },
            PUHNRO: {
                required: true,
                digits: true,
                minlength: 6,
                maxlength: 20
            },
            SALASANA: {
                required: true,
                minlength: 4
            },
            SALASANA2: {
                required: true,
                equalTo: "#idsalasana"
            }
        },

        messages:
        {
            NIMI: {
                required: "Syötä nimi.",
                minlength: "Nimen tulee olla vähintään 4 merkkiä pitkä.",
                maxlength: "Nimi saa olla enintään 40 merkkiä pitkä."
            },
            OSOITE: {
                required: "Syötä osoite.",
                minlength: "Osoitteen tulee olla vähintään 4 merkkiä pitkä.",
                maxlength: "Osoitteen saa olla enintään 40 merkkiä pitkä."
            },
            TUNNUS: {
                required: "Syötä tunnus.",
                minlength: "Tunnuksen tulee olla vähintään 3 merkkiä pitkä.",
                maxlength: "Tunnus saa olla enintään 20 merkkiä pitkä.",
                remote: "Syöttämäsi tunnus on jo käytössä!"
            },
            PUHNRO: {
                required: "Syötä puhelinnumero.",
                digits: "Puhelinnumero saa sisältää vain numeroita.",
                minlength: "Puhelinnumeron tulee olla vähintään 6 merkkiä pitkä.",
                maxlength: "Puhelinnumeron saa olla enintään 15 merkkiä pitkä."
            },
            SALASANA: {
                required: "Syötä salasana.",
                minlength: "Salasanan tulee olla vähintään 4 merkkiä pitkä."
            },
            SALASANA2: {
                required: "Vahvista syöttämäsi salasana.",
                equalTo: "Salasanat eivät ole yhteneviä."
            }
        },

        submitHandler: function (form) {
            var str = $("#form_rek").serialize();
            $.ajax(
                {
                    url: "http://localhost:3001/signup",
                    method: 'POST',
                    data: str,
                    success: (data) => {
                        console.log("Lisäys onnistui, data: " + str);
                    }
                }
            ).fail((textStatus) => {
                console.log(textStatus);
            });
        }
    });

    $("#dialog_rek").dialog({
        autoOpen: false,
        closeOnEscape: true,
        draggable: false,
        modal: true,
        title: "Rekisteröityminen",
        height: 700,
        width: 1100
    });
    $("#dialog_success").dialog({
        autoOpen: false,
        draggable: false,
        modal: true,
        buttons: {
            "OK": () => {
                $("#dialog_success").dialog("close");
            }
        }
    })
    $("#dialog_muuta").dialog({
        autoOpen: false,
        closeOnEscape: true,
        draggable: false,
        modal: true,
        title: "Muuta tietoja",
        height: 700,
        width: 1100
    });

    $("#peruuta_rek").click(() => {
        $("#dialog_rek").dialog("close");
        return false;
    });

    $("#register-link").click(() => {
        $("#dialog_rek").dialog("open");
    });

    $("#a_muuta").click((user) => {
        $("#dialog_muuta").dialog("open");

        console.log(user.TUNNUS);
        $.ajax(
            {
                url: "http://localhost:3001/user",
                method: "GET",
                data: user.TUNNUS,
                dataType:'json',
                success: (data) => {
                    var user = JSON.parse(JSON.stringify(data));
                    $("#nimi").val() = user[0]["NIMI"];
                    $("#osoite").val() = user[0]["OSOITE"];
                    $("#tunnus").val() = user[0]["TUNNUS"];
                    $("#puh").val() = user[0]["PUHNRO"];

                }
            }
        )
    });

    $("#peruuta_muuta").click(() => {
        $("#dialog_muuta").dialog("close");
    });
});