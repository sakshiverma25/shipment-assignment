import React, { useEffect, useState } from 'react';
import jQuery from 'jquery';

const Shipments = () => {
  const [shipments, setShipments] = useState([]);
  const csrftoken = getCookie('csrftoken');

  useEffect(() => {
    getShipments();
  }, []);

  async function getShipments() {
    const response = await fetch('http://localhost:8000/shipments/');
    const shipments = await response.json();
    setShipments(shipments);
  }

function deleteShipmentById(id){
fetch('http://localhost:8000/shipments/'+ id , {
  method: 'DELETE',
  headers: {'Content-Type': 'application/json'}
})
.then(res => res.text())
.then(res => console.log(res))
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function updateShipment(){
var number = document.getElementById('shipmentNumber').value;
var name = document.getElementById('shipmentName').value;
var sstatus = document.getElementById('shipmentStatus').value;
var data = "{\"shipmentId\": \""+number+"\",\"shipmentName\": \""+name+"\",\"shipmentStatus\": \""+sstatus+"\"}";

const response = fetch('http://localhost:8000/shipments/', {
    method: 'POST',
    body: data,
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}




  return (
  <div>

  <div>
    	   <input id="shipmentNumber"
          type="text"
          placeholder="Enter Shipment Number"
        />
          <input id="shipmentName"
          type="text"
          placeholder="Enter Shipment Name"
        />
          <input id="shipmentStatus"
          type="text"
          placeholder="Enter Shipment Status"
        />
        <button onClick={() => updateShipment()}>Go!</button>
  </div>
 <div>
  <ul>
      {shipments.map(shipment => (
        <li>{shipment.name} - {shipment.email} <button onClick={() => deleteShipmentById(shipment.id)}>
         Delete </button> <button onClick={() => updateShipment(shipment)}>  Update </button></li>
      ))}
   </ul>

 </div>

</div>
  );
};



export default Shipments;
