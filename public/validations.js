// REKISTERÖINNIN SYÖTEKENTTIEN TARKISTUS (PERUSKÄYTTÄJÄ)
$(document).ready(() => {
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

        submitHandler: (form) => {
            var str = $("#form_rek").serialize();
            $.ajax(
                {
                    url: "http://localhost:3001/signup",
                    method: 'POST',
                    data: str,
                    success: (data) => {
                        console.log(data.sqlMessage);
                    }
                }
            ).fail((textStatus) => {
                console.log(textStatus);
            });

            $("#dialog_rek").dialog("close");
            $("#dialog_success").dialog("open");
        }
    });

    // KÄYTTÄJÄN TIETOJEN MUOKKAUKSEN TARKISTUS (PERUSKÄYTTÄJÄ)
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

        submitHandler: (form) => {
            var str = $("#form_muuta").serialize();
            console.log(str);
            $.ajax(
                {
                    url: "http://localhost:3001/updateuser",
                    method: 'PUT',
                    data: str,
                    success: (data) => {
                        console.log(data.sqlMessage);
                        console.log(data);
                    }
                }
            ).fail((textStatus) => {
                console.log(textStatus);
            });

            $("#dialog_muuta").dialog("close");
            $("#dialog_success").dialog("open");
        }
    });

    // LAITTEEN LISÄÄMISEN SYÖTEKENTTIEN TARKISTUS (ADMIN)
    $("#form_lisaaLaite").validate({
        rules:
        {
            NIMI: {
                required: true,
                minlength: 1,
                maxlength: 40
            },
            MERKKI: {
                required: true,
                minlength: 1,
                maxlength: 40
            },
            MALLI: {
                required: true,
                minlength: 1,
                maxlength: 40
            },
            SARJANRO: {
                required: true,
                digits: true,
                minlength: 4
            },
            SIJAINTI: {
                required: true,
                minlength: 4,
                maxlength: 50
            },
            OMISTAJA_ID: {
                required: true
            },
            KATEGORIA_ID: {
                required: true
            }
        },

        messages:
        {
            NIMI: {
                required: "Syötä nimi.",
                minlength: "Vähimmäispituus 1",
                maxlength: "Enimmäispituus 40"
            },
            MERKKI: {
                required: "Syötä merkki.",
                minlength: "Vähimmäispituus 1",
                maxlength: "Enimmäispituus 40"
            },
            MALLI: {
                required: "Syötä malli.",
                minlength: "Vähimmäispituus 1",
                maxlength: "Enimmäispituus 40"
            },
            SARJANRO: {
                required: "Syötä sarjanumero.",
                digits: "Vain numerot kelpaavat",
                minlength: "Vähimmäispituus 4"
            },
            SIJAINTI: {
                required: "Syötä sijainti.",
                minlength: "Vähimmäispituus 1",
                maxlength: "Enimmäispituus 50"
            },
            OMISTAJA_ID: {
                required: "Syötä omistaja."
            },
            KATEGORIA_ID: {
                required: "Syötä kategoria."
            }
        },

        submitHandler: (form) => {
            var str = $("#form_lisaaLaite").serialize();
            console.log(str);
            $.ajax(
                {
                    url: "http://localhost:3001/add_gadget",
                    method: 'POST',
                    data: str,
                    success: (data) => {
                        console.log(data.sqlMessage);
                        console.log(data);
                    }
                }
            ).fail((textStatus) => {
                console.log(textStatus);
            });

            $("#dselect_omistaja").empty();
            $("#dselect_kategoria").empty();
            $("#dialog_lisaaLaite").dialog("close");
            $("#admin_hae_laitteet").click();
            location.reload();
        }
    });

    // LAITTEEN TIETOJEN MUOKKAUKSEN SYÖTEKENTTIEN TARKISTUS (ADMIN)
    $("#form_muokkaaLaite").validate({
        rules:
        {
            NIMI: {
                required: true,
                minlength: 1,
                maxlength: 40
            },
            MERKKI: {
                required: true,
                minlength: 1,
                maxlength: 40
            },
            MALLI: {
                required: true,
                minlength: 1,
                maxlength: 40
            },
            SARJANRO: {
                required: true,
                digits: true,
                minlength: 4
            },
            SIJAINTI: {
                required: true,
                minlength: 4,
                maxlength: 50
            },
            OMISTAJA_ID: {
                required: true
            },
            KATEGORIA_ID: {
                required: true
            }
        },

        messages:
        {
            NIMI: {
                required: "Syötä nimi.",
                minlength: "Vähimmäispituus 1",
                maxlength: "Enimmäispituus 40"
            },
            MERKKI: {
                required: "Syötä merkki.",
                minlength: "Vähimmäispituus 1",
                maxlength: "Enimmäispituus 40"
            },
            MALLI: {
                required: "Syötä malli.",
                minlength: "Vähimmäispituus 1",
                maxlength: "Enimmäispituus 40"
            },
            SARJANRO: {
                required: "Syötä sarjanumero.",
                digits: "Vain numerot kelpaavat",
                maxlength: "Enimmäispituus 20"
            },
            SIJAINTI: {
                required: "Syötä sijainti.",
                minlength: "Vähimmäispituus 1",
                maxlength: "Enimmäispituus 50"
            },
            OMISTAJA_ID: {
                required: "Syötä omistaja."
            },
            KATEGORIA_ID: {
                required: "Syötä kategoria."
            }
        },

        submitHandler: (form) => {
            var str = $("#form_muokkaaLaite").serialize();
            console.log(str);
            $.ajax(
                {
                    url: "http://localhost:3001/update_gadget",
                    method: 'PUT',
                    data: str,
                    success: (data) => {
                        console.log(data.sqlMessage);
                        console.log(data);
                    }
                }
            ).fail((textStatus) => {
                console.log(textStatus);
            });

            $("#dialog_muokkaaLaite").dialog("close");
            $("#hae_laitteet").click();
        }
    });

    $("#form_varaaLaite").validate({
        rules:
        {
            ALKUPVM: {
                required: true
            },
            LOPPUPVM: {
                required: true
            }
        },

        messages:
        {
            ALKUPVM: {
                required: "Syötä alkupäivämäärä."
            },
            LOPPUPVM: {
                required: "Syötä loppupäivämäärä."
            }
        },

        submitHandler: (form) => {
            var str = $("#form_varaaLaite").serialize();
            console.log(str);
            $.ajax(
                {
                    url: "http://localhost:3001/reserve_a_gadget",
                    method: 'POST',
                    data: str,
                    success: (data) => {
                        console.log(data.sqlMessage);
                        console.log(data);
                    }
                }
            ).fail((textStatus) => {
                console.log(textStatus);
            });

            $("#dialog_varaa").dialog("close");
            $("#nayta_varaukset").click();
            $("#hae_laitteet").click();
        }
    });
});