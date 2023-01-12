import { Box, Flex, Text, ChakraProvider, Progress } from '@chakra-ui/react';

const OgImage = ({ title, slug, rt, progress, bg }) => {
  return (
    <ChakraProvider>
      <Box
        w='1200px'
        h='630px'
        pos='relative'
        p='15px'
        bg={bg ? bg : 'linear-gradient(to right, #0f2027, #203a43, #2c5364)'}
        color='white'
        fontFamily={
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
        }
      >
        <Box pos='relative' w='100%' h='100%'>
          <Flex
            pos='absolute'
            left='50px'
            top='5px'
            fontSize='6xl'
            alignItems='center'
            height='350px'
          >
            <Box>
              <Box>{title}</Box>
              <Box fontSize='3xl' color='whiteAlpha.500' w='100%'>
                <Text as='span'>{new Date().toDateString()}</Text>
                <Box as='span' mx={3}>
                  •
                </Box>
                <Text as='span'>{rt}</Text>
              </Box>
            </Box>
          </Flex>
          {!!progress && (
            <Box>
              <Text>{progress}%</Text>
              <Progress hasStripe value={progress} />
            </Box>
          )}

          <Flex alignItems='center' pos='absolute' left={10} bottom={10}>
            <Box pr='20px'>
              <Text fontSize='4xl'>
                <strong>vamosgs.me</strong>
                <Box as='span' display='inline-block'>
                  {slug}
                </Box>
              </Text>
            </Box>
          </Flex>
          <Box pos='absolute' right={5} bottom={3} fontSize='3xl'>
            <Box as='span' color='#1fa1f1'>
              @vamosgs
            </Box>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};
export default OgImage;
