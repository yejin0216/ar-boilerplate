import {getAccessToken, getARDevices, callIoTMakersApi} from '../utils/iotmakers.api';
import {makeWebGLRenderer, CAMERA_PARAM} from '../utils/jsartoolkit.api';


/**
 * access token 발급
 */
getAccessToken( 'wis2016', 'new1234!' )
    .then( token => loadARObject(token.svc_tgt_seq) ) //AR Object 조회

/**
 * initialize AR
 * @returns {Promise<T | never>}
 */
function loadARObject( pSvcTgtSeq ) {
    return getARDevices( pSvcTgtSeq )
        .then( arDevList => {
            window.ARThreeOnLoad = () => {
                ARController.getUserMediaThreeScene({maxARVideoSize: 320, cameraParam: CAMERA_PARAM,
                    onSuccess: function(arScene, arController, arCamera) {

                        let viewDom = document.body;
                        viewDom.className = arController.orientation;

                        arController.setPatternDetectionMode(artoolkit.AR_MATRIX_CODE_DETECTION);
                        arController.setMatrixCodeType(artoolkit.AR_MATRIX_CODE_4x4);

                        let renderer = makeWebGLRenderer(arController, viewDom);
                        viewDom.insertBefore(renderer.domElement, viewDom.firstChild);

                        let meshArray = [];

                        let sphere = new THREE.Mesh(
                            new THREE.SphereGeometry(0.5, 8, 8),
                            new THREE.MeshNormalMaterial()
                        );
                        sphere.material.shading = THREE.FlatShading;
                        sphere.position.z = 0.5;
                        meshArray.push(sphere);

                        let cube = new THREE.Mesh(
                            new THREE.BoxGeometry(1,1,1),
                            new THREE.MeshNormalMaterial()
                        );
                        cube.material.shading = THREE.FlatShading;
                        cube.position.z = 0.5;
                        meshArray.push(cube);

                        let cone = new THREE.Mesh(
                            new THREE.ConeGeometry(0.5, 2, 32),
                            new THREE.MeshNormalMaterial()
                        );
                        cone.material.shading = THREE.FlatShading;
                        cone.position.z = 0.5;
                        meshArray.push(cone);

                        arDevList=arDevList.data;
                        for ( let i=0, count=arDevList.length; i<count; i++ ) {
                            let arCode = arDevList[i].value;
                            let markerRoot = arController.createThreeBarcodeMarker(parseInt(arCode));
                            markerRoot.add(meshArray[i%3]);
                            arScene.scene.add(markerRoot);
                        }

                        let rotationV = 0;
                        let rotationTarget = 0;
                        renderer.domElement.addEventListener('click', function(ev) {
                            ev.preventDefault();
                            rotationTarget += 1;
                        }, false);

                        let tick = () => {
                            arScene.process();
                            arScene.renderOn(renderer);
                            rotationV += (rotationTarget - sphere.rotation.z) * 0.05;
                            sphere.rotation.z += rotationV;
                            rotationV *= 0.8;

                            requestAnimationFrame(tick);
                        };

                        tick();
                    }
                });

                delete window.ARThreeOnLoad;
            };

            if (window.ARController && ARController.getUserMediaThreeScene) {
                ARThreeOnLoad();
            }
    });
}