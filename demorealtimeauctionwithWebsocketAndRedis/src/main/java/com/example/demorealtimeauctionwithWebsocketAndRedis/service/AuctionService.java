package com.example.demorealtimeauctionwithWebsocketAndRedis.service;

import com.example.demorealtimeauctionwithWebsocketAndRedis.pojos.AuctionItem;
import com.example.demorealtimeauctionwithWebsocketAndRedis.pojos.Bid;

import java.util.List;

public interface AuctionService {
    void placeBid(Bid bid);
    List<AuctionItem> getAuction();

    AuctionItem getAuctionItem(Long id);
}