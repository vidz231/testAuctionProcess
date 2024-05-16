package com.example.demorealtimeauctionwithWebsocketAndRedis.service;

import com.example.demorealtimeauctionwithWebsocketAndRedis.exception.InvalidBidException;
import com.example.demorealtimeauctionwithWebsocketAndRedis.pojos.AuctionItem;
import com.example.demorealtimeauctionwithWebsocketAndRedis.pojos.Bid;
import com.example.demorealtimeauctionwithWebsocketAndRedis.repositories.AuctionItemRepository;
import com.example.demorealtimeauctionwithWebsocketAndRedis.repositories.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    private AuctionItemRepository auctionItemRepository;

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Override
    public void placeBid(Bid bid) {
        AuctionItem auctionItem = auctionItemRepository.findById(bid.getAuctionItem().getId())
                .orElseThrow(() -> new InvalidBidException("Auction item not found"));

        // 1. Validate the bid
        if (bid.getAmount().compareTo(auctionItem.getCurrentPrice()) <= 0) {
            throw new InvalidBidException("Bid amount must be higher than the current price");
        }
        if (LocalDateTime.now().isAfter(auctionItem.getEndTime())) {
            throw new InvalidBidException("Auction has already ended");
        }

        // 2. Save bid to database
        bid.setTimestamp(LocalDateTime.now());
        bidRepository.save(bid);

        // 3. Update auction item in Redis
        redisTemplate.opsForHash().put("auction:" + auctionItem.getId(), "highestBid", bid.getAmount());
        redisTemplate.opsForHash().put("auction:" + auctionItem.getId(), "highestBidderId", bid.getBidderId());

        // 4. Update auction item in database (Optional, for data consistency)
        auctionItem.setCurrentPrice(bid.getAmount());
        auctionItem.setHighestBidderId(bid.getBidderId());
        auctionItemRepository.save(auctionItem); // You might want to consider a delayed or asynchronous update here.

        // 5. Publish bid update to WebSocket topic
        messagingTemplate.convertAndSend("/topic/auction/" + auctionItem.getId(), bid);
    }

    @Override
    public List<AuctionItem> getAuction() {
        // Fetch all auction items from the database
        return auctionItemRepository.findAll();
    }

    @Override
    public AuctionItem getAuctionItem(Long id) {
        return auctionItemRepository.findById(id)
                .orElseThrow(() -> new InvalidBidException("Auction item not found"));
    }

    // ... (Other methods for managing auction items, fetching data, etc.)
}
