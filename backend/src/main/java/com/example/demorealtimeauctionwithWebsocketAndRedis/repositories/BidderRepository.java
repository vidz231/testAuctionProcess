package com.example.demorealtimeauctionwithWebsocketAndRedis.repositories;

import com.example.demorealtimeauctionwithWebsocketAndRedis.pojos.Bidder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BidderRepository extends JpaRepository<Bidder, Long> {
    Optional<Bidder> findByName(String name);
}
