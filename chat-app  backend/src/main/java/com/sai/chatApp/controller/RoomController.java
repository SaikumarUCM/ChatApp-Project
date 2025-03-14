package com.sai.chatApp.controller;


import com.sai.chatApp.entities.Message;
import com.sai.chatApp.entities.Room;
import com.sai.chatApp.repositories.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("http://localhost:5173")
public class RoomController {


    public RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    // create room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId){

        if(roomRepository.findByRoomId(roomId)!=null) {
            // room already exits
            return ResponseEntity.badRequest().body("room already exists");

        }

        // create new room
        Room room = new Room();
        room.setRoomId(roomId);
        Room savedRoom = roomRepository.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);

    }


    // get room: join
    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId){
        Room room= roomRepository.findByRoomId(roomId);
        if(room ==null){
            return ResponseEntity.badRequest().body("Room not Found");
        }

        return ResponseEntity.ok(room);

    }


    // get messages of room
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(
            @PathVariable String roomId,
           @RequestParam(value ="page" , defaultValue = "0", required = false) int page,
           @RequestParam(value ="size" , defaultValue = "20", required = false) int size
            ){
         System.out.println("Fetching message from roomId");
         Room room = roomRepository.findByRoomId(roomId);
         if(room == null){
             return ResponseEntity.badRequest().build();
         }

         // get messages
         List<Message> messages = room.getMessages();
          int start= Math.max(0,messages.size()- (page+1)* size);
          int end= Math.min(messages.size(),start+size);
          List<Message> paginatedMessages = messages.subList(start,end);
         return ResponseEntity.ok(paginatedMessages);

    }
}
