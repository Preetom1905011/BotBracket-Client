import React from 'react';
import home_img from '../media/home_img3.png';
import scrappy_sticker from '../media/scrappy-sticker.png';
import '../styles/home.css';
import { CSSTransition } from 'react-transition-group';
import { Link} from 'react-router-dom'

export default function Home() {
  return (
    <div className='homepage'>

      <div className='main background-style-all'>
        <div>
          <h2>Robot Battles</h2>
          <h3>Have never been easier</h3>
          <Link to='/login'><button >Get Started</button></Link>
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
      
      <div className="footer-home">
          <p>Combat Ready Robotics @ ASU</p>
      </div>
    </div>
  )
}
