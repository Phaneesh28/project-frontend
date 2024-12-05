import React from 'react'
import Layout from '../components/layout'
import { TypeAnimation } from 'react-type-animation'
import '../styles/home.css'

const list = [
  "Customization like never before: Choose from a curated selection of components or unleash your inner engineer with our build-your-own platform. We'll make sure every piece fits flawlessly.",
  "Expert guidance: Our knowledgeable team is always here to assist you, answer your questions, and recommend the perfect setup for your needs and budget.",
  "More than just hardware: We don't stop at the PC. We offer a wide range of peripherals, software, and accessories to complete your ultimate battlestation or workspace.",
  "Unmatched support: We stand behind our products with industry-leading warranties and responsive customer service, ensuring you're never left in the dark.",
]

const Home = () => {
  const bulletPoint = (props, i) => {
    return (
      <ul key={i}>
        <p>{props}</p>
      </ul>
    )
  }

  const lander = () => {
    return (
      <Layout>
        <div className='home-bg-container'>
          <div className='h-container'>
            <TypeAnimation
              sequence={[
                'Welcome to Dev Store.',
                2000,
                'Welcome to One Stop Store.',
                2000,
                'Welcome to The Game World.',
                2000,
              ]}
              wrapper='h1'
              cursor={true}
              repeat={Infinity}
              className='style-heading'
            />
          </div>
          <div className='about-container'>
            <h1>About Us</h1>
            <p>
              We're not just another tech store. We're passionate about building
              dream machines that empower you to create, conquer, and connect.
              Whether you're a seasoned gamer, a content creator on the rise, or
              a professional pushing the boundaries of productivity, we believe
              everyone deserves a PC tailored to their unique needs and
              ambitions. Our story began with a simple passion: to make
              high-performance PCs accessible to everyone. We saw the
              frustration of gamers facing overpriced pre-builts or the daunting
              task of navigating compatibility when building their own. So, we
              decided to bridge the gap.
            </p>
            <div className='align-about'>
              {list.map((eachItem, i) => {
                return bulletPoint(eachItem, i)
              })}
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return lander()
}

export default Home
