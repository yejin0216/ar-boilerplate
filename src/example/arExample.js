import iotmakersAPI from '../utils/iotmakers.api';
import makeWebGLRenderer from '../utils/jsartoolkit.api';

//IoTMakers Access Token을 받아온다.


const CAMERA_PARAM = '../../bower_components/jsartoolkit5/examples/Data/camera_para.dat';
window.ARThreeOnLoad = function() {

    ARController.getUserMediaThreeScene({maxARVideoSize: 320, cameraParam: CAMERA_PARAM,
        onSuccess: function(arScene, arController, arCamera) {
            document.body.className = arController.orientation;
            arController.setPatternDetectionMode(artoolkit.AR_MATRIX_CODE_DETECTION);

            let renderer = makeWebGLRenderer(arController);
            document.body.insertBefore(renderer.domElement, document.body.firstChild);

            // See /doc/patterns/Matrix code 3x3 (72dpi)/20.png
            var markerRoot = arController.createThreeBarcodeMarker(20);

            var sphere = new THREE.Mesh(
                new THREE.SphereGeometry(0.5, 8, 8),
                new THREE.MeshNormalMaterial()
            );
            sphere.material.shading = THREE.FlatShading;
            sphere.position.z = 0.5;
            markerRoot.add(sphere);
            arScene.scene.add(markerRoot);

            var rotationV = 0;
            var rotationTarget = 0;

            renderer.domElement.addEventListener('click', function(ev) {
                ev.preventDefault();
                rotationTarget += 1;
            }, false);

            var tick = function() {
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