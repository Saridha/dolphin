# ![alt text](https://raw.github.com/andyczerwonka/dolphin/master/doc/dolphin32.png "Dolphin") Welcome to Dolphin 
Dolphin is both a business intelligence application and an integration platform. It is targeted exclusively at 3esi's [esi.manage](http://www.3esi.com/default.asp?mode=webpage&id=473) product. Dolphin provides a layer of information integration between instances of esi.manage, giving turn-key corporate-focused business intelligence.
![alt text](https://raw.github.com/andyczerwonka/dolphin/master/doc/dolphinmap.png "Dolphin")

## Technical Architecture
Dolphin will communicate with the esi.manage platform via its web services interface. It will consist of a rich web client, comminicating to the Dolphin REST services over HTTP. Dolphin will use the document-based MongoDB as its storage and persistant cache.
![alt text](https://raw.github.com/andyczerwonka/dolphin/master/doc/dolphin_architecture.png "Dolphin Architecture")


