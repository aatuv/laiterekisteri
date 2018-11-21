$(document).ready(function(){
    $("#dialog_rek").dialog({
        autoOpen: false,
        closeOnEscape: true,
        draggable: true,
        modal: true,
        title: "Rekisteröityminen",
        resizable: false,
        width: 400,
        buttons: {
            "1": { 
                id: 'peruuta', 
                text: 'Peruuta', 
                click: function(){ 
                    $(this).dialog("close"); 
                }, class:"button-green" 
            },
            "2": { 
                id: 'rekisteröidy', 
                text: 'Rekisteröidy', 
                click: function(){ 
                    if(validate() == true){
                        if(lisaaKayttaja()){
                            tyhjenna();
                            $(this).dialog("close"); 
                        }
                    }
                }, class:"button-green" 
            }
        },

        open: function( event, ui ) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        },
        close: function() {
            tyhjenna();
        }
    });
    $("#register-link").click(function(){
        $("#dialog_rek").dialog("open");
    });

});
function lisaaKayttaja(){
    //lähetettävä data
    var formData = {
        nimi : $("#nimi").val(),
        osoite :  $("#osoite").val(),
        tunnus :  $("#tunnus").val(),
        salasana :  $("#salasana").val(),
        salasana2 :  $("#salasana2").val(),
        puh :  $("#puh").val()
    }
    console.log(JSON.stringify(formData));
    console.log('lisätään käyttäjä');
    var url = 'http://localhost:3001/signup';
    // DO POST
    $.ajax({
        type: "POST",
        url: url,
        contentType : "application/json",
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function(data) {
            console.log('success');
            console.log(JSON.stringify(data));
        },
        error : function(e) {
            alert("Virhe!")
            console.log("ERROR: ", e);
        }
      });
}
var i = 0;
// testataan onko arvot ok
function validate(){
    if(i < 1){
      $("#info_").fadeTo(1500, 500).slideUp(500, function(){
        $("#info_").slideUp(500);
         });
         i++;
    } 
    $("#nimi").addClass('errors');
    $("#osoite").addClass('errors');
    $("#tunnus").addClass('errors');
    $("#salasana").addClass('errors');
    $("#salasana2").addClass('errors');
    $("#puh").addClass('errors');
    //nimi
    if( document.rek_form.nimi.value == "" ){
        $('#nimityhja').show();
        document.rek_form.nimi.focus();
        return false;
    }
    else if( document.rek_form.nimi.value != "" ){
        $("#nimi").addClass('def');
        $('#nimityhja').hide();
    }
    //osoite   
    if( document.rek_form.osoite.value == "" ){
        $('#osoitetyhja').show();
        document.rek_form.osoite.focus();
        return false;
    }
    else if( document.rek_form.osoite.value != "" ){
        $("#osoite").addClass('def');
        $('#osoitetyhja').hide();
    }
    //tunnus
    if( document.rek_form.tunnus.value == "" ){
        $('#tunnustyhja').show();
        document.rek_form.tunnus.focus();
        return false;
    }
    else if( document.rek_form.tunnus.value != "" ){
        if (/^[A-Za-z0-9]+$/.test(document.rek_form.tunnus.value)){
            $('#tunnuskirnum').hide();
            if(document.rek_form.tunnus.value > 10 && document.rek_form.tunnus.value < 4){
                $('#tunnuspitkalyhyt').show();
                return false;
            }
            else{
                $("#tunnus").addClass('def');
                $('#tunnuspitkalyhyt').hide();
            }
        }
        else {
            $('#tunnuskirnum').show();
            return false;
        }
        $('#tunnustyhja').hide(); 
    }
    //salasana
    if( document.rek_form.salasana.value == "" ){
        $('#salasanatyhja').show();
        document.rek_form.salasana.focus();
        return false;
    }
    else if( document.rek_form.salasana.value != "" ){
        if (/^[A-Za-z0-9]+$/.test(document.rek_form.salasana.value)){
            $('#salasanakirnum').hide();
            if(document.rek_form.salasana.value > 10 && document.rek_form.salasana.value < 4){
                $('#salasanapitkalyhyt').show();
                return false;
            }
            else{
            $("#salasana").addClass('def');
            $('#salasanapitkalyhyt').hide();
            }
        }
        else {
            $('#salasanakirnum').show();
            return false;
        }
        $('#salasanatyhja').hide();
    }
    //salasana2
    if( document.rek_form.salasana2.value == "" ){
        $('#salasana2tyhja').show();
        document.rek_form.salasana2.focus();
        return false;
    }
    else if( document.rek_form.salasana2.value != "" ){
        $('#salasana2tyhja').hide();
        //onko samat
        if( document.rek_form.salasana2.value != document.rek_form.salasana.value  ){
            $('#salasanaeitasma').show();
            document.rek_form.salasana2.focus();
            return false;
        }
        else if( document.rek_form.salasana2.value == document.rek_form.salasana.value  ){
            $("#salasana2").addClass('def');
            $('#salasanaeitasma').hide();
        }
    }
    //puh
    if( document.rek_form.puh.value == "" ){
        $('#puhnrotyhja').show();
        document.rek_form.puh.focus();
        return false;
    }
    else if( document.rek_form.puh.value != "" ){
        $('#puhnrotyhja').hide();
        if(testNumbers() == true){
            $("#puh").addClass('def');
        }
    }
    
    $('#nimityhja').hide();
    $('#osoitetyhja').hide();
    $('#tunnustyhja').hide();
    $('#salasanatyhja').hide();
    $('#salasana2tyhja').hide();
    $('#puhnrotyhja').hide();
    $('#salasanaeitasma').hide();

    return( true );
}
function testNumbers(){
    var n = document.rek_form.puh.value;
    if (isNaN(n)){
        $('#puhnroeinumero').show();
        return false;
    }
    if(n.length > 12){
        $('#puhnroliianpitka').show();
        return false;
    }
    $('#puhnroeinumero').hide();
    $('#puhnroliianpitka').hide();
    return( true );
  }
  function tyhjenna(){
    $("#nimi").val("");
    $("#osoite").val("");
    $("#tunnus").val("");
    $("#salasana").val("");
    $("#salasana2").val("");
    $("#puh").val("");
  }