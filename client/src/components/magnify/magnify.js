import { getStyle } from './tool';

export default {
    mounted(el) {
        // console.log(el);
        const oContainer = el;
        const oMagWrap = oContainer.querySelector('.mag-wrap');
        const oMagImg = oMagWrap.querySelector('.mag-img');
        const oStaticWrap = oContainer.querySelector('.static-wrap');
        const oStaticImg = oStaticWrap.querySelector('.static-img');

        const oContainerLeft = oContainer.offsetLeft
        const oContainerTop = oContainer.offsetTop

        const oMagWidth = getStyle(oMagWrap, 'width')
        const oMagHeight = getStyle(oMagWrap, 'height')
        const oImgWidth = getStyle(oStaticImg, 'width')
        const oImgHeight = getStyle(oStaticImg, 'height')
        console.log(oContainerLeft, oContainerTop, oMagWidth, oMagHeight);
        // console.log(oMagWrap);

        const init = () => {
            bindEvent()
        }

        const bindEvent = () => {
            oContainer.addEventListener('mouseover', function (e) {
                oMagWrap.className += ' show'
                showMag(getLocation(e).left, getLocation(e).top)
                document.addEventListener('mousemove', handleMouseMove, false)
            }, false)

            oContainer.addEventListener('mouseout', function (e) {
                oMagWrap.className = 'mag-wrap'
                document.removeEventListener('mousemove', handleMouseMove,)
            }, false)
        }
        const showMag = (left, top)=>{
            oMagWrap.style.left = left + 'px'
            oMagWrap.style.top = top + 'px'
            oMagImg.style.left = -left + 'px'
            oMagImg.style.top = -top + 'px'
        }
        const handleMouseMove = (e) => {
            const {left, top, boundX, boundY} = getLocation(e)
            showMag(left, top)
            inContainer(boundX, boundY)
        }
        const getLocation = (e) => {
            // 
            return {
                left: e.pageX - oContainer.offsetLeft - oMagWidth / 2,
                top: e.pageY - oContainer.offsetTop - oMagHeight / 2,
                boundX: e.pageX - oContainer.offsetLeft,
                boundY: e.pageY - oContainer.offsetTop,
            }
        }
        const inContainer = (boundX, boundY) => {
            if(boundX <= 0 || boundY<= 0 || boundX >=oImgWidth || boundY>=oImgHeight){
                oMagWrap.className = 'mag-wrap'
                document.removeEventListener('mousemove', handleMouseMove,)
            }
        }
        init()
    },

}