import React from "react";

export default function GetRooms({ rooms, onSelectRoom }) {
  if (!rooms || rooms.length === 0) {
    return (
      <div className="text-center py-5">
        <h5 className="text-muted">No rooms found matching your search.</h5>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {rooms.map((room) => {
        const photoUrl =
          room.photos && room.photos.length > 0
            ? room.photos[0]
            : "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80";

        return (
          <div key={room._id} className="col-md-4 col-sm-6">
            <div className="room-card-wrapper h-100 d-flex flex-column">
              <img src={photoUrl} alt={`Room ${room.roomNumber}`} className="room-card-img" />
              <div className="room-card-body d-flex flex-column flex-grow-1">
                <h5>Room Type: {room.type}</h5>
                <div className="room-card-meta">Room Capacity: {room.count} People</div>
                <div className="room-card-meta">Rent: {room.rent} per day</div>
                <div className="room-card-meta">Type: {room.type}</div>
                <div className="room-card-meta text-muted text-truncate">
                  Description: {room.description}
                </div>

                <div className="mt-auto pt-3">
                  <button
                    onClick={() => onSelectRoom(room)}
                    className="btn-learn-more"
                  >
                    LEARN MORE
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
