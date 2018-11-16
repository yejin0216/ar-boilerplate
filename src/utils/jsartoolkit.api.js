/**
 * Camera를 구동할 영역을 지정한다.
 * @param arController
 * @returns {THREE.WebGLRenderer}
 */
export default function makeWebGLRenderer(arController) {
    let renderer = new THREE.WebGLRenderer({antialias: true});
    if ( arController.orientation === 'portrait' ) {
        let w = (window.innerWidth / arController.videoHeight) * arController.videoWidth;
        let h = window.innerWidth;
        renderer.setSize(w, h);
        renderer.domElement.style.paddingBottom = (w-h) + 'px';
    } else {
        if (/Android|mobile|iPad|iPhone/i.test(navigator.userAgent)) {
            renderer.setSize(window.innerWidth, (window.innerWidth / arController.videoWidth) * arController.videoHeight);
        } else {
            renderer.setSize(arController.videoWidth, arController.videoHeight);
            document.body.className += ' desktop';
        }
    }
    return renderer;
};

