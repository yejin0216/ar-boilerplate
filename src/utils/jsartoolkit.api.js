/**
 * Canvas 객체를 생성한다.
 * @param arController
 * @returns {THREE.WebGLRenderer}
 */
export function makeWebGLRenderer(arController, viewDom) {
    let renderer = new THREE.WebGLRenderer({antialias: true});
    if ( arController.orientation === 'portrait' ) {
        let w = (windoww.innerWidth.innerWidth / arController.videoHeight) * arController.videoWidth;
        let h = windo
        renderer.setSize(w, h);
        renderer.domElement.style.paddingBottom = (w-h) + 'px';
    } else {
        if (/Android|mobile|iPad|iPhone/i.test(navigator.userAgent)) {
            renderer.setSize(window.innerWidth, (window.innerWidth / arController.videoWidth) * arController.videoHeight);
        } else {
            renderer.setSize(arController.videoWidth, arController.videoHeight);
            viewDom.className += ' desktop';
        }
    }
    return renderer;
};

/**
 * cameraParam Constants
 * @type {string}
 */
const CAMERA_PARAM ='../../bower_components/jsartoolkit5/examples/Data/camera_para.dat';
export { CAMERA_PARAM };