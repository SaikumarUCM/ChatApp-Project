package com.sai.chatApp.controller;


import com.sai.chatApp.entities.Message;
import com.sai.chatApp.entities.Room;
import com.sai.chatApp.playload.MessageRequest;
import com.sai.chatApp.repositories.RoomRepository;
import org.springframework.cglib.core.Local;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {


    private RoomRepository roomRepository;


    public ChatController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }


    // for sending and receiving messages
    @MessageMapping("/sendMessage/{roomId}")          //  message sends at   /app/sendMessage
    @SendTo("/topic/room/{roomId}")          // Subscribe
    public Message sendMessage(

            @DestinationVariable String roomId,
            @RequestBody MessageRequest request

    ){
        Room room = roomRepository.findByRoomId(request.getRoomId());

        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(request.getSender());
        message.setTimeStamp(LocalDateTime.now());

        if(room !=null){
            room.getMessages().add(message);
            roomRepository.save(room);
        }else {
            throw new RuntimeException("Room not found!!!");
        }

        return message;

    }

}
