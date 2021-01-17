package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.example.demo.models.BeaconEntry;
import org.springframework.stereotype.Repository;

@Repository
public interface BeaconEntryRepository extends JpaRepository<BeaconEntry, Long> {
    //"Find location entry by email" = since we are storing userEmail and three beacons' stats, that is how to identify an entry
    Optional<BeaconEntry> findBeaconEntryByEmail(String email);

    Boolean existsLocationEntryByEmail(String email);
}
