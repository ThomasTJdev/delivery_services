

/*
  Location lookup
*/
function getGpsZip() {
  /*
    Lookup in DAWA and return result based on zip.

    dawa.aws.dk
  */
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      getGpsZipRes(this);
    }
  };
  xhr.open("GET", "https://dawa.aws.dk/postnumre/" + zip);
  xhr.send(xhr);
}
function getGpsZipRes(xhr) {
  /*
    Outputs coordinates
  */
  var res = JSON.parse(xhr.responseText);
  console.log(res["visueltcenter"][0]);
  console.log(res["visueltcenter"][1]);
}

function getGpsStreet(street, zip) {
  /*
    Lookup in DAWA and return result based on street and zip.

    dawa.aws.dk
  */
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      getGpsStreetRes(this);
    }
  };
  xhr.open("GET", "https://dawa.aws.dk/adresser?q=" + street + "&postnr=" + zip);
  xhr.send(xhr);
}
function getGpsStreetRes(xhr) {
  /*
    Outputs coordinates
  */
  var res = JSON.parse(xhr.responseText);
  console.log(res[0]["adgangsadresse"]["adgangspunkt"]["koordinater"][0]);
  console.log(res[0]["adgangsadresse"]["adgangspunkt"]["koordinater"][1]);
}

function getAddressClean(address) {
  /*
    Input  => Snarregade 33
    Output => Snarregade

    Input  => Skovens vej 44
    Output => Skovens vej
  */
  return (address.replace(/\'/g, '').split(/(\d+)/).filter(Boolean))[0].trim();
}


/*
  Delivery lookup
*/
function getBringShops(zip, street) {
  /*
    Return all bring pakkeshops based on zip and street.

    developer.bring.com
  */
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      getBringShopsRes(this);
    }
  };
  xhr.open("GET", "https://api.bring.com/pickuppoint/api/pickuppoint/DK/postalCode/" + zip + ".json?street=" + street);
  xhr.send(xhr);
}
function getBringShopsRes(xhr) {
  /*
    Parses bring pakkeshops.
  */
  var res = JSON.parse(xhr.responseText);
  var resFind = res["pickupPoint"];
  resFind.forEach((item) => {
    console.log(item["unitId"]);
    console.log(item["name"]);
    console.log(item["visitingAddress"]);
    console.log(item["visitingPostalCode"]);
  });
}

function getPostnordShops(api, zip, street) {
  /*
    Return all Post Nord pakkeshops based on zip and street.
    An API-key is required.

    developer.postnord.com
  */
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      getPostnordShopsRes(this);
    }
  };
  xhr.open("GET", "https://api2.postnord.com/rest/businesslocation/v1/servicepoint/findNearestByAddress.json?apikey=" + api + "&countryCode=DK&agreementCountry=DK&postalCode=" + zip + "&streetName=" + street);
  xhr.send(xhr);
}
function getPostnordShopsRes(xhr) {
  /*
    Parses Post Nord pakkeshops.
  */
  var res = JSON.parse(xhr.responseText);
  var resFind = res["servicePointInformationResponse"]["servicePoints"];
  resFind.forEach((item) => {
    console.log(item["servicePointId"]);
    console.log(item["name"]);
    console.log(item["visitingAddress"]["streetName"]);
    console.log(item["visitingAddress"]["streetNumber"]);
    console.log(item["visitingAddress"]["postalCode"]);
  });
}
