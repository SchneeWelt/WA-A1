
/* Die nachfoldene JS Datei regelt einen kleinen Spaß den ich mir erlaubt habe. 
Hier wird realisiert, dass der Text des Buttons für die Detailseite der Bruchbude
eine Warnung anzeigt, sobald man die Maus über den Button hält. */

function changeButtonText()
{
    document.getElementById("button").innerHTML = "Tu's nicht";
}

function changeItBack()
{
    document.getElementById("button").innerHTML = "Mehr über diese Ferienwohnung erfahren";
}
