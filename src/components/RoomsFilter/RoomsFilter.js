import { useState } from "react";
import { Range } from "react-range";
import "./RoomsFilter.scss";

export default function RoomsFilter(props) {
  const today = new Date().toISOString().split("T")[0];
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [guestQty, setGuestQty] = useState(1);
  const [roomType, setRoomType] = useState(null);

  const getNextDay = (dateStr) => {
    if (!dateStr) return today;

    const d = new Date(dateStr);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkInISO = checkInDate ? new Date(checkInDate).toISOString() : null;
    const checkOutISO = checkOutDate
      ? new Date(checkOutDate).toISOString()
      : null;

    const filterData = {
      roomTypeId: roomType ? Number(roomType) : 0,
      priceFrom: minPrice,
      priceTo: maxPrice,
      maximumGuests: guestQty,
      checkIn: checkInISO,
      checkOut: checkOutISO,
    };

    console.log("Child submit:", filterData);

    props.onFilter(filterData);
  };

  const handleReset = () => {
    setCheckInDate("");
    setCheckOutDate("");
    setGuestQty(1);
    setMinPrice(0);
    setMaxPrice(1000);

    props.onFilter(null);
  };

  return (
    <form className="filter-container" onSubmit={handleSubmit}>
      <div className="range-container">
        <p>Price Per Night</p>
        <Range
          step={1}
          min={0}
          max={1000}
          values={[minPrice, maxPrice]}
          onChange={(values) => {
            let [min, max] = values;

            if (max - min < 10) {
              if (minPrice !== min) min = max - 10;
              else max = min + 10;
            }

            setMinPrice(min);
            setMaxPrice(max);
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                background: "#ddd",
                borderRadius: "3px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${(minPrice / 1000) * 100}%`,
                  right: `${100 - (maxPrice / 1000) * 100}%`,
                  height: "100%",
                  backgroundColor: "#75C5CF",
                  borderRadius: "3px",
                }}
              />
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                backgroundColor: "#75C5CF",
                borderRadius: "50%",
                border: "2px solid #fff",
              }}
            />
          )}
        />

        <div className="values">
          <div className="value">{`${minPrice}$`}</div>
          <div className="value">{`${maxPrice}$`}</div>
        </div>
      </div>

      <div className="inputs-wrapper">
        <div className="inputs">
          <label htmlFor="roomType">Room Type </label>
          <select
            id="roomType"
            value={roomType || ""}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="">Select room type</option>
            {props.categories?.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="inputs">
          <label htmlFor="checkInDate">Check-in </label>
          <input
            type="date"
            id="checkInDate"
            min={today}
            value={checkInDate}
            onChange={(e) => {
              setCheckInDate(e.target.value);
              if (checkOutDate && e.target.value >= checkOutDate) {
                setCheckOutDate(getNextDay(e.target.value));
              }
            }}
          />
        </div>
        <div className="inputs">
          <label htmlFor="checkOutDate">Check-out</label>
          <input
            type="date"
            id="checkOutDate"
            min={getNextDay(checkInDate)}
            placeholder="Check In"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label htmlFor="guestQty">Guests</label>
          <input
            type="number"
            min={1}
            max={5}
            value={guestQty}
            onChange={(e) => setGuestQty(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="buttons">
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
}
