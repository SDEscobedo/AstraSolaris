//import { XRHitTestTrackableType } from 'three';
import * as THREE from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const GRADTORAD = Math.PI/180;
const MILISECARC = Math.PI * 2 / (24*60*60*1000);
const axisY = new THREE.Vector3(0,1,0);
const axisX = new THREE.Vector3(1,0,0);
//const axisZ = new THREE.Vector3(0,0,1);
const origin = new THREE.Vector3(0,0,0);

 var tm = new Date();
 var JulianDateIndex;


 const root = "https://raw.githubusercontent.com/SDEscobedo/AstraSolaris/master/ephemeris"

 //planetary ephemerids
 var url = [];
 url[0] = root + "/sun_2000-2024.csv";
 url[1] = root + "/mercury_2000-2024.csv";
 url[2] = root + "/venus_2000-2024.csv";
 url[3] = root + "/earth_2000-2024.csv";
 url[9] = root + "/moon_2000-2024.csv";
 url[4] = root + "/mars_2000-2024.csv";
 url[5] = root + "/jupiter_2000-2024.csv";
 url[6] = root + "/saturn_2000-2024.csv";
 url[7] = root + "/uranus_2000-2024.csv";
 url[8] = root + "/neptune_2000-20024.csv";
 url[20] = root + "/halley_2000-2024.csv";

 //ephemerids data for osculatory orbit
 
 url[10] = root + "/mercury_oscul_200-2024.csv";
 url[11] = root + "/venus_oscul_2000-2024.csv";
 url[12] = root + "/earth_oscul_2000-2024.csv";
 url[19] = root + "/moon_oscul_2000-2024.csv";
 url[13] = root + "/mars_oscul_2000-2024.csv";
 url[14] = root + "/jupiter_oscul_2000-2024.csv";
 url[15] = root + "/saturn_oscul_2000-2024.csv";
 url[16] = root + "/uranus_oscul_2000-2024.csv";
 url[17] = root + "/neptune_oscul_2000-2024.csv";
 url[18] = root + "/halley_oscul_2000-2024.csv";

 load_papa_parse();



