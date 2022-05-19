import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { Material } from 'three'
 


//datgui
 const gui=new dat.GUI()
//window sizes
const sizes={
    width:window.innerWidth,
    height:window.innerHeight
}


//scene
const scene=new THREE.Scene()


//canvas
const canvas=document.querySelector('canvas.webgl')


const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/5.png')

/**
 * Particles
 */
// Geometry
const parameters = {}
parameters.count = 75700
parameters.size = 0.01
parameters.radius = 20
parameters.branches = 3
parameters.spin = 1
parameters.randomness = 0.2
parameters.randomnessPower = 6.2
parameters.insideColor = '#ff6030'
parameters.outsideColor = '#1b3984'

let geometry = null
let galaxymaterial = null
let points = null

const generateGalaxy = () =>
{
    // Destroy old galaxy
    if(points !== null)
    {
        geometry.dispose()
        galaxymaterial.dispose()
        scene.remove(points)
    }

    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for(let i = 0; i < parameters.count; i++)
    {
        // Position
        const i3 = i * 3

        const radius = Math.random() * parameters.radius

        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2
        
        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius

        positions[i3    ] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        // Color
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)
        
        colors[i3    ] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    /**
     * Material
     */
    galaxymaterial = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    /**
     * Points
     */
    points = new THREE.Points(geometry, galaxymaterial)
    scene.add(points)
}

gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(parameters, 'spin').min(- 5).max(5).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)
gui.close()

generateGalaxy()

//texture

//cubetexture loader
const cubetextureloader=new THREE.CubeTextureLoader()

//text
const fontLoader=new FontLoader()

//heading
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
(font)=>
{
 const material=new THREE.MeshNormalMaterial()
 
 const textss=new TextGeometry(
     'The Solar System ',
     {
        font: font,
        size: 1.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
     }
 )
 //textss.center()
 const text=new THREE.Mesh(textss,material)
 group.add(text)
 text.position.set(0,7,0)
}
)
//sun
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
(font)=>
{
 const material=new THREE.MeshNormalMaterial()
 
 const textss=new TextGeometry(
     'Sun',
     {
        font: font,
        size: 0.4,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
     }
 )
 const text=new THREE.Mesh(textss,material)
 group.add(text)
 text.position.set(0,3,0)
}
)
//mercury
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
(font)=>
{
 const material=new THREE.MeshNormalMaterial()
 
 const textss=new TextGeometry(
     'Mercury',
     {
        font: font,
        size: 0.3,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
     }
 )
 const text=new THREE.Mesh(textss,material)
 group.add(text)
 text.position.set(-4,0.75,0)
}
)
//venus
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
(font)=>
{
 const material=new THREE.MeshNormalMaterial()
 
 const textss=new TextGeometry(
     'Venus',
     {
        font: font,
        size: 0.3,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
     }
 )
 const text=new THREE.Mesh(textss,material)
 group.add(text)
 text.position.set(-5.5,0.75,0)
}
)
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
(font)=>
{
 const material=new THREE.MeshNormalMaterial()
 
 const textss=new TextGeometry(
     'Earth',
     {
        font: font,
        size: 0.3,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
     }
 )
 const text=new THREE.Mesh(textss,material)
 group.add(text)
 text.position.set(-8,0.75,0)
}
)
//mars
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
(font)=>
{
 const material=new THREE.MeshNormalMaterial()
 
 const textss=new TextGeometry(
     'Mars',
     {
        font: font,
        size: 0.3,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
     }
 )
 const text=new THREE.Mesh(textss,material)
 group.add(text)
 text.position.set(-10.75,0.75,0)
}
)
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
(font)=>
{
 const material=new THREE.MeshNormalMaterial()
 
 const textss=new TextGeometry(
     'Jupiter',
     {
        font: font,
        size: 0.3,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
     }
 )
 const text=new THREE.Mesh(textss,material)
 group.add(text)
 text.position.set(-13,0.75,0)
}
)
//saturn
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
(font)=>
{
 const material=new THREE.MeshNormalMaterial()
 
 const textss=new TextGeometry(
     'Saturn',
     {
        font: font,
        size: 0.3,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
     }
 )
 const text=new THREE.Mesh(textss,material)
 group.add(text)
 text.position.set(-15.75,0.75,0)
}
)
//uranus
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
(font)=>
{
 const material=new THREE.MeshNormalMaterial()
 
 const textss=new TextGeometry(
     'Uranus',
     {
        font: font,
        size: 0.3,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
     }
 )
 const text=new THREE.Mesh(textss,material)
 group.add(text)
 text.position.set(-18,0.75,0)
}
)
//neptune
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
(font)=>
{
 const material=new THREE.MeshNormalMaterial()
 
 const textss=new TextGeometry(
     'Neptune',
     {
        font: font,
        size: 0.3,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
     }
 )
 const text=new THREE.Mesh(textss,material)
 group.add(text)
 text.position.set(-20.5,0.75,0)
}
)
//pluto
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
(font)=>
{
 const material=new THREE.MeshNormalMaterial()
 
 const textss=new TextGeometry(
     'Pluto',
     {
        font: font,
        size: 0.3,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
     }
 )
 const text=new THREE.Mesh(textss,material)
 group.add(text)
 text.position.set(-22.75,0.75,0)
}
)


