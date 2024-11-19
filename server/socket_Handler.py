from flask_socketio import join_room,leave_room
from flask import request
from __main__ import socketio
 
from room import Lobby


clients = {}
def room(id,names=False):
    room = Lobby.get_room(id,name=names)
    return room


@socketio.on('connect')
def handle_connect():
    print("Client connected")

@socketio.on('disconnect')
def handle_disconnect():
    leave_room(room(request.sid,names=True))
    print("Client disconnected")

@socketio.on('join_room')
def handle_join_room(data):

    room_id = data['room']
    username = data['user']
    if not Lobby.get_room(room_id):
        Lobby.add_room(room_id)
    Lobby.get_room(room_id).add_client(username)
    join_room(room_id)
    print(f"Client {username} joined room {room_id}")
    socketio.emit('join_response',{'room':room_id,'message':"Connected"},to=room_id)

@socketio.on('leave_room')
def handle_leave_room(data):
    room_id = room(data['room_id'],names=True)
    
    Lobby.get_room(room_id).disconnect(data['user'])
    leave_room(room_id)
    
    print(f"Client left room {room_id}")



@socketio.on('message')
def handle_message(data):

    room_id = room(data['room'],names=True)
    message = data['message']
    author = data['author']
    socketio.emit('message', {"message":message,"author":author}, room=room_id)

    print(f"Received message: {message} on room {room_id}")
  


print("Socket handlers registered.")