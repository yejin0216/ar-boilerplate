import {getAccessToken, getARDevices} from '../utils/iotmakers.api';
import {makeWebGLRenderer, CAMERA_PARAM} from '../utils/jsartoolkit.api';

/**
 * initialize AR
 * @returns {Promise<T | never>}
 */
function loadARObject() {
    /**
     * IoTMakers Access Token 호출
     * @param id
     * @param password
     * @param callback
     */
    return getAccessToken( 'wis2016', 'new1234!' )
        .then( token => getARDevices(token.svc_tgt_seq) )
        .then( devList => {
            /**
             * AR 바코드가 매핑된 디바이스 목록 조회
             * @param id
             * @param password
             * @param callback
             */
            window.ARThreeOnLoad = () => {
                ARController.getUserMediaThreeScene({maxARVideoSize: 320, cameraParam: CAMERA_PARAM,
                    onSuccess: function(arScene, arController, arCamera) {
                        document.body.className = arController.orientation;
                        arController.setPatternDetectionMode(artoolkit.AR_MATRIX_CODE_DETECTION);

                        let renderer = makeWebGLRenderer(arController);
                        document.body.insertBefore(renderer.domElement, document.body.firstChild);

                        // See /doc/patterns/Matrix code 3x3 (72dpi)/20.png
                        let sphere = new THREE.Mesh(
                            new THREE.SphereGeometry(0.5, 8, 8),
                            new THREE.MeshNormalMaterial()
                        );
                        sphere.material.shading = THREE.FlatShading;
                        sphere.position.z = 0.5;

                        // See /doc/patterns/Matrix code 3x3 (72dpi)/21.png
                        let cube = new THREE.Mesh(
                            new THREE.BoxGeometry(1,1,1),
                            new THREE.MeshNormalMaterial()
                        );
                        cube.material.shading = THREE.FlatShading;
                        cube.position.z = 0.5;

                        let markerRoot = arController.createThreeBarcodeMarker(20);
                        markerRoot.add(sphere);
                        arScene.scene.add(markerRoot);
                        markerRoot = arController.createThreeBarcodeMarker(21);
                        markerRoot.add(cube);
                        arScene.scene.add(markerRoot);

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

loadARObject();






