


// let sections = Array.from(document.getElementsByClassName("section"));
// sections.push(document.createElement("section"));


// Auf der HTML Seite befindet sich ein Container element.
// Dieses Element wird hier zunächst gehohlt und anschließend 
// Automatisch mit Inhalt befüllt. 
let fewoContainer = document.getElementById("fewo_container")
fewoContainer.appendChild(buildSectionElement(0))







function buildSectionElement(fewoIndex_number)
{
    let newSection = document.createElement("section")

    // <section class=\"section_ferienwohnungen\" id=\"zimmer_1\">

    // </section>


    switch (fewoIndex_number)
    {
        case 0:

            newSection.id = "zimmer_1"
            newSection.classList.add("section_ferienwohnungen")

            newSection.innerHTML = 
                `
                    <h2>Stadtwohnung Hauptbahnhof (Zimmer 1)</h2>
            
                    <p>
                        <strong>Typ: </strong> Apartment
                    </p>
            
                    <p>
                        <strong>Stadtteil: </strong> Müncchen
                    </p>
            
                    <p>
                        <strong> Land:</strong> Deutschland
                    </p>
            
                    <p>
                        <strong>Durschnittlicher Preis: </strong>260 Euro/Nacht (Preis kann abweichen)
                    </p>
            
                    <p>
                        <strong>Bewertung: </strong> Sehr positiv, <strong>4.78</strong> Sterne bei 9 Bewertungen
                    </p>
            
                    <p>
                        <img 
                            style="max-width: 400px; max-height: 400px;"
                            src="https://a0.muscache.com/im/pictures/miso/Hosting-1015778485599549732/original/918dffb3-c9fb-45fe-b12c-073267f5d285.png?im_w=1200"
                            alt="" />
                    </p>
            
                    <p>
                        <a href="ferienwohnung_1.html?name_der_ferienwohnung=Ferienwohnung 1">
                            <button>Mehr über diese Ferienwohnung erfahren</button>
                        </a>
                    </p>
            
            `

        break;
    }



    return newSection
}