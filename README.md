# Labore zum Modul Webanwendungen

Dieses Dokument ist eine Anleitung zur Installation der in diesem Modul verwendeten Software. Außerdem werden Hinweise zur Entwicklung mit der Software gegeben.

## 1. Einführung

In den Laboren in diesem Modul wird Sotware geschrieben, die auf einem *Webserver* gehostet wird und auf einem *Clientcomputer* dargestellt bzw. interpretiert wird.
Zur Darstellung wird der *Webbrowser* des eigenen Computers verwendet.
In diesem Modul wird als *Webserver* ebenfalls der eigene Computer verwendet.
Während auf dem eigenen Computer ein *Webbrowser* in der Regel bereits installiert ist, muss als *Webserver* eine zusätzliche Software installiert werden.
Es gibt verschiedene Webserversoftware, die am meisten verbreiteten sind *[Apache HTTP Server](https://www.apache.org/)*, *[nginx](https://nginx.org/)*, *[Microsoft Internet Information Services](https://www.iis.net/)* und *[Google Web Server](https://de.wikipedia.org/wiki/Google_Web_Server)*.

In diesem Labor wird in Aufgaben 1 und 2 das Frontend mit *HTML*, *CSS* und *JavaScript* entwickelt.
Es wird *nginx* als Webserver verwendet.
Dieser hat ein schlankes Design und eignet sich insbesondere zur Auslieferung statischer Inhalte wie *Bilder*, *CSS* Dateien oder *JavaScript* Dateien.
In Aufgabe 4 wird zusätzlich das Backend programmiert.
Klassisch kommen im Backend Sprachen wie *PHP*, *Perl*, *Python* und andere zum Einsatz.
Um im Backend ebenfalls (wie auch im Frontend) *JavaScript* verwenden zu können, wird hier *[Node.js](https://nodejs.org/)* verwendet.
*Node.js* ist eine *JavaScript* Laufzeitumgebung, die beispielsweise das Erstellen eines Webservers ermöglicht.
Neben dem integrierten *[http-Modul](https://nodejs.org/api/http.html)* existieren Webframeworks für *Node.js*, die das Erstellen eines voll funktionalen Webservers erleichtern.
Ein Beispiel für ein Webframework ist *[Express](https://expressjs.com/)*.

## 2. Installation der Serversoftware

Um eine gemeinsame Basis zu haben, die Betriebssysteme Windows, Linux (verschiedene Distributionen) und MacOS zu unterstützen und den Konfigurationsaufwand gering zu halten, wird die containerbasierte Installation der Serversoftware mittels [*Docker*](https://www.docker.com/) empfohlen.
Bei der Containerisierung wird Software-Code mit Betriebssystem-Bibliotheken und weiteren zur Ausführung des Codes erforderlichen Abhängigkeiten in einem Container verpackt, der danach auf jeder Infrastruktur ausgeführt werden kann.
Containerisierung werden Sie in verschiedenen Modulen näher kennenlernen und soll hier nur als Werkzeug genutzt werden.
Im Folgenden ist eine Anleitung zur Installation der Serversoftware mittels Docker gegeben.

### 2.1 Installation von Docker

Von der [Docker Webseite](https://www.docker.com/) kann *Docker Desktop* heruntergeladen und anschließend installiert werden.
Nähere Informationen bietet die [Docker Dokumentation](https://docs.docker.com/).

Unter dem Betriebssystem **Linux** (verschiedene Distributionen) kann alternativ die *Docker Engine* verwendet werden.
Es muss allerdings sichergestellt werden, dass der `docker` Befehl ohne *root* Rechte ausgeführt werden kann: `sudo usermod -aG docker $USER && sudo reboot now`

### 2.2 Installation der Webserversoftware nginx

In diesem Unterkapitel wird die Installation der Webserversoftware *nginx* für verschiedene Betriebssysteme beschrieben. *Docker Desktop* muss gestartet sein bzw. die *Docker Engine* laufen.

Für das Betriebssystem **Windows** wird in der Windows PowerShell folgender Befehl ausgeführt:
```
cd ~; New-Item -ItemType Directory -Force -Path webcode_nginx; docker run -d --name nginx -p 8080:80 -v $PWD/webcode_nginx:/usr/share/nginx/html --restart always --entrypoint "/bin/bash" nginx:1.27-bookworm -c "apt-get update && apt-get install -y git && nginx -g 'daemon off;'"
```

Für die Betriebssysteme **Linux** (verschiedene Distributionen) und **MacOS** wird in einer Shell folgender Befehl ausgeführt:
```
mkdir -p ~/webcode_nginx && docker run -d --name nginx -p 8080:80 -v ~/webcode_nginx:/usr/share/nginx/html --restart always --entrypoint "/bin/bash" nginx:1.27-bookworm -c "apt-get update && apt-get install -y git && nginx -g 'daemon off;'"
```

Der so erzeugte Container mit dem Namen `nginx` wird im Folgenden *nginx-Container* genannt.
Das Webverzeichnis des Webservers `/usr/share/nginx/html` wird dabei in den Ordner `~/webcode_nginx` auf Ihrem Computer gemapped.
Der *nginx*-Webserver läuft standardmäßig auf Port 80; der Port für die Host-Maschine, hier 8080, ist wiederum frei wählbar.
Typischerweise wird hierbei der Port 8080 verwendet, um Kollisionen zu vermeiden.
In einem Webbrowser ist der *nginx*-Webserver dann unter der Adresse `localhost:8080` erreichbar.
Den laufenden Container können Sie auch über *Docker Desktop* einsehen und bei Bedarf stoppen und wieder starten.

*Hinweis für den ersten Aufruf von nginx in einem Webbrowser nach der Installation*

Wenn Sie den *nginx*-Webserver installiert haben und ihn starten, können Sie ihn in einem Browser unter `localhost:8080` aufrufen.
Wenn der Server korrekt installiert ist, aber noch keine `index.html`-Datei vorhanden ist, zeigt der Browser die Meldung *403 Forbidden* an.
Diese Meldung bedeutet nicht, dass ein Fehler vorliegt. Der Server funktioniert einwandfrei, aber *nginx* versucht, die standardmäßige Startseite (`index.html`) auszuliefern. Da jedoch keine solche Datei im Verzeichnis vorhanden ist, verweigert der Server den Zugriff (*403 Forbidden*).

### 2.3 Installation von Node.js

In diesem Unterkapitel wird die Installation von *Node.js* für verschiedene Betriebssysteme beschrieben. *Docker Desktop* muss gestartet sein bzw. die *Docker Engine* laufen.

Für das Betriebssystem **Windows** wird in der Windows PowerShell folgender Befehl ausgeführt:
```
cd ~; New-Item -ItemType Directory -Force -Path webcode_nodejs; docker run -d -t --name nodejs -p 8081:80 -v $PWD/webcode_nodejs:/code --restart always node:22-bookworm
```

Für die Betriebssysteme **Linux** (verschiedene Distributionen) und **MacOS** wird in einer Shell folgender Befehl ausgeführt:
```
mkdir -p ~/webcode_nodejs && docker run -d -t --name nodejs -p 8081:80 -v ~/webcode_nodejs:/code --restart always node:22-bookworm
```

Der so erzeugte Container mit dem Namen `nodejs` wird im Folgenden *Node.js-Container* genannt.
Der Ordner `/code` im *Node.js-Container* wird hierbei in den Ordner `~/webcode_nodejs` auf Ihrem Computer gemapped.
Ein *Node.js*-basierter Webserver kann an jeden beliebigen Port gebunden werden (etwa Port 80, 3000, 5000), muss jedoch in diesem Container an Port 80 gebunden werden (damit das Portmapping funktioniert).
Der Port für die Host-Maschine, hier 8081, ist wiederum frei wählbar.
Typischerweise wird hierbei der Port 8080, 8081, etc. verwendet, um Kollisionen zu vermeiden (ggf. parallel laufende Webserver-Container beachten).
In einem Webbrowser ist ein *Node.js*-basierter Webserver dann unter der Adresse `localhost:8081` erreichbar.
Den laufenden Container können Sie auch über *Docker Desktop* einsehen und bei Bedarf stoppen und wieder starten.

*Hinweis für den ersten Aufruf von Node.js in einem Webbrowser nach der Installation*

Beim Aufruf von `localhost:8081` in einem Webbrowser wird eine Meldung wie *localhost hat keine Daten gesendet* angezeigt.
Diese Meldung bedeutet nicht, dass ein Fehler vorliegt.
*Node.js* ist zwar installiert, aber es läuft noch keine Anwendung (z.B. ein HTTP-Server) in *Node.js*.
Daher werden auch keine Daten angezeigt.

## 3. Entwicklung mit Visual Studio Code und Git

*Visual Studio Code* ist ein gerade in der Webentwicklung häufig genutzter Quellcode-Editor.
Zur Bearbeitung der Aufgaben 1 und 2 können Sie im Verzeichnis `~/webcode_nginx` auf Ihrem lokalen System arbeiten.
Zur Bearbeitung der Aufgabe 4 sollten Sie **in dem** *Node.js-Container* arbeiten - optional ist es bei Aufgaben 1 und 2 ebenfalls möglich, in dem *nginx-Container* zu arbeiten.
Nachfolgend sind Hinweise zur Nutzung von Visual Studio Code gegeben.
Voraussetzung ist, dass *[Visual Studio Code](https://code.visualstudio.com/)* installiert ist.

### 3.1 Bearbeitung von Projekten

1. Erstellen Sie eine Kopie des Projekts in Ihrem Arbeitsbereich:
    - Öffnen Sie dazu das gewünschte [GitLab](https://gitlab.iue.fh-kiel.de/)-Projekt und klicken Sie auf die Schaltfläche *Fork* (oben rechts auf der Projektseite). 
    - Wählen Sie einen Namespace und tragen einen Namen als *Project slug* ein und wählen die Schaltfläche *Fork project*. Dadurch erstellen Sie eine eigene Kopie des Projekts mit dem Namen *<Name_des_Forks>* in einem Namespace.
    - Diese Kopie ist unabhängig vom ursprünglichen Projekt und dient als Ihr persönlicher Arbeitsbereich.
    - *<Name_des_Forks>* wird später benötigt, um das Projekt im Webbrowser aufzurufen.

2. Kopieren Sie den HTTPS-Link zum Klonen des Projekts.
    - Öffnen Sie in Ihrem geforkten Projekt das Dropdown-Menü *Code* und kopieren Sie den Link, der unter *Clone with HTTPS* angezeigt wird.
    - Der Link wird später benötigt, um das Projekt auf Ihrem Computer zu bearbeiten.
    - Unter Umständen benötigen Sie für die Authentifikation ein Access-Token von GitLab, welches Sie als Passwort in Kombination mit Ihrem GitLab-User nutzen. Das Token können Sie in Ihrem geforkten Projekt unter `Settings > Access Tokens` erstellen. 

### 3.2 Entwicklung auf dem lokalen System

```
Achtung: nur bei Aufgaben 1 und 2 bei Verwendung des nginx-Containers
```

1. *[Git](https://git-scm.com/)* muss installiert sein.
2. Visual Studio Code starten.
3. Im Visual Studio Code Fenster auf der linken Seite *Source Control* öffnen und *Clone Repository* wählen.
4. Den zuvor kopierten Link zu dem GitLab-Repository einfügen und als Zielordner den Ordner `~/webcode_nginx` wählen.
5. Den Ordner `~/webcode_nginx/<Name_des_Forks>` in Visual Studio Code öffnen.
6. Eine Datei anlegen oder öffnen und editieren.
7. In einem Webbrowser können Sie Ihr Projekt unter `localhost:8080/<Name_des_Forks>` aufrufen.
8. In dem *Source Control* Bereich in Visual Studio Code können Sie Ihre Commits verwalten und die Synchronisation mit GitLab sicherstellen.

### 3.3 Entwicklung in einem Docker Container

```
Achtung: optional bei Aufgaben 1 und 2, erforderlich bei Aufgabe 4
```

1. Visual Studio Code starten.
2. In der *Activity Bar* (standardmäßig auf der linken Seite im Visual Studio Code Fenster) den Bereich *Extensions* öffnen und die Erweiterung *Dev Containers* installieren.
3. Mit der Taste *F1* die Erweiterung *Dev Containers: Attach to Running Container...* wählen und den Container *nginx* bzw. *nodejs* auswählen.
4. Ein neues Visual Studio Code Fenster für den Container öffnet sich. Dieses wird im Folgenden *ContainerVSC* genannt.
5. Im ContainerVSC Fenster auf der linken Seite *Source Control* öffnen und *Clone Repository* wählen.
6. Den zuvor kopierten Link zu dem GitLab Repository einfügen und einen Namen für dieses festlegen. Als Zielordner den Ordner im ContainerVSC `/usr/share/nginx/html` für einen *nginx-Container* bzw. `/code` für einen *Node.js-Container* wählen.
7. Den Ordner `/usr/share/nginx/html/<Name_des_Forks>` bzw. `/code/<Name_des_Forks>` im ContainerVSC öffnen.
8. Eine Datei anlegen oder öffnen und editieren.
9. In einem Webbrowser können Sie ihr Projekt unter `localhost:8080/<Name_des_Forks>` für einen *nginx-Container* und unter `localhost:8081` für einen *Node.js-Container* aufrufen. Für *Node.js*: Um Inhalte zu sehen, muss ein Webserver unter *Node.js* gestartet sein (weitere Details dazu werden im Projekt zur Aufgabe 4 erklärt).
10. In dem *Source Control* Bereich in Visual Studio Code können Sie Ihre Commits verwalten und die Synchronisation mit GitLab sicherstellen.
11. Nach der Arbeit kann das ContainerVSC Fenster geschlossen werden.
12. Die Dateien sind persistent auf Ihrem Computer in dem Verzeichnis `~/webcode_nginx` bzw. `~/webcode_nodejs` gespeichert.

## 4. Debuggen

Es wird zwischen dem Debuggen des Frontend und dem Debuggen des Backend unterschieden.
Beides ist in den folgenden Unterkapiteln erläutert.

### 4.1 Debuggen des Frontend

Das Frontend der Webseite kann mit Hilfe der Entwicklungstools verschiedener Webbrowser gedebuggt werden.
Dies wird anhand einiger bekannter Webbrowser erläutert.
In den Webbrowsern *Mozilla Firefox*, *Microsoft Edge*, *Chromium* und *Google Chrome* werden auf der Frontendwebseite die Entwicklungstools im Menü aufgerufen.
Meist können diese ebenfalls mit der Tastenkombination *Strg+Umschalt+I* angezeigt werden.

### 4.2 Debuggen des Backend mit Visual Studio Code

Das Backend der Webseite kann im einfachsten Fall gedebuggt werden, indem das Programm im Visual Studio Code Fenster mit Breakpoints versehen wird und danach mit *Run* -> *Start Debugging* gestartet wird.
Im aufklappenden Fenster muss *Node.js* gewählt werden. Zur weiteren Anpassung kann eine `launch.json` Datei erstellt werden.
