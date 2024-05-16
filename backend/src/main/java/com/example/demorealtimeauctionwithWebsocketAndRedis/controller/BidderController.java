package com.example.demorealtimeauctionwithWebsocketAndRedis.controller;

import com.example.demorealtimeauctionwithWebsocketAndRedis.pojos.Bidder;
import com.example.demorealtimeauctionwithWebsocketAndRedis.service.BidderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class BidderController {
    private final BidderService bidderService;
    @Autowired
    public BidderController(BidderService bidderService) {
        this.bidderService = bidderService;}

    @PutMapping("/bidder")
    public Bidder createBidder(@RequestBody Bidder bidder) {
        if(bidder.getName().isEmpty()) {
            throw new IllegalArgumentException("Name is required"
            );
        } else if (bidderService.getBidderByName(bidder.getName()).isPresent()) {
            throw new IllegalArgumentException("Bidder with name " + bidder.getName() + " already exists");
        }else{
            bidder.setCreditLimit(6942000);
            return  bidderService.createBidder(bidder);
        }
  }

    @PostMapping("/bidder")
    public Bidder updateBidder(@RequestBody Bidder bidder) {
        return bidderService.updateBidder(bidder);
    }

    @PostMapping("/bidder/delete")
    public void deleteBidder(@RequestBody Long id) {
        bidderService.deleteBidder(id);
    }

    @GetMapping("/bidder")
    public Optional<Bidder> getBidderByName(@RequestBody String name) {
        return bidderService.getBidderByName(name);
    }
}
