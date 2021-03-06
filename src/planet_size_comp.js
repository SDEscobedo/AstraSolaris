import * as THREE from 'three';
			

let container, stats, asteroid;

let camera, cameraTarget, scene, renderer;

class App{

    init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );
    
        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 10 );
        camera.position.set( 2.5, 0, 2.5 );
    
        cameraTarget = new THREE.Vector3( 0, -0.4, 0.5 * 0.5);
    
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x16161a );
        scene.fog = new THREE.Fog( 0x72645b, 1, 20);
    
        // Ground
    
        const plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( 40, 40 ),
            new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
        );
        plane.rotation.x = - Math.PI / 2;
        plane.position.y = - 0.5;
        scene.add( plane );
    
        plane.receiveShadow = true;
    
    
    
        //Planets
        CreatePlanets(0.01, 0.5);
        
        
    
        // Lights
    
        scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
    
        addShadowedLight( 1, 1, 1, 0xffffff, 0.7 );
        addShadowedLight( 0.5, 1, - 1, 0xffaa00, 0.6 );
    
        // renderer
    
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.outputEncoding = THREE.sRGBEncoding;
    
        renderer.shadowMap.enabled = true;
    
    
        container.appendChild( renderer.domElement );
    
    
        window.addEventListener( 'resize', onWindowResize, false );
    
        animate();
    }
}


function addShadowedLight( x, y, z, color, intensity ) {

    const directionalLight = new THREE.DirectionalLight( color, intensity );
    directionalLight.position.set( x, y, z );
    scene.add( directionalLight );

    directionalLight.castShadow = true;

    const d = 1;
    directionalLight.shadow.camera.left = - d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = - d;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;

    directionalLight.shadow.bias = - 0.002;

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    render();
}

