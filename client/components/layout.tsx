import {
  Box,
  Container,
  Text,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Grid,
  GridItem,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Heading,
  LinkOverlay,
} from "@chakra-ui/react";
import { ChatIcon, SearchIcon } from "@chakra-ui/icons";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Box
        h="45px"
        w="100%"
        backgroundColor="blue.700"
        position={"absolute"}
        paddingRight="20px"
        paddingLeft="20px"
      >
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={2}>
            <HStack color="white" paddingTop="13px">
              <ChatIcon />
              <Heading
                fontFamily={"inter"}
                fontWeight="black"
                fontSize="16px"
                // paddingTop="10px"
                paddingLeft="5px"
              >
                Kanban App
              </Heading>
            </HStack>
          </GridItem>
          <GridItem colStart={5} colEnd={7}>
            <HStack color="white" paddingTop="7px" paddingLeft="20px">
              <InputGroup
                width="217px"
                size={"sm"}
                backgroundColor="rgba(190,227,248,0.3)"
                borderRadius="3px"
                borderColor="rgba(255,255,255,0.55)"
                marginRight="41px"
              >
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="white" />}
                />
                <Input
                  type="tel"
                  placeholder="Search ..."
                  _placeholder={{ color: "white" }}
                />
              </InputGroup>
              <Menu id="navbar" isLazy>
                <MenuButton>
                  <Avatar bg="orange.500" height="32px" width="32px" />
                </MenuButton>
                <MenuList padding="0">
                  <MenuItem color="black">
                    <LinkOverlay href="/signin">Sign Out </LinkOverlay>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </GridItem>
        </Grid>
      </Box>
      <Box bgColor="blue.500" width="100%" height="100vh" paddingTop="45px">
        {children}
      </Box>
    </>
  );
};

export default Layout;
