import flask 
import flask_socketio
import flask_cors
from flask import request

from flask_socketio import join_room,leave_room

from room import Lobby


app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app,cors_allowed_origins="*")
flask_cors.CORS(app)


@app.route('/')
def index():
    return "Hello, World!"



@app.route('/get_rooms')
def get_rooms():
    
    return Lobby.list_rooms()



@app.route('/<room_id>/clients')
def get_clients(room_id):
    clients  = Lobby.get_clients(room_id)

    return clients



import socket_Handler

if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(description="Run the server")
    
    parser.add_argument('--port',default=5000,help='Port to run the server on')
    args = parser.parse_args()

    socketio.run(app,debug=True,port=int(args.port))