export function AddStars(UA, scene){


    // stars
    const radius = 30*UA;
    var i, r = radius, starsGeometry = [ new THREE.BufferGeometry(), new THREE.BufferGeometry() ];
    
    var vertices1 = [];
    var vertices2 = [];
    
    var vertex = new THREE.Vector3();
    
    for ( i = 0; i < 250; i ++ ) {
    
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar( r );
    
        vertices1.push( vertex.x, vertex.y, vertex.z );
    
    }
    
    for ( i = 0; i < 1500; i ++ ) {
    
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar( r );
    
        vertices2.push( vertex.x, vertex.y, vertex.z );
    
    }
    
    starsGeometry[ 0 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices1, 3 ) );
    starsGeometry[ 1 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices2, 3 ) );
    
    var stars;
    var starsMaterials = [
        new THREE.PointsMaterial( { color: 0x555555, size: 2, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x555555, size: 1, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x333333, size: 2, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x1a1a1a, size: 2, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x1a1a1a, size: 1, sizeAttenuation: false } )
    ];
    
    for ( i = 10; i < 30; i ++ ) {
    
        stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );
    
        stars.rotation.x = Math.random() * 6;
        stars.rotation.y = Math.random() * 6;
        stars.rotation.z = Math.random() * 6;
        stars.scale.setScalar( i * 10 );
    
        stars.matrixAutoUpdate = false;
        stars.updateMatrix();
    
        scene.add( stars );
    
    }

}

 export function CreateSun(EarthScale,scene){

    const geometrySun = new THREE.SphereBufferGeometry( 109.076 * EarthScale, 100, 100 );
    const geometryCrown = new THREE.PlaneBufferGeometry( 180 * 109.076 * EarthScale, 180 * 109.076 * EarthScale );
    //const textureSun = new THREE.TextureLoader().load('textures/heliographic_negative_bw2.jpg');
    const textureCrown = new THREE.TextureLoader().load('./../app/textures/lensflare/star_flare.png');
    //const materialSun = new THREE.MeshStandardMaterial({emissiveMap : textureSun,emissive: 0xFFFFFF,emissiveIntensity:1});
    const materialSun = new THREE.MeshStandardMaterial({color:0xFFFFFF,emissive: 0xFFFFFF,emissiveIntensity:1});
    const materialCrown = new THREE.MeshStandardMaterial({emissiveMap : textureCrown, alphaMap:textureCrown, emissive: 0xFFFFFF,emissiveIntensity:1,transparent:true,opacity:1});
    const sun = new THREE.Mesh(geometrySun, materialSun);
    const crown = new THREE.Mesh(geometryCrown, materialCrown);
    sun.name = 'Sun';
    sun.UserData = {Radius : 109.076 * EarthScale};
    crown.name = 'crown';
    sun.position.set(0,0,0);
    sun.add(crown); 

     //Sunligth
     const sunlight = new THREE.PointLight( {color:0xFFFFFF, decay: 2, intensity: 1} );
     sunlight.position.set( 0, 0, 0 );
     sunlight.castShadow = true;
     //Set up shadow properties for the light
     sunlight.shadow.mapSize.width = 5;  // default
     sunlight.shadow.mapSize.height = 5; // default
     sunlight.shadow.camera.near = 0.5;       // default
     sunlight.shadow.camera.far = 1000 * EarthScale ; // default
     sunlight.name = 'sunligth';
     sun.add( sunlight );

     // lensflares
     const textureLoader = new THREE.TextureLoader();

     //const textureFlare0 = textureLoader.load( 'textures/lensflare/lensflare0.png' );
     const textureFlare3 = textureLoader.load( './../app/textures/lensflare/lensflare3.png' );


     const lensflare = new Lensflare();
                 //lensflare.addElement( new LensflareElement( textureFlare0, 700, 0, light.color ) );
                 lensflare.addElement( new LensflareElement( textureFlare3, 60, 0.6 ) );
                 lensflare.addElement( new LensflareElement( textureFlare3, 70, 0.7 ) );
                 lensflare.addElement( new LensflareElement( textureFlare3, 120, 0.9 ) );
                 lensflare.addElement( new LensflareElement( textureFlare3, 70, 1 ) );
                 lensflare.name = 'LensFlare'
                 lensflare.visible = false; //Default mode
                 sunlight.add( lensflare );
    scene.add(sun);
 }

 export function CreatePlanets(EarthScale,UA,scene, urlPlanets = "./../data/planets_run.csv", OrbitColor = 0x4E4E4E){

    const urlMoons = "./../data/moons_run.csv";
    
    Papa.parse(urlMoons, {
        download: true,
        dynamicTyping: false,
        header: true,
        error: function(error) {
            console.log("Error found:", error);
        },
        complete: function(results) { 
             //Moons data      
             const MoonsData = results.data;

    //Import orbit parameters 
    Papa.parse(urlPlanets, {
        download: true,
        dynamicTyping: false,
        header: true,
        error: function(error) {
            console.log("Error found: ", error);
        },
        complete: function(results) { 
             //Parámetros orbitales
             const loader = new THREE.TextureLoader();
             for(var i=0;i < results.data.length;i++){

                const EcRadius = Number(results.data[i]["Relative_Ecuatorial_Radius"]); //Radius

                if (EcRadius > 0){
                const EC = Number(results.data[i]["Eccentricity"]); //Eccentricity
                const IN = Number(results.data[i]["Inclination"]) * GRADTORAD; //Inclination
                const OM = Number(results.data[i]["L_ascending_node"]) * GRADTORAD; //Longitud of ascending node
                const W = Number(results.data[i]["Argument_of_periapsis"]) * GRADTORAD; //Argument of periapsis
                const A = Number(results.data[i]["Orbit_semimajor_axis_[UA]"]); //Semi-major axis
                const OB = Number(results.data[i]["Obliquity"]) * GRADTORAD; //Obliquity
    
                const NAM = results.data[i]["Name"]; //Name
                const textureUrl = results.data[i]["TextureFile"]; //Texture image of planet
                const Modelurl = results.data[i]["Model"]; //Model .glb
                const ModelScale = Number(results.data[i]["ModelScale"]); //Model .glb;
                
                
                var NormalMapUrl, textureNormal, SpecularMapUrl, textureSpecular, claudsTextureUrl, textureClouds
                if(NAM == "Earth"){
                    NormalMapUrl = results.data[i]["NormalMap"]; //Normal map of planet surface
                    textureNormal = new THREE.TextureLoader().load(NormalMapUrl);
                    SpecularMapUrl = results.data[i]["SpecularMap"]; //Normal map of planet surface
                    textureSpecular = new THREE.TextureLoader().load(SpecularMapUrl);
                    claudsTextureUrl = results.data[i]["claudsTexture"]; //Normal map of planet surface
                    textureClouds = new THREE.TextureLoader().load(claudsTextureUrl);
                }
                var PlanetMaterial;
                if (textureUrl != ""){
                    loader.load(textureUrl, function ( texture ) {
                        // Create the material when the texture is loaded                                
                        texture.needsUpdate = true;
                        var planet;
                        if(NAM != "Earth"){ 
                            PlanetMaterial = new THREE.MeshStandardMaterial( {map: texture} );
                            planet = CreatePlanet( EC, IN, OM, W, A * UA, OB, 0,
                                EcRadius * EarthScale,
                                EarthScale, UA, NAM, OrbitColor,
                                0.75, PlanetMaterial, MoonsData,
                                false);
                        }
                        else{
    
                            const AtmosMaterial =  new THREE.MeshStandardMaterial({color:0xFFFFFF, alphaMap : textureClouds,opacity: 1,transparent: true});
                            PlanetMaterial = new THREE.MeshStandardMaterial( {map : texture,
                                normalMap:textureNormal,
                                normalScale: new THREE.Vector2(0.05,0),
                                roughnessMap:textureSpecular,
                                roughness:0.75});
                                planet = CreatePlanet( EC, IN, OM, W, A * UA, OB, 0,
                                EcRadius * EarthScale,
                                EarthScale, UA, NAM, 
                                OrbitColor, 0.5, PlanetMaterial, 
                                MoonsData, Modelurl, ModelScale, 
                                true, AtmosMaterial);
                        }

                        scene.add(planet);
                        },
                    undefined,
                    function ( err ) {
                        console.error( "texture: " + textureUrl + ' An error happened. ' + err);
                        }
                    );
                }
                else{
                    PlanetMaterial = new THREE.MeshStandardMaterial( {color: 0x4E4E4E} );
                    const planet = CreatePlanet( EC, IN, OM, W, A * UA, OB, 0,
                        EcRadius * EarthScale,
                        EarthScale, UA, NAM, OrbitColor,
                        0.5, PlanetMaterial, MoonsData,
                        Modelurl, ModelScale,
                        false);
                        scene.add(planet);
                }
                }
            }
        }
        });
    }}
    );  
 }
 
 function CreateRing(SaturnScale){
    const textureRing = new THREE.TextureLoader().load('textures/saturn_rings_black2.png');
    const materialRing = new THREE.MeshBasicMaterial({map : textureRing,transparent:true});
    const geometryRing = new THREE.CylinderBufferGeometry((2.326 * SaturnScale),(2.326 * SaturnScale),0.001,95);
    const ring = new THREE.Mesh(geometryRing, materialRing);
    textureRing.anisotropy = 16;
    //ring.rotation.x = 1/2;
    //ring.castShadow = true;
    //ring.reciveShadow = true;
    ring.position.set(0,0,0);
    return ring;
 }
 
 function CreateSatellitesOf(EarthScale,UA,planet, MoonsData, OrbitColor =  0x3E4E4E){
    
    for(var i=0; i < MoonsData.length ; i++){
            
            const EcRadius = Number(MoonsData[i]["Relative_Ecuatorial_Radius"]); //Radius
            
        
        if ( MoonsData[i]["Moon of"]  + " system" == planet.name && EcRadius > 0){
            
            const EC = Number(MoonsData[i]["Eccentricity"]); //Eccentricity
            const IN = Number(MoonsData[i]["Inclination"]) * GRADTORAD; //Inclination
            const OM = Number(MoonsData[i]["L_ascending_node"]) * GRADTORAD; //Longitud of ascending node
            const W = Number(MoonsData[i]["Argument_of_periapsis"]) * GRADTORAD; //Argument of periapsis
            const A = Number(MoonsData[i]["Orbit_semimajor_axis_[UA]"]) * UA; //Semi-major axis
            const OB = Number(MoonsData[i]["Obliquity"]) * GRADTORAD; //Obliquity
            const RefPL = MoonsData[i]["Plane_of_reference"]; //Plane of reference
            const NAM = MoonsData[i]["Name"]; //Name
            const TextureUrl = MoonsData[i]["TextureFile"]; 
            const NormalMapUrl = MoonsData[i]["NormalMap"]; 
            const bumpMapUrl = MoonsData[i]["bumpMap"]; 
            const bumpScale = Number(MoonsData[i]["bumpScale"]); 
            const DisplacementMap = MoonsData[i]["displacementMap"]; 
            const dispScale = Number(MoonsData[i]["displacementScale"]); 
            const dispBias = Number(MoonsData[i]["displacementBias"]); 
            const Modelurl = MoonsData[i]["Model"]; //Model .glb
            const ModelScale = Number(MoonsData[i]["ModelScale"]); //Model scale factor
        
            var ParentObliquity;
            
            if (RefPL != "ecliptic") ParentObliquity = planet.UserData.Obliquity;
            else ParentObliquity = 0;
            
            
            if (TextureUrl != ""){
                const loader = new THREE.TextureLoader();

                // load texture
                loader.load(
                    TextureUrl,
                    function ( texture ) {
                        texture.needsUpdate = true;
                        const MoonMaterial = new THREE.MeshStandardMaterial( {
                            map: texture
                        } );
                        
                        if (NormalMapUrl != ""){
                            const loaderNormal = new THREE.TextureLoader();
                            loaderNormal.load(NormalMapUrl, function (NormalTexture) {
                                NormalTexture.needsUpdate = true;
                                MoonMaterial.normalMap =  NormalTexture;
                                MoonMaterial.normalScale = new THREE.Vector2(0.05,0.05);
                            });
                        }

                        if (DisplacementMap != ""){
                            const loaderDisp = new THREE.TextureLoader();
                            loaderDisp.load(DisplacementMap, function (DispTexture) {
                                DispTexture.needsUpdate = true;
                                MoonMaterial.displacementMap =  DispTexture;
                                MoonMaterial.displacementScale = dispScale;
                                MoonMaterial.displacementBias = dispBias;
                            });
                        }
                        
                        if (bumpMapUrl != ""){
                            const loaderBump = new THREE.TextureLoader();
                            
                            loaderBump.load(bumpMapUrl, function (bumpTexture) {
                                bumpTexture.needsUpdate = true;
                                MoonMaterial.bumpMap =  bumpTexture;
                                MoonMaterial.bumpScale = bumpScale;
                                planet.add(CreatePlanet( EC, IN, OM, W, A, OB, ParentObliquity,
                                    EcRadius * EarthScale,
                                    EarthScale, UA, NAM, OrbitColor, 0.7, MoonMaterial,
                                    undefined, Modelurl, ModelScale,
                                    false));
                            });
                        
                        } else {
                            planet.add(CreatePlanet( EC, IN, OM, W, A, OB, ParentObliquity,
                                EcRadius * EarthScale,
                                EarthScale, UA, NAM, OrbitColor, 0.7, MoonMaterial,
                                undefined, Modelurl, ModelScale,
                                false));
    
                            console.log("Creating " + NAM);
                        }

                         
                        
                       
                        
                    },
                    undefined,
                    function ( err ) {
                        console.error( 'An error happened:' + err );
                    }
                );




            }
            else{
                const MoonMaterialColor = new THREE.MeshStandardMaterial( {color: 0xA88052} );
                
                planet.add(CreatePlanet( EC, IN, OM, W, A, OB, ParentObliquity, EcRadius * EarthScale,
                     EarthScale, UA, NAM, OrbitColor, 0.7, MoonMaterialColor,
                    undefined, Modelurl, ModelScale,
                    false));
                console.log("Crating " + NAM);
                
            }
        }
        
    } 
}

