package com.example.demorealtimeauctionwithWebsocketAndRedis.service;

import com.example.demorealtimeauctionwithWebsocketAndRedis.pojos.Bidder;
import com.example.demorealtimeauctionwithWebsocketAndRedis.repositories.BidderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class BidderServiceImpl implements BidderService{
    private final BidderRepository bidderRepository;
    @Autowired
    public BidderServiceImpl(BidderRepository bidderRepository) {
        this.bidderRepository = bidderRepository;
    }
    @Override
    public Bidder createBidder(Bidder bidder) {

        Optional<Bidder> existingBidder = bidderRepository.findByName(bidder.getName());
        if(existingBidder.isPresent()) {
            throw new IllegalArgumentException("Bidder with name " + bidder.getName() + " already exists");
        }else {
            bidder.setCreditLimit(6942000);
            return bidderRepository.save(bidder);
        }
    }

    @Override
    public Optional<Bidder> getBidderByName(String name) {
        return bidderRepository.findByName(name);
    }

    @Override
    public Bidder updateBidder(Bidder bidder) {

    return bidderRepository.save(bidder);
    }

    @Override
    public void deleteBidder(Long id) {
        bidderRepository.deleteById(id);
    }

    @Override
    public List<Bidder> getAllBidders() {
        return bidderRepository.findAll();
    }
}
