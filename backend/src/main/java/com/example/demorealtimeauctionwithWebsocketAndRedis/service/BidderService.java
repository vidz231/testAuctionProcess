package com.example.demorealtimeauctionwithWebsocketAndRedis.service;

import com.example.demorealtimeauctionwithWebsocketAndRedis.pojos.Bidder;

import java.util.List;
import java.util.Optional;

public interface BidderService {
    Bidder createBidder(Bidder bidder);
    List<Bidder> getAllBidders();
    Optional<Bidder> getBidderByName(String name);

    Bidder updateBidder(Bidder bidder);
    void deleteBidder(Long id);

}