export function CreateArtificialSatellites(EarthScale,UA,planet,SatelliteData, OrbitColor = 0x2E4E4E){
    
    for(var i=0; i < MoonsData.length ; i++){
        
        if ( MoonsData[i]["Moon of"] == planet.name && EcRadius > 0){
            
            const EC = Number(MoonsData[i]["Eccentricity"]) ; //Eccentricity
            const IN = Number(MoonsData[i]["Inclination"]) * GRADTORAD; //Inclination
            const OM = Number(MoonsData[i]["L_ascending_node"]) * GRADTORAD; //Longitud of ascending node
            const W = Number(MoonsData[i]["Argument_of_periapsis"]) * GRADTORAD; //Argument of periapsis
            const A = Number(MoonsData[i]["Orbit_semimajor_axis_[UA]"]); //Semi-major axis
            const NAM = MoonsData[i]["Name"]; //Name
            const Modelurl = MoonsData[i]["Model"]; //Model .glb
            const ModelScale = Number(MoonsData[i]["ModelScale"]); //Model .glb;
            
           
            if (Modelulr != ""){
             
                        planet.add(CreatePlanet( EC, IN, OM, W, A * UA , OB, 0,
                            EcRadius * EarthScale,
                            EarthScale, UA, NAM,
                            OrbitColor, 0.7, undefined,
                            undefined, Modelurl, ModelScale,
                            false));

                        console.log("Creating " + NAM);
            }else{
                console.log("No model found for " + NAM);
            }
        }
        
    } 
}

