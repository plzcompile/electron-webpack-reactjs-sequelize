import React,{Component, Suspense} from 'react';
import '../assets/css/datagrid.module.css'; //Locally collected
import '../assets/css/datagrid.style.css'; //Locally collected
import {ReactTabulator} from 'react-tabulator'; 
const {ipcRenderer} = require('electron');
export default class DataGrid extends Component{   
    constructor(props) {
        super(props);
        this.state = {
            userData:  [],
            userColumns: [
                { title: "Id", field: "id" },
                { title: "Username", field: "username"},
                { title: "First Name", field: "firstname", hozAlign: "center"},
                { title: "Last Name", field: "lastname", hozAlign: "center" },
                { title: "Created At", field: "createdAt", hozAlign: "center" },
                { title: "Updated At", field: "updatedAt", hozAlign: "center" },
              ]
        }

    }   

    fetchUserData(){
        ipcRenderer.send('recieveUsers', '[mounted]');
        //What happens is we will send the mounted message from the frontend to the backend, and the backend will set our components data state in the frontend with IPC.on
        ipcRenderer.on('recieveUsers', (e, data) => { 
            if(data){
                console.log(`receiveUsers data retrieved inside App.js data: ${data}`);
                this.setState({ userData: JSON.parse(data)});
            }
        });
    }

    updateUserData(){
        ipcRenderer.send('updateUser', 'userObject'); //Main.js 
    }

    //Or this would be called inside useEffect() with hooks in functional components
    componentDidMount(){ //Setting state here will cause a rerender
        this.fetchUserData();
        console.log(`component mounted`)

    }

    //User this to get user data to work with in other functions.
    getSelectedData(e){
        let user = e._row.table.getSelectedData()[0] //Get one row
        let users = e._row.table.getSelectedData() //Get array of data from multi select
        console.log(user.id); 
        console.log(users)
    }

    render(){   
        return(
            <div className="w-full pt-2">
                <p className={'text-white text-2xl'}>DataGrid Component</p>
                <p className="text-gray-400"> 
                  You can easily use React Tabulator to load data from any database into your applications grid.
                </p>
                    <Suspense fallback={<h1>Loading users</h1>}>
                    <div>
                        <ReactTabulator
                            data={this.state.userData}
                            columns={this.state.userColumns}  
                            clipboard={true}      
                            movableColumns={"false"}     //allow column order to be changed
                            resizableRows={"true"}
                            responsiveLayout={"hide"}
                            tooltips={true}
                            layout={"fitData"}
                            rowSelected={this.getSelectedData}
                            selectable={true}
                        />
                    </div>
                    </Suspense>
            </div>
        );
    }
}

















