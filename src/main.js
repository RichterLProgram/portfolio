import './style.css'
import { initThreeScene } from './three-scene.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

// Initialize Three.js Background
initThreeScene()

// Smooth Scroll (Lenis)
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Custom Cursor
const cursor = document.querySelector('.cursor')
const links = document.querySelectorAll('a, button, .bento-card')

document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
    ease: 'power2.out'
  })
})

links.forEach(link => {
  link.addEventListener('mouseenter', () => cursor.classList.add('hovered'))
  link.addEventListener('mouseleave', () => cursor.classList.remove('hovered'))
})

// Hero Animations
const tl = gsap.timeline()

tl.from('.logo', {
  y: -50,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
})
  .from('.nav-links li', {
    y: -20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  }, '-=0.5')
  .from('.glitch', {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: 'power4.out'
  }, '-=1')
  .from('.hero-subtitle', {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.8')
  .from('.scroll-indicator', {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.8')

// Scroll Animations (Bento Grid)
gsap.utils.toArray('.bento-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.1,
    ease: 'power3.out'
  })
})




