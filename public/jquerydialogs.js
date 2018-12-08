$(document).ready(() => {
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
    modal: true,
    title: "Muuta tietoja",
    height: 700,
    width: 1100
});
$("#dialog_lisaaLaite").dialog({
    autoOpen: false,
    closeOnEscape: true,
    modal: true,
    title: "Lisää laite",
    height: 800,
    width: 1100
});
$("#dialog_muokkaaLaite").dialog({
    autoOpen: false,
    closeOnEscape: true,
    modal: true,
    title: "Muokkaa laitetta",
    height: 800,
    width: 1100
});
});