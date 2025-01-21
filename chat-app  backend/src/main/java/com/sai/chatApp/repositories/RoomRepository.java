package com.sai.chatApp.repositories;

import com.sai.chatApp.entities.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepository extends MongoRepository<Room, String> {

    // get room using room Id

    Room findByRoomId(String roomId);
}
