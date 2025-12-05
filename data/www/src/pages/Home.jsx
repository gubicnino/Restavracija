import React from 'react'
import { Hero } from '../components/steakhouse/Hero'
import { About } from '../components/steakhouse/About'
import { MenuPreview } from '../components/steakhouse/MenuPreview'
import { Chef } from '../components/steakhouse/Chef'
import { Reservation } from '../components/steakhouse/Reservation'
import { Gallery } from '../components/steakhouse/Gallery'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'

export default function SteakhouseLanding() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <MenuPreview />
        <Chef />
        <Reservation />
        <Gallery />
      </main>
    </>
  )
}
