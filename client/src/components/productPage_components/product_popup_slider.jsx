import React,{useState} from 'react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {AspectRatio, Flex, IconButton, Box} from '@chakra-ui/react'

function Slider(props)
{
    const {images} = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const goToPrevious=()=>
    {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext=()=>
    {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;  
        setCurrentIndex(newIndex);
    };

    return(
    <Flex direction={{ base: 'row', md: 'row' }} align='center' justify='center'>
        <IconButton aria-label='slide left' icon={<ArrowBackIcon />} onClick={goToPrevious}/>
            <Box flex='1' textAlign='center'>
                <AspectRatio maxW='100%' ratio={1}>
                    <img src={images[currentIndex]} />
                </AspectRatio>
            </Box>
        <IconButton aria-label='slide right' icon={<ArrowForwardIcon />} onClick={goToNext}/>
    </Flex>
    )
}
export default Slider;