//groups
const group = new THREE.Group()
group.scale.y = 2
scene.add(group)

//shapes

//material for sun
const sunmaterial =new THREE.MeshLambertMaterial()
const envmaptexturesun=cubetextureloader.load([
    '/textures/environmentMaps/1/px.png',
    '/textures/environmentMaps/1/nx.png',
    '/textures/environmentMaps/1/py.png',
    '/textures/environmentMaps/1/ny.png',
    '/textures/environmentMaps/1/pz.png',
    '/textures/environmentMaps/1/nz.png',
    
])
sunmaterial.metalness=1
sunmaterial.roughness=0
//gui.add(sunmaterial,'roughness').min(0).max(1).step(0.001)
//gui.add(sunmaterial,'metalness').min(0).max(1).step(0.001)
sunmaterial.envMap=envmaptexturesun

//material mercury
const materialmercury =new THREE.MeshLambertMaterial()
const envmaptexturemercury=cubetextureloader.load([
    '/textures/environmentMaps/2/px.png',
    '/textures/environmentMaps/2/nx.png',
    '/textures/environmentMaps/2/py.png',
    '/textures/environmentMaps/2/ny.png',
    '/textures/environmentMaps/2/pz.png',
    '/textures/environmentMaps/2/nz.png',
    
])
materialmercury.metalness=1
materialmercury.roughness=0
materialmercury.envMap=envmaptexturemercury

//material venus
const materialvenus =new THREE.MeshLambertMaterial()
const envmaptexturevenus=cubetextureloader.load([
    '/textures/environmentMaps/3/px.png',
    '/textures/environmentMaps/3/nx.png',
    '/textures/environmentMaps/3/py.png',
    '/textures/environmentMaps/3/ny.png',
    '/textures/environmentMaps/3/pz.png',
    '/textures/environmentMaps/3/nz.png',
    
])
materialvenus.metalness=1
materialvenus.roughness=0
materialvenus.envMap=envmaptexturevenus

//material earth
const materialearth =new THREE.MeshLambertMaterial()
const envmaptextureearth=cubetextureloader.load([
    '/textures/environmentMaps/4/px.png',
    '/textures/environmentMaps/4/nx.png',
    '/textures/environmentMaps/4/py.png',
    '/textures/environmentMaps/4/ny.png',
    '/textures/environmentMaps/4/pz.png',
    '/textures/environmentMaps/4/nz.png',
    
])
materialearth.metalness=1
materialearth.roughness=0
materialearth.envMap=envmaptextureearth

//materialmoon
const materialmoon =new THREE.MeshLambertMaterial()
const envmaptexturemoon=cubetextureloader.load([
    '/textures/environmentMaps/12/px.png',
    '/textures/environmentMaps/12/nx.png',
    '/textures/environmentMaps/12/py.png',
    '/textures/environmentMaps/12/ny.png',
    '/textures/environmentMaps/12/pz.png',
    '/textures/environmentMaps/12/nz.png',
    
])
materialmoon.metalness=1
materialmoon.roughness=0
materialmoon.envMap=envmaptexturemoon


