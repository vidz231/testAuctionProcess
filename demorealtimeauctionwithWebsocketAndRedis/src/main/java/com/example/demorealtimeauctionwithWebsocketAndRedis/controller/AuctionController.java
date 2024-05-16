package com.example.demorealtimeauctionwithWebsocketAndRedis.controller;

import com.example.demorealtimeauctionwithWebsocketAndRedis.pojos.AuctionItem;
import com.example.demorealtimeauctionwithWebsocketAndRedis.pojos.Bid;
import com.example.demorealtimeauctionwithWebsocketAndRedis.service.AuctionServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AuctionController {
    private final AuctionServiceImpl auctionServiceImpl;
    private final SimpMessagingTemplate messagingTemplate;

    public AuctionController(AuctionServiceImpl auctionServiceImpl, SimpMessagingTemplate messagingTemplate) {
        this.auctionServiceImpl = auctionServiceImpl;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/bid.placeBid")
    @SendTo("auction/topic")
    public ResponseEntity<Bid> placeBid(Bid bid) {
        auctionServiceImpl.placeBid(bid);
        messagingTemplate.convertAndSend("/topic/app", auctionServiceImpl.getAuction());
        System.out.println("Bid placed: " + bid.getAmount() + " on item " + bid.getAuctionItem().getId() + " by " + bid.getBidderId());
        
    }

    @GetMapping("/auction")
    public List<AuctionItem> getAuction() {
        return auctionServiceImpl.getAuction();
    }
    @GetMapping("/auction")

    public AuctionItem getAuctionItem(@RequestParam("id") String id) {
        return auctionServiceImpl.getAuctionItem(Long.valueOf(String.valueOf(id)));
    }
}
