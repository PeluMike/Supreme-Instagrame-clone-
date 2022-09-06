import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Register from './screens/Register';
import Login from './screens/Login';
import Homepage from './screens/Homepage';
import PostPage from './screens/PostPage';
import UserProfile from './screens/UserProfile';
import CreatPost from './screens/CreatPost';
import UpdateProfile from './screens/UpdateProfile';
import OtherUserProfile from './screens/OtherUserProfile';
import InfoShower from './components/InfoShower';
import UpdatePost from './screens/UpdatePost'


function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path='/register/' exact element={<Register/>} />
        <Route path='/login/' exact element={<Login/>}/>
        <Route path='/home/' exact element={<Homepage/>}/>
        <Route path='/' exact element={<Navigate to={'/home/'}/>}/>
        <Route path='/post/:id/' exact element={<PostPage/>}/>
        <Route path='/user/profile/' exact element={<UserProfile/>}/>
        <Route path='/post/create/' exact element={<CreatPost/>}/>
        <Route path='/user/profile/update/' exact element={<UpdateProfile/>}/>
        <Route path='/user/profile/:username/' exact element={<OtherUserProfile/>}/>
        <Route path='/infoShower' exact element={<InfoShower/>}/>
        <Route path='/post/update/:id' exact element={<UpdatePost/>}/>
      </Routes>
      
    </Router>
  );
}

export default App;