export function CreateOrbits(UA,scene){
    //Import orbit parameters
    
    const urlPlanets = "https://raw.githubusercontent.com/SDEscobedo/AstraSolaris/master/data/planets_run.csv";
    
    Papa.parse(urlPlanets, {
        download: true,
        dynamicTyping: false,
        header: true,
        error: function(error) {
            console.log("Error found:", error);
        },
        complete: function(results) { 
             //Parámetros orbitales
             for(var i=0;i < results.data.length;i++){
               
                const EC = Number(results.data[i]["Eccentricity"]); //Eccentricity
                const IN = Number(results.data[i]["Inclination"]) ; //Inclination
                const OM = Number(results.data[i]["L_ascending_node"]) ; //Longitud of ascending node
                const W = Number(results.data[i]["Argument_of_periapsis"]); //Argument of periapsis
                const A = Number(results.data[i]["Orbit_semimajor_axis_[UA]"]); //Semi-major axis
                const NA = results.data[i]["Name"]; //Name
                scene.add(CreateOsculOrbit2(0,0,0,EC,IN,OM,W,A*UA,NA, 0x4E4E4E));
                }
        }
        });

}


export function SkyReference(radius, scene, center = new THREE.Vector3(0,0,0)){
    var i;
    let Group = new THREE.Group();
    
    //paralelos
    for (i=0;i < 18; i++){
    const curve = new THREE.EllipseCurve(
        0,  0,            // ax, aY
        radius, radius,           // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    );
    

    const points = curve.getPoints( 50 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    var color1;
    if (i==0) color1 =  0xe64949;
    else color1 =  0x101010;
    const material = new THREE.LineBasicMaterial( { color : color1} );
    
    // Create the final object to add to the scene
    const ellipse = new THREE.Line( geometry, material );
    ellipse.rotation.y += 10*i / 180 * Math.PI;

    Group.add(ellipse); 

    }

    //Meridianos
    for (i=0;i < 9; i++){
        const h = radius * Math.sin(10*i / 180* Math.PI);
        const r = radius * Math.cos(10*i / 180* Math.PI);
        const curve = new THREE.EllipseCurve(
            0,  0,            // ax, aY
            r, r,           // xRadius, yRadius
            0,  2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );
        
    
        const points = curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        var color2;
        if (i==0) color2 =  0xe64949;
        else color2 =  0x101010;
        const material = new THREE.LineBasicMaterial( { color : color2 } );
        
        // Create the final object to add to the scene
        const ellipse = new THREE.Line( geometry, material );
        ellipse.rotation.x = 90 / 180* Math.PI;
        const ellipse2 = ellipse.clone();
        ellipse.position.set(0,h,0);
        ellipse2.position.set(0,-h,0);

    
        Group.add(ellipse); 
        Group.add(ellipse2); 
    
        }
        Group.position.set(center.x,center.y,center.z);
        Group.name = 'reference sphere'
        scene.add(Group);
}

export function CreateReferenceGeometry(UA, scene){
    
    var materialX = new THREE.LineBasicMaterial({color: 'green'});
    var materialY = new THREE.LineBasicMaterial({color: 'red'});
    var materialZ = new THREE.LineBasicMaterial({color: 'yellow'});

    var pointsX = [];
    pointsX.push( new THREE.Vector3( 0, 0, 0 ) );
    pointsX.push( new THREE.Vector3( 10*UA, 0, 0 ) );
    var geometryX = new THREE.BufferGeometry().setFromPoints( pointsX );

    var pointsY = [];
    pointsY.push( new THREE.Vector3( 0, 0, 0 ) );
    pointsY.push( new THREE.Vector3( 0, 10*UA, 0 ) );
    var geometryY = new THREE.BufferGeometry().setFromPoints( pointsY );

    var pointsZ = [];
    pointsZ.push( new THREE.Vector3( 0, 0, 0 ) );
    pointsZ.push( new THREE.Vector3( 0, 0, 10*UA ) );    
    var geometryZ = new THREE.BufferGeometry().setFromPoints( pointsZ );
    
    var lineEquinoxX = new THREE.Line( geometryX, materialX );
    var lineEquinoxY= new THREE.Line( geometryY, materialY );
    var lineEquinoxZ = new THREE.Line( geometryZ, materialZ );

    scene.add( lineEquinoxX );
    scene.add( lineEquinoxY );
    scene.add( lineEquinoxZ );
}

export function CreateOsculOrbit2(X,Y,Z,EC,IN,OM,W,A,Name, Color){
 
  //osculator orbit
  const Orbit_Line = new THREE.EllipseCurve(
    -EC * A, 0,          // ax, aY (center at focus)
    A, A * Math.sqrt( 1 - Math.pow( EC , 2 ) ), // xRadius (semieje mayor), yRadius (semieje menor)
    0,  2 * Math.PI,  // aStartAngle, aEndAngle
    false,            // aClockwise
    0//W  - 90 / 180* Math.PI // aRotation argument of periapsis
    );

var points = Orbit_Line.getPoints( 5000 );
var geometryOrbit = new THREE.BufferGeometry().setFromPoints( points );

var materialOrbit = new THREE.LineBasicMaterial( { color : Color } );

// Create the final object to add to the scene
var oscul2 = new THREE.Line( geometryOrbit, materialOrbit );
oscul2.name = "OrbitOf" + Name;
oscul2.rotation.x = 90 / 180 * Math.PI ;
oscul2.rotation.z = -W - OM ; //- 90 / 180* Math.PI // aRotation argument of periapsis
oscul2.rotateOnAxis(new THREE.Vector3(Math.cos(OM),Math.sin(OM),0),1 * IN); //Inclinación al rededor del eje de nodos

oscul2.position.x  = X;
oscul2.position.z  = Y;
oscul2.position.y  = Z;
return oscul2;
}

function CreatePlanet(EC,IN,OM,W,A,OB,ParentOB,Radius,EarthScale,UA,Name,OrbitColor,t,PlanetMaterial, MoonsData, Modelurl, ModelScale, Atmosphere, AtmosMaterial = undefined){
//Planet (moon, object)
const Planet = new THREE.Group();
 //osculator orbit
 const parameters = {
    Eccentricity: EC,
    Inclination : IN,
    SemiMajorAxis: A,
    Radius : Radius,
    Obliquity : OB
 }
 Planet.UserData = parameters;

 const B = A * Math.sqrt( 1 - Math.pow( EC , 2 ) );
 const f = A * -EC;

    const Orbit_Line = new THREE.EllipseCurve(
        f,  0,            // ax, aY
        A, B, // xRadius (semieje menor), yRadius (semieje mayor)
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    );

  var np;
  if(A < 30) np = 5000;
  else if(A < 60) np = 10000;
  else np = 20000;

  var points = Orbit_Line.getPoints( np );
  var geometryOrbit = new THREE.BufferGeometry().setFromPoints( points );
  
  var materialOrbit = new THREE.LineBasicMaterial( { color : OrbitColor } );
  
  // Create the final object to add to the scene
  var oscul = new THREE.Line( geometryOrbit, materialOrbit );
  oscul.name = "OrbitOf" + Name;

  //Vectors of orbital parameters
  const zeroPoint = Orbit_Line.getPoint(0)
  const p = new THREE.Vector3(zeroPoint.x,zeroPoint.y,zeroPoint.z);
  const dis = p.distanceTo(origin);
  p.normalize();
  const periapsisVector = new THREE.ArrowHelper(p,origin,dis,0xffff);
  periapsisVector.name = Name + " orbit periapsis";
  periapsisVector.visible = false;
  oscul.add(periapsisVector);

  //NodeLines
  const nodes = new THREE.Vector3( Math.sin(OM),Math.cos(OM),0);
  nodes.normalize();
  const nodesVector = new THREE.ArrowHelper(nodes,origin,A,0xBfff);
  nodesVector.name = Name + " orbit line of nodes";
  nodesVector.visible = false;
  oscul.add(nodesVector);
    
   /* //orbit interior
    var path = new THREE.Shape();
    path.absellipse(f,0,A,B,0, Math.PI*2, false,0);
    var Intgeometry = new THREE.ShapeBufferGeometry( path );
    var Intmaterial = new THREE.MeshBasicMaterial( { color: 0x59d1c1} );
    var ellipse = new THREE.Mesh( Intgeometry, Intmaterial );
    ellipse.visible = false;
    ellipse.name = Name + " orbit plane";
   // oscul.add(ellipse);*/

    //orbit day plane
    const OrbitPlane =  new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 0 );
    const helper = new THREE.PlaneHelper( OrbitPlane, 10*Radius, 0xffff00 );
    helper.name = Name + " day plane";
    helper.visible = false;
   // oscul.add(helper);
    helper.updateMatrixWorld();
    //grid helper
    
    /*const gridHelper = new THREE.GridHelper( 100*Radius, 100);
    gridHelper.name = Name + " orbit grid";
    gridHelper.rotation.x = 90 * GRADTORAD;
    gridHelper.visible = false;
    //oscul.add( gridHelper );*/
        
 

if (Modelurl != ""){
    //load Model

    const loader = new GLTFLoader();
    loader.load(
        Modelurl,
        // called when the resource is loaded
        function ( gltf ) {
            
            if (ModelScale == 0) ModelScale = 1;
            gltf.scene.children[0].scale.multiplyScalar(ModelScale);
            const body = gltf.scene.children[0];
            body.name = Name;
            body.UserData = parameters;
            //orientation of planet polar axis
            if (OB > 0) OB = body.rotation.x = OB;
            const polaraxis = new THREE.ArrowHelper(axisY,body.position,2*Radius,0xffff);
            polaraxis.name = Name + " polar axis";
            polaraxis.visible = false;
            body.add(polaraxis);
            Planet.add(body);
        },

        // called while loading is progressing
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        // called when loading has errors
        function ( error ) {

            console.log( Modelurl + ' An error happened' + error);

        }
    );

}
else{

    const geometryPlanet = new THREE.SphereBufferGeometry(Radius, 100, 100);
    const body = new THREE.Mesh(geometryPlanet, PlanetMaterial)
    body.name = Name;
    body.UserData = parameters;

    //orientation of planet polar axis
    if (OB > 0){ 
        body.rotation.x = OB;
        if (Name == "Saturn"){
            const ring = CreateRing(Radius);
            ring.rotation.x = OB;
            Planet.add(ring);
           }
    }
    const polaraxis = new THREE.ArrowHelper(axisY,body.position,2*Radius,0xffff);
    polaraxis.name = Name + " polar axis";
    polaraxis.visible = false;
    body.add(polaraxis);

    if (Atmosphere === true){
        const geometryAtmos = new THREE.SphereBufferGeometry( Radius + 0.001 * Radius, 100, 100 );
        const Atmos = new THREE.Mesh(geometryAtmos, AtmosMaterial);
        Atmos.name =  Name + " atmosphere";
        body.add(Atmos);
      }

    Planet.add(body);
}


  const r = Orbit_Line.getPoint(t);
  Planet.position.set(r.x,r.y,r.z);
  //gridHelper.position.set(r.x,r.y,r.z);
  helper.position.set(r.x,r.y,r.z);
  Planet.rotation.x = 90 * GRADTORAD;
  
  Planet.name = Name + " system";


  //Add moons (satellites) of the planet
  if (MoonsData != undefined) CreateSatellitesOf(EarthScale,UA,Planet,MoonsData);

  const Group = new THREE.Group();
  Group.add(Planet);
  Group.add(oscul);

  
  //rotate group
  Group.rotation.x = -90 * GRADTORAD;
  Group.rotation.y = 0;
  Group.rotation.z = 90 * GRADTORAD;
  Group.rotateOnWorldAxis(axisY, OM); //longitude of ascending node
  Group.rotation.z += W; //Argument of periapsis

  const dirNodes = new THREE.Vector3(Math.sin(OM),0,Math.cos(OM));
  dirNodes.normalize();
  Group.rotateOnWorldAxis(dirNodes, IN); //Inclination
  Group.rotateOnWorldAxis(axisX, ParentOB); //Correction for Laplace Plane
  


  //if (lineOfNodes) lineOfNodes.setDirection(dirNodes);                                
  //lineOfNodes.setLength(1);

  Group.name = "System" + Planet.name


return Group;       
}

export function SolarSystemUpdate(scene, camera){
    // Rotate cube (Change values to change speed)
    var tm =  Date.now();    
    scene.getObjectByName("Sun").rotation.y += 0.0005;
    scene.getObjectByName("crown").lookAt(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z));
    
    const mercury = scene.getObjectByName("Mercury");
    if (mercury != undefined){
         
         mercury.rotation.y = MILISECARC * tm / 58.785;

    }
    
    const jupiter = scene.getObjectByName("Jupiter");
    if (jupiter != undefined){
         
         jupiter.rotation.y = MILISECARC * tm / 0.414;

    }
    
    const earth = scene.getObjectByName("Earth");
    
    const moon = scene.getObjectByName("Moon");
    if (earth != undefined && moon != undefined) {
        const earthAtmos = scene.getObjectByName("Earth atmosphere");
        earth.rotation.y = MILISECARC * tm + 150 * GRADTORAD;
        earthAtmos.rotation.y = MILISECARC * tm * 17;//just for visual effect
        moon.lookAt(new THREE.Vector3(earth.position.x, earth.position.y, earth.position.z));
        moon.rotation.y = 90 * GRADTORAD;

    }

}

