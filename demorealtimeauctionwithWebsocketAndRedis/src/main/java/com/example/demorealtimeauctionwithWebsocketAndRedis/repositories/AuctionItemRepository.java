package com.example.demorealtimeauctionwithWebsocketAndRedis.repositories;

import com.example.demorealtimeauctionwithWebsocketAndRedis.pojos.AuctionItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionItemRepository extends JpaRepository<AuctionItem, Long>{
}
