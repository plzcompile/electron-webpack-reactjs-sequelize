import React from 'react'
import DataGrid from './DataGrid';
import '../assets/css/app.global.css' //Import our tailwind to the application


const {ipcRenderer} = require('electron')

function minimizeWindow() {
  ipcRenderer.send('minimize:window');
}

function maximizeWindow () {
  ipcRenderer.send('maximize:window');
}

function closeWindow ()  {
  ipcRenderer.send('close:window');
}
function App(){  

    return (
          <div className="main-container">
            <div className="title-bar-container">              
                <div className="app-name-container">      
                <div className="phantom-drag-container"></div>               
                    &nbsp;<label className="mt-2 mb-3 p-2 title-color">Application</label>
                </div>
                <div className="window-controls-container">   
                  <button id="button-minimize" className="text-gray-300 hover:bg-gray-700 button" onClick={minimizeWindow}>
                    <svg className="fill-current inline block w-4 h-4 " fill="#858585" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M0 13v6c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1h-30c-0.552 0-1 0.448-1 1z"></path></svg>
                  </button>
      
                  <button id="button-maximize" className="text-gray-300 hover:bg-gray-700 button" onClick={maximizeWindow}>
                    <svg className="fill-current inline block w-4 h-4" fill="#858585" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M32 0h-13l5 5-6 6 3 3 6-6 5 5z"></path><path d="M32 32v-13l-5 5-6-6-3 3 6 6-5 5z"></path><path d="M0 32h13l-5-5 6-6-3-3-6 6-5-5z"></path><path d="M0 0v13l5-5 6 6 3-3-6-6 5-5z"></path></svg>
                  </button>
      
                  <button id="button-exit" className="text-gray-300 hover:text-white hover:bg-red-900 button" onClick={closeWindow}>
                    <svg className="fill-current inline block w-4 h-4" fill="#858585" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path></svg>
                  </button>
                </div> 
            </div>     
            <div className={'content-container p-6 '}>
              <h1 className={'text-white text-2xl'}>Electron Quickstarter Application</h1>
              <p className="text-gray-400"> 
                This application utilizes ReactJS, Electron, Sequelize + Sqlite, TailwindCSS, PostCSS, Webpack, and React Tabulator.
                Original repository can be found here: <a target="_blank" href="https://github.com/alexdevero/electron-react-webpack-boilerplate">https://github.com/alexdevero/electron-react-webpack-boilerplate. </a>
                Hopefully you can use this boilerplate to bootstrap your application development.
              </p>
              <div className={'relative'}>
                <DataGrid/>
              </div>
            </div>
          </div>
        )
}

export default App
