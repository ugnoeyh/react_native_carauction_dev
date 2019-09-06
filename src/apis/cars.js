async function fetchCarDetail(vin) {
  let url = "http://52.78.89.146:3000/api/Car";

  filter = {
    include: "resolve"
  };

  url = `${url}/${vin}?filter=${JSON.stringify(filter)}`;

  carDetail = await fetch(url, {
    method: "GET"
  }).then(resp => {
    if (!(200 <= resp.status < 300)) {
      return false;
    } else {
      return resp.json();
    }
  });
  return carDetail;
}

async function auctionListByCar(car) {
  url = "http://52.78.89.146:3000/api/CarListing";
  filter = {
    include: "resolve",
    where: {
      car : encodeURIComponent(`resource:com.betweak.carauction.Member#${car.vin}`)
    }
  };
  url = `${url}?filter=${filter}`;

  auctionList = await fetch(url).then(resp => { 
    return resp.json();
  });
  return auctionList;
}

async function fetchMyCar(userEmail) {
  url = "http://52.78.89.146:3000/api/Car";

  filter = {
    where: {
      owner: `resource:com.betweak.carauction.Member#${userEmail}`
    }
  };
  // encodeURI =
  url = `${url}?filter=${JSON.stringify(filter)}`;
  console.log(url);
  return await fetch(url, {
    method: "GET"
  }).then(resp => {
    if (!(200 <= resp.status < 300)) {
      return false;
    } else {
      return resp.json();
    }
  });
}

async function addMyCar(userEmail, vin, brand, model, year, image) {
  url = "http://52.78.89.146:3000/api/Car";

  data = {
    $class: "com.betweak.carauction.Car",
    vin: vin,
    image: image,
    year: year,
    model: model,
    brand: brand,
    owner: `resource:com.betweak.carauction.Member#${userEmail}`
  };

  result = await fetch(url, {
    method: "POST",
    headers: {
      ACCEPT: "application/json",
      "CONTENT-TYPE": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!(200 <= result.status < 300)) {
    console.warn("Request Error");
  }

  return result.json();
}

export { fetchMyCar, fetchCarDetail };
