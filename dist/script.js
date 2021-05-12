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
camera.position.set(0,0,5)
scene.add(camera)

//debug
var cameraDebug = gui.addFolder('camera')
cameraDebug.add(camera.position, 'x', -10,10,0.1)
cameraDebug.add(camera.position, 'y', -10,10,0.1)
cameraDebug.add(camera.position, 'z', -10,10,0.1)

//light
const pointLight = new THREE.PointLight(0x00FF00, 100, 100)
pointLight.position.set(0,0,2);
scene.add(pointLight)

//debug
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );

var lightDebug = gui.addFolder('light')
lightDebug.add(pointLight.position, 'x', -10,10,0.1)
lightDebug.add(pointLight.position, 'y', -10,10,0.1)
lightDebug.add(pointLight.position, 'z', -10,10,0.1)
lightDebug.add(pointLight, 'intensity',0,100,0.1)


//objects
const cube = new THREE.BoxGeometry(3,3,3)


//texture
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/texture/NormalMap.png')

//material
const material = new THREE.MeshStandardMaterial({
    color: 0xFF0000,
    roughness: 0.7,
    metalness: 0.5,
    normalMap: texture
})


//debug
var materialDebug = gui.addFolder('material')
materialDebug.add(material, 'roughness', 0, 1 ,0.1)
materialDebug.add(material, 'metalness', 0, 1 ,0.1)

//mesh
const cubeMesh = new THREE.Mesh(cube, material)
scene.add(cubeMesh)


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


const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    cubeMesh.rotation.y = 3*elapsedTime
    cubeMesh.rotation.x = 3*elapsedTime
    cubeMesh.rotation.z = 3*elapsedTime

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)

}

tick()