//material mars
const materialmars =new THREE.MeshLambertMaterial()
const envmaptexturemars=cubetextureloader.load([
    '/textures/environmentMaps/5/px.png',
    '/textures/environmentMaps/5/nx.png',
    '/textures/environmentMaps/5/py.png',
    '/textures/environmentMaps/5/ny.png',
    '/textures/environmentMaps/5/pz.png',
    '/textures/environmentMaps/5/nz.png',
    
])
materialmars.metalness=1
materialmars.roughness=0
materialmars.envMap=envmaptexturemars

//material jupiter
const materialjupiter =new THREE.MeshLambertMaterial()
const envmaptexturejupiter=cubetextureloader.load([
    '/textures/environmentMaps/6/px.png',
    '/textures/environmentMaps/6/nx.png',
    '/textures/environmentMaps/6/py.png',
    '/textures/environmentMaps/6/ny.png',
    '/textures/environmentMaps/6/pz.png',
    '/textures/environmentMaps/6/nz.png',
    
])
materialjupiter.metalness=1
materialjupiter.roughness=0
materialjupiter.envMap=envmaptexturejupiter

//material saturn
const materialsaturn =new THREE.MeshLambertMaterial()
const envmaptexturesaturn=cubetextureloader.load([
    '/textures/environmentMaps/7/px.png',
    '/textures/environmentMaps/7/nx.png',
    '/textures/environmentMaps/7/py.png',
    '/textures/environmentMaps/7/ny.png',
    '/textures/environmentMaps/7/pz.png',
    '/textures/environmentMaps/7/nz.png',
    
])
materialsaturn.metalness=1
materialsaturn.roughness=0
materialsaturn.envMap=envmaptexturesaturn

//material uranus
const materialuranus =new THREE.MeshLambertMaterial()
const envmaptextureuranus=cubetextureloader.load([
    '/textures/environmentMaps/8/px.png',
    '/textures/environmentMaps/8/nx.png',
    '/textures/environmentMaps/8/py.png',
    '/textures/environmentMaps/8/ny.png',
    '/textures/environmentMaps/8/pz.png',
    '/textures/environmentMaps/8/nz.png',
    
])
materialuranus.metalness=1
materialuranus.roughness=0
materialuranus.envMap=envmaptextureuranus

//material neptune
const materialneptune =new THREE.MeshLambertMaterial()
const envmaptextureneptune=cubetextureloader.load([
    '/textures/environmentMaps/9/px.png',
    '/textures/environmentMaps/9/nx.png',
    '/textures/environmentMaps/9/py.png',
    '/textures/environmentMaps/9/ny.png',
    '/textures/environmentMaps/9/pz.png',
    '/textures/environmentMaps/9/nz.png',
    
])
materialneptune.metalness=1
materialneptune.roughness=0
materialneptune.envMap=envmaptextureneptune

//material pluto
const materialpluto =new THREE.MeshLambertMaterial()
const envmaptexturepluto=cubetextureloader.load([
    '/textures/environmentMaps/10/px.png',
    '/textures/environmentMaps/10/nx.png',
    '/textures/environmentMaps/10/py.png',
    '/textures/environmentMaps/10/ny.png',
    '/textures/environmentMaps/10/pz.png',
    '/textures/environmentMaps/10/nz.png',
    
])
materialpluto.metalness=1
materialpluto.roughness=0
materialpluto.envMap=envmaptexturepluto



//saturn ring
const saturnring=new THREE.TorusBufferGeometry(0.25,0.01,16,100,6.283)
const materialring=new THREE.MeshLambertMaterial()
const envmaptexturering=cubetextureloader.load([
    '/textures/environmentMaps/11/px.png',
    '/textures/environmentMaps/11/nx.png',
    '/textures/environmentMaps/11/py.png',
    '/textures/environmentMaps/11/ny.png',
    '/textures/environmentMaps/11/pz.png',
    '/textures/environmentMaps/11/nz.png',
    
])
materialring.metalness=1
materialring.roughness=0
materialring.envMap=envmaptexturering
const ring=new THREE.Mesh(saturnring,materialring)
group.add(ring)
ring.position.set(-15,0,0)
ring.rotation.x=190



//sun
const sphere0=new THREE.SphereBufferGeometry(2,32,16)
const spheremesh0=new THREE.Mesh(sphere0,sunmaterial)
group.add(spheremesh0)

//mercury
const sphere1=new THREE.SphereBufferGeometry(0.125,30,30)
const spheremesh1=new THREE.Mesh(sphere1,materialmercury)
group.add(spheremesh1)
spheremesh1.position.set(-3.5,0,0)

