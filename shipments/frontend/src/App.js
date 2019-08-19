import React, { Component } from "react";
import Modal from "./components/Modal";

class App extends Component {
	
  constructor(props) {
	super(props);
	this.state = {
	  method: 'POST',
	  url: 'http://localhost:8000/shipments/',
	  modal: false,
	  viewCompleted: false,
	  activeItem: {
		shipmentId: "",
		shipmentName: "",
		shipmentStatus: false
	  },
	  shipmentList: []
	};
  }
  
  componentDidMount() {
     this.getShipments()
  }
  
  createObjetArray = x => {
	  const f = [];
		  x.map(v => (
		   f.push({id:v.id,shipmentId:v.shipmentId,shipmentName:v.shipmentName,shipmentStatus:v.shipmentStatus},)
		  ))
	return f
 }
  
  getShipments = () => {
  	fetch('http://localhost:8000/shipments/').then((response) => {
        return response.json();
    })
    .then((myJson) => {
         this.setState({
		  shipmentList : this.createObjetArray(myJson)
      }) 
    });
   
  }
  
  toggle = () => {
	this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
	this.toggle();
	var url = this.state.url;
	var methodType = this.state.method;
	if(methodType==='PUT')
		url = url+item.id
		
	fetch(url, {
    method: this.state.method,
    body: JSON.stringify(item),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(res => res.text())
	.then(res => console.log(res))
	this.setState({method: 'POST'});
  };
  
  handleDelete = item => {
	fetch('http://localhost:8000/shipments/'+ item.id , {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
	})
	.then(res => res.text())
	.then(res => console.log(res))
 };
  createItem = () => {
	this.getShipments();
	const item = {shipmentId: "", shipmentName: "",shipmentStatus: false };
	this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
	this.setState({ method:'PUT', activeItem: item, modal: !this.state.modal });
  };
  
  displayCompleted = status => {
	if (status) {
	  return this.setState({ viewCompleted: true });
	}
	return this.setState({ viewCompleted: false });
  };
  renderTabList = () => {
	return (
	  <div className="my-5 tab-list">
	  
		<span
		  onClick={() => this.displayCompleted(true)}
		  className={this.state.viewCompleted ? "active" : ""}
		>
		 complete
		</span>
		<span
		  onClick={() => this.displayCompleted(false)}
		  className={this.state.viewCompleted ? "" : "active"}
		>
		  Incomplete
		</span>
	  </div>
	);
  };
  renderItems = () => {

	const { viewCompleted } = this.state;
	const newItems = this.state.shipmentList.filter(
	  item => item.shipmentStatus === viewCompleted
	);
	return newItems.map(item => (
	  <li
		key={item.shipmentId}
		className="list-group-item d-flex justify-content-between align-items-center"
	  >
		<span
		  className={`todo-title mr-2 ${
			this.state.viewCompleted ? "completed-todo" : ""
		  }`}
		  shipmentId={item.shipmentId}
		>
		  {item.shipmentId}
		</span>
		
		<span
		  className={`todo-title mr-2 ${
			this.state.viewCompleted ? "completed-todo" : ""
		  }`}
		  shipmentName={item.shipmentName}
		>
		  {item.shipmentName}
		</span>
		
		
		<span>
		  <button
			onClick={() => this.editItem(item)}
			className="btn btn-secondary mr-2"
		  >
			Edit
		  </button>
		  <button
			onClick={() => this.handleDelete(item)}
			className="btn btn-danger"
		  >
			Delete
		  </button>
		</span>
	  </li>
	));
  };
  render() {
	return (
	  <main className="content">
		<h1 className="text-white text-uppercase text-center my-4">Shipments app</h1>
		<div className="row ">
		  <div className="col-md-6 col-sm-10 mx-auto p-0">
			<div className="card p-3">
			  <div className="">
				<button onClick={this.createItem} className="btn btn-primary">
				  Add Shipment
				</button>
			  </div>
			  {this.renderTabList()}
			  <ul className="list-group list-group-flush">
				{this.renderItems()}
			  </ul>
			</div>
		  </div>
		</div>
		{this.state.modal ? (
		  <Modal
			activeItem={this.state.activeItem}
			toggle={this.toggle}
			onSave={this.handleSubmit}
		  />
		) : null}
	  </main>
	);
  }
}
export default App;