function load_papa_parse()
{
 /*!
	Papa Parse
	v4.1.2
c	https://github.com/mholt/PapaParse
*/
!function(e){"use strict";function t(t,r){if(r=r||{},r.worker&&S.WORKERS_SUPPORTED){var n=f();return n.userStep=r.step,n.userChunk=r.chunk,n.userComplete=r.complete,n.userError=r.error,r.step=m(r.step),r.chunk=m(r.chunk),r.complete=m(r.complete),r.error=m(r.error),delete r.worker,void n.postMessage({input:t,config:r,workerId:n.id})}var o=null;return"string"==typeof t?o=r.download?new i(r):new a(r):(e.File&&t instanceof File||t instanceof Object)&&(o=new s(r)),o.stream(t)}function r(e,t){function r(){"object"==typeof t&&("string"==typeof t.delimiter&&1==t.delimiter.length&&-1==S.BAD_DELIMITERS.indexOf(t.delimiter)&&(u=t.delimiter),("boolean"==typeof t.quotes||t.quotes instanceof Array)&&(o=t.quotes),"string"==typeof t.newline&&(h=t.newline))}function n(e){if("object"!=typeof e)return[];var t=[];for(var r in e)t.push(r);return t}function i(e,t){var r="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=e instanceof Array&&e.length>0,i=!(t[0]instanceof Array);if(n){for(var a=0;a<e.length;a++)a>0&&(r+=u),r+=s(e[a],a);t.length>0&&(r+=h)}for(var o=0;o<t.length;o++){for(var f=n?e.length:t[o].length,c=0;f>c;c++){c>0&&(r+=u);var d=n&&i?e[c]:c;r+=s(t[o][d],c)}o<t.length-1&&(r+=h)}return r}function s(e,t){if("undefined"==typeof e||null===e)return"";e=e.toString().replace(/"/g,'""');var r="boolean"==typeof o&&o||o instanceof Array&&o[t]||a(e,S.BAD_DELIMITERS)||e.indexOf(u)>-1||" "==e.charAt(0)||" "==e.charAt(e.length-1);return r?'"'+e+'"':e}function a(e,t){for(var r=0;r<t.length;r++)if(e.indexOf(t[r])>-1)return!0;return!1}var o=!1,u=",",h="\r\n";if(r(),"string"==typeof e&&(e=JSON.parse(e)),e instanceof Array){if(!e.length||e[0]instanceof Array)return i(null,e);if("object"==typeof e[0])return i(n(e[0]),e)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),e.data instanceof Array&&(e.fields||(e.fields=e.data[0]instanceof Array?e.fields:n(e.data[0])),e.data[0]instanceof Array||"object"==typeof e.data[0]||(e.data=[e.data])),i(e.fields||[],e.data||[]);throw"exception: Unable to serialize unrecognized input"}function n(t){function r(e){var t=_(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new o(t),this._handle.streamer=this,this._config=t}this._handle=null,this._paused=!1,this._finished=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},r.call(this,t),this.parseChunk=function(t){if(this.isFirstChunk&&m(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(t);void 0!==r&&(t=r)}this.isFirstChunk=!1;var n=this._partialLine+t;this._partialLine="";var i=this._handle.parse(n,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=i.meta.cursor;this._finished||(this._partialLine=n.substring(s-this._baseIndex),this._baseIndex=s),i&&i.data&&(this._rowCount+=i.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(y)e.postMessage({results:i,workerId:S.WORKER_ID,finished:a});else if(m(this._config.chunk)){if(this._config.chunk(i,this._handle),this._paused)return;i=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(i.data),this._completeResults.errors=this._completeResults.errors.concat(i.errors),this._completeResults.meta=i.meta),!a||!m(this._config.complete)||i&&i.meta.aborted||this._config.complete(this._completeResults),a||i&&i.meta.paused||this._nextChunk(),i}},this._sendError=function(t){m(this._config.error)?this._config.error(t):y&&this._config.error&&e.postMessage({workerId:S.WORKER_ID,error:t,finished:!1})}}function i(e){function t(e){var t=e.getResponseHeader("Content-Range");return parseInt(t.substr(t.lastIndexOf("/")+1))}e=e||{},e.chunkSize||(e.chunkSize=S.RemoteChunkSize),n.call(this,e);var r;this._nextChunk=k?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)return void this._chunkLoaded();if(r=new XMLHttpRequest,k||(r.onload=g(this._chunkLoaded,this),r.onerror=g(this._chunkError,this)),r.open("GET",this._input,!k),this._config.chunkSize){var e=this._start+this._config.chunkSize-1;r.setRequestHeader("Range","bytes="+this._start+"-"+e),r.setRequestHeader("If-None-Match","webkit-no-cache")}try{r.send()}catch(t){this._chunkError(t.message)}k&&0==r.status?this._chunkError():this._start+=this._config.chunkSize},this._chunkLoaded=function(){if(4==r.readyState){if(r.status<200||r.status>=400)return void this._chunkError();this._finished=!this._config.chunkSize||this._start>t(r),this.parseChunk(r.responseText)}},this._chunkError=function(e){var t=r.statusText||e;this._sendError(t)}}function s(e){e=e||{},e.chunkSize||(e.chunkSize=S.LocalChunkSize),n.call(this,e);var t,r,i="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,r=e.slice||e.webkitSlice||e.mozSlice,i?(t=new FileReader,t.onload=g(this._chunkLoaded,this),t.onerror=g(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var n=Math.min(this._start+this._config.chunkSize,this._input.size);e=r.call(e,this._start,n)}var s=t.readAsText(e,this._config.encoding);i||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function a(e){e=e||{},n.call(this,e);var t,r;this.stream=function(e){return t=e,r=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e=this._config.chunkSize,t=e?r.substr(0,e):r;return r=e?r.substr(e):"",this._finished=!r,this.parseChunk(t)}}}function o(e){function t(){if(b&&d&&(h("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+S.DefaultDelimiter+"'"),d=!1),e.skipEmptyLines)for(var t=0;t<b.data.length;t++)1==b.data[t].length&&""==b.data[t][0]&&b.data.splice(t--,1);return r()&&n(),i()}function r(){return e.header&&0==y.length}function n(){if(b){for(var e=0;r()&&e<b.data.length;e++)for(var t=0;t<b.data[e].length;t++)y.push(b.data[e][t]);b.data.splice(0,1)}}function i(){if(!b||!e.header&&!e.dynamicTyping)return b;for(var t=0;t<b.data.length;t++){for(var r={},n=0;n<b.data[t].length;n++){if(e.dynamicTyping){var i=b.data[t][n];b.data[t][n]="true"==i||"TRUE"==i?!0:"false"==i||"FALSE"==i?!1:o(i)}e.header&&(n>=y.length?(r.__parsed_extra||(r.__parsed_extra=[]),r.__parsed_extra.push(b.data[t][n])):r[y[n]]=b.data[t][n])}e.header&&(b.data[t]=r,n>y.length?h("FieldMismatch","TooManyFields","Too many fields: expected "+y.length+" fields but parsed "+n,t):n<y.length&&h("FieldMismatch","TooFewFields","Too few fields: expected "+y.length+" fields but parsed "+n,t))}return e.header&&b.meta&&(b.meta.fields=y),b}function s(t){for(var r,n,i,s=[",","	","|",";",S.RECORD_SEP,S.UNIT_SEP],a=0;a<s.length;a++){var o=s[a],h=0,f=0;i=void 0;for(var c=new u({delimiter:o,preview:10}).parse(t),d=0;d<c.data.length;d++){var l=c.data[d].length;f+=l,"undefined"!=typeof i?l>1&&(h+=Math.abs(l-i),i=l):i=l}c.data.length>0&&(f/=c.data.length),("undefined"==typeof n||n>h)&&f>1.99&&(n=h,r=o)}return e.delimiter=r,{successful:!!r,bestDelimiter:r}}function a(e){e=e.substr(0,1048576);var t=e.split("\r");if(1==t.length)return"\n";for(var r=0,n=0;n<t.length;n++)"\n"==t[n][0]&&r++;return r>=t.length/2?"\r\n":"\r"}function o(e){var t=l.test(e);return t?parseFloat(e):e}function h(e,t,r,n){b.errors.push({type:e,code:t,message:r,row:n})}var f,c,d,l=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,p=this,g=0,v=!1,k=!1,y=[],b={data:[],errors:[],meta:{}};if(m(e.step)){var R=e.step;e.step=function(n){if(b=n,r())t();else{if(t(),0==b.data.length)return;g+=n.data.length,e.preview&&g>e.preview?c.abort():R(b,p)}}}this.parse=function(r,n,i){if(e.newline||(e.newline=a(r)),d=!1,!e.delimiter){var o=s(r);o.successful?e.delimiter=o.bestDelimiter:(d=!0,e.delimiter=S.DefaultDelimiter),b.meta.delimiter=e.delimiter}var h=_(e);return e.preview&&e.header&&h.preview++,f=r,c=new u(h),b=c.parse(f,n,i),t(),v?{meta:{paused:!0}}:b||{meta:{paused:!1}}},this.paused=function(){return v},this.pause=function(){v=!0,c.abort(),f=f.substr(c.getCharIndex())},this.resume=function(){v=!1,p.streamer.parseChunk(f)},this.aborted=function(){return k},this.abort=function(){k=!0,c.abort(),b.meta.aborted=!0,m(e.complete)&&e.complete(b),f=""}}function u(e){e=e||{};var t=e.delimiter,r=e.newline,n=e.comments,i=e.step,s=e.preview,a=e.fastMode;if(("string"!=typeof t||S.BAD_DELIMITERS.indexOf(t)>-1)&&(t=","),n===t)throw"Comment character same as delimiter";n===!0?n="#":("string"!=typeof n||S.BAD_DELIMITERS.indexOf(n)>-1)&&(n=!1),"\n"!=r&&"\r"!=r&&"\r\n"!=r&&(r="\n");var o=0,u=!1;this.parse=function(e,h,f){function c(e){b.push(e),S=o}function d(t){return f?p():("undefined"==typeof t&&(t=e.substr(o)),w.push(t),o=g,c(w),y&&_(),p())}function l(t){o=t,c(w),w=[],O=e.indexOf(r,o)}function p(e){return{data:b,errors:R,meta:{delimiter:t,linebreak:r,aborted:u,truncated:!!e,cursor:S+(h||0)}}}function _(){i(p()),b=[],R=[]}if("string"!=typeof e)throw"Input must be a string";var g=e.length,m=t.length,v=r.length,k=n.length,y="function"==typeof i;o=0;var b=[],R=[],w=[],S=0;if(!e)return p();if(a||a!==!1&&-1===e.indexOf('"')){for(var C=e.split(r),E=0;E<C.length;E++){var w=C[E];if(o+=w.length,E!==C.length-1)o+=r.length;else if(f)return p();if(!n||w.substr(0,k)!=n){if(y){if(b=[],c(w.split(t)),_(),u)return p()}else c(w.split(t));if(s&&E>=s)return b=b.slice(0,s),p(!0)}}return p()}for(var x=e.indexOf(t,o),O=e.indexOf(r,o);;)if('"'!=e[o])if(n&&0===w.length&&e.substr(o,k)===n){if(-1==O)return p();o=O+v,O=e.indexOf(r,o),x=e.indexOf(t,o)}else if(-1!==x&&(O>x||-1===O))w.push(e.substring(o,x)),o=x+m,x=e.indexOf(t,o);else{if(-1===O)break;if(w.push(e.substring(o,O)),l(O+v),y&&(_(),u))return p();if(s&&b.length>=s)return p(!0)}else{var I=o;for(o++;;){var I=e.indexOf('"',I+1);if(-1===I)return f||R.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:b.length,index:o}),d();if(I===g-1){var D=e.substring(o,I).replace(/""/g,'"');return d(D)}if('"'!=e[I+1]){if(e[I+1]==t){w.push(e.substring(o,I).replace(/""/g,'"')),o=I+1+m,x=e.indexOf(t,o),O=e.indexOf(r,o);break}if(e.substr(I+1,v)===r){if(w.push(e.substring(o,I).replace(/""/g,'"')),l(I+1+v),x=e.indexOf(t,o),y&&(_(),u))return p();if(s&&b.length>=s)return p(!0);break}}else I++}}return d()},this.abort=function(){u=!0},this.getCharIndex=function(){return o}}function h(){var e=document.getElementsByTagName("script");return e.length?e[e.length-1].src:""}function f(){if(!S.WORKERS_SUPPORTED)return!1;if(!b&&null===S.SCRIPT_PATH)throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.");var t=S.SCRIPT_PATH||v;t+=(-1!==t.indexOf("?")?"&":"?")+"papaworker";var r=new e.Worker(t);return r.onmessage=c,r.id=w++,R[r.id]=r,r}function c(e){var t=e.data,r=R[t.workerId],n=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var i=function(){n=!0,d(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},s={abort:i,pause:l,resume:l};if(m(r.userStep)){for(var a=0;a<t.results.data.length&&(r.userStep({data:[t.results.data[a]],errors:t.results.errors,meta:t.results.meta},s),!n);a++);delete t.results}else m(r.userChunk)&&(r.userChunk(t.results,s,t.file),delete t.results)}t.finished&&!n&&d(t.workerId,t.results)}function d(e,t){var r=R[e];m(r.userComplete)&&r.userComplete(t),r.terminate(),delete R[e]}function l(){throw"Not implemented."}function p(t){var r=t.data;if("undefined"==typeof S.WORKER_ID&&r&&(S.WORKER_ID=r.workerId),"string"==typeof r.input)e.postMessage({workerId:S.WORKER_ID,results:S.parse(r.input,r.config),finished:!0});else if(e.File&&r.input instanceof File||r.input instanceof Object){var n=S.parse(r.input,r.config);n&&e.postMessage({workerId:S.WORKER_ID,results:n,finished:!0})}}function _(e){if("object"!=typeof e)return e;var t=e instanceof Array?[]:{};for(var r in e)t[r]=_(e[r]);return t}function g(e,t){return function(){e.apply(t,arguments)}}function m(e){return"function"==typeof e}var v,k=!e.document&&!!e.postMessage,y=k&&/(\?|&)papaworker(=|&|$)/.test(e.location.search),b=!1,R={},w=0,S={};if(S.parse=t,S.unparse=r,S.RECORD_SEP=String.fromCharCode(30),S.UNIT_SEP=String.fromCharCode(31),S.BYTE_ORDER_MARK="﻿",S.BAD_DELIMITERS=["\r","\n",'"',S.BYTE_ORDER_MARK],S.WORKERS_SUPPORTED=!k&&!!e.Worker,S.SCRIPT_PATH=null,S.LocalChunkSize=10485760,S.RemoteChunkSize=5242880,S.DefaultDelimiter=",",S.Parser=u,S.ParserHandle=o,S.NetworkStreamer=i,S.FileStreamer=s,S.StringStreamer=a,"undefined"!=typeof module&&module.exports?module.exports=S:m(e.define)&&e.define.amd?define(function(){return S}):e.Papa=S,e.jQuery){var C=e.jQuery;C.fn.parse=function(t){function r(){if(0==a.length)return void(m(t.complete)&&t.complete());var e=a[0];if(m(t.before)){var r=t.before(e.file,e.inputElem);if("object"==typeof r){if("abort"==r.action)return void n("AbortError",e.file,e.inputElem,r.reason);if("skip"==r.action)return void i();"object"==typeof r.config&&(e.instanceConfig=C.extend(e.instanceConfig,r.config))}else if("skip"==r)return void i()}var s=e.instanceConfig.complete;e.instanceConfig.complete=function(t){m(s)&&s(t,e.file,e.inputElem),i()},S.parse(e.file,e.instanceConfig)}function n(e,r,n,i){m(t.error)&&t.error({name:e},r,n,i)}function i(){a.splice(0,1),r()}var s=t.config||{},a=[];return this.each(function(){var t="INPUT"==C(this).prop("tagName").toUpperCase()&&"file"==C(this).attr("type").toLowerCase()&&e.FileReader;if(!t||!this.files||0==this.files.length)return!0;for(var r=0;r<this.files.length;r++)a.push({file:this.files[r],inputElem:this,instanceConfig:C.extend({},s)})}),r(),this}}y?e.onmessage=p:S.WORKERS_SUPPORTED&&(v=h(),document.body?document.addEventListener("DOMContentLoaded",function(){b=!0},!0):b=!0),i.prototype=Object.create(n.prototype),i.prototype.constructor=i,s.prototype=Object.create(n.prototype),s.prototype.constructor=s,a.prototype=Object.create(a.prototype),a.prototype.constructor=a}("undefined"!=typeof window?window:this);
}
