
const initialTravellers = [
  {
    id: 1, name: 'Lily', phonenum: '12345678',
    time: '2022-02-22', ope: 'delete',
  },
  {
    id: 2, name: 'Mike', phonenum: '56781234',
    time: '2022-02-23' , ope: 'delete',
  },
];

class ReservedTicket extends React.Component{
  render(){
    return (
      <div>This is the place for showing reserved tickets</div>
    );
  }
}

class TravellerRow extends React.Component{
  render() {
    const style = {border: "1px solid silver", padding: 4};
    const traveller=this.props.traveller;
    return (
      <tr>
        <td style = {style}>{traveller.id}</td>
        <td style = {style}>{traveller.name}</td>
        <td style = {style}>{traveller.phonenum}</td>
        <td style = {style}>{traveller.time}</td>
        <td style = {style}>{traveller.ope}</td>
      </tr>
    );
  }
}

class ReservationList extends React.Component{

  render() {
    const rowStyle = {border: "1px solid silver", padding: 4};
    const travellerRows = this.props.travellers.map(traveller => 
      <TravellerRow key={traveller.id} traveller={traveller} />
      );

    return (
      <table style={{borderCollapse:"collapse"}} id="del">
        <thead>
          <tr>
            <th style={rowStyle}>Serial No.</th>
            <th style={rowStyle}>Name</th>
            <th style={rowStyle}>Phone number</th>
            <th style={rowStyle}>Timestamp</th>
            <th style={rowStyle}>Operation</th>
          </tr>
        </thead>
        <tbody>
          {travellerRows}
        </tbody>
      </table>
    );
  }
}

class TravellerDel extends React.Component{
  constructor(){
    super();
    this.deleteSubmit=this.deleteSubmit.bind(this);
  }
  deleteSubmit(e) {
    e.preventDefault();
    var tbl=document.getElementById("del");
    const travellers=this.props.travellers;
    const form=document.forms.travellerDel; 
    const objectDel=Number(form.serialno.value)
    if (objectDel > travellers.length) {
      alert("error");
    }
    else{

      this.props.deleteTraveller(objectDel-1);
    }
    form.serialno.value="";

    }
  
  render() {
    return (
      <form name="travellerDel" onSubmit={this.deleteSubmit}>
        <input type="index" name="serialno" placeholder="Serial No." />
        <button>Delete</button>
      </form>
    )
  }
}

class TravellerAdd extends React.Component{
  constructor() {
    super();
    this.handleSubmit=this.handleSubmit.bind(this);
    
  }
  handleSubmit(e) {
    e.preventDefault();
    const form=document.forms.travellerAdd;
    const travellers=this.props.travellers;
    const traveller = {
      name: form.name.value, phonenum: form.phonenumber.value, ope: "delete",
      time: form.time.value,
    }
    if(travellers.length < 25){
      this.props.creatTraveller(traveller);
      form.name.value="";
      form.phonenumber.value="";
      form.time.value="";
    }
    else
    {
      alert("Error: NO Seats!")
    }
  }
  render() {
    return (
      <form name="travellerAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name"/>
        <input type="text" name="phonenumber" placeholder="Phone number"/>
        <input type="text" name="time" placeholder="Time"/>
        <button>Add</button>
      </form>
    );
  }
}

class Homepage extends React.Component{
  constructor() {
    super();
    this.state={ travellers: [] };
    this.creatTraveller = this.creatTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers});
    }, 500);
  }

  creatTraveller(traveller) {
    traveller.id = this.state.travellers.length + 1;
    const newTravellerList = this.state.travellers.slice();
    newTravellerList.push(traveller);
    this.setState({travellers: newTravellerList});
  }

  deleteTraveller(index) {
    const newTravellerList = this.state.travellers.slice();
    newTravellerList.splice(index,1);
    for(var j=0;j<newTravellerList.length;j++){
      newTravellerList[j].id= j+1
    }
    this.setState({travellers: newTravellerList});
  }
  
  showFreeSeats(){
    var displayFree=document.getElementById("displayFreeSeats");
    var displayTraveller=document.getElementById("displaytraveller");
    var displayAdd=document.getElementById("addTraveller");
    var displayDel=document.getElementById("deleteTraveller");
    displayFree.style.display = "block";
    displayTraveller.style.display = "none";
    displayAdd.style.display = "none";
    displayDel.style.display = "none";


  }

  render(){
    return (
      <React.Fragment>
        <h1>Homepage</h1>
        <nav>
          <button onClick={this.showFreeSeats()}>FreeSeats</button>
          <button onClick={this.showTraveller()}>ReservationList</button>
          <button onClick={this.showadd()}>addTraveller</button>
          <button onClick={this.showdel()}>deleteTraveller</button>
        </nav>
        <hr />
        <ReservedTicket id="displayFreeSeats" />
        <hr />
        <ReservationList id="displaytraveller" travellers={this.state.travellers} />
        <hr />
        <TravellerAdd id="addTraveller" travellers={this.state.travellers} creatTraveller={this.creatTraveller} />
        <hr />
        <TravellerDel id="deleteTraveller" travellers={this.state.travellers} deleteTraveller={this.deleteTraveller}/>
      </React.Fragment>
    );
  }
}

const element = <Homepage />;

ReactDOM.render(element, document.getElementById('contents'));