function render() {

    const timer = Date.now() * 0.0003;

    camera.position.x = Math.cos( timer / 5 ) * 1.35;
    camera.position.z = Math.sin( timer / 5 ) * 1.35;

    camera.lookAt( cameraTarget );

    renderer.render( scene, camera );

}

	function CreatePlanets(escala, separation){
    
    const geometryMercury = new THREE.SphereBufferGeometry( 0.39 * escala, 50, 55 );
    
    const geometryVenus = new THREE.SphereBufferGeometry( 0.95 * escala, 90, 90 );
    
    const geometryEarth = new THREE.SphereBufferGeometry( escala, 100, 100 );
    const geometryEarthAtmos = new THREE.SphereBufferGeometry( escala + 0.001 * escala, 100, 100 );
    
    const geometryMoon = new THREE.SphereBufferGeometry( 0.2727 * escala, 100, 100 );
    
    const geometryMars = new THREE.SphereBufferGeometry( 0.53 * escala , 95, 95 );
    const geometryMarsAtmosphere = new THREE.SphereBufferGeometry( 0.53 * escala + 5, 95, 95 );
    
    const geometryJupiter = new THREE.SphereBufferGeometry(11.2 * escala, 300, 300);
    
    const geometrySaturn = new THREE.SphereBufferGeometry(9.41 * escala, 250, 250);
    const geometryRing = new THREE.CylinderBufferGeometry((2.326 * 9.41 * escala),(2.326 * 9.41 * escala),0.001,95);
    
    const geometryUranus = new THREE.SphereBufferGeometry(3.98 * escala, 250, 250);
    
    const geometryNeptune = new THREE.SphereBufferGeometry(3.81 * escala, 250, 250);
    

    
     const textureMercury = new THREE.TextureLoader().load('../../app/textures/8k_mercury.jpg');
     const textureVenus = new THREE.TextureLoader().load('../../app/textures/4k_venus_atmosphere.jpg');
    
     const textureEarth = new THREE.TextureLoader().load('../../app/textures/earth_blue_NASA_2.jpg');
     const textureEarthSpec = new THREE.TextureLoader().load('../../app/textures/earth_specular_2048_g.jpg');
     const textureEarthNormal = new THREE.TextureLoader().load('../../app/textures/earth_normal_2048.jpg');
     const textureEarthAtmos = new THREE.TextureLoader().load('../../app/textures/8k_earth_clouds.jpg');
    
     const textureMoon =  new THREE.TextureLoader().load('../../app/textures/moon.jpg');
     const textureMoonNormal =  new THREE.TextureLoader().load('../../app/textures/moon_normal.jpg');
    
     const textureMars = new THREE.TextureLoader().load('../../app/textures/mars.jpg');
    
     const textureJupiter = new THREE.TextureLoader().load('../../app/textures/jupiter.jpg');
    
     const textureSaturn = new THREE.TextureLoader().load('../../app/textures/8k_saturn.jpg');
     const textureRing = new THREE.TextureLoader().load('../../app/textures/saturn_rings_black2.png');
    
     textureRing.anisotropy = 16;
    
     const textureUranus = new THREE.TextureLoader().load('../../app/textures/2k_uranus.jpg');
    
     const textureNeptune = new THREE.TextureLoader().load('../../app/textures/2k_neptune.jpg');
     
    
    // Create material with texture
     
     const materialMercury = new THREE.MeshStandardMaterial({map : textureMercury});
     const materialVenus = new THREE.MeshStandardMaterial({map : textureVenus});
    
     const materialEarth = new THREE.MeshStandardMaterial({map : textureEarth,
        normalMap:textureEarthNormal,
        normalScale: new THREE.Vector2(0.05,0),
        roughnessMap:textureEarthSpec,
        roughness:0.5});
     const materialEarthAtmos = new THREE.MeshStandardMaterial({color:0xFFFFFF, alphaMap : textureEarthAtmos,opacity: 1,transparent: true});
     const materialMoon = new THREE.MeshStandardMaterial({map : textureMoon,
         normalMap:textureMoonNormal,
         normalScale: new THREE.Vector2(0.05,0.05)});
    
     const materialMars = new THREE.MeshStandardMaterial({map : textureMars});
     const materialMarsAtmos = new THREE.MeshStandardMaterial({ color: 0xF6723C , opacity: 0.3,
        transparent: true});
    
    const materialJupiter = new THREE.MeshStandardMaterial({map : textureJupiter});
    
    const materialSaturn = new THREE.MeshStandardMaterial({map : textureSaturn});
    
    const materialRing = new THREE.MeshBasicMaterial({map : textureRing,transparent:true});
    
    const materialUranus = new THREE.MeshStandardMaterial({map : textureUranus});
    
    const materialNeptune = new THREE.MeshStandardMaterial({map : textureNeptune});
    
    
    // Create mesh with geometry and material
	const y = -30 * escala;
	const tras = -0.5;
	const mercury = new THREE.Mesh(geometryMercury, materialMercury);
	mercury.position.set(0,y,-.1*separation + tras);
	mercury.castShadow = true;

	const venus = new THREE.Mesh(geometryVenus, materialVenus);
	venus.position.set(0,y,0.1*separation + tras);
	venus.castShadow = true;
	
	const earth = new THREE.Mesh(geometryEarth, materialEarth);
	earth.position.set(0,y,0.3*separation + tras );
	earth.castShadow = true;

	const earthAtmos = new THREE.Mesh(geometryEarthAtmos, materialEarthAtmos);
	earthAtmos.position.set(0,y,0.3*separation + tras);
    
	const mars = new THREE.Mesh(geometryMars, materialMars);
	mars.position.set(0,y,0.5*separation + tras);
	mars.castShadow = true;

    const jupiter = new THREE.Mesh(geometryJupiter, materialJupiter);
	jupiter.position.set(0,y,1*separation + tras);
	jupiter.castShadow = true;
	
	const saturn = new THREE.Mesh(geometrySaturn, materialSaturn);
	saturn.position.set(0,y,1.8*separation + tras);
	saturn.castShadow = true;
	//saturn.receiveShadow = true;
	const ring = new THREE.Mesh(geometryRing, materialRing);
	ring.position.set(0,y,1.8*separation + tras);
	ring.castShadow = true;
	//ring.receiveShadow = true;
    
    const uranus = new THREE.Mesh(geometryUranus, materialUranus);
	uranus.position.set(0,y,2.5*separation + tras);
	uranus.castShadow = true;
	
    const neptune = new THREE.Mesh(geometryNeptune, materialNeptune);
	neptune.position.set(0,y,2.8*separation + tras);
	neptune.castShadow = true;
    
    
    // Add to scene
    
    scene.add(mercury);
    scene.add(venus);
    
    scene.add(earth);
    scene.add(earthAtmos);
    
    scene.add(mars);
    
    scene.add(jupiter);
    
    scene.add(saturn);
    scene.add(ring);
    
    scene.add(uranus);
    
    scene.add(neptune);
}

export { App }