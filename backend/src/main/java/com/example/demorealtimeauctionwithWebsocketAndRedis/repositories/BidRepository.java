package com.example.demorealtimeauctionwithWebsocketAndRedis.repositories;

import com.example.demorealtimeauctionwithWebsocketAndRedis.pojos.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<Bid, Long> {
}
