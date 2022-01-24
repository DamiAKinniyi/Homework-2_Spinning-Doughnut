// Import libraries
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124.0/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/controls/OrbitControls.js'
import { Rhino3dmLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/loaders/3DMLoader.js'

let scene, camera, renderer, raycaster;

//Change up to z-axis
THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 0, 1 )

//create a scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0xe7d7d1);

//set a camera
let ScreenW = window.innerWidth;
let ScreenH = window.innerHeight;
let ARatio = ScreenW/ScreenH;
camera = new THREE.PerspectiveCamera(70, ARatio,0.1, 1000 );
camera.position.set(150, 0, 150);

scene.add(camera)

//set a renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } )
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )

//create orbit controls
const controls = new OrbitControls( camera, renderer.domElement )

//create donut materials
let dMaterial, iMaterial, eMaterial
dMaterial= new THREE.MeshStandardMaterial({
    color: 0xd99d68, roughness:0.2
})

iMaterial= new THREE.MeshStandardMaterial({
    color: 0xffffff, metalness:0.1, roughness:0.2
})

eMaterial= new THREE.MeshStandardMaterial({
    color: 0x000000, metalness:0.1, roughness:0.2
})

raycaster = new THREE.Raycaster()

//create a test geometry to check if scene and camera are working
//const geo = new THREE.BoxGeometry(100,100,100);
//const matl = new THREE.MeshBasicMaterial();
//const cuble = new THREE.Mesh(geo,matl);
//scene.add(cuble);
//console.log(cuble);

const loader = new Rhino3dmLoader()
loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@0.13.0/' )

var allDonut;
loader.load( 'Donut.3dm', function ( object, animate) {

    
    let Donut = object.getObjectByName('Donut')
    let Icing = object.getObjectByName('Icing')
    let Decor = object.getObjectByName('Decor')
    Donut.material = dMaterial
    Icing.material = iMaterial
    Decor.material = eMaterial
    var allDonut = new THREE.Group()
    allDonut.rotation.z=(-0.5 *Math.PI)
    allDonut.add(Donut)
    allDonut.add(Icing)
    allDonut.add(Decor)
    document.getElementById('loader').remove()
    
    scene.add(allDonut)
    function animate() {
        requestAnimationFrame( animate );
        //allDonut.rotation.y += 0.01
        allDonut.rotation.z += 0.01
        renderer.render( scene, camera )}
        
animate()
    }, function(){document.getElementById('loader').innerHTML='in progress'
})


   // scene.add( object)}, 
   
//add directional light to the model;
const directionalLight = new THREE.DirectionalLight( 0xffffff )
directionalLight.intensity = 2
directionalLight.position.z = 100
scene.add( directionalLight )

const directionalLight2 = new THREE.DirectionalLight( 0xffffff )
directionalLight.intensity = 2
directionalLight.position.z = -100
scene.add( directionalLight2 )




