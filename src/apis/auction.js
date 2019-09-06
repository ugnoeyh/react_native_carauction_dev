async function fetchAuctionList(auctionState = "FOR_SALE") {
    url = 'http://52.78.89.146:3000/api/CarListing';
    
    if (auctionState){
        filter = {
            include: "resolve",
            where: {
                state: auctionState
            }
        };
        url = `${url}?filter=${JSON.stringify(filter)}`;
    }
    
    auctionList = await fetch(url, {
        method: "GET"
    }).then(resp => {
        console.log(resp)
        if (!(200 <= resp.status < 300)) {
            console.warn("Request 에러")
        }
    return resp.json();
    }

    );
    return auctionList;
}

export {fetchAuctionList};