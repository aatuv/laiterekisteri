$(document).ready(function(){
    $("#dialog_rek").dialog({
        autoOpen: false,
        closeOnEscape: true,
        draggable: true,
        modal: true,
        title: "Rekisteröityminen",
        resizable: true,
        buttons: {
            "Peruuta": function() {
                $( this ).dialog( "close" );
            },
            "Rekisteröidy":function(){
                validate();
                $.ajax({});
            }
        },
    
        open: function( event, ui ) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        }
    });
    $("#register-link").click(function(){
        $("#dialog_rek").dialog("open");
    });
    $("#dialog_rek").on('click', '#save', function(){
        validate();
        if('#salasana' === '#salasana2'){
            var number = document.getElementById("puh").value;
            if(isNaN(number)){
                alert("es");
            }
            else{
                alert("e123s");
            }
        }
        else{
            alert("asdsdasdasd")
        }
    });


});
function validate()
      {
      
         if( document.rek_form.nimi.value == "" )
         {
            $('#nimityhja').show();
            document.rek_form.nimi.focus();
            return false;
         }
         
         if( document.rek_form.osoite.value == "" )
         {
            $('#nimityhja').hide();
            document.rek_form.osoite.focus();
            return false;
         }
         return( true );
      }
      
var simpleAlert = document.querySelector(".simple-alert");

simpleAlert.addEventListener("click", function (e) {
    e.preventDefault();
    injectTemplate(getBannerTemplate());
    var btnClose = document.querySelector(".banner-close");
    btnClose.addEventListener("click", function (closeEvt) {
        var banner = document.querySelector(".banner");
        banner.parentNode.removeChild(banner);
    });
    });