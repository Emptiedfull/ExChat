import flask



class Room:
    def __init__(self,room_id):
        self.room_id = room_id
        self.clients = []

    
    def add_client(self,username):
        if username not in self.clients:

            self.clients.append(username)

            return True
        else:
            return False

    def disconnect(self,username):
        print(username)
        list(self.clients)
        if username in self.clients:
            self.clients.remove(username)
            return True
        else:
            return False
        
class LobbyClass:
    def __init__(self):
        self.rooms = {}
    
    def add_room(self,room_id):
        if room_id not in self.rooms:
            self.rooms[room_id] = Room(room_id)
            return True
        else:
            return False
     
    def get_room(self,room_id,name=False):
       
        if room_id in self.rooms:
            if name:
                
                return room_id
          
            return self.rooms[room_id]
        else:
            return False
        
    def get_clients(self,room_id):
        if room_id in self.rooms:
            return self.rooms[room_id].clients
        else:
            return []
    
    def get_room_id(self,room):
        for room_id,room_obj in self.rooms.items():
            if room_obj == room:
                return room_id
            return False
        
    def list_rooms(self):
        
        return list(self.rooms.keys())
    
    def remove_room(self,room_id):
        if room_id in self.rooms:
            del self.rooms[room_id]
            return True
        else:
            return False

Lobby = LobbyClass()
