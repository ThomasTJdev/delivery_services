# Pakkeshops

Find pakkeshops tæt på køberen med Post Nord og Bring.

Denne repo indeholder en javascript file, `delivery.js`, som med ren javascript foretager lookups hos Post Nord og Bring og parser resultaterne.

`delivery.js` kan du benytte, hvis du skal afsende et produkt til en kunde, og kunden skal have mulighed for at vælge en pakkeshop.


## Pull request

Opret gerne PR's hvis du har API'er at tilføje.


## GPS og adresse

### `getGpsZip(zip)`
```nim
zip: string
```
Laver opslag til dawa.aws.dk og returnerer data baseret på postnummer. Herefter kaldes `getGpsZipRes(xhr)`, som printer koordinatet.

Vær opmærksom på, at koordinatet som bliver returneret er center-punktet for postkoden. De kan derfor afvige en hel del fra køberens adresse.


### `getGpsStreet(street, zip)`
```nim
street: string
zip: string
```
Laver opslag til dawa.aws.dk og returnerer data baseret på postnummer og adresse. Herefter kaldes `getGpsStreetRes(xhr)`, som printer koordinatet.

Koordinatet udvælges baseret på det første vejnummer. Hvis du ønsker et specifikt opslag på vejnummer, skal du i URL'en tilføje "vejnummer" (se dawa.aws.dk API dokumentation).


### `getAddressClean(address)`
```nim
address: string
```

Denne funktion renser et vejnavn således, at kun selve vejnavnet står tilbage. Ofte vil input-forme kræve vej og vejnummer, fx Snarregade 33, her vil denne funktion så kun returnere Snarregade:
```
Input  => Snarregade 33
Output => Snarregade

Input  => Skovens vej 44
Output => Skovens vej
```

## Bring pakkeshops

```nim
zip: string
street: string
```

Funktion `getBringShops(zip, street)` returnerer alle Bring pakkeshops, som ligger tættest på det specificere postnummer og vejnavn.

Herefter returnerer `getBringShopsRes(xhr)` dataen for de enkelte pakkeshops. Det er denne funktion, som du skal tilpasse dit behov - fx generer en liste, hvor brugeren kan vælge sin pakkeshop. Når pakkeshoppen er valgt overfører du pakkeshoppens-id til et form-felt, som du overfører til databasen.

## Post Nord pakkeshops

```nim
api: string
zip: string
street: string
```

Funktion `getPostnordShops(api, zip, street)` returnerer alle Post Nords pakkeshops, som ligger tættest på det specificere postnummer og vejnavn.

Post Nord kræver, at du benytter en API-kode. Den kan du skaffe på `developer.postnord.com`.

Herefter returnerer `getPostnordShopsRes(xhr)` dataen for de enkelte pakkeshops. Det er denne funktion, som du skal tilpasse dit behov - fx generer en liste, hvor brugeren kan vælge sin pakkeshop. Når pakkeshoppen er valgt overfører du pakkeshoppens-id til et form-felt, som du overfører til databasen.

## Eksempel

```nim
getBringShops("1205", "Snarregade")
# url => https://api.bring.com/pickuppoint/api/pickuppoint/DK/postalCode/1205.json?street=Snarregade

# res:
"unitId": "107555"
"name": "Drugstore"
"visitingAddress": "Mikkel Bryggers Gade 10"
"visitingPostalCode": "1460"
```
