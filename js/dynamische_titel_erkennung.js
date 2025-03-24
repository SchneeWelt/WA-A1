/* Diese Datei ermöglicht, dass die index.html Seite der Detail Seite den Titel Namen der 
Detailseite übergeben kann */



/* Ich füge hier eigenen Code in ein Even ein, dass immer dann geworfen wird,
wenn die Webseite geladen wird. */
window.onload = function() 
{
    onWindowEntered()
};

/* Dieses Event wird immer dann geworfen, wenn die Website geladen wird */
function onWindowEntered() 
{
    /* Zimmer Name dynamisch setzen */
    const url = window.location.href;                                                    // Aktuelle URL abrufen
    const params = new URLSearchParams(new URL(url).search);                             // URLSearchParams-Objekt erstellen
    document.getElementById("wohnung_name").innerHTML = params.get('name_der_ferienwohnung');   // Name einfügen
}
