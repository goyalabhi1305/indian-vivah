import React from 'react'
import { View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import ImageView from "react-native-image-viewing";
// import data from './data'

const CarouselCards = ({ data }) => {
    const isCarousel = React.useRef(null)
    const [visible, setIsVisible] = React.useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
    const handleImagePress = (index) => {
        console.log("index", index)
        setSelectedImageIndex(index % 
        data?.fivePics?.length
        );
        setIsVisible(true);
    };
    const [images, setImages] = React.useState([]);

    React.useEffect(() => {
        setImages(data?.fivePics?.map((item) => ({ uri: item.pic }))
            || []);
    }
        , [data]);

console.log("images", images)

    return (
        <View
        >
            <Carousel
                layout={'default'} 
                ref={isCarousel}
                data={data?.fivePics || []}
                renderItem={
                    ({ item, index }) => (
                        <CarouselCardItem
                            item={item}
                            index={index}
                            handleImagePress={() => handleImagePress(index)}
                        />
                    )
                }
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                // inactiveSlideShift={0}
                // inactiveSlideScale={0.95}
                // inactiveSlideShift={0}
                useScrollView={true}
                // loop={true}
                firstItem={0} 
            />

            <ImageView
                images={images}
                imageIndex={
                    selectedImageIndex
                }
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
        </View>
    )
}


export default CarouselCards


// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { useState } from "react";
//

// const CrouselCards = () => {
//     const [visible, setIsVisible] = useState(true);

//     const images = [
//         {
//             uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
//         },
//         {
//             uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
//         },
//         {
//             uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
//         },
//     ];


//     return (
//         <View>

//             <ImageView
//                 images={images}
//                 imageIndex={0}
//                 visible={visible}
//                 onRequestClose={() => setIsVisible(false)}
//             />
//         </View>
//     )
// }

// export default CrouselCards

// const styles = StyleSheet.create({})



