import React from 'react'
import { View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import data from './data'

const CarouselCards = () => {
    const isCarousel = React.useRef(null)

    return (
        <View
        >
            <Carousel
               layout={'default'} layoutCardOffset={`9`} 
                ref={isCarousel}
                data={data}
                renderItem={CarouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                // inactiveSlideScale={0.95}
                // inactiveSlideShift={0}
                // useScrollView={true}
                loop={true}
            />
        </View>
    )
}


export default CarouselCards