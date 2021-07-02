A kész feladat feltöltésének helye:
Repo: str-hgk-sajat-munka

Almappa: mongo-feladat-01

Például: http://github.com/cherryApp/str-hgk-sajat-munka/mongo-feladat-01


MongoDB alapfeladatok terminálban (Mongo shell-ben)

Elsőként olvasd végig az összes pontot!

Készíts egy videoStore nevű MongoDB adatbázist!
Hozz létre benne egy movies listát!
Ments el benne 10 új filmet (save()) a következő mezőkkel:
_id: legyen generált, ObjectId
title: egy-egy kedvenc film címe, szöveges tartalom
category: szöveges tartalom (3 típus lehet: fantasy, action, romantic) => legyenek vegyesen a filmek, amennyire lehet
director: szöveges tartalom, 3 rendező közül vegyesen szétválogatva => Steven Spielberg, Clint Eastwood, James Cameron
Frissítsd a listádat (updateMany), mindenki kapjon egy „ratings” mezőt, amely egy üres listát tartalmaz (1-5 ig lehet benne tárolni a szavazatokat)!
Adj 3 különböző filmre legalább 2 különböző szavazatot (használd a $push operátort)!
Adj hozzá minden filmhez egy „releaseYear” (megjelenés éve) mezőt: kezdetnek állíts be egy tetszőleges évet minden filmnek (pl.: 2000)!
Írd át category típusonként csupa nagybetűre a kategóriákat (pl.: action ==> ACTION legyen mindenhol). Használd az updateMany parancsot!
Tipp: db.courses.updateMany( {}, [{$set: {title: {$toUpper: "$title"} }}] )
