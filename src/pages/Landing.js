import React, { useEffect, useState } from "react";
import "./Landing.css";
import "./style.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { RxHamburgerMenu } from "react-icons/rx";
import {MdClose} from "react-icons/md";
import Cat from "../images/Cat.png"
import LandingPig from "../images/LandingpagePig.png";
import landingdog from "../images/big dog.png";
import userimg from "../images/user.png"
import paws from "../images/Paws.png"
import rabbit from "../images/rabbit.png"
import keylist1 from "../images/keylist1.png"
import keylist2 from "../images/keylist2.png"
import keylist3 from "../images/keylist3.png"
import keylist4 from "../images/keylist4.png"
import grid1 from "../images/grid1.png"
import grid2 from "../images/grid2.png"
import grid3 from "../images/grid3.png"
import grid4 from "../images/grid4.png"
import facebook from "../images/facebook.png"
import insta from "../images/Vector (1).png"
import twitter from "../images/Vector (3).png"
import youtube from "../images/Vector (4).png"
import google from "../images/Vector (2).png"
import logo from '../images/livestockwatchicon.png'
import menuicon from "../images/dashboardmenuitem.png"


const Landing = () => {
  const [showNav1, setShowNav1] = useState(false);
  const toggleNav1 = () => {
    setShowNav1(!showNav1);
    console.log('button clicked', showNav1)
  };

  return (
    <div className='landing-page'>
      {/* Navbar */}
      <div className=' w-full flex flex-wrap justify-between px-24 py-4 md:py-6 m-0 z-50 items-center border-primary border-b-2'>
        <div className="flex justify-items-start items-center">
          <img className="w-[100px] md:w-[150px] object-cover" src={logo} alt="logo"/>
        </div>
        {/* Mobile menu */}
        <div className="md:hidden">
        <button className="" onClick={()=>toggleNav1(true)}>{showNav1 ? <MdClose className="left-40"/> : <RxHamburgerMenu className="text-primary font-bold absolute top-6 size-5 mr-4 right-4"/>}</button>
          {showNav1 &&(
                <div>
                    <div className="fixed h-full w-screen right-0 -translate-x-0 transition-all">
                        <div className="flex bg-white flex-col absolute right-0 top-0 h-screen p-8 gap-2 z-[100] w-40">
                          <div className='text-md p-2'>
                            Home
                          </div>

                          <HashLink smooth to="#thirdpage" className='text-md p-2'>
                            About-Us
                          </HashLink>

                          <HashLink smooth to="#thirdpage" className='text-md p-2'>
                            Services
                          </HashLink>

                          <HashLink smooth to="#thirdpage" className='text-md p-2'>
                            Contact
                          </HashLink>

                          <Link to="/signup">
                            <button className='bg-primary text-sm text-white border-primary font-medium px-4 py-2 rounded-md'>Sign Up</button>
                          </Link>

                          <Link to="/signin">
                            <button className='bg-white hover:bg-primary border-primary font-medium text-primary hover:text-white px-4 py-2 border-2 text-sm rounded-md'>Sign In</button>
                          </Link>
                        </div> 
                    </div>
                </div>
          )} 
        </div>

        {/* Desktop menu */}
        <div className='nav-right hidden md:flex lg:flex'>
          <ul className="flex flex-row gap-5">
            <li className="navhover text-md">Home</li>
            <li className="navhover">
              <HashLink smooth to="#thirdpage" className='text-md p-2'>
                About-Us
              </HashLink>
            </li>
            <li className="navhover">
              <HashLink smooth to="#fourthpage" className='text-md p-2'>
                Services
              </HashLink>
            </li>
            <li className="navhover">
              <HashLink smooth to="#sixthpage" className='text-md p-2'>
                Contact
              </HashLink>
            </li>
            <li className=''>
              <Link to="/signup" className='bg-primary text-sm text-white border-primary font-medium px-6 py-4 rounded-md'>
                Sign Up
              </Link>
            </li>
            <li className=''>
              <Link to="/signin" className='bg-white hover:bg-primary border-primary font-medium text-primary hover:text-white px-6 py-4 border-2 text-sm rounded-md'>
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className='firstpage px-4 md:px-6'>
        <div className='firstpage-left'>
          <div className="flex flex-row gap-1 justify-center md:justify-start items-center">
            <img src={landingdog} alt="dog" />
            <img src={LandingPig} alt="chart" />
          </div>
          <div>
            <h1 className="text-4xl text-center md:text-left">Monitor your Animals with our <span className="text-primary">Intuitive Web Application</span></h1>
            <h4 className="text-md md:text-md text-center md:text-left">We provide detailed health reports to help you make informed decisions about 
                your livestock, identify trends and prevent future health issues.
            </h4>
          </div>
          <div>
            <Link to="/signup">
              <button className="bg-primary">Get Started</button>
            </Link>
          </div>
        </div>
        <div className='firstpage-right mb-24'>
          <img src={Cat} alt="chart" className="flex h-[300px] md:h-[500px] w-[500px] md:w-full object-cover rounded-lg md:rounded-3xl" />
        </div>
      </div>

      {/* Stats */}
      <div className='secondpage w-full mt-24'>
        <div className='secondpage1 gap-4'>
          <div className='img'>
            <img src={userimg} alt="chart" />
          </div>
          <div className="text-left gap-1">
            <h2 className="text-4xl text-white font-bold">100+</h2>
            <h4 className="text-2xl  text-white">Users</h4>
          </div>
        </div>

        <div className='secondpage2 gap-4'>
          <div className='img'>
            <img src={paws} alt="chart" />
          </div>
          <div className='secondpage21 text-left gap-1'>
            <h2 className="text-4xl text-left text-white font-bold">200+</h2>
            <h4 className="text-2xl text-left  text-white">Specie Distribution</h4>
          </div>
        </div>

        <div className='secondpage3 gap-4'>
          <div className='img'>
            <img src={paws} alt="chart" />
          </div>
          <div className='secondpage31 text-left gap-1'>
            <h2 className="text-4xl text-left text-white font-bold">200+</h2>
            <h4 className="text-2xl text-left  text-white">Specie Distribution</h4>
          </div>
        </div>
      </div>

      {/* WHy Choose our system */}
      <div id='thirdpage' className='thirdpage px-4 md:px-24 py:24 mt-16 mb-8'>
        <div>
          <h1 className="text-3xl md:text-4xl font-medium mb-4">Why Choose our <span className="font-bold">System?</span></h1>
        </div>
        <div className="">
          <div className='thirdpage-img'>
            <img src={rabbit} className="object-cover w-full h-full md:h-[500px] rounded-xl mb-4" alt="chart" />
          </div>

          {/* Overlay */}
          {/* <div class="absolute inset-0 flex mt-9 bg-black bg-opacity-40 md:h-[500px] object-cover rounded-xl"></div> */}

          <div className='thirdpage-words'>
            <h4 className="text-md md:text-xl text-black text-justify font-normal">
              We understand the critical importance of maintaining the health and well-being of your livestock. 
              Our innovative health monitoring system uses real-time temperature tracking to ensure your animals 
              are always at their best.
            </h4>
          </div>
        </div>  
      </div>

      {/* Key Features */}
      <div id='fourthpage' className='fourthpage px-4 md:px-24 mb-8'>
      
        <div className='fourthpage-wrapper'>
          <div className='fourthpage-img'>
            <img src={landingdog} alt="chart" />
          </div>
          <div className='fourthpage-right'>
            <div className='keylists'>
              <h1 className="text-3xl md:text-4xl font-medium">Key <span className="font-bold">Features</span></h1><br/>
              <div className='keylists1 flex flex-row items-center gap-2'>
                <img src={keylist1} alt="chart" />
                <p className="text-md text-black text-left md:text-lg">Real-Time Temperature Monitoring</p>
              </div><br/>

              <div className='keylists1 flex flex-row items-center gap-2'>
                <img src={keylist2} alt="chart" />
                <p className="text-md text-black text-left md:text-lg">Continuous health tracking with instant alerts for abnormal temperature readings.</p>
              </div><br/>

              <div className='keylists1 flex flex-row items-center gap-2'>
                <img src={keylist3} alt="chart" />
                <p className="text-md text-black text-left md:text-lg">Easy-to-use dashboard for quick insights into your herd's health status.</p>
              </div><br/>

              <div className='keylists1 flex flex-row items-center gap-2'>
                <img src={keylist4} alt="chart" />
                <p className="text-md text-black text-left md:text-lg">Vet Appointment Scheduling</p>
              </div>
            </div>
          </div>
        </div>
      </div><br/><br/>

      {/* How it Works */}
      <div className='fifthpage px-4 py-6 md:px-24 md:py-24 mt-24 mb-8'>
        <h1 className="text-4xl font-medium text-center mb-8">How it <span className=" text-primary font-bold">Works</span></h1>
        <div className='fifthpage-grid grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div className='grid1 gap-3'>
            <img src={grid1} alt="chart" className="mb-2"/>
            <h2 className="text-2xl text-left font-bold text-primary mb-1">Attach Sensor</h2>
            <h1 className="text-md text-left">Easily attach our temperature sensor to your animal.</h1>
          </div>

          <div className='grid2 gap-2'>
            <img src={grid2} alt="chart" className="mb-2"/>
            <h2 className="text-2xl text-left font-bold text-primary mb-1">Monitor Health</h2>
            <h1 className="text-md text-left">Track your animal’s temperature in real-time through our platform.</h1>
          </div>

          <div className='grid3 gap-2'>
            <img src={grid3} alt="chart" className="mb-2"/>
            <h2 className="text-2xl text-left font-bold text-primary mb-1">Get Alerts</h2>
            <h1 className="text-md text-left">Receive instant alerts if any temperature anomalies are detected.</h1>
          </div>

          <div className='grid4 gap-2'>
            <img src={grid4} alt="chart" className="mb-2"/>
            <h2 className="text-2xl text-left font-bold text-primary mb-1">Schedule Visits</h2>
            <h1 className="text-md text-left">Book appointments with your vet directly through our system.</h1>
          </div>
        </div>
      </div>

      <div className='sixthpage-top mb-8 px-4 md:px-24'>
          <div className='sixthinfo gap-4'>
            <h2>Hear how the system has made a difference for farmers just like you.</h2>
            <Link to="/signup">
              <button className="endbutton text-primary font-medium">Get Started Today</button>
            </Link>
          </div>
       </div>


      <div id='sixthpage' className='sixthpage px-4 md:px-24 py-8 md:py-24 bg-black'>
        <div className='sixthpage-bottom'>
          <div className='sixthlivestock'>
            <h2 className="text-3xl font-bold">Live Stock</h2>
            <h3>
              We provide detailed health reports to help you make informed decisions about your livestock, 
              identify trends and prevent future health issues.
            </h3>
          </div><br/>

          <div className='sixthcontact'>
            <h2 className="text-3xl font-bold">Contact Us</h2>
            <h2>Email</h2>
            <h3>toludairo534@gmail.com</h3>
            <h2>Phone</h2>
            <h3>09037976718</h3>
          </div><br/>

          <div className='sixthlist text-left'>
            <h2 className="text-3xl font-bold text-left">Follow Us on</h2>
            <ul className="items-start">
              <li> 
                <img src={insta} alt="chart" />
              </li>
              <li>
                <img src={facebook} alt="chart" />
              </li>
              <li>
                <img src={google} alt="chart" />
              </li>
              <li>
                <img src={twitter} alt="chart" />
              </li>
              <li>
                <img src={youtube} alt="chart" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;
