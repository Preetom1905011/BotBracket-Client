import React from 'react';
import home_img from '../media/home_img3.png';
import scrappy_sticker from '../media/scrappy-sticker.png';
import ccr_img1 from '../media/crr_img1.jpg';
import ccr_img2 from '../media/staccato.png';
import ccr_img3 from '../media/crr_img3.JPG';
import ccr_img4 from '../media/crr_img4.png';
import ccr_img5 from '../media/crr_img5.JPG';
import '../styles/home.css';
import { Link} from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
import Footer from '../components/Footer';

export default function Home() {

  const {user} = useAuthContext()

  return (
    <div className='homepage'>

      <div className='main background-style-all'>
        <div>
          <h2>Bringing Order</h2>
          <h3>to Mechanized Mayhem</h3>
          <Link to={!user? '/login': '/tournaments'}><button >Get Started</button></Link>
        </div>
        <img src={home_img}/>
      </div>

      <div className='intro'>
        <img src={scrappy_sticker}/>
        <div className='intro-text'>
          <h2>What is BotBracket?</h2>
          <h3> Well, Hello there, fellow stranger. The name's Scrappy. You're here which means you must love 
              seeing two robots duking it out - Big Hero 6 style. But are you having trouble managing a robot 
              tournament in a civilised, sophisticated manner? Well, that's where BOTBRACKET comes into play. It helps
              you create tournaments, add bots, do safety check - all in a cool, bedazzling way (Imagine using Google 
              Sheets for this, am I right?). So what are you waiting for? Go on and setup a tournament to make robots 
              demolish each other for your pleasure. It's not like we have lives or loved ones or anything. Just Kidding. 
              Now go on, shoosh. Time for my daily oil change.
          </h3>
        </div>
      </div>

      <div className='club-details'>
        <div className='club-text'>
          <h2>Who are Combat Ready Robotics?</h2>
          <h4> Combat Ready Robotics at ASU is open to any and all ASU students and focuses on building interest and excitement 
              for robotics through the medium of robot combat. Members design and construct real combat robots at one of several 
              weight classes depending on prior experience. Beginners will have the opportunity to learn the fundamentals of robot 
              design and build 3lb “beetleweight” robots in small teams. More advanced members can work on the 30lb “featherweight” 
              robots, with the goal of translating successful design concepts into a single 250lb “heavyweight” bot to try and 
              compete in next year’s “BattleBots” TV show.
              <br/><br/>
              We also host Sun Devil Smackdown, a 3lb combat robotics tournament catered to ASU students. In the weeks leading up to each 
              competition, we host a series of workshops to teach groups of students how to build 3lb robots while funding their designs, 
              culminating in a tournament bracket.
          </h4>
        </div>
        <div className='img-box'>
          <div className='container'>
            <img src={ccr_img2} className="img-right-shift"/>
            <img src={ccr_img4} className="img-right-shift img3-height"/>
          </div>
          <img src={ccr_img1} className="img-left-shift"/>
          <div className='container'>
            <img src={ccr_img5} className="img-right-shift"/>
            <img src={ccr_img3} className="img-right-shift img3-height"/>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}
