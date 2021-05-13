import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { AmbientLight, Light } from 'three'



//debug
const gui = new dat.GUI()



//canvas
const canvas = document.querySelector('canvas.show')

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}




//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true 
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))





//scene
const scene = new THREE.Scene()












//camera
const camera = new THREE.PerspectiveCamera(110, sizes.width/sizes.height,1,100)
camera.position.set(0,0,6.5)
scene.add(camera)

//debug
var cameraDebug = gui.addFolder('camera')
cameraDebug.add(camera.position, 'x', -10,10,0.1)
cameraDebug.add(camera.position, 'y', -10,10,0.1)
cameraDebug.add(camera.position, 'z', 0,10,0.1)










//light
const pointLight = new THREE.PointLight(0xFFFFFF, 100, 100)
pointLight.position.set(0,0,2);
scene.add(pointLight)

//debug
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize, 0x000000 );
scene.add( pointLightHelper );

var lightDebug = gui.addFolder('light')
lightDebug.add(pointLight.position, 'x', -10,10,0.1)
lightDebug.add(pointLight.position, 'y', -10,10,0.1)
lightDebug.add(pointLight.position, 'z', -10,10,0.1)
lightDebug.add(pointLight, 'intensity',0,1000,1)










//objects
const cube1 = new THREE.BoxGeometry(2,2,2)
const cube2 = new THREE.BoxGeometry(2,2,2)
const cube3 = new THREE.BoxGeometry(2,2,2)


//texture
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('texture/NormalMap.png')
const textureRock = textureLoader.load('texture/rock.png')


//material
const material1 = new THREE.MeshStandardMaterial({
    color: 0xFF0000,
    roughness: 0.7,
    metalness: 0.5,
    normalMap: texture
})

const material2 = new THREE.MeshStandardMaterial({
    color: 0x00FF00,
    roughness: 1,
    metalness: 0.2,
    normalMap: textureRock
})

const material3 = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    roughness: 1,
    metalness: 0.2,
    normalMap: textureRock
})


//debug
var materialDebug = gui.addFolder('material')
materialDebug.add(material1, 'roughness', 0, 1 ,0.1)
materialDebug.add(material1, 'metalness', 0, 1 ,0.1)


//mesh
const cubeMesh1 = new THREE.Mesh(cube1, material1)
scene.add(cubeMesh1)

const cubeMesh2 = new THREE.Mesh(cube2, material2)
scene.add(cubeMesh2)
cubeMesh2.position.set(5, 0, 0)

const cubeMesh3 = new THREE.Mesh(cube3, material3)
scene.add(cubeMesh3)
cubeMesh3.position.set(-5, 0, 0)

// //debug
// var cubeDebug = gui.addFolder('cube_size')
// cubeDebug.add(cubeMesh.geometry.parameters, 'width', -10,10,0.1)
// cubeDebug.add(cubeMesh.geometry.parameters, 'height', -10,10,0.1)
// cubeDebug.add(cubeMesh.geometry.parameters, 'depth', -10,10,0.1)


renderer.render(scene, camera)

window.addEventListener('resize', () => {

    sizes.height = window.innerHeight
    sizes.width = window.innerWidth

    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

})

var x = sizes.width/2, y = sizes.height/2 

window.addEventListener('mousemove', e => {
    x = e.clientX - sizes.width/2
    y = e.clientY - sizes.height/2
})

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // cubeMesh.rotation.y = 3*elapsedTime
    // cubeMesh.rotation.x = 3*elapsedTime
    // cubeMesh.rotation.z = 3*elapsedTime

    cubeMesh1.position.x = 0.001*x
    cubeMesh1.position.y = -0.001*y

    cubeMesh2.position.x = 5 + 0.001*x
    cubeMesh2.position.y = -0.001*y

    cubeMesh3.position.x = -5 + 0.001*x
    cubeMesh3.position.y = -0.001*y

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)

}

tick()