//venus
const sphere2=new THREE.SphereBufferGeometry(0.145,30,30)
const spheremesh2=new THREE.Mesh(sphere2,materialvenus)
group.add(spheremesh2)
spheremesh2.position.set(-5,0,0)

//earth
const sphere3=new THREE.SphereBufferGeometry(0.1851,30,30)
const spheremesh3=new THREE.Mesh(sphere3,materialearth)
group.add(spheremesh3)
spheremesh3.position.set(-7.5,0,0)

//moon
const moonsphere=new THREE.SphereBufferGeometry(0.0504,30,30)
const moonmesh=new THREE.Mesh(moonsphere,materialmoon)
group.add(moonmesh)
moonmesh.position.set(-7.75,0.3,0)

//mars
const sphere4=new THREE.SphereBufferGeometry(0.09615,30,30)
const spheremesh4=new THREE.Mesh(sphere4,materialmars)
group.add(spheremesh4)
spheremesh4.position.set(-10,0,0)

//jupiter
const sphere5=new THREE.SphereBufferGeometry(0.20618,30,30)
const spheremesh5=new THREE.Mesh(sphere5,materialjupiter)
group.add(spheremesh5)
spheremesh5.position.set(-12.5,0,0)

//saturn
const sphere6=new THREE.SphereBufferGeometry(0.1754,30,30)
const spheremesh6=new THREE.Mesh(sphere6,materialsaturn)
group.add(spheremesh6)
spheremesh6.position.set(-15,0,0)


//uranus
const sphere7=new THREE.SphereBufferGeometry(0.0746,30,30)
const spheremesh7=new THREE.Mesh(sphere7,materialuranus)
group.add(spheremesh7)
spheremesh7.position.set(-17.5,0,0)

//neptune
const sphere8=new THREE.SphereBufferGeometry(0.0722,30,30)
const spheremesh8=new THREE.Mesh(sphere8,materialneptune)
group.add(spheremesh8)
spheremesh8.position.set(-20,0,0)

//pluto
const sphere9=new THREE.SphereBufferGeometry(0.0441,30,30)
const spheremesh9=new THREE.Mesh(sphere9,materialpluto)
group.add(spheremesh9)
spheremesh9.position.set(-22.5,0,0)

 
//doubleclick full screen
window.addEventListener('dblclick',()=>
{
    const fullscreenelement=document.fullscreenElement
    if(!fullscreenelement)
    {
        canvas.requestFullscreen()
    }
    else{document.exitFullscreen()}
})


//window resize
window.addEventListener('resize',()=>
{
   sizes.width=window.innerWidth
   sizes.height=window.innerHeight

   camera.aspect=sizes.width/sizes.height
   camera.updateProjectionMatrix()

   renderer.setSize(sizes.width,sizes.height)
   renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})


//lights
const light=new THREE.AmbientLight('white',0.5)
//const light=new THREE.AmbientLight('purple',0.4)
//gui.add(light,'intensity').min(0).max(1).step(0.01)



//light helpers
//const hemisphereLightHelper = new THREE.HemisphereLightHelper(light,0.2)
//gui.add(hemisphereLightHelper,'size').min(0.1).max(1).step(0.01)
//scene.add(hemisphereLightHelper)
//tweaking for ambient light
//tweaking for hemisphere light
/*gui
    .addColor(parameters, 'color')
    .onChange(() =>
    {
        light.color.set(parameters.color,'blue')
    })
*/
scene.add(light)


//camera
const camera=new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,1000)
camera.position.z=10
scene.add(camera)


//controls
const controls = new OrbitControls(camera,canvas)
//const controls=new FirstPersonControls(camera,canvas)
//const controls=new FlyControls(camera,canvas)
//const controls=new PointerLockControls(camera,canvas)
//const controls
controls.enableDamping = true


//renderer
const renderer=new THREE.WebGLRenderer({canvas:canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

//animate
const clock=new THREE.Clock()
const animate=()=>
{
  const elapsedTime=clock.getElapsedTime() 
  controls.update()
  renderer.render(scene,camera)
  //moonmesh.rotate(new THREE.Vector3(1,0,0),Math.PI*2)
 group.rotation.y += 0.001
  window.requestAnimationFrame(animate)
}
animate()
