import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// Materials

const material = new THREE.PointsMaterial({
    size: 0.004,
    
})
const material3 = new THREE.PointsMaterial({
    size: 0.01,
    color:'#344feb'
})
const material2 = new THREE.PointsMaterial({
    size: 0.001,
    color: 'red'
})
 
const particlesGeometry = new THREE.BufferGeometry;
const particlesGeometry2 = new THREE.BufferGeometry;
const particleCnt=5000;
const posArray = new Float32Array(particleCnt*3);
const posArray2 = new Float32Array(particleCnt*3);

for(let i=0;i<particleCnt*3;i++){
    posArray[i]=(Math.random()-0.5)*5
}
for(let i=0;i<particleCnt*3;i++){
    posArray2[i]=(Math.random()-0.5)*5
}
particlesGeometry.setAttribute('position',new THREE.BufferAttribute(posArray,3));
particlesGeometry2.setAttribute('position',new THREE.BufferAttribute(posArray2,3));
// Mesh
const sphere = new THREE.Points(geometry,material3)
const particlesMesh=new THREE.Points(particlesGeometry,material)
const particlesMesh2=new THREE.Points(particlesGeometry2,material2)
scene.add(sphere,particlesMesh,particlesMesh2)


let mouseX=0
let mouseY=0
document.addEventListener('mousemove',(Event)=>{
      mouseX=Event.clientX
      mouseY=Event.clientY
})

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()
    particlesMesh.rotation.y = 0.5* (elapsedTime)
     
    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    if(mouseX>0){

        particlesMesh.rotation.x = -mouseY* (elapsedTime*0.000008)
        particlesMesh.rotation.y = -mouseX* (elapsedTime*0.000008)
    }
    particlesMesh2.rotation.y = 1 